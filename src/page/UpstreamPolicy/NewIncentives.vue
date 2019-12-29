<template>
  <div>
    <main-title :title="title" :title_f="title_f" t></main-title>
    <page-hr></page-hr>
    <div class="content_box" v-if="searchORnewsupplier">
      <span class="content_title_1">快速搜索</span>
      <new-incentives-search @showSearch="showSearch"></new-incentives-search>
    </div>
    <new-incentives-add @showSearch="showSearchPage" v-if="!searchORnewsupplier"></new-incentives-add>
  </div>
</template>

<script>
    import MainTitle from "@/common/MainTitle";
    import PageHr from "@/common/PageHr";
    import NewIncentivesSearch from "./component/NewIncentivesSearch";
    import NewIncentivesAdd from "./page/NewIncentivesAdd";
    export default {
        name: "NewIncentives",
        components: {NewIncentivesAdd, NewIncentivesSearch, PageHr, MainTitle},
        data () {
            return {
                title: '新增奖励',
                title_f: '这是新增奖励页面',
                searchORnewsupplier: true
            }
        },
        methods: {
            showSearch () {
                this.searchORnewsupplier = false;
            },
            showSearchPage() {
                this.searchORnewsupplier = true;
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