import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drama: {
      userInfo: {
        name: "马晨晨",//用户名字
        gender: "woman",//性别
        education: "本科",//学历
        major: "视觉传达",//
      },
      intention: {
        class: "",
        city: "",
        salary: ""
      },
      jobs: [],
      selectJob: null,
      salaryTime: 0,
      house: {}
    },
    isDemo: false,
    storeAudioList: null
  },
  mutations: {
    setDramaUserInfo(state, userInfo){
      state.drama.userInfo = userInfo
    },
    setDramaIntention(state, intention){
      state.drama.intention = intention
    },
    setDramaJobs(state, jobs){
      state.drama.jobs = jobs
    },
    setDramaSelectJob(state, selectJob){
      state.drama.selectJob = selectJob
    },
    setDramaHouse(state, house){
      state.drama.house = house
    },
    setDramaSalaryTime(state, time){
      state.drama.salaryTime = time
    },
    setIsDemo(state, value){
      state.isDemo = value
    },
    setAudio(state, value){
      state.storeAudioList = value
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    storage:window.sessionStorage
  })]
})
