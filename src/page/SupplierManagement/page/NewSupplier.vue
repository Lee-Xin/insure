<template>
    <div class="wrapper">
        <page-hr></page-hr>
        <div class="form-area">
            <div class="section">基本信息</div>
            <el-row :gutter="20">
                <el-col v-for="(item, index) in forms" :key="index" :span="item.span || 12">
                    <form-item
                        :type="item.type"
                        :label="item.label"
                        :options="item.options"
                        v-model="item.value"
                        :required="item.required"
                        :placeholder="item.placeholder"
                        :errorText="item.errorText || ''"
                    >
                    </form-item>
                </el-col>
            </el-row>
            <div class="section">其他信息</div>
            <el-row :gutter="20" style="padding-top: 10px;">
                <el-col :span="24 / imgUploads.length" v-for="(item, index) in imgUploads" :key="index">
                    <div class="upload-img">
                        <span class="label">{{item.label}}</span>
                        <span class="camera" @click="showImgUpload = true;">
                            <img :src="require('@/assets/img/camera.png')">
                        </span>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20"
                    style="margin-top: 20px; padding-top: 20px; border-top: solid 1px #ccc; border-bottom: solid 1px #ccc;">
                <el-col v-for="(item, index) in otherForms" :key="index" :span="item.span || 12">
                    <form-item
                        :type="item.type"
                        :label="item.label"
                        :options="item.options"
                        v-model="item.value"
                        :required="item.required"
                        :placeholder="item.placeholder"
                    >
                    </form-item>
                </el-col>
            </el-row>
            <el-tabs style="margin-top: 20px; margin-bottom: 40px;" v-model="activeName" type="card">
                <el-tab-pane label="公司简介" name="first">
                    <div class="fuwenbenkaung">
                        <editor-item v-model="editorContent.aboutUs"></editor-item>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="公司荣誉" name="second">
                    <div class="fuwenbenkaung">
                        <editor-item v-model="editorContent.companyGlories"></editor-item>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="发展历程" name="third">
                    <div class="fuwenbenkaung">
                        <editor-item v-model="editorContent.developmentHistory"></editor-item>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <img-upload :isShow.sync="showImgUpload"></img-upload>
        <div class="bottom-toolbar">
            <el-button @click="submitForm" type="primary" round icon="el-icon-success">
                保存/提交
            </el-button>
            <el-button round @click="$router.push('/supplier_list')">
                返回
            </el-button>
        </div>
    </div>
</template>

