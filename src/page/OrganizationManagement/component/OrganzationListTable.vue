<template>
  <div>
    <div class="addNew">
      <el-button @click="dialogVisible = true">新增</el-button>
    </div>
    <div class="table_box">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="序号" width="540"></el-table-column>
        <el-table-column prop="name" label="机构名称" width="540"></el-table-column>
      </el-table>
    </div>
    <el-dialog
            title="新增"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
      <el-input v-model="names"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
    import {getjigouclass,setjigouclass} from "@/request/api"
    export default {
        name: "OrganzationListTable",
        data() {
            return {
              dialogVisible:false,
              names:'',
                tableData: []
            }
        },
        methods: {
            handleClose(done) {
              var that=this
              setjigouclass({name:that.names}).then(res=>{
                that.$message(res.Msg)
                that.getdata()
              })
              done()
            },
            getdata(){
              var that=this
              getjigouclass({a:1}).then(res=>{
                that.tableData=res.Data
              })
            }
        },
      mounted(){
          this.getdata()
      }
    }
</script>

<style scoped>
  .addNew {
    width: 100%;
    height: 40px;
    /*background-color: red;*/
  }

  .el-button {
    color: #fff;
    font-size: 16px;
    border-color: #ff9628;
    background-color: #ff9628;
  }
</style>
