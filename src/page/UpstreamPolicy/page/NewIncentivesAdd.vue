<template>
    <div style="height: 100%; background-color: #fff;">
        <div class="NewIncentivesAdd">
            <el-form :inline="true" label-width="100px" :rules="rules" :model="formInline" class="demo-form-inline">
                <div class="row_3">
                    <el-form-item label="供应商" prop="suplierName" class="supplierListSearch_label">
                        <el-select v-model="formInline.suplierName" placeholder="请选择">
                            <el-option label="全部" value="0"></el-option>
                            <el-option v-for="(item, index) in suplierName" :label="item" :value="item"
                                       :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="产品名称" prop="productName" id="form_item_name">
                        <el-input style="width: calc(100% - 60px);" v-model="formInline.productName"
                                  placeholder="产品名称"></el-input>
                        <el-button style="width: 60px;" type="primary" @click="chooseProduct">导入</el-button>
                    </el-form-item>
                    <el-form-item label="产品代码" prop="productId">
                        <el-input v-model="formInline.productId" placeholder="请输入产品代码"></el-input>
                    </el-form-item>
                </div>

                <div class="row_3">
                    <el-form-item label="采购类型" prop="procurement_type" class="supplierListSearch_label">
                        <el-select v-model="formInline.procurement_type" placeholder="供应商简称">
                            <el-option label="全部" value="0"></el-option>
                            <el-option label="总对总" value="1"></el-option>
                            <el-option label="分对分" value="2"></el-option>
                            <el-option label="总对分" value="3"></el-option>
                            <el-option label="分对总" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="渠道名称" prop="channel_name">
                        <el-input v-model="formInline.channel_name" placeholder="请输入渠道名称"></el-input>
                    </el-form-item>

                    <el-form-item label="开始时间" prop="startTime">
                        <el-date-picker v-model="formInline.startTime" type="date" placeholder="选择日期"
                                        style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </div>
                <div class="row_3">
                    <el-form-item label="结束时间" prop="endTime" class="supplierListSearch_label">
                        <el-date-picker v-model="formInline.endTime" type="date" placeholder="选择日期"
                                        style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="费用类型" prop="cost_type">
                        <el-select v-model="formInline.cost_type" placeholder="请选择">
                            <el-option label="开门红季度特别推动" value="0"></el-option>
                            <el-option label="销售奖金（浮动）" value="1"></el-option>
                            <el-option label="月度特别推动" value="2"></el-option>
                            <el-option label="月度绩效" value="3"></el-option>
                            <el-option label="年终终奖金" value="4"></el-option>
                            <el-option label="年度补充" value="5"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="费用名称" prop="cost_name">
                        <el-input v-model="formInline.cost_name" placeholder="费用名称"></el-input>
                    </el-form-item>
                </div>
                <div class="row_3">
                    <el-form-item label="销量统计方式" prop="sales_statistics" class="supplierListSearch_label">
                        <el-select v-model="formInline.sales_statistics" placeholder="请选择">
                            <el-option label="规模保费" value="0"></el-option>
                            <el-option label="标准保费" value="1"></el-option>
                            <el-option label="佣金" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="比例基数" prop="scale_base">
                        <el-select v-model="formInline.scale_base" placeholder="请选择">
                            <el-option label="保费" value="0"></el-option>
                            <el-option label="标保" value="1"></el-option>
                            <el-option label="佣金+奖金" value="2"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="协议类型" prop="protocol_type">
                        <el-select v-model="formInline.protocol_type" placeholder="请选择">
                            <el-option label="框架协议" value="0"></el-option>
                            <el-option label="政策协议" value="1"></el-option>
                            <el-option label="阶段协议" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </div>

                <el-tabs type="border-card">
                    <el-tab-pane label="模版一">
                        <div class="mobanyi-th">
                            <div>交费期间</div>
                            <div>第一年度佣金</div>
                            <div>第二年度佣金</div>
                            <div>第三年度佣金</div>
                            <div>第四年度佣金</div>
                            <div>第五年度佣金</div>
                            <div>第六年度以上佣金</div>
                        </div>
                        <div class="mobanyi-th">
                            <div>1年交</div>
                            <div><input v-model="formInline.card_1[0].first" type="text">%</div>
                            <div><input v-model="formInline.card_1[0].second" type="text">%</div>
                            <div><input v-model="formInline.card_1[0].third" type="text">%</div>
                            <div><input v-model="formInline.card_1[0].fourth" type="text">%</div>
                            <div><input v-model="formInline.card_1[0].fifth" type="text">%</div>
                            <div><input v-model="formInline.card_1[0].sixth" type="text">%</div>
                        </div>

                    </el-tab-pane>
                    <el-tab-pane label="模版二" style="text-align: left;">
                        <el-form-item style="display: inline-block!important;" class="template" label="行数">
                            <el-input style="width: calc(100% - 60px);" v-model="mobanTwo.num" type="number"
                                      placeholder="0"></el-input>
                            <el-button style="width: 60px;" type="primary" @click="grengeTable">确定</el-button>
                        </el-form-item>
                        <el-form-item style="display: inline-block!important;" label="奖励方式">
                            <el-select>
                                <el-option v-model="formInline.card_2.reward_way" v-for="(item, index) in reward_way"
                                           :label="item" :value="item" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <div class="template_table" v-for="(item, index) in numArray" :key="index">
                            <div class="template_table_th">
                                <div>承保业绩P(元)</div>
                                <div>金额</div>
                            </div>
                            <div class="template_table_th">
                                <div><input type="text"
                                            v-model="formInline.card_2.card_2_data[index].first"/>大于等于P小于<input
                                    type="text"/></div>
                                <div><input type="text" v-model="formInline.card_2.card_2_data[index].second"/>元</div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="模版三" style="text-align: left;">
                        <el-form-item style="display: inline-block!important;" class="template" label="行数">
                            <el-input style="width: calc(100% - 60px);" v-model="mobanThree.hang" type="number" placeholder="0"></el-input>
                            <el-button style="width: 60px;" type="primary" @click="grengeTableThreeHang">确定</el-button>
                        </el-form-item>
                        <el-form-item style="display: inline-block!important;" class="template" label="列数">
                            <el-input style="width: calc(100% - 60px);" v-model="mobanThree.lie" type="number" placeholder="0"></el-input>
                            <el-button style="width: 60px;" type="primary" @click="grengeTableThreeLie">确定</el-button>
                        </el-form-item>
                        <el-form-item style="display: inline-block!important;" label="奖励方式">
                            <el-select>
                                <el-option label="固定金额" value="shanghai"></el-option>
                                <el-option label="固定比例" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <div class="template_table" v-for="(item, index) in tableThreeHang" :key="index">
                            <div class="template_table_th">
                                <div>承保业绩P(元)</div>
                                <div v-for="(it, ind) in tableThreeLie" :key="ind">年交</div>
                            </div>
                            <div class="template_table_th">
                                <div><input type="text"/>大于等于P小于<input type="text"/></div>
                                <div v-for="(it, ind) in tableThreeLie" :key="ind"><input type="text"/>元</div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
                <div class="bottom-toolbar">
                    <el-button @click="submitSave" type="primary" round icon="el-icon-success">
                        保存/提交
                    </el-button>
                    <el-button round @click="returnPrev">
                        返回
                    </el-button>
                </div>
            </el-form>
        </div>
        <import-popup v-if="showPopup" @importData="importData" @cancel_popup="hideImportPopup"
                      :importPopup="productName" :title="title"></import-popup>
    </div>
</template>

<script>
    import {apiNewIncentivesParam, apiNewIncentivesAdd} from "../../../request/api";
    import ImportPopup from "../../../common/ImportPopup";

    export default {
        name: "NewIncentivesAdd",
        components: {ImportPopup},
        data() {
            return {
                title: '产品列表',
                showPopup: false,
                mobanThree: {
                    hang: 0,
                    lie: 0
                },
                tableThreeHang: [],
                tableThreeLie: [],
                numArray: [],
                mobanTwo: {
                    num: 0
                },
                formInline: {
                    suplierName: '',
                    productName: '',
                    productId: '',
                    procurement_type: '',
                    channel_name: '',
                    startTime: '',
                    endTime: '',
                    cost_type: '',
                    cost_name: '',
                    sales_statistics: '',
                    scale_base: '',
                    protocol_type: '',
                    card_1: [{'first': '', 'second': '', 'third': '', 'fourth': '', 'fifth': '', 'sixth': ''}],
                    card_2: {
                        'hangNum': 0,
                        'reward_way': '',
                        'card_2_data': []
                    },
                    // card_3: {
                    //     'hangNum':0,
                    //     'lieNum':0,
                    //     'reward_way': [],
                    //     'card_3_data': []
                    // }
                },
                rules: {
                    suplierName: [{required: true, message: '请选择供应商'}],
                    productName: [{required: true, message: '请选择产品'}],
                    procurement_type: [{required: true, message: '请选择采购类型'}],
                    startTime: [{required: true, message: '请选择开始时间'}],
                    endTime: [{required: true, message: '请选择结束时间'}],
                    cost_type: [{required: true, message: '请选择费用类型'}],
                    sales_statistics: [{required: true, message: '请选择销量统计方式'}],
                    scale_base: [{required: true, message: '请选择比例基数'}],
                    protocol_type: [{required: true, message: '请选择协议类型'}],
                },
                suplierName: [],
                productName: [],
                tableData: [],
                reward_way: [],
                templateData: ['']
            }
        },
        methods: {
            submitSave() {
                apiNewIncentivesAdd(this.formInline).then(res => {
                    window.console.log(res);
                });
            },
            importData(val) {
                this.formInline.productName = val.productName;
                this.showPopup = false;
            },
            hideImportPopup() {
                this.showPopup = false;
            },
            chooseProduct() {
                this.showPopup = true;
            },
            grengeTableThreeLie() {
                this.tableThreeLie = [];
                for (let i = 1; i <= this.mobanThree.lie; i++) {
                    this.tableThreeLie.push(i);
                }
            },
            grengeTableThreeHang() {
                this.tableThreeHang = [];
                for (let i = 1; i <= this.mobanThree.hang; i++) {
                    this.tableThreeHang.push(i);
                }
            },
            returnPrev() {
                this.$emit('showSearch')
            },
            grengeTable() {
                this.formInline.card_2.card_2_data = [];
                this.numArray = [];
                for (let i = 1; i <= this.mobanTwo.num; i++) {
                    this.formInline.card_2.card_2_data.push({'first': '', 'second': ''});
                    this.numArray.push(i)
                }
            }
        },
        created() {
            apiNewIncentivesParam().then(res => {
                this.suplierName = res.Data.suplierName;
                this.productName = res.Data.productName;
                this.reward_way = res.Data.reward_way;
                window.console.log(res);
            })
        }
    }
