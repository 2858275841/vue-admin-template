import request from '@/utils/request'

// 获取sku列表数据
export const reqGetSkuList = (page, limit) => request({
  url: `/admin/product/list/${page}/${limit}`,
  method: 'GET'
})

// 删除sku
export const reqDelSku = (skuId) => request({
  url: `/admin/product/deleteSku/${skuId}`,
  method: 'DELETE'
})

// 上架sku
export const reqSale = (skuId) => request({
  url: `/admin/product/onSale/${skuId}`,
  method: 'GET'
})

// 下架sku
export const reqCancelSale = (skuId) => request({
  url: `/admin/product/cancelSale/${skuId}`,
  method: 'GET'
})

// 获取sku详情
export const reqSkuDetail = (skuId) => request({
  url: `/admin/product/getSkuById/${skuId}`,
  method: 'GET'
})
