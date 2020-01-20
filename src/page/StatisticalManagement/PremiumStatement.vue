<template>
  <div>
    <page-hr></page-hr>
    <div class="content_box">
      <el-form ref="form" :model="form" class="search_form">
        <el-form-item>
          <div class="cell_before">选择机构</div>
          <el-select v-model="form.mechanism" placeholder="请选择分支机构" clearable filterable>
            <el-option
              v-for="item in mechanismList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label>
          <div class="cell_before">绩效年月</div>
          <el-date-picker type="monthrange" v-model="form.month" value-format="yyyy-MM"></el-date-picker>
        </el-form-item>
        <el-form-item label>
          <div class="cell_before">承保日期</div>
          <el-date-picker type="daterange" v-model="form.date" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableList" style="width: 100%">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="workId" label="工号"></el-table-column>
        <el-table-column prop="jigou" label="所属机构"></el-table-column>
        <el-table-column prop="jibie" label="当前职级"></el-table-column>
        <el-table-column prop="money" label="保费"></el-table-column>
      </el-table>
      <page-ination
        @changeSize="changeSize"
        @changeCurrentPage="changeCurrentPage"
        :total="totalNum"
      ></page-ination>
    </div>
  </div>
</template>

<script>
import PageHr from "@/common/PageHr";
import PageInation from "../../common/PageInation";
import { getallparameter, getPremiumStatement } from "@/mock/api";
import formatDate from "@/common/formatDate.js";

export default {
  name: "PremiumStatement",
  data() {
    return {
      form: {
        month: [],
        mechanism: null,
        date: null,
        MaxResultCount: 50, //页码数
        Sorting: 1, //排序
        SkipCount: 0 //开始的索引
      },
      tableList: [],
      mechanismList: [],
      totalNum: null
    };
  },
  components: { PageHr, PageInation },
  created() {
    let month = formatDate.month(new Date());
    this.form.month = [month, month];
    this.getData();
    this.getList();
  },
  methods: {
    getData() {
      getallparameter().then(res => {
        this.mechanismList = res.Data.jigou;
      });
    },
    handleQuery() {
      this.form.SkipCount = 0;
      this.getList();
    },
    //  当页每页显示的条数发生改变
    changeSize(val) {
      this.form.SkipCount = 0;
      this.form.MaxResultCount = val;
      this.getList();
    },
    //  当前页发生改变时
    changeCurrentPage(val) {
      this.form.SkipCount = (val - 1) * this.form.MaxResultCount;
      this.getList();
    },
    //  搜索数据
    getList() {
      getPremiumStatement(this.form).then(res => {
        if (res.success) {
          this.tableList = res.result.items;
          this.totalNum = res.result.totalCount;
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
  /*background-color: red;*/
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
}
.form_table {
  margin-top: 40px;
  width: 100%;
  min-height: 300px;
  border: 1px solid #666;
}
</style>