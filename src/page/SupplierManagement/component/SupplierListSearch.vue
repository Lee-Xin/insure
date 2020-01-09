<template>
    <div style="height: calc(100% - 100px);">
        <el-form :inline="true" :model="formInline" class="demo-form-inline supplierListSearchForm">
            <el-row :gutter="15" style="width: 100%;">
                <el-col :span="7">
                    <el-form-item class="supplierListSearch_label">
                        <el-input v-model="formInline.shortName" placeholder="请输入供应商简称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item>
                        <el-select v-model="formInline.cooperationType" placeholder="请选择合作类型">
                            <el-option
                                    v-for="(item, index) in type_cooperation"
                                    :label="item.name"
                                    :value="item.name"
                                    :key="index"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item>
                        <el-select v-model="formInline.cooperationStatus">
                            <el-option
                                    v-for="(item, index) in state_cooperation"
                                    :label="item.name"
                                    :value="item.name"
                                    :key="index"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="searchData">搜索</el-button>
                        <i style="margin: 0 20px; height: 36px;" class="v-line"></i>
                        <el-button type="warning" icon="el-icon-plus" @click="showNewSupplier">新增供应商</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <div class="table_box">
            <el-table :data="tableData" height="100%">
                <el-table-column label="序号" width="180" type="index" header-align="center"
                                 align="center"></el-table-column>
                <el-table-column prop="code" label="供应商代码" width="180"></el-table-column>
                <el-table-column prop="shortName" label="供应商简称" width="180">
                    <template slot-scope="scope">
                        <a style="text-decoration: underline; color: #2D8cF0;" href="javascript: void(0);"
                           @click="clickShortName(scope.row)" type="primary">{{scope.row.shortName}}</a>
                    </template>
                </el-table-column>
                <el-table-column label="合约起止时间" width="180">
                    <template slot-scope="scope">
                        {{scope.row.startDate}}-{{scope.row.endDate}}
                    </template>
                </el-table-column>
                <el-table-column prop="cooperationType" label="合作类型" width="180"></el-table-column>
                <el-table-column prop="cooperationStatus" label="合作状态" width="180"></el-table-column>
                <el-table-column prop="serviceHotline" label="渠道经理服务电话" width="180"></el-table-column>
                <el-table-column prop="serviceTelephone" label="电话" width="180"></el-table-column>
                <el-table-column prop="website" label="供应商网址"></el-table-column>
            </el-table>
        </div>
        <div class="supplierListPage">
            <page-ination
                    @changeSize="changeSize"
                    @changeCurrentPage="changeCurrentPage"
                    :total="totablNum"
            ></page-ination>
        </div>
        <!--    显示供应商详细数据的弹窗-->
        <div v-if="showDetailPopup" class="showDetail_popup">
            <div class="showD_popup_content">
                <div class="showD_popup_content_top">
                    <span>查询详情</span>
                    <i @click="hideDetailPopup()" class="el-icon-close"></i>
                </div>
                <div class="body">
                    <div class="each" v-for="(item, index) in formEnum" :class="`width-${item.span || 12}`" :key="index">
                        <span class="label">{{item.label}}</span>
                        <span class="value">{{formDetail[item.key]}}</span>
                    </div>
                </div>
                <div class="showD_popup_content_bottom">
                    <el-button @click="hideDetailPopup()" type="primary">关闭</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        supplierGetAll,
        supplierGetById,
        supplierGetCooperationStatus,
        supplierGetCooperationType
    } from "@/mock/api";

    import PageInation from "../../../common/PageInation";

    export default {
        name: "SupplierListSearch",
        components: {PageInation},
        data() {
            return {
                url: "/supplier_list/new_supplier",
                formInline: {
                    shortName: "",
                    cooperationType: "",
                    cooperationStatus: "",
                    MaxResultCount: 50,
                    Sorting: 1,
                    SkipCount: 0,
                },
                tableData: [],
                type_cooperation: [],
                state_cooperation: [],
                fullName: [],
                // MaxResultCount: 50,
                // SkipCount: 0,
                // Sorting: 1,
                startEndTime: "",
                totablNum: 0,
                showDetailPopup: false,
                formEnum: [
                    {key: 'fullName', label:'供应商全称', span: 24},
                    {key: 'shortName', label:'供应商简称'},
                    {key: 'code', label:'供应商代码'},
                    {key: 'startDate', label:'合约开始时间'},
                    {key: 'endDate', label:'合约结束时间'},
                    {key: 'cooperationType', label:'合作类型'},
                    {key: 'cooperationStatus', label:'合作状态'},
                    {key: 'website', label:'官方网址'},
                    {key: 'serviceHotline', label:'服务热线'},
                    {key: 'registerCapital', label:'注册资本'},
                    {key: 'createDate', label:'设立时间'},
                    {key: 'headAddress', label:'总部地址'},
                    {key: 'serviceTelephone', label:'渠道经理服务电话'},
                    {key: 'companyShortName', label:'公司简称', span: 8},
                    {key: 'appName', label:'APP名称', span: 8},
                    {key: 'weChatAccount', label:'微信公众号', span: 8},
                    {key: 'logo', label:'公司logo', span: 8},
                    {key: 'appQrCode', label:'APP二维码', span: 8},
                    {key: 'qrCode', label:'公众号二维码', span: 8},
                    {key: 'companyDescription', label:'公司简介', span: 24},
                    {key: 'companyGlories', label:'公司荣誉', span: 24},
                    {key: 'companyGlories', label:'公司荣誉', span: 24},
                    {key: 'developmentHistory', label:'发展历程', span: 24}
                ],
                formDetail: {}
            };
        },
        created() {
            //  初始化时的分页
            supplierGetAll(this.formInline).then(res => {
                if (res.success) {
                    this.totablNum = res.result["totalCount"];
                    this.tableData = res.result["items"];
                }
            });
            //  获取合作状态
            supplierGetCooperationStatus().then(res => {
                if (res.success) {
                    let result = res.result;
                    for (let i = 0; i < result.length; i++) {
                        this.state_cooperation.push(result[i]);
                    }
                }
            });
            //  获取合作类型
            supplierGetCooperationType().then(res => {
                if (res.success) {
                    let result = res.result;
                    for (let i = 0; i < result.length; i++) {
                        this.type_cooperation.push(result[i]);
                    }
                }
            })
        },
        methods: {
            clickShortName(row) {
                supplierGetById({
                    id: row.id
                }).then(res => {
                    if (res.success) {
                        this.formDetail = res.result;
                    }
                })
                this.showDetailPopup = true;
            },
            hideDetailPopup() {
                this.showDetailPopup = false;
            },
            //  当页每页显示的条数发生改变
            changeSize(val) {
                this.formInline.SkipCount = 0;
                this.formInline.MaxResultCount = val;
                supplierGetAll(this.formInline).then(res => {
                    if (res.success) {
                        this.totablNum = res.result.totalCount;
                        this.tableData = res.result.items;
                    }
                });
            },
            //  当前页发生改变时
            changeCurrentPage(val) {
                this.formInline.SkipCount = (val - 1) * 50;
                supplierGetAll(this.formInline).then(res => {
                    if (res.success) {
                        this.totablNum = res.result.totalCount;
                        this.tableData = res.result.items;
                    }
                });
            },
            //  搜索数据
            searchData() {
                supplierGetAll(this.formInline).then(res => {
                    if (res.success) {
                        this.tableData = res.result.items;
                        this.totablNum = res.result.totalCount;
                    }
                });
            },
            showNewSupplier() {
                this.$emit(
                    "showNewSupplier",
                    this.state_cooperation,
                    this.type_cooperation,
                    this.totablNum
                );
            }
        }
    };
