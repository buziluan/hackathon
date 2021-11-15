<template>
  <div id="app">
    <router-view/>
    <button v-show="false" id="open"></button>
  </div>
</template>
<script>
  const textList = ['bomb', "end", "err", "gameBGM", "key", "pass", "star"]
  export default {
    data(){
      return {
        imageList: [
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/identity/select-box.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/identity/select-box-active.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/identity/input.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/identity/refresh.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/identity/right.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/identity/left.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/game-machine.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/up.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/down.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/left.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/right.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/up-active.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/down-active.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/left-active.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/right-active.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/message-box.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/a.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/a-active.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/b.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/b-active.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/arrows.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/game1-bg.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/star.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/bomb.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/four-card.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/onepiece.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/card1.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/card2.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/card3.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/card4.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/card5.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/card6.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/card7.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/card8.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/card9.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/card10.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/card11.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/card12.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/card13.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/card14.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/card15.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/card16.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/card17.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/office/office.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/office/message.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/office/btn.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/office/affirm-btn.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/office/card.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/office/card-active.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/office/level1.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/office/level2.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/office/level3.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/endCard.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/four-card-active.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/house/bg1.jpg",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/house/bird.gif",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/house/bird.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/house/gameover_tit.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/house/header1.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/house/header2.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/house/medal.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/house/moveBg.jpg",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/house/play.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/house/scorebox.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/house/tap_bg.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/house/zhuzi_bg.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/home/loading20.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/home/loading40.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/home/loading60.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/home/loading80.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/home/loading100.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/scord-box.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/job-card.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/job-card-active.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/salary-sheet.png",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/home/startGame"
        ],
        audioList: [
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/music/bomb.wav",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/music/end.wav",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/music/err.mp3",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/music/gameBGM.mp3",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/music/key.wav",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/music/pass.wav",
          "https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/music/start.wav"
        ],
        storeAudioList: {
          bomb: null,
          end: null,
          err: null,
          gameBGM: null,
          pass: null,
          star: null,
          key: null
        }
      }
    },
    mounted() {
      let {query} = this.$route
      if(query.demo === 'demo'){
        this.$store.commit("setIsDemo", true)
      }
      this.imageList.forEach(item => {
        this.loadImage(item)
      })
      this.audioList.forEach((item, index) => {
        this.loadAudio(item, index)
      })
      window.addEventListener("load", () => {
        setTimeout(() => {
          window.scrollTo(0, 1)
        }, 0)
      })

      if(document.all){
        document.onselectstart= function(){return false;}; //for ie
      }else{
        document.onmousedown= function(){return false;};
        document.onmouseup= function(){return true;};
      }
    },
    watch:{

    },
    methods: {
      loadImage(url){
        let img = new Image();
        img.addEventListener("load",loadHandler);
        img.src= url;
        img.style.display = "none"
        document.body.appendChild(img);
        function loadHandler(){
          img.remove()
        }
      },
      loadAudio(url, index){
        let audio = new Audio(url)
        audio.addEventListener("canplay", () => {
          this.storeAudioList[textList[index]] = audio
          if(index === 3){
            audio.autoplay = true
            audio.loop = "loop"
          }
          this.$store.commit("setAudio",  this.storeAudioList)
        })
      }
    }
  }
</script>
<style lang="css">
  @import "assets/css/index.css";
  html,body,#app {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: FZXS24--GB1-0, FZXS24--GB1 !important;
    -moz-user-select:none;/*火狐*/

    -webkit-user-select:none;/*webkit浏览器*/

    -ms-user-select:none;/*IE10*/

    -khtml-user-select:none;/*早期浏览器*/

    user-select:none;
  }
  .prop-item{
    width: 40px;
    height: 40px;
    position: absolute;
    background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/star.png");
    background-size: 100%;
  }
  .bomb{
    background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/bomb.png") !important;
  }
</style>
