<!-- @format -->

<template>
  <div>
    <el-card class="box-card" style="margin-bottom: 20px">
      <el-form :inline="true" :model="cForm" :disabled="isBanForm" class="demo-form-inline">
        <el-form-item label="一级分类">
          <el-select
            v-model="cForm.c1Id"
            placeholder="请选择"
            @change="getClassify(1)"
          >
            <el-option
              v-for="c1 in oneClassify"
              :key="c1.id"
              :label="c1.name"
              :value="c1.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select
            v-model="cForm.c2Id"
            placeholder="请选择"
            @change="getClassify(2)"
          >
            <el-option
              v-for="c2 in twoClassify"
              :key="c2.id"
              :label="c2.name"
              :value="c2.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select
            v-model="cForm.c3Id"
            placeholder="请选择"
            @change="getClassify(3)"
          >
            <el-option
              v-for="c3 in threeClassify"
              :key="c3.id"
              :label="c3.name"
              :value="c3.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'MenuSelect',
  data() {
    return {
      cForm: {
        c1Id: '',
        c2Id: '',
        c3Id: ''
      },
      level: '',
      oneClassify: [],
      twoClassify: [],
      threeClassify: [],
      // 一，二，三分类数据的调次数
      c1Count: 0,
      c3Count: 1,
      c2Count: 1,
      c4Count: 0,
      isBanForm: false
    }
  },
  watch: {
    // 监听分类的变化 清空残留的分类名称
    twoClassify() {
      this.$nextTick(() => {
        if (this.c1Count > this.c2Count) {
          this.cForm.c2Id = ''
          this.cForm.c3Id = ''
          this.threeClassify = []
        }
      })
    },
    threeClassify() {
      this.$nextTick(() => {
        if (this.c4Count > this.c3Count) {
          this.cForm.c3Id = ''
        }
      })
    }
  },
  mounted() {
    this.getOneClassify()
    // 接收 兄弟组件传输过来的 input的状态
    this.$bas.$on('upIsBanForm', (data) => {
      this.isBanForm = data
    })
  },
  methods: {
    // 获取一级分类数据
    async getOneClassify() {
      const result = await this.$Api.attr.reqGetOneClassify()
      if (result.code === 200) {
        this.oneClassify = result.data
      }
    },
    // 获取二级分类数据
    async getTwoClassify() {
      const result = await this.$Api.attr.reqGetTwoClassify(this.cForm.c1Id)
      if (result.code === 200) {
        this.twoClassify = result.data
      }
    },
    // 获取三级分类数据
    async getThreeClassify() {
      const result = await this.$Api.attr.reqGetThreeClassify(this.cForm.c2Id)
      if (result.code === 200) {
        this.threeClassify = result.data
      }
    },
    // 下拉框事件
    getClassify(val) {
      // 判断路由组件是否是 平台属性管理 sku管理
      switch (this.$route.name) {
        case 'Attr':
          switch (val) {
            case 1:
              this.getTwoClassify()
              // 通知兄弟组件及时清空数据
              this.$bas.$emit('clearClassify', [])
              this.level = 1
              this.$bas.$emit('getClassify', this.cForm, this.level)
              //  一级分类调用的次数
              this.c2Count === 1 ? this.c1Count++ : (this.c1Count = 1)
              break
            case 2:
              this.getThreeClassify()
              // 通知兄弟组件及时清空数据
              this.$bas.$emit('clearClassify', [])
              this.level = 2
              this.$bas.$emit('getClassify', this.cForm, this.level)
              //  二级分类调用的次数
              this.c3Count === 1 ? this.c4Count++ : (this.c4Count = 1)
              break
            default:
              this.level = 3
              // 给兄弟组件传输 一，二，三分类id
              this.$bas.$emit('getClassify', this.cForm, this.level)
          }
          break
        case 'Spu':
          switch (val) {
            case 1:
              this.getTwoClassify()
              // 通知兄弟组件及时清空数据
              this.level = 1
              this.$bas.$emit('getSpuList', this.cForm, this.level)
              //  一级分类调用的次数
              this.c2Count === 1 ? this.c1Count++ : (this.c1Count = 1)
              break
            case 2:
              this.getThreeClassify()
              // 通知兄弟组件及时清空数据
              this.level = 2
              this.$bas.$emit('getSpuList', this.cForm, this.level)
              //  二级分类调用的次数
              this.c3Count === 1 ? this.c4Count++ : (this.c4Count = 1)
              break
            default:
              this.level = 3
              // 给兄弟组件传输 一，二，三分类id
              this.$bas.$emit('getSpuList', this.cForm, this.level)
          }
          break
        case 'Sku':
          switch (val) {
            case 1:
              this.getTwoClassify()
              // 通知兄弟组件及时清空数据
              this.level = 1
              this.$bas.$emit('getSkuList', this.cForm, this.level)
              //  一级分类调用的次数
              this.c2Count === 1 ? this.c1Count++ : (this.c1Count = 1)
              break
            case 2:
              this.getThreeClassify()
              // 通知兄弟组件及时清空数据
              this.level = 2
              this.$bas.$emit('getSkuList', this.cForm, this.level)
              //  二级分类调用的次数
              this.c3Count === 1 ? this.c4Count++ : (this.c4Count = 1)
              break
            default:
              this.level = 3
              // 给兄弟组件传输 一，二，三分类id
              this.$bas.$emit('getSkuList', this.cForm, this.level)
          }
      }
    }
  }
}
</script>

<style></style>
