<template>
  <div class="home">
    <p class="title">租房设置</p>
    <div class="input-box">
      <p class="input-title">城市</p>
      <div class="right-input">
        <div class="left-icon not-icon"></div>
        <div class="input">{{house.city}}</div>
        <div class="right-icon not-icon"></div>
      </div>
    </div>
    <div class="input-box">
      <p class="input-title">时间</p>
      <div class="right-input">
        <div class="left-icon" @click="handleClickTime(-1)"></div>
        <div class="input">{{house.time}}</div>
        <div class="right-icon" @click="handleClickTime(1)"></div>
      </div>
    </div>
    <div class="input-box">
      <p class="input-title">租金</p>
      <div class="right-input">
        <div class="left-icon not-icon"></div>
        <div class="input">{{house.money}}</div>
        <div class="right-icon not-icon"></div>
      </div>
    </div>
    <affirm-button text="确定" style="margin-top: 42px" @click.native="handleClickAffirm"/>
    <message-box v-if="showMessage" :data="textData"></message-box>
  </div>
</template>

<script>
  import AffirmButton from "../components/AffirmButton";
  import {houseDramaData} from "./drama.json"
  import MessageBox from "../components/MessageBox";
  import domeDrama from "./drama_dom.json";
  export default {
    name: 'Renting',
    components: {AffirmButton, MessageBox},
    data(){
      return {
        house: {
          time: "半小时内",
          city: "",
          money: ""
        },
        timeList: ['半小时内', '1小时', '1个半小时', "更多"],
        initTimeIndex: 0,
        initMoneyIndex: 0,
        houseDramaData,
        showMessage: false,
        textData: {
          text: "真·人工帮你搜索职位中...",
          name: "世伟",
          image: "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/home/system.png"
        }
      }
    },
    computed: {
      city(){
       return  this.$store.state.drama.intention.city
      }
    },
    mounted() {
      if(this.$store.state.isDemo){
        this.houseDramaData = domeDrama.houseDramaData
      }
      this.house.city = this.city
      this.house.money = this.houseDramaData.rentHouse[this.city][this.house.time]
    },
    methods:{
      //选择通勤时间
      handleClickTime(num){
        this.initTimeIndex = this.initTimeIndex + num
        if(this.initTimeIndex < 0){
          this.initTimeIndex = 2
        }else if(this.initTimeIndex > 2){
          this.initTimeIndex = 0
        }
        this.house.time = this.timeList[this.initTimeIndex]
        this.house.money = this.houseDramaData.rentHouse[this.city][this.house.time]
      },
      //确认
      handleClickAffirm(){
        this.$store.commit("setDramaHouse",this.house)
        this.$router.replace("/three")
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
        .not-icon{
          background-image: none !important;
        }
      }

    }
  }
</style>
