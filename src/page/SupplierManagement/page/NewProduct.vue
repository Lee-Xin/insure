<template>
    <div class="wrapper">
        <page-hr></page-hr>
        <div class="form-area">
            <div class="section">基本信息</div>
            <el-row :gutter="20">
                <el-col v-for="(item, index) in forms" :key="index" :span="item.span || 6">
                    <el-button v-if="item.type === 'button'" @click="item.clickFn" :type="item.btnType">{{item.label}}</el-button>
                    <form-item
                        v-else
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
            <div class="btn-row">
                <el-button @click="multiDataType = 0; isShowMultiCheck = true;" type="warning">保险期间 <i class="el-icon-plus"></i></el-button>
                <el-tag
                    :key="tag"
                    v-for="tag in insureDuration"
                    closable
                    :disable-transitions="false"
                    @close="tagClose(insureDurationData, tag)">
                    {{tag}}
                </el-tag>
            </div>
            <div class="btn-row">
                <el-button @click="multiDataType = 1; isShowMultiCheck = true;" type="warning">交费期间 <i class="el-icon-plus"></i></el-button>
                <el-tag
                    :key="tag"
                    v-for="tag in payDuration"
                    closable
                    :disable-transitions="false"
                    @close="tagClose(payDurationData, tag)">
                    {{tag}}
                </el-tag>
            </div>
            <div style="text-align: left; margin: 20px 0;">
                <el-checkbox v-model="isZhebiao">是否计折标系数</el-checkbox>
                <el-checkbox v-model="isPolicy">是否计费用政策</el-checkbox>
                <el-checkbox v-model="isSingle">是否独立展示</el-checkbox>
                <el-checkbox v-model="isShort">是否是短期消费险种</el-checkbox>
            </div>
            <div style="text-align: left;">
                <el-checkbox v-model="isDependency">是否有依附主险计划</el-checkbox>
            </div>
            <div v-if="isDependency" class="dependency-form">
                <form-item
                    type="input"
                    label="计划名称"
                    v-model="planName"
                    placeholder="请输入计划名称"
                    style="width: 30%;"
                >
                </form-item>
                <div class="btn-row">
                    <el-button @click="denpendencyType = 0; isShowDenpendency = true;" type="primary">必选附加险 <i class="el-icon-plus"></i></el-button>
                </div>
                <div class="btn-row">
                    <el-button @click="denpendencyType = 1; isShowDenpendency = true;" type="warning">推荐附加险 <i class="el-icon-plus"></i></el-button>
                </div>
            </div>
            <div class="section" style="margin-top: 20px;">
                条款信息资料
                <el-upload
                    style="margin-left: 20px; display: inline-block;"
                    class="upload-demo"
                    action="http://localhost"
                    :show-file-list="false"
                    :file-list="fileList">
                    <el-button size="small" style="color: #3f75df; font-weight: normal;" type="text" icon="el-icon-upload">上传PDF</el-button>
                </el-upload>
            </div>
        </div>
        <el-tabs v-model="editableTabsValue" type="card">
            <el-tab-pane
                :key="item.name + '' + index"
                v-for="(item, index) in editableTabs"
                :label="item.title"
                :name="item.name"
            >
                {{item.content}}
            </el-tab-pane>
        </el-tabs>
        <div class="fuwenbenkaung">
            <editor-item v-model="editorValue[editableTabsValue]" :isClear="isClear"></editor-item>
        </div>
        <div class="bottom-toolbar">
            <el-button @click="submitForm" type="primary" round icon="el-icon-success">
                保存/提交
            </el-button>
            <el-button round @click="$router.push('/product_list')">
                返回
            </el-button>
        </div>
        <import-popup v-if="isShowImportPopup" @importData="importData" @cancel_popup="hideImportPopup" :title="title"></import-popup>
        <type-popup v-if="isShowTypePopup"  @cancel_popup="isShowTypePopup = false"></type-popup>
        <multi-check v-if="isShowMultiCheck" :title="multiDataType === 0 ? '保险期间' : '交费期间'" :data="multiDataType === 0 ? insureDurationData : payDurationData"  @cancel_popup="isShowMultiCheck = false"></multi-check>
        <dependency-check v-if="isShowDenpendency" :title="denpendencyType === 0 ? '必选附加险' : '可选附加险'"  @cancel_popup="isShowDenpendency = false"></dependency-check>
    </div>
</template>

