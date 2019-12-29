<template>
  <div>
    <div class="continuationRateBounsSearch">
      <el-form :inline="true" :model="formInline" class="demo-form-inline supplierListSearchForm">
        <div class="row_3">
          <el-form-item label="供应商" prop="suplierName" class="supplierListSearch_label">
            <el-select v-model="formInline.suplierName" placeholder="供应商简称">
              <el-option v-for="(item, index) in suplierName" :label="item" :value="item" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品名称" prop="productName" id="form_item_name">
            <el-select v-model="formInline.productName" placeholder="产品名称">
              <el-option v-for="(item, index) in productName" :label="item" :value="item" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品代码" prop="product_id">
            <el-input v-model="formInline.product_id" placeholder="请输入产品代码"></el-input>
          </el-form-item>
        </div>
        <div class="row_3">
          <el-form-item label="采购类型" prop="procurement_type" class="supplierListSearch_label">
            <el-select v-model="formInline.procurement_type" placeholder="供应商简称">
              <el-option v-for="(item, index) in procurement_type" :label="item" :value="item" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="渠道名称" prop="channel_name">
            <el-input v-model="formInline.channel_name" placeholder="请输入渠道名称"></el-input>
          </el-form-item>
          <el-form-item label="协议类型" prop="protocol_type" id="form_item_name">
            <el-select v-model="formInline.protocol_type" placeholder="协议类型">
              <el-option v-for="(item, index) in protocol_type" :label="item" :value="item" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" @click="searchData">搜索</el-button>
        </el-form-item>
      </el-form>

      <div class="continuationRate_table">
        <div class="continuation_table_add">
          <el-button @click="showAdd">添加</el-button>
        </div>
      </div>
      <div class="continuation_table_box">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="序号"></el-table-column>
          <el-table-column prop="suplierName" label="供应商简称"></el-table-column>
          <el-table-column prop="productName" label="产品名称"></el-table-column>
          <el-table-column prop="productId" label="产品代码"></el-table-column>
          <el-table-column prop="procurement_type" label="采购类型"></el-table-column>
          <el-table-column prop="protocol_type" label="协议类型"></el-table-column>
          <el-table-column prop="channel_name" label="渠道名称"></el-table-column>
          <el-table-column prop="renewal_rates" label="续期利率"></el-table-column>
          <el-table-column prop="startTime" label="开始时间"></el-table-column>
          <el-table-column prop="endTime" label="结束时间"></el-table-column>
        </el-table>
      </div>

    </div>
    <div class="upstreamFolding_PageInation">
      <page-ination @changeSize="changeSize" @changeCurrentPage="changeCurrentPage" :total="totalNum"></page-ination>
    </div>
  </div>
</template>

<script>
  import {apiContinuationRateBounsParam,apiContinuationRateBounsSearch,apiContinuationRateBounsPageInation} from "../../../request/api";
  import PageInation from "../../../common/PageInation";
  export default {
        name: "ContinuationRateBonusSearch",
      components: {PageInation},
      data() {
            return {
                formInline: {
                    suplierName: '',
                    productName: '',
                    product_id: '',
                    procurement_type: '',
                    channel_name: '',
                    protocol_type: ''
                },
                tableData: [],
                procurement_type: [],
                productName: [],
                protocol_type: [],
                suplierName: [],
                pageIndex: 1,
                pageSize: 50,
                totalNum: 0
            }
        },
        created() {
            apiContinuationRateBounsParam().then(res => {
                this.procurement_type = res.Data.procurement_type;
                this.productName = res.Data.productName;
                this.protocol_type = res.Data.protocol_type;
                this.suplierName = res.Data.suplierName;
                window.console.log(res);
            })
            apiContinuationRateBounsPageInation({
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            }).then(res => {
                this.totalNum = res.Data.totalNum;
                this.tableData = res.Data.pipeiData;
            });
        },
        methods: {
            changeSize(val) {
                this.pageSize = val;
            },
            changeCurrentPage(val) {
                this.pageIndex = val;
                apiContinuationRateBounsPageInation({
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize
                }).then(res => {
                    this.totalNum = res.Data.totalNum;
                    this.tableData = res.Data.pipeiData;
                });
            },
            searchData() {
                apiContinuationRateBounsSearch(this.formInline).then(res => {
                    // window.console.log(res)
                    this.tableData = res.Data;
                })
            },
            showAdd() {
                this.$emit('showSearch');
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        window.console.log('error submit!!');
                        return false;
                    }
                });
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
    justify-content: flex-end;
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
  .upstreamFolding_table {
    width: 100%;
    height: 500px;
  }
</style>