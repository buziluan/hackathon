<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  export default {
    mounted() {
    }
  }
</script>
<style lang="less">
  html,body,#app {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
</style>
