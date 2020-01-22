<template>
  <div>
    <page-hr></page-hr>
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
                <div class="cell_before">姓名</div>
                <el-input v-model="monthForm.name" placeholder="请输入姓名" clearable></el-input>
              </el-form-item>
              <el-form-item>
                <div class="cell_before">年度</div>
                <el-date-picker v-model="monthForm.year" type="year" value-format="yyyy"></el-date-picker>
              </el-form-item>
              <el-form-item>
                <div class="cell_before">月份</div>

                <el-select v-model="monthForm.month" placeholder="请选择月份" clearable filterable>
                  <el-option
                    v-for="item in monthList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleQuery1">搜索</el-button>
              </el-form-item>
            </el-form>
          </div>

          <div class="ManpowerReportSearch_moth_table">
            <el-table :data="tableList1" style="width: 100%">
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="workId" label="工号"></el-table-column>
              <el-table-column prop="jigou" label="所属机构"></el-table-column>
              <el-table-column prop="jibie" label="当前职级"></el-table-column>
              <el-table-column prop="addNum" label="增员人数"></el-table-column>
              <el-table-column prop="money" label="增员标准保费"></el-table-column>
              <el-table-column prop="teamContiune" label="继续率R13"></el-table-column>
            </el-table>
          </div>
          <page-ination
            @changeSize="changeSize1"
            @changeCurrentPage="changeCurrentPage1"
            :total="totalNum1"
          ></page-ination>
        </el-tab-pane>
        <el-tab-pane label="季度">
          <div class="ManpowerReportSearch_moth">
            <el-form ref="quarterForm" :model="quarterForm" class="search_form">
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
                <div class="cell_before">姓名</div>
                <el-input v-model="quarterForm.name" placeholder="请输入姓名" clearable></el-input>
              </el-form-item>
              <el-form-item>
                <div class="cell_before">年度</div>
                <el-date-picker v-model="quarterForm.year" type="year" value-format="yyyy"></el-date-picker>
              </el-form-item>
              <el-form-item>
                <div class="cell_before">季度</div>

                <el-select v-model="quarterForm.quarter" placeholder="请选择月份" clearable filterable>
                  <el-option
                    v-for="item in jiduList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleQuery2">搜索</el-button>
              </el-form-item>
            </el-form>
          </div>

          <div class="ManpowerReportSearch_moth_table">
            <el-table :data="tableList2" style="width: 100%">
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="workId" label="工号"></el-table-column>
              <el-table-column prop="jigou" label="所属机构"></el-table-column>
              <el-table-column prop="jibie" label="当前职级"></el-table-column>
              <el-table-column prop="addNum" label="增员人数"></el-table-column>
              <el-table-column prop="money" label="增员标准保费"></el-table-column>
              <el-table-column prop="teamContiune" label="继续率R13"></el-table-column>
            </el-table>
          </div>
          <page-ination
            @changeSize="changeSize2"
            @changeCurrentPage="changeCurrentPage2"
            :total="totalNum2"
          ></page-ination>
        </el-tab-pane>
        <el-tab-pane label="年度">
          <div class="ManpowerReportSearch_moth">
            <el-form ref="yearForm" :model="yearForm" class="search_form">
              <el-form-item>
                <div class="cell_before">机构</div>

                <el-select v-model="yearForm.mechanism" placeholder="请选择分支机构" clearable filterable>
                  <el-option
                    v-for="item in mechanismList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <div class="cell_before">姓名</div>
                <el-input v-model="yearForm.name" placeholder="请输入姓名" clearable></el-input>
              </el-form-item>
              <el-form-item>
                <div class="cell_before">年度</div>
                <el-date-picker v-model="yearForm.year" type="year" value-format="yyyy"></el-date-picker>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="handleQuery3">搜索</el-button>
              </el-form-item>
            </el-form>
          </div>

          <div class="ManpowerReportSearch_moth_table">
            <el-table :data="tableList3" style="width: 100%">
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="workId" label="工号"></el-table-column>
              <el-table-column prop="jigou" label="所属机构"></el-table-column>
              <el-table-column prop="jibie" label="当前职级"></el-table-column>
              <el-table-column prop="addNum" label="增员人数"></el-table-column>
              <el-table-column prop="money" label="增员标准保费"></el-table-column>
              <el-table-column prop="teamContiune" label="继续率R13"></el-table-column>
            </el-table>
          </div>
          <page-ination
            @changeSize="changeSize3"
            @changeCurrentPage="changeCurrentPage3"
            :total="totalNum3"
          ></page-ination>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import PageHr from "@/common/PageHr";
