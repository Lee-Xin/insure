<template>
  <div>
    <main-title :title="title" :title_f="title_f"></main-title>
    <page-hr></page-hr>
    <div class="content_box" v-if="searchORnewsupplier">
      <span class="content_title_1">快速搜索</span>
      <desk-list-search @hideSearch="hideSearch"></desk-list-search>
    </div>
    <desk-list-add @dasds="oks" v-if="!searchORnewsupplier"></desk-list-add>

  </div>
</template>

<script>
    import MainTitle from '@/common/MainTitle'
    import PageHr from "@/common/PageHr";

    import DeskListSearch from "./component/DeskListSearch";
    import DeskListAdd from "./page/DeskListAdd";



    export default {
        name: "DeskList",
        data() {
            return {
                title: '员工列表',
                title_f: '这里是员工列表',
                searchORnewsupplier: true
            }
        },
        methods: {
            oks(){
              this.searchORnewsupplier = true
            },
            hideSearch() {
                this.searchORnewsupplier = false
            }
        },
        components: {DeskListAdd, DeskListSearch, PageHr, MainTitle}
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
