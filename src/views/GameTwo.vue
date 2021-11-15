<template>
  <div class="game-one-box">
    <game-box>
      <div slot="main" class="game-two-content-box" data-score="100">
        <div class="question-box">
          <span>{{showText}}</span>
        </div>
<!--        <div class="btn-list">-->
<!--          <div :class='["btn-item", cursorIndex === 0 && btnIndex === 0 ? "active" : ""]'>-->
<!--            回答-->
<!--          </div>-->
<!--          <div :class='["btn-item", cursorIndex === 0 && btnIndex === 1 ? "active" : ""]'>-->
<!--            我不会-->
<!--          </div>-->
<!--        </div>-->
        <div class="cardList">
          <div :class="['card-item', cursorIndex === 1 && selectCardIndex === index ? 'active' : '',  selectCardIndex === index ? 'open' : '']" v-for="(item, index) in answerCardList" :key="item.name + item.level + index" :style="{zIndex: index + 1}">
            <div class="card-title">
              <div :class="`level${item.level}`"></div>
              <p>{{item.name}}</p>
            </div>
          </div>
        </div>
      </div>
      <keyboard-box slot="keyboard" @on-keyboard="handleClickMove"/>
    </game-box>
    <message-box v-if="showMessage" :data="showMessageData"></message-box>
  </div>
</template>

