<template>
  <div class="loading-page">
    <p class="title">我的工资条</p>
    <div class="content-box">
      <div class="user-box" :class="[ info.userInfo.gender ? 'man' : 'woman']"></div>
      <div class="user-name">{{info.userInfo.name}}</div>
      <div class="post-name">{{info.selectJob && info.selectJob.name || ''}}</div>
      <div class="salary-box">+{{info.selectJob && info.selectJob.city[info.intention.city][1].toString().replace("k", "") + '000' || ''}}</div>
      <div class="insurance">{{happinessScore}}</div>
      <div class="performance">2000</div>
      <div class="rent">{{info.house.money}}</div>
      <div class="spirit">500</div>
      <div class="insurance-name">工作幸福度</div>
      <div class="performance-name">生活支出</div>
      <div class="rent-name">房租</div>
      <div class="spirit-name">公司补助</div>
      <div class="btn1" @click="handleClickBtn(1)"></div>
      <div class="btn2" @click="handleClickBtn(2)"></div>
    </div>
    <message-box v-if="showMessage" :data="textData"></message-box>
  </div>
</template>

<script>
  import MessageBox from "../components/MessageBox";
  export default {
    name: "SalarySheet",
    data(){
      return {
        left: 0,
        textList: [],
        showMessage: false,
        textData: {
          text: "暂未开发，敬请期待",
          image: "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/home/system.png",
          name: "系统"
        }
      }
    },
    components: {MessageBox},
    computed: {
      info(){
        return this.$store.state.drama
      },
      happinessScore(){
        let score = this.info.salaryTime
        if(score > 35 && score < 45){
          return  "平平淡淡"
        }else if(score <= 35){
          return  "划水摸鱼"
        }else {
          return  "疲惫不堪"
        }
      }
    },
    mounted() {
      this.$store.state.storeAudioList && this.$store.state.storeAudioList.end && this.$store.state.storeAudioList.end.play && this.$store.state.storeAudioList.end.play()
      this.$store.state.storeAudioList && this.$store.state.storeAudioList.gameBGM && this.$store.state.storeAudioList.gameBGM.pause && this.$store.state.storeAudioList.gameBGM.pause()
    },
    methods: {
      handleClickBtn(num){
        if(num === 1){
          this.$router.replace("/identity")
        }else {
          this.showMessage = true
        }
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
  padding-top: 80px;
  .title{
    font-size: 16px;
    font-weight: normal;
    color: #000000;
    line-height: 16px;
    text-align: center;
    margin-bottom: 38px;
  }
  .content-box{
    width: 317px;
    height: 445px;
    background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/salary-sheet.png");
    background-repeat: no-repeat;
    background-size: 100%;
    margin: 0 auto;
    position: relative;
    .user-box{
      position: absolute;
      top: 53px;
      left: 51px;
      width: 32px;
      height: 49px;
      background-size: 100%;
      background-repeat: no-repeat;
      &.man{
        background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/identity/man.png");
      }
      &.woman{
        background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/identity/woman.png");
      }
    }
    .user-name{
      position: absolute;
      top: 50px;
      left: 208px;
      font-size: 12px;
      font-family: FZXS24--GB1-0, FZXS24--GB1;
      font-weight: normal;
      color: #000000;
      line-height: 12px;
      letter-spacing: 1px;
    }
    .post-name{
      position: absolute;
      top: 93px;
      left: 177px;
      width: 100px;
      font-size: 12px;
      text-align: center;
      font-family: FZXS24--GB1-0, FZXS24--GB1;
      font-weight: normal;
      color: #000000;
      line-height: 12px;
      letter-spacing: 1px;
    }
    .salary-box{
      position: absolute;
      top: 154px;
      left: 129px;
      font-size: 14px;
      font-family: FZXS24--GB1-0, FZXS24--GB1;
      font-weight: normal;
      color: #000000;
      line-height: 14px;
      letter-spacing: 1px;
    }
    .insurance{
      position: absolute;
      top: 240px;
      left: 80px;
      font-size: 14px;
      font-family: FZXS24--GB1-0, FZXS24--GB1;
      font-weight: normal;
      color: #000000;
      line-height: 14px;
      letter-spacing: 1px;
    }
    .insurance{
      position: absolute;
      top: 240px;
      left: 80px;
      font-size: 14px;
      font-family: FZXS24--GB1-0, FZXS24--GB1;
      font-weight: normal;
      color: #000000;
      line-height: 14px;
      letter-spacing: 1px;
    }
    .performance{
      position: absolute;
      top: 240px;
      left: 210px;
      font-size: 14px;
      font-family: FZXS24--GB1-0, FZXS24--GB1;
      font-weight: normal;
      color: #000000;
      line-height: 14px;
      letter-spacing: 1px;
    }
    .rent{
      position: absolute;
      top: 314px;
      left: 80px;
      font-size: 14px;
      font-family: FZXS24--GB1-0, FZXS24--GB1;
      font-weight: normal;
      color: #000000;
      line-height: 14px;
      letter-spacing: 1px;
    }
    .spirit{
      position: absolute;
      top: 314px;
      left: 210px;
      font-size: 14px;
      font-family: FZXS24--GB1-0, FZXS24--GB1;
      font-weight: normal;
      color: #000000;
      line-height: 14px;
      letter-spacing: 1px;
    }
    .insurance-name{
      position: absolute;
      top: 213px;
      left: 60px;
      font-size: 12px;
      font-family: FZXS24--GB1-0, FZXS24--GB1;
      font-weight: normal;
      color: #000000;
      line-height: 12px;
      letter-spacing: 1px;
    }
    .spirit-name{
      position: absolute;
      top: 285px;
      left: 194px;
      font-size: 12px;
      font-family: FZXS24--GB1-0, FZXS24--GB1;
      font-weight: normal;
      color: #000000;
      line-height: 12px;
      letter-spacing: 1px;
    }
    .rent-name{
      position: absolute;
      top: 285px;
      left: 80px;
      font-size: 12px;
      font-family: FZXS24--GB1-0, FZXS24--GB1;
      font-weight: normal;
      color: #000000;
      line-height: 12px;
      letter-spacing: 1px;
    }
    .performance-name{
      position: absolute;
      top: 213px;
      left: 199px;
      font-size: 12px;
      font-family: FZXS24--GB1-0, FZXS24--GB1;
      font-weight: normal;
      color: #000000;
      line-height: 12px;
      letter-spacing: 1px;
    }
  }
  .btn1{
    position: absolute;
    width: 120px;
    height: 50px;
    top: 355px;
    left: 34px;
  }
  .btn2{
    position: absolute;
    width: 120px;
    height: 50px;
    top: 355px;
    left: 165px;
  }
}
</style>
