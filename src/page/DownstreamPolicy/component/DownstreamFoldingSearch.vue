<template>
  <div>
    <div class="DownstreamFoldingSearch">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="供应商">
          <el-select v-model="form.supplierName" placeholder="供应商简称">
            <el-option label="全部" value="shanghai"></el-option>
            <el-option v-for="(item, index) in supplierName" :label="item" :value="item" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="product_name" label="产品名称">
          <el-input v-model="form.productName" placeholder="请选择产品名称"></el-input>
          <el-button type="primary" @click="showImport">导入</el-button>
        </el-form-item>
        <el-form-item label="与年龄是否有关">
          <el-select v-model="form.aboutAge" placeholder="请选择">
            <el-option label="全部" value="all"></el-option>
            <el-option v-for="(item, index) in aboutAge" :label="item" :value="item" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryData">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="form-button">
        <el-button>复制</el-button>
        <el-button>导出</el-button>
        <el-button @click="addButton">添加</el-button>
      </div>

      <div class="form-table">
        <el-table :data="tableData">
          <el-table-column prop="id" label="序号"></el-table-column>
          <el-table-column prop="supplierName" label="供应商简称"></el-table-column>
          <el-table-column prop="productName" label="产品名称"></el-table-column>
          <el-table-column prop="productID" label="产品代码"></el-table-column>
          <el-table-column prop="fold_coefficient" label="折标系数">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleCard_fold_coefficient(scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="value_coefficient" label="价值系数">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleCard_value_coefficient(scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="applicable_agencies" label="适用机构">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleCard_applicable_agencies(scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="startTime" label="开始时间"></el-table-column>
          <el-table-column prop="endTime" label="结束时间"></el-table-column>
        </el-table>
        <check-details @showPage="showPage" :title="title_details" v-if="showSearch" :tableEle="tableEle" :tableDataDetails="tableDataDetails"></check-details>
      </div>
      <page-ination @changeSize="changeSize" @changeCurrentPage="changeCurrentPage" :total="totalNum"></page-ination>
      <import-popup v-if="isShowImportPopup" @importData="importData" @cancel_popup="hideImportPopup" :importPopup="productName" :title="title"></import-popup>
    </div>
  </div>
</template>

<script>
    import {apiDownstreamFoldingParam, apiDownstreamFoldingSearch,apiDownstreamFoldingPageInation} from "../../../request/api";
    import CheckDetails from "../../../common/CheckDetails";
    import PageInation from "../../../common/PageInation";
    import ImportPopup from "../../../common/ImportPopup";

    export default {
        name: "DownstreamFoldingSearch",
        components: {ImportPopup, PageInation, CheckDetails},
        data() {
            return {
                title_details: '',
                title: '产品名称',
                form: {
                    supplierName: '',
                    productName: '',
                    aboutAge: '',
                },
                tableEle: {},
                tableData: [],
                tableDataDetails: [],
                showSearch: false,
                supplierName: [],
                isShowImportPopup: false,
                productName: [],
                aboutAge: [],
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
            },
            queryData() {
                apiDownstreamFoldingSearch(this.form).then(res => {
                    this.tableData = res.Data;
                })
            },
            importData(val) {
                this.form.productName = val.productName;
                this.isShowImportPopup = false;
            },
            hideImportPopup() {
                this.isShowImportPopup = false;
            },
            showImport() {
                this.isShowImportPopup = true;
            },
            addButton() {
                this.$emit('showAdd');
            },
            showPage() {
                this.showSearch = false
            },
            /*'id':'序号','during_period_fee':'交费期间','fold_coefficient':'折标系数'*/
            handleCard_fold_coefficient(row) {
                this.tableDataDetails = row.foldCoefficient;
                this.showSearch = true;
                this.title_details = '折标系数';
                this.tableEle = {'id':'序号','payment_time':'交费期间','fold_coefficient':'折标系数'};
            },
            handleCard_value_coefficient(row) {
                this.tableDataDetails = row.value_coefficient;
                this.showSearch = true;
                this.title_details = '价值系数';
                this.tableEle = {'id':'序号','during_period_fee':'交费期间','value_coefficient':'折标系数'};
            },
            handleCard_applicable_agencies(row){
                this.tableDataDetails = row.applicable_agencies;
                this.showSearch = true;
                this.title_details  ='适用机构';
                // this.tableEle = {'id':'序号','during_period_fee':'交费期间','fold_coefficient':'折标系数'};
            }
        },
        created() {
            apiDownstreamFoldingPageInation({
                pageIndex:this.pageIndex,
                pageSize:this.pageSize
            }).then(res => {
                this.totalNum = res.Data.totalNum;
                this.tableData = res.Data.pipeiData;
                window.console.log(res);
            });
            apiDownstreamFoldingParam().then(res => {
                this.supplierName = res.Data.supplierName;
                this.productName = res.Data.product_name;
                this.aboutAge = res.Data.aboutAge;
            });
        }
    }
</script>

<style scoped>
  .form-table {
    width: 100%;
    min-height: 300px;
    /*background-color: red;*/
    font-size: 14px;
    color: #999;
  }

  .DownstreamFoldingSearch {
    width: 100%;
    min-height: 500px;
    /*background-color: red;*/
  }

  .DownstreamFoldingSearch >>> .el-form {
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
  }

  .product_name >>> .el-form-item__content {
    display: flex;
  }

  .form-button {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-around;
  }

  .form-button button {
    width: 60px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: #2db7f5;
  }

</style>