<template>
  <div class="home">
    <p class="title">选择你的性别</p>
    <div class="gender-select-box">
      <div class="item-box">
        <p :class="['gender-name', userData.gender == 'man' ? 'active' : '']">男</p>
        <div :class="['image-bg',  userData.gender == 'man' ? 'active' : '']" @click="handleClickGender('man')">
          <img :src="userData.gender == 'man' ? 'https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/identity/man.png' : 'https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/identity/man.png'"/>
        </div>
      </div>
      <div class="item-box">
        <p :class="['gender-name',  userData.gender == 'woman' ? 'active' : '']">女</p>
        <div :class="['image-bg',  userData.gender == 'woman' ? 'active' : '']" @click="handleClickGender('woman')">
          <img :src="userData.gender == 'woman' ? 'https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/identity/woman.gif' : 'https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/identity/woman.png'"/>
        </div>
      </div>
    </div>
    <div class="input-box">
      <p class="input-title">名字</p>
      <div class="right-input">
        <div class="input">{{userData.name}}</div>
        <div class="right-icon-max" @click="handleClickName"></div>
      </div>
    </div>
    <div class="input-box">
      <p class="input-title">学历</p>
      <div class="right-input">
        <div class="left-icon" @click="handleClickEducation(-1)"></div>
        <div class="input">{{userData.education}}</div>
        <div class="right-icon" @click="handleClickEducation(1)"></div>
      </div>
    </div>
    <div class="input-box">
      <p class="input-title">专业</p>
      <div class="right-input">
        <div class="left-icon" @click="handleClickMajor(-1)"></div>
        <div class="input">{{userData.major}}</div>
        <div class="right-icon" @click="handleClickMajor(1)"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import randomName from "../assets/json/name.json"
  export default {
    name: 'Home',
    data(){
      return {
        userData: {
          name: "马晨晨",
          gender: "woman",
          education: "本科",
          major: "计算机"
        },
        educationList: ['专科', '本科', '硕士', '博士'],
        majorList: ['计算机', '媒介', '人力资源', '金融'],
        initEducationIndex: 1,
        initMajorIndex: 0,
      }
    },
    mounted() {
    },
    methods:{
      //选择性别
      handleClickGender(type){
        this.userData.gender = type
      },
      //随机生成名字
      handleClickName(){
        let surname = randomName.name[Math.floor(Math.random() * randomName.name.length)]
        let name =  randomName.surname[Math.floor(Math.random() * randomName.surname.length)]
        this.userData.name = surname + name;
        let dom = document.querySelector(".right-icon-max")
        dom.className = 'spin right-icon-max'
        setTimeout(()=>{
          dom.className = 'right-icon-max'
        },1000)
      },
      //选择学历
      handleClickEducation(num){
        this.initMajorIndex = this.initMajorIndex + num
        if(this.initMajorIndex < 0){
          this.initMajorIndex = 3
        }else if(this.initMajorIndex > 3){
          this.initMajorIndex = 0
        }
        this.userData.education = this.educationList[this.initMajorIndex]
      },
      //选择专业
      handleClickMajor(num){
        this.initMajorIndex = this.initMajorIndex + num
        if(this.initMajorIndex < 0){
          this.initMajorIndex = 3
        }else if(this.initMajorIndex > 3){
          this.initMajorIndex = 0
        }
        this.userData.major = this.majorList[this.initMajorIndex]
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
