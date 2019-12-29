<template>
  <div>
    <main-title :title="title" :title_f="title_f" t></main-title>
    <page-hr></page-hr>
    <div class="content_box" v-if="searchORnewsupplier">
      <span class="content_title_1">快速搜索</span>
      <institutional-expenses-search @hideSearch="hideSearch"></institutional-expenses-search>
    </div>
    <institutional-expenses-add v-if="!searchORnewsupplier"></institutional-expenses-add>
  </div>
</template>

<script>
    import MainTitle from "@/common/MainTitle";
    import PageHr from "@/common/PageHr";
    import InstitutionalExpensesSearch from "./component/InstitutionalExpensesSearch";
    import InstitutionalExpensesAdd from "./page/InstitutionalExpensesAdd";

    export default {
        name: "InstitutionalExpenses",
        data() {
            return {
                title: '机构费用',
                title_f: '这是机构费用页面',
                searchORnewsupplier: true
            }
        },
        methods: {
            hideSearch() {
                this.searchORnewsupplier = false;
            }
        },
        components: {InstitutionalExpensesAdd, InstitutionalExpensesSearch, PageHr, MainTitle},
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