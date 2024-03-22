<template>
  <canvas id="akCanvas"/>
</template>
<script>
export default {
  name: "ImageToParticle",
  computed:{
    imageFile() {
      return this.$store.getters.getImageFile;
    }
  },
  watch: {
    async imageFile() {
      this.drawParticle();
    },
  },
  methods: {
    drawParticle() {
      const file = this.imageFile;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
          const img = new Image();
          img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, img.width, img.height);
            const pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
            const akCanvas = document.getElementById("akCanvas");
            const akCtx = akCanvas.getContext('2d');
            console.log("done");
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
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
}
</style>