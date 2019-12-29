<template>
  <div>
    <main-title :title="title" :title_f="title_f" t></main-title>
    <page-hr></page-hr>
    <div class="content_box" v-if="searchORnewsupplier">
      <span class="content_title_1">快速搜索</span>
      <manpower-report-search></manpower-report-search>
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
    import ManpowerReportSearch from "./component/ManpowerReportSearch";
    export default {
        name: "ManpowerReport",
        components: {ManpowerReportSearch, PageInation, PageHr, MainTitle},
        data () {
            return {
                title: '人力报表',
                title_f: '这是人力报表页面',
                searchORnewsupplier: true
            }
        }
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