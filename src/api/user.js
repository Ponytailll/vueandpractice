import request from '@/utils/request'

//获得已注册会员列表
export function getCustList() {
  return request({
    url: '/custInfo/getCustList',
    method: 'post'
  })
}
