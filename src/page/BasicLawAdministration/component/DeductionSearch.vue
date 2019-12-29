<template>
  <div>
    <div class="DeductionSearch">
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input v-model="form.name" placeholder="请输入工号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker type="date" placeholder="选择年月" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="DeductionSearch_button">
        <el-button type="primary">薪资调整明细模板下载</el-button>
        <el-button type="primary">导入薪资调整明细文件</el-button>
      </div>
      <div class="DeductionSearch_table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="workID" label="工号" width="180"></el-table-column>
          <el-table-column prop="workName" label="姓名" width="180"></el-table-column>
          <el-table-column prop="monthly_commissions" label="佣金年月"></el-table-column>
          <el-table-column prop="project" label="项目" width="180"></el-table-column>
          <el-table-column prop="money" label="金额" width="180"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import {apiDeductionSearch} from "../../../request/api";

  export default {
        name: "DeductionSearch",
        data(){
            return{
                form: {
                    name: '',
                },
                tableData: []
            }
        },
      created() {
            apiDeductionSearch().then(res => {
                this.tableData = res.Data;
            })
      }
  }
</script>

<style scoped>
.DeductionSearch{
  width: 100%;
  min-height: 300px;
  /*background-color: red;*/
}
.DeductionSearch .el-form{
  width: 100%;
  height: 40px;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
}
  .DeductionSearch_button{
    width: 100%;
    height: 40px;
    margin-top: 40px;
    margin-bottom: 60px;
  }
</style>
