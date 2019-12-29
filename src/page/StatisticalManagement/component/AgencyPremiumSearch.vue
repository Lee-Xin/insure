<template>
  <div>
    <div class="AgencyPremiumSearch">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="AgencyPremiumSearch_row_3">
          <el-form-item label="投保时间">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="承保时间">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="选择供应商">
            <el-select v-model="form.region" placeholder="请选择保险公司">
              <el-option label="全部" value="shanghai"></el-option>
              <el-option label="光大永明人寿保险公司" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="AgencyPremiumSearch_row_3">
          <el-form-item label="选择机构">
            <el-select v-model="form.region" placeholder="请输入分支机构">
              <el-option label="全部" value="shanghai"></el-option>
              <el-option label="重庆众鼎保险代理有限公司南岸区第三营业部" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="form.region" placeholder="请输入险种">
              <el-option label="全部" value="shanghai"></el-option>
              <el-option label="光大永明附加吉瑞宝重大疾病保险" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item></el-form-item>
        </div>
        <div class="AgencyPremiumSearch_button">
          <el-form-item>
            <el-button type="primary">导出供应商保费</el-button>
            <el-button type="primary">搜索</el-button>
          </el-form-item>
        </div>
      </el-form>
      <div class="AgencyPremiumSearch_tu">

      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "AgencyPremiumSearch",
        data(){
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
  .AgencyPremiumSearch {
    width: 100%;
    min-height: 300px;
    /*background-color: red;*/
  }
  .AgencyPremiumSearch_row_3{
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-around;
    /*background-color: #4074e1;*/
  }
  .AgencyPremiumSearch_row_3 .el-form-item{
    width: 33.33%;
  }
  .AgencyPremiumSearch_row_3 .el-form-item .el-form-item__content .el-select{
    width: 100%;
  }
  .AgencyPremiumSearch_button{
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    margin-top: 40px;
  }
  .AgencyPremiumSearch_button button{
    margin: 0 30px;
  }
  .AgencyPremiumSearch_tu{
    width: 70%;
    height: 500px;
    background-color: red;
    margin: 60px auto 0;
  }
</style>