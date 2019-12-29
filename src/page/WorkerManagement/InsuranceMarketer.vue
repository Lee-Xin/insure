<template>
  <div>
    <main-title :title="title" :title_f="title_f" t></main-title>
    <page-hr></page-hr>
    <div class="content_box">
      <span class="content_title_1">快速搜索</span>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="workID" label="工号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="document_type" label="证件类型"></el-table-column>
        <el-table-column prop="document_id" label="证件号码"></el-table-column>
        <el-table-column prop="in_time" label="入司时间"></el-table-column>
        <el-table-column prop="value_premium" label="价值保费（元）"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
    import MainTitle from "@/common/MainTitle";
    import PageHr from "@/common/PageHr";
    import {apiInsuranceMarketer} from "../../request/api";

    export default {
        name: "InsuranceMarketer",
        data () {
            return {
                title: '应参保营销员',
                title_f: '应参保营销员页面',
                form: {
                    name: ''
                },
                tableData: []
            }
        },
        created() {
            apiInsuranceMarketer().then(res => {
                // window.console.log()
                this.tableData = res.Data;
            })
        },
        components: {PageHr, MainTitle}
    }
</script>

<style scoped>
.content_box .el-form{
  width: 100%;
  height: 40px;
  /*background-color: red;*/
  display: flex;
  justify-content: flex-start;
}
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
</style>