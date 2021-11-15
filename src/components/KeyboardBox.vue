<template>
  <div class="keyboard-box">
    <div class="direction-box">
      <div class="up-box direction-item" @touchstart.stop.prevent="handleTouchstartItem('up')" @touchend.stop.prevent="handleTouchendItem('up')"></div>
      <div class="down-box direction-item" @touchstart.stop.prevent="handleTouchstartItem('down')" @touchend.stop.prevent="handleTouchendItem('down')"></div>
      <div class="left-box direction-item" @touchstart.stop.prevent="handleTouchstartItem('left')" @touchend.stop.prevent="handleTouchendItem('left')"></div>
      <div class="right-box direction-item" @touchstart.stop.prevent="handleTouchstartItem('right')" @touchend.stop.prevent="handleTouchendItem('right')"></div>
    </div>
    <div class="operation-box">
      <div class="a-box" @touchstart.stop.prevent="handleTouchstartItem('a')" @touchend.stop.prevent="handleTouchendItem('a')"></div>
      <div class="b-box" @touchstart.stop.prevent="handleTouchstartItem('b')" @touchend.stop.prevent="handleTouchendItem('b')"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "KeyboardBox",
    methods: {
      handleTouchstartItem(type){
        this.$store.state.storeAudioList && this.$store.state.storeAudioList.key && this.$store.state.storeAudioList.key.play()
        let box = document.querySelector(`.${type}-box`)
        box && (box.style.backgroundImage = `url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/${type}-active.png")`)
        this.$emit("on-keyboard", {type, keyType: "down"})
      },
      handleTouchendItem(type){
        let box = document.querySelector(`.${type}-box`)
        box && (box.style.backgroundImage = `url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/${type}.png")`)
        this.$emit("on-keyboard", {type, keyType: "up"})
      }
    }
  }
</script>

<style scoped lang="less">
.keyboard-box{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 32px;
  .direction-box{
    position: relative;
    width: 115px;
    height: 115px;
    .direction-item{
      position: absolute;
      width: 43px;
      height: 43px;
      background-size: 100%;
      background-repeat: no-repeat;
      border-radius: 50%;
    }
    .up-box{
      background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/up.png");
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
    .down-box{
      background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/down.png");
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }
    .left-box{
      background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/left.png");
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    .right-box{
      background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/right.png");
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .operation-box{
    display: flex;
    padding-right: 30px;
    .a-box{
      width: 55px;
      height: 34px;
      background-size: 100%;
      background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/a.png");
    }
    .b-box{
      width: 55px;
      height: 34px;
      background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/b.png");
      background-size: 100%;
    }
  }
}
</style>
