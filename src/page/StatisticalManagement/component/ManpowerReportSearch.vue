<template>
  <div>
    <div class="ManpowerReportSearch">
      <el-tabs type="border-card">
        <el-tab-pane label="月度">
          <div class="ManpowerReportSearch_moth">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="活动区域">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">搜索</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="ManpowerReportSearch_moth_button">
            <el-button type="primary">导出</el-button>
          </div>
          <div class="ManpowerReportSearch_moth_table">
            <el-table :data="tableData_1" style="width: 100%">
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
        <el-tab-pane label="季度">配置管理</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import {apiManpowerReportSearch} from "../../../request/api";

  export default {
        name: "ManpowerReportSearch",
        data() {
            return{
                form: {
                    name: '',
                    region: ''
                },
                tableData_1: []
            }
        },
      created() {
            apiManpowerReportSearch().then(res => {
                this.tableData_1 = res.Data;
            })
      }
  }
</script>

<style scoped>
.ManpowerReportSearch{
  width: 100%;
  min-height: 300px;
  /*background-color: red;*/
}
  .ManpowerReportSearch_moth >>> .el-form{
    width: 100%;
    height: 40px;
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    /*background-color: blue;*/
  }
  .ManpowerReportSearch_moth_button{
    width: 100%;
    height: 40px;
    display: flex;
    box-sizing: border-box;
    padding-right: 40px;
    margin-top: 60px;
    justify-content: flex-end;
  }
</style>