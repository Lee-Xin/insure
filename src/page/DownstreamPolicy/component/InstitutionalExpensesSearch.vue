<template>
  <div>
    <div class="InstitutionalExpensesSearch">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="row_3">
          <el-form-item label="供应商">
            <el-select v-model="form.supplierName" placeholder="请选择">
              <el-option label="全部" value="全部"></el-option>
              <el-option v-for="(item, index) in supplierName" :label="item" :key="index" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品名称">
            <el-select v-model="form.productName" placeholder="请选择">
              <el-option v-for="(item, index) in productName" :label="item" :value="item" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品代码">
            <el-input v-model="form.productID" placeholder="请输入产品代码"></el-input>
          </el-form-item>
        </div>
        <div class="row_3">
          <el-form-item label="渠道政策">
            <el-select v-model="form.channel_policy" placeholder="请选择">
              <el-option v-for="(item, index) in channel_policy" :label="item" :value="item" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="适用对象">
            <el-input v-model="form.applicable_objects" placeholder="使用对象"></el-input>
          </el-form-item>
          <el-form-item label="费用类型">
            <el-select v-model="form.cost_type" placeholder="请选择">
              <el-option v-for="(item, index) in cost_type" :label="item" :value="item" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item class="search_button">
          <el-button type="primary">导出</el-button>
          <el-button type="primary" @click="hideSearch">添加</el-button>
          <el-button type="primary" @click="queryData">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table class="search_table" :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="序号" width="180"></el-table-column>
        <el-table-column prop="supplierName" label="供应商	" width="180"></el-table-column>
        <el-table-column prop="productName" label="产品名称"></el-table-column>

        <el-table-column prop="productId" label="产品代码"></el-table-column>
        <el-table-column prop="channel_policy" label="渠道政策"></el-table-column>
        <el-table-column prop="applicable_objects" label="适用对象"></el-table-column>
        <el-table-column prop="cost_type" label="费用类型"></el-table-column>

        <el-table-column prop="commission_coefficient" label="佣金系数">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleCard_commission_coefficient(scope.row)">查看详情</el-button>
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
      <check-details @showPage="showPage" :title="title_details" v-if="showPopup" :tableEle="tableEle"
                     :tableDataDetails="tableDataDetails"></check-details>
      <page-ination @changeSize="changeSize" @changeCurrentPage="changeCurrentPage" :total="totalNum"></page-ination>
    </div>
  </div>
</template>

<script>
    import {
        apiInstitutionalExpensesParam,
        apiInstitutionalExpensesSearch,
        apiInstitutionalExpensesPageInation
    } from "../../../request/api";
    import PageInation from "../../../common/PageInation";
    import CheckDetails from "../../../common/CheckDetails";

    export default {
        name: "InstitutionalExpensesSearch",
        components: {CheckDetails, PageInation},
        data() {
            return {
                form: {
                    supplierName: '',
                    productName: '',
                    productID: '',
                    channel_policy: '',
                    applicable_objects: '',
                    cost_type: ''
                },
                supplierName: [],
                productName: [],
                channel_policy: [],
                cost_type: [],
                tableData: [],
                pageIndex: 1,
                pageSize: 50,
                totalNum: 0,
                showPopup: false,
                title_details: '',
                tableEle: {},
                tableDataDetails: [],
            }

        },
        methods: {
            showPage() {
                this.showPopup = false;
                this.title_details = '';
                this.tableEle = {};
                this.tableDataDetails = [];
            },
            handleCard_applicable_agencies(row) {
                this.showPopup = true;
                this.title_details = '适用机构详情';
                this.tableEle = {
                    'id': '序号',
                    'body_type': '机构类型',
                    'body_name': '机构名称',
                };
                this.tableDataDetails = row.applicable_agencies;
            },
            handleCard_commission_coefficient(row) {
                this.showPopup = true;
                this.title_details = '佣金系数详情';
                this.tableEle = {
                    'during_period_fee': '交费期间',
                    'first_years_commission': '第一年度佣金',
                    'second_years_commission': '第二年度佣金',
                    'third_years_commission': '第三年度佣金',
                    'forth_years_commission': '第四年度佣金',
                    'fifth_years_commission': '第五年度佣金',
                    'sixth_years_commission': '第六年度以上佣金'
                };
                this.tableDataDetails = row.commission_coefficient;
            },
            changeSize(val) {
                this.pageSize = val;
            },
            changeCurrentPage(val) {
                this.pageIndex = val;
                apiInstitutionalExpensesPageInation({
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize
                }).then(res => {
                    this.totalNum = res.Data.totalNum;
                    this.tableData = res.Data.pipeiData;
                })
            },
            queryData() {
                apiInstitutionalExpensesSearch(this.form).then(res => {
                    window.console.log(res);
                })
                this.form = {
                    supplierName: '',
                    productName: '',
                    productID: '',
                    channel_policy: '',
                    applicable_objects: '',
                    cost_type: ''
                }
            },
            hideSearch() {
                this.$emit('hideSearch');
            }
        },
        created() {
            apiInstitutionalExpensesPageInation({
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            }).then(res => {
                this.totalNum = res.Data.totalNum;
                this.tableData = res.Data.pipeiData;
                window.console.log(res)
            });
            apiInstitutionalExpensesParam().then(res => {
                this.supplierName = res.Data.supplierName;
                let product_name = res.Data.product_name;
                product_name.forEach(item => {
                    this.productName.push(item.productName);
                });
                this.channel_policy = res.Data.channel_policy;
                this.cost_type = res.Data.cost_type;
            })
        }
    }
</script>

<style scoped>
  .search_table {
    width: 96%;
    min-height: 300px;
    overflow-x: scroll;
  }

  .InstitutionalExpensesSearch {
    width: 100%;
    min-height: 500px;
    /*background-color: red;*/
  }

  .row_3 {
    width: 100%;
    height: 40px;
    display: flex;
    margin-top: 30px;
    justify-content: space-around;
    /*background-color: #4074e1;*/
  }

  .row_3 >>> .el-form-item {
    width: 20%;
    height: 40px;
    /*background-color: #ef8412;*/
  }

  .row_3 >>> .el-form-item .el-form-item__content {
    width: 100%;
  }

  .row_3 >>> .el-form-item .el-form-item__content .el-select,
  .row_3 >>> .el-form-item .el-form-item__content .el-input {
    width: 100%;
  }

  .search_button {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    /*padding-right: 50px;*/
    /*background-color: red;*/
    margin-top: 30px;
  }

  .search_button button {
    font-size: 14px;
    color: #fff;
    margin: 0 20px;
  }
</style>