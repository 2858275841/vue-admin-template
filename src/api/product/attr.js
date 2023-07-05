import request from '@/utils/request'

// 获取一级分类数据
export const reqGetOneClassify = () => request({
  url: '/admin/product/getCategory1',
  method: 'GET'
})
// 获取二级分类数据
export const reqGetTwoClassify = (category1Id) => request({
  url: `/admin/product/getCategory2/${category1Id}`,
  method: 'GET'
})
// 获取三级分类数据
export const reqGetThreeClassify = (category2Id) => request({
  url: `/admin/product/getCategory3/${category2Id}`,
  method: 'GET'
})

// 获取一，二，三分类的数据
export const reqGetClassify = (category1Id, category2Id, category3Id) => request({
  url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
  method: 'GET'
})

// 删除商品属性
export const reqDeleteAttr = (attrId) => request({
  url: `/admin/product/deleteAttr/${attrId}`,
  method: 'DELETE'
})

// 添加属性与更新属性值接口
export const reqAddOrUpDataAttr = (data) => request({
  url: '/admin/product/saveAttrInfo',
  data,
  method: 'POST'
})
