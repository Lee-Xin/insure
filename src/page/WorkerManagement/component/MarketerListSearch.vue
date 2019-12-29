<template>
  <div>
    <div class="MarketerListSearch">

      <el-form ref="form" :model="form">
        <div class="row_6">
          <el-form-item>
            <el-select v-model="form.region">
              <el-option label="姓名" value="shanghai"></el-option>
              <el-option label="手机号码" value="beijing"></el-option>
              <el-option label="工号" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="form.region" placeholder="请输入参保状态">
              <el-option label="不限" value="shanghai"></el-option>
              <el-option label="未参保" value="beijing"></el-option>
              <el-option label="已参保" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="form.region" placeholder="请选择性别">
              <el-option label="全部" value="shanghai"></el-option>
              <el-option label="男" value="beijing"></el-option>
              <el-option label="女" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="form.region" placeholder="请选择职级">
              <el-option label="全部" value="shanghai"></el-option>
              <el-option label="初级独立代理人" value="beijing"></el-option>
              <el-option label="高级独立代理人" value="beijing"></el-option>
              <el-option label="资深独立代理人" value="beijing"></el-option>
              <el-option label="初级合伙人" value="beijing"></el-option>
              <el-option label="高级合伙人" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="form.region">
              <el-option label="全部" value="shanghai"></el-option>
              <el-option label="在职" value="beijing"></el-option>
              <el-option label="离职" value="beijing"></el-option>
              <el-option label="其他" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="row_6">
          <el-form-item>
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-select v-model="form.region">
              <el-option label="姓名" value="shanghai"></el-option>
              <el-option label="手机号码" value="beijing"></el-option>
              <el-option label="工号" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item></el-form-item>
          <el-form-item></el-form-item>
          <el-form-item></el-form-item>
          <el-form-item>
            <el-button type="primary">搜索</el-button>
          </el-form-item>
        </div>
      </el-form>
      <div class="DeskListSearch_button">
        <el-button type="primary">营销员模版下载</el-button>
        <el-button type="primary">导出职业信息</el-button>
        <el-button type="primary">导出员工</el-button>
        <el-button type="primary" @click="hideSearch">新增</el-button>
      </div>
      <div class="DeskListSearch_table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="编号"></el-table-column>
          <el-table-column prop="workerID" label="工号"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="sex" label="性别"></el-table-column>
          <el-table-column prop="age" label="年龄"></el-table-column>
          <el-table-column prop="phone" label="手机号"></el-table-column>
          <el-table-column prop="institutions" label="机构"></el-table-column>
          <el-table-column prop="department" label="部门"></el-table-column>
          <el-table-column prop="jobs" label="岗位"></el-table-column>
          <el-table-column prop="state" label="状态"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "MarketerListSearch",
        data() {
            return {
                form: {
                    region: '',
                    name: '',
                    date1: ''
                },
                tableData: []
            }
        },
        methods: {
            hideSearch(){
                this.$emit('hideSearch')
            }
        }
    }
</script>

<style scoped>
  .MarketerListSearch {
    width: 100%;
    min-height: 500px;
    /*background-color: red;*/
  }

  .row_6 {
    width: 100%;
    height: 40px;
    /*background-color: #2c8cf0;*/
    display: flex;
    justify-content: space-around;
    /*height: 16.66;*/
  }

  .row_6 >>> .el-form-item {
    width: 16.66%;
    height: 40px;
    /*background-color: #ef8412;*/
  }
  .row_6 >>> .el-form-item .el-form-item__content{
    width: 100%;
  }
  .row_6 >>> .el-form-item .el-form-item__content .el-input,
  .row_6 >>> .el-form-item .el-form-item__content .el-select,
  .row_6 >>> .el-form-item .el-form-item__content button{
    width: 100%;
  }

  .DeskListSearch_button {
    width: 100%;
    height: 40px;
    margin-top: 50px;
    margin-bottom: 80px;
    /*background-color: #4074e1;*/
  }

  .DeskListSearch_button button {
    width: 120px;
    height: 40px;
    background-color: #2c8cf0;
    color: #fff;
    border: 0;
    margin: 0 50px;
  }

  .DeskListSearch_table {
    width: 100%;
    min-height: 300px;
    /*background-color: red;*/
  }
</style>