<!-- @format -->

<template>
  <div>
    <MenuSelect />
    <el-card>
      <div v-show="scene === 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="cForm.c3Id ? false : true"
          @click="addSpu"
        >
          添加SPU
        </el-button>
        <el-table border :data="spuList.records">
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          />
          <el-table-column prop="spuName" label="spu名称" width="width" />
          <el-table-column prop="description" label="spu描述" width="width" />
          <el-table-column label="操作" width="width">
            <template slot-scope="{ row }">
              <HintButton
                type="success"
                size="mini"
                icon="el-icon-plus"
                title="添加spu"
                @click="addSku(row)"
              />
              <HintButton
                type="warning"
                size="mini"
                icon="el-icon-edit"
                title="修改spu"
                @click="editOrUpSpu(row)"
              />
              <HintButton
                type="info"
                size="mini"
                icon="el-icon-warning"
                title="查看当前spu全部的实例"
                @click="lookSpu(row)"
              />
              <HintButton
                type="danger"
                size="mini"
                icon="el-icon-delete"
                title="删除spu"
                @click="deleteSpu(row)"
              />
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="text-align: center"
          :page-sizes="[3, 5, 10]"
          :page-size="pageSize"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="totalNum"
          background
          :pager-count="7"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
      <SpuForm
        v-show="scene === 1"
        ref="spu"
        :c3id="cForm.c3Id"
        @changeScene="callOff"
        @upScene="upScene"
      />
      <SkuForm
        v-show="scene === 2"
        ref="sku"
        @upScene="upScene"
        @changeScene="callOff"
      />
    </el-card>
    <el-dialog
      :title="`${skuName}的sku列表`"
      :visible.sync="dialogTableVisible"
      @close="close"
    >
      <el-table v-loading="loading" :data="skuList" border element-loading-text="拼命加载中">
        <el-table-column property="skuName" label="名称" width="150" />
        <el-table-column property="price" label="价格" width="200" />
        <el-table-column property="weight" label="重量" />
        <el-table-column property="skuDefaultImg" label="默认图片">
          <template slot-scope="{ row }">
            <img :src="row.skuDefaultImg" style="width: 100px">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import SkuForm from './SkuForm'
import SpuForm from './SpuForm'
export default {
  name: 'Spu',
  components: {
    SkuForm,
    SpuForm
  },
  data() {
    return {
      page: 1,
      limit: 3,
      pageSize: 3,
      cForm: {
        c1Id: '',
        c2Id: '',
        c3Id: ''
      },
      spuList: {},
      scene: 0,
      dialogTableVisible: false,
      skuList: [],
      skuName: '',
      loading: true
    }
  },
  computed: {
    totalNum() {
      return this.spuList.total || 0
    }
  },
  mounted() {
    this.$bas.$on('getSpuList', (id, level) => {
      this.cForm = id
      // console.log(id)
      this.cForm.c1Id && this.cForm.c2Id && this.cForm.c3Id
        ? this.getSpuList()
        : ''
    })
  },
  methods: {
    async getSpuList() {
      const { page, limit } = this
      const { c3Id } = this.cForm
      const result = await this.$Api.spu.reqGetSpuList(page, limit, c3Id)
      if (result.code === 200) {
        this.spuList = result.data
      }
    },
    // 控制form与table的切换
    upFormOrAdd() {
      this.scene = 1
      this.$bas.$emit('upIsBanForm', true)
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.limit = pageSize
      this.getSpuList()
    },
    handleCurrentChange(page) {
      this.page = page
      this.getSpuList()
    },
    addSpu() {
      this.upFormOrAdd()
      this.$bas.$emit('addSpu')
    },
    editOrUpSpu(row) {
      this.upFormOrAdd()
      this.$refs.spu.initSpuList(row)
    },
    callOff(scene) {
      this.scene = scene
      this.$bas.$emit('upIsBanForm', false)
    },
    upScene(val) {
      this.scene = val
      this.getSpuList()
    },
    async deleteSpu(row) {
      const result = await this.$Api.spu.reqDeleteSpu(row.id)
      if (result.code === 200) {
        this.$message.success('删除成功')
      }
      this.getSpuList()
    },
    addSku(row) {
      this.scene = 2
      this.$bas.$emit('getSkuList', this.cForm, row.id, 4)
      this.$refs.sku.getDate(row)
      this.$bas.$emit('upIsBanForm', true)
    },
    async lookSpu(row) {
      this.skuName = row.spuName
      const result = await this.$Api.spu.reqGetSkuList(row.id)
      if (result.code === 200) {
        this.skuList = result.data
        setTimeout(() => {
          this.loading = false
        }, 1000)
      }
      this.dialogTableVisible = true
    },
    close() {
      this.loading = true
      this.skuList = []
    }
  }
}
</script>

<style></style>
