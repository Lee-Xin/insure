<template>
  <div>
    <page-hr></page-hr>
    <div class="content_box">
      <span class="content_title_1">快速搜索</span>
      <el-form ref="form" :model="form" class="search_form">
        <el-form-item>
          <div class="cell_before">分支机构</div>
          <el-select v-model="form.mechanism" placeholder="请选择分支机构" clearable filterable>
            <el-option
              v-for="item in mechanismList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleQuery">搜索</el-button>
        </el-form-item>
      </el-form>
      <div style="text-align:right;margin-bottom:10px">
        <el-button type="warning" @click="addDiaolog(1)">新增账号</el-button>
      </div>
      <!--列表-->
      <el-table
        ref="singleTable"
        :data="tableList"
        highlight-current-row
        @row-click="handleClick"
        style="width: 100%;"
      >
        <el-table-column prop="name" label="机构简称"></el-table-column>
        <el-table-column prop="account" label="机构账号"></el-table-column>
        <el-table-column prop="loginName" label="登录名"></el-table-column>
        <el-table-column prop="permissionName" label="策略组"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
      </el-table>
      <page-ination
        @changeSize="changeSize"
        @changeCurrentPage="changeCurrentPage"
        :total="totalNum"
      >
        <div>
          <el-button @click="dialogVisible=true" type="danger" :disabled="isDisabledForm.del">删除</el-button>
          <el-button type="primary" @click="addDiaolog(2)" :disabled="isDisabledForm.edit">编辑</el-button>
        </div>
      </page-ination>
    </div>
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
          <div class="cell_before yellow">*分支机构</div>
          <el-select v-model="addForm.data.mechanism" placeholder="请选择分支机构" clearable filterable>
            <el-option
              v-for="item in mechanismList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="cell_before yellow">*账号名称</div>
          <el-input v-model="addForm.data.account" placeholder="请输入账号名称"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="cell_before yellow">*登录名称</div>
          <el-input v-model="addForm.data.loginName" placeholder="请输入登录名称"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="cell_before yellow">*登录密码</div>
          <el-input v-model="addForm.data.password" type="password" placeholder="请输入密码,密码至少8位"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="cell_before yellow">*确认密码</div>
          <el-input v-model="addForm.data.password2" type="password" placeholder="请确认密码,两次密码须保持一致"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="cell_before yellow">*策略组</div>
          <el-select v-model="addForm.data.permission" placeholder="请选择策略组" clearable filterable>
            <el-option
              v-for="item in permissionList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
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
import PageHr from "@/common/PageHr";
import PageInation from "../../common/PageInation";

import {
  getInstitutionalAccount,
  delInstitutionalAccount,
  getallparameter,
  getPermissionListNoPage,
  addInstitutionalAccount
} from "@/mock/api";
export default {
  name: "InstitutionalAccount",
  data() {
    return {
      form: {
        mechanism: null,
        MaxResultCount: 50, //页码数
        Sorting: 1, //排序
        SkipCount: 0 //开始的索引
      },
      mechanismList: [],
      permissionList: [],
      tableList: [],
      totalNum: 0,
      isDisabledForm: { del: true, edit: true, send: true, notSend: true },
      isShowForm: { send: true },
      clickRow: {},
      dialogVisible: false,
      addForm: {
        title: "",
        isShow: false,
        data: {
          mechanism: "",
          account: "",
          loginName: "",
          password: "",
          password2: "",
          permission: ""
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
    this.getData();
  },
  methods: {
    getList() {
      this.clickRow = {};
      getInstitutionalAccount(this.form).then(res => {
        this.tableList = res.result.items;
        this.totalNum = res.result.totalCount;
      });
    },
    getData() {
      getallparameter().then(res => {
        this.mechanismList = res.Data.jigou;
      });
      getPermissionListNoPage().then(res => {
        this.permissionList = res.Data;
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
      delInstitutionalAccount({ id: this.clickRow.id }).then(res => {
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
          mechanism: "",
          account: "",
          loginName: "",
          password: "",
          password2: "",
          permission: ""
        };
      } else {
        let {
          mechanism,
          account,
          loginName,
          password,
          permission
        } = this.clickRow;
        this.addForm.data = {
          mechanism,
          account,
          loginName,
          password,
          permission,
          password2: password
        };
      }
    },
    confirm() {
      if (!this.addForm.data.mechanism) return this.$message("请选择机构名称");
      if (!this.addForm.data.account) return this.$message("请输入账号名称");
      if (!this.addForm.data.loginName) return this.$message("请输入登录名称");
      if (!this.addForm.data.password || this.addForm.data.password.length < 8)
        return this.$message("请输入密码,密码至少8位");
      if (!this.addForm.data.password2) return this.$message("请确认密码");
      if (!(this.addForm.data.password === this.addForm.data.password2))
        return this.$message("两次输入密码不相同");
      if (!this.addForm.data.permission) return this.$message("请选择策略组");
      addInstitutionalAccount(this.addForm.data).then(res => {
        this.$message(res.data.Msg);
        this.addForm.isShow = false;
      });
    }
  },

  components: { PageHr, PageInation }
};
</script>

<style scoped>
.content_box {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding-left: 16px;
}

.content_title_1 {
  width: 100%;
  height: 18px;
  display: block;
  line-height: 18px;
  font-size: 18px;
  color: #ef8412;
  text-align: left;
  margin-bottom: 20px;
}
.fuwenbenkaung {
  width: 100%;
  height: 458px;
  font-size: 18px;
  /*background-color: red;*/
}
.row {
  display: flex;
  justify-content: flex-start;
}
.row >>> .el-col {
  width: 30%;
}
.row >>> .el-col .el-input,
.row >>> .el-col .el-select {
  width: 100%;
}
</style>
