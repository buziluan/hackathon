<template>
  <div class="loading-page">
    <p class="title">推荐职位</p>
    <div class="job-item" v-for="(item, i) in jobList" :key="i" :class="[index == i ? 'active' : '']" @click="index = i">
      <div class="item-header">
        <div class="post-name">{{item.name}}</div>
        <div class="salary">{{item.city[city][0]}}</div>
      </div>
      <div class="tag-list">
        <div class="tag-item">{{city}}</div>
        <div class="tag-item">校招</div>
        <div class="tag-item">20/21届</div>
        <div class="tag-item">{{education}}</div>
      </div>
    </div>
    <affirm-button text="去面试" class="btn" @click.native="handleClickSubmit"></affirm-button>
    <message-box v-if="showMessage" :data="textData"></message-box>
  </div>
</template>

<script>
  import AffirmButton from "../components/AffirmButton";
  import MessageBox from "../components/MessageBox";
  export default {
    name: "JobList",
    data(){
      return {
        jobList: [],
        index: 0,
        showMessage: false ,
        textData: null
      }
    },
    components: {AffirmButton, MessageBox},
    computed: {
      city(){
        return this.$store.state.drama.intention.city
      },
      level(){
        return this.$store.state.drama.intention.salary
      },
      education(){
        return this.$store.state.drama.userInfo.education
      }
    },
    mounted() {
      this.jobList = this.$store.state.drama.jobs
    },
    methods: {
      handleClickSubmit(){
        this.$store.state.storeAudioList && this.$store.state.storeAudioList.key && this.$store.state.storeAudioList.key.play()
        if(this.index === -1){
          this.textData = {
            text: "选择职位呀！！！",
            name: "系统",
            image: "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/home/system.png"
          }
          this.showMessage = true
          setTimeout(()=>{
            this.showMessage = false
          },2000)
        }else {
          this.$store.commit("setDramaSelectJob", this.jobList[this.index])
          setTimeout(()=>{
            this.$router.replace("/two")
          },500)
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
  padding-top: 60px;
  .title{
    font-size: 16px;
    font-weight: normal;
    color: #000000;
    line-height: 16px;
    text-align: center;
    margin-bottom: 38px;
  }
  .job-item{
    background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/job-card.png");
    background-size: 100%;
    background-repeat: no-repeat;
    width: 327px;
    height: 105px;
    padding: 20px 28px;
    margin: 0 auto 10px;
    .item-header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      .post-name{
        font-size: 18px;
        font-weight: 600;
        color: #55410D;
        line-height: 25px;
      }
      .salary{
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #FF6644;
        line-height: 25px;
      }
    }
    .tag-list{
      display: flex;
      align-items: center;
      .tag-item{
        padding: 6px 10px;
        border-radius: 2px;
        border: 1px solid #55410D;
        margin-right: 6px;
        font-size: 12px;
        font-weight: 500;
        color: #55410D;
      }
    }
    &.active{
      background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/job-card-active.png");
    }
  }
  .btn{
    margin-top: 20px;
  }
}
</style>
