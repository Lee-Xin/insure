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
            <el-row :gutter="20" style="margin-top: 20px; padding-top: 20px; border-top: solid 1px #ccc; border-bottom: solid 1px #ccc;">
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
        </div>
        <img-upload :isShow.sync="showImgUpload"></img-upload>
    </div>
</template>

<script>
    import PageHr from "@/common/PageHr";
    import {apiSupplierAdd, apiSupplierListSearchPageInation} from "../../../request/api";
    import FormItem from '@/common/FormItem';
    import ImgUpload from '@/common/ImgUpload';

    export default {
        name: "NewSupplier",
        components: {PageHr, FormItem, ImgUpload},
        data() {
            var validateHotline = (rule, value, callback) => {
                let regExp1 = new RegExp('^400-\\d{6}-\\d{3}$');
                let regExp2 = new RegExp('^\\d{6}$');
                if (value === '') {
                    callback()
                } else if (regExp1.test(value) || regExp2.test(value)) {
                    callback()
                } else {
                    callback(new Error('格式为400-123456-123或123456'));
                }
            }
            return {
                forms: [
                    {
                        label: '供应商全称',
                        type: 'select',
                        value: '',
                        required: true,
                        placeholder: '请选择供应商',
                        options: [
                            {
                                label: '1',
                                value: 1
                            }
                        ]
                    },
                    {
                        label: '总部地址',
                        type: 'input',
                        value: '',
                        placeholder: '请输入总部地址'
                    },
                    {
                        label: '供应商简称',
                        type: 'input',
                        value: '',
                        required: true,
                        placeholder: '请输入供应商简称',
                        span: 6
                    },
                    {
                        label: '供应商代码',
                        type: 'input',
                        value: '',
                        placeholder: '请输入供应商代码',
                        span: 6
                    },
                    {
                        label: '注册资本',
                        type: 'input',
                        value: '',
                        placeholder: '请输入注册资本',
                        span: 6
                    },
                    {
                        label: '设立时间',
                        type: 'date',
                        value: '',
                        placeholder: '选择日期',
                        span: 6
                    },
                    {
                        label: '合作类型',
                        type: 'select',
                        value: 1,
                        required: true,
                        placeholder: '请选择合作类型',
                        span: 6,
                        options: [
                            {
                                label: '战略合作',
                                value: 1
                            }
                        ]
                    },
                    {
                        label: '合作状态',
                        type: 'select',
                        value: 1,
                        required: true,
                        placeholder: '请选择合作状态',
                        span: 6,
                        options: [
                            {
                                label: '合作',
                                value: 1
                            }
                        ]
                    },
                    {
                        label: '官方网址',
                        type: 'input',
                        value: '',
                        placeholder: '请以http://或https://开头',
                        span: 6
                    },
                    {
                        label: '公司注册地',
                        type: 'input',
                        value: '',
                        placeholder: '请输入公司注册地',
                        span: 6
                    },
                    {
                        label: '开始时间',
                        type: 'date',
                        value: '',
                        placeholder: '选择日期',
                        span: 6,
                        required: true
                    },
                    {
                        label: '结束时间',
                        type: 'date',
                        value: '',
                        placeholder: '选择日期',
                        span: 6,
                        required: true
                    },
                    {
                        label: '服务热线',
                        type: 'input',
                        value: '',
                        placeholder: '请输入服务热线',
                        span: 6
                    },
                    {
                        label: '渠道服务电话',
                        type: 'input',
                        value: '',
                        placeholder: '请输入渠道服务电话',
                        span: 6
                    },
                ],
                otherForms: [
                    {
                        label: 'APP名称',
                        type: 'input',
                        value: '',
                        placeholder: '请输入APP名称',
                        span: 12
                    },
                    {
                        label: '微信公众号',
                        type: 'input',
                        value: '',
                        placeholder: '请输入微信公众号名称',
                        span: 12
                    }
                ],
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
                showImgUpload: false,
            };
        },
        created() {
            //  获取供应商全称数组
            apiSupplierListSearchPageInation({
                SkipCount: 0,
                MaxResultCount: 10
            }).then(res => {
                this.extractAttr(res.result.items, 'fullName', this.fullName);
                this.deleteAllTrim(this.fullName);
                let fullName = this.unique(this.fullName);
                this.fullName = fullName;
            });
        },
        methods: {
            //  提取结果中的指定属性，并放入一个数组中
            extractAttr(arrayJson = [], attrName = '', receiverArray = []) {
                arrayJson.forEach(item => {
                    if (item[attrName]) receiverArray.push(item[attrName]);
                });
            },
            // 删除所有空格
            deleteAllTrim(array = []) {
                array.forEach((item, index) => {
                    array[index] = item.replace(/\s*/g, "");
                });
            },
            /**
             * 删除数组内容重复的部分，并返回
             * @param arr
             * @returns {any[]}
             */
            unique(arr) {
                return Array.from(new Set(arr));
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        apiSupplierAdd(this.formSubmit).then(res => {
                            // console.log(res)
                            if (res.status === 200) {
                                this.$message({
                                    message: '保存成功',
                                    type: 'success'
                                })
                            }
                        }).catch(err => {
                            // console.log(err.message)
                            this.$message({
                                message: err['message'],
                                type: 'warning'
                            })
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .wrapper {
        background-color: #fff;
        .form-area{
            padding: 20px;
            .section{
                padding: 15px 20px;
                margin-bottom: 10px;
                font-size: 16px;
                font-weight: bold;
                text-align: left;
                background-color: #edf2f6;
                color: #495060;
            }
        }
        .upload-img{
            text-align: left;
            cursor: pointer;
            >.label{
                color: #F29F43;
                font-size: 14px;
                font-weight: bold;
            }
            >.camera{
                display: inline-block;
                margin: 0 20px;
                width: 58px;
                height: 58px;
                line-height: 58px;
                text-align: center;
                vertical-align: middle;
                border: 1px dashed #757F98;
                border-radius: 4px;
                >img{
                    vertical-align: middle;
                    width: 18px;
                }
            }
        }
    }
</style>
