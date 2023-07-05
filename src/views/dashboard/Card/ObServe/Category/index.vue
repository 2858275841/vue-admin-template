<template>
  <div>
    <el-card shadow="always">
      <div slot="header">
        <span>销售额类别占比</span>
      </div>
      <div class="radio">
        <el-radio-group v-model="radio" size="small">
          <el-radio-button label="全部渠道" />
          <el-radio-button label="线上" />
          <el-radio-button label="门店" />
        </el-radio-group>
      </div>
      <div ref="charts2" class="charts2" />
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'Category',
  data() {
    return {
      radio: '全部渠道'
    }
  },
  mounted() {
    const lineCharts2 = echarts.init(this.$refs.charts2)
    lineCharts2.setOption({
      title: {
        text: '销售额类别占比',
        subtext: '1112',
        left: 'center',
        top: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '0',
        left: 'center'
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'outside'
          },
          labelLine: {
            show: true
          },
          data: [
            { value: 1048, name: '视频广告' },
            { value: 735, name: '联盟广告' },
            { value: 484, name: '邮件营销' },
            { value: 300, name: '直接访问' },
            { value: 600, name: '搜索引擎' }
          ]
        }
      ]
    })
    lineCharts2.on('mouseover', (params) => {
      const { name, value } = params.data
      lineCharts2.setOption({
        title: {
          text: name,
          subtext: value
        }
      })
    })
  }
}
</script>

<style scoped>
.charts2 {
  width: 100%;
  height: 328px;
}
.radio {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
