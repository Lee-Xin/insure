<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline supplierListSearchForm">
      <el-form-item>
        <el-select v-model="formInline.supplier_niceName" placeholder="供应商简称">
          <el-option v-for="(item, index) in supplier_niceName" :label="item" :value="item" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="supplierListSearch_label">
        <el-input v-model="formInline.product_name" placeholder="产品名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formInline.main_risks_attached" placeholder="主副险">
          <el-option v-for="(item, index) in main_risks_attached" :label="item" :value="item" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formInline.first_type" placeholder="一级分类">
          <el-option v-for="(item, index) in first_type" :label="item" :value="item" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formInline.second_type" placeholder="二级分类">
          <el-option v-for="(item, index) in second_type" :label="item" :value="item" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formInline.sales_status" placeholder="在售">
          <el-option v-for="(item, index) in sales_status" :label="item" :value="item" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchProduct">搜索</el-button>
      </el-form-item>
    </el-form>
    <div class="productListButton">
      <button>模版下载</button>
      <button>批量导入</button>
      <button @click="showAddProduct" id="newAdd">新增</button>
    </div>
    <div class="table_box">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="序号" width="180"></el-table-column>
        <el-table-column prop="productName" label="产品名称" width="180"></el-table-column>
        <el-table-column prop="supplier_niceName" label="供应商" width="180"></el-table-column>
        <el-table-column prop="main_risks_attached" label="主附险类型" width="180"></el-table-column>
        <el-table-column prop="type" label="分类" width="180"></el-table-column>
        <el-table-column prop="insured_age" label="承保年龄" width="180"></el-table-column>
        <el-table-column prop="During_period_fee" label="交费期间" width="180"></el-table-column>
        <el-table-column prop="during_period_insurance" label="保险期间" width="180"></el-table-column>
        <el-table-column prop="sales_status" label="销售状态"></el-table-column>
      </el-table>
    </div>
    <div class="product_list_page">
      <page-ination @changeSize="changeSize" @changeCurrentPage="changeCurrentPage" :total="totalNum"></page-ination>
    </div>
  </div>
</template>

<script>
    import PageInation from "../../../common/PageInation";
    import {apiProductList, apiProductListSearch, apiProductListPageInation} from "../../../request/api";

    export default {
        name: "ProductListSearch",
        components: {PageInation},
        data() {
            return {
                url: "/supplier_list/new_supplier",
                formInline: {
                    supplier_niceName: '',
                    product_name: '',
                    main_risks_attached: '',
                    first_type: '',
                    second_type: '',
                    sales_status: ''
                },
                tableData: [],
                supplier_niceName: [],
                main_risks_attached: [],
                first_type: [],
                second_type: [],
                sales_status: [],
                pageSize: '',
                pageIndex: '',
                totalNum: 0
            }
        },
        created() {
            apiProductList().then(res => {
                this.supplier_niceName = res.Data.supplier_niceName;
                this.main_risks_attached = res.Data.main_risks_attached;
                this.first_type = res.Data.type.first_type;
                this.second_type = res.Data.type.second_type;
                this.sales_status = res.Data.sales_status;
            });
            apiProductListPageInation({
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
                apiProductListPageInation({
                    pageSize: this.pageSize,
                    pageIndex: val
                }).then(res => {
                  this.tableData = res.Data;
                    // window.console.log(res)
                })
                // this.pageIndex = val;
            },
            isEmpty(object) {
                for (let item in object){
                    if (item === ''){
                        return false;
                    }
                }
                return true;
            },
            searchProduct() {
                apiProductListSearch(this.formInline).then(res => {
                    this.tableData = res.Data;
                    // window.console.log(res);
                });
            },
            showAddProduct() {
                this.$emit('showAddProduct');
            }
        }
    }
</script>

<style scoped>
  .productListButton {
    width: 100%;
    height: 50px;
    /*background-color: red;*/
  }

  .productListButton button {
    width: 106px;
    height: 36px;
    border: 0;
    background-color: #4074e1;
    color: #fff;
    font-size: 16px;
    margin-right: 12px;
    margin-top: 7px;
    cursor: pointer;
  }

  #newAdd {
    border: none;
    background-color: #ff9628;
  }

  .table_box {
    width: 100%;
    margin-top: 36px;
  }

  .product_list_page {
    width: 100%;
    /*background-color: red;*/
    margin-top: 36px;
  }
</style>