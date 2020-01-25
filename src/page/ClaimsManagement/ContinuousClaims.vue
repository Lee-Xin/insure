<template>
  <div>
    <page-hr></page-hr>
    <div class="content_box">
      <span class="content_title_1">快速搜索</span>
      <el-form ref="form" :model="form" class="search_form">
        <el-form-item>
          <div class="cell_before">机构名称</div>
          <el-input v-model="form.name" placeholder="请输入机构名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <div class="cell_before">姓名</div>
          <el-input v-model="form.username" placeholder="请输入联系人姓名" clearable></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleQuery">搜索</el-button>
        </el-form-item>
      </el-form>
      <div style="text-align:right;margin-bottom:10px">
        <router-link to="/add_continuous_claims">
          <el-button type="warning">新增</el-button>
        </router-link>
      </div>
      <!--列表-->
      <el-table
        ref="singleTable"
        :data="tableList"
        highlight-current-row
        @row-click="handleClick"
        style="width: 100%;"
      >
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="name" label="机构名称"></el-table-column>
        <el-table-column prop="username" label="联系人"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column prop="address" label="联系地址"></el-table-column>
        <el-table-column prop="lnglat" label="经纬度"></el-table-column>
      </el-table>
      <page-ination
        @changeSize="changeSize"
        @changeCurrentPage="changeCurrentPage"
        :total="totalNum"
      >
        <div>
          <el-button @click="dialogVisible=true" type="danger" :disabled="isDisabledForm.del">删除</el-button>
          <el-button type="primary" @click="edit" :disabled="isDisabledForm.edit">编辑</el-button>
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
  </div>
</template>

<script>
import PageHr from "@/common/PageHr";
import PageInation from "../../common/PageInation";

import { getContinuousClaimsList, delContinuousClaims } from "@/mock/api";
export default {
  name: "ContinuousClaims",
  data() {
    return {
      form: {
        name: null,
        username: null,
        MaxResultCount: 50, //页码数
        Sorting: 1, //排序
        SkipCount: 0 //开始的索引
      },
      authorList: [],
      statusList: [
        { id: 1, name: "发布" },
        { id: 2, name: "未发布" }
      ],
      tableList: [],
      totalNum: 0,
      isDisabledForm: { del: true, edit: true, send: true, notSend: true },
      isShowForm: { send: true },
      clickRow: {},
      dialogVisible: false
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
    getList() {
      this.clickRow = {};
      getContinuousClaimsList(this.form).then(res => {
        this.tableList = res.result.items;
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
      delContinuousClaims({ id: this.clickRow.id }).then(res => {
        this.$message(res.data.Msg);
        this.dialogVisible = false;
        this.getList();
      });
    },

    handleClick(row, column, event) {
      this.clickRow = row;
    },
    edit() {
      this.$router.push({
        path: "/edit_continuous_claims",
        query: { id: this.clickRow.id }
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
