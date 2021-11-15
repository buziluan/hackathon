<template>
  <div class="game-one-box">
    <game-box>
      <div slot="main" class="game-one-content-box" data-score="100">
        <div class="total-box">
          <div class="score-box">{{showTotalScore}}</div>
          <div class="alarm"></div>
          <div class="time-box">{{time}}s</div>
        </div>
        <div class="user-box">
          <transition name="fade">
            <div class="score-box-tips" v-if="score">{{score.score > 0 ?  `学习了${score.name}` : `你${score.name}了`}}</div>
          </transition>
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
  import {crash} from "../assets/js/utils";
  import {schoolDramaData} from "./drama.json"
  import domeDrama from "./drama_dom.json"
  import MessageBox from "../components/MessageBox";
  export default {
    name: "GameOne",
    components: {GameBox, KeyboardBox, MessageBox},
    data(){
      return {
        userBox: null,
        stage: null,
        score: null,
        totalScore: [],
        randomTimer: null,
        isStart: false,
        isEnd: false,
        showMessage: false,
        schoolDramaData: schoolDramaData ,
        time: 0,
        gameTimer: null,
        isPass: false
      }
    },
    computed: {
      userInfo(){
        return this.$store.state.drama.userInfo
      },
      showTotalScore(){
        return this.totalScore.map(item => item.score).reduce( (total, currentValue) =>{
          return total + currentValue;
        }, 0);
      },
      showMessageData(){
        if(!this.isStart){
          return this.schoolDramaData.beforeText[this.schoolDramaData.beforeTextIndex]
        }else if(this.isEnd){
          return this.schoolDramaData.afterText[this.schoolDramaData.afterTextIndex]
        }else {
          return  ""
        }
      }
    },
    mounted() {
      if(this.$store.state.isDemo){
        this.schoolDramaData = domeDrama.schoolDramaData
      }
      this.time = this.schoolDramaData.gameTime
      this.schoolDramaData.beforeTextIndex = 0
      this.schoolDramaData.afterTextIndex = 0
      this.stage =  document.querySelector(".game-one-content-box")
      this.userBox = document.querySelector(".user-box")
      this.userBox.left = false
      this.userBox.right = false
      this.userMove()
      if(this.showMessageData){
        this.showMessage = true
      }
    },
    watch:{
      score(value){
        if(value != null){
          setTimeout(()=>{
            this.score = null
          },500)
        }
      },
      time(value){
        if(value === 0){
          this.gameOver()
        }
      }
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
          this.userBox[type] = false
        }
      },
      handleKeyboardDown(type){
        if(type === 'left' || type === 'right'){
          if(this.isEnd) return;
          this.userBox[type] = true
        }else if(type === 'b' || type === 'a'){

          if(this.isStart && !this.isEnd) return;

          if(!this.isStart && this.schoolDramaData.beforeTextIndex === 0){
            this.schoolDramaData.beforeTextIndex += 1
            if(this.schoolDramaData.beforeTextIndex === this.schoolDramaData.beforeText.length){
              this.showMessage = false
              this.startGame()
            }
          }else if(!this.isStart) {
            this.schoolDramaData.beforeTextIndex += 1
            if(this.schoolDramaData.beforeTextIndex === this.schoolDramaData.beforeText.length){
              this.showMessage = false
              this.startGame()
            }
          }

          if(this.isEnd && this.schoolDramaData.afterTextIndex === 0){
            this.schoolDramaData.afterTextIndex += 1
            if(this.schoolDramaData.afterTextIndex === this.schoolDramaData.afterText.length){
              this.resetOrNext(type)
              this.showMessage = false
            }
          }else if(this.isEnd) {
            this.schoolDramaData.afterTextIndex += 1
            if(this.schoolDramaData.afterTextIndex === this.schoolDramaData.afterText.length){
              this.resetOrNext(type)
              this.showMessage = false
            }
          }

        }
      },
      userMove(){
        if(this.userBox.right){
          if((this.userBox.offsetLeft + 36 ) >= this.stage.offsetWidth){
            this.userBox.style.left = `${this.stage.offsetWidth - 36}px`
          }else {
            this.userBox.style.left = this.userBox.offsetLeft + 5 + 'px'
          }
        }
        if(this.userBox.left){
          if(this.userBox.offsetLeft <= 0){
            this.userBox.style.left = '0px'
          }else {
            this.userBox.style.left = this.userBox.offsetLeft - 5 + 'px'
          }
        }
        requestAnimationFrame(()=>this.userMove())
        let list = document.querySelectorAll(".prop-item")
        Array.from(list).forEach(item => {
          if(crash(this.userBox, item)){
            let score = item.getAttribute('score') || item.score
            this.score = JSON.parse(score)
            this.totalScore.push(this.score)
            item.remove()
            if(this.score.score > 0){
              this.$store.state.storeAudioList && this.$store.state.storeAudioList.star && this.$store.state.storeAudioList.star.play()
            }else {
              this.$store.state.storeAudioList && this.$store.state.storeAudioList.bomb && this.$store.state.storeAudioList.bomb.play()
            }
          }
        })

      },
      createRandomBox(){

        let courseList = this.schoolDramaData.course[this.userInfo.major]
        let negativeList = this.schoolDramaData.negative
        this.randomTimer = setInterval(()=>{
          let box = document.createElement("div")
          let rom = (Math.random() - 0.2) > 0
          box.classList = `prop-item ${ rom ? '' : 'bomb'}`
          let left = this.stage.offsetWidth / 30 * (Math.random() * 30 + 1) + this.stage.offsetWidth / 30
          left = Math.min(...[left, this.stage.offsetWidth - 50])
          left = Math.max(...[left, 0])
          box.style.left = left + "px";
          box.style.top = -20 * (Math.random() * 4 + 1) + "px";
          box.score = rom ? JSON.stringify(courseList[Math.floor(Math.random() * courseList.length)]) : JSON.stringify(negativeList[Math.floor(Math.random() * negativeList.length)])
          this.stage.appendChild(box)
          this.randomBoxMove(box, 1 + Math.floor(Math.random() * 3) )
        }, 1500)

      },
      randomBoxMove(dom, speed) {
        dom.style.top = dom.offsetTop + speed + "px";
        if ((dom.offsetTop + 45) < this.stage.offsetHeight) {
          requestAnimationFrame(() => this.randomBoxMove(dom, speed))
        } else {
          dom.remove()
        }
      },
      startGame(){
        this.createRandomBox()
        this.isStart = true
        if(this.isStart){
          if(this.gameTimer)return;
          this.gameTimer = setInterval(()=>{
            this.time -= 1
            if(this.time === 0){
              clearInterval(this.gameTimer)
              this.gameTimer = null
            }
          }, 1000)
        }
      },
      gameOver(){
        clearInterval(this.randomTimer)
        clearInterval(this.gameTimer)
        this.schoolDramaData.afterTextIndex = 0
        this.isEnd = true
        let list = document.querySelectorAll(".prop-item")
        Array.from(list).forEach(item => {
          item.remove()
        })
        let getScore = this.showTotalScore
        let passScore = this.schoolDramaData.passScore[this.userInfo.education]
        let afterText = this.schoolDramaData.afterText
        if(getScore >= passScore){
          this.$store.state.storeAudioList && this.$store.state.storeAudioList.pass && this.$store.state.storeAudioList.pass.play && this.$store.state.storeAudioList.pass.play()
          this.isPass = true
          let textItem =  {
            "name": "系统",
            "image": "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/home/system.png",
            "text": "恭喜你毕业成功"
          }
          afterText = this.schoolDramaData.backupsAfterText
          afterText.unshift(textItem)
          this.schoolDramaData.afterText = afterText
        }else {
          this.$store.state.storeAudioList && this.$store.state.storeAudioList.err && this.$store.state.storeAudioList.err.play && this.$store.state.storeAudioList.err.play()
          this.isPass = false
          let textItem1 =  {
            "name": "系统",
            "image": "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/home/system.png",
            "text": "分数不足毕业失败！"
          }
          let textItem2 =  {
            "name": "系统",
            "image": "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/home/system.png",
            "text": "按A键重新选择学历,按B键重新开启游戏"
          }
          this.schoolDramaData.afterText = [textItem1, textItem2]
        }
        this.showMessage = true
      },
      resetOrNext(type){
        if(this.isPass){
          this.schoolDramaData.beforeTextIndex = 0
          this.schoolDramaData.afterTextIndex = 0
          setTimeout(()=>{
            this.$router.replace("/Intention")
          }, 100)
        }else {
          if(type === 'a'){
            setTimeout(()=>{
              this.$router.replace("/identity")
            })
          }else {
            this.time = this.schoolDramaData.gameTime
            this.totalScore = []
            this.score = null
            this.isEnd = false
            this.startGame()
          }
        }
      }
    },
    beforeDestroy() {
      clearInterval(this.randomTimer)
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
  .game-one-content-box{
    width: 345px;
    height: 468px;
    background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/game1-bg.png");
    background-size: 100%;
    position: relative;
    overflow-y: hidden;
    margin-top: -7px;
  }
  .user-box{
    width: 36px;
    height: 59px;
    position: absolute;
    bottom: 30px;
    left: calc(50% - 18px);
    background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/identity/man.png");
    background-size: 100% 100%;
    .score-box-tips{
      width: 150px;
      font-size: 14px;
      color: #fff;
      text-align: center;
      position: absolute;
      top: -20px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .total-box{
    padding: 20px;
    display: flex;
    justify-content: flex-end;
    font-size: 12px;
    align-items: center;
    color: #000000;
    font-weight: 600;
    .score-box{
      width: 86px;
      height: 24px;
      background-size: 100%;
      background-repeat: no-repeat;
      background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/scord-box.png");
      margin-right: 18px;
      line-height: 24px;
      text-align: right;
      padding-right: 12px;
    }
    .alarm{
      background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/alarm.png");
      width: 19px;
      height: 19px;
      background-size: 100%;
      background-repeat: no-repeat;
      margin-right: 6px;
    }
    .time-box{
      background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/time-box.png");
      width: 40px;
      height: 24px;
      background-size: 100%;
      background-repeat: no-repeat;
      text-align: center;
      line-height: 24px;
    }
  }

}
</style>
