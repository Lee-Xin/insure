<template>
  <div>
    <main-title :title="title" :title_f="title_f" t></main-title>
    <page-hr></page-hr>
    <div class="content_box" v-if="searchORnewsupplier">
      <span class="content_title_1">快速搜索</span>
      <agent-fees-search @hideSearch="hideSearch"></agent-fees-search>
    </div>
    <agent-fees-add @returnPrev="returnPrev" v-if="!searchORnewsupplier"></agent-fees-add>
    <div v-if="searchORnewsupplier">
      <page-ination></page-ination>
    </div>
  </div>
</template>

<script>
    import MainTitle from "@/common/MainTitle";
    import PageHr from "@/common/PageHr";
    import PageInation from "../../common/PageInation";
    import AgentFeesSearch from "./component/AgentFeesSearch";
    import AgentFeesAdd from "./page/AgentFeesAdd";

    export default {
        name: "AgentFees",
        data() {
            return {
                title: '代理人费用',
                title_f: '这是代理人费用页面',
                searchORnewsupplier: true
            }
        },
        methods: {
            hideSearch() {
                this.searchORnewsupplier = false;
            },
            returnPrev() {
                this.searchORnewsupplier = true
            }
        },
        components: {AgentFeesAdd, AgentFeesSearch, PageInation, PageHr, MainTitle}
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