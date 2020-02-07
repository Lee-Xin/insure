<template>
    <div>
        <div class="upstreamFOldingAdd">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <div class="row_3">
                    <el-form-item label="供应商" prop="supplierName">
                        <el-select v-model="ruleForm.supplierName" placeholder="供应商简称">
                            <el-option v-for="(item, index) in supplier_niceName" :label="item" :value="item"
                                       :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="upstream_import" label="产品名称" prop="productName">
                        <el-input v-model="ruleForm.productName" placeholder="请选择产品名称"></el-input>
                        <el-button @click="chooseProduct">选择</el-button>
                    </el-form-item>
                    <el-form-item label="产品代码" prop="product_code">
                        <el-input v-model="ruleForm.product_code" placeholder="请输入产品代码"></el-input>
                    </el-form-item>
                </div>
                <div class="row_3">
                    <el-form-item label="与年龄是否有关" prop="aboutAge">
                        <el-select v-model="ruleForm.aboutAge">
                            <el-option v-for="(item, index) in aboutAge" :label="item" :value="item"
                                       :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="upstream_import" label="合同开始时间" prop="name">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"
                                        style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="合同结束时间" prop="name">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date2"
                                        style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </div>
                <el-tabs type="card" value="first">
                    <el-tab-pane label="模版一" name="first">
                        <div class="card_first">
                            <div>缴费期间</div>
                            <div>折标系数</div>
                        </div>
                        <div class="card_first">
                            <div>1年交</div>
                            <div><input v-model="ruleForm.card_first" type="text"/>%</div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="模版二" name="second">
                        <el-form-item id="card_2" label="行数">
                            <el-input v-model="card_2_hang"></el-input>
                            <el-button type="prmary" @click="createCard_2Hang">确定</el-button>
                        </el-form-item>
                        <div class="card_2_input">
                            <div>缴费期间</div>
                            <div>周岁起</div>
                            <div>周岁止</div>
                            <div>折标系数</div>
                        </div>
                        <div v-for="(item, index) in card_2" :key="index" class="card_2_input">
                            <div><input type="text" v-model="ruleForm.card_2[index].first" placeholder="年交/泵交"/></div>
                            <div><input type="text" v-model="ruleForm.card_2[index].second"/>周岁</div>
                            <div><input type="text" v-model="ruleForm.card_2[index].third"/>周岁</div>
                            <div><input type="text" v-model="ruleForm.card_2[index].fourth"/>%</div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
                <div class="bottom-toolbar">
                    <el-button @click="submitForm" type="primary" round icon="el-icon-success">
                        保存/提交
                    </el-button>
                    <el-button round @click="returnPrev">
                        返回
                    </el-button>
                </div>
            </el-form>
            <import-popup v-if="showPopup" @importData="importData" @cancel_popup="hideImportPopup"
                          :importPopup="product_name" :title="title"></import-popup>
        </div>
    </div>
</template>

<script>
    import {apiUpstreamFoldingSearch, apiUpstreamFoldingAdd} from "../../../request/api";
    import ImportPopup from "../../../common/ImportPopup";

    export default {
        name: "UpstreamFoldingAdd",
        components: {ImportPopup},
        data() {
            return {
                // supplierAdd: ['']
                card_2_hang: 0,
                ruleForm: {
                    supplierName: '',
                    productName: '',
                    product_code: '',
                    aboutAge: '',
                    date1: '',
                    date2: '',
                    card_first: '',
                    card_2: [],
                },
                rules: {
                    name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    region: [
                        {required: true, message: '请选择活动区域', trigger: 'change'}
                    ],
                    date1: [
                        {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
                    ],
                    date2: [
                        {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
                    ],
                    type: [
                        {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
                    ],
                    resource: [
                        {required: true, message: '请选择活动资源', trigger: 'change'}
                    ],
                    desc: [
                        {required: true, message: '请填写活动形式', trigger: 'blur'}
                    ],
                    aboutAge: [
                        {required: true, message: '请选择与年龄是否相关', trigger: 'blur'}
                    ]
                },
                card_2: [],
                aboutAge: [],
                product_name: [],
                supplier_niceName: [],
                showPopup: false,
                title: '产品列表',
                productName: '',
                importPopupData: []
            }
        },
        created() {
            apiUpstreamFoldingSearch().then(res => {
                this.aboutAge = res.Data.aboutAge;
                this.product_name = res.Data.product_name;
                this.supplier_niceName = res.Data.supplier_niceName;
                window.console.log(res);
            })
        },
        methods: {
            createCard_2Hang() {
                this.card_2 = [];
                for (let i = 1; i <= this.card_2_hang; i++) {
                    this.card_2.push('1');
                    this.ruleForm.card_2.push({first: '', second: '', third: '', fourth: ''});
                }
            },
            submitForm() {
                apiUpstreamFoldingAdd(this.ruleForm).then(res => {
                    window.console.log(res);
                })
            },
            importData(val) {
                // window.console.log(val);
                this.ruleForm.productName = val.productName;
                this.showPopup = false;
            },
            hideImportPopup() {
                this.showPopup = false;
            },
            chooseProduct() {
                this.showPopup = true;
            },
            returnPrev() {
                this.$emit('showSearch');
            }
        }
    }
</script>

<style scoped>
    #card_2 {
        width: 100%;
        height: 40px;
    }

    #card_2 >>> .el-form-item__content {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
    }

    #card_2 >>> .el-form-item__content .el-input,
    #card_2 >>> .el-form-item__content .el-button {
        width: 200px;
    }

    .card_2_input {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
    }
    .card_2_input > div {
        width: 25%;
        font-size: 16px;
        color: #999;
        height: 40px;
        line-height: 40px;
        text-align: center;
    }

    .form_submit >>> .el-form-item__content {
        display: flex;
        justify-content: space-between;
    }

    .upstream_import >>> .el-form-item__content button {
        background-color: #4074e1;
        color: #fff;
    }

    .upstream_import >>> .el-form-item__content {
        display: flex;
        justify-content: space-between;
    }

    .upstreamFOldingAdd {
        width: 100%;
        font-size: 16px;
        min-height: 500px;
        /*background-color: red;*/
    }

    .row_3 {
        width: 100%;
        display: flex;
        justify-content: flex-start;
    }

    .row_3 .el-form-item {
        width: 33.33%;
    }

    .el-form-item__content .el-select {
        width: 100%;
    }

    .el-form-item__content >>> .el-form-item__error {
        display: none !important;
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

    .card_first {
        width: 100%;
        height: 40px;
        display: flex;
        margin: 10px 0;
        align-items: flex-start;
        justify-content: space-between;
    }

    .card_first :first-child {
        width: 50%;
        line-height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        color: #999;
    }

    .card_first :last-child {
        width: 50%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        color: #999;
    }

    .card_first :last-child input {
        height: 40px;
    }
</style>
<style lang="less" scoped>
    .el-form {
        padding: 20px;
    }

    /deep/ .el-form-item {
        margin-bottom: 20px;
        margin-right: 20px;

        &.is-required {
            > .el-form-item__label {
                color: #ef8411;
            }
        }
    }

    /deep/ .el-form-item__label {
        border: 1px solid #ddd;
        line-height: 34px;
        vertical-align: middle;
        white-space: nowrap;
        text-align: center;
        padding-right: 0;
        background-color: #fafafa;
    }

    /deep/ .el-form-item__content {
        line-height: 34px;
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
