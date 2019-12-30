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
          <div>昨天( {{yesterDayTime}} )</div>
          <div>{{showData['YesterDay'][0]}}件</div>
          <div>{{showData['YesterDay'][1]}}万</div>
        </div>
        <div class="showData_box_td">
          <div>本月(截止昨天)</div>
          <div>{{showData['ThisMonth'][0]}}件</div>
          <div>{{showData['ThisMonth'][1]}}万</div>
        </div>
        <div class="showData_box_td">
          <div>本年(截至昨天)</div>
          <div>{{showData['ThisYear'][0]}}件</div>
          <div>{{showData['ThisYear'][1]}}万</div>
        </div>
      </div>
    </div>
    <div class="dataGraph">
      <div id="dataGraphOne">

      </div>
      <div id="dataGraphTwo"></div>
    </div>
  </div>
</template>

<script>
    // import {apiUpstreamFolding} from "../request/api";

    export default {
        name: "index",
        data() {
            return {
                showData: {
                    "YesterDay": [1, 2.00],
                    "ThisMonth": [3, 4.00],
                    "ThisYear": [5, 6.00]
                }
            }
        },
        // created() {
        //     this.apiData();
        // },
        methods: {
            // apiData() {
            //     apiUpstreamFolding().then(res => {
            //         window.console.log(res)
            //     })
            // }
        },
        mounted() {
            var Highcharts = require('highcharts');
            require('highcharts/modules/exporting')(Highcharts);
            // 创建图表
            Highcharts.chart('dataGraphOne', {
                /*Highcharts 配置*/
                title: {
                    text: '2010 ~ 2016 年太阳能行业就业人员发展情况'
                },
                subtitle: {
                    text: '数据来源：thesolarfoundation.com'
                },
                yAxis: {
                    title: {
                        text: '就业人数'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },
                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        pointStart: 2010
                    }
                },
                series: [{
                    name: '安装，实施人员',
                    data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
                }, {
                    name: '工人',
                    data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
                }, {
                    name: '销售',
                    data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
                }, {
                    name: '项目开发',
                    data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
                }, {
                    name: '其他',
                    data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
                }],
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }
            });
        },
        computed: {
            yesterDayTime: function () {
                let nowTime = new Date();
                return nowTime.getFullYear() + '-' + (nowTime.getMonth() + 1) + '-' + (nowTime.getDay() - 1);
            }
        }
    }
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

  .showData_box_th, .showData_box_td {
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
  .dataGraph{
    width: 100%;
    height: 500px;
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    /*background-color: #999999;*/
  }

  #dataGraphOne,
  #dataGraphTwo{
    width: 45%;
    height: 500px;
    background-color: red;
  }
</style>