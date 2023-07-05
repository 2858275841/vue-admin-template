<!-- @format -->

<template>
  <div ref="charts" class="charts" />
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'ProgressChart',
  mounted() {
    const ProgressChart = echarts.init(this.$refs.charts)
    ProgressChart.setOption({
      xAxis: {
        show: false,
        min: 0,
        max: 100
      },
      yAxis: {
        show: false,
        type: 'category'
      },
      series: [
        {
          type: 'bar',
          data: [78],
          barWidth: 15,
          showBackground: true,
          color: 'skyblue',
          label: {
            show: true,
            formatter: '|',
            position: 'right',
            color: '#91bef0'
          }
        }
      ],
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      }
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
