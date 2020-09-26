import request from '@/utils/request'

export const login = (data) => {
  return request({
    method: 'post',
    url: '/app/v1_0/authorizations',
    data: data
  })
}

export const sendSms = (mobile) => {
  return request({
    method: 'get',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
