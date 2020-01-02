<template>
    <div class="supplierList">
        <page-hr></page-hr>
        <div class="content_box">
            <span class="content_title_1">快速搜索</span>
            <supplier-list-search @showNewSupplier="showNew"></supplier-list-search>
        </div>
    </div>
</template>

<script>
    import PageHr from "@/common/PageHr";
    import SupplierListSearch from "@/page/SupplierManagement/component/SupplierListSearch";

    export default {
        name: "SupplierList",
        components: {SupplierListSearch, PageHr},
        data() {
            return {
                title: '供应商一览表',
                title_f: 'Insurance Supplier List',
            }
        },
        methods: {
            showNew: function () {
                this.$router.push({
                    name: 'new_supplier'
                })
            }
        }
    }
</script>

<style scoped>
    .supplierList {
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
        margin-bottom: 20px;
    }
</style>
