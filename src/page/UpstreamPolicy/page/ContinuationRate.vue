<template>
    <div style="height: 100%; background-color: #fff;">
        <div class="contnuationRate">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <div class="row_3">
                    <el-form-item label="供应商" prop="suplierName">
                        <el-select v-model="ruleForm.suplierName" placeholder="供应商简称">
                            <el-option v-for="(item, index) in suplierName" :label="item" :value="item"
                                       :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="contnuation_rate_productName" label="产品名称" prop="productName">
                        <el-input style="width: calc(100% - 60px);" v-model="ruleForm.productName"
                                  placeholder="请选择产品名称"></el-input>
                        <el-button type="primary" style="width: 60px;" @click="showPopupFn">导入</el-button>
                    </el-form-item>
                    <el-form-item label="产品代码" prop="productId">
                        <el-input v-model="ruleForm.productId" placeholder="请输入产品代码"></el-input>
                    </el-form-item>
                </div>
                <div class="row_3">
                    <el-form-item label="采购类型" prop="procurement_type">
                        <el-select v-model="ruleForm.procurement_type" placeholder="采购类型">
                            <el-option v-for="(item, index) in procurement_type" :label="item" :value="item"
                                       :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="渠道名称" prop="channel_name">
                        <el-input v-model="ruleForm.channel_name" placeholder="请输入渠道名称"></el-input>
                    </el-form-item>
                    <el-form-item label="协议类型" prop="protocol_type">
                        <el-select v-model="ruleForm.protocol_type" placeholder="协议类型">
                            <el-option v-for="(item, index) in protocol_type" :label="item" :value="item"
                                       :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="row_3">
                    <el-form-item label="开始时间" prop="startTime">
                        <el-date-picker type="date" placeholder="请选择" v-model="ruleForm.startTime"
                                        style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束时间" prop="endTime">
                        <el-date-picker type="date" placeholder="请选择" v-model="ruleForm.endTime"
                                        style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item prop="protocol_type">
                    </el-form-item>
                </div>
                <div class="row_3">
                    <el-form-item label="行数" prop="row">
                        <el-input v-model="row" placeholder="0"></el-input>
                        <el-button type="primary" @click="createMoBan">确定</el-button>
                    </el-form-item>
                    <el-form-item label="奖励方式" prop="renewal_rates">
                        <el-select v-model="ruleForm.renewal_rates" placeholder="固定比例">
                            <el-option v-for="(item, index) in renewal_rates" :label="item" :value="item"
                                       :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item></el-form-item>
                </div>
                <el-tabs value="first" type="card" @tab-click="handleClick">
                    <el-tab-pane label="模版一" name="first">
                        <div class="template">
                            <div class="temp_th">
                                <div>继续率R</div>
                                <div>继续月奖金率R13</div>
                                <div>继续月奖金率R25</div>
                                <div>继续月奖金率R37</div>
                                <div>继续月奖金率R49</div>
                            </div>
                            <div class="temp_th" v-for="(item,index) in mobanyishuju" :key="index">
                                <div><input v-model="inputdata_first[index].first1" value="" type="text">% 大于等于R小于<input
                                    v-model="inputdata_first[index].first2" type="text">%
                                </div>
                                <div><input v-model="inputdata_first[index].second" value="" type="text">%</div>
                                <div><input v-model="inputdata_first[index].third" value="" type="text">%</div>
                                <div><input v-model="inputdata_first[index].fourth" value="" type="text">%</div>
                                <div><input v-model="inputdata_first[index].fifth" value="" type="text">%</div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="模版二" name="second">
                        <div class="template">
                            <div class="temp_th">
                                <div>承保业绩P（元）</div>
                                <div>继续月奖金R13</div>
                                <div>继续月奖金R25</div>
                                <div>继续月奖金R37</div>
                                <div>继续月奖金R49</div>
                            </div>
                            <div class="temp_th" v-for="(item,index) in mobanyishuju" :key="index">
                                <div><input v-model="inputdata_second[index].first1" type="text">大于等于P小于<input
                                    v-model="inputdata_second[index].first2" type="text"></div>
                                <div><input v-model="inputdata_second[index].second" type="text">元</div>
                                <div><input v-model="inputdata_second[index].third" type="text">元</div>
                                <div><input v-model="inputdata_second[index].fourth" type="text">元</div>
                                <div><input v-model="inputdata_second[index].fifth" type="text">元</div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
            <div class="bottom-toolbar">
                <el-button @click="ContinuationRateSubmit" type="primary" round icon="el-icon-success">
                    保存/提交
                </el-button>
                <el-button round @click="returnPrev">
                    返回
                </el-button>
            </div>
        </div>
        <import-popup v-if="showPopup" @importData="importData" @cancel_popup="hideImportPopup"
                      :importPopup="productName" :title="title"></import-popup>
    </div>
