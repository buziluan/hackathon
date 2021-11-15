<template>
  <div class="btn-box">
    {{text}}
  </div>
</template>

<script>
  export default {
    name: "AffirmButton",
    props:{
      text: String
    }
  }
</script>

<style scoped>
.btn-box{
  width: 141px;
  height: 50px;
  background-repeat: no-repeat;
  background-size: 100%;
  background-image: url("https://wondercvhackathon.oss-cn-beijing.aliyuncs.com/hackathon/game-content/affirm-btn.png");
  text-align: center;
  line-height: 40px;
  font-family: FZXS24--GB1-0, FZXS24--GB1;
  font-weight: normal;
  color: #F5F5F5;
  font-size: 16px;
  letter-spacing: 5px;
  margin: 0 auto;
}
</style>
