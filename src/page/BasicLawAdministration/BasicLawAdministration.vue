<template>
  <div>
    <main-title :title="title" :title_f="title_f"></main-title>
    <page-hr></page-hr>
    <div class="BasicLawAdministration">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="BasicName" label="基本法名称"></el-table-column>
        <el-table-column prop="applicable_agencies" label="适用机构"></el-table-column>
        <el-table-column prop="startTime" label="起止时间"></el-table-column>
        <el-table-column prop="endTime" label="操作"></el-table-column>
      </el-table>
    </div>
    <div class="delete">
      <el-button>删除</el-button>
    </div>
  </div>
</template>

<script>
    import MainTitle from "@/common/MainTitle";
    import PageHr from "@/common/PageHr";
    import {apiBasicLawAdministration} from "../../request/api";

    export default {
        name: "BasicLawAdministration",
        data () {
            return {
                title: '基本法设置',
                title_f: '这是基本法设置页面',
                tableData: []
            }
        },
        created() {
            apiBasicLawAdministration().then(res => {
               this.tableData = res.Data;
            });
        },
        components: {PageHr, MainTitle}
    }
</script>

<style scoped>
.delete{
  position: fixed;
  left: 50%;
  bottom: 50px;
}
.delete button{
  background-color: #2c8cf0;
  color: #fff;
}
</style>