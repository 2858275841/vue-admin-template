<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-tabs v-model="activeName">
          <el-tab-pane label="销售额" name="sales" />
          <el-tab-pane label="访问量" name="traffic" />
        </el-tabs>
        <!-- 中间内容区域 -->
        <el-row :gutter="20">
          <el-col :span="18">
            <div class="grid-content bg-purple">
              <div ref="charts" class="charts" />
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <ul class="u1">
                <li>
                  <span style="font-weight: 600; width: 112px">
                    {{ title }}
                  </span>
                </li>
                <li>
                  <b>1</b>
                  <span>肯德基</span>
                  323,114
                </li>
                <li>
                  <b>2</b>
                  <span>麦当劳</span>
                  424,113
                </li>
                <li>
                  <b>3</b>
                  <span>必胜客</span>
                  123,111
                </li>
                <li>
                  <b>4</b>
                  <span>海底捞</span>
                  543,112
                </li>
                <li>
                  <b>5</b>
                  <span>百事可乐</span>
                  111,111
                </li>
                <li>
                  <b>6</b>
                  <span>汉堡王</span>
                  333,444
                </li>
                <li>
                  <b>7</b>
                  <span>真功夫</span>
                  241,114
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
        <div class="right">
          <span>今日</span>
          <span>本周</span>
          <span>本月</span>
          <span>本年</span>
          <el-date-picker
            v-model="data"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"
            value-format="yyyy-MM-dd"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'Sale',
  data() {
    return {
      activeName: 'sales',
      barCharts: null,
      data: []
    }
  },
  computed: {
    title() {
      return this.activeName === 'sales' ? '门店销售额排名' : '访问量排名'
    }
  },
  watch: {
    activeName() {
      if (this.activeName === 'traffic') {
        this.barCharts.setOption({
          title: {
            text: '访问量'
          },
          series: [
            {
              data: [100, 150, 110, 80, 70, 300, 200, 100, 60, 400, 220, 320]
            }
          ]
        })
      } else {
        this.barCharts.setOption({
          title: {
            text: '门店销售额排名'
          },
          series: [
            {
              data: [400, 90, 200, 350, 390, 320, 220, 160, 90, 200, 140, 300]
            }
          ]
        })
      }
    }
  },
  mounted() {
    this.barCharts = echarts.init(this.$refs.charts)
    this.barCharts.setOption({
      title: {
        text: this.title
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月'
          ],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: [400, 90, 200, 350, 390, 320, 220, 160, 90, 200, 140, 300],
          color: '#91bef0'
        }
      ]
    })
  }
}
</script>
<style scoped>
ul {
  list-style: none;
}
>>> .el-card__header {
  border: none;
}
.clearfix {
  position: relative;
}
.el-tabs {
  width: 100%;
}
.right {
  position: absolute;
  right: 0;
  top: 0;
}
.right span {
  margin-right: 15px;
}
.charts {
  width: 100%;
  height: 300px;
}
.u1 li {
  padding: 10px 0;
}
.u1 li b {
  padding: 2px 0;
  margin-right: 30px;
  display: inline-block;
  font-size: 13px;
  width: 20px;
  height: 20px;
  color: white;
  background-color: black;
  text-align: center;
  border-radius: 50%;
  vertical-align: middle;
}
.u1 li span {
  display: inline-block;
  width: 80px;
  text-align: center;
}
.u1 li span {
  margin-right: 40px;
}
</style>
