<template>
  <div>
    <el-row :gutter="20" style="margin-top: 10px">
      <el-col :span="12" :offset="0">
        <el-card shadow="always">
          <div slot="header">
            <span>线上热门搜索</span>
          </div>
          <div class="menu">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">更多</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-plus">
                  狮子头
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-plus-outline">
                  螺蛳粉
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-check">
                  蚵仔煎
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="main">
            <div class="main-left">
              <span>搜索用户数</span>
              <svg
                t="1686727572731"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1456"
                width="16"
                height="16"
                style="margin-left: 10px; position: relative; top: 2px"
              >
                <path
                  d="M480 64A416.64 416.64 0 0 0 64 480 416.64 416.64 0 0 0 480 896 416.64 416.64 0 0 0 896 480 416.64 416.64 0 0 0 480 64z m0 64C674.752 128 832 285.248 832 480S674.752 832 480 832A351.552 351.552 0 0 1 128 480C128 285.248 285.248 128 480 128zM448 256v64h64V256z m0 128v320h64V384z"
                  fill=""
                  p-id="1457"
                />
              </svg>
              <p>
                <span>12312</span>
                <span style="font-size: 14px; color: #999">17.1</span>
                <svg
                  t="1686730309127"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="5943"
                  width="16"
                  height="16"
                >
                  <path
                    d="M583.93 296.842l234.8 318.515a73.059 73.059 0 0 1-14.99 102.048l-2.62 1.806a78.116 78.116 0 0 1-44.612 13.908h-469.6a75.588 75.588 0 0 1-76.762-74.414 72.878 72.878 0 0 1 14.269-43.348l234.8-318.515a78.568 78.568 0 0 1 106.834-16.888 77.574 77.574 0 0 1 17.881 16.888z"
                    p-id="5944"
                    fill="#d81e06"
                  />
                </svg>
              </p>
              <div ref="charts" class="charts" />
            </div>
            <div class="main-right">
              <span>人均搜索次数</span>
              <svg
                t="1686727572731"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1456"
                width="16"
                height="16"
                style="margin-left: 10px; position: relative; top: 2px"
              >
                <path
                  d="M480 64A416.64 416.64 0 0 0 64 480 416.64 416.64 0 0 0 480 896 416.64 416.64 0 0 0 896 480 416.64 416.64 0 0 0 480 64z m0 64C674.752 128 832 285.248 832 480S674.752 832 480 832A351.552 351.552 0 0 1 128 480C128 285.248 285.248 128 480 128zM448 256v64h64V256z m0 128v320h64V384z"
                  fill=""
                  p-id="1457"
                />
              </svg>
              <p>
                <span>2.7</span>
                <span style="font-size: 14px; color: #999">26.2</span>
                <svg
                  t="1686730512553"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="7143"
                  width="16"
                  height="16"
                >
                  <path
                    d="M458.854 701.962l-234.8-318.605a73.059 73.059 0 0 1 15.262-102.048l2.619-1.806a78.026 78.026 0 0 1 44.612-13.817h469.6a75.588 75.588 0 0 1 76.762 74.413 72.246 72.246 0 0 1-14.269 43.258l-234.8 318.605a78.477 78.477 0 0 1-107.195 17.25 77.213 77.213 0 0 1-17.791-17.25z"
                    p-id="7144"
                    fill="#1afa29"
                  />
                </svg>
              </p>
              <div ref="charts1" class="charts1" />
            </div>
          </div>
          <div class="table">
            <el-table border size="mini">
              <el-table-column type="index" label="排名" />
              <el-table-column label="搜索关键字" />
              <el-table-column label="用户数" />
              <el-table-column label="周涨幅" />
            </el-table>
          </div>
          <!--  @size-change="sizeChange"
              @current-change="currentChange" -->
          <div class="pager">
            <el-pagination
              :current-page="1"
              :page-size="3"
              layout="prev, pager, next"
              :total="15"
              :pager-count="7"
              background
              style="text-align: right"
            >
              >
            </el-pagination>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12" :offset="0" />
      <Category />
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'
import Category from './Category'
export default {
  name: 'ObServe',
  components: {
    Category
  },
  data() {
    return {}
  },
  mounted() {
    const lineCharts = echarts.init(this.$refs.charts)
    lineCharts.setOption({
      xAxis: {
        type: 'category',
        show: false
      },
      yAxis: {
        show: false
      },
      series: [
        {
          type: 'line',
          data: [15, 20, 11, 24, 30, 10, 50],
          itemStyle: {
            opacity: 0
          },
          smooth: true
        }
      ],
      grid: {
        top: 7,
        left: 0,
        right: 0,
        bottom: 0
      }
    })
    const lineCharts1 = echarts.init(this.$refs.charts1)
    lineCharts1.setOption({
      xAxis: {
        type: 'category',
        show: false
      },
      yAxis: {
        show: false
      },
      series: [
        {
          type: 'line',
          data: [30, 50, 20, 11, 30, 100, 50],
          color: '#d4237a',
          itemStyle: {
            opacity: 0
          },
          smooth: true
        }
      ],
      grid: {
        top: 7,
        left: 0,
        right: 0,
        bottom: 0
      }
    })
  }
}
</script>

<style scoped>
.el-card {
  position: relative;
}
.menu {
  position: absolute;
  top: 19px;
  right: 10px;
}
.main {
  display: flex;
}
.main-left,
.main-right {
  width: 300px;
  height: 200px;
  /* background-color: pink; */
}
.main-left p span,
.main-right p span {
  margin-right: 20px;
  font-size: 25px;
}
.charts,
.charts1 {
  width: 90%;
  height: 70px;
}
</style>
