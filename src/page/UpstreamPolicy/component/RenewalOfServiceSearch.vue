<template>
  <div>
    <div class="RenewalOfServiceSearch">
      <el-form :inline="true" :model="form" class="demo-form-inline supplierListSearchForm">
        <div class="row_3">
          <el-form-item label="供应商" prop="supplier_niceName">
            <el-select placeholder="供应商简称" v-model="form.supplierName">
              <el-option label="全部" value="0"></el-option>
              <el-option v-for="(item, index) in supplierName" :label="item" :value="item" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品名称" prop="product_name" id="form_item_name">
            <el-select placeholder="供应商简称" v-model="form.product_name">
              <el-option label="全部" value="0"></el-option>
              <el-option v-for="(item, index) in product_name" :label="item" :value="item" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品代码" prop="productID">
            <el-input  v-model="form.productID" placeholder="请输入产品代码"></el-input>
          </el-form-item>
        </div>

        <div class="row_3">
          <el-form-item label="采购类型" prop="procurement_type" class="supplierListSearch_label">
            <el-select placeholder="全部" v-model="form.procurement_type">
              <el-option label="全部" value="0"></el-option>
              <el-option v-for="(item, index) in procurement_type" :label="item" :value="item" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="渠道名称" prop="channel_name">
            <el-input placeholder="请输入渠道名称" v-model="form.channel_name"></el-input>
          </el-form-item>
          <el-form-item label="协议类型" prop="protocol_type" id="form_item_name">
            <el-select placeholder="协议类型" v-model="form.protocol_type">
              <el-option label="全部" value="0"></el-option>
              <el-option v-for="(item, index) in protocol_type" :label="item" :value="item" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" @click="queryRenewal">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="continuationRate_table">
        <div class="continuation_table_add">
          <el-button type="primary">复制</el-button>
          <el-button @click="showAdd">添加</el-button>
        </div>
      </div>
      <div class="continuation_table_box">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="序号"></el-table-column>
          <el-table-column prop="suplierName" label="供应商"></el-table-column>
          <el-table-column prop="productName" label="产品名称"></el-table-column>
          <el-table-column prop="productId" label="产品代码"></el-table-column>
          <el-table-column prop="procurement_type" label="渠道政策"></el-table-column>
          <el-table-column prop="channel_name" label="渠道名称"></el-table-column>
          <el-table-column prop="cost_type" label="协议类型"></el-table-column>
          <el-table-column prop="cost_name" label="续费服务">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleCard(scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="startTime" label="开始时间"></el-table-column>
          <el-table-column prop="endTime" label="结束时间"></el-table-column>
        </el-table>
        <div class="popup_window" v-if="showPopup">
          <div class="popup_div">
            <div class="popup_div_title">续费服务详情</div>
            <div class="popup_div_table">
              <el-table :data="tableDataDetails" style="width: 100%; padding: 0 30px;">
                <el-table-column prop="policy_year" label="保单年度起     保单年度止"></el-table-column>
                <el-table-column prop="5_year" label="5年"></el-table-column>
                <el-table-column prop="10_year" label="10年"></el-table-column>
                <el-table-column prop="15_yeary" label="15年"></el-table-column>
                <el-table-column prop="20_yeary" label="20年及以上"></el-table-column>
              </el-table>
            </div>
            <div class="popup_button">
              <el-button @click="cancelPopup">取消</el-button>
              <el-button @click="cancelPopup">确认</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="upstreamFolding_PageInation">
        <page-ination @changeSize="changeSize" @changeCurrentPage="changeCurrentPage" :total="totalNum"></page-ination>
      </div>
    </div>
  </div>
</template>

<script>
    import {apiRenewalServiceParam, apiRenewalServiceSearch, apiRenewalServicePageInation} from "../../../request/api";
    import PageInation from "../../../common/PageInation";

    export default {
        name: "RenewalOfServiceSearch",
        components: {PageInation},
        data() {
            return {
                form: {
                    supplierName: '',
                    product_name: '',
                    productID: '',
                    procurement_type: '',
                    channel_name: '',
                    protocol_type: ''
                },
                supplierName: [],
                tableDataDetails: Array,
                showPopup: false,
                tableData: [],
                product_name: [],
                procurement_type: [],
                protocol_type: [],
                pageIndex: 1,
                pageSize: 50,
                totalNum: 0,
            }
        },
        methods: {
            changeSize(val) {
                this.pageSize = val;
            },
            changeCurrentPage(val) {
                this.pageIndex = val;
                apiRenewalServicePageInation({
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize
                }).then(res => {
                    this.totalNum = res.Data.totalNum;
                    window.console.log(res)
                });
            },
            queryRenewal() {
                apiRenewalServiceSearch(this.form).then(res => {
                    this.tableData = res.Data;
                    window.console.log(res);
                })
            },
            handleCard(row){
                // window.console.log(row.renewal_service)
                this.tableDataDetails = row.renewal_service;
                window.console.log(this.tableDataDetails)
                // this.tableDataDetails
                this.showPopup = true;
            },
            cancelPopup() {
                this.showPopup = false;
            },
            showAdd() {
                this.$emit('showAdd')
            }
        },
        created() {
            apiRenewalServicePageInation({
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            }).then(res => {
                this.tableData = res.Data.pipeiData;
                this.totalNum = res.Data.totalNum;
            });
            apiRenewalServiceParam().then(res => {
                this.supplierName = res.Data.supplierName;
                window.console.log(res);
                let product_name_object = res.Data.product_name;
                product_name_object.forEach(item => {
                  this.product_name.push(item.productName);
                })
                this.procurement_type = res.Data.procurement_type;
                this.protocol_type = res.Data.protocol_type;
            })
        }
    }
</script>

<style scoped>
  .RenewalOfServiceSearch {
    width: 100%;
    min-height: 500px;
    font-size: 14px;
    color: #999;
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

  .continuationRateBounsSearch {
    width: 100%;
    /*background-color: red;*/
    min-height: 500px;
  }

  .continuationRate_table {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    /*background-color: red;*/
    justify-content: space-between;
  }

  .continuationRate_table button {
    margin-right: 50px;
    background-color: #2db7f5;
    font-size: 16px;
    color: #fff;
    border: 0;
  }

  .continuation_table_box {
    width: 100%;
    /*background-color: red;*/
    min-height: 300px;
  }

  .popup_button button{
    margin-right: 30px;
  }
  .popup_button{
    width: 100%;
    height: 40px;
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: flex-end;
  }
  .popup_div_title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #fff;
    text-align: center;
    font-size: 16px;
    background-color: #4074e1;
  }

  .popup_window {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 500;
    /*display: none;*/
    background-color: rgba(0, 0, 0, .5);
  }

  .popup_div {
    width: 600px;
    height: 300px;
    border-radius: 0 0 10px 10px;
    position: absolute;
    top: 50%;
    margin-top: -150px;
    left: 50%;
    margin-left: -300px;
    background-color: #fff;
  }
</style>
