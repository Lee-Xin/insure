<template>
  <div>
    <page-hr></page-hr>
    <div>
      <product-list-search @showAddProduct="isAddProduct" v-if="showSearch"></product-list-search>
      <new-product @changeSearch="showSearchBox" v-if="!showSearch"></new-product>
    </div>
  </div>
</template>

<script>
    import PageHr from "@/common/PageHr";
    import ProductListSearch from "@/page/SupplierManagement/component/ProductListSearch";
    import NewProduct from "@/page/SupplierManagement/page/NewProduct";

    export default {
        name: "ProductList",
        data() {
            return {
                title: '产品列表',
                title_f: '这是产品列表页面',
                showSearch: true
            }
        },
        components: {NewProduct, ProductListSearch, PageHr},
        methods: {
            isAddProduct () {
                this.showSearch = false
            },
            showSearchBox(){
                // window.console.log('afaesgf')
                this.showSearch = true
            }
        }
    }
</script>

<style scoped>

</style>