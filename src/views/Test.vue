<template>
  <div class="box">
    <game-box>
      <keyboard-box slot="keyboard"/>
    </game-box>
  </div>
</template>

<script>
  import GameBox from "../components/GameBox";
  import KeyboardBox from "../components/KeyboardBox";
  export default {
    name: "Test",
    components: {GameBox, KeyboardBox},

  }
</script>

<style scoped lang="less">
.box{
  width: 100vw;
  height: 100vh;
  background-color: black;
  padding-top: 20px;
}
</style>
