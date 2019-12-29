<template>
  <div>
    <div class="TargetConfigurationSearch">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="TargetConfigurationSearch_row_3">
          <el-form-item label="有效人力">
            <el-input v-model="form.name" placeholder="标准保费大于此值"></el-input>
          </el-form-item>
          <el-form-item label="绩优人力">
            <el-input v-model="form.name" placeholder="标准保费大于此值"></el-input>
          </el-form-item>
          <el-form-item label="季度有效人力">
            <el-input v-model="form.name" placeholder="季度内标准保费大于此值"></el-input>
          </el-form-item>
        </div>
        <div class="TargetConfigurationSearch_button">
          <el-button type="primary">保存</el-button>
        </div>
      </el-form>
      <div class="TargetConfigurationSearch_table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="序号"></el-table-column>
          <el-table-column prop="name_institution" label="机构名称"></el-table-column>
          <el-table-column prop="organization_classif_level" label="机构分类级别"></el-table-column>
          <el-table-column prop="monthly_goals" label="月度目标"></el-table-column>
          <el-table-column prop="lifeline_target" label="生命线目标"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import {apiTargetConfigurationSearch} from "../../../request/api";

  export default {
        name: "TargetConfigurationSearch",
        data() {
            return{
                form: {
                    name: '',
                    region: '',

                },
                tableData: []
            }
        },
      created() {
            apiTargetConfigurationSearch().then(res => {
                this.tableData = res.Data
            })
      }
  }
</script>

<style scoped>
.TargetConfigurationSearch{
  width: 100%;
  min-height: 300px;
  /*background-color: red;*/
}
  .TargetConfigurationSearch_row_3{
    width: 100%;
    height: 40px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }
.TargetConfigurationSearch_row_3 .el-form-item{
  width: 26%;
}
  .TargetConfigurationSearch_button{
    width: 100%;
    height: 40px;
    display: flex;
    margin-top: 50px;
    justify-content: center;
  }
</style>