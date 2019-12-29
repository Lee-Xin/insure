<template>
  <div>
    <div class="AttendanceManagementSearch">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="row_3">
          <el-form-item label="月份">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="员工姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="工号">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </div>
        <div class="row_3_button">
          <el-button type="primary">导出摸板</el-button>
          <el-button type="primary">导入</el-button>
          <el-button type="primary">查询</el-button>
        </div>
      </el-form>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="ID" label="序号" width="180"></el-table-column>
        <el-table-column prop="workID" label="工号" width="180"></el-table-column>
        <el-table-column prop="workName" label="姓名"></el-table-column>
        <el-table-column prop="month" label="月份"></el-table-column>
        <el-table-column prop="total_number_meetings_training_sessions" label="总会议或培训次数"></el-table-column>
        <el-table-column prop="actual_number_training_meetings" label="实际培训或会议次数"></el-table-column>
        <el-table-column prop="number_on_site_training_meetings" label="现场培训或会议次数"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {apiAttendanceManagementSearch} from "../../../request/api";

  export default {
        name: "AttendanceManagementSearch",
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
            apiAttendanceManagementSearch().then( res => {
                this.tableData = res.Data;
            })
      }
  }
</script>

<style scoped>
.AttendanceManagementSearch{
  width: 100%;
  min-height: 300px;
  /*background-color: red;*/
}
  .row_3{
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    /*background-color: blue;*/
  }
.row_3_button{
  width: 100%;
  height: 40px;
  margin-top: 50px;
  display: flex;
  justify-content: flex-end;
}
.row_3_button button{
  margin: 0 30px;
}
</style>