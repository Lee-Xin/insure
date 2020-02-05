<template>
  <div>
    <div class="body-box">
      <h3>快速搜索</h3>
      <div class="date-select">
        <el-date-picker
          v-model="form.date"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
        <el-button type="primary" icon="el-icon-search" @click="handleQuery">搜索</el-button>
      </div>
      <div class="btn-group">
        <el-button @click="sendMsg">推送消息</el-button>
        <el-button type="warning" icon="el-icon-plus" @click="addDiaolog(1)">新增</el-button>
      </div>
      <el-table
        :data="tableData"
        @current-change="handleClick"
        highlight-current-row
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="date" label="推送时间"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
      </el-table>
    </div>
    <page-ination @changeSize="changeSize" @changeCurrentPage="changeCurrentPage" :total="totalNum">
      <div>
        <el-button @click="dialogVisible=true" type="danger" :disabled="isDisabledForm.del">删除</el-button>
        <el-button type="primary" @click="addDiaolog(2)" :disabled="isDisabledForm.edit">编辑</el-button>
      </div>
    </page-ination>
    <el-dialog title="删除" :visible.sync="dialogVisible" width="400px">
      <div style="text-align:left">
        <span>请确认删除此项数据。</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="del()">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="addForm.title" :visible.sync="addForm.isShow">
      <el-form ref="addForm" :model="addForm.data" class="dialog_from_center">
        <el-form-item>
          <div class="cell_before">标题</div>
          <el-input v-model="addForm.data.title" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item class="w100">
          <editor-item v-model="addForm.data.content" :isClear="isClear" @change="change"></editor-item>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addForm.isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  MyMessageSearch,
  addMyMessage,
  sendMyMessage,
  addMyMessageDelete
} from "@/mock/api";
// 富文本
import EditorItem from "@/common/wangEnduit/EditorItem";
import PageInation from "../../common/PageInation";

export default {
  name: "MyMessage",

  components: {
    EditorItem,
    PageInation
  },
  data() {
    return {
      form: {
        date: null,
        MaxResultCount: 50, //页码数
        Sorting: 1, //排序
        SkipCount: 0 //开始的索引
      },
      employeeList: [],
      permissionList: [],
      tableData: [],
      totalNum: 0,
      isDisabledForm: { del: true, edit: true, send: true, notSend: true },
      isShowForm: { send: true },
      clickRow: {},
      dialogVisible: false,
      isClear: false,
      addForm: {
        title: "",
        isShow: false,
        data: {
          title: "",
          content: ""
        }
      }
    };
  },
  watch: {
    clickRow(row) {
      if (row.id !== undefined && row.id !== "" && row.id !== null) {
        this.isDisabledForm = {
          del: false,
          edit: false,
          send: false,
          notSend: false
        };
        this.isShowForm.send = row.status == 2 ? true : false;
      } else {
        this.isDisabledForm = {
          del: true,
          edit: true,
          send: true,
          notSend: true
        };
        this.isShowForm = { send: true };
      }
    }
  },
  created() {
    this.getList();
  },
  methods: {
    change(v) {
      this.addForm.data.content = v;
    },
    getList() {
      this.clickRow = {};
      MyMessageSearch(this.form).then(res => {
        this.tableData = res.result.items;
        this.totalNum = res.result.totalCount;
      });
    },

    handleQuery() {
      this.form.SkipCount = 0;
      this.getList();
    },
    changeSize(val) {
      this.form.SkipCount = 0;
      this.form.MaxResultCount = val;
      this.getList(this.form);
    },
    //  当前页发生改变时
    changeCurrentPage(val) {
      this.form.SkipCount = (val - 1) * this.form.MaxResultCount;
      this.getList(this.form);
    },
    del() {
      addMyMessageDelete({ id: this.clickRow.id }).then(res => {
        this.$message(res.data.Msg);
        this.dialogVisible = false;
        this.getList();
      });
    },

    handleClick(row, column, event) {
      this.clickRow = row;
    },
    addDiaolog(n) {
      this.addForm.title = n == 1 ? "添加账号" : "编辑账号";
      this.addForm.isShow = true;
      if (n == 1) {
        this.addForm.data = {
          title: "",
          content: ""
        };
      } else {
        let { title, content } = this.clickRow;
        this.addForm.data = {
          title,
          content
        };
      }
    },
    confirm() {
      addMyMessage(this.addForm.data).then(res => {
        this.$message(res.data.Msg);
        this.addForm.isShow = false;
      });
    },
    sendMsg() {
      sendMyMessage().then(res => {
        this.$message(res.data.Msg);
        this.addForm.isShow = false;
      });
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
  background: #fff;
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

<<<<<<< .mine .mask {
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

.superInput {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 960px;
  height: 580px;
  background: #fff;
}
.superInput h4 {
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
.superInput .s-content {
  padding: 16px;
  box-sizing: border-box;
}
.superInput .el-input {
  margin-bottom: 20px;
}
.superInput .btn-group {
  margin-top: 20px;
  text-align: right;
}
</style>||||||| .r5073

