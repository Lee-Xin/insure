<template>
    <div class="import_popup">
        <div class="form_box">
            <div class="form_body">
                <div class="form_box_title">
                    {{title}}
                    <el-icon @click.native="cancel_popup" class="el-icon-close"
                             style="float: right; cursor: pointer;"></el-icon>
                </div>
                <div style="padding: 20px 15px; height: calc(100% - 120px);">
                    <el-row :gutter="20">
                        <el-col :span="10">
                            <form-item
                                type="input"
                                label="险种简称"
                                v-model="insureShortName"
                            >
                            </form-item>
                        </el-col>
                        <el-col :span="10">
                            <form-item
                                type="select"
                                label="主附险类型"
                                v-model="insureType"
                                :options="[{
                                    label: '主险',
                                    value: 0
                                }, {
                                    label: '附加险',
                                    value: 1
                                }]"
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
                        :page-size="10"
                        :total="totalNum">
                    </el-pagination>
                </div>
                <div class="btn">
                    <el-button @click="cancel_popup" type="primary">关闭</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import FormItem from '@/common/FormItem';
    export default {
        name: "multiCheck",
        components: {FormItem},
        props: {
            data: {
                type: Array
            },
            title: String
        },
        data() {
            return {
                insureShortName: '',
                insureType: 1,
                tableData: [],
                totalNum: 0
            }
        },
        methods: {
            cancel_popup() {
                this.$emit('cancel_popup');
            }
        }
    }
</script>

<style scoped lang="less">
    .import_popup {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .5);
    }

    .form_box {
        width: 600px;
        height: 500px;
        position: absolute;
        top: 50%;
        margin-top: -300px;
        left: 50%;
        margin-left: -250px;
        background-color: #fff;
        .form_body{
            position: relative;
            height: 100%;
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
            .btn{
                position: absolute;
                bottom: 10px;
                right: 10px;
            }
        }
    }
    .import_table{
        height: calc(100% - 100px);
    }
</style>
