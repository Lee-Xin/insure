<template>
  <div>
    <div class="BusinessStatementSearch">
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
          <div class="cell_before">机构级别</div>
          <el-select v-model="form.jigoujibie" placeholder="请选择机构分类级别" clearable filterable>
            <el-option v-for="item in jigouList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label>
          <div class="cell_before">计绩年月</div>
          <el-date-picker type="month" v-model="form.month" value-format="yyyy-MM"></el-date-picker>
        </el-form-item>
        <el-form-item label>
          <div class="cell_before">承保日期</div>
          <el-date-picker
            v-model="form.insuranceUseTime"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label>
          <div class="cell_before">保单性质</div>

          <el-select v-model="form.baodanType" multiple collapse-tags placeholder="请选择保单性质">
            <el-option
              v-for="item in baodanxingziList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList">搜索</el-button>
          <el-button type="primary" @click="exportFile">导出</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableList" style="width: 100%">
        <el-table-column prop="name" label="机构名称"></el-table-column>
        <el-table-column prop="jigoujibie" label="机构分类级别"></el-table-column>
        <el-table-column prop="monthTarget" label="月度目标"></el-table-column>
        <el-table-column prop="money" label="承保保费(元)"></el-table-column>
        <el-table-column prop="finishNum" label="完成率(%)"></el-table-column>
        <el-table-column prop="num" label="承保件数(件)"></el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {
  getallparameter,
  getCapacityTypeList,
  getjigoujibie,
  getBusinessList,
  exportBusiness
} from "@/mock/api";
import formatDate from "@/common/formatDate.js";
export default {
  name: "BusinessStatementSearch",
  data() {
    return {
      form: {
        jigoujibie: null,
        month: null,
        mechanism: null,
        insuranceUseTime: null
      },
      mechanismList: [],
      baodanxingziList: [],
      tableList: [],
      jigouList: []
    };
  },
  created() {
    this.form.month = formatDate.month(new Date());
    this.getData();
    this.getTypeList();
    this.getjigoujibieList();
    this.getList();
  },
  methods: {
    getData() {
      getallparameter().then(res => {
        this.mechanismList = res.Data.jigou;
      });
    },
    getTypeList() {
      getCapacityTypeList().then(res => {
        this.baodanxingziList = res.Data;
      });
    },
    getjigoujibieList() {
      getjigoujibie().then(res => {
        this.jigouList = res.Data;
      });
    },
    getList() {
      getBusinessList(this.form).then(res => {
        this.tableList = res.Data;
      });
    },
    exportFile() {
      exportBusiness().then(res => {
        console.log(res);
        this.$message.success(res.data.Msg);
        // window.open(res.data.Data.url);
      });
    }
  }
};
</script>

<style lang="less">
</style>