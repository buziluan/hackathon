<template>
  <div class="game-one-box">
    <game-box>
      <div slot="main" class="game-one-content-box">
        <div class="title-image"></div>
        <div class="time-box">
          <div class="alarm-box"></div>
          <div class="time-show-box">{{time}}s</div>
        </div>
        <div class="card-list">
          <template  v-for="(item,index) in cardListData">
            <div :class="['card-item', 'card-bg' , item.x == activeIndex.x && item.y === activeIndex.y  ? 'active' : '']"  :key="index + '-1'" v-if="!item.isEnd && !item.isOpen">
            </div>
            <div :class="[ item.x == activeIndex.x && item.y === activeIndex.y  ?  'active-open' : '' ,'card-open' ,'card-item']"  v-else-if="!item.isEnd && item.isOpen"  :key="index + '-2'" :style="{backgroundImage: `url(https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/card${item.name}.png)`}">

            </div>
            <div :class="['card-item', 'end-item', item.x == activeIndex.x && item.y === activeIndex.y  ?  'end-item-active' : '']"  :key="index + '-3'"   v-else>
            </div>
          </template>

        </div>
      </div>
      <keyboard-box slot="keyboard" @on-keyboard="handleClickKeyBoard"/>
    </game-box>
    <message-box :data="showMessageData" v-if="showMessage"></message-box>
  </div>
</template>

