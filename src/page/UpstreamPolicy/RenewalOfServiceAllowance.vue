<template>
  <div>
    <main-title :title="title" :title_f="title_f" t></main-title>
    <page-hr></page-hr>
    <div class="content_box" v-if="searchORnewsupplier">
      <span class="content_title_1">快速搜索</span>
      <renewal-of-service-search @showAdd="showAdd"></renewal-of-service-search>
    </div>
    <renewal-of-service-add v-if="!searchORnewsupplier"></renewal-of-service-add>
  </div>
</template>

<script>
    import MainTitle from "@/common/MainTitle";
    import PageHr from "@/common/PageHr";
    import RenewalOfServiceSearch from "./component/RenewalOfServiceSearch";
    import RenewalOfServiceAdd from "./page/RenewalOfServiceAdd";
    export default {
        name: "RenewalOfServiceAllowance",
        data () {
            return {
                title: '继续服务津贴',
                title_f: '这是继续服务津贴页面',
                searchORnewsupplier: true
            }
        },
        methods: {
            showAdd() {
                this.searchORnewsupplier = false;
            }
        },
        components: {RenewalOfServiceAdd, RenewalOfServiceSearch, PageHr, MainTitle}
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