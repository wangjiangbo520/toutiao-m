// 请求模块
import axios from 'axios'
import store from '@/store'

// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn'

// 如果使用创建实例的话axios都要改成request
const request = axios.create({
// 接口的基准路径
  baseURL: 'http://ttapi.research.itcast.cn'
})

// 请求拦截器
request.interceptors.request.use(config => {
  // console.log(config)  // 所有的请求都会经过这里
  // 可以将state里的user解构出来
  // const { user } = store.state
  const user = store.state.user
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 在最后必须 return config
  return config
}, error => {
  return Promise.reject(error)
})
export default request
