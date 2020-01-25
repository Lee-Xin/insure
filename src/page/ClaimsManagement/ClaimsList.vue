<template>
  <div>
    <page-hr></page-hr>
    <div class="content_box">
      <span class="content_title_1">快速搜索</span>
      <el-row :gutter="20">
        <div class="row">
          <el-col :span="6">
            <el-input v-model="form.insuranceName" placeholder="请输入出险人姓名"></el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="form.orderId" placeholder="请输入保险单号"></el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="form.salesman" placeholder="请输入业务员姓名"></el-input>
          </el-col>
          <el-col :span="6">
            <el-date-picker
              v-model="form.date"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择出险日期"
            ></el-date-picker>
          </el-col>
          <el-col :span="6">
            <el-select v-model="form.status" placeholder="请选择结案情况">
              <el-option
                v-for="item in statusList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>

          <el-col :span="6" style="text-align:left">
            <el-button @click="handleQuery()" type="primary">搜索</el-button>
          </el-col>
        </div>
      </el-row>
      <div style="text-align:right;padding:10px 0;margin:10px 0;border-top:1px solid #e9eaec">
        <el-button type="primary" @click="downloadModel">模板下载</el-button>
        <el-button type="primary" @click="uploadModel">导入理赔</el-button>
        <el-button type="primary" @click="download">导出理赔</el-button>
        <router-link to="/add_claims" style="margin-left:10px">
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
        <el-table-column prop="mechanism" label="机构姓名"></el-table-column>
        <el-table-column prop="salesman" label="业务员姓名"></el-table-column>
        <el-table-column prop="company" label="保险公司"></el-table-column>
        <el-table-column prop="orderId" label="保单号"></el-table-column>
        <el-table-column prop="xianzhong" label="险种名称"></el-table-column>
        <el-table-column prop="year" label="缴费年限"></el-table-column>
        <el-table-column prop="money" label="保额"></el-table-column>
        <el-table-column prop="insuranceName" label="出险人姓名"></el-table-column>
        <el-table-column prop="idcard" label="身份证号"></el-table-column>
        <el-table-column prop="date" label="出险日期"></el-table-column>
        <el-table-column prop="eason" label="出险原因"></el-table-column>
        <el-table-column prop="outDate" label="寄出日期"></el-table-column>
        <el-table-column prop="outId" label="寄出单号"></el-table-column>
        <el-table-column prop="status" label="结案情况">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">是</span>
            <span v-if="scope.row.status==2">否</span>
            <span v-if="scope.row.status==3">未知</span>
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="结案时间"></el-table-column>
        <el-table-column prop="endMoney" label="理赔金额"></el-table-column>
        <el-table-column label="影视资料">
          <template slot-scope="scope">
            <el-button type="primary" @click.stop="view(scope.row.id)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
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

import {
  getClaimsList,
  delClaims,
  ClaimsDownloadModel,
  ClaimsUploadModel,
  ClaimsDownload
} from "@/mock/api";
export default {
  name: "ClaimsList",
  data() {
    return {
      form: {
        insuranceName: null,
        orderId: null,
        salesman: null,
        status: null,
        date: null,
        MaxResultCount: 50, //页码数
        Sorting: 1, //排序
        SkipCount: 0 //开始的索引
      },
      statusList: [
        { id: 0, name: "全部" },
        { id: 1, name: "是" },
        { id: 2, name: "否" },
        { id: 3, name: "未知" }
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
      getClaimsList(this.form).then(res => {
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
      delClaims({ id: this.clickRow.id }).then(res => {
        this.$message(res.data.Msg);
        this.dialogVisible = false;
        this.getList();
      });
    },

    handleClick(row, column, event) {
      this.clickRow = row;
    },
    view(id) {
      this.$router.push({
        path: "/edit_claims",
        query: { id }
      });
    },
    edit() {
      this.$router.push({
        path: "/edit_claims",
        query: { id: this.clickRow.id }
      });
    },
    downloadModel() {
      ClaimsDownloadModel().then(res => {
        this.$message(res.data.Msg);
      });
    },
    download() {
      ClaimsDownload().then(res => {
        this.$message(res.data.Msg);
      });
    },
    uploadModel() {
      ClaimsUploadModel().then(res => {
        this.$message(res.data.Msg);
        this.getList();
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
