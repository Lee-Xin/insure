<template>
  <div style="height: 100%;">
    <page-hr></page-hr>
    <div class="content_box">
      <span class="content_title_1">快速搜索</span>
      <organization-list-search></organization-list-search>
    </div>
  </div>
</template>

<script>
    import PageHr from "@/common/PageHr";
    import OrganizationListSearch from "@/page/OrganizationManagement/component/OrganizationListSearch";
    import NewOrganization from "@/page/OrganizationManagement/page/NewOrganization";

    export default {
        name: "OrganizationList",
        data() {
            return {
                title: '机构管理',
                title_f: '欢迎您使用机构管理页面'
            }
        },
        components: {OrganizationListSearch, PageHr}
    }
</script>

<style scoped>
  .content_box{
    width: 100%;
    height: 100%;
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
    margin: 20px 0;
    padding: 0 8px;
  }
</style>
