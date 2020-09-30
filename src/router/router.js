import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入组件
// const Login = () => import('../views/login.vue')
// import Login from '../views/login.vue'
const Login = () => import('@/views/login.vue')
const Index = () => import('@/views/layout/index.vue')
const Home = () => import('@/views/home/home.vue')
const Ask = () => import('@/views/ask/ask.vue')
const Video = () => import('@/views/video/video.vue')
const My = () => import('@/views/my/my.vue')
const Search = () => import('@/views/home/search.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  // { path: '/login', name: 'login', component: () => import('@/views/login') }
  { path: '/login', component: Login },
  {
    path: '/index',
    component: Index,
    redirect: '/home',
    children: [
      { path: '/home', component: Home },
      { path: '/ask', component: Ask },
      { path: '/video', component: Video },
      { path: '/my', component: My }
    ]
  },
  { path: '/search', component: Search }
]

const router = new VueRouter({
  routes
})

export default router
