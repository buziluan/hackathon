<template>
  <div class="home">
    <p class="title">求职意向</p>
    <div class="input-box">
      <p class="input-title">职类</p>
      <div class="right-input">
        <div class="left-icon" @click="handleClickClass(-1)"></div>
        <div class="input">{{intention.class}}</div>
        <div class="right-icon" @click="handleClickClass(1)"></div>
      </div>
    </div>
    <div class="input-box">
      <p class="input-title">城市</p>
      <div class="right-input">
        <div class="left-icon" @click="handleClickCity(-1)"></div>
        <div class="input">{{intention.city}}</div>
        <div class="right-icon" @click="handleClickCity(1)"></div>
      </div>
    </div>
    <div class="input-box">
      <p class="input-title">级别</p>
      <div class="right-input">
        <div class="left-icon" @click="handleClickSalary(-1)"></div>
        <div class="input">{{intention.salary}}</div>
        <div class="right-icon" @click="handleClickSalary(1)"></div>
      </div>
    </div>
    <affirm-button text="确定" style="margin-top: 42px" @click.native="handleClickAffirm"/>
    <message-box v-if="showMessage" :data="textData"></message-box>
  </div>
</template>

<script>
  import AffirmButton from "../components/AffirmButton";
  import {jobDramaData} from "./drama.json"
  import MessageBox from "../components/MessageBox";
  import domeDrama from "./drama_dom.json";
  export default {
    name: 'Intention',
    components: {AffirmButton, MessageBox},
    data(){
      return {
        intention: {
          class: "程序员",
          city: "北京",
          salary: "初级"
        },
        classList: ['程序员', '设计', '人事', '产品经理'],
        cityList: ['北京', '杭州', '广州', '天津'],
        salaryList: ["初级","中级","高级"],
        initClassIndex: 0,
        initCityIndex: 0,
        initSalaryIndex: 0,
        jobDramaData,
        showMessage: false,
        textData: {
          text: "真·人工帮你搜索职位中...",
          name: "世伟",
          image: "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/home/system.png"
        }
      }
    },
    computed: {

    },
    mounted() {
      if(this.$store.state.isDemo){
        this.jobDramaData = domeDrama.jobDramaData
      }
    },
    methods:{

      //选择职类
      handleClickClass(num){
        this.initClassIndex = this.initClassIndex + num
        if(this.initClassIndex < 0){
          this.initClassIndex = 3
        }else if(this.initClassIndex > 3){
          this.initClassIndex = 0
        }
        this.intention.class = this.classList[this.initClassIndex]
      },
      //选择城市
      handleClickCity(num){
        this.initCityIndex = this.initCityIndex + num
        if(this.initCityIndex < 0){
          this.initCityIndex = 3
        }else if(this.initCityIndex > 3){
          this.initCityIndex = 0
        }
        this.intention.city = this.cityList[this.initCityIndex]
      },
      //选择薪资
      handleClickSalary(num){
        this.initSalaryIndex = this.initSalaryIndex + num
        if(this.initSalaryIndex < 0){
          this.initSalaryIndex = 2
        }else if(this.initSalaryIndex > 2){
          this.initSalaryIndex = 0
        }
        this.intention.salary = this.salaryList[this.initSalaryIndex]
      },
      //确认
      handleClickAffirm(){
        this.$store.state.storeAudioList && this.$store.state.storeAudioList.key && this.$store.state.storeAudioList.key.play()
        this.$store.commit("setDramaIntention", this.intention)
        let jobs = this.jobDramaData.jobs[this.intention.class][this.intention.salary]
        this.$store.commit("setDramaJobs", jobs)
        this.showMessage = true
        setTimeout(() => {
           this.$router.replace("/jobs")
        }, 1000)
      }
    }
  }
</script>
<style lang="less" scoped>
  .home{
    background: #FFBF10;
    width: 100%;
    height: 100%;
    padding-top: 80px;
    font-family: FZXS24--GB1-0, FZXS24--GB1;
    .title{
      font-size: 16px;
      font-weight: normal;
      color: #000000;
      line-height: 16px;
      text-align: center;
      margin-bottom: 38px;
    }
    .gender-select-box{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 48px;
      .item-box{
        margin: 0 12px;
        .gender-name{
          font-size: 14px;
          font-weight: normal;
          color: #55410D;
          line-height: 14px;
          margin-bottom: 16px;
          text-align: center;
          &.active{
            color: #000;
          }
        }
        .image-bg{
          width: 80px;
          height: 80px;
          background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/identity/select-box.png");
          background-size: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          & > img{
            width: 24px;
            height: 39px
          }
          &.active{
            background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/identity/select-box-active.png");
          }
        }
      }
    }
    .input-box{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0 0 24px;
      margin-bottom: 28px;
      .input-title{
        font-size: 16px;
        font-weight: normal;
        color: #000000;
        line-height: 16px;
        letter-spacing: 4px;
      }
      .right-input{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .input{
          width: 206px;
          height: 44px;
          background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/identity/input.png");
          background-size: 100%;
          padding: 15px 0 15px 17px;
          font-size: 14px;
          font-weight: normal;
          color: #000000;
          line-height: 14px;;
        }
        .right-icon-max{
          width: 25px;
          height: 22px;
          background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/identity/refresh.png");
          background-size: 100%;
          margin-right: 24px;
          margin-left: 10px;
          transform-origin: 11px 11px
        }
        .spin{
          animation-name: toggle-up;
          animation-duration: 0.5s;
          animation-fill-mode: forwards;
        }
        @keyframes toggle-up {
          100% {
            transform: rotate(360deg);
          }
        }
        .right-icon{
          width: 20px;
          height: 20px;
          background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/identity/right.png");
          background-size: 100%;
          margin-right: 29px;
          margin-left: 10px;

        }
        .left-icon{
          width: 20px;
          height: 20px;
          background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/identity/left.png");
          background-size: 100%;
          margin-right: 10px;

        }
      }

    }
  }
</style>
