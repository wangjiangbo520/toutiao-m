import request from '@/utils/request'

export const login = (data) => {
  return request({
    method: 'post',
    url: '/app/vl_0/authorizations',
    data: data
  })
}
