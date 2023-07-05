<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin-bottom: 10px"
      @click="showDialog"
    >添加</el-button>
    <el-table style="width: 100%" border :data="pageList.records">
      <el-table-column type="index" label="序号" width="80px" align="center" />
      <el-table-column prop="tmName" label="品牌名称" />
      <el-table-column label="品牌logo">
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" width="80px">
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            size="small"
            icon="el-icon-edit"
            @click="updateTradeMark(row)"
          >修改</el-button>
          <el-button
            type="danger"
            size="small"
            icon="el-icon-delete"
            @click="deleteTradeMark(row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      style="text-align: center"
      :total="pageList.total"
      :current-page="page"
      :page-size="limit"
      :pager-count="7"
      :page-sizes="[3, 5, 10]"
      layout="prev, pager, next, ->, sizes, total"
      @current-change="upPage"
      @size-change="upLimit"
    />
    <!-- Form -->
    <el-dialog
      :title="form.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="ruleForm" :model="form" style="width: 80%" :rules="rules">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input v-model="form.tmName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            :action="`${uploadUrl}/admin/product/fileUpload`"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.logoUrl" :src="form.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">
              只能上传jpg，且不超过2MB
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="offCall">取 消</el-button>
        <el-button type="primary" @click="addOrUpDate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'TradeMark',
  data() {
    return {
      page: 1,
      limit: 3,
      pageList: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        tmName: '',
        logoUrl: ''
      },
      uploadUrl: process.env.VUE_APP_BASE_API, // 开发模式的代理路径
      // 表单验证
      rules: {
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'change' },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'change'
          }
        ],
        logoUrl: [
          { required: true, message: '请上传品牌logo' }
        ]
      }
    }
  },
  mounted() {
    this.getPageList()
  },
  methods: {
    // 获取品牌列表的数据
    async getPageList() {
      const { page, limit } = this
      const result = await this.$Api.trademark.reqGetTradeMarkList(page, limit)
      if (result.code === 200) {
        this.pageList = result.data
      } else {
        this.$message.error('获取品牌列表失败')
      }
    },
    // 换页查询品牌列表数据
    upPage(page) {
      this.page = page
      this.getPageList()
    },
    // 改变一页展示个数的数据
    upLimit(limit) {
      this.limit = limit
      this.getPageList()
    },
    // 添加逻辑
    showDialog() {
      this.dialogFormVisible = true
      this.form = { tmName: '', logoUrl: '' }
    },
    // 修改编辑的品牌
    updateTradeMark(row) {
      this.dialogFormVisible = true
      this.form = { ...row }
    },
    // 图片上传
    handleAvatarSuccess(res, file) {
      this.form.logoUrl = res.data
      // this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // Dialog 确定事件(添加或者编辑)
    addOrUpDate() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (valid) {
          this.dialogFormVisible = false
          const result = await this.$Api.trademark.reqAddOrUpDataTradeMark(
            this.form
          )
          if (result.code === 200) {
            this.$message({
              message: this.form.id ? '修改品牌成功' : '添加品牌成功',
              type: 'success'
            })
            this.getPageList()
          }
        }
      })
    },
    // 取消回调函数
    offCall() {
      this.dialogFormVisible = false
      this.$refs.ruleForm.resetFields()
    },
    // 删除品牌操作
    async deleteTradeMark(row) {
      const { id } = row
      const result = await this.$Api.trademark.reqRemoveTrademark(id)
      if (result.code === 200) {
        this.$message.success('删除品牌成功')
        this.getPageList()
      } else {
        this.$message.error('删除品牌失败')
      }
    }
  }
}
</script>

<style>
.el-dialog {
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 300px;
    height: 178px;
    display: block;
  }
}
</style>
