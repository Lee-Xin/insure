<template>
    <div>
        <div class="import_popup">
            <div class="form_box">
                <div class="form_box_title">
                    分类管理
                    <el-icon @click.native="cancel_popup" class="el-icon-close"
                             style="float: right; cursor: pointer;"></el-icon>
                </div>
                <el-row class="form_box_body">
                    <el-col :span="14" style="height: 100%; overflow-y: scroll; padding: 20px;">
                        <el-tree
                            :data="typeData"
                            node-key="id"
                            default-expand-all
                            :expand-on-click-node="false">
                            <span class="custom-tree-node" slot-scope="{ node, data }">
                                <el-input v-if="data.inputting" v-model="data.name" style="display: inline-block; width: calc(100% - 120px);"></el-input>
                                <span v-else style="margin-top: 5px; display: inline-block;">{{ data.name }}</span>
                                <span style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%);">
                                    <el-button
                                        class="circle-btn"
                                        circle
                                        icon="el-icon-delete"
                                        type="danger"
                                        @click="deleteNode(data)">
                                    </el-button>
                                    <el-button
                                        v-if="!data.inputting"
                                        class="circle-btn"
                                        circle
                                        icon="el-icon-edit"
                                        type="primary"
                                        @click="editNode(data)">
                                    </el-button>
                                    <el-button
                                        v-else
                                        class="circle-btn"
                                        circle
                                        icon="el-icon-check"
                                        type="primary"
                                        @click="editConfirm(data)">
                                    </el-button>
                                </span>
                            </span>
                        </el-tree>
                    </el-col>
                    <el-col class="form-body" :span="10" style="height: 100%;">
                        <p class="form-title">添加分类</p>
                        <el-col v-for="(item, index) in forms" :key="index" :span="24">
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
                        <el-button @click="addType" type="primary" icon="el-icon-success" round>新增分类</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    import {apiProductTypeTree, apiAddProductType, apiEditProductType, apiDeleteProductType} from "../request/api";
    import FormItem from '@/common/FormItem';
    export default {
        name: "TypePopup",
        components: {FormItem},
        data() {
            return {
                typeData: [],
                forms: {
                    type: {
                        type: 'select',
                        label: '上级分类',
                        value: 0,
                        options: [
                            {
                                label: '根分类',
                                value: 0
                            }
                        ]
                    },
                    typeName: {
                        type: 'input',
                        label: '分类名称',
                        value: '',
                        placeholder: '请输入分类名称'
                    }
                }
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
                apiProductTypeTree().then(res => {
                    if(res.success) {
                        this.typeData = res.result.items;
                        // 根据树形结构，获取第一层级
                        this.forms.type.options = [
                            {
                                label: '根分类',
                                value: 0
                            }
                        ];
                        res.result.items.forEach(t => {
                            this.forms.type.options.push({
                                label: t.name,
                                value: t.id
                            })
                        })
                    }
                });
            },
            cancel_popup() {
                this.$emit('cancel_popup');
            },
            deleteNode(data) {
                apiDeleteProductType(data.id).then(res => {
                    if(res.data.success) {
                        this.$message.success('操作成功');
                        this.getData();
                    }
                })
            },
            editNode(data) {
                data.inputting = true;
                let temp = JSON.parse(JSON.stringify(this.typeData));
                this.typeData = [];
                this.$nextTick(() => {
                    this.typeData = temp;
                })
            },
            editConfirm(data) {
                apiEditProductType({
                    ...this.typeData
                }).then(res => {
                    if(res.data.success) {
                        data.inputting = false;
                        this.$message.success('操作成功');
                    }
                })
            },
            addType() {
                if(this.forms.typeName.value === '') {
                    return this.$message.error('请输入分类名称');
                }
                apiAddProductType(this.forms).then(res => {
                    if(res.data.success) {
                        this.$message.success('操作成功');
                        this.forms.type.value = 0;
                        this.forms.typeName.value = '';
                        this.getData();
                    }
                })
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
        background-color: rgba(0, 0, 0, .5);
    }

    .form_box {
        width: 800px;
        height: 500px;
        position: absolute;
        top: 50%;
        margin-top: -350px;
        left: 50%;
        margin-left: -400px;
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

    .form_box_body {
        height: calc(100% - 44px);
        font-size: 14px;
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
<style lang="less" scoped>
    .el-button.circle-btn {
        padding: 0;
        height: 25px;
        width: 25px;
    }

    .custom-tree-node {
        width: 100%;
        position: relative;
        text-align: left;
    }

    /deep/ .el-tree {
        & > .el-tree-node > .el-tree-node__content {
            background-color: #d2ecf9;
        }
    }

    /deep/ .el-tree-node {
        &__content {
            padding: 10px;
            border: 1px solid #d2ecf9;
            margin-bottom: 10px;
        }
    }
    .form-body{
        padding: 20px;
        background-color: #d2ecf9;
        .form-title {
            margin-top: 10px;
            margin-bottom: 20px;
            line-height: 1.5;
            text-align: left;
            border-bottom: 1px solid #b3cad7;
            color: #ef8412;
            font-size: 18px;
        }
    }
</style>