</script>

<style scoped>
    .template_table_th {
        width: 100%;
        height: 40px;
        font-size: 14px;
        color: #999;
        display: flex;
        justify-content: space-between;
    }

    .template_table_th div {
        width: 50%;
        height: 40px;
        text-align: center;
        line-height: 40px;
    }

    .template_table_th div input {
        width: 12%;
        height: 24px;
        border: 1px solid #999;
    }

    .NewIncentivesAdd {
        width: 100%;
        min-height: 300px;
        /*background-color: red;*/
    }

    .row_3 {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .row_3 .el-form-item {
        width: 33.33%;
    }

    .table_button button {
        margin: 0 30px;
    }

    .el-table >>> .el-table__body .el-table_1_column_4 {
        color: rgb(255, 152, 0);
        cursor: pointer;
    }

    .mobanyi-th {
        width: 100%;
        height: 40px;
        display: flex;
        font-size: 16px;
        color: #999;
        align-items: center;
        justify-content: space-between;
    }

    .mobanyi-th div {
        width: 14.285%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        /*border: 1px solid #000;*/
    }

    .mobanyi-th div input {
        width: 30%;
    }

    .continuation_button {
        margin-top: 30px;
    }

    .continuation_button >>> .el-form-item__content {
        display: flex;
        justify-content: space-between;
    }

    .continuation_button >>> .el-form-item__content button {
        width: 60%;
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
