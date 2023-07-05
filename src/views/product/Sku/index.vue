<!-- @format -->

<template>
  <div>
    <el-table :data="records" border>
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column prop="skuName" label="名称" />
      <el-table-column prop="skuDesc" label="描述" />
      <el-table-column label="默认图片" width="width" align="center">
        <template slot-scope="{ row }">
          <img :src="row.skuDefaultImg" style="width: 100px">
        </template>
      </el-table-column>
      <el-table-column
        prop="weight"
        label="重量(KG)"
        width="80"
        align="center"
      />
      <el-table-column
        prop="price"
        label="价格(元)"
        width="80"
        align="center"
      />
      <el-table-column label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button
            v-show="row.isSale === 1"
            type="info"
            size="mini"
            @click="cancelSale(row)"
          >
            下架
          </el-button>
          <el-button
            v-show="row.isSale === 0"
            type="success"
            size="mini"
            style="margin-left: 0"
            @click="sale(row)"
          >
            上架
          </el-button>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="$message({ showClose: true, message: '正在开发中' })"
          />
          <el-button
            type="info"
            size="mini"
            icon="el-icon-info"
            @click="skuInfo(row)"
          />
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="delSku(row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-sizes="[10, 15, 20]"
      :page-size="1"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      background
      :pager-count="7"
      style="text-align: center"
      @size-change="sizeChange"
      @current-change="currentChange"
    />
    <el-drawer :visible.sync="drawer" size="50%">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfoList.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfoList.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfoList.price }}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16" class="skuAttr">
          <el-tag
            v-for="item in skuInfoList.skuAttrValueList"
            :key="item.id"
            class="item"
          >
            {{ item.valueName }}
          </el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <div ref="mySwiper" class="swiper">
            <div class="swiper-wrapper">
              <div
                v-for="item in skuInfoList.skuImageList"
                :key="item.id"
                class="swiper-slide"
              >
                <img :src="item.imgUrl" style="width:170px;object-fit: scale-down;">
              </div>
              <!-- 如果需要分页器 -->
              <div class="swiper-pagination" />
            </div>
          </div>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
export default {
  name: 'Sku',
  data() {
    return {
      page: 1,
      limit: 10,
      records: [],
      total: 0,
      skuInfoList: {},
      drawer: false
    }
  },
  watch: {
    skuInfoList() {
      this.$nextTick(() => {
        // eslint-disable-next-line no-unused-vars
        var mySwiper = new Swiper(this.$refs.mySwiper, {
          loop: true, // 循环模式选项
          autoplay: true,
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination'
          }
        })
      })
    }
  },
  mounted() {
    this.getSkuList()
  },
  methods: {
    async getSkuList() {
      const result = await this.$Api.sku.reqGetSkuList(this.page, this.limit)
      if (result.code === 200) {
        this.total = result.data.total
        this.records = result.data.records
      }
    },
    sizeChange(limit) {
      this.limit = limit
      this.getSkuList()
    },
    currentChange(page) {
      this.page = page
      this.getSkuList()
    },
    async delSku(row) {
      const result = await this.$Api.sku.reqDelSku(row.id)
      if (result.code === 200) {
        this.$message.success('删除成功')
        this.getSkuList()
      }
    },
    async cancelSale(row) {
      const result = await this.$Api.sku.reqCancelSale(row.id)
      if (result.code === 200) {
        // eslint-disable-next-line require-atomic-updates
        row.isSale = 0
        this.$message.success('下架成功')
      }
    },
    async sale(row) {
      const result = await this.$Api.sku.reqSale(row.id)
      if (result.code === 200) {
        // eslint-disable-next-line require-atomic-updates
        row.isSale = 1
        this.$message.success('上架成功')
      }
    },
    async skuInfo(row) {
      const result = await this.$Api.sku.reqSkuDetail(row.id)
      if (result.code === 200) {
        this.skuInfoList = result.data
      }
      this.drawer = true
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row .el-col-5 {
  text-align: right;
  margin-right: 20px;
}
.swiper {
  width: 600px;
  height: 300px;
}
.skuAttr {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.item {
  width: 200px;
  margin-bottom: 5px;
  text-align: center;
}
</style>
