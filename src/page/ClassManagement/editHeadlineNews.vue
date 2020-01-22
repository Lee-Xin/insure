<template>
  <div>
    <page-hr></page-hr>
    <div class="content_box" v-show="mainshow">
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
            <el-date-picker v-model="searchdate" type="date" placeholder="请选择日期"></el-date-picker>
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
          <router-link :to="{path:'edit_headline_news',params:{id:clickRow.id}}">
            <el-button type="primary" :disabled="isDisabledForm.edit">编辑</el-button>
          </router-link>

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

    <!--添加-->
    <el-form v-show="addshow" label-width="100px" class="demo-dynamic">
      <el-form-item label="标题">
        <el-input v-model="titles" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="author" placeholder="请输入作者"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="status" placeholder="请选择">
          <el-option v-for="(item,index) in zhuangtai" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="封面">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess7"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="wxsubqrcode" :src="wxsubqrcode" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="详细信息">
        <editor-item v-model="comdetail" :isClear="isClear" @change="change1"></editor-item>
      </el-form-item>
      <el-form-item>
        <el-button @click="oks">确认</el-button>
        <el-button @click="back1">返回</el-button>
      </el-form-item>
    </el-form>
    <!--修改-->
    <el-form v-if="updshow" label-width="100px" class="form_table">
      <el-form-item label="标题">
        <el-input v-model="updata.title"></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="updata.author"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="updata.status" placeholder="请选择">
          <el-option v-for="(item) in ['未发布','已发布']" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="封面">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess7"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="updata.wxsubqrcode" :src="updata.wxsubqrcode" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="详细信息">
        <editor-item v-model="updata.content" :isClear="isClear" @change="change1"></editor-item>
      </el-form-item>
      <el-form-item>
        <el-button @click="oks1">确认</el-button>
        <el-button @click="back2">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import PageHr from "@/common/PageHr";
import PageInation from "../../common/PageInation";

import EditorItem from "@/common/wangEnduit/EditorItem";
import { toutiaolist, addtoutiao, updtoutiao } from "@/request/api";
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
      dialogVisible: false,
      isClear: false,
      //当前页数
      PageIndex: 1,
      //每页条数
      PageSize: 50,
      //总共条数
      total: 1000,
      mainshow: true,
      addshow: false,
      updshow: false,
      zhuangtai: ["未发布", "已发布"],

      searckauth: "",
      searchdate: "",
      title: "头条管理",
      title_f: "头条管理",
      //列佩列表
      accountdata: [],
      //分类列表
      jigoudata: [],
      //封面
      wxsubqrcode: "",
      //课件分类
      classtype: [],
      //标题
      titles: "",
      //作者
      author: "",
      //状态
      status: "未发布",
      //关键词
      key: "",
      keydata: [], //关键词数据
      comdetail: "", //基本数据
      //======修改数据
      keys: "",
      updata: []
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
    handleClose(tag) {
      this.updata.key.splice(this.updata.key.indexOf(tag), 1);
    },
    handleClick(row, column, event) {
      this.clickRow = row;
    },
    //添加的
    handleClose1(tag) {
      this.keydata.splice(this.keydata.indexOf(tag), 1);
    },
    handleChange(value) {
      this.classtype = value;
      window.console.log(value);
    },
    handleChange2(val) {
      this.updata.classtype = val;
    },
    change1(v) {
      this.comdetail = v;
    },
    addkey() {
      if (this.key.length <= 0) {
        this.$message("请输入标签");
      }
      this.keydata.push(this.key);
      this.key = "";
    },
    addkeys() {
      if (this.keys.length <= 0) {
        this.$message("请输入标签");
      }
      this.updata.key.push(this.key);
      this.key = "";
    },
    handleAvatarSuccess7(res, file) {
      this.wxsubqrcode = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //分页
    handleSizeChange(val) {
      this.PageSize = val;
      window.console.log(`每页 ${val} 条`);
      this.getstaff();
    },

    search: function() {
      this.$message("搜索中");
      this.getstaff();
    },
    back1: function() {
      this.addshow = false;
      this.mainshow = true;
    },
    back2: function() {
      this.updshow = false;
      this.mainshow = true;
    },

    add: function() {
      this.addshow = true;
      this.mainshow = false;
    },
    oks1: function() {
      var that = this;
      window.console.log(that.updata);
      updtoutiao(that.updata).then(res => {
        window.console.log(res);
        that.currentRow = "";
        this.$message(res.Msg);
        that.accountdata = res.Data;
        that.updshow = false;
        that.mainshow = true;
      });
    },
    oks: function() {
      var that = this;

      addtoutiao({
        wxsubqrcode: that.wxsubqrcode,

        title: that.titles,
        author: that.author,
        status: that.status,
        comdetail: that.comdetail
      }).then(res => {
        this.$message(res.Msg);
        that.accountdata = res.Data;
        that.addshow = false;
        that.mainshow = true;
      });
    },
    upd: function() {
      if (this.currentRow == -1) {
        this.$message("请选择一行");
        return false;
      }
      var that = this;
      that.updshow = true;
      that.mainshow = false;
    },
    fabu() {
      var that = this;
      if (this.currentRow == -1) {
        this.$message("请选择一行");
        return false;
      }
      fabutoutiao({ id: this.currentRow }).then(res => {
        that.$message(res.Msg);
        that.accountdata = res.Data;
      });
    },
    quxiaofabu() {
      var that = this;
      if (this.currentRow == -1) {
        this.$message("请选择一行");
        return false;
      }
      quxiaotoutiao({ id: this.currentRow }).then(res => {
        that.$message(res.Msg);
        that.accountdata = res.Data;
      });
    },

    getstaff() {
      var that = this;
      toutiaolist({
        PageIndex: that.PageIndex,
        PageSize: that.PageSize,
        author: that.author,
        date: that.searchdate,
        author: that.searckauth,
        title: that.title
      }).then(res => {
        var data = res.Data;
        window.console.log("只是", data);
        that.accountdata = data.Rows;
        that.total = data.Records;
      });
    }
  },
  mounted() {
    var that = this;
    that.getstaff();
  },
  components: { PageHr, EditorItem, PageInation }
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
