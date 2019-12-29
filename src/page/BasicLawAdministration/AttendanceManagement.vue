<template>
  <div>
    <main-title :title_f="title_f" :title="title"></main-title>
    <page-hr></page-hr>
    <div class="content_box" v-if="searchORnewsupplier">
      <span class="content_title_1">快速搜索</span>
      <attendance-management-search></attendance-management-search>
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
    import AttendanceManagementSearch from "./component/AttendanceManagementSearch";
    export default {
        name: "AttendanceManagement",
        data () {
            return {
                title: '考勤管理',
                title_f: '这是考勤管理页面',
                searchORnewsupplier: true
            }
        },
        components: {AttendanceManagementSearch, PageInation, PageHr, MainTitle}
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
</style>