<script>
    import PageHr from "@/common/PageHr";
    import {apiSupplierAdd, apiSupperlist, supplierGetCooperationStatus, supplierGetCooperationType} from "@/mock/api";
    import FormItem from '@/common/FormItem';
    import ImgUpload from '@/common/ImgUpload';
    import EditorItem from "@/common/wangEnduit/EditorItem";

    export default {
        name: "NewSupplier",
        components: {PageHr, FormItem, ImgUpload, EditorItem},
        data() {
            return {
                forms: {
                    fullName: {
                        label: '供应商全称',
                        type: 'select',
                        value: '',
                        required: true,
                        errorText: '',
                        placeholder: '请选择供应商',
                        options: []
                    },
                    headAddress: {
                        label: '总部地址',
                        type: 'input',
                        value: '',
                        placeholder: '请输入总部地址'
                    },
                    shortName: {
                        label: '供应商简称',
                        type: 'input',
                        value: '',
                        required: true,
                        errorText: '',
                        placeholder: '请输入供应商简称',
                        span: 6
                    },
                    code: {
                        key: 'code',
                        label: '供应商代码',
                        type: 'input',
                        value: '',
                        placeholder: '请输入供应商代码',
                        span: 6
                    },
                    registerCapital: {
                        label: '注册资本',
                        type: 'input',
                        value: '',
                        placeholder: '请输入注册资本',
                        span: 6
                    },
                    createDate: {
                        label: '设立时间',
                        type: 'date',
                        value: '',
                        placeholder: '选择日期',
                        span: 6
                    },
                    cooperationType: {
                        label: '合作类型',
                        type: 'select',
                        value: 0,
                        required: true,
                        errorText: '',
                        placeholder: '请选择合作类型',
                        span: 6,
                        options: []
                    },
                    cooperationStatus: {
                        label: '合作状态',
                        type: 'select',
                        value: 0,
                        required: true,
                        errorText: '',
                        placeholder: '请选择合作状态',
                        span: 6,
                        options: []
                    },
                    website: {
                        label: '官方网址',
                        type: 'input',
                        value: '',
                        placeholder: '请以http://或https://开头',
                        span: 6
                    },
                    registerAddress: {
                        label: '公司注册地',
                        type: 'input',
                        value: '',
                        placeholder: '请输入公司注册地',
                        span: 6
                    },
                    startDate: {
                        label: '开始时间',
                        type: 'date',
                        value: '',
                        errorText: '',
                        placeholder: '选择日期',
                        span: 6,
                        required: true
                    },
                    endDate: {
                        label: '结束时间',
                        type: 'date',
                        value: '',
                        errorText: '',
                        placeholder: '选择日期',
                        span: 6,
                        required: true
                    },
                    serviceHotline: {
                        label: '服务热线',
                        type: 'input',
                        value: '',
                        placeholder: '请输入服务热线',
                        span: 6
                    },
                    serviceTelephone: {
                        label: '渠道服务电话',
                        type: 'input',
                        value: '',
                        placeholder: '请输入渠道服务电话',
                        span: 6
                    },
                },
                otherForms: {
                    appName: {
                        label: 'APP名称',
                        type: 'input',
                        value: '',
                        placeholder: '请输入APP名称',
                        span: 12
                    },
                    weChatAccount: {
                        label: '微信公众号',
                        type: 'input',
                        value: '',
                        placeholder: '请输入微信公众号名称',
                        span: 12
                    }
                },
                imgUploads: [
                    {
                        label: 'logo上传',
                        url: ''
                    },
                    {
                        label: 'APP二维码',
                        url: ''
                    },
                    {
                        label: '公众号二维码',
                        url: ''
                    }
                ],
                editorContent: {
                    aboutUs: '',
                    companyGlories: '',
                    developmentHistory: ''
                },
                showImgUpload: false,
                activeName: 'first'
            };
        },
        created() {
            //  获取合作状态
            supplierGetCooperationStatus().then(res => {
                if (res.success) {
                    this.forms.cooperationStatus.options = res.result.map(t => {
                        return {
                            label: t.name,
                            value: t.value
                        };
                    });
                }
            });
            //  获取合作类型
            supplierGetCooperationType().then(res => {
                if (res.success) {
                    this.forms.cooperationType.options = res.result.map(t => {
                        return {
                            label: t.name,
                            value: t.value
                        };
                    });
                }
            });
            //  获取供应商全称数组
            apiSupperlist({
                SkipCount: 0,
                MaxResultCount: 10
            }).then(res => {
                if (res.success) {
                    this.forms.fullName.options = res.result.items.map(t => {
                        return {
                            label: t,
                            value: t
                        }
                    });
                }
            });
        },
        watch: {
            formData: {
                deep: true,
                handler() {
                    // 表单值改变时，校验基本信息（this.forms）
                    this.validate(this.forms);
                }
            }
        },
        computed: {
            formData() {
                let data = {};
                Object.keys(this.forms).forEach(t => {
                    data[t] = this.forms[t].value;
                });
                Object.keys(this.otherForms).forEach(t => {
                    data[t] = this.otherForms[t].value;
                });
                return {
                    ...data,
                    ...this.editorContent
                };
            }
        },
        methods: {
            validate(form) {
                let success = true;
                Object.keys(form).forEach(key => {
                    let t = form[key];
                    if (t.required) {
                        if (t.value === '') {
                            t.errorText = `${t.label}不能为空`;
                            if (success) {
                                success = false;
                            }
                            return;
                        }
                    }
                    t.errorText = '';
                });
                return success;
            },
            submitForm() {
                let res = this.validate(this.forms);
                if (!res) {
                    this.$message.error('请完善信息');
                    return;
                }
                apiSupplierAdd(this.formData).then(res => {
                    if (res.status === 200) {
                        this.$message.success('保存成功');
                        this.$router.push('/supplier_list');
                    }
                }).catch(e => {
                    console.log(e);
                    this.$message.error('保存失败');
                });
            },
        }
    }
</script>

<style scoped lang="scss">
    .wrapper {
        background-color: #fff;
        height: 100%;
        overflow-y: auto;
        .form-area {
            padding: 20px;

            .section {
                padding: 15px 20px;
                margin-bottom: 10px;
                font-size: 16px;
                font-weight: bold;
                text-align: left;
                background-color: #edf2f6;
                color: #495060;
            }
        }

        .upload-img {
            text-align: left;
            cursor: pointer;

            > .label {
                color: #F29F43;
                font-size: 14px;
                font-weight: bold;
            }

            > .camera {
                display: inline-block;
                margin: 0 20px;
                width: 58px;
                height: 58px;
                line-height: 58px;
                text-align: center;
                vertical-align: middle;
                border: 1px dashed #757F98;
                border-radius: 4px;

                > img {
                    vertical-align: middle;
                    width: 18px;
                }
            }
        }

        .bottom-toolbar {
            position: absolute;
            width: calc(100% - 30px);
            margin: 0 15px;
            padding: 0 20px;
            box-sizing: border-box;
            height: 80px;
            line-height: 80px;
            z-index: 2;
            right: 0;
            bottom: 0;
            background-color: #fff;
            box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.28);

            .el-button.is-round {
                padding: 6px 15px 7px 15px;
            }
        }
    }
</style>
