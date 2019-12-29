<template>
  <div>
    <main-title :title="title" :title_f="title_f"></main-title>
    <page-hr></page-hr>
    <div class="content_box" v-show="mainshow">
      <span class="content_title_1">快速搜索</span>
      <el-row :gutter="20">
        <div class="row">
          <el-col :span="6">

            <el-select v-model="zhuangtaikey" placeholder="请选择">
              <el-option
                v-for="(item,index) in zhuangtai"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-input v-model="searcktitle" placeholder="请输入标题"></el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="searckauth" placeholder="请输入作者"></el-input>
          </el-col>
          <el-col :span="6">
            <el-date-picker
              v-model="searchdate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>

          </el-col>
          <el-col :span="6">
            <el-button @click="search()">搜索</el-button>
          </el-col>
        </div>
      </el-row>

      <!--列表-->
      <el-table
        ref="singleTable"
        :data="accountdata"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%;padding: 0 10%;border:1px solid #aaa; margin-top: 30px; overflow:hidden; margin-bottom: 50px;">
        <el-table-column
          type="index">
        </el-table-column>
        <el-table-column
          property="title"
          label="标题">
        </el-table-column>
        <el-table-column
          property="author"
          label="作者">
        </el-table-column>
        <el-table-column
          property="seenum"
          label="阅读量">
        </el-table-column>
        <el-table-column
          property="create_at"
          label="时间">
        </el-table-column>
        <el-table-column
          property="status"
          label="状态">
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px; margin-bottom: 30px;">
        <el-button @click="upd()">修改</el-button>
        <el-button @click="del()">删除</el-button>
        <el-button @click="add()">添加</el-button>
        <el-button @click="fabu()">发布</el-button>
        <el-button @click="quxiaofabu()">取消发布</el-button>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange2"
        :current-page.sync="PageIndex"
        :page-sizes="[50,100, 200, 300, 400]"
        :page-size="PageSize"
        layout="sizes, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
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
          <el-option
            v-for="(item,index) in zhuangtai"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="封面">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess7"
          :before-upload="beforeAvatarUpload">
          <img v-if="wxsubqrcode" :src="wxsubqrcode" class="avatar">
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
          <el-option
            v-for="(item) in ['未发布','已发布']"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>

      </el-form-item>
      <el-form-item label="封面">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess7"
          :before-upload="beforeAvatarUpload">
          <img v-if="updata.wxsubqrcode" :src="updata.wxsubqrcode" class="avatar">
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
    import MainTitle from "@/common/MainTitle";
    import PageHr from "@/common/PageHr";

    import EditorItem from "@/common/wangEnduit/EditorItem";
    import {toutiaolist, addtoutiao, updtoutiao, deltoutiao, fabutoutiao, quxiaotoutiao} from "@/request/api"

    export default {
        name: "HeadlineNews",
        data() {
            return {
                props: {value: 'id', label: 'name', children: 'chil'},
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
                zhuangtai: ['未发布', '已发布'],
                zhuangtaikey: '',
                searcktitle: '',
                searckauth: '',
                searchdate: '',
                title: '头条管理',
                title_f: '头条管理',
                //列佩列表
                accountdata: [],
                //分类列表
                jigoudata: [],
                //封面
                wxsubqrcode: '',
                //课件分类
                classtype: [],
                //标题
                titles: '',
                //作者
                author: '',
                //状态
                status: '未发布',
                //关键词
                key: '',
                keydata: [],//关键词数据
                comdetail: '',//基本数据
                //======修改数据
                keys: '',
                updata: [],


            }
        },
        methods: {
            handleClose(tag) {
                this.updata.key.splice(this.updata.key.indexOf(tag), 1);
            },
            //添加的
            handleClose1(tag) {
                this.keydata.splice(this.keydata.indexOf(tag), 1);

            },
            handleChange(value) {
                this.classtype = value
                window.console.log(value);
            },
            handleChange2(val) {
                this.updata.classtype = val
            },
            change1(v) {
                this.comdetail = v
            },
            addkey() {
                if (this.key.length <= 0) {
                    this.$message('请输入标签');
                }
                this.keydata.push(this.key)
                this.key = ''
            },
            addkeys() {
                if (this.keys.length <= 0) {
                    this.$message('请输入标签');
                }
                this.updata.key.push(this.key)
                this.key = ''
            },
            handleAvatarSuccess7(res, file) {
                this.wxsubqrcode = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            //分页
            handleSizeChange(val) {
                this.PageSize = val
                window.console.log(`每页 ${val} 条`);
                this.getstaff();
            },
            handleCurrentChange2(val) {
                this.PageIndex = val
                window.console.log(`当前页: ${val}`);
                this.getstaff();
            },
            search: function () {
                this.$message('搜索中');
                this.getstaff()
            },
            back1: function () {
                this.addshow = false
                this.mainshow = true
            },
            back2: function () {
                this.updshow = false
                this.mainshow = true
            },
            handleCurrentChange(val) {
                this.currentRow = val.id;
                this.updata = val
            },
            add: function () {
                this.addshow = true
                this.mainshow = false
            },
            oks1: function () {
                var that = this
                window.console.log(that.updata)
                updtoutiao(that.updata).then(res => {
                    window.console.log(res)
                    that.currentRow = ''
                    this.$message(res.Msg);
                    that.accountdata = res.Data
                    that.updshow = false
                    that.mainshow = true
                })
            },
            oks: function () {
                var that = this;

                addtoutiao({
                    wxsubqrcode: that.wxsubqrcode,

                    title: that.titles,
                    author: that.author,
                    status: that.status,
                  comdetail: that.comdetail
                }).then(res => {
                    this.$message(res.Msg);
                    that.accountdata = res.Data
                    that.addshow = false
                    that.mainshow = true
                })
            },
            upd: function () {
                if (this.currentRow == -1) {
                    this.$message('请选择一行');
                    return false
                }
                var that = this
                that.updshow = true
                that.mainshow = false
            },
            fabu() {
                var that = this
                if (this.currentRow == -1) {
                    this.$message('请选择一行');
                    return false
                }
                fabutoutiao({id: this.currentRow}).then(res => {
                    that.$message(res.Msg);
                    that.accountdata = res.Data
                })
            },
            quxiaofabu() {
                var that = this
                if (this.currentRow == -1) {
                    this.$message('请选择一行');
                    return false
                }
                quxiaotoutiao({id: this.currentRow}).then(res => {
                    that.$message(res.Msg);
                    that.accountdata = res.Data
                })
            },
            del: function () {
                var that = this
                if (this.currentRow == -1) {
                    this.$message('请选择一行');
                    return false
                }
                deltoutiao({id: this.currentRow}).then(res => {
                    that.$message(res.Msg);
                    that.accountdata = res.Data
                })
            },
            getstaff() {
                var that = this
                toutiaolist({
                    PageIndex: that.PageIndex,
                    PageSize: that.PageSize,
                    zhuangtaikey: that.zhuangtaikey,
                    date: that.searchdate,
                    author: that.searckauth,
                    title: that.searcktitle
                }).then(res => {
                    var data = res.Data
                    window.console.log('只是', data)
                    that.accountdata = data.Rows
                    that.total = data.Records
                })
            }
        },
        mounted() {
            var that = this
            that.getstaff()
        },
        components: {PageHr, MainTitle, EditorItem}
    }
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
  .row{
    display: flex;
    justify-content: flex-start;
  }
  .row >>> .el-col{
    width: 30%;
  }
  .row >>> .el-col .el-input,
  .row >>> .el-col .el-select{
    width: 100%;
  }

</style>