<script>
  import GameBox from "../components/GameBox";
  import KeyboardBox from "../components/KeyboardBox";
  import MessageBox from "../components/MessageBox";
  import {jobDramaData} from "./drama.json"
  import domeDrama from "./drama_dom.json";
  const levelText = {
    1: '初级',
    2: '中级',
    3: '高级'
  }
  const levelText1 = {
    '初级': 1,
    '中级': 2,
    '高级': 3
  }
  export default {
    name: "GameTwo",
    components: {GameBox, KeyboardBox, MessageBox},
    data(){
      return {
        stage: null,
        cursorIndex: 1,
        btnIndex: 0,
        selectCardIndex: 0,
        questionList: [],
        answerCardList: [],
        questionIndex: 0,
        showText: "",
        isEnd: false,
        isStart: false,
        showMessage: false,
        jobDramaData,
        correct: 0
      }
    },
    computed:{
      questionText(){
        return this.questionList.length > 0 ? `问你一道${this.questionList[this.questionIndex].name}的${levelText[this.questionList[this.questionIndex].level]}问题.......` : "稍等片刻"
      },
      level(){
        return this.$store.state.drama.intention.salary
      },
      selectJobs(){
        return this.$store.state.drama.selectJob
      },
      showMessageData(){
        if(!this.isStart){
          return this.jobDramaData.beforeText[this.jobDramaData.beforeTextIndex]
        }else if(this.isEnd){
          if(this.correct > this.jobDramaData.passScore){
            return this.jobDramaData.afterText[this.jobDramaData.afterTextIndex]
          }else {
            return this.jobDramaData.notPassText[this.jobDramaData.afterTextIndex]
          }
        }else {
          return  ""
        }
      }
    },
    mounted() {
      if(this.$store.state.isDemo){
        this.jobDramaData = domeDrama.jobDramaData
      }
      this.jobDramaData.beforeTextIndex = 0;
      this.jobDramaData.afterTextIndex = 0;
      this.stage =  document.querySelector(".game-one-content-box")
      this.showText = this.questionText
      if(this.showMessageData){
        this.showMessage = true
      }
    },
    watch:{
    },
    methods: {
      handleClickMove({type, keyType }){
        if(keyType === 'up'){
          this.handleKeyboardUp(type)
        }else {
          this.handleKeyboardDown(type)
        }
      },
      handleKeyboardUp(type){
        if(type === 'left' || type === 'right'){
          console.log("up",type)
        }
      },
      handleKeyboardDown(type){

        if(this.isEnd || !this.isStart){
          if(type === 'b' || type === 'a'){
            if(!this.isStart && !this.isEnd){
              if(!this.isStart && this.jobDramaData.beforeTextIndex === 0){
                this.jobDramaData.beforeTextIndex += 1
                if(this.jobDramaData.beforeTextIndex === this.jobDramaData.beforeText.length){
                  this.showMessage = false
                  this.startGame()
                }
              }else if(!this.isStart) {
                this.jobDramaData.beforeTextIndex += 1
                if(this.jobDramaData.beforeTextIndex === this.jobDramaData.beforeText.length){
                  this.showMessage = false
                  this.startGame()
                }
              }
            }else if(this.isEnd){
              if(this.jobDramaData.afterTextIndex === 0){
                this.jobDramaData.afterTextIndex += 1
                if(this.correct > this.jobDramaData.passScore){
                  if(this.jobDramaData.afterTextIndex === this.jobDramaData.afterText.length){
                    this.showMessage = false
                    this.resetOrNext()
                  }
                }else {
                  if(this.jobDramaData.afterTextIndex === this.jobDramaData.notPassText.length){
                    this.showMessage = false
                    this.resetOrNext()
                  }
                }

              }else{
                this.jobDramaData.afterTextIndex += 1
                if(this.correct > this.jobDramaData.passScore){
                  if(this.jobDramaData.afterTextIndex === this.jobDramaData.afterText.length){
                    this.showMessage = false
                    this.resetOrNext()
                  }
                }else {
                  if(this.jobDramaData.afterTextIndex === this.jobDramaData.notPassText.length){
                    this.showMessage = false
                    this.resetOrNext()
                  }
                }
              }
            }
          }
          return
        }

        if(type === 'left' || type === 'right' || type === "b" || type === "a"){

          if(type === 'b' || type === 'a'){
            if(this.selectCardIndex != -1 ){
              if(type === 'b' ){
                let question = this.questionList[this.questionIndex]
                let answer = this.answerCardList[this.selectCardIndex]
                if(answer.level >= question.level && answer.name === question.name){
                  this.showText = "👌好的，不错"
                  this.correct += 1
                }else{
                  this.showText = "👌好的，下去可以再思考思考"
                }
                this.answerCardList.splice(this.selectCardIndex, 1)
                this.selectCardIndex = -1
                this.questionIndex += 1
                if(this.questionIndex === this.questionList.length){
                  this.isEnd = true
                  setTimeout(()=>{
                    this.showText = '面试结束啦。回去等待通知吧！！！'
                    this.gameOver()
                  }, 1000)

                }else {
                  setTimeout(()=>{
                    this.showText = this.questionText
                  }, 1000)
                }
              }else {
                this.selectCardIndex = -1
                this.showText = "😯 哦好吧"
                this.questionIndex += 1
                if(this.questionIndex === this.questionList.length){
                  this.isEnd = true
                  setTimeout(()=>{
                    this.showText = '面试结束啦。回去等待通知吧！！！'
                    this.gameOver()
                  }, 1000)
                }else {
                  setTimeout(()=>{
                    this.showText = this.questionText
                  }, 1000)
                }
              }

            }else {
              if(this.btnIndex === 0){
                this.showText = "？？？？你倒是说呀"
                setTimeout(()=>{
                  this.showText = this.questionText
                }, 1000)
              }else {
                this.showText = "😯 哦好吧"
                this.questionIndex += 1
                if(this.questionIndex === this.questionList.length){
                  this.isEnd = true
                  setTimeout(()=>{
                    this.showText = '面试结束啦。回去等待通知吧！！！'
                    this.gameOver()
                  }, 1000)
                }else {
                  setTimeout(()=>{
                    this.showText = this.questionText
                  }, 1000)
                }
              }
            }
          }

          if(type != 'b' && type != 'a'){
            if(type === 'left'){
              if(this.selectCardIndex === -1 || this.selectCardIndex === 0){
                this.selectCardIndex =  0
              }else {
                this.selectCardIndex -= 1
              }
            }else  if(type === 'right'){
              if(this.selectCardIndex ===  this.answerCardList.length - 1){
                this.selectCardIndex = this.answerCardList.length - 1
              }else {
                this.selectCardIndex += 1
              }
            }
          }
        }
      },
      startGame(){
        this.questionList = this.selectJobs.question.map(item => {
          return {
            name: item,
            level: Math.random() - 0.2 > 0 ?  levelText1[this.level] : 2
          }
        })
        this.answerCardList = this.selectJobs.question.map(item => {
          return {
            name: item,
            level: Math.random() - 0.2 > 0 ?  levelText1[this.level] : 2
          }
        })
        let tempList = this.selectJobs.question.map(item => {
          return {
            name: item,
            level: Math.random() - 0.8 > 0 ?  levelText1[this.level] : 2
          }
        })
        this.answerCardList.push(tempList[Math.floor(Math.random() * 5)])
        this.answerCardList.push(tempList[Math.floor(Math.random() * 5)])
        this.showText = this.questionText
        this.isStart = true
        this.isEnd = false
      },
      gameOver(){
        setTimeout(()=>{
          this.isEnd = true
          this.showMessage = true
          if(this.correct > this.jobDramaData.passScore){
            this.$store.state.storeAudioList && this.$store.state.storeAudioList.pass && this.$store.state.storeAudioList.pass.play && this.$store.state.storeAudioList.pass.play()
          }else {
            this.$store.state.storeAudioList && this.$store.state.storeAudioList.err && this.$store.state.storeAudioList.err.play && this.$store.state.storeAudioList.err.play()
          }
        },1000)
      },
      resetOrNext(){
        if(this.correct > this.jobDramaData.passScore){
          this.$router.replace("/renting")
        }else {
          setTimeout(()=>{
            this.$router.replace("/intention")
          })
        }
      }
    },
    beforeDestroy() {
    }
  }
