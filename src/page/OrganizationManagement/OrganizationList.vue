<template>
  <div>
    <main-title :title="title" :title_f="title_f" t></main-title>
    <page-hr></page-hr>
    <div class="content_box" v-if="showSearch">
      <span class="content_title_1">快速搜索</span>
      <organization-list-search @changeNew="showNew"></organization-list-search>
    </div>
    <div v-if="!showSearch">
      <new-organization @changeList="showList"></new-organization>
    </div>
  </div>
</template>

<script>
    import MainTitle from "@/common/MainTitle";
    import PageHr from "@/common/PageHr";
    import OrganizationListSearch from "@/page/OrganizationManagement/component/OrganizationListSearch";
    import NewOrganization from "@/page/OrganizationManagement/page/NewOrganization";

    export default {
        name: "OrganizationList",
        methods: {
            showNew(){
                this.showSearch = false
            },
            showList(){
                this.showSearch = true
            }
        },
        data() {
            return {
                title: '机构管理',
                title_f: '欢迎您使用机构管理页面',
                showSearch: true,
            }
        },
        components: {NewOrganization, OrganizationListSearch, PageHr, MainTitle}
    }
</script>

<style scoped>
  .content_box{
    width: 100%;
    height: auto;
    padding-left: 16px;
    box-sizing: border-box;
  }
  .content_title_1{
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