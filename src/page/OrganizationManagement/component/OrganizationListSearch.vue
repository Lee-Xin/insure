<template>
    <div style="height: calc(100% - 100px);">
        <el-form ref="form" :model="form">
            <el-row :gutter="15" style="width: 100%;">
                <el-col :span="4">
                    <el-form-item>
                        <el-input v-model="form.name" placeholder="请输入机构简称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item>
                        <el-input v-model="form.companyCode" placeholder="请输入机构代码"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item>
                        <el-select v-model="form.region" placeholder="选择机构类型">
                            <el-option label="全部" value="全部"></el-option>
                            <el-option label="总公司" value="总公司"></el-option>
                            <el-option label="分公司" value="分公司"></el-option>
                            <el-option label="营业部" value="营业部"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item>
                        <el-select v-model="form.status">
                            <el-option label="营业" value="营业"></el-option>
                            <el-option label="停业" value="停业"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item>
                        <el-select v-model="form.delivery" placeholder="选择持证状态">
                            <el-option label="全部" value="全部"></el-option>
                            <el-option label="有证" value="有证"></el-option>
                            <el-option label="备案" value="备案"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item>
                        <el-select v-model="form.exam" placeholder="选择是否考核">
                            <el-option label="是" :value="true"></el-option>
                            <el-option label="否" :value="false"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div style="text-align: right; padding: 20px 0; border-bottom: 1px solid #ccc;">
            <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
        </div>
        <div class="my_button">
            <el-button @click="xiazai" type="primary" icon="el-icon-edit-outline">机构模版下载</el-button>
            <!--<input type="file" style="font-size: 26px" @change="importfxx(this)"  accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" value="导入机构" />-->
            <el-upload
                class="upload-demo"
                style="display: inline-block; vertical-align: middle;"
                action=""
                :on-remove="handleRemove"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button type="primary" icon="el-icon-date">导入机构</el-button>
            </el-upload>
            <el-button @click="export2Excel" type="primary" icon="el-icon-document-checked">导出机构</el-button>
            <el-button @click="toNew" type="warning" icon="el-icon-plus">新增</el-button>
        </div>

        <div class="table_box">
            <el-table :data="tableData" @current-change="handleCurrentRowChange" highlight-current-row border style="width: 100%; height: 100%;">
                <el-table-column prop="mobile" label="机构电话" width="180"></el-table-column>
                <el-table-column prop="code" label="供应商代码" width="180"></el-table-column>
                <el-table-column prop="abbreviation" label="供应商简称" width="180"></el-table-column>
                <el-table-column prop="principal" label="负责人	" width="180"></el-table-column>
                <el-table-column prop="set_up_time" label="设立时间" width="180"></el-table-column>
                <el-table-column prop="status" label="状态" width="180"></el-table-column>
                <el-table-column prop="address" label="注册地" width="180"></el-table-column>
                <el-table-column prop="organization_type" label="机构类型" width="180"></el-table-column>
                <el-table-column prop="licensed_status" label="持证状态"></el-table-column>
                <el-table-column prop="assessment" label="是否考核"></el-table-column>
            </el-table>
        </div>
        <div class="listPage">
            <page-ination
                @changeSize="handleSizeChange"
                @changeCurrentPage="handleCurrentChange"
                :total="total"
            >
                <el-button @click="toDetail" style="float: left; margin-top: 25px;" type="primary" :disabled="!showEdit">编辑/查看</el-button>
            </page-ination>
        </div>
    </div>
</template>

<script>
    import {export_json_to_excel} from '@/vendor/Export2Excel'
    import {getjigoulist, addjigoulist} from "@/mock/api"
    import PageInation from "@/common/PageInation";

    export default {
        name: "OrganizationListSearch",
        components: {PageInation},
        data() {
            return {
                tableHead: {
                    abbreviation: '机构简称',
                    affiliation: '上级机构',
                    organization_type: '机构类型',
                    status: '机构状态'
                },
                total: 0,
                form: {
                    name: '',
                    region: '',
                    companyCode: '',
                    status: '营业',
                    delivery: '',
                    exam: '',
                    MaxResultCount: 50,
                    Sorting: 1,
                    SkipCount: 0,
                },
                tableData: [],
                fileList: [], // 导入机构excel文件
                currentRow: null
            }
        },
        computed: {
            showEdit() {
                return this.currentRow !== null;
            }
        },
        methods: {
            xiazai() {
                require.ensure([], () => {
                    const {export_json_to_excel} = require('@/vendor/Export2Excel');
                    const tHeader = ['机构名称', '机构简称', '机构代码', '设立时间', '负责人', '联系电话']; //将对应的属性名转换成中文
                    const data = [['机构001', '1', '666666', '2018/9/3', '张三', '18888888888']];
                    export_json_to_excel(tHeader, data, '机构导入模板');
                });
            },
            export2Excel() {
                require.ensure([], () => {
                    const tHeader = [] // 对应表格输出的中文title
                    const filterVal = [] // 对应表格输出的数据
                    var item;
                    for (item in this.tableHead) {
                        tHeader.push(this.tableHead[item])
                        filterVal.push(item)
                    }
                    // this.tableHead.forEach((item,index) => {
                    //   window.console.log(item,index)
                    // })
                    const list = this.tableData // 表格data
                    const data = this.formatJson(filterVal, list)
                    export_json_to_excel(tHeader, data, '机构列表') // 对应下载文件的名字
                });
            },
            handleRemove(file, fileList) {
                console.log(file);
            },
            handleExceed(files, fileList) {

            },
            formatJson(filterVal, jsonData) {
                jsonData.map(v => filterVal.map(j => v[j]))
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            handleSizeChange(val) {
                this.formInline.SkipCount = 0;
                this.formInline.MaxResultCount = val;
                this.getdata();
            },
            handleCurrentChange(val) {
                this.formInline.SkipCount = (val - 1) * 50;
                this.getdata();
            },
            handleCurrentRowChange(val) {
                this.currentRow = val;
            },
            toDetail() {
                this.$router.push({
                    path: '/organization_list/detail',
                    query: {
                        id: this.currentRow.id
                    }
                })
            },
            toNew() {
                this.$router.push({
                    path: '/organization_list/new'
                })
            },
            search() {
                this.getdata()
            },
            getdata() {
                getjigoulist(this.form).then(res => {
                    this.tableData = res.data.result.items
                    this.total = res.data.result.totalCount
                })
            }
        },
        mounted() {
            this.getdata()
        }
    }
</script>

<style scoped>
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

    .my_button {
        width: 100%;
        margin: 20px 0;
        text-align: right;
    }

    .my_button .el-button {
        margin-left: 10px;
    }

    .my_button .el-button:last-child {
        margin-left: 50px;
    }

    .table_box {
        width: 100%;
        height: calc(100% - 200px);
        margin-top: 36px;
    }
    >>>.el-table__body-wrapper{
        height: calc(100% - 48px);
        overflow: auto;
    }
    >>>.current-row > td{
        background-color: #2c8cf0 !important;
        color: #fff;
    }
</style>