</script>

<style scoped lang="less">
.game-one-box{
  width: 100%;
  height: 100%;
  background: black;
  display: flex;
  align-items: center;
  .game-two-content-box{
    width: 345px;
    height: 468px;
    background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/office/office.png");
    background-size: 100%;
    position: relative;
    overflow-y: hidden;
    margin-top: -7px;
    padding-top: 80px;
    .question-box{
      width: 196px;
      height: 65px;
      background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/office/message.png");
      background-size: 100%;
      margin: 0 auto;
      padding: 8px 14px;
      font-size: 13px;
      font-weight: 600;
      color: #5F5F5F;
      line-height: 20px;
      display: flex;
      align-items: center;
    }
    .btn-list{
      display: flex;
      justify-content: center;
      position: absolute;
      top: 270px;
      left: 50%;
      transform: translateX(-50%);
      .btn-item{
        width: 74px;
        height: 29px;
        background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/office/btn.png");
        background-size: 100%;
        background-repeat: no-repeat;
        font-size: 13px;
        font-weight: 600;
        color: #FFFFFF;
        text-shadow: 0px 3px 3px rgba(84, 84, 84, 0.46);
        line-height: 25px;
        text-align: center;
        margin: 0 8px;
        &.active{
          height: 35px;
          transform: translateY(-2px);
          background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/office/affirm-btn.png");
        }
      }
    }
    .cardList{
      position: absolute;
      bottom: 60px;
      display: flex;
      left: calc(50% - 10px);
      transform: translateX(-50%);
      .card-item{
        width: 48px;
        height: 69px;
        margin-right: -24px;
        background-size: 100%;
        background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/office/card.png");
        background-repeat: no-repeat;
        padding: 4px;
        &.active{
          background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/office/card-active.png");
        }
        &.open{
          background-repeat: no-repeat;
          transform: translateY(-20px);
          background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/office/card-active.png");
        }
        .card-title{
          width: 22px;
          word-wrap: break-word;
          text-align: center;
          font-weight: 600;
          color: #5F5F5F;
          .level1{
            width: 10px;
            height: 10px;
            background-size: 100%;
            background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/office/level1.png");
            background-repeat: no-repeat;
            margin: 5px auto 0;
          }
          .level2{
            width: 22px;
            height: 10px;
            background-size: 100%;
            background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/office/level2.png");
            background-repeat: no-repeat;
            transform: scale(0.8);
            margin: 5px auto 0;
          }
          .level3{
            width: 22px;
            height: 20px;
            background-size: 100%;
            background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/office/level3.png");
            background-repeat: no-repeat;
            transform: scale(0.6);
          }
          p{
            font-size: 9px;
            line-height: 10px;
            transform: scale(10 / 12);
          }
        }
      }
    }
  }
}
</style>
