<template>
  <div class="loading-page" @touchend.stop.prevent="handleClick">
    <div class="content-box">
      <div class="user-box" :style="{transform: left == 0 ? 'translateX(-13px)' : `translateX(${305 * left / 100 - 13}px)` }">

      </div>
      <div class="progress-box">
        <div class="progress-box-active" :style="{width: `${left}%` }">

        </div>
      </div>
      <img :src="`https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/home/loading${left}.png`" v-if="left && !showLastImage" style="width: 98px; margin: 0 auto"/>
      <img :src="`https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/home/startGame`" v-if="showLastImage" style="margin: 0 auto; height: 16px"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Loading",
    data(){
      return {
        left: 0,
        textList: [],
        showLastImage: false
      }
    },
    mounted() {
      let time = setInterval(() => {
        this.left += 20
        if(this.left === 100){
          clearInterval(time)
          setTimeout(()=>{
            this.showLastImage = true
          }, 1000)
        }
      }, 1000)
    },
    methods: {
      handleClick(){
        if(this.$store.state.storeAudioList && this.$store.state.storeAudioList.gameBGM && this.$store.state.storeAudioList.gameBGM.play){
          this.$store.state.storeAudioList.gameBGM.play()
        }
        this.$router.replace("/identity")
      }
    }
  }
</script>

<style scoped lang="less">
.loading-page{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #FFBF10;

  .content-box{
    width: 305px;
    margin: 150px auto;
    position: relative;
    padding-top: 39px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .user-box{
      background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/identity/man.png");
      width: 24px;
      height: 39px;
      background-size: 100%;
      background-repeat: no-repeat;
      position: absolute;
      top: 0;
      left: 0;
      transition: all linear 1s;
      transform: translateX(-13px);
    }
    .progress-box{
      width: 305px;
      height: 17px;
      background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/home/progress.png");
      background-size: 100%;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      padding: 0 2px;
      margin-bottom: 20px;
      .progress-box-active{
        width: 20%;
        height: 13px;
        background: #28D2E1;
        border-radius: 8px;
        transition: width linear 1s;
      }
    }
  }

}
</style>
