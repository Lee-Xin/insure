<template>
  <div>
    <page-hr></page-hr>
    <div class="content_box">
      <el-form ref="form" :model="form" class="search_form" style="padding-left:10px">
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
      <div class="CapacityStatementSearch_button">
        <el-button
          :class="{'el-button--primary':form.jisuanType==1?true:false,'el-button--default':form.jisuanType==2?true:false}"
          @click="checkTag(1)"
        >按照标准保费计算</el-button>
        <el-button
          :class="{'el-button--primary':form.jisuanType==2?true:false,'el-button--default':form.jisuanType==1?true:false}"
          @click="checkTag(2)"
        >按照规模保费计算</el-button>
      </div>
      <el-table :data="tableList" style="width: 100%">
        <el-table-column prop="name" label="机构简称"></el-table-column>
        <el-table-column prop="startHuman" label="期初人力"></el-table-column>
        <el-table-column prop="endHuman" label="期末人力"></el-table-column>
        <el-table-column prop="money" label="标保保费"></el-table-column>
        <el-table-column prop="num" label="承保件数"></el-table-column>
        <el-table-column prop="buyNum" label="开单人数"></el-table-column>
        <el-table-column prop="humanAvgMoney" label="人均保费"></el-table-column>
        <el-table-column prop="humanAvgNum" label="人均件数"></el-table-column>
        <el-table-column prop="numAvgMoney" label="件均保费"></el-table-column>
        <el-table-column prop="humanAvgProduct" label="人均产能"></el-table-column>
        <el-table-column prop="time" label="时间段"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import PageHr from "@/common/PageHr";
import {
  getallparameter,
  getCapacityTypeList,
  getCapacityList,exportCapacity
} from "@/mock/api";
import formatDate from "@/common/formatDate.js";

export default {
  name: "CapacityStatement",
  data() {
    return {
      form: {
        mechanism: null,
        month: null,
        insuranceUseTime: null,
        baodanType: null,
        jisuanType: 1
      },
      mechanismList: [],
      baodanxingziList: [],
      tableList: []
    };
  },

  created() {
    this.form.month = formatDate.month(new Date());
    this.getData();
    this.getTypeList();
    this.getList();
  },
  components: { PageHr },
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
    checkTag(n) {
      this.form.jisuanType = n;
      this.getList();
    },
    getList() {
      getCapacityList(this.form).then(res => {
        this.tableList = res.Data;
      });
    },
    exportFile() {
      exportCapacity().then(res => {
        console.log(res);
        this.$message.success(res.data.Msg);
        // window.open(res.data.Data.url);
      });
    }
  }
};
</script>

<style scoped style="less">
.content_box {
  width: 100%;
  height: auto;
  min-height: 500px;
  box-sizing: border-box;
  padding-left: 16px;
  background: #fff;
  padding-top: 10px;
}
.CapacityStatementSearch_button {
  text-align: left;
  margin: 10px;
}
</style>