<script>
    import PageHr from "@/common/PageHr";
    import EditorItem from "@/common/wangEnduit/EditorItem";
    import FormItem from '@/common/FormItem';
    import {apiProductListAdd, apiProductList, apiGetProductType} from "../../../request/api";
    import ImportPopup from "../../../common/ImportPopup";
    import TypePopup from "../../../common/TypePopup";
    import multiCheck from '../component/multiCheck';
    import dependencyCheck from '../component/denpendencyCheck';
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
                        that.showImportProduct();
                    }
                }
            }, '导入')
        }
    };
    export default {
        name: "NewProduct",
        components: {ImportPopup, TypePopup, FormItem, EditorItem, PageHr, multiCheck, dependencyCheck},
        data() {
            return {
                pay_way: '',
                title: '产品列表',
                isShowImportPopup: false,
                isShowTypePopup: false,
                isShowMultiCheck: false,
                isShowDenpendency: false,
                denpendencyType: '',
                fileList: [{name: '', url: ''}],
                forms: {
                    supplier_name: {
                        type: 'select',
                        label: '供应商',
                        value: '',
                        options: [],
                        required: true
                    },
                    product_name: {
                        label: '产品名称',
                        type: 'input',
                        value: '',
                        placeholder: '请选择产品名称',
                        definedSlot: {
                            name: 'append',
                            component: productName
                        },
                        required: true
                    },
                    product_nickName: {
                        label: '产品简称',
                        value: '',
                        type: 'input',
                        placeholder: '请输入产品简称'
                    },
                    product_code: {
                        label: '产品代码',
                        value: '',
                        type: 'input',
                        placeholder: '请输入产品代码'
                    },
                    sales_status: {
                        label: '销售状态',
                        value: 0,
                        type: 'select',
                        placeholder: '请选择销售状态',
                        options: [
                            {
                                value: 0,
                                label: '在售'
                            },
                            {
                                value: 1,
                                label: '停售'
                            }
                        ],
                        required: true
                    },
                    main_risks_attached: {
                        label: '主副险类型',
                        value: 0,
                        type: 'select',
                        placeholder: '请选择主副险类型',
                        options: [
                            {
                                value: 0,
                                label: '主险'
                            },
                            {
                                value: 1,
                                label: '附加险'
                            },
                            {
                                value: 2,
                                label: '组合险'
                            }
                        ]
                    },
                    insured_age: {
                        label: '承保年龄',
                        value: '',
                        type: 'input',
                        placeholder: '例：0-65周岁'
                    },
                    type: {
                        label: '产品分类',
                        type: 'select',
                        options: [],
                        value: '',
                        placeholder: '请选择产品分类',
                        span: 4
                    },
                    btn: {
                        label: '管理',
                        type: 'button',
                        clickFn: this.showTypePopup,
                        span: 2,
                        btnType: 'primary'
                    },
                    pay_way: {
                        type: 'input',
                        label: '交费方式',
                        value: '',
                        placeholder: '请输入交费方式'
                    },
                    zhonganCode: {
                        type: 'input',
                        label: '众安code',
                        value: '',
                        placeholder: '请输入内容'
                    },
                    product_nature: {
                        type: 'select',
                        label: '产品性质',
                        value: '',
                        options: [
                            {
                                label: '单列产品',
                                value: 0
                            },
                            {
                                label: '正常产品',
                                value: 1
                            }
                        ],
                        placeholder: '请选择'
                    }
                },
                detail: '',
                isClear: false,
                payDuraton: [],
                multiDataType: 0,
                insureDurationData: [
                    {
                        value: false,
                        label: '1天'
                    },
                    {
                        value: false,
                        label: '2天'
                    },
                    {
                        value: false,
                        label: '3天'
                    },
                    {
                        value: false,
                        label: '4天'
                    },
                    {
                        value: false,
                        label: '5天'
                    }
                ],
                payDurationData: [
                    {
                        value: false,
                        label: '月缴'
                    },
                    {
                        value: false,
                        label: '趸交'
                    },
                    {
                        value: false,
                        label: '1年交'
                    },
                    {
                        value: false,
                        label: '2年交'
                    },
                    {
                        value: false,
                        label: '3年交'
                    }
                ],
                isZhebiao: false,
                isPolicy: false,
                isSingle: false,
                isShort: false,
                isDependency: false,
                planName: '',
                editableTabsValue: '1',
                editableTabs: [
                    {
                        title: '保险责任',
                        name: '1'
                    },
                    {
                        title: '投保规则',
                        name: '2'
                    },
                    {
                        title: '责任免除',
                        name: '3'
                    },
                    {
                        title: '案例说明',
                        name: '4'
                    },
                    {
                        title: '详细条款',
                        name: '5'
                    },
                    {
                        title: '病种详情',
                        name: '6'
                    },
                    {
                        title: '险种详情',
                        name: '7'
                    }
                ],
                editorValue: {
                    1: '',
                    2: '',
                    3: '',
                    4: '',
                    5: '',
                    6: '',
                    7: ''
                }
            };
        },
        computed: {
            insureDuration() {
                if(!this.insureDurationData.length) {
                    return [];
                }
                return this.insureDurationData.filter(t => t.value).map(t => t.label);
            },
            payDuration() {
                if(!this.payDurationData.length) {
                    return [];
                }
                return this.payDurationData.filter(t => t.value).map(t => t.label);
            }
        },
        methods: {
            getTypeData() {
                apiGetProductType().then(res => {
                    if(res.success) {
                        this.forms.type.options = res.result.items;
                    }
                })
            },
            tagClose(data, name) {
                data[data.findIndex(t => t.label === name)].value = false;
            },
            importData(val) {
                this.forms.product_name.value = val.productName
            },
            hideImportPopup() {
                this.isShowImportPopup = false;
            },
            showImportProduct() {
                this.isShowImportPopup = true;
            },
            showTypePopup() {
                this.isShowTypePopup = true;
            },
            returnPrev() {
                this.$emit('changeSearch')
            },
            submitForm() {

            }
        },
        created() {
            that = this;
            this.getTypeData();
            apiProductList().then(res => {
                this.forms.supplier_name.options = res.result.items.map(t => {
                    return {
                        label: t.supplier_name,
                        value: t.supplier_name
                    }
                })
            })
        }
    }
</script>

<style scoped lang="scss">
    .wrapper {
        background-color: #fff;
        height: calc(100% - 50px);
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
    }

    #mybutton0, #mybutton1 {
        width: 100px;
        height: 40px;
        font-size: 16px;
        color: #fff;
        background-color: #ff9628;
        margin-right: 20px;
        margin-bottom: 20px;
    }

    .row_2 {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        /*background-color: #fff;*/
    }

    .row_2 .el-form-item {
        width: 50%;
    }

    .row_3 {
        width: 100%;
        display: flex;
        justify-content: flex-start;
    }

    .row_3 .el-form-item {
        width: 33.33%;
        /*background-color: #fff;*/
    }

    .row_4 {
        width: 100%;
        display: flex;
        justify-content: space-between;
        background-color: #fff;
    }

    .row_4 .el-form-item {
        width: 25%;
    }

    .haveUpload > > > .el-form-item__content {
        /*background-color: red;*/
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }

    .haveUpload > > > .el-form-item__content > .el-input,
    .haveUpload > > > .el-form-item__content > .el-select {
        width: 80%;
    }

    .haveUpload > > > .el-form-item__content > .upload-demo,
    .haveUpload > > > .el-form-item__content > .el-button {
        width: 20%;
        /*background-color: blue;*/
    }

    /*.haveUpload >>> .el-form-item__content > .el-button--success{*/
    /*  height: 40px;*/
    /*  background-color: #ff9628;*/
    /*  line-height: 40px;*/
    /*  font-size: 16px;*/
    /*  color: #fff;*/
    /*  border: 0;*/
    /*}*/
    .el-form-item__content .el-select {
        width: 100%;
    }

    .el-form-item__content .el-col {
        width: 100%;
    }

    .el-form-item__content .el-button {
        width: 100%;
        border: 1px solid #999;
    }

    .el-form-item__content .el-col .el-form-item {
        width: 100%;
    }

    .fuwenbenkaung {
        width: 100%;
        height: 458px;
        font-size: 18px;
        /*background-color: red;*/
    }

    .fuwenbenkaung > > > .toolbar {
        height: 30px;
    }

    .fuwenbenkaung > > > .text {
        height: 428px;
    }
</style>
<style lang="less" scoped>
    .btn-row{
        margin-bottom: 10px;
        text-align: left;
        .el-button{
            vertical-align: middle;
        }
        .el-tag{
            margin-left: 5px;
            vertical-align: middle;
        }
    }
    .dependency-form{
        margin-top: 20px;
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
</style>
