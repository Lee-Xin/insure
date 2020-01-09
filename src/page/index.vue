<template>
  <div>
    <div class="showData">
      <div class="showData_box">
        <div class="showData_box_th">
          <span>时间段</span>
          <span>件数</span>
          <span>标保</span>
        </div>
        <div class="showData_box_td">
          <div>昨天( {{ showData.day.time }} )</div>
          <div>{{ showData.day.num }}件</div>
          <div>{{ showData.day.money }}万</div>
        </div>
        <div class="showData_box_td">
          <div>本月(截止昨天)</div>
          <div>{{ showData.month.num }}件</div>
          <div>{{ showData.month.money }}万</div>
        </div>
        <div class="showData_box_td">
          <div>本年(截至昨天)</div>
          <div>{{ showData.year.num }}件</div>
          <div>{{ showData.year.money }}万</div>
        </div>
      </div>
    </div>
    <div class="dataGraph">
      <div id="dataGraphOne"></div>
      <div id="dataGraphTwo"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { apiHome } from "@/mock/api";

export default {
  name: "index",
  data() {
    return {
      showData: {
        day: {},
        month: {},
        year: {},
        monthList: [],
        yearList: []
      }
    };
  },
  created() {},
  mounted() {
    this.apiData();
  },
  methods: {
    apiData() {
      apiHome().then(res => {
        this.showData = res.Data;
        this.monthInit();
        this.yearInit();
      });
    },
    monthInit() {
      const myChart = echarts.init(document.getElementById("dataGraphOne"));
      let option = {
        title: {
          text: `${this.showData.month.time}业绩动态走势图`
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#283b56"
            }
          }
        },
        legend: {
          data: ["件数", "标准保险"],
          bottom: 5
        },

        dataZoom: {
          show: false,
          start: 0,
          end: 100
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            data: this.showData.monthList.map(item => item.time)
          },
          {
            type: "category",
            boundaryGap: true,
            data: this.showData.monthList.map(item => item.time)
          }
        ],
        yAxis: [
          {
            name: "标准保险/万"
          },
          {
            name: "件数/件"
          }
        ],
        series: [
          {
            name: "件数",
            type: "line",
            yAxisIndex: 1,
            data: this.showData.monthList.map(item => item.num)
          },
          {
            name: "标准保险",
            type: "line",
            data: this.showData.monthList.map(item => item.money)
          }
        ]
      };
      myChart.setOption(option);
    },
    yearInit() {
      const myChart = echarts.init(document.getElementById("dataGraphTwo"));
      let option = {
        title: {
          text: `${this.showData.year.time}业绩动态走势图`
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#283b56"
            }
          }
        },
        legend: {
          data: ["件数", "标准保险"],
          bottom: 5
        },

        dataZoom: {
          show: false,
          start: 0,
          end: 100
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            data: this.showData.yearList.map(item => item.time)
          },
          {
            type: "category",
            boundaryGap: true,
            data: this.showData.yearList.map(item => item.time)
          }
        ],
        yAxis: [
          {
            name: "标准保险/万"
          },
          {
            name: "件数/件"
          }
        ],
        series: [
          {
            name: "件数",
            type: "line",
            yAxisIndex: 1,
            data: this.showData.yearList.map(item => item.num)
          },
          {
            name: "标准保险",
            type: "line",
            data: this.showData.yearList.map(item => item.money)
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>

<style scoped>
.showData {
  width: 100%;
  height: 264px;
  padding: 0 200px;
  box-sizing: border-box;
}

.showData_box {
  width: 100%;
  height: inherit;
}

.showData_box_th,
.showData_box_td {
  width: 100%;
  height: 80px;
  font-size: 18px;
  color: #4e8afa;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
}

.showData_box_th span {
  display: block;
  width: 30%;
  height: 50px;
  line-height: 80px;
}

.showData_box_td {
  height: 50px;
  font-size: 16px;
  font-weight: normal;
  color: #fff;
  margin-top: 10px;
}

.showData_box_td > div {
  width: 30%;
  height: 50px;
  line-height: 50px;
  background-color: #4e8afa;
}

.dataGraph {
  width: 100%;
  height: 500px;
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  background-color: #edf2f6;
  padding-bottom: 50px;
}

#dataGraphOne,
#dataGraphTwo {
  width: 45%;
  height: 500px;
  background-color: #fff;
}
</style>
