<template>
  <div>
    <div class="SalesExpensesSearch">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="row_3">
          <el-form-item label="供应商">
            <el-select v-model="form.supplierName" placeholder="请选择">
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
              <el-option v-for="(item, index) in channel_policy" :label="item" :key="index" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="适用对象">
            <el-input v-model="form.applicable_objects" placeholder="自动输入"></el-input>
          </el-form-item>
          <el-form-item>

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

        <el-table-column prop="productID" label="产品代码"></el-table-column>
        <el-table-column prop="channel_policy" label="渠道政策"></el-table-column>
        <el-table-column prop="applicable_objects" label="适用对象"></el-table-column>

        <el-table-column prop="commission_coefficient" label="佣金系数">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleCard_applicable_agencies(scope.row)">查看详情</el-button>
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
    </div>
  </div>
</template>

<script>
    import {apiSalesExpensesParam,apiSalesExpensesSearch} from "../../../request/api";

    export default {
        name: "SalesExpensesSearch",
        data() {
            return {
                form: {
                    productID: '',
                    productName: '',
                    channel_policy: '',
                    supplierName: '',
                    applicable_objects: ''
                },
                tableData: [],
                supplierName: [],
                productName: [],
                channel_policy: [],
            }
        },
        methods: {
            queryData() {
                apiSalesExpensesSearch(this.form).then(res => {
                    this.tableData = res.Data;
                   window.console.log(res)
                });
            },
            hideSearch() {
                this.$emit('hideSearch');
            }
        },
        created() {
            apiSalesExpensesParam().then(res => {
                this.supplierName = res.Data.supplierName;
                let product_name = res.Data.product_name;
                product_name.forEach(item => {
                    this.productName.push(item.productName);
                })
                this.channel_policy = res.Data.channel_policy;
                // window.console.log(res);
            });
        }
    }
</script>

<style scoped>
  .SalesExpensesSearch {
    width: 100%;
    min-height: 300px;
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

  .search_table {
    width: 96%;
    min-height: 300px;
    overflow-x: scroll;
  }
</style>