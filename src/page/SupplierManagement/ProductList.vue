<template>
  <div class="productList">
    <page-hr></page-hr>
    <div class="content_box">
      <span class="content_title_1">快速搜索</span>
      <product-list-search></product-list-search>
    </div>
  </div>
</template>

<script>
    import PageHr from "@/common/PageHr";
    import ProductListSearch from "@/page/SupplierManagement/component/ProductListSearch";

    export default {
        name: "ProductList",
        data() {
            return {
                title: '产品列表',
                title_f: '这是产品列表页面'
            }
        },
        components: {ProductListSearch, PageHr}
    }
</script>

<style scoped>
  .productList {
    height: 100%;
    background-color: #fff;
  }
  .content_box {
    width: 100%;
    height: 100%;
    padding: 0 16px;
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
    padding: 0 8px;
    margin: 20px 0;
  }
</style>
