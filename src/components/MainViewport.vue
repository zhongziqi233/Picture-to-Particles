<template>
  <div id="mainViewport" :style="dynamicStyle">
    <ImageToParticle/>
  </div>
</template>
<script>
import ImageToParticle from "./ImageToParticle.vue";
export default {
  name: "MainViewport",
  components: { ImageToParticle },
  computed: {
    dynamicStyle() {
      return {
        backgroundColor: this.$store.getters.getBackgroundColor
      }
    }
  }
}
</script>
<style scoped>
#mainViewport {
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}
</style>
