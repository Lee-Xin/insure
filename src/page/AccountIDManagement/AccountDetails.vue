<template>
  <div>
    <main-title :title="title" :title_f="title_f"></main-title>
    <page-hr></page-hr>
    <el-form  :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="100px" class="demo-ruleForm">
      <el-form-item class="el-form-item__labels" label="基本信息" prop="delivery"></el-form-item>
      <div class="row_2">
        <el-form-item label="公司名称" prop="region">
          <el-input v-model="ruleForm.comname" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="公司地址" prop="name">
          <el-input v-model="ruleForm.comaddress" placeholder="请输入"></el-input>
        </el-form-item>
      </div>
      <div class="row_3">
        <el-form-item label="公司简称" prop="region">
          <el-input v-model="ruleForm.comjc" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="公司类型" prop="name">
          <el-select v-model="ruleForm.comtype" placeholder="未知">
            <el-option label="未知" value="未知"></el-option>
            <el-option label="中资" value="中资"></el-option>
            <el-option label="合资" value="合资"></el-option>
            <el-option label="外资" value="外资"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="官网地址" prop="region">
          <el-input v-model="ruleForm.comwebaddress" placeholder="请输入"></el-input>
        </el-form-item>
      </div>
      <div class="row_3">
        <el-form-item label="统一社会信用代码" prop="region">
          <el-input v-model="ruleForm.comcode" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="注册资本" prop="name">
          <el-input v-model="ruleForm.comprice" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="成交日期" prop="region">
          <el-date-picker
                  v-model="ruleForm.comdate"
                  type="date"
                  placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </div>
      <div class="row_3">
        <el-form-item label="经营范围" prop="name">
          <el-select v-model="ruleForm.comrange" placeholder="未知">
            <el-option label="专业中介机构-公估公司" value="专业中介机构-公估公司"></el-option>
            <el-option label="保险公司-人身险" value="保险公司-人身险"></el-option>
            <el-option label="保险公司-财产险" value="保险公司-财产险"></el-option>
            <el-option label="专业中介机构-代理公司" value="专业中介机构-代理公司"></el-option>
            <el-option label="专业中介机构-经纪公司" value="专业中介机构-经纪公司"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务热线" prop="region">
          <el-input v-model="ruleForm.commobile" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="投诉电话" prop="region">
          <el-input v-model="ruleForm.Complaint" placeholder="请输入"></el-input>
        </el-form-item>
      </div>
      <div class="row_2">
        <el-form-item label="邮政编码" prop="region">
          <el-input v-model="ruleForm.compostcode" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="E-mail" prop="name">
          <el-input v-model="ruleForm.comemail" placeholder="请输入"></el-input>
        </el-form-item>
      </div>
      <el-form-item class="el-form-item__labels" label="经营资质" prop="delivery"></el-form-item>
      <div class="row_3">
        <el-form-item label="工商营业执照" prop="name">
          <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
            <img v-if="ruleForm.Gsurl" :src="ruleForm.Gsurl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

        </el-form-item>
        <el-form-item label="经营保险业务许可证" prop="name">
          <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess2"
                  :before-upload="beforeAvatarUpload">
            <img v-if="ruleForm.xkzurl" :src="ruleForm.xkzurl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="互联网资质信息" prop="name">
          <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess3"
                  :before-upload="beforeAvatarUpload">
            <img v-if="ruleForm.zzurl" :src="ruleForm.zzurl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </div>
      <el-form-item  class="el-form-item__labels" label="其他信息" prop="delivery"></el-form-item>
      <div class="row_3">
        <el-form-item label="公司logo" prop="name">
          <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess4"
                  :before-upload="beforeAvatarUpload">
            <img v-if="ruleForm.comlogo" :src="ruleForm.comlogo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="App二维码" prop="name">
          <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess5"
                  :before-upload="beforeAvatarUpload">
            <img v-if="ruleForm.appqrcode" :src="ruleForm.appqrcode" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="微信服务号二维码" prop="name">
          <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess6"
                  :before-upload="beforeAvatarUpload">
            <img v-if="ruleForm.wxserverqrcode" :src="ruleForm.wxserverqrcode" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="微信订阅号二维码" prop="name">
          <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess7"
                  :before-upload="beforeAvatarUpload">
            <img v-if="ruleForm.wxsubqrcode" :src="ruleForm.wxsubqrcode" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </div>
      <el-form-item class="el-form-item__labels" label="互联网信息披露" prop="delivery"></el-form-item>

      <div class="row_2">
        <el-form-item label="披露机构全称" prop="region">
          <el-input v-model="ruleForm.MechanismFullName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="披露机构简称" prop="name">
          <el-input v-model="ruleForm.MechanismAbbreviationName" placeholder="请输入"></el-input>
        </el-form-item>
      </div>
      <div class="row_2">
        <el-form-item label="披露机构网站地址" prop="region">
          <el-input v-model="ruleForm.MechanismWebAddress" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="经营互联网保险业务网站名称" prop="name">
          <el-input v-model="ruleForm.OperatingWebName" placeholder="请输入"></el-input>
        </el-form-item>
      </div>
      <div class="row_2">
        <el-form-item label="经营互联网保险业务网站地址" prop="region">
          <el-input v-model="ruleForm.OperatingWebAddress" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="经营互联网保险业务App名称" prop="name">
          <el-input v-model="ruleForm.OperatingAppName" placeholder="请输入"></el-input>
        </el-form-item>
      </div>
      <div class="row_2">
        <el-form-item label="经营互联网保险业务微信公众号名称" prop="region">
          <el-input v-model="ruleForm.OperatingWechatName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="客户服务及消费者投诉电话" prop="name">
          <el-input v-model="ruleForm.ServiceMobile" placeholder="请输入"></el-input>
        </el-form-item>
      </div>
      <el-tabs v-model="activeName2" type="card">
        <el-tab-pane label="公司简介" name="first" class="fuwenbenkaung">
          <editor-item v-model="ruleForm.comdetail" :isClear="isClear" @change="change1"></editor-item>
        </el-tab-pane>
        <el-tab-pane label="公司荣誉" name="second"  class="fuwenbenkaung">
          <editor-item v-model="ruleForm.comhonor" :isClear="isClear" @change="change2"></editor-item>
        </el-tab-pane>
        <el-tab-pane label="发展历程" name="third"  class="fuwenbenkaung">
          <editor-item v-model="ruleForm.comcourse" :isClear="isClear"  @change="change3"></editor-item>
        </el-tab-pane>
      </el-tabs>

      <el-form-item>
        <el-button type="primary"  @click="submitForm('ruleForm')">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import MainTitle from '@/common/MainTitle'
    import PageHr from "@/common/PageHr";
    import EditorItem from "@/common/wangEnduit/EditorItem";
    import {accountdetailss,getaccountdetailss} from "@/request/api"
    export default {
        name: "AccountDetails",
        components: {EditorItem,PageHr, MainTitle},
        data () {
            return {
              isClear: false,
                title: '账户详情',
                title_f: '系统指引（欢迎您使用快保家系统）',
              ruleForm:{
                id:1,
                comname:'',//公司名称
                comaddress:'',//公司地址
                comjc:'',//公司简称
                comtype:'',//公司类型
                comwebaddress:'',//官网地址
                comcode:'',//统一社会信用代码
                comprice:'',//注册资本
                comdate:'',//成交日期
                comrange:'',//经营范围
                commobile:'',//服务热线
                Complaint:'',//投诉电话
                compostcode:'',//邮政编码
                comemail:'',//电子邮箱
                MechanismFullName:'',//披露机构全称
                MechanismAbbreviationName:'',//披露机构简称
                MechanismWebAddress:'',//机构网站地址
                OperatingWebName:'',//保险业务网站名称
                OperatingWebAddress:'',//保险业务网站地址
                OperatingAppName:'',//网线业务APP名称
                OperatingWechatName:'',//经营互联网保险业务微信公众号名称
                ServiceMobile:'',//客户服务及消费者投诉电话
                comdetail:'',//公司简介富文本
                comhonor:'',//公司荣誉
                comcourse:'',//发展历程
                //图片===================================
                Gsurl:'',//工商营业执照
                xkzurl:'',//经营保险业务许可证
                zzurl:'',//互联网资质信息
                comlogo:'',//公司logo
                appqrcode:'',//App二维码
                wxserverqrcode:'',//微信服务号二维码
                wxsubqrcode:'',//微信订阅号二维码
              },
              activeName2: 'first', //tab选择
              rules: {
                comname: [
                  { required: true, message: '请输入公司名称', trigger: 'blur' }
                ]
              }
            }
        },
      mounted(){
        getaccountdetailss().then(res=>{
          this.ruleForm=res.Data
        })
      },
      methods:{
        handleAvatarSuccess(res, file) {
          this.ruleForm.Gsurl = URL.createObjectURL(file.raw);
        },
        handleAvatarSuccess2(res, file) {
          this.ruleForm.xkzurl = URL.createObjectURL(file.raw);
        },
        handleAvatarSuccess3(res, file) {
          this.ruleForm.zzurl = URL.createObjectURL(file.raw);
        },
        handleAvatarSuccess4(res, file) {
          this.ruleForm.comlogo = URL.createObjectURL(file.raw);
        },
        handleAvatarSuccess5(res, file) {
          this.ruleForm.appqrcode = URL.createObjectURL(file.raw);
        },
        handleAvatarSuccess6(res, file) {
          this.ruleForm.wxserverqrcode = URL.createObjectURL(file.raw);
        },
        handleAvatarSuccess7(res, file) {
          this.ruleForm.wxsubqrcode = URL.createObjectURL(file.raw);
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
        change1(v){
          this.ruleForm.comdetail=v
        },
        change2(v){
          this.ruleForm.comhonor=v
        },
        change3(v){
          this.ruleForm.comcourse=v
        },
        submitForm(formName) {
          var that=this
          that.$refs[formName].validate((valid) => {
            if (valid) {
              var a=that.ruleForm
              window.console.log(a)
              accountdetailss(a).then(res => {
                this.$message(res.Msg);
              })
            } else {
              window.console.log('error submit!!');
              return false;
            }
          });
        }
      }
    }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-form-item__labels{
    background-color: #edf2f6;
  }
  .row_2 {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    /*background-color: red;*/
  }

  .row_2 .el-form-item {
    width: 50%;
  }

  .row_3 {
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }

  .row_3 .el-form-item {
    width: 33.33%;
  }

  .row_4 {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .row_4 .el-form-item {
    width: 25%;
  }

  .el-form-item__content .el-select {
    width: 100%;
  }

  .el-form-item__content .el-col {
    width: 100%;
  }

  .el-form-item__content .el-button{
    width: 100%;
    border: 1px solid #999;
  }
  .el-form-item__content .el-col .el-form-item {
    width: 100%;
  }
  .fuwenbenkaung{
    width: 100%;
    height: 458px;
    font-size: 18px;
    /*background-color: red;*/
  }
  .fuwenbenkaung >>> .toolbar{
    height: 30px;
  }
  .fuwenbenkaung >>> .text{
    height: 428px;
  }
</style>
