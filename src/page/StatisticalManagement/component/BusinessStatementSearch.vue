<template>
  <div>
    <div class="BusinessStatementSearch">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="BusinessStatementSearch_row_4">
          <el-form-item label="分支机构">
            <el-select v-model="form.region" placeholder="请选择分支机构">
              <el-option label="全部" value="shanghai"></el-option>
              <el-option label="重庆众鼎保险代理有限公司南岸区第三营业部" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="机构级别">
            <el-select v-model="form.region" placeholder="请选择机构分类级别">
              <el-option label="请选择" value="shanghai"></el-option>
              <el-option label="A" value="beijing"></el-option>
              <el-option label="B" value="beijing"></el-option>
              <el-option label="C" value="beijing"></el-option>
              <el-option label="D" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="计绩月份">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="承保日期">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </div>
        <div class="BusinessStatementSearch_row_4">
          <el-form-item label="保单性质">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="全部" value="shanghai"></el-option>
              <el-option label="自保件" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item></el-form-item>
          <el-form-item></el-form-item>
          <el-form-item>
            <el-button type="primary">搜索</el-button>
            <el-button type="primary">导出</el-button>
          </el-form-item>
        </div>
      </el-form>
      <div class="BusinessStatementSearch_table"></div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "BusinessStatementSearch",
        data() {
            return{
                form: {
                    region: '',
                    date1: ''
                }
            }
        }
    }
</script>

<style scoped>
.BusinessStatementSearch{
  width: 100%;
  min-height: 300px;
  /*background-color: red;*/
}
.BusinessStatementSearch_row_4{
  width: 100%;
  height: 40px;
  display: flex;
  margin-top: 30px;
  justify-content: space-around;
}
.BusinessStatementSearch_row_4 .el-form-item{
  width: 20%;
}
.BusinessStatementSearch_row_4 .el-form-item .el-form-item_content{
  width: 100%;
}
  .BusinessStatementSearch_table{
    width: 100%;
    margin-top: 30px;
    min-height: 300px;
    border: 1px solid #999;
  }
</style>