</template>

<script>
    import {apiContinuationRateBounsParam, apiContinuationRateBounsAdd} from "../../../request/api";
    import ImportPopup from "../../../common/ImportPopup";

    export default {
        name: "ContinuationRate",
        components: {ImportPopup},
        data() {
            return {
                mobanyishuju: [],
                tableRow: [1, 2, 3, 4, 5],
                ruleForm: {
                    suplierName: '',
                    productId: '',
                    procurement_type: '',
                    protocol_type: '',
                    renewal_rates: '',
                    productName: ''
                },
                rules: {
                    suplierName: [{required: true, message: '请选择供应商简称'}],
                    productName: [{required: true, message: '请选择产品名称'}],
                    procurement_type: [{required: true, message: '请选择采购类型'}],
                    protocol_type: [{required: true, message: '请选择协议类型'}],
                    startTime: [{required: true, message: '请选择开始时间'}],
                    endTime: [{required: true, message: '请选择结束时间'}],
                },
                row: 0,
                showPopup: false,
                procurement_type: [],
                productName: [],
                protocol_type: [],
                renewal_rates: [],
                suplierName: [],
                title: '产品列表',
                inputdata_first: [],
                inputdata_second: [],
            }
        },
        methods: {
            ContinuationRateSubmit() {
                apiContinuationRateBounsAdd({
                    ruleForm: this.ruleForm,
                    inputdata_first: this.inputdata_first,
                    inputdata_second: this.inputdata_second
                }).then(res => {
                    window.console.log(res);
                    if (res.StatusCode === 200) {
                        alert('您的数据已上传成功');
                    }
                })
                window.console.log(this.ruleForm)
            },
            importData(val) {
                // window.console.log(val);
                this.ruleForm.productName = val.productName;
                this.showPopup = false;
            },
            hideImportPopup() {
                this.showPopup = false;
            },
            handleClick(tab, event) {
                window.console.log(tab.name, event);
            },
            createMoBan: function () {
                this.mobanyishuju = [];
                this.inputdata_first = [];
                this.inputdata_second = [];
                for (let i = 1; i <= this.row; i++) {
                    this.mobanyishuju.push('1');
                    this.inputdata_first.push({first1: '', first2: '', second: '', third: '', fourth: '', fifth: ''});
                    this.inputdata_second.push({first1: '', first2: '', second: '', third: '', fourth: '', fifth: ''});
                }
                window.console.log(this.inputdata_first)
            },
            returnPrev: function () {
                this.$emit('showSearch');
            },
            showPopupFn() {
                this.showPopup = true;
            }
        },
        created() {
            apiContinuationRateBounsParam().then(res => {
                this.procurement_type = res.Data.procurement_type;
                this.productName = res.Data.productName;
                this.protocol_type = res.Data.protocol_type;
                this.renewal_rates = res.Data.renewal_rates;
                this.suplierName = res.Data.suplierName;
                // window.console.log(res);
            })
        }
    }
</script>

<style scoped>
    .template {
        width: 100%;
        height: auto;
        font-size: 16px;
        color: #999;
        /*background-color: red;*/
    }

    .temp_th {
        width: 100%;
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        /*background-color: #2db7f5;*/
    }

    .temp_th > div {
        width: 20%;
    }

    .temp_th > div > input {
        width: 26%;
        border: 1px solid #999;
    }

    .contnuationRate {
        width: 100%;
        height: auto;

        font-size: 16px;
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

</style>
<style lang="less" scoped>
    .el-form {
        padding: 10px;
    }

    /deep/ .el-form-item {
        margin-bottom: 20px;
        margin-right: 20px;
        display: flex !important;

        &.is-required {
            > .el-form-item__label {
                color: #ef8411;
            }
        }

        .el-form-item__content {
            flex: 1;
        }

        .el-select {
            width: 100%;
        }
    }

    /deep/ .el-form-item__label {
        border: 1px solid #bebebe;
        border-right-width: 0;
        line-height: 34px;
        height: 36px;
        vertical-align: middle;
        white-space: nowrap;
        text-align: center;
        padding-right: 0;
        background-color: #fafafa;
    }

    /deep/ .el-form-item__content {
        line-height: 34px;
        margin-left: 0 !important;
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
