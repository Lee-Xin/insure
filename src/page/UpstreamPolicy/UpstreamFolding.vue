<template>
    <div style="height: 100%; background-color: #fff;">
        <page-hr></page-hr>
        <div class="content_box" v-if="searchORnewsupplier">
            <span class="content_title_1">快速搜索</span>
            <upstream-folding-serach @showAddUpstream="showAddUpstreamFolding"></upstream-folding-serach>
        </div>
        <upstream-folding-add @showSearch="showSearch" v-if="!searchORnewsupplier"></upstream-folding-add>
    </div>
</template>

<script>
    import PageHr from "@/common/PageHr";
    import UpstreamFoldingSerach from "./component/UpstreamFoldingSerach";

    import UpstreamFoldingAdd from "./page/UpstreamFoldingAdd";

    export default {
        name: "UpstreamFolding",
        data() {
            return {
                title: '上游折标',
                title_f: '这是上游折标页面',
                searchORnewsupplier: true,
                tableData: []
            }
        },
        methods: {
            showAddUpstreamFolding() {
                // window.console.log('asf')
                this.searchORnewsupplier = false;
            },
            showSearch() {
                this.searchORnewsupplier = true;
            }
        },
        components: {UpstreamFoldingAdd, UpstreamFoldingSerach, PageHr}
    }
</script>

<style scoped>
    .upstreamFolding_table {
        width: 100%;
        height: 500px;
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