import PageInation from "../../common/PageInation";
import { getallparameter, getPersonalAdditionStatementList } from "@/mock/api";

export default {
  name: "PersonalAdditionStatement",
  data() {
    return {
      monthForm: {
        month: null,
        year: null,
        mechanism: null,
        name: null,
        type: 1,
        MaxResultCount: 50, //页码数
        Sorting: 1, //排序
        SkipCount: 0 //开始的索引
      },
      yearForm: {
        year: null,
        mechanism: null,
        name: null,
        type: 3,
        MaxResultCount: 50, //页码数
        Sorting: 1, //排序
        SkipCount: 0 //开始的索引
      },
      quarterForm: {
        quarter: null,
        year: null,
        type: 2,
        mechanism: null,
        name: null,
        MaxResultCount: 50, //页码数
        Sorting: 1, //排序
        SkipCount: 0 //开始的索引
      },
      jiduList: [
        { id: 1, name: "第一季度" },
        { id: 2, name: "第二季度" },
        { id: 3, name: "第三季度" },
        { id: 4, name: "第四季度" }
      ],
      monthList: [
        { id: 1, name: "一月" },
        { id: 2, name: "二月" },
        { id: 3, name: "三月" },
        { id: 4, name: "四月" },
        { id: 5, name: "五月" },
        { id: 6, name: "六月" },
        { id: 7, name: "七月" },
        { id: 8, name: "八月" },
        { id: 9, name: "九月" },
        { id: 10, name: "十月" },
        { id: 11, name: "十一月" },
        { id: 12, name: "十二月" }
      ],
      mechanismList: [],
      tableList1: [],
      totalNum1: null,
      tableList2: [],
      totalNum2: null,
      tableList3: [],
      totalNum3: null
    };
  },
  components: { PageInation, PageHr },
  created() {
    this.getData();
    this.getList(this.monthForm);
    this.getList(this.quarterForm);
    this.getList(this.yearForm);
  },
  methods: {
    getData() {
      getallparameter().then(res => {
        this.mechanismList = res.Data.jigou;
      });
    },
    handleQuery1() {
      this.monthForm.SkipCount = 0;
      this.getList(this.monthForm);
    },
    handleQuery2() {
      this.quarterForm.SkipCount = 0;
      this.getList(this.quarterForm);
    },
    handleQuery3() {
      this.yearForm.SkipCount = 0;
      this.getList(this.yearForm);
    },
    //  当页每页显示的条数发生改变
    changeSize1(val) {
      this.monthForm.SkipCount = 0;
      this.monthForm.MaxResultCount = val;
      this.getList(this.monthForm);
    },
    changeSize2(val) {
      this.quarterForm.SkipCount = 0;
      this.quarterForm.MaxResultCount = val;
      this.getList(this.quarterForm);
    },
    changeSize3(val) {
      this.yearForm.SkipCount = 0;
      this.yearForm.MaxResultCount = val;
      this.getList(this.yearForm);
    },
    //  当前页发生改变时
    changeCurrentPage1(val) {
      this.monthForm.SkipCount = (val - 1) * this.monthForm.MaxResultCount;
      this.getList(this.monthForm);
    },
    changeCurrentPage2(val) {
      this.quarterForm.SkipCount = (val - 1) * this.quarterForm.MaxResultCount;
      this.getList(this.quarterForm);
    },
    changeCurrentPage3(val) {
      this.yearForm.SkipCount = (val - 1) * this.yearForm.MaxResultCount;
      this.getList(this.yearForm);
    },
    //  搜索数据
    getList(form) {
      getPersonalAdditionStatementList(form).then(res => {
        if (res.success) {
          if (form.type == 1) {
            this.tableList1 = res.result.items;
            this.totalNum1 = res.result.totalCount;
          }
          if (form.type == 2) {
            this.tableList2 = res.result.items;
            this.totalNum2 = res.result.totalCount;
          }
          if (form.type == 3) {
            this.tableList3 = res.result.items;
            this.totalNum3 = res.result.totalCount;
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.row_2 {
  width: 100%;
  height: 40px;
  margin-top: 30px;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
}
.tab1_table {
  width: 100%;
  min-height: 300px;
  margin-top: 40px;
  border: 1px solid #666;
}
</style>