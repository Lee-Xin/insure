<template>
    <div>
        <div class="block">
            <span class="demonstration">完整功能</span>
            <el-pagination
                class="page-bar"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[50, 100, 150, 200]"
                :page-size="50"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            handleSizeChange(val) {
                this.currentPage = val;
                // window.console.log(`每页 ${val} 条`);
                this.$emit('changeSize', val);
            },
            handleCurrentChange(val) {
                // currentPage
                //   window.console.log(`当前页: ${val}`);
                this.$emit('changeCurrentPage', val);
            },
        },
        props: {
            total: Number
        },
        data() {
            return {
                currentPage: 1,
            };
        }
    }
</script>

<style scoped lang="scss">
    .block {
        width: calc(100% - 30px);
        margin-right: 15px;
        margin-left: 15px;
        padding: 0 20px;
        box-sizing: border-box;
        height: 80px;
        text-align: right;
        position: absolute;
        z-index: 2;
        right: 0;
        bottom: 0;
        background-color: #fff;
        box-shadow: 0 0 9px 0 rgba(0,0,0,.28);
        .page-bar{
            margin: 25px 0 10px;
        }
    }
</style>
