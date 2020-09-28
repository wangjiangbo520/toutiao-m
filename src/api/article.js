import request from '@/utils/request'

// 获取频道列表接口
export const getArticles = params => {
  return request({
    method: 'get',
    url: '/app/v1_1/articles',
    params
  })
}
