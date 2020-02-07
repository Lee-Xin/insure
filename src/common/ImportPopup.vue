<template>
    <div>
        <div class="import_popup">
            <div class="form_box">
                <div class="form_box_title">
                    产品列表
                    <el-icon @click.native="cancel_popup" class="el-icon-close" style="float: right; cursor: pointer;"></el-icon>
                </div>
                <el-row style="padding: 20px 20px 0 20px;">
                    <el-col :span="20">
                        <form-item
                            type="input"
                            label="险种简称"
                            v-model="coverage_referred"
                        >
                        </form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" icon="el-icon-search">搜索</el-button>
                    </el-col>
                </el-row>
                <div class="import_table">
                    <el-table height="100%" :data="tableData">
                        <el-table-column prop="id" label="序号" width="70" align="center"></el-table-column>
                        <el-table-column prop="productName" label="产品名称" align="center"></el-table-column>
                        <el-table-column label="操作" width="70" align="center">
                            <template slot-scope="scope">
                                <el-button style="padding: 5px; line-height: initial; height: initial;" size="mini" type="primary" v-if="scope.row.operation" @click="confirmAdd(scope.row)">导入</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <el-pagination
                    style="text-align: right; padding-top: 10px;"
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                    :page-size="pageSize"
                    :total="totalNum">
                </el-pagination>
                <el-button @click="cancel_popup" type="primary" class="form_cancel">关闭</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {apiUpstreamFoldingProductList} from "../request/api";
    import FormItem from '@/common/FormItem';

    export default {
        name: "ImportPopup",
        data() {
            return {
                coverage_referred: '',
                currentPage: 1,
                pageSize: 10,
                tableData: [],
                totalNum: 0
            }
        },
        components: {FormItem},
        mounted() {
            this.getData();
        },
        methods: {
            handleSizeChange(val) {
                window.console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            getData() {
                apiUpstreamFoldingProductList({
                    SkipCount: this.currentPage,
                    MaxResultCount: this.currentPage * this.pageSize - 1
                }).then(res => {
                    this.tableData = res.result.items;
                });
            },
            cancel_popup() {
                this.$emit('cancel_popup');
            },
            confirmAdd(row) {
                this.$emit('importData', row);
                this.cancel_popup();
            }
        }
    }
</script>

<style scoped>
    .import_popup {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        /*display: none;*/
        background-color: rgba(0, 0, 0, .5);
    }

    .form_box {
        width: 600px;
        height: 698px;
        position: absolute;
        top: 50%;
        margin-top: -349px;
        left: 50%;
        margin-left: -300px;
        background-color: #fff;
    }

    .form_box_title {
        width: 100%;
        padding: 15px 20px;
        line-height: 1;
        font-size: 14px;
        color: #ffffff;
        box-sizing: border-box;
        text-align: left;
        background-color: #4074e1;
    }

    .form_box_search {
        width: 100%;
        height: 60px;
        display: flex;
        padding-top: 10px;
        box-sizing: border-box;
        align-items: flex-start;
        /*background-color: red;*/
        justify-content: space-around;
    }

    .form_box_search >>> .el-form-item {
        display: flex;
    }

    .import_table {
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
        height: calc(100% - 280px);
        overflow: hidden;
    }

    .form_cancel {
        width: 60px;
        height: 36px;
        color: #fff;
        background-color: #2d8cf0;
        display: flex;
        align-items: center;
        justify-content: center;
        float: right;
        margin-top: 60px;
        margin-right: 40px;
    }
</style>
