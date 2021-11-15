<template>
  <div class="game-box-main" @click.stop>
    <div class="content">
      <slot name="main"></slot>
    </div>
    <div class="keyboard-box"  @click.stop>
      <slot name="keyboard"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GameBox",
    mounted() {
      let bodyHeight = document.body.clientHeight
      let dom = document.querySelector(".game-box-main")
      if(bodyHeight < 715){
        dom.style.transform = `scale(${bodyHeight / 715 - 0.05})`
      }
    }
  }
</script>

<style scoped lang="less">
.game-box-main{
  width: 363px;
  height: 715px;
  background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/game-machine.png");
  background-size: 100%;
  margin: 0px auto;
  padding: 41px 9px 0 9px;
  .content{
    width: 345px;
    height: 463px;
    border-radius: 4px;
    overflow: hidden;
  }
  .keyboard-box{
    width: 345px;
    margin: 40px auto;
  }
}
</style>
