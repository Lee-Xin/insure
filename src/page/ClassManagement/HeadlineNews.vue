<template>
  <div>
    <page-hr></page-hr>
    <div class="content_box" >
      <span class="content_title_1">快速搜索</span>
      <el-row :gutter="20">
        <div class="row">
          <el-col :span="6">
            <el-input v-model="form.title" placeholder="请输入您要收索的标题名称"></el-input>
          </el-col>
          <el-col :span="6">
            <el-select v-model="form.author" placeholder="请选择作者" filterable>
              <el-option
                v-for="item in authorList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>

          <el-col :span="6">
            <el-select v-model="form.status" placeholder="请选择发布状态">
              <el-option
                v-for="item in statusList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-date-picker v-model="form.date" type="date" placeholder="请选择日期"></el-date-picker>
          </el-col>
          <el-col :span="6" style="text-align:left">
            <el-button @click="handleQuery()" type="primary">搜索</el-button>
          </el-col>
        </div>
      </el-row>
      <div style="text-align:right;padding:10px 0;margin:10px 0;border-top:1px solid #e9eaec">
        <router-link to="/add_headline_news">
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
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="author" label="作者"></el-table-column>
        <el-table-column prop="readNum" label="阅读量"></el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">{{scope.row.status==1?"发布":"未发布"}}</template>
        </el-table-column>
      </el-table>
      <page-ination
        @changeSize="changeSize"
        @changeCurrentPage="changeCurrentPage"
        :total="totalNum"
      >
        <div>
          <el-button @click="dialogVisible=true" type="danger" :disabled="isDisabledForm.del">删除</el-button>
          <el-button type="primary" @click="edit" :disabled="isDisabledForm.edit">编辑</el-button>
          <el-button
            @click="changeStatus(1)"
            type="primary"
            v-if="isShowForm.send"
            :disabled="isDisabledForm.send"
          >发布</el-button>
          <el-button
            @click="changeStatus(2)"
            type="primary"
            v-else
            :disabled="isDisabledForm.notSend"
          >取消发布</el-button>
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

import {
  getAuthorList,
  getHeadlineNewsList,
  deltoutiao,
  fabutoutiao
} from "@/mock/api";
export default {
  name: "HeadlineNews",
  data() {
    return {
      form: {
        title: null,
        author: null,
        status: null,
        date: null,
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
    this.getAuthor();
    this.getList();
  },
  methods: {
    getAuthor() {
      getAuthorList().then(res => {
        this.authorList = res.Data;
      });
    },
    getList() {
      this.clickRow = {};
      getHeadlineNewsList(this.form).then(res => {
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
      deltoutiao({ id: this.clickRow.id }).then(res => {
        this.$message(res.data.Msg);
        this.dialogVisible = false;
        this.getList();
      });
    },
    changeStatus(n) {
      fabutoutiao({ id: this.clickRow.id, status: n }).then(res => {
        this.$message(res.data.Msg);
        this.getList();
      });
    },
    handleClick(row, column, event) {
      this.clickRow = row;
    },
    edit() {
      this.$router.push({
        path: "/edit_headline_news",
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
