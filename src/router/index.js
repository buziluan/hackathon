import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Test from "../views/Test";
import GameOne from "../views/GameOne";
import GameFour from "../views/GameFour";
import GameTwo from "../views/GameTwo";
import GameThree from "../views/GameThree";
import Loading from "../views/Loading";
import Intention from "../views/Intention";
import JobList from "../views/JobList";
import Renting from "../views/Renting";
import SalarySheet from "../views/SalarySheet";
Vue.use(VueRouter)

const routes = [
  {
    path: "/index",
    name: "loading",
    component: Loading
  },
  {
    path: '/identity',
    name: 'identity',
    component: Home
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  },
  {
    path: '/one',
    name: 'one-game',
    component: GameOne
  },
  {
    path: '/four',
    name: 'four-game',
    component: GameFour
  },
  {
    path: '/two',
    name: 'two-game',
    component: GameTwo
  },
  {
    path: '/three',
    name: 'three-game',
    component: GameThree
  },
  {
    path: '/intention',
    name: 'Intention',
    component: Intention
  },
  {
    path: '/jobs',
    name: 'jobs',
    component: JobList
  },
  {
    path: '/renting',
    name: 'renting',
    component: Renting
  },
  {
    path: '/salary',
    name: 'salary',
    component: SalarySheet
  },
  {
    path: "*",
    redirect: "/index"
  }
]

const router = new VueRouter({
  routes
})

export default router
