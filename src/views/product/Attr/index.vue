<!-- @format -->

<template>
  <div>
    <MenuSelect />
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="disabled"
          @click="addAttr"
        >
          添加属性
        </el-button>
        <el-table
          :data="classifyList"
          border
          style="width: 100%"
          :height="height"
        >
          <el-table-column
            type="index"
            label="序号"
            width="60px"
            align="center"
          />
          <el-table-column prop="attrName" label="属性名称" align="center" />
          <el-table-column label="属性值列表" min-width="300px">
            <template slot-scope="{ row }">
              <el-tag
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
                type="info"
                style="margin-right: 5px"
              >
                {{ attrValue.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ row }">
              <el-button
                type="warning"
                size="small"
                icon="el-icon-edit"
                @click="editProperty(row)"
              >
                修改
              </el-button>
              <el-popconfirm
                :title="`确定删除${row.attrName}？`"
                @onConfirm="deleteClassify(row)"
              >
                <el-button
                  slot="reference"
                  type="danger"
                  size="small"
                  icon="el-icon-delete"
                >
                  删除
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowTable">
        <el-form :inline="true" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input v-model="attrInfo.attrName" placeholder="请输入属性名" />
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-bottom: 10px"
          :disabled="attrInfo.attrName != '' ? false : true"
          @click="addAttrValue"
        >
          添加属性值
        </el-button>
        <el-button @click="callOff">取消</el-button>
        <el-table
          style="width: 100%; margin-bottom: 10px"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column
            type="index"
            label="序号"
            width="60"
            align="center"
          />
          <el-table-column prop="name" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <el-input
                v-if="row.flag"
                :ref="$index"
                v-model.trim="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                clearable
                @blur="tooLook(row)"
              />
              <a
                v-else
                title="单击可以进入编辑模式"
                style="display: block"
                @click="tooEdit(row, $index)"
              >
                <span>{{ row.valueName }}</span>
              </a>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`确定要删除${row.valueName}？`"
                @onConfirm="delEditProperty(row, $index)"
              >
                <el-button
                  slot="reference"
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" :disabled="isBan" @click="saveProperty">
          保存
        </el-button>
        <el-button @click="callOff">取消</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import _cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'Attr',
  data() {
    return {
      cForm: {
        c1Id: '',
        c2Id: '',
        c3Id: ''
      },
      classifyList: [],
      isShowTable: true,
      attrInfo: {
        attrName: '',
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 0
      },
      isBan: false // 控制保存是否可用
    }
  },
  computed: {
    height() {
      return this.classifyList.length <= 0 ? '145px' : '500px'
    },
    disabled() {
      // eslint-disable-next-line no-unneeded-ternary
      return this.classifyList.length <= 0 ? true : false
    }
  },
  mounted() {
    // 接收id，发请求
    this.$bas.$on('getClassify', (id, level) => {
      this.cForm = id
      this.attrInfo.categoryLevel = level
      this.cForm.c1Id && this.cForm.c2Id && this.cForm.c3Id ? this.getClassifyList() : ''
    })
    // 清空数组
    this.$bas.$on('clearClassify', val => {
      this.classifyList = val
    })
  },
  methods: {
    // 获取最终分类数据
    async getClassifyList() {
      const { c1Id, c2Id, c3Id } = this.cForm
      const result = await this.$Api.attr.reqGetClassify(c1Id, c2Id, c3Id)
      if (result.code === 200) {
        this.classifyList = result.data
      }
    },
    // 删除某一个分类的属性
    async deleteClassify(row) {
      const result = await this.$Api.attr.reqDeleteAttr(row.id)
      if (result.code === 200) {
        this.$message.success('删除成功')
        this.getClassifyList()
      }
    },
    // 添加属性值 按钮的业务
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id ? this.attrInfo.id : undefined,
        valueName: '',
        flag: true // 标识 编辑模式或查看模式 true 编辑 反正 查看
      })
      // 自动聚焦input
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus()
      })
      // 表单数据为空禁止提交
      this.attrInfo.attrValueList.forEach(item => {
        item.valueName === '' ? this.isBan = true : ''
      })
    },
    // 添加属性的业务
    addAttr() {
      this.isShowTable = false
      // 清除表单残留的数据
      this.attrInfo = {
        attrName: '',
        attrValueList: [],
        categoryId: this.cForm.c3Id,
        categoryLevel: 0
      }
      this.$bas.$emit('upIsBanForm', true)
      this.isBan = true
    },
    // 编辑属性的业务
    editProperty(row) {
      this.isShowTable = false
      // 数据比较复杂 使用lodash 深拷贝
      this.attrInfo = _cloneDeep(row)
      this.attrInfo.attrValueList.forEach(item => {
        // 添加响应式数据
        this.$set(item, 'flag', false)
      })
    },
    // 保存相关业务
    async saveProperty() {
      // 过滤掉flag这个标识，不提交给服务器
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item => {
        item.flag ? '' : delete item.flag
        return true
      })
      const result = await this.$Api.attr.reqAddOrUpDataAttr(this.attrInfo)
      if (result.code === 200) {
        this.$message.success('保存成功')
        this.isShowTable = true
        this.getClassifyList()
      }
    },
    // 编辑模式的处理业务
    tooLook(row) {
      if (row.valueName !== '') {
        const result = this.attrInfo.attrValueList.some(item => {
          if (row !== item) {
            return row.valueName === item.valueName
          }
        })
        if (result) {
          this.$message.error('该属性值已存在')
        } else {
          row.flag = false
          this.isBan = false
        }
      } else {
        this.$message.error('请输入有效属性值名称')
      }
    },
    tooEdit(row, index) {
      row.flag = true
      // 聚焦文本框
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    },
    // 编辑属性里的删除业务
    delEditProperty(row, index) {
      this.attrInfo.attrValueList.splice(index, 1)
    },
    // 取消的业务
    callOff() {
      this.isShowTable = true
      // 通知兄弟组件 更新input是否可用
      this.$bas.$emit('upIsBanForm', false)
    }
  }
}
</script>

<style></style>
