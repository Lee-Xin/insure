<template>
  <div>
    <main-title :title="title" :title_f="title_f" t></main-title>
    <page-hr></page-hr>
    <div class="content_box" v-if="searchORnewsupplier">
      <span class="content_title_1">快速搜索</span>
      <downstream-folding-search @showAdd="showAdd"></downstream-folding-search>
    </div>
    <downstream-folding-add @returnPrev="downstreamFoldingAdd" v-if="!searchORnewsupplier"></downstream-folding-add>
  </div>
</template>

<script>
    import MainTitle from "@/common/MainTitle";
    import PageHr from "@/common/PageHr";
    import DownstreamFoldingSearch from "./component/DownstreamFoldingSearch";
    import DownstreamFoldingAdd from "./page/DownstreamFoldingAdd";

    export default {
        name: "DownstreamFolding",
        data() {
            return {
                title: '下游折标',
                title_f: '这是下游折标页面',
                searchORnewsupplier: true
            }
        },
        methods: {
            showAdd() {
                // window.console.log('asafdasf')
                this.searchORnewsupplier = false
            },
            downstreamFoldingAdd() {
                this.searchORnewsupplier = true;
            }
        },
        components: {DownstreamFoldingAdd, DownstreamFoldingSearch, PageHr, MainTitle},
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