</script>
<style scoped lang="scss">
    .showD_popup_content {
        width: 1000px;
        height: 686px;
        background-color: #fff;
        .body{
            padding: 15px;
            height: calc(100% - 103px);
            overflow-y: auto;
            box-sizing: border-box;
            .each {
                height: 50px;
                float: left;
                .label {
                    float: left;
                    display: inline-block;
                    width: 140px;
                    padding-left: 20px;
                    text-align: left;
                    line-height: 50px;
                    height: 100%;
                    box-sizing: border-box;
                    border: 1px solid #E6E6E6;
                    border-right-width: 0;
                    border-bottom-width: 0;
                    font-size: 14px;
                    background-color: #F4F4F4;
                    font-weight: bold;
                }

                .value {
                    display: block;
                    padding: 0 20px;
                    height: 100%;
                    line-height: 50px;
                    box-sizing: border-box;
                    border: 1px solid #E6E6E6;
                    border-bottom-width: 0;
                    font-size: 14px;
                    margin-left: 140px;
                    text-align: left;
                }

                &:last-child {
                    .label, .value {
                        border-bottom-width: 1px;
                    }
                }

                &.width-12 {
                    width: 50%;
                }

                &.width-8 {
                    width: 33.33%;
                }

                &.width-24 {
                    width: 100%;
                }
            }
        }
    }
</style>
<style scoped>
    .showDetail_popup {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        background-color: rgba(0, 0, 0, .6);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .showD_popup_content_bottom {
        width: 100%;
        height: 60px;
        border-top: 1px solid #8e8e8e;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 15px;
        box-sizing: border-box;
    }

    .showD_popup_content_top {
        width: 100%;
        height: 43px;
        color: #fff;
        font-size: 14px;
        padding: 0 15px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #4074e1;
    }


    .el-form {
        width: 100%;
        display: flex;
        justify-content: space-around;
    }

    .el-form-item {
        width: 100%;
        margin: 0 !important;
    }

    .el-form-item >>> .el-form-item__content {
        width: 100%;
    }

    .el-form-item >>> .el-form-item__content .el-select {
        width: 100%;
    }

    .el-form >>> label {
        display: none;
    }

    .table_box {
        width: 100%;
        height: calc(100% - 80px);
        overflow: hidden;
        margin-top: 30px;
        overflow-y: auto;
    }

    .table_box button {
        font-size: 14px;
        color: #fff;
    }
</style>
