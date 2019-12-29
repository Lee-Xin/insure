<template>
  <div>
    <main-title :title="title" :title_f="title_f"></main-title>
    <page-hr></page-hr>
    <div class="content_box" v-if="searchORnewsupplier">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="CapacityStatementSearch">
          <el-form-item label="分支机构">
            <el-select v-model="form.region" placeholder="请输入分支机构">
              <el-option label="全部机构" value="shanghai"></el-option>
              <el-option label="重庆众鼎保险代理有限公司南岸区第三营业部" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="计绩年月">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="承保日期">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="保单性质">
            <el-select v-model="form.region" placeholder="请选择保单性质">
              <el-option label="全部" value="shanghai"></el-option>
              <el-option label="参与方案" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button type="primary">导出</el-button>
        </div>
      </el-form>
      <div class="CapacityStatementSearch_button">
        <el-button type="primary">按照标准保费计算</el-button>
        <el-button type="primary">按照规模保费计算</el-button>
      </div>
      <div class="CapacityStatementSearch_table">

      </div>
    </div>
    <div v-if="searchORnewsupplier">
      <page-ination></page-ination>
    </div>
  </div>
</template>

<script>
    import MainTitle from "@/common/MainTitle";
    import PageHr from "@/common/PageHr";
    import PageInation from "../../common/PageInation";

    export default {
        name: "CapacityStatement",
        data() {
            return {
                title: '产能报表',
                title_f: '这是产能报表页面',
                searchORnewsupplier: true,
                form: {
                    name: '',
                    region: ''
                }
            }
        },
        components: {PageInation, PageHr, MainTitle}
    }
</script>

<style scoped>
  .content_box {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding-left: 16px;
  }

  .content_title_1 {
    width: 100%;
    height: 18px;
    display: block;
    line-height: 18px;
    font-size: 18px;
    color: #ef8412;
    text-align: left;
    margin-bottom: 20px;
  }

  .CapacityStatementSearch {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    /*background-color: red;*/
  }

  .CapacityStatementSearch button{
    margin: 0 30px;
  }
  .CapacityStatementSearch_button{
    margin-top: 40px;
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-start;
  }
  .CapacityStatementSearch_button button{
    margin: 0 30px;
  }
  .CapacityStatementSearch_table{
    width: 100%;
    margin-top: 50px;
    min-height: 300px;
    background-color: red;
  }
</style>