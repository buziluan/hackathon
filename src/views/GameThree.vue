<template>
  <div class="game-one-box">
    <game-box>
      <div slot="main" class="game-one-content-box">
      </div>
      <keyboard-box slot="keyboard" @on-keyboard="handleClickMove"/>
    </game-box>
    <message-box v-if="showMessage" :data="showMessageData"></message-box>
  </div>
</template>

<script>
  import GameBox from "../components/GameBox";
  import KeyboardBox from "../components/KeyboardBox";
  import Game from "../assets/js/game"
  import {houseDramaData} from "./drama.json"
  import MessageBox from "../components/MessageBox";
  import domeDrama from "./drama_dom.json";
  export default {
    name: "GameThree",
    components: {GameBox, KeyboardBox, MessageBox},
    data(){
      return {
        userBox: null,
        stage: null,
        game: null,
        isStart: false,
        isEnd: false,
        houseDramaData,
        showMessage: false,
        score: 0
      }
    },
    computed:{
      showMessageData(){
        if(!this.isStart){
          return this.houseDramaData.beforeText[this.houseDramaData.beforeTextIndex]
        }else if(this.isEnd){
          if(this.score > this.houseDramaData.passScore){
            return this.houseDramaData.afterText[this.houseDramaData.afterTextIndex]
          }else {
            return this.houseDramaData.notPassText[this.houseDramaData.afterTextIndex]
          }
        }else {
          return  ""
        }
      }
    },
    mounted() {
      if(this.$store.state.isDemo){
        this.houseDramaData = domeDrama.houseDramaData
      }
      this.houseDramaData.beforeTextIndex = 0
      this.houseDramaData.afterTextIndex = 0
      this.stage = document.querySelector(".game-one-content-box")
      this.game = new Game(this.stage, this)
      this.$on("game-over", (score) => {
        this.score = score
        this.gameOver()
      })
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
          console.log("抬起", type)
        }
      },
      handleKeyboardDown(type){
        if(type === 'b' || type === 'a'){
          if(!this.isStart && !this.isEnd){
            if(!this.isStart && this.houseDramaData.beforeTextIndex === 0){
              this.houseDramaData.beforeTextIndex += 1
              if(this.houseDramaData.beforeTextIndex === this.houseDramaData.beforeText.length){
                this.showMessage = false
                setTimeout(()=>{
                  this.startGame()
                },500)
              }
            }else if(!this.isStart) {
              this.houseDramaData.beforeTextIndex += 1
              if(this.houseDramaData.beforeTextIndex === this.houseDramaData.beforeText.length){
                this.showMessage = false
                setTimeout(()=>{
                  this.startGame()
                },500)
              }
            }
          }else if(this.isEnd){
            if(this.houseDramaData.afterTextIndex === 0){
              this.houseDramaData.afterTextIndex += 1
              if(this.score > this.houseDramaData.passScore){
                if(this.houseDramaData.afterTextIndex === this.houseDramaData.afterText.length){
                  this.showMessage = false
                  this.resetOrNext(type)
                }
              }else {
                if(this.houseDramaData.afterTextIndex === this.houseDramaData.notPassText.length){
                  this.showMessage = false
                  this.resetOrNext(type)
                }
              }

            }else{
              this.houseDramaData.afterTextIndex += 1
              if(this.score > this.houseDramaData.passScore){
                if(this.houseDramaData.afterTextIndex === this.houseDramaData.afterText.length){
                  this.showMessage = false
                  this.resetOrNext(type)
                }
              }else {
                if(this.houseDramaData.afterTextIndex === this.houseDramaData.notPassText.length){
                  this.showMessage = false
                  this.resetOrNext(type)
                }
              }
            }

          }
          if(this.isStart && !this.isEnd){
            this.game.start()
          }
        }

      },
      startGame(){
        this.isStart = true
        this.game.start()
      },
      gameOver(){
        this.isEnd = true
        setTimeout(()=>{
          this.showMessage = true
          if(this.score > this.houseDramaData.passScore){
            this.$store.state.storeAudioList && this.$store.state.storeAudioList.pass && this.$store.state.storeAudioList.pass.play && this.$store.state.storeAudioList.pass.play()
          }else {
            this.$store.state.storeAudioList && this.$store.state.storeAudioList.err && this.$store.state.storeAudioList.err.play && this.$store.state.storeAudioList.err.play()
          }
        },1000)
      },
      resetOrNext(type){
        if(this.score > this.houseDramaData.passScore){
          this.$router.replace("/four")
        }else{
          if(type === 'a'){
            this.$router.replace("/renting")
          }else {
            this.isEnd = false
            this.houseDramaData.afterTextIndex = 0
            this.game.init()
          }
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
  .game-one-content-box{
    width: 345px;
    height: 468px;
    /*background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/game1-bg.png");*/
    background-size: 100%;
    position: relative;
    overflow-y: hidden;
    margin-top: -7px;
  }

}
</style>
