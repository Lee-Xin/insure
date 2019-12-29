<template>
  <div>
    <div class="import_popup">
      <div class="form_box">
        <div class="form_box_title">{{title}}</div>
        <el-form class="form_box_search" ref="form" v-model="coverage_referred">
          <el-form-item label="险种简称">
            <el-input v-model="coverage_referred"></el-input>
          </el-form-item>
          <el-button type="primary">搜索</el-button>
        </el-form>
        <div class="import_table">
          <el-table :data="tableData">
            <el-table-column prop="id" label="序号" width="180"></el-table-column>
            <el-table-column prop="productName" label="产品名称"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button v-if="scope.row.operation" @click="confirmAdd(scope.row)">导入</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          @current-change="handleCurrentChange"
          @prev-click="modifyData"
          @next-click="modifyData"
          @size-change="handleSizeChange"
          :page-size="pageSize"
          :total="importLegth">
        </el-pagination>
        <el-button @click="cancel_popup" type="primary" class="form_cancel">关闭</el-button>
      </div>

    </div>
  </div>
</template>

<script>
    export default {
        name: "ImportPopup",
        data() {
            return {
                coverage_referred: '',
                currentPage: 1,
                pageSize: 5,
                tableData: [],
            }
        },
        computed: {
            importLegth: function () {
              return this.importPopup.length
            }
        },
        created(){
            this.process_data();
        },
        methods: {
            handleSizeChange(val){
                window.console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            process_data() {//整理初始时传入table的数据
                // window.console.log('bg',this.importPopup)
                for (let i=1; i<=this.pageSize; i++){
                    this.tableData.push(this.importPopup[i-1]);
                }
            },
            modifyData() {
                this.tableData = [];
                let currentIndex = this.currentPage * this.pageSize,
                    curentEndIndex = (this.currentPage+1) * this.pageSize - 1;
                for (let i=currentIndex; i<=curentEndIndex; i++){
                    this.tableData.push(this.importPopup[i]);
                }
            },
            cancel_popup() {
                // window.console.log('asf')
                this.$emit('cancel_popup');
            },
            confirmAdd(row){
                this.$emit('importData',row);
            }
        },
        props: {
            importPopup: Array,
            title: String
        }
    }
</script>

<style scoped>
  .import_popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    /*display: none;*/
    background-color: rgba(0, 0, 0, .5);
  }

  .form_box {
    width: 600px;
    height: 698px;
    position: absolute;
    top: 50%;
    margin-top: -349px;
    left: 50%;
    margin-left: -300px;
    background-color: #fff;
  }
  .form_box_title{
    width: 100%;
    height: 30px;
    font-size: 14px;
    color: #ffffff;
    line-height: 30px;
    padding-left: 20px;
    box-sizing: border-box;
    text-align: left;
    background-color: #4074e1;
  }
  .form_box_search{
    width: 100%;
    height: 60px;
    display: flex;
    padding-top: 10px;
    box-sizing: border-box;
    align-items: flex-start;
    /*background-color: red;*/
    justify-content: space-around;
  }
  .form_box_search >>> .el-form-item{
    display: flex;
  }
  .import_table {
    width: 552px;
    margin: 0 auto;
    height: 448px;
    overflow: hidden;
    /*border: 1px solid #000;*/
    /*background-color: red;*/
  }
  .form_cancel{
    width: 60px;
    height: 36px;
    color: #fff;
    background-color: #2d8cf0;
    display: flex;
    align-items: center;
    justify-content: center;
    float: right;
    margin-top: 60px;
    margin-right: 40px;
  }
</style>