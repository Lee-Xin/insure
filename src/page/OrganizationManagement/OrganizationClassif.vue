<template>
    <div style="height: 100%; background-color: #fff">
        <page-hr></page-hr>
        <div class="content_box">
            <div class="addNew">
                <el-button icon="el-icon-plus" type="warning" @click="dialogVisible = true">新增</el-button>
            </div>
            <div class="table_box">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column prop="id" label="序号"></el-table-column>
                    <el-table-column prop="name" label="机构名称"></el-table-column>
                    <el-table-column prop="time" label="添加时间"></el-table-column>
                </el-table>
            </div>
            <el-dialog
                title="新增"
                :visible.sync="dialogVisible"
                width="30%"
                @close="names = ''"
            >
                <form-item
                    type="input"
                    label="机构名称"
                    v-model="names"
                    :required="true"
                    placeholder="请输入机构名称"
                >
                </form-item>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="submitForm">提交</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {getjigouclass, setjigouclass} from "@/request/api"
    import PageHr from "@/common/PageHr";
    import FormItem from '@/common/FormItem';

    export default {
        name: "OrganizationClassif",
        data() {
            return {
                dialogVisible: false,
                names: '',
                tableData: []
            }
        },
        components: {PageHr, FormItem},
        methods: {
            submitForm() {
                if(!this.names) {
                    this.$message.error('请输入机构名称');
                    return;
                }
                setjigouclass({name: this.names}).then(res => {
                    if(!res.data.success) {
                        this.$message.error('操作失败');
                        return;
                    }
                    this.$message.success('操作成功');
                    this.dialogVisible = false;
                    this.getdata();
                });

            },
            getdata() {
                getjigouclass().then(res => {
                    this.tableData = res.data.result.items
                });
            }
        },
        mounted() {
            this.getdata()
        }
    }
</script>

<style scoped lang="scss">
    .content_box {
        width: 100%;
        height: auto;
        padding-left: 16px;
        box-sizing: border-box;
        .addNew{
            text-align: right;
            margin: 30px 0 20px;
        }
        /deep/.table_box{
            .cell{
                text-align: center;
            }
        }
    }
</style>
