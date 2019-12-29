<template>
  <div>
    <main-title :title="title" :title_f="title_f"></main-title>
    <div class="body-box">
      <h3>快速搜索</h3>
      <div class="date-select">
        <el-date-picker v-model="dateVal" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
        <el-button type="primary" icon="el-icon-search" @click="searchHandle">搜索</el-button>
      </div>
      <div class="btn-group">
        <el-button @click="forwardNews">推送消息</el-button>
        <el-button type="warning" icon="el-icon-plus" @click="addMsg">新增</el-button>
      </div>
      <el-table :data="tableData" @current-change="currentChangeHandle" highlight-current-row border style="width: 100%">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="date" label="推送时间"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
      </el-table>

      <div class="feng-pages">
        <div>
          <el-button type="danger" @click="deleteHandle">删除</el-button>
          <el-button type="primary" @click="editHandle">编辑</el-button>
        </div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="40">
        </el-pagination>
      </div>

      <div class="mask" :hidden="isMask">
        <div class="superInput">
          <h4>添加消息</h4>
          <div class="s-content">
            <el-input placeholder="请输入标题" v-model="addMessage.title">
              <template slot="prepend">标题</template>
            </el-input>
            <editor-item v-model="addMessage.content" :isClear="isClear"  @change="superChangeVal"></editor-item>
            <div class="btn-group">
              <el-button type="primary" @click="addMsg">取消</el-button>
              <el-button type="success" @click="save">确认</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainTitle from "@/common/MainTitle"
import { MyMessage, MyMessageSearch, addMyMessage, sendMyMessage, addMyMessageDelete } from "@/request/api"
// 富文本
import EditorItem from "@/common/wangEnduit/EditorItem"

export default {
  name: "MyMessage",
  data() {
    return {
      title: "我的消息",
      title_f: "这是我的消息页面",
      dateVal: "", // 选择的时间
      currentPage: 5, // 分页
      tableData: [], // 表格数据
      isClear: false,
      addMessage: {
        content: '', // 富文本
        title: '', // 添加信息，文本框,
        date: '待推送'
      },
      // 分页
      pages: {
        page: 1,
        pageSize: 10
      },
      // 显示遮罩
      isMask: true,
      // 选中项
      selectTr: null
    };
  },
  components: { 
    MainTitle,
    EditorItem
  },
  computed: {
    // 
  },
  created: function () {
    this.getAllData()
  },
  methods: {
    // 确认添加
    save () {
      console.log(this.addMessage)
      addMyMessage(this.addMessage).then(res => {
        console.log(res)
        this.getAllData()
        this.addMsg()
      })
    },
    // 显示弹窗
    addMsg () {
      this.isMask = !this.isMask
      this.addMessage.title = ''
      this.addMessage.content = ''
    },
    // 搜索
    searchHandle() {
      if(this.dateVal){
        MyMessageSearch({searchDate: this.dateVal, ...this.pages}).then(res => {
          this.tableData = res.Data
          this.$message(res.Msg)
        })
      } else {
        this.getAllData()
      }
    },
    // 推送消息
    forwardNews () {
      if(!this.selectTr){
        this.$message("请选择一项")
        return
      }
      this.selectTr.date = new Date().toLocaleString().replace(/\//g, '-')
      sendMyMessage(this.selectTr).then(res => {
        console.log(res)
        this.selectTr = null
        if(!this.selectTr){
          this.$message(res.Msg)
          return
        }
      })
    },
    // 获取我的消息数据
    getAllData () {
      console.log(this.pages)
      MyMessage(this.pages).then(res => {
        this.tableData = res.Data
      })
    },
    handleSizeChange(val) {
      this.pages.pageSize = val
      this.getAllData()
    },
    handleCurrentChange(val) {
      this.pages.page = val
      this.getAllData()
    },
    superChangeVal (e) {
      console.log(e)
    },
    currentChangeHandle (obj) {
      this.selectTr = obj
    },
    // 删除
    deleteHandle () {
      if(!this.selectTr){
        this.$message("请选择一项")
        return
      }
      addMyMessageDelete(this.selectTr).then(res => {
        console.log(res)
        this.$message(res.Msg)
        this.selectTr = null
      })
    },
    // 编辑
    editHandle () {
      if(!this.selectTr){
        this.$message("请选择一项")
        return
      }
      // this.isMask = !this.isMask
    }
  }
};
</script>

<style scoped>
.body-box {
  font-size: 16px;
  width: 100%;
  border-top: 4px solid #2c8cf0;
  border-radius: 5px 5px 0 0;
  padding: 20px;
  box-sizing: border-box;
  text-align: left;
}
.body-box h3 {
  font-weight: normal;
  margin: 0;
  color: #f39312;
}
.date-select {
  margin-top: 30px;
  border-bottom: 1px solid #bebebe;
  padding-bottom: 24px;
}
.date-select .el-input {
  width: 400px;
  margin-right: 15px;
}
.btn-group {
  text-align: right;
  margin-top: 16px;
}
.btn-group .el-button {
  margin-left: 14px;
}
.el-table {
  margin-top: 20px;
}
.el-table .cell {
  text-align: center !important;
}
.feng-pages {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
}

<<<<<<< .mine
.mask{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
.editor {
  height: 370px;
}

.superInput{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 960px;
  height: 580px;
  background: #fff;
}
.superInput h4{
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 16px;
  box-sizing: border-box;
  background: #4074e1;
  color: #fff;
}
.superInput .s-content{
  padding: 16px;
  box-sizing: border-box;
}
.superInput .el-input{
  margin-bottom: 20px;
}
.superInput .btn-group{
  margin-top: 20px;
  text-align: right;
}
</style>||||||| .r5073

