<template>
  <div>
    <div class="ManpowerReportSearch">
      <el-tabs type="border-card">
        <el-tab-pane label="月度">
          <div class="ManpowerReportSearch_moth">
            <el-form ref="monthForm" :model="monthForm" class="search_form">
              <el-form-item>
                <div class="cell_before">机构</div>

                <el-select v-model="monthForm.mechanism" placeholder="请选择分支机构" clearable filterable>
                  <el-option
                    v-for="item in mechanismList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <div class="cell_before">月份</div>
                <el-date-picker v-model="monthForm.month" type="month" value-format="yyyy-MM"></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="getMonthList">搜索</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="ManpowerReportSearch_moth_button">
            <el-button
              type="primary"
              style="float:right;margin-bottom:20px"
              @click="dialogVisibleMonth=true"
            >导出</el-button>
          </div>
          <div class="ManpowerReportSearch_moth_table">
            <el-table :data="monthList" style="width: 100%">
              <el-table-column prop="id" label="序号" width="180"></el-table-column>
              <el-table-column prop="name_institution" label="机构名称" width="180"></el-table-column>
              <el-table-column prop="on_human" label="在册人力"></el-table-column>
              <el-table-column prop="director_human" label="主管人力"></el-table-column>
              <el-table-column prop="Order_human" label="开单人力"></el-table-column>
              <el-table-column prop="effective_human" label="有效人力"></el-table-column>
              <el-table-column prop="blue_chip_human" label="绩优人力"></el-table-column>
              <el-table-column prop="add_human" label="新增人力"></el-table-column>
              <el-table-column prop="time" label="时间段"></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="季度">
          <div class="ManpowerReportSearch_moth">
            <el-form ref="monthForm" :model="monthForm" class="search_form">
              <el-form-item>
                <div class="cell_before">机构</div>
                <el-select
                  v-model="quarterForm.mechanism"
                  placeholder="请选择分支机构"
                  clearable
                  filterable
                >
                  <el-option
                    v-for="item in mechanismList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <div class="cell_before">年度</div>
                <el-date-picker v-model="quarterForm.year" type="year" value-format="yyyy"></el-date-picker>
              </el-form-item>
              <el-form-item>
                <div class="cell_before">季度</div>
                <el-select v-model="quarterForm.jidu" placeholder="请选择季度" clearable filterable>
                  <el-option
                    v-for="item in jiduList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="getQuarterList">搜索</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="ManpowerReportSearch_moth_button">
            <el-button
              type="primary"
              style="float:right;margin-bottom:20px"
              @click="dialogVisibleQuarter=true"
            >导出</el-button>
          </div>
          <div class="ManpowerReportSearch_moth_table">
            <el-table :data="quarterList" style="width: 100%">
              <el-table-column prop="id" label="序号" width="180"></el-table-column>
              <el-table-column prop="name_institution" label="机构名称" width="180"></el-table-column>
              <el-table-column prop="on_human" label="在册人力"></el-table-column>
              <el-table-column prop="director_human" label="主管人力"></el-table-column>
              <el-table-column prop="Order_human" label="开单人力"></el-table-column>
              <el-table-column prop="effective_human" label="有效人力"></el-table-column>
              <el-table-column prop="blue_chip_human" label="绩优人力"></el-table-column>
              <el-table-column prop="add_human" label="新增人力"></el-table-column>
              <el-table-column prop="time" label="时间段"></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog title="导出报表" :visible.sync="dialogVisibleMonth">
      <el-form ref="exportMonthForm" :model="exportMonthForm" class="dialog_from_center">
        <el-form-item>
          <div class="cell_before">机构</div>

          <el-select v-model="exportMonthForm.mechanism" placeholder="请选择分支机构" clearable filterable>
            <el-option
              v-for="item in mechanismList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="cell_before">月份</div>
          <el-date-picker v-model="exportMonthForm.month" type="month" value-format="yyyy-MM"></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleMonth = false">取消</el-button>
        <el-button type="primary" @click="exportFileMonth">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="导出报表" :visible.sync="dialogVisibleQuarter">
      <el-form ref="exportMonthForm" :model="exportMonthForm" class="dialog_from_center">
        <el-form-item>
          <div class="cell_before">机构</div>

          <el-select
            v-model="exportQuarterForm.mechanism"
            placeholder="请选择分支机构"
            clearable
            filterable
          >
            <el-option
              v-for="item in mechanismList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="cell_before">年度</div>
          <el-date-picker v-model="exportQuarterForm.year" type="year" value-format="yyyy"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <div class="cell_before">季度</div>
          <el-select v-model="exportQuarterForm.jidu" placeholder="请选择季度" clearable filterable>
            <el-option v-for="item in jiduList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleQuarter = false">取消</el-button>
        <el-button type="primary" @click="exportFileQuarter">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { apiManpowerReportSearch } from "../../../request/api";
import {
  getallparameter,
  apiManpowerReportSearch,
  exportManpowerReport
} from "@/mock/api";
import formatDate from "@/common/formatDate.js";
export default {
  name: "ManpowerReportSearch",
  data() {
    return {
      monthForm: {
        mechanism: null,
        month: null
      },
      exportMonthForm: {
        mechanism: null,
        month: null
      },
      quarterForm: { mechanism: null, jidu: null, year: null },
      exportQuarterForm: { mechanism: null, jidu: null, year: null },
      mechanismList: [],
      monthList: [],
      quarterList: [],
      jiduList: [
        { id: 1, name: "第一季度" },
        { id: 2, name: "第二季度" },
        { id: 3, name: "第三季度" },
        { id: 4, name: "第四季度" }
      ],
      dialogVisibleMonth: false,
      dialogVisibleQuarter: false
    };
  },
  created() {
    this.monthForm.month = formatDate.month(new Date());
    const year = new Date().getFullYear();
    this.quarterForm.year = year.toString();
    this.getData();
    this.getMonthList();
    this.getQuarterList();
  },
  methods: {
    getData() {
      getallparameter().then(res => {
        this.mechanismList = res.Data.jigou;
      });
    },
    getMonthList() {
      apiManpowerReportSearch(this.monthForm).then(res => {
        this.monthList = res.Data;
      });
    },
    getQuarterList() {
      apiManpowerReportSearch(this.quarterForm).then(res => {
        this.quarterList = res.Data;
      });
    },
    exportFileMonth() {
      exportManpowerReport(this.exportMonthForm).then(res => {
        this.dialogVisibleMonth = false;
        console.log(res);
        this.$message.success(res.data.Msg);
        // window.open(res.data.Data.url);
      });
    },
    exportFileQuarter() {
      exportManpowerReport(this.exportQuarterForm).then(res => {
        this.dialogVisibleQuarter = false;
        console.log(res);
        this.$message.success(res.data.Msg);
        // window.open(res.data.Data.url);
      });
    }
  }
};
</script>

<style scoped>
</style>