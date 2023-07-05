<!-- @format -->

<template>
  <div ref="charts" class="charts" />
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'BarChart',
  mounted() {
    const BarCharts = echarts.init(this.$refs.charts)
    BarCharts.setOption({
      xAxis: {
        show: false,
        type: 'category'
      },
      yAxis: {
        show: false
      },
      series: {
        type: 'bar',
        data: [10, 20, 11, 15, 17, 29],
        color: '#5c7bd9'
      },
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      tooltip: { }
    })
  }
}
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
