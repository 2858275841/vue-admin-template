<!-- @format -->

<template>
  <div>
    <el-form ref="form" :model="skuInfo" label-width="80px">
      <el-form-item v-model="spu.spuName" label="SPU名称">
        {{ spu.spuName }}
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input v-model="skuInfo.skuName" placeholder="SKU名称" />
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input
          v-model="skuInfo.price"
          type="number"
          placeholder="价格(元)"
        />
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input v-model="skuInfo.weight" placeholder="重量(千克)" />
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input
          v-model="skuInfo.skuDesc"
          type="textarea"
          placeholder="规格描述"
          :rows="4"
        />
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form label-width="80px" :inline="true">
          <el-form-item
            v-for="attr in attrInfoList"
            :key="attr.id"
            :label="attr.attrName"
          >
            <el-select v-model="attr.attrIdAndValueId" placeholder="请选择">
              <el-option
                v-for="item in attr.attrValueList"
                :key="item.id"
                :value="`${attr.id}:${item.id}`"
                :label="item.valueName"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form-item
          v-for="saleAttr in spuSaleAttrList"
          :key="saleAttr.id"
          :label="saleAttr.saleAttrName"
        >
          <el-select
            v-model="saleAttr.saleAttrIdAndValueId"
            placeholder="请选择"
          >
            <el-option
              v-for="item in saleAttr.spuSaleAttrValueList"
              :key="item.id"
              :label="item.saleAttrValueName"
              :value="`${saleAttr.id}:${item.id}`"
            />
          </el-select>
        </el-form-item>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          :data="spuImgList"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" />
          <el-table-column label="图片">
            <template slot-scope="{ row }">
              <img :src="row.imgUrl" style="object-fit: cover; width: 100px">
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName" />
          <el-table-column label="操作">
            <template slot-scope="{ row }">
              <el-button
                v-show="row.isDefault === 0"
                type="primary"
                size="mini"
                @click="changeDefault(row,spuImgList)"
              >
                设为默认
              </el-button>
              <el-tag v-show="row.isDefault === 1" type="success">默认</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveSku">保存</el-button>
        <el-button @click="$emit('changeScene', 0)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SkuForm',
  props: ['scene'],
  data() {
    return {
      cForm: {
        c1Id: '',
        c2Id: '',
        c3Id: ''
      },

      skuInfo: {
        category3Id: 0,
        price: '',
        weight: '',
        spuId: '',
        tmId: '',
        skuName: '',
        skuDefaultImg: '',
        skuDesc: '',
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   valueId: 0,
          // }
        ],
        skuImageList: [
          // {
          //   imgName: 'string',
          //   imgUrl: 'string',
          //   isDefault: 'string',
          // }
        ],
        skuSaleAttrValueList: [
          // {
          //   saleAttrId: 0,
          //   saleAttrValueId: 0,
          //   isDefault: 0
          //   spuImgId: 0
          // }
        ]
      },

      spu: {},
      spuId: '',
      spuName: '',
      spuImgList: [],
      spuSaleAttrList: [],
      attrInfoList: [],
      multipleSelection: [] // sku图片选中的数据
    }
  },
  mounted() {
    // level = 4 表示点击了添加sku，把spuId接收到data里面
    this.$bas.$on('getSkuList', (id, spuId, level) => {
      // 清除数据，防止编辑数据回显
      Object.assign(this._data, this.$options.data())
      if (level === 4) {
        this.spuId = spuId
        this.cForm = id
      } else {
        this.cForm = id
        this.cForm.c1Id && this.cForm.c2Id && this.cForm.c3Id ? '' : ''
      }
    })
  },
  methods: {
    async getDate(row) {
      // 收集服务器需要的数据
      this.skuInfo.category3Id = row.category3Id
      this.skuInfo.spuId = row.id
      this.skuInfo.tmId = row.tmId
      this.spu = row

      const result = await this.$Api.spu.reqGetSkuImgList(this.spuId)
      if (result.code === 200) {
        const list = result.data
        list.forEach(item => {
          item.isDefault = 0
        })
        this.spuImgList = list
      }
      const resultAttr = await this.$Api.spu.reqGetSalesAttrList(this.spuId)
      if (resultAttr.code === 200) {
        this.spuSaleAttrList = resultAttr.data
      }
      const resultSpuInfo = await this.$Api.spu.reqAttrInfo(this.cForm)
      if (resultSpuInfo.code === 200) {
        this.attrInfoList = resultSpuInfo.data
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    changeDefault(row, item) {
      item.forEach(item => {
        item.isDefault = 0
      })
      row.isDefault = 1
      // 收集默认图片地址
      this.skuInfo.skuDefaultImg = row.imgUrl
    },
    async saveSku() {
      // 整理参数携带给服务器，数据结构在 data.skuInfo
      this.attrInfoList.filter(item => {
        if (item.attrIdAndValueId) {
          const [attrId, valueId] = item.attrIdAndValueId.split(':')
          this.skuInfo.skuAttrValueList.push({ attrId, valueId })
          return true
        }
      })
      this.spuSaleAttrList.filter(item => {
        if (item.saleAttrIdAndValueId) {
          const [saleAttrId, saleAttrValueId] = item.saleAttrIdAndValueId.split(':')
          this.skuInfo.skuSaleAttrValueList.push({ saleAttrId, saleAttrValueId })
          return true
        }
      })
      this.skuInfo.skuImageList = this.spuImgList.map(item => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id
        }
      })
      const result = await this.$Api.spu.reqSaveSkuInfo(this.skuInfo)
      if (result.code === 200) {
        this.$message.success('保存成功')
        this.$emit('upScene', 0)
        this.$bas.$emit('upIsBanForm', false)
      }
    }
  }
}
</script>

<style></style>
