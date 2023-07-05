import request from '@/utils/request'

// 获取spu列表数据
export const reqGetSpuList = (page, limit, category3Id) => request({
  url: `/admin/product/${page}/${limit}`,
  params: { category3Id },
  method: 'GET'
})

// 获取spu信息
export const reqGetSpuInfo = (spuId) => request({
  url: `/admin/product/getSpuById/${spuId}`,
  method: 'GET'
})

// 获取spu图片墙数据
export const reqGetSpuImageList = (spuId) => request({
  url: `/admin/product/spuImageList/${spuId}`,
  method: 'GET'
})

// 获取全部销售属性数据
export const reqGetAllSalesList = () => request({
  url: '/admin/product/baseSaleAttrList',
  method: 'GET'
})

// 获取品牌的数据
export const reqGetSpuSkuList = () => request({
  url: '/admin/product/baseTrademark/getTrademarkList',
  method: 'GET'
})

// 添加与更新spu
export const reqAddOrUpdateSpu = (spuInfo) => {
  if (spuInfo.id) {
    return request({
      url: '/admin/product/updateSpuInfo',
      data: spuInfo,
      method: 'POST'
    })
  } else {
    return request({
      url: '/admin/product/saveSpuInfo',
      data: spuInfo,
      method: 'POST'
    })
  }
}
// 删除spu数据
export const reqDeleteSpu = (spuId) => request({
  url: `/admin/product/deleteSpu/${spuId}`,
  method: 'DELETE'
})

// 获取sku图片的数据
export const reqGetSkuImgList = (spuId) => request({
  url: `/admin/product/spuImageList/${spuId}`,
  method: 'GET'
})

// 获取销售属性
export const reqGetSalesAttrList = (spuId) => request({
  url: `/admin/product/spuSaleAttrList/${spuId}`,
  method: 'GET'
})

// 获取平台属性
export const reqAttrInfo = ({ c1Id, c2Id, c3Id }) => request({
  url: `/admin/product/attrInfoList/${c1Id}/${c2Id}/${c3Id}`,
  method: 'GET'
})

// 添加sku
export const reqSaveSkuInfo = (skuInfo) => request({
  url: '/admin/product/saveSkuInfo',
  data: skuInfo,
  method: 'POST'
})

// 获取sku列表的数据
export const reqGetSkuList = (spuId) => request({
  url: `/admin/product/findBySpuId/${spuId}`,
  method: 'GET'
})
