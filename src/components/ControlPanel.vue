<template>
  <div id="controlViewport">
    <ControlBtn 
      title="上传图片" 
      bc="" 
      bi="linear-gradient(to right top, #1fd9ff, #00e1e6, #02e4bc, #6fe38a, #afdd58, #bfdb48, #d0d936, #e1d623, #c6df27, #a6e736, #7eee4b, #3ef465)"
      @click="selectFileClick"
    >
      <img id="btnIcon" src="../assets/icons/uploadPicture.svg"/>
    </ControlBtn>
    <ControlBtn 
      title="修改背景色" 
      bc="" 
      bi="linear-gradient(to right bottom, #c500cf, #ff0085, #ff6736, #ffbd00, #c0ff35)"
      @click="colorPickerClick"
    >
      <color-picker
        id="cpv3"
        defaultColor="#000000"
        @change="colorChange"
      />
    </ControlBtn>
    <input id="sfi" type="file" style="display: none;" @change="changeFile" accept="image/*"/>
  </div>
</template>
<script>
import ControlBtn from "./ControlBtn.vue";
export default {
  name: "ControlPanel",
  components: { ControlBtn },
  methods: {
    colorPickerClick() {
      document.getElementById("cpv3").children[0].click();
    },
    colorChange(e) {
      this.$store.commit("updateBackgroundColor", e.rgba);
    },
    selectFileClick() {
      document.getElementById("sfi").click();
    },
    changeFile(e) {
      this.$store.commit("updateImageFile", e.target.files[0]);
    }
  }
};
</script>
<style scoped>
#controlViewport {
  padding-top: 2.5px;
  box-sizing: border-box;
  background-image: linear-gradient(to bottom, #ff6f6f99, #ff598399, #f7489d99, #e243bb99, #bd4cda99, #af53e799, #9d5af399, #8761ff99, #a361ff99, #bd61ff99, #d462ff99, #ea62ff99);
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  position: absolute;
  height: 100%;
  width: 4%;
  transition: 0.5s;
}

#btnIcon {
  width: 50%;
  height: auto;
}
</style>