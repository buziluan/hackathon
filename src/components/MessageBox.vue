<template>
  <div class="message-box">
    <div class="content-box">
      {{data.text}}
    </div>
    <div class="arrows-box"></div>
    <div class="user-name">
      {{data.name}}
    </div>
    <div class="user-image" :style="{backgroundImage: `url(${data.image})`}"></div>
  </div>
</template>

<script>
  export default {
    name: "MessageBox",
    props: {
      data: Object
    },
    data(){
      return {

      }
    },
    mounted() {
      let bodyHeight = document.body.offsetHeight
      let dom = document.querySelector(".message-box")
      if(bodyHeight < 715){
        dom.style.transform = `translate(-50%, -50%) scale(${bodyHeight / 715  - 0.05}) `
      }
    },
    methods: {

    }

  }
</script>

<style scoped lang="less">
.message-box{
  width: 324px;
  height: 212px;
  position: fixed;
  top: 40%;
  left: 50%;
  margin: 0 auto;
  transform: translate(-50%, -50%);
  background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/message-box.png");
  background-size: 100%;
  z-index: 9;
  padding: 60px 27px 0px 30px;
  font-size: 16px;
  font-weight: normal;
  color: #282828;
  line-height: 24px;
  .content-box{
    width: 100%;
    height: 90px;
    padding-right: 3px;
  }
  .arrows-box{
    position: absolute;
    right: 32px;
    width: 11px;
    height: 7px;
    bottom: 60px;
    background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/arrows.png");
    background-size: 100%;
    animation: toggle-up 0.7s infinite;
  }
  @keyframes toggle-up {
    0%{
      opacity: 1;
    }
    50%{
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .user-name{
    width: 30px;
    text-align: center;
    font-size: 14px;
    font-weight: normal;
    color: #000001;
    line-height: 14px;
    position: absolute;
    bottom: 18px;
    right: 64px;
  }
  .user-image{
    background-size: 100%;
    width: 21px;
    height: 29px;
    position: absolute;
    bottom: 12px;
    right: 27px;
  }
}
</style>
