<template>
  <div>
    <div class="AddAgency_popup">
      <div class="AddAgency_popup_form">
        <el-form ref="form" v-model="form">
          <el-form-item label="机构类型">
            <el-select v-model="form.body_type" placeholder="请选择机构类型">
              <el-option v-for="(item, index) in body_type" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择机构">
            <el-input v-model="form.select_institutions"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">搜索</el-button>
          </el-form-item>
        </el-form>
        <el-table class="add_agency_table" :data="tableData" style="width: 100%">
          <el-table-column prop="judge">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row" @click="checkBox(scope.row)"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="body_type" label="机构类型" width="180"></el-table-column>
          <el-table-column prop="name" label="机构名称"></el-table-column>
        </el-table>
        <el-pagination :page-size="100" :total="1000"></el-pagination>
        <div class="add_agency_button">
          <el-button type="primary" @click="add_agency_cancel">取消</el-button>
          <el-button type="primary" @click="add_agency_yes">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "AddAgency",
        data() {
            return {
                form: {
                    body_type: '',
                    select_institutions: ''
                }
            }
        },
        methods: {
            checkBox(row) {
                window.console.log(row);
            },
            add_agency_cancel() {
                this.$emit('hideAddAgency');
            },
            add_agency_yes() {
                this.$emit('hideAddAgency')
            }
        },
        props: {
            body_type: Array,
            tableData: Array
        }
    }
</script>

<style scoped>
  .AddAgency_popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    /*display: none;*/
    background-color: rgba(0, 0, 0, .5);
  }

  .AddAgency_popup_form {
    width: 900px;
    height: 672px;
    border-radius: 14px;
    background-color: #fff;
  }
  .AddAgency_popup_form >>> .el-form{
    width: 100%;
    overflow: hidden;
    padding-top: 20px;
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
  }
  .AddAgency_popup_form >>> .el-form .el-form-item{
    width: 33.33%;
    display: flex;
    justify-content: space-between;
  }
  .AddAgency_popup_form >>> .el-form .el-form-item .el-form-item__content{
    /*width: 30%;*/
  }
  .add_agency_table{
    /*width: 96%;*/
    height: 400px;
    overflow-y:scroll;
    border: 1px solid #999;
    background-color: #fff;
  }
  .add_agency_button{
    margin-top: 50px;
    width: 100%;
    height: 40px;
    display: flex;
    box-sizing: border-box;
    padding-right: 30px;
    justify-content: flex-end;
  }
</style>