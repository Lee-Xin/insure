<template>
  <div>
    <main-title :title="title" :title_f="title_f" t></main-title>
    <page-hr></page-hr>
    <div class="content_box" v-if="searchORnewsupplier">
      <span class="content_title_1">快速搜索</span>
      <marketer-list-search @hideSearch="hideSearch"></marketer-list-search>
    </div>
    <marketer-list-add v-if="!searchORnewsupplier"></marketer-list-add>
    <div v-if="searchORnewsupplier">
      <page-ination></page-ination>
    </div>
  </div>
</template>

<script>
    import MainTitle from "@/common/MainTitle";
    import PageHr from "@/common/PageHr";
    import PageInation from "../../common/PageInation";
    import MarketerListSearch from "./component/MarketerListSearch";
    import MarketerListAdd from "./page/MarketerListAdd";

    export default {
        name: "MarketerList",
        data() {
            return {
                title: '营销员列表',
                title_f: '这是营销员列表',
                searchORnewsupplier: true
            }
        },
        methods:{
            hideSearch(){
                this.searchORnewsupplier = false;
            }
        },
        components: {MarketerListAdd, MarketerListSearch, PageInation, PageHr, MainTitle}
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