<template>
  <div>
    <main-title :title="title" :title_f="title_f"></main-title>
    <page-hr></page-hr>
    <div class="content_box">
      <span class="content_title_1">快速搜索</span>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="序号" width="180"></el-table-column>
        <el-table-column prop="name_rank" label="职级名称" width="180"></el-table-column>
        <el-table-column prop="rank_nickname" label="职级别称"></el-table-column>
        <el-table-column prop="is_leadership" label="是否是领导"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
    import MainTitle from "@/common/MainTitle";
    import PageHr from "@/common/PageHr";
    import {apiMarketingStaffRank} from "../../request/api";

    export default {
        name: "MarketingStaffRank",
        data () {
            return {
                title: '职级管理',
                title_f: '这是职级管理页面',
                tableData: []
            }
        },
        created(){
            apiMarketingStaffRank().then(res => {
               this.tableData = res.Data;
            });
        },
        components: {PageHr, MainTitle}
    }
</script>

<style scoped>

</style>