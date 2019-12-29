<template>
  <div>
    <main-title :title="title" :title_f="title_f"></main-title>
    <page-hr></page-hr>
    <div class="content_box" v-if="showSearch">
      <span class="content_title_1">快速搜索</span>
      <organzation-list-table @changeNewOrganzation="showNew"></organzation-list-table>
    </div>
    <el-button v-if="!showSearch" type="text" @click="open">点击打开 Message Box</el-button>
  </div>
</template>

<script>
    import MainTitle from "@/common/MainTitle";
    import PageHr from "@/common/PageHr";
    import OrganzationListTable from "@/page/OrganizationManagement/component/OrganzationListTable";

    export default {
        name: "OrganizationClassif",
        data() {
            return {
                title_f: '欢迎您使用机构分类页面',
                title: '机构管理',
                showSearch: true
            }
        },
        methods: {
            changeNewOrganzation: function () {
                this.showSearch = true
            },
            showNew: function () {
                this.showSearch = false;
            }
        },
        components: {OrganzationListTable, PageHr, MainTitle}
    }
</script>

<style scoped>
  .content_box {
    width: 100%;
    height: auto;
    padding-left: 16px;
    box-sizing: border-box;
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
