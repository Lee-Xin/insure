<template>
  <div>
    <page-hr></page-hr>
    <div class="content_box">
      <div style="text-align:right;margin-bottom:10px">
        <el-button type="warning" @click="dialogVisible=true">设置关联工具</el-button>
      </div>
      <!--列表-->
      <el-table ref="singleTable" gongj :data="tableList" style="width: 100%;">
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="company" label="公司名称"></el-table-column>
        <el-table-column prop="remark" label="理赔说明"></el-table-column>
        <el-table-column prop="phone" label="公司电话"></el-table-column>
      </el-table>
      <page-ination
        @changeSize="changeSize"
        @changeCurrentPage="changeCurrentPage"
        :total="totalNum"
      ></page-ination>
    </div>
    <el-dialog title="关联公司" :visible.sync="dialogVisible" width="800px">
      <div style="text-align:left">
        <el-checkbox-group v-model="checkList" @change="handleChange">
          <el-row>
            <el-col
              :span="12"
              v-for="item in companyList"
              :key="item.id"
              style="margin-bottom:10px"
            >
              <el-checkbox :label="item.name"></el-checkbox>
            </el-col>
          </el-row>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PageHr from "@/common/PageHr";
import PageInation from "../../common/PageInation";

import { getClaimsToolList, getCompanyList, guanlianCompany } from "@/mock/api";
export default {
  name: "ClaimsTool",
  data() {
    return {
      form: {
        MaxResultCount: 50, //页码数
        Sorting: 1, //排序
        SkipCount: 0 //开始的索引
      },
      tableList: [],
      totalNum: 0,
      dialogVisible: false,
      companyList: [],
      checkList: []
    };
  },
  watch: {},
  created() {
    this.getList();
    this.getCompanyList();
  },
  methods: {
    getList() {
      getClaimsToolList(this.form).then(res => {
        this.tableList = res.result.items;
        this.totalNum = res.result.totalCount;
      });
    },
    getCompanyList() {
      getCompanyList().then(res => {
        this.companyList = res.Data;
      });
    },
    handleChange(val) {
      guanlianCompany({ list: val }).then(res => {
        console.log(res);
        this.$message(res.data.Msg);
      });
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
