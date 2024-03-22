<template>
  <div id="wholePage">
    <ControlPanel/>
    <MainViewport/>
  </div>
</template>

<script setup>
import ControlPanel from './components/ControlPanel.vue';
import MainViewport from "./components/MainViewport.vue";
</script>
<style>
body {
  display: flex;
  padding: 0;
  margin: 0;
}
#wholePage {
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: absolute;
  overflow: hidden;
}
</style>
