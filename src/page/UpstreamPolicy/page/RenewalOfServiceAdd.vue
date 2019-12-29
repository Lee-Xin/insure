<template>
  <div>
    <div class="RenewalOfServiceAdd">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <div class="row_3">
          <el-form-item label="供应商" prop="supplierName" class="supplierListSearch_label">
            <el-select v-model="formInline.supplierName" placeholder="请选择">
              <el-option label="全部" value="0"></el-option>
              <el-option v-for="(item, index) in supplierName" :label="item" :value="item" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品名称" prop="productName" id="form_item_name">
            <el-select v-model="formInline.productName" placeholder="供应商简称">
              <el-option label="全部" value="0"></el-option>
              <el-option v-for="(item, index) in productName" :label="item" :value="item" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品代码" prop="productID">
            <el-input v-model="formInline.productID" placeholder="请输入产品代码"></el-input>
          </el-form-item>
        </div>

        <div class="row_3">
          <el-form-item label="采购类型" prop="procurement_type" class="supplierListSearch_label">
            <el-select v-model="formInline.procurement_type" placeholder="供应商简称">
              <el-option label="全部" value="0"></el-option>
              <el-option v-for="(item, index) in procurement_type" :label="item" :value="item" :key="index"></el-option>
            </el-select>
          </el-form-item>


          <el-form-item label="开始时间" prop="name">
            <el-date-picker v-model="formInline.startTime" type="date" placeholder="选择日期"
                            style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" prop="name" class="supplierListSearch_label">
            <el-date-picker v-model="formInline.endTime" type="date" placeholder="选择日期"
                            style="width: 100%;"></el-date-picker>
          </el-form-item>

        </div>
        <div class="row_3">
          <el-form-item label="渠道名称" prop="channel_name">
            <el-input v-model="formInline.channel_name" placeholder="请输入渠道名称"></el-input>
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
          <el-form-item class="template" label="行数">
            <el-input v-model="tem_hang" type="number" placeholder="0"></el-input>
            <el-button @click="grengeTableThreeHang">确定</el-button>
          </el-form-item>
          <el-form-item class="template" label="列数">
            <el-input v-model="tem_lie" type="number" placeholder="0"></el-input>
            <el-button @click="grengeTableThreeLie">确定</el-button>
          </el-form-item>
          <el-form-item label="奖励方式">
            <el-select v-model="formInline.reward_way">
              <el-option v-for="(item, index) in reward_way" :label="item" :value="item" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <div class="template_table" v-for="(item, index) in tableThreeHang" :key="index">
            <div class="template_table_th">
              <div>承保业绩P(元)</div>
              <div v-for="(it, id) in tableThreeLie" :key="id">年交</div>
            </div>
            <div class="template_table_th">
              <div><input v-model="formInline.card[index][0]" type="text"/>大于等于P小于<input v-model="formInline.card[index][1]" type="text"/></div>
              <div v-for="(it, ind) in tableThreeLie" :key="ind"><input v-model="formInline.card[index][ind+2]" type="text"/>元</div>
            </div>
          </div>
        </el-tabs>
        <el-form-item class="continuation_button">
          <el-button type="primary" @click="submitAdd">保存/提交</el-button>
          <el-button @click="returnPrev">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
    import {apiRenewalServiceParam, apiRenewalServiceAdd} from "../../../request/api";

    export default {
        name: "RenewalOfServiceAdd",
        data() {
            return {
                formInline: {
                    supplierName: '',
                    productName: '',
                    productID: '',
                    procurement_type: '',
                    startTime: '',
                    endTime: '',
                    channel_name: '',
                    protocol_type: '',
                    reward_way: '',
                    card: []
                },
                tem_hang: 0,
                tem_lie: 0,
                tableThreeHang: [],
                tableThreeLie: [],
                tableData: [],

                supplierName: [],
                productName: [],
                procurement_type: [],
                protocol_type: [],
                reward_way: [],

                card_item: []
            }
        },
        methods: {
            submitAdd() {
                apiRenewalServiceAdd(this.formInline).then(res => {
                    window.console.log(res);
                })
            },
            grengeTableThreeLie() {
                this.tableThreeLie = [];
                this.card_item = [''];
                for (let i = 1; i <= this.tem_lie; i++) {
                    this.card_item.push('');
                    this.tableThreeLie.push(i);
                }
                window.console.log('card_itm=',this.card_item);
                window.console.log('lie:'+'\t'+this.tableThreeLie);
            },
            grengeTableThreeHang() {
                this.tableThreeHang = [];
                this.formInline.card = [];
                for (let i = 1; i <= this.tem_hang; i++) {
                    this.formInline.card.push(this.card_item);
                    this.tableThreeHang.push(i);
                }
                window.console.log('forminline:',this.formInline);
                window.console.log('hang:'+'\t'+typeof this.tableThreeHang)
            },
            returnPrev() {
                this.$emit('showSearch');
            },
            grengeTable() {
                for (let i = 1; i <= this.mobanTwo.num; i++) {
                    this.numArray.push(i)
                }
            }
        },
        created() {
            apiRenewalServiceParam().then(res => {
                this.supplierName = res.Data.supplierName;
                let product_name = res.Data.product_name;
                this.productName = [];
                product_name.forEach(item => {
                    this.productName.push(item['productName']);
                })
                this.procurement_type = res.Data.procurement_type;
                this.protocol_type = res.Data.protocol_type;
                this.reward_way = res.Data.reward_way;
            })
        }
    }
</script>

<style scoped>
  .RenewalOfServiceAdd {
    width: 100%;
    min-height: 500px;
    /*background-color: red;*/
  }

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