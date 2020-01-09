<template>
  <div>
    <div class="SupplierPremiumSearch">
      <el-form ref="form" :model="form" class="search_from">
        <el-form-item>
          <div class="cell_before">投保时间</div>
          <el-date-picker
            v-model="form.insuranceBuyTime"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <div class="cell_before">承保时间</div>
          <el-date-picker
            v-model="form.insuranceUseTime"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <div class="cell_before">选择供应商</div>
          <el-select
            v-model="form.supplier"
            placeholder="请选择保险公司"
            clearable
            filterable
          >
            <el-option
              v-for="item in supplierList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <div class="cell_before">选择机构</div>

          <el-select
            v-model="form.mechanism"
            placeholder="请输入分支机构"
            clearable
            filterable
          >
            <el-option
              v-for="item in mechanismList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="cell_before">保险类型</div>

          <el-select
            v-model="form.type"
            placeholder="请输入险种"
            clearable
            filterable
          >
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dialogVisible = true"
            >导出供应商保费</el-button
          >
          <el-button type="primary" @click="getList">搜索</el-button>
        </el-form-item>
      </el-form>
      <div id="supplierCharInit" style="height:400px;margin-bottom:20px"></div>

      <el-dialog title="导出报表" :visible.sync="dialogVisible">
        <el-form
          ref="exportForm"
          :model="exportForm"
          class="dialog_from_center"
        >
          <el-form-item>
            <el-date-picker
              v-model="exportForm.insuranceBuyTime"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="投保开始日期"
              end-placeholder="投保结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="exportForm.insuranceUseTime"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="承保开始日期"
              end-placeholder="承保结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="exportForm.supplier"
              placeholder="请选择保险公司"
              clearable
              filterable
            >
              <el-option
                v-for="item in supplierList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-select
              v-model="exportForm.mechanism"
              placeholder="请输入分支机构"
              clearable
              filterable
            >
              <el-option
                v-for="item in mechanismList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="exportForm.type"
              placeholder="请输入险种"
              clearable
              filterable
            >
              <el-option
                v-for="item in typeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="exportFile">确定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getallparameter,
  getSupplierPermiunr,
  exportSupplierPermiunr
} from "@/mock/api";
import echarts from "echarts";

export default {
  name: "SupplierPremiumSearch",
  data() {
    return {
      form: {
        insuranceBuyTime: null,
        insuranceUseTime: null,
        supplier: null,
        mechanism: null,
        type: null
      },
      supplierList: [],
      mechanismList: [],
      typeList: [],
      totalMoney: 0,
      totalNum: 0,
      list: [],
      dialogVisible: false,
      exportForm: {
        insuranceBuyTime: null,
        insuranceUseTime: null,
        supplier: null,
        mechanism: null,
        type: null
      }
    };
  },
  created() {
    this.getData();
    this.getList();
  },
  methods: {
    getData() {
      getallparameter().then(res => {
        this.supplierList = res.Data.gongyingshang;
        this.mechanismList = res.Data.jigou;
        this.typeList = res.Data.xianzhong;
      });
    },
    getList() {
      let insuranceBuyTime =
        this.form.insuranceBuyTime && this.form.insuranceBuyTime.length
          ? this.form.insuranceBuyTime.join(",")
          : null;
      let insuranceUseTime =
        this.form.insuranceUseTime && this.form.insuranceUseTime.length
          ? this.form.insuranceUseTime.join(",")
          : null;
      getSupplierPermiunr({
        insuranceBuyTime,
        insuranceUseTime,
        supplier: this.form.supplier,
        mechanism: this.form.mechanism,
        type: this.form.type
      }).then(res => {
        let data = res.Data;
        this.totalMoney = data.totalMoney;
        this.totalNum = data.totalNum;
        this.list = data.list;
        this.echarInit();
      });
    },
    echarInit() {
      const myChart = echarts.init(document.getElementById("supplierCharInit"));
      let option = {
        title: {
          text: `总标准保费:${this.totalMoney}万元(${this.totalNum}件)`,
          textStyle: {
            color: "#ec1c1c",
            fontSize: 20
          },
          right: 20
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        dataZoom: {
          show: false
        },
        grid: {
          left: "3%",
          right: "8%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          name: "标准保险(万元)",
          type: "value",
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          name: "供应商",
          type: "category",
          data: this.list.map(item => item.name)
        },
        series: [
          {
            type: "bar",
            data: this.list.map(item => item.money)
          }
        ]
      };
      myChart.setOption(option);
    },
    exportFile() {
      let insuranceBuyTime =
        this.exportForm.insuranceBuyTime &&
        this.exportForm.insuranceBuyTime.length
          ? this.exportForm.insuranceBuyTime.join(",")
          : null;
      let insuranceUseTime =
        this.exportForm.insuranceUseTime &&
        this.exportForm.insuranceUseTime.length
          ? this.exportForm.insuranceUseTime.join(",")
          : null;
      exportSupplierPermiunr({
        insuranceBuyTime,
        insuranceUseTime,
        supplier: this.exportForm.supplier,
        mechanism: this.exportForm.mechanism,
        type: this.exportForm.type
      }).then(res => {
        this.dialogVisible = false;
        console.log(res);
        this.$message.success(res.data.Msg);
        // window.open(res.data.Data.url);
      });
    }
  }
};
</script>

<style scoped></style>
