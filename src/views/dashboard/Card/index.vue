<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6" :offset="0">
        <el-card>
          <Detail title="总销售" count="￥12306">
            <template slot="charts">
              <span style="margin-right: 5px">
                周同比 56.67%
                <svg
                  t="1686647860248"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2698"
                  width="16"
                  height="16"
                >
                  <path
                    d="M512 405.333333L298.666667 618.666667h426.666666L512 405.333333z"
                    fill="#d81e06"
                    p-id="2699"
                  />
                </svg>
              </span>
              <span>
                日同比 19.16%
                <svg
                  t="1686648143181"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4375"
                  width="16"
                  height="16"
                >
                  <path
                    d="M512 597.333333l-170.666667-170.666666h341.333334l-170.666667 170.666666z"
                    p-id="4376"
                    fill="#1afa29"
                  />
                </svg>
              </span>
            </template>
            <template slot="footer">
              <span>日销售￥ 12423</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6" :offset="0">
        <el-card>
          <Detail title="访问量" count="88460">
            <template slot="charts">
              <LineChart />
            </template>
            <template slot="footer">
              <span>日访问量 1234</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6" :offset="0">
        <el-card>
          <Detail title="支付笔数" count="88460">
            <template slot="charts">
              <BarChart />
            </template>
            <template slot="footer">
              <span>转化率 65%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6" :offset="0">
        <el-card>
          <Detail title="运营活动效果" count="78%">
            <template slot="charts">
              <ProgressChart />
            </template>
            <template slot="footer">
              <span style="margin-right: 10px">
                周同比 12%
                <svg
                  t="1686647860248"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2698"
                  width="16"
                  height="16"
                >
                  <path
                    d="M512 405.333333L298.666667 618.666667h426.666666L512 405.333333z"
                    fill="#d81e06"
                    p-id="2699"
                  />
                </svg>
              </span>
              <span>
                日同比 11%
                <svg
                  t="1686648143181"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4375"
                  width="16"
                  height="16"
                >
                  <path
                    d="M512 597.333333l-170.666667-170.666666h341.333334l-170.666667 170.666666z"
                    p-id="4376"
                    fill="#1afa29"
                  />
                </svg>
              </span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from './Detail'
import LineChart from './lineChart'
import BarChart from './BarChart'
import ProgressChart from './ProgressChart'
export default {
  name: 'Card',
  components: {
    Detail,
    LineChart,
    BarChart,
    ProgressChart
  }
}
</script>

<style></style>
