<template>
  <div id="btnSubject" :title=title :style="dynamicStyle">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "ControlBtn",
  props: {
    title: String,
    bc: String,
    bi: String,
  },
  computed: {  
    dynamicStyle() {
      if (this.bc == "") {
        return {
          backgroundImage: this.bi,
        };
      } else {
        return {
          backgroundColor: this.bc,
        };
      }
    }
  }
}
</script>
<style scoped>
#btnSubject {
  cursor: pointer;
  user-select:none;
  display: flex;
  box-sizing: border-box;
  margin: 5px 10px;
  padding: 5px 5px;
  border-radius: 5px;
  height: 7%;
  width: 100%;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
}
#btnSubject:hover {
  margin: 0 0;
  padding: 0 0;
  transition: 0.5s;
}
</style>