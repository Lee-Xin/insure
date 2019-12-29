<template>
  <div>
    <div class="continuationRateBounsSearch">
      <el-form :inline="true" :model="formInline" class="demo-form-inline supplierListSearchForm">
        <div class="row_3">
          <el-form-item label="供应商" prop="suplierName">
            <el-select v-model="formInline.suplierName" placeholder="供应商简称">
              <el-option label="全部" value="全部"></el-option>
              <el-option v-for="(item, index) in suplierName" :label="item" :value="item" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品名称" prop="productName" id="form_item_name">
            <el-input v-model="formInline.productName" placeholder="产品名称"></el-input>
            <el-button type="primary" @click="chooseProduct">选择</el-button>
          </el-form-item>
          <el-form-item label="产品代码" prop="productId">
            <el-input v-model="formInline.productId" placeholder="请输入产品代码"></el-input>
          </el-form-item>
        </div>

        <div class="row_3">
          <el-form-item label="采购类型" prop="procurement_type" class="supplierListSearch_label">
            <el-select v-model="formInline.procurement_type" placeholder="供应商简称">
              <el-option label="全部" value="全部"></el-option>
              <el-option v-for="(item, index) in procurement_type" :label="item" :value="item" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="渠道名称" prop="channel_name">
            <el-input v-model="formInline.channel_name" placeholder="请输入渠道名称"></el-input>
          </el-form-item>
          <el-form-item label="费用类型" prop="cost_type" id="form_item_name">
            <el-select v-model="formInline.cost_type" placeholder="协议类型">
              <el-option label="全部" value="0"></el-option>
              <el-option v-for="(item, index) in cost_type" :label="item" :value="item" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="row_3">
          <el-form-item label="费用名称" prop="cost_name" class="supplierListSearch_label">
            <el-input v-model="formInline.cost_name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="模板类型" prop="moban_type">
            <el-select v-model="formInline.moban_type" placeholder="全部">
              <el-option label="全部" value="0"></el-option>
              <el-option v-for="(item, index) in moban_type" :label="item" :value="item" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="协议类型" prop="protocol_type" id="form_item_name">
            <el-select v-model="formInline.protocol_type" placeholder="协议类型">
              <el-option label="全部" value="0"></el-option>
              <el-option v-for="(item, index) in protocol_type" :label="item" :value="item" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" @click="queryForm">查询</el-button>
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
          <el-table-column prop="procurement_type" label="采购类型"></el-table-column>
          <el-table-column prop="protocol_type" label="协议类型"></el-table-column>
          <el-table-column prop="channel_name" label="渠道名称"></el-table-column>
          <el-table-column prop="cost_type" label="费用类型"></el-table-column>
          <el-table-column prop="cost_name" label="费用名称"></el-table-column>
          <el-table-column prop="cost_policy" label="费用政策"></el-table-column>
          <el-table-column prop="startTime" label="开始时间"></el-table-column>
          <el-table-column prop="endTime" label="结束时间"></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="upstreamFolding_PageInation">
      <page-ination @changeSize="changeSize" @changeCurrentPage="changeCurrentPage" :total="totalNum"></page-ination>
    </div>
    <import-popup v-if="showPopup" @importData="importData" @cancel_popup="hideImportPopup" :importPopup="productName" :title="title"></import-popup>
  </div>
</template>

<script>
  import {apiNewIncentivesParam, apiNewIncentivesSearch, apiNewIncentivesPageInation} from "../../../request/api";
  import PageInation from "../../../common/PageInation";
  import ImportPopup from "../../../common/ImportPopup";

  export default {
        name: "NewIncentivesSearch",
      components: {ImportPopup, PageInation},
      data() {
            return {
                title: '产品名称',
                showPopup: false,
                formInline: {
                    suplierName: '',
                    productName: '',
                    productId:'',
                    procurement_type:'',
                    channel_name:'',
                    cost_type:'',
                    cost_name:'',
                    moban_type:'',
                    protocol_type:''
                },
                suplierName:[],
                productName: [],
                procurement_type: [],
                moban_type: [],
                cost_type: [],
                protocol_type: [],
                tableData: [],
                pageSize: 50,
                pageIndex: 1,
                totalNum: 0
            }
        },
        created() {
            apiNewIncentivesParam().then(res => {
                this.suplierName = res.Data.suplierName;
                this.productName  =res.Data.productName;
                this.procurement_type = res.Data.procurement_type;
                this.cost_type = res.Data.cost_type;
                this.moban_type = res.Data.moban_type;
                this.protocol_type = res.Data.protocol_type;
                // window.console.log(res)
            })
            apiNewIncentivesPageInation({
                pageIndex:1,
                pageSize: 50
            }).then(res => {
                this.totalNum = res.Data.totalNum;
                this.tableData = res.Data.pipeiData;
            })
        },
        methods: {
            importData(val) {
                this.formInline.productName = val.productName;
                this.showPopup = false;
            },
            hideImportPopup(){
                this.showPopup = false;
            },
            chooseProduct() {
                this.showPopup = true;
            },
            changeSize(val) {
                this.pageSize = val;
            },
            changeCurrentPage(val){
                this.pageIndex = val;
                apiNewIncentivesPageInation({
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize
                }).then(res => {
                    this.totalNum = res.Data.totalNum;
                    this.tableData  =res.Data.pipeiData;
                })
            },
            queryForm() {
              apiNewIncentivesSearch(this.formInline).then(res => {
                  this.tableData = res.Data;
              })
            },
            showAdd() {
                this.$emit('showSearch');
            },
        }
    }
</script>

<style scoped>
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
  .continuationRate_table button{
    margin-right: 50px;
    background-color: #2db7f5;
    font-size: 16px;
    color: #fff;
    border: 0;
  }
  .continuation_table_box{
    width: 100%;
    /*background-color: red;*/
    min-height: 300px;
  }
</style>