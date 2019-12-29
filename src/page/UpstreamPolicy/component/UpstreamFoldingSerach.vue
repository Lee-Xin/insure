<template>
  <div class="centent">
    <el-form :inline="true" :model="formInline" class="demo-form-inline supplierListSearchForm">
      <el-form-item label="供应商" prop="supplier_niceName" class="supplierListSearch_label">
        <el-select v-model="formInline.supplier_niceName" placeholder="供应商简称">
          <el-option v-for="(item , index) in supplier_niceName" :label="item" :value="item" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品名称" prop="product_name" id="form_item_name">
        <el-input v-model="formInline.product_name" placeholder="请选择产品名称"></el-input>
        <el-button type="primary" @click="showImportPopup">导入</el-button>
      </el-form-item>
      <el-form-item label="产品代码" prop="product_id">
        <el-input v-model="formInline.product_id" placeholder="请输入产品代码"></el-input>
      </el-form-item>
      <el-form-item label="与年龄是否有关" prop="aboutAge">
        <el-select v-model="formInline.aboutAge">
          <el-option v-for="(item, index) in aboutAge" :label="item" :value="item" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="upstreamFoldingSearch">搜索</el-button>
      </el-form-item>
    </el-form>

    <div class="upstreamFolding_table">
      <div class="table_button">
        <el-button type="primary">复制</el-button>
        <el-button type="primary">同步到下游</el-button>
        <el-button type="primary" @click="addUpstreamFolding">添加</el-button>
      </div>
    </div>

    <el-table @row-click="openDetails" :data="tableData" style="width: 100%">
      <el-table-column prop="supplierName" label="供应商简称"></el-table-column>
      <el-table-column prop="productName" label="产品名称"></el-table-column>
      <el-table-column prop="productID" label="产品代码"></el-table-column>
      <el-table-column id="tableData_font" prop="查看详情" label="折标系数">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleCard(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="startTime" label="开始时间"></el-table-column>
      <el-table-column prop="endTime" label="结束时间"></el-table-column>
    </el-table>

    <div class="popup_window" v-if="showPopup">
      <div class="popup_div">
        <div class="popup_div_title">折标系数详情</div>
        <div class="popup_div_table">
          <el-table :data="tableDataDetails" style="width: 100%; padding: 0 30px;">
            <el-table-column prop="id" label="序号"></el-table-column>
            <el-table-column prop="payment_time" label="交费期间"></el-table-column>
            <el-table-column prop="fold_coefficient" label="折标系数"></el-table-column>
          </el-table>
        </div>
        <div class="popup_button">
          <el-button @click="cancelPopup">取消</el-button>
          <el-button @click="cancelPopup">确认</el-button>
        </div>
      </div>
    </div>
    <div class="upstreamFolding_PageInation">
      <page-ination @changeSize="changeSize" @changeCurrentPage="changeCurrentPage" :total="totalNum"></page-ination>
    </div>
    <import-popup v-if="isShowImportPopup" @importData="importData" @cancel_popup="hideImportPopup" :importPopup="product_name" :title="title"></import-popup>
  </div>
</template>

<script>
    import PageInation from "../../../common/PageInation";
    import {apiUpstreamFoldingSearch,apiUpstreamFoldingPageInation, apiUpstreamFolding} from "../../../request/api";
    import ImportPopup from "../../../common/ImportPopup";

    export default {
        name: "UpstreamFoldingSerach",
        components: {ImportPopup, PageInation},
        data() {
            return {
                formInline: {
                    product_name: '',
                    supplier_niceName: '',
                    product_id: '',
                    aboutAge: '全部'
                },
                title: '产品列表',
                showPopup: false,
                tableDataDetails: [],
                aboutAge: [],
                product_name: [],
                supplier_niceName: [],
                isShowImportPopup: false,
                tableData: [],
                pageIndex: 1,
                pageSize: 50,
                totalNum: 0
            }
        },
        created() {
            apiUpstreamFoldingSearch().then(res => {
                this.aboutAge = res.Data.aboutAge;
                this.product_name = res.Data.product_name;
                this.supplier_niceName = res.Data.supplier_niceName;
                // window.console.log(res)
            })
            apiUpstreamFoldingPageInation({
                pageIndex: 1,
                pageSize: 50
            }).then(res => {
                this.totalNum = res.Data.totalNum;
                this.tableData = res.Data.pipeiData;
                // window.console.log(res);
            })
        },
        methods: {
            changeSize(val) {
              this.pageSize = val;
            },
            changeCurrentPage(val) {
              this.pageIndex = val;
              apiUpstreamFoldingPageInation({
                  pageIndex: this.pageIndex,
                  pageSize: this.pageSize
              }).then(res => {
                  this.tableData = res.Data.pipeiData;
              })
            },
            upstreamFoldingSearch() {
              apiUpstreamFolding(this.formInline).then(res => {
                  this.tableData = res.Data;
              })
            },
            importData(row) {
                // window.console.log(row);
                this.isShowImportPopup = false;
                this.formInline.product_name = row.productName;
            },
            hideImportPopup() {
                this.isShowImportPopup=false;
            },
            addUpstreamFolding() {
                // this.showAddUpstreamFolding = true;
                this.$emit('showAddUpstream');
            },
            cancelPopup (){
                this.tableDataDetails = [];
                this.showPopup = false;
            },
            openDetails(row) {
                window.console.log('hang' + row);
            },
            handleCard(row) {
                this.tableDataDetails = row.foldCoefficient;
                this.showPopup = true;
            },
            showImportPopup() {
                this.isShowImportPopup = true;
            }
        }
    }
</script>

<style scoped>
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

  .popup_div_table{
    width: 100%;
    height: 200px;
    overflow-y: scroll;
  }

  .centent {
    width: 100%;
    height: 40px;
  }

  #form_item_name >>> .el-form-item__content .el-input,
  #form_item_name >>> .el-form-item__content .el-button {
    width: 50%;
  }

  .table_button {
    width: 100%;
    height: 40px;
    padding-top: 20px;
    padding-bottom: 10px;
    margin-top: 20px;
    /*background-color: blue;*/
    border-top: 1px solid #999;
    border-bottom: 1px solid #999;
  }

  .table_button button {
    margin: 0 30px;
  }

  .el-table >>> .el-table__body .el-table_1_column_4 {
    color: rgb(255, 152, 0);
    cursor: pointer;
  }
</style>