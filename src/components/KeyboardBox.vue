<template>
  <div class="keyboard-box">
    <div class="direction-box">
      <div class="up-box direction-item" @touchstart.prevent="handleTouchstartItem('up')" @touchend.prevent="handleTouchendItem('up')"></div>
      <div class="down-box direction-item" @touchstart.prevent="handleTouchstartItem('down')" @touchend.prevent="handleTouchendItem('down')"></div>
      <div class="left-box direction-item" @touchstart.prevent="handleTouchstartItem('left')" @touchend.prevent="handleTouchendItem('left')"></div>
      <div class="right-box direction-item" @touchstart.prevent="handleTouchstartItem('right')" @touchend.prevent="handleTouchendItem('right')"></div>
    </div>
    <div class="operation-box">

    </div>
  </div>
</template>

<script>
  export default {
    name: "KeyboardBox",
    methods: {
      handleTouchstartItem(type){
        let box = document.querySelector(`.${type}-box`)
        box.style.backgroundImage = `url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/${type}-active.png")`
      },
      handleTouchendItem(type){
        let box = document.querySelector(`.${type}-box`)
        box.style.backgroundImage = `url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/${type}.png")`
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
  }
}
</style>