<script>
  import GameBox from "../components/GameBox";
  import KeyboardBox from "../components/KeyboardBox";
  import {workDramaData} from "./drama.json"
  import MessageBox from "../components/MessageBox";
  import domeDrama from "./drama_dom.json"
  export default {
    name: "GameFour",
    components: {GameBox, KeyboardBox, MessageBox},
    data(){
      return {
        stage: null,
        cardListData: [],
        activeIndex: {x: -1, y: -1, nowIndex: -1},
        isForbid: false,
        selectList: [],
        isStart: false,
        showMessage: false,
        workDramaData,
        time: 0,
        timer: null
      }
    },
    computed:{
      showMessageData(){
        if(!this.isStart){
          return this.workDramaData.beforeText[this.workDramaData.beforeTextIndex]
        }else if(this.isEnd){
          return this.workDramaData.afterText[this.workDramaData.afterTextIndex]
        }else {
          return  {}
        }
      },
      isEnd(){
        return this.cardListData.length > 0 && this.cardListData.filter(item => item.isEnd).length >= this.workDramaData.passScore
      }
    },
    mounted() {
      if(this.$store.state.isDemo){
        this.workDramaData = domeDrama.workDramaData
      }
      this.workDramaData.afterTextIndex = 0
      this.workDramaData.beforeTextIndex = 0
      this.stage =  document.querySelector(".game-one-content-box")
      if(this.showMessageData){
        this.showMessage = true
      }
    },
    watch:{
      isEnd(value){
        if(value){
          this.gameOver()
        }
      }
    },
    methods: {
      handleClickKeyBoard({type, keyType }){
        if(keyType === 'up'){
          this.handleKeyboardUp(type)
        }else {
          this.handleKeyboardDown(type)
        }
      },
      handleKeyboardUp(type){

        if((type === 'b' || type === 'a') && (!this.isStart || this.isEnd)){
          if(!this.isStart && !this.isEnd){
            if(!this.isStart && this.workDramaData.beforeTextIndex === 0){
              this.workDramaData.beforeTextIndex += 1
              if(this.workDramaData.beforeTextIndex === this.workDramaData.beforeText.length){
                this.showMessage = false
                setTimeout(()=>{
                  this.startGame()
                },500)
              }
            }else if(!this.isStart) {
              this.workDramaData.beforeTextIndex += 1
              if(this.workDramaData.beforeTextIndex === this.workDramaData.beforeText.length){
                this.showMessage = false
                setTimeout(()=>{
                  this.startGame()
                },500)
              }
            }
          }else if(this.isEnd){
            if(this.workDramaData.afterTextIndex === 0){
              this.workDramaData.afterTextIndex += 1
              if(this.workDramaData.afterTextIndex === this.workDramaData.afterText.length){
                this.showMessage = false
                this.resetOrNext(type)
              }
            }else{
              this.workDramaData.afterTextIndex += 1
              if(this.workDramaData.afterTextIndex === this.workDramaData.afterText.length){
                this.showMessage = false
                this.resetOrNext(type)
              }
            }
          }
          return;
        }

        if(this.activeIndex.x === -1 && this.activeIndex.y === -1 && (type === 'left' || type === 'right' || type === 'up' || type === 'down')){
          this.activeIndex = {x: 0, y: 0, nowIndex: 0}
          return;
        }
        let x = this.activeIndex.x
        let y = this.activeIndex.y

        switch (type) {
          case 'left':
            if(x === 0){
              x = 3
            }else {
              x = x - 1
            }
            this.activeIndex.x = x
            this.activeIndex.nowIndex =  x  + (y * 4)
            break;
          case 'right':
            if(x === 3){
              x = 0
            }else {
              x = x + 1
            }
            this.activeIndex.x = x
            this.activeIndex.nowIndex = x  + (y * 4)
            break;
          case 'up':
            if(y === 0){
              y = 0
            }else {
              y = y - 1
            }
            this.activeIndex.y = y
            this.activeIndex.nowIndex = x  + (y * 4)
            break;
          case 'down':
            if(y === 3){
              y = 0
            }else {
              y = y + 1
            }
            this.activeIndex.y = y
            this.activeIndex.nowIndex = x  + (y * 4)
            break;
          case 'b':
            if(this.activeIndex.nowIndex === -1){
              alert("别瞎点")
            }else {
              let obj = this.cardListData[this.activeIndex.nowIndex]
              if(obj.isOpen)return;
              console.log(obj)
              obj.isOpen = true
              this.selectList.push({...obj, index: this.activeIndex.nowIndex})
              this.$set(this.cardListData, this.activeIndex.nowIndex, obj)
              if(this.selectList.length){
                let length = this.selectList.length
                console.log(length)
                if(length === 1){
                  console.log("选中了一个")
                }else if(length === 2){
                  let [obj1, obj2] = this.selectList
                  if(obj1.name === obj2.name){
                    obj1.isEnd = true;
                    obj2.isEnd = true;
                    setTimeout(()=>{
                      this.$set(this.cardListData, obj1.index, obj1)
                      this.$set(this.cardListData, obj2.index, obj2)
                      this.selectList = []
                    }, 500)
                  }

                } else {
                  setTimeout(()=>{
                    this.selectList = []
                    this.cardListData.map(item=>{
                      if(!item.isEnd && item.isOpen){
                        item.isOpen = false
                      }
                      return item
                    })
                  },500)
                }
              }

            }
            break;
        }
      },
      handleKeyboardDown(type){
        if(type === 'left' || type === 'right'){
          console.log(type)
        }
      },
      createCardList(){
        let list =  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
        let createList = list.sort(() => Math.random() - 0.5).slice(0,8)
        createList = [...createList, ...createList]
        for (let i = 0; i < 16; i++){
          let index = Math.floor(Math.random() * createList.length)
          let x = Math.floor(i % 4)
          let y = Math.floor(i / 4)
          let cardName = createList.splice(index,1)
          setTimeout(()=>{
            this.cardListData.push({ x, y, name: cardName[0], isOpen: true, isEnd: false })
          }, i * 100)
        }

        setTimeout(()=>{
          this.cardListData = this.cardListData.map((item) => {
            item.isOpen = false;
            return item
          })
        }, 10000)

      },
      getActiveItemIndex(){

      },
      startGame(){
        this.createCardList()
        setTimeout(()=>{
          this.isStart = true
          if(!this.timer){
            this.timer = setInterval(()=>{
              this.time += 1
            }, 1000)
          }
        }, 10000)

      },
      gameOver(){
        clearInterval(this.timer)
        this.timer = null
        this.showMessage = true
        this.$store.state.storeAudioList && this.$store.state.storeAudioList.pass && this.$store.state.storeAudioList.pass.play && this.$store.state.storeAudioList.pass.play()
      },
      resetOrNext(){
        this.$store.commit("setDramaSalaryTime",this.time)
        this.$router.push("/salary")
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
    height: 475px;
    background: #fff;
    position: relative;
    overflow-y: hidden;
    margin-top: -6px;
    padding: 20px 18px;
    .title-image{
      background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/onepiece.png");
      width: 95px;
      height: 32px;
      background-size: 100%;
      margin: 0px auto 20px;
    }
    .card-list{
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      .card-item{
        background-size: 100%;
        width: 71px;
        height: 89px;
        font-size: 14px;
        &.active{
          background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/four-card-active.png") !important;
          background-repeat: no-repeat;
          transform: scale(1.2) translateX(-1px) translateY(2px);
        }
        &.card-bg{
          background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/four-card.png");
        }
        &.active-open{
          transform: scale(1) translateX(-1px) translateY(-5px);
        }
        &.end-item{
          background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/endCard.png");
        }
        &.end-item-active{
          transform: scale(1) translateX(-1px) translateY(-5px);
        }
      }
    }
  }
  .card-item {
    transition: all 0.2s;
  }
  .list-complete-enter {
    opacity: 0;
    /*transform: translateY(30px);*/
  }
  .list-complete-leave-to{
    opacity: 0;
  }

.list-complete-leave-active {
    position: absolute;
  }
  .time-box{
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    .alarm-box{
      width: 19px;
      height: 19px;
      background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/alarm.png");
      background-size: 100%;
      margin-right: 6px;
    }
    .time-show-box{
      width: 40px;
      height: 24px;
      background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/time-box.png");
      background-size: 100%;
      text-align: center;
      line-height: 26px;
      font-size: 12px;
      font-weight: 600;
      color: #000000;
    }
  }
}
</style>
