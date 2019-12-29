<template>
  <div>
    <div class="DownstreamFoldingAdd">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="row_3">
          <el-form-item label="供应商">
            <el-select v-model="form.region" placeholder="供应商简称">
              <el-option v-for="(item, index) in typeData.supplier" :label="item" :key="index"
                         :value="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="input-button" label="产品名称">
            <el-input v-model="form.name" placeholder="请选择产品名称"></el-input>
            <el-button @click="importShow">导入</el-button>
          </el-form-item>
          <el-form-item label="产品代码">
            <el-input v-model="form.name" placeholder="请输入产品代码"></el-input>
          </el-form-item>
        </div>
        <div class="row_3">
          <el-form-item label="与年龄是否有关">
            <el-select v-model="form.region" placeholder="与年龄是否有关">
              <el-option v-for="(item, index) in typeData.age" :label="item" :key="index"
                         :value="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合同开始时间">
            <el-date-picker type="date" placeholder="请选择" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="合同结束时间">
            <el-date-picker type="date" placeholder="请选择" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </div>
        <el-tabs  type="border-card">
          <el-tab-pane label="模板一">
            <el-table class="card_table_1" :data="typeData.moban_1" style="width: 100%">
              <el-table-column prop="during_period_payment" label="缴费期间" width="180"></el-table-column>
              <el-table-column prop="fold_coefficient" label="折标系数" width="180"></el-table-column>
              <el-table-column prop="value_coefficient" label="价值系数"></el-table-column>
            </el-table>
            <div class="form_button">
              <el-button type="primary">查询</el-button>
              <el-button @click="showAddAgencyPage" type="primary">添加</el-button>
            </div>
            <el-table :data="addAgencyData">
              <el-table-column prop="id" label="序号"></el-table-column>
              <el-table-column prop="body_type" label="机构类型"></el-table-column>
              <el-table-column prop="body_name" label="机构名称"></el-table-column>
              <el-table-column prop="operation" label="操作"></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="模板二"></el-tab-pane>
        </el-tabs>
        <el-form-item class="DownstreamFoldingAdd_buttom">
          <el-button type="primary">保存/提交</el-button>
          <el-button @click="returnPrev">返回</el-button>
        </el-form-item>
      </el-form>
      <import-popup v-if="showImport" :importPopup="importPopup"  @cancel_popup="hidePopup" :title="title"></import-popup>
      <add-agency @hideAddAgency="hideAddAgency" v-if="showAddAgency" :tableData="tableData" :body_type="bodyData"></add-agency>
    </div>
  </div>
</template>

<script>
    // import {apiDownstreamFoldingAdd} from "../../../request/api";
    import ImportPopup from "../../../common/ImportPopup";
    import AddAgency from "../../../common/AddAgency";

    export default {
        name: "DownstreamFoldingAdd",
        components: {AddAgency, ImportPopup},
        data() {
            return {
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: '',
                    resource: ''
                },
                typeData: {},
                bodyData: {},
                importPopup: [],
                title: '产品列表',
                showImport: false,
                showAddAgency: false,
                addAgencyData: [],
            }
        },
        methods: {
            hideAddAgency() {
                this.showAddAgency = false;
            },
            importShow() {
                this.showImport = true;
            },
            hidePopup() {
                // window.console.log('asfdgsfhd')
                this.showImport = false;
            },
            showAddAgencyPage() {
                window.console.log('点击了')
                this.showAddAgency = true;
            },
            returnPrev() {
                this.$emit('returnPrev');
            }
        },
        created() {
            apiDownstreamFoldingAdd().then(res => {
                this.typeData = res.Data;
                this.bodyData = res.Data.moban_1_add_body_type;
                this.tableData = res.Data.moban_1_add_table;
                this.importPopup = res.Data.import;
                this.addAgencyData = res.Data.moban_1_table2;
                // age: (...)
                // body_type: (...)
                // supplier: (...
                //  import
                //  moban_1
                //  moban_1_add_body_type
                // moban_1_add_table
                // window.console.log(this.bodyData);
            })
        }
    }
</script>

<style scoped>
  .DownstreamFoldingAdd {
    width: 100%;
    min-height: 500px;
    /*background-color: red;*/
  }

  .row_3 {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .row_3 .el-form-item {
    width: 33.33%;
  }

  .input-button >>> .el-form-item__content {
    display: flex;
  }

  .input-button >>> .el-form-item__content button {
    background-color: #4074e1;
    color: #fff;
  }
  .form_button{
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    /*background-color: red;*/
  }
  .card_table_1{
    width: 100%;
    min-height: 50px;
    /*background-color: red;*/
  }
  .DownstreamFoldingAdd_buttom{
    width: 100%;
    height: 40px;
    margin-top: 30px;
  }
</style>