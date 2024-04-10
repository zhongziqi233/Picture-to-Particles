<template>
  <canvas id="akCanvas"/>
</template>
<script>
/* eslint-disable no-unused-vars, no-empty */
import Particle from '@/assets/classes/particle';

export default {
  name: "ImageToParticle",
  data() {
    return {
      cc: "",
    }
  },
  computed:{
    imageFile() {
      return this.$store.getters.getImageFile;
    },
  },
  watch: {
    async imageFile() {
      let strLength = 32;
      var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
      let a = t.length;
      let n = "";
      for (let i = 0; i < strLength; i++) n += t.charAt(Math.floor(Math.random() * a));
      this.cc = n;
      this.drawParticle(n);
    },
  },
  methods: {
    drawParticle(confirmCode) {
      const _this = this;
      // 获取画布宽高
      const canvas = document.getElementById("akCanvas");
      const ctx = canvas.getContext("2d");
      ctx.lineWidth = 0;
      // ctx.fillStyle = "rgb(0,0,0)"
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      // 像素率
      const pixelRate = 0.9;
      // 缩放率
      const zoomRate = 0.75;
      // 密度参数
      const densityParam = 5;
      // 像素半径
      const radiu = 1.25;
      // 时间参数
      const timeParam = 100;
      // 排斥/吸引 力度
      const inten = 0.8;
      // 影响半径
      const radius = 30;

      // 设置画布像素
      canvas.width = width * pixelRate;
      canvas.height = height * pixelRate;
      let imgWidth, imgHeight;
      let drawWidth, drawHeight;
      let imgX, imgY;

      let particles = [];

      const file = this.imageFile;
      if (file) {
        const reader = new FileReader();
        const image = new Image();
        reader.onload = function(event) {
          image.src = event.target.result;
          image.onload = function() {
            // 获取图像宽高
            imgWidth = image.width;
            imgHeight = image.height;
            // 对比宽高比 图片宽高比大则根据宽定大小反之高定大小
            if (width / height < imgWidth / imgHeight) {
              drawWidth = parseInt(width * zoomRate * pixelRate);
              drawHeight = parseInt(drawWidth * imgHeight / imgWidth);
            } else {
              drawHeight = parseInt(height * zoomRate * pixelRate);
              drawWidth = parseInt(drawHeight * imgWidth / imgHeight);
            }
            imgX = (canvas.width - drawWidth) / 2;
            imgY = (canvas.height - drawHeight) / 2;

            ctx.drawImage(image, 0, 0, drawWidth, drawHeight);
            let imgData = ctx.getImageData(0, 0, drawWidth, drawHeight).data;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles = [];
            for (let y = 0; y < drawHeight; y += densityParam) {
              for (let x = 0; x < drawWidth; x += densityParam) {
                const index = (x + y * drawWidth) * 4;
                const r = imgData[index];
                const g = imgData[index + 1];
                const b = imgData[index + 2];
                const a = imgData[index + 3];
                const sum = r + g + b + a;
                if (a > 0 && sum > 100) {
                  particles.push(new Particle(`rgb(${r}, ${g}, ${b}, ${a/255})`, [x, y], [drawWidth, drawHeight], timeParam, inten, radius));
                }
              }
            }

            // 绘制像素
            particles.forEach((item) => {
              // ctx.beginPath();
              ctx.fillStyle = item.color;
              // ctx.arc(imgX + item.currentPos[0], imgY + item.currentPos[1], radiu, 0, 2 * Math.PI);
              ctx.fillRect(imgX + item.currentPos[0], imgY + item.currentPos[1], radiu * 2, radiu * 2);
              ctx.fill();
            })

            this.mouseX = 0;
            this.mouseY = 0;
            canvas.addEventListener("mousemove", (e) => {
              const { left, top } = canvas.getBoundingClientRect();
              const { clientX, clientY } = e;
              this.mouseX = clientX - left;
              this.mouseY = clientY - top;
            });
            canvas.onmouseleave = () => {
              this.mouseX = 0;
              this.mouseY = 0;
            };

            console.log(this.cc)

            let timer = setInterval(() => {
              if (_this.cc != confirmCode) {
                clearInterval(timer);
              }
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              particles.forEach((item) => {
                item.update(this.mouseX * pixelRate - imgX, this.mouseY * pixelRate - imgY);
                // ctx.beginPath();
                ctx.fillStyle = item.color;
                // ctx.arc(imgX + item.currentPos[0], imgY + item.currentPos[1], radiu, 0, 2 * Math.PI);
                ctx.fillRect(imgX + item.currentPos[0], imgY + item.currentPos[1], radiu * 2, radiu * 2);
                ctx.fill();
              });
            }, 1);
          };
        };
        reader.readAsDataURL(file);
        return;
      } else {
        return;
      }
    },
  }
}
</script>
<style scoped>
#akCanvas {
  width: 100%;
  height: 100%;
  cursor: url("../assets/icons/mouse.png") 1.5 1.5, auto;
}
</style>