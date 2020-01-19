<template>
    <div class="centent">
        <el-row :gutter="20">
            <el-col v-for="(item, index) in forms" :key="index" :span="6">
                <form-item
                    :type="item.type"
                    :label="item.label"
                    :options="item.options"
                    v-model="item.value"
                    :required="item.required"
                    :placeholder="item.placeholder"
                    :errorText="item.errorText || ''"
                    :definedSlot="item.definedSlot"
                >
                </form-item>
            </el-col>
        </el-row>
        <div style="text-align: right;">
            <el-button icon="el-icon-search" type="primary" @click="upstreamFoldingSearch">搜索</el-button>
        </div>
        <div class="upstreamFolding_table">
            <div class="table_button">
                <el-button type="primary">复制</el-button>
                <el-button type="primary">同步到下游</el-button>
                <el-button type="primary" style="float: right;" @click="addUpstreamFolding">添加</el-button>
            </div>
        </div>
        <el-table @row-click="openDetails" height="100%" :data="tableData" style="width: 100%;">
            <el-table-column prop="supplierName" label="供应商简称"></el-table-column>
            <el-table-column prop="productName" label="产品名称"></el-table-column>
            <el-table-column prop="productID" label="产品代码"></el-table-column>
            <el-table-column id="tableData_font" prop="查看详情" label="折标系数">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="handleCard(scope.row)">查看详情</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="startTime" label="开始时间"></el-table-column>
            <el-table-column prop="endTime" label="结束时间"></el-table-column>
        </el-table>

        <div class="popup_window" v-if="showPopup">
            <div class="popup_div">
                <div class="popup_div_title">折标系数详情</div>
                <div class="popup_div_table">
                    <el-table :data="tableDataDetails" style="width: 100%; padding: 0 30px;">
                        <el-table-column prop="id" label="序号"></el-table-column>
                        <el-table-column prop="payment_time" label="交费期间"></el-table-column>
                        <el-table-column prop="fold_coefficient" label="折标系数"></el-table-column>
                    </el-table>
                </div>
                <div class="popup_button">
                    <el-button @click="cancelPopup">取消</el-button>
                    <el-button @click="cancelPopup">确认</el-button>
                </div>
            </div>
        </div>
        <div class="upstreamFolding_PageInation">
            <page-ination @changeSize="changeSize" @changeCurrentPage="changeCurrentPage"
                          :total="totalNum"></page-ination>
        </div>
        <import-popup v-if="isShowImportPopup" @importData="importData" @cancel_popup="hideImportPopup"></import-popup>
    </div>
</template>

<script>
    import PageInation from "../../../common/PageInation";
    import {apiUpstreamFoldingSearch, apiUpstreamFoldingPageInation, apiUpstreamFolding} from "../../../request/api";
    import ImportPopup from "../../../common/ImportPopup";
    import FormItem from '@/common/FormItem';
    let that = null;
    const productName = {
        name: 'productName',
        render(h) {
            return h('el-button', {
                style: {
                    backgroundColor: '#2e7ee1',
                    color: '#fff',
                    borderColor: '#2e7ee1',
                    marginTop: '-12px'
                },
                on: {
                    click: () => {
                        that.showImportPopup();
                    }
                }
            }, '导入')
        }
    };

    export default {
        name: "UpstreamFoldingSerach",
        components: {ImportPopup, PageInation, FormItem},
        data() {
            return {
                forms: {
                    supplier_niceName: {
                        label: '供应商',
                        type: 'select',
                        value: '',
                        options: [],
                        placeholder: '供应商简称'
                    },
                    product_name: {
                        label: '产品名称',
                        type: 'input',
                        value: '',
                        placeholder: '请选择产品名称',
                        definedSlot: {
                            name: 'append',
                            component: productName
                        }
                    },
                    product_id: {
                        label: '产品代码',
                        type: 'input',
                        value: '',
                        placeholder: '请输入产品代码'
                    },
                    aboutAge: {
                        label: '与年龄是否相关',
                        type: 'select',
                        value: 0,
                        options: [
                            {
                                label: '全部',
                                value: 0
                            },
                            {
                                label: '是',
                                value: 1
                            },
                            {
                                label: '否',
                                value: 2
                            }
                        ]
                    }
                },
                showPopup: false,
                tableDataDetails: [],
                aboutAge: [],
                supplier_niceName: [],
                isShowImportPopup: false,
                tableData: [],
                pageIndex: 1,
                pageSize: 50,
                totalNum: 0
            }
        },
        computed: {
            formData() {
                let data = {};
                Object.keys(this.forms).forEach(t => {
                    data[t] = this.forms[t].value;
                });
                return data;
            }
        },
        created() {
            that = this;
            apiUpstreamFoldingPageInation({
                SkipCount: this.pageIndex,
                MaxResultCount: this.pageSize
            }).then(res => {
                this.totalNum = res.result.totalCount;
                this.tableData = res.result.items;
            })
        },
        methods: {
            changeSize(val) {
                this.pageSize = val;
            },
            changeCurrentPage(val) {
                this.pageIndex = val;
                apiUpstreamFoldingPageInation({
                    SkipCount: this.pageIndex,
                    MaxResultCount: this.pageSize
                }).then(res => {
                    this.totalNum = res.result.totalCount;
                    this.tableData = res.result.items;
                })
            },
            upstreamFoldingSearch() {
                apiUpstreamFoldingSearch({
                    ...this.formData,
                    SkipCount: this.pageIndex,
                    MaxResultCount: this.pageSize
                }).then(res => {
                    this.totalNum = res.result.totalCount;
                    this.tableData = res.result.items;
                });
            },
            importData(row) {
                this.isShowImportPopup = false;
                this.forms.product_name.value = row.productName;
            },
            hideImportPopup() {
                this.isShowImportPopup = false;
            },
            addUpstreamFolding() {
                // this.showAddUpstreamFolding = true;
                this.$emit('showAddUpstream');
            },
            cancelPopup() {
                this.tableDataDetails = [];
                this.showPopup = false;
            },
            openDetails(row) {
                window.console.log('hang' + row);
            },
            handleCard(row) {
                this.tableDataDetails = row.foldCoefficient;
                this.showPopup = true;
            },
            showImportPopup() {
                this.isShowImportPopup = true;
            }
        }
    }
</script>

<style scoped>
    .popup_button button {
        margin-right: 30px;
    }

    .popup_button {
        width: 100%;
        height: 40px;
        position: absolute;
        bottom: 0;
        right: 0;
        display: flex;
        justify-content: flex-end;
    }

    .popup_div_title {
        width: 100%;
        height: 50px;
        line-height: 50px;
        color: #fff;
        text-align: center;
        font-size: 16px;
        background-color: #4074e1;
    }

    .popup_window {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 500;
        /*display: none;*/
        background-color: rgba(0, 0, 0, .5);
    }

    .popup_div {
        width: 600px;
        height: 300px;
        border-radius: 0 0 10px 10px;
        position: absolute;
        top: 50%;
        margin-top: -150px;
        left: 50%;
        margin-left: -300px;
        background-color: #fff;
    }

    .popup_div_table {
        width: 100%;
        height: 200px;
        overflow-y: scroll;
    }

    .centent {
        width: 100%;
        height: calc(100% - 270px);
    }

    #form_item_name >>> .el-form-item__content .el-input,
    #form_item_name >>> .el-form-item__content .el-button {
        width: 50%;
    }

    .table_button {
        width: 100%;
        height: 40px;
        padding-top: 20px;
        padding-bottom: 10px;
        margin-top: 20px;
        border-top: 1px solid #d9d9d9;
        text-align: left;
    }
</style>
