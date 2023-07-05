<!-- @format -->

<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="spu名称">
        <el-input v-model="spu.spuName" placeholder="spu名称" />
      </el-form-item>
      <el-form-item label="品牌">
        <el-select
          v-model="spu.tmId"
          placeholder="请选择品牌"
          style="width: 200px"
        >
          <el-option
            v-for="item in tradeMarckList"
            :key="item.id"
            :label="item.tmName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="spu描述">
        <el-input
          v-model="spu.description"
          type="textarea"
          :rows="4"
          placeholder="描述"
        />
      </el-form-item>
      <el-form-item label="spu图片">
        <el-upload
          :action="`${baseUrl}/admin/product/upload`"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImgList"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          v-model="attrInfo"
          :placeholder="unSelectSaleAttr.length <= 0 ? `没有啦！！！` : `还有${unSelectSaleAttr.length}未选择`"
          style="width: 230px"
        >
          <el-option
            v-for="item in unSelectSaleAttr"
            :key="item.id"
            :value="`${item.id}:${item.name}`"
            :label="item.name"
          />
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-left: 5px"
          :disabled="!attrInfo"
          @click="addSelectAttr"
        >
          添加销售属性
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-table :data="spu.spuSaleAttrList" style="width: 100%" border stripe>
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          />
          <el-table-column prop="saleAttrName" label="属性名" />
          <el-table-column prop="spuSaleAttrValueList" label="属性值名称列表">
            <template slot-scope="{ row, $index }">
              <el-tag
                v-for="(item, index) in row.spuSaleAttrValueList"
                :key="item.id"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
              >
                {{ item.saleAttrValueName }}
              </el-tag>
              <el-input
                v-if="row.inputVisible"
                :ref="$index"
                v-model="row.inputValue"
                class="input-new-tag"
                size="mini"
                @keyup.enter.native="$event.target.blur"
                @blur="handleInputConfirm(row)"
              />
              <el-button
                v-else
                class="button-new-tag"
                size="mini"
                @click="showInput(row, $index)"
              >
                添加
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ $index }">
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="spu.spuSaleAttrList.splice($index, 1)"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="$emit('changeScene', 0)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SpuForm',
  props: ['c3id'],
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      spu: {
        category3Id: 0,
        description: '',
        tmId: '',
        spuName: '',
        spuImageList: [],
        spuSaleAttrList: []
      },
      tradeMarckList: [],
      spuImgList: [],
      salesList: [],
      baseUrl: process.env.VUE_APP_BASE_API,
      attrInfo: ''
    }
  },
  computed: {
    unSelectSaleAttr() {
      const result = this.salesList.filter(item => {
        return this.spu.spuSaleAttrList.every(item1 => {
          return item.name !== item1.saleAttrName
        })
      })
      return result
    }
  },
  mounted() {
    this.$bas.$on('addSpu', () => {
      // 添加默认清理残留数据
      this.spu = {
        category3Id: 0,
        description: '',
        tmId: '',
        spuName: '',
        spuImageList: [],
        spuSaleAttrList: []
      }
      this.spu.category3Id = this.c3id
      this.getSpuSkuList()
      this.getAllSalesList()
    })
  },
  methods: {
    handleRemove(file, fileList) {
      this.spuImgList = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSuccess(response, file, fileList) {
      this.spuImgList = fileList
    },
    async getSpuSkuList() {
      const tradeMarckResult = await this.$Api.spu.reqGetSpuSkuList()
      if (tradeMarckResult.code === 200) {
        this.tradeMarckList = tradeMarckResult.data
      }
    },
    async getAllSalesList() {
      const salesResult = await this.$Api.spu.reqGetAllSalesList()
      if (salesResult.code === 200) {
        this.salesList = salesResult.data
      }
    },
    async initSpuList(row) {
      const { id: spuId } = row
      const spuResult = await this.$Api.spu.reqGetSpuInfo(spuId)
      if (spuResult.code === 200) {
        this.spu = spuResult.data
      }
      this.getSpuSkuList()
      const spuImgResult = await this.$Api.spu.reqGetSpuImageList(spuId)
      if (spuImgResult.code === 200) {
        const listArr = spuImgResult.data
        this.spuImgList = listArr.forEach(item => {
          item.name = item.imgName
          item.url = item.imgUrl
        })
        this.spuImgList = listArr
      }
      this.getAllSalesList()
    },

    showInput(row, index) {
      this.$set(row, 'inputVisible', true)
      this.$nextTick(_ => {
        this.$refs[index].focus()
      })
    },

    handleInputConfirm(row) {
      const {
        inputValue: saleAttrValueName,
        spuSaleAttrValueList,
        spuId,
        baseSaleAttrId
      } = row
      if (saleAttrValueName.trim() !== '') {
        const result = row.spuSaleAttrValueList.some(item =>
          row !== item ? item.saleAttrValueName === saleAttrValueName : ''
        )
        if (result) {
          this.$message.error('该属性值已存在')
        } else {
          const obj = { baseSaleAttrId, saleAttrValueName, spuId }
          spuSaleAttrValueList.push(obj)
          row.inputVisible = false
          row.inputValue = ''
        }
      } else this.$message.error('请输入有效属性值名称')
    },
    addSelectAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attrInfo.split(':')
      this.spu.spuSaleAttrList.push({
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
      })
      this.attrInfo = ''
    },
    async save() {
      this.spu.spuImageList = this.spuImgList.map((item) => {
        return {
          ImgName: item.name,
          ImgUrl: (item.response && item.response.data) || item.url
        }
      })
      const result = await this.$Api.spu.reqAddOrUpdateSpu(this.spu)
      if (result.code === 200) {
        this.$message.success('保存成功')
        this.$emit('upScene', 0)
      } else {
        this.$message.error('保存失败')
      }
    }
  }
}
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
