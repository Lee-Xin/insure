<template>
  <div>
    <div class="SalarySettlementSearch">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="row_4_4">
          <el-form-item label="日期">
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
          <el-form-item label="职级">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="初级独立代理人" value="shanghai"></el-option>
              <el-option label="高级独立代理人" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item></el-form-item>
          <el-form-item></el-form-item>
          <el-form-item></el-form-item>
        </div>
        <div class="SalarySettlementSearch_button">
          <el-button>保单检验</el-button>
          <el-button>人员校验</el-button>
          <el-button>封账</el-button>
          <el-button>计税</el-button>
          <el-button>试算</el-button>
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
        <el-table-column prop="Working_state" label="在职状态"></el-table-column>
        <el-table-column prop="first_year_commission" label="首年度佣金"></el-table-column>
        <el-table-column prop="address" label="资深合伙人管理津贴"></el-table-column>
        <el-table-column prop="address" label="育成奖"></el-table-column>
        <el-table-column prop="address" label="推荐奖金"></el-table-column>
        <el-table-column prop="address" label="续年度佣金"></el-table-column>
        <el-table-column prop="address" label="薪资调整税前"></el-table-column>
        <el-table-column prop="address" label="薪资调整税后"></el-table-column>
        <el-table-column prop="address" label="增值税附加"></el-table-column>
        <el-table-column prop="address" label="个人所得税"></el-table-column>
        <el-table-column prop="address" label="应发合计"></el-table-column>
        <el-table-column prop="address" label="合计实发"></el-table-column>
        <el-table-column prop="address" label="初级合伙人管理津贴"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {apiSalarySettlementSearch} from "../../../request/api";

  export default {
        name: "SalarySettlementSearch",
        data() {
            return {
                form: {
                    name: '',
                    region: ''
                },
                tableData: []
            }
        },
      created() {
            apiSalarySettlementSearch().then(res => {
                window.console.log(res.Data)
                this.tableData = res.Data;
            })
      }
  }
</script>

<style scoped>
  .SalarySettlementSearch {
    width: 100%;
    min-height: 300px;
    /*background-color: #ef8412;*/
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