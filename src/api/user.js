import request from '@/utils/request'
// import store from '@/store'

// 登录接口
export const login = (data) => {
  return request({
    method: 'post',
    url: '/app/v1_0/authorizations',
    data: data
  })
}

// 获取验证码接口
export const sendSms = mobile => {
  return request({
    method: 'get',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

// 获取频道列表接口
export const getUserChanenls = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user/channels'
  })
}
