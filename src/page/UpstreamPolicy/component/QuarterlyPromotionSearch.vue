<template>
  <div>
    <div class="QuarterlyPromotionSearch">
      <el-form :inline="true" :model="ruleForm" class="demo-form-inline">
        <div class="row_4">
          <el-form-item label="协议名称" prop="protocol_name">
            <el-input v-model="ruleForm.protocol_name" placeholder="协议名称"></el-input>
          </el-form-item>
          <el-form-item label="供应商" prop="supplierName">
            <el-select v-model="ruleForm.supplierName" placeholder="供应商简称">
              <el-option label="全部" value="0"></el-option>
              <el-option v-for="(item, index) in supplierName" :label="item" :value="item" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开始时间" prop="name">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.startTime"></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" prop="name">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.endTime"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryData">查询</el-button>
          </el-form-item>
        </div>
      </el-form>
      <div class="continuation_table_box">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="序号"></el-table-column>
          <el-table-column prop="procurement_type" label="协议名称"></el-table-column>
          <el-table-column prop="suplierName" label="供应商"></el-table-column>
          <el-table-column prop="startTime" label="开始时间"></el-table-column>
          <el-table-column prop="endTime" label="结束时间"></el-table-column>
          <el-table-column prop="warning_statistics" label="预警统计"></el-table-column>
        </el-table>
      </div>
      <page-ination @changeSize="changeSize" @changeCurrentPage="changeCurrentPage" :total="totalNum"></page-ination>
    </div>
  </div>
</template>

<script>
    import {apiQuarterlyPromotionAwardParam, apiQuarterlyPromotionAwardSearch, apiQuarterlyPromotionAwardPagrInation} from "../../../request/api";
    import PageInation from "../../../common/PageInation";

    export default {
        name: "QuarterlyPromotionSearch",
        components: {PageInation},
        data() {
            return {
                ruleForm: {
                    protocol_name: '',
                    supplierName: '',
                    startTime: '',
                    endTime: ''
                },
                tableData: [],
                supplierName: [],
                pageIndex: 1,
                pageSize:50,
                totalNum: 0,
            }
        },
        methods: {
            changeSize(val){
                this.pageSize = val;
            },
            changeCurrentPage(val){
                this.pageIndex = val;
                apiQuarterlyPromotionAwardPagrInation({
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize
                }).then(res => {
                    this.totalNum = res.Data.totalNum;
                    this.tableData = res.Data.pipeiData;
                })
            },
            queryData() {
                apiQuarterlyPromotionAwardSearch(this.ruleForm).then(res => {
                    this.tableData = res.Data;
                })
            }
        },
        created() {
            apiQuarterlyPromotionAwardPagrInation({
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            }).then(res => {
                this.totalNum = res.Data.totalNum;
                this.tableData = res.Data.pipeiData;
                window.console.log(res);
            })
            apiQuarterlyPromotionAwardParam().then(res => {
                this.supplierName = res.Data.supplierName;
                // window.console.log(res)
            })
        }
    }
</script>

<style scoped>
  .QuarterlyPromotionSearch {
    width: 100%;
    min-height: 500px;
    /*background-color: red;*/
  }
  .row_4{
    background-color: #fff;
  }
</style>