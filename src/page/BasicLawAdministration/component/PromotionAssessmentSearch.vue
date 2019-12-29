<template>
  <div>
    <div class="PromotionAssessmentSearch">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="row_4_4">
          <el-form-item label="考核月份">
            <el-date-picker type="date" placeholder="请选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="机构">
            <el-select v-model="form.region" placeholder="请选择机构">
              <el-option label="全部" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="员工工号">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="员工姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </div>
        <div class="row_4_4">
          <el-form-item label="当前职级">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="全部" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="考核结果">
              <el-select v-model="form.region" placeholder="请选择">
                <el-option label="全部" value="shanghai"></el-option>
                <el-option label="晋升" value="shanghai"></el-option>
                <el-option label="维持" value="shanghai"></el-option>
                <el-option label="降级" value="shanghai"></el-option>
                <el-option label="未到考核期" value="shanghai"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item></el-form-item>
          <el-form-item></el-form-item>
        </div>
        <div class="SalarySettlementSearch_button">
          <el-button>保单检验</el-button>
          <el-button>人员校验</el-button>
          <el-button>冻结</el-button>
          <el-button>试算</el-button>
          <el-button>批量降级</el-button>
          <el-button>批量晋升</el-button>
          <el-button>计算</el-button>
          <el-button>导出</el-button>
          <el-button>搜索</el-button>
        </div>
      </el-form>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="序号" width="180"></el-table-column>
        <el-table-column prop="workID" label="员工工号" width="180"></el-table-column>
        <el-table-column prop="workName" label="员工姓名"></el-table-column>
        <el-table-column prop="current_rank" label="当前职级"></el-table-column>
        <el-table-column prop="inspection_in" label="考核月份"></el-table-column>
        <el-table-column prop="demoted_rank" label="降级后职级"></el-table-column>
        <el-table-column prop="rank_after_promotion" label="晋升后职级"></el-table-column>
        <el-table-column prop="result" label="考核结果"></el-table-column>
        <el-table-column prop="operation" label="操作"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {apiSalarySettlement} from "../../../request/api";

  export default {
        name: "PromotionAssessmentSearch",
        data() {
            return{
                form: {
                    name: '',
                    region: ''
                },
                tableData: []
            }
        },
      created() {
            apiSalarySettlement().then(res => {
                this.tableData = res.Data;
            })
      }
  }
</script>

<style scoped>
  .PromotionAssessmentSearch{
    width: 100%;
    min-height: 300px;
  }
  .row_4_4 {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    /*background-color: red;*/
  }

  .SalarySettlementSearch_button {
    width: 100%;
    height: 40px;
    /*background-color: red;*/
    display: flex;
    justify-content: flex-end;
  }

  .SalarySettlementSearch_button button {
    background-color: #4074e1;
    color: #fff;
    font-size: 14px;
    border: none;
  }
</style>