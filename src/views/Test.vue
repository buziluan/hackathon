<template>
  <div>
    <div class="box">
      <game-box>
        <keyboard-box slot="keyboard"/>
      </game-box>
    </div>
    <message-box :text="text" state></message-box>
  </div>
</template>

<script>
  import GameBox from "../components/GameBox";
  import KeyboardBox from "../components/KeyboardBox";
  import MessageBox from "../components/MessageBox";
  export default {
    name: "Test",
    components: {GameBox, KeyboardBox, MessageBox},
    data(){
      return {
        text: "你好，hackathon"
      }
    }
  }
</script>

<style scoped lang="less">
.box{
  width: 100vw;
  height: 100vh;
  background-color: black;
  display: flex;
  align-items: center;
}
</style>
