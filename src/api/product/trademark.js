import request from '@/utils/request'
// 获取品牌管理数据
export const reqGetTradeMarkList = (page, limit) => request({
  url: `/admin/product/baseTrademark/${page}/${limit}`,
  method: 'get'
})

// 添加或编辑品牌
export const reqAddOrUpDataTradeMark = (trademark) => {
  if (trademark.id) {
    return request({ url: '/admin/product/baseTrademark/update', data: trademark, method: 'PUT' })
  } else {
    return request({ url: '/admin/product/baseTrademark/save', data: trademark, method: 'POST' })
  }
}
// 删除品牌
export const reqRemoveTrademark = (id) => request({ url: `/admin/product/baseTrademark/remove/${id}`, method: 'DELETE' })
