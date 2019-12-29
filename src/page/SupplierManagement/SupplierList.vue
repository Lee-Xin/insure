<template>
  <div class="supplierList">
    <main-title :title="title" :title_f="title_f"></main-title>
    <page-hr></page-hr>
    <div class="content_box" v-if="searchORnewsupplier">
      <span class="content_title_1">快速搜索</span>
      <supplier-list-search @showNewSupplier="showNew" ></supplier-list-search>
    </div>
    <new-supplier :type_cooperation="type_cooperation"
                  :state_cooperation="state_cooperation"
                  :totablNum="totablNum"
                  @changePage="showSupplierList"
                  v-if="!searchORnewsupplier"
    ></new-supplier>
  </div>
</template>

<script>
    import MainTitle from '@/common/MainTitle'
    import PageHr from "@/common/PageHr";
    import SupplierListSearch from "@/page/SupplierManagement/component/SupplierListSearch";
    import NewSupplier from "@/page/SupplierManagement/page/NewSupplier";

    export default {
        name: "SupplierList",
        components: {NewSupplier, SupplierListSearch, PageHr, MainTitle},
        data () {
            return {
                title: '供应商一览表',
                title_f: 'Insurance Supplier List',
                searchORnewsupplier: true,
                type_cooperation: [],
                state_cooperation: [],
                totablNum: 0,
            }
        },
        methods: {
            showNew: function (state_cooperation, type_cooperation, totablNum) {
                this.totablNum = totablNum;
                this.state_cooperation = state_cooperation;
                this.type_cooperation = type_cooperation;
                this.searchORnewsupplier = false;
            },
            showSupplierList: function () {
                this.searchORnewsupplier = true;
            }
        }
    }
</script>

<style scoped>
.content_box{
  width: 100%;
  height: auto;
  padding-left: 16px;
  box-sizing: border-box;
  /*background-color: red;*/
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