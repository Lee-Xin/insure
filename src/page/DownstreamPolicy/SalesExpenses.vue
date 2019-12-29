<template>
  <div>
    <main-title :title="title" :title_f="title_f"></main-title>
    <page-hr></page-hr>
    <div class="content_box" v-if="searchORnewsupplier">
      <span class="content_title_1">快速搜索</span>
      <sales-expenses-search @hideSearch="hideSearch"></sales-expenses-search>
    </div>
    <sales-expenses-add v-if="!searchORnewsupplier"></sales-expenses-add>
    <div v-if="searchORnewsupplier">
      <page-ination></page-ination>
    </div>
  </div>
</template>

<script>
    import MainTitle from "@/common/MainTitle";
    import PageHr from "@/common/PageHr";
    import PageInation from "../../common/PageInation";
    import SalesExpensesSearch from "./component/SalesExpensesSearch";
    import SalesExpensesAdd from "./page/SalesExpensesAdd";

    export default {
        name: "SalesExpenses",
        components: {SalesExpensesAdd, SalesExpensesSearch, PageInation, PageHr, MainTitle},
        data() {
            return {
                title: '销售费用',
                title_f: '这是销售费用页面',
                searchORnewsupplier: true
            }
        },
        methods: {
            hideSearch(){
                this.searchORnewsupplier = false;
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