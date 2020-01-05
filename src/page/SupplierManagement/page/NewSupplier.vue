<template>
  <div>
    <page-hr></page-hr>
    <el-form :model="formSubmit" status-icon :rules="rules" ref="formSubmit" label-width="120px">
      <el-form-item label="基本信息" prop="delivery"></el-form-item>
      <div class="row_2">
        <el-form-item label="供应商全称" prop="supplier_name">
          <el-select v-model="formSubmit.fullName" placeholder="请选择供应商">
            <el-option v-for="(item, index) in fullName" :label="item" :value="item" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="总部地址" prop="address">
          <el-input v-model="formSubmit.headAddress" placeholder="请输入总部地址"></el-input>
        </el-form-item>
      </div>
      <div class="row_4">
        <el-form-item label="供应商简称" prop="supplier_niceName">
          <el-input v-model="formSubmit.shortName" placeholder="请输入供应商简称"></el-input>
        </el-form-item>
        <el-form-item label="供应商代码" prop="supplier_id">
          <el-input v-model="formSubmit.code" placeholder="请输入供应商代码"></el-input>
        </el-form-item>
        <el-form-item label="注册资本" prop="registered_capital">
          <el-input v-model="formSubmit.registerCapital" placeholder="请输入注册资本"></el-input>
        </el-form-item>
        <el-form-item label="设立时间">
          <el-col :span="11">
            <el-form-item prop="createData">
              <el-date-picker type="date" placeholder="选择日期" v-model="formSubmit.createDate"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
      </div>
      <div class="row_4">
        <el-form-item label="合作类型">
          <el-select v-model="fontCooperationType" placeholder="战略合作">
            <el-option v-for="(item, index) in type_cooperation" :label="item.name" :value="item.name"
                       :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合作状态" prop="name">
          <el-select v-model="fontCooperationStatus" placeholder="合作">
            <el-option v-for="(item, index) in state_cooperation" :label="item.name" :value="item.name"
                       :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="官网网址" prop="website_url">
          <el-input v-model="formSubmit.website" placeholder="请以http://或者https://开头"></el-input>
        </el-form-item>
        <el-form-item label="公司注册地" prop="place_incorporation">
          <el-input v-model="formSubmit.registerAddress" placeholder="请输入公司注册地"></el-input>
        </el-form-item>
      </div>
      <div class="row_4">
        <el-form-item label="开始时间" prop="name">
          <el-col :span="11">
            <el-form-item prop="startTime">
              <el-date-picker type="date" placeholder="选择日期" v-model="formSubmit.startDate"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="结束时间" prop="name">
          <el-col :span="11">
            <el-form-item prop="endTime">
              <el-date-picker type="date" placeholder="选择日期" v-model="formSubmit.endDate"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="服务热线" prop="serviceHotline">
          <el-input v-model="formSubmit.serviceHotline" placeholder="格式为400-123456-123或123456"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="渠道服务电话" prop="serviceTelephone">
          <el-input v-model="formSubmit.serviceTelephone" placeholder="格式为400-123456-123或123456"
                    autocomplete="off"></el-input>
        </el-form-item>
      </div>
      <el-form-item label="其他信息" prop="delivery"></el-form-item>

      <div class="row_3">
        <el-form-item label="logo上传" prop="name">
          <el-upload class="avatar-uploader"
                     action="https://jsonplaceholder.typicode.com/posts/"
                     :show-file-list="false" :on-success="handleAvatarSuccess1" :before-upload="beforeAvatarUpload1">
            <img v-if="ruleForm.imageUrl1" :src="ruleForm.imageUrl1" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="APP二维码" prop="name">
          <el-upload class="avatar-uploader"
                     action="https://jsonplaceholder.typicode.com/posts/"
                     :show-file-list="false" :on-success="handleAvatarSuccess2" :before-upload="beforeAvatarUpload2">
            <img v-if="ruleForm.imageUrl2" :src="ruleForm.imageUrl2" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="公众号二维码" prop="name">
          <el-upload class="avatar-uploader"
                     action="https://jsonplaceholder.typicode.com/posts/"
                     :show-file-list="false" :on-success="handleAvatarSuccess3" :before-upload="beforeAvatarUpload3">
            <img v-if="ruleForm.imageUrl3" :src="ruleForm.imageUrl3" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </div>
      <div class="row_2">
        <el-form-item label="APP名称" prop="app_name">
          <el-input v-model="formSubmit.appName" placeholder="请输入APP名称"></el-input>
        </el-form-item>
        <el-form-item label="微信公众号" prop="weixin">
          <el-input v-model="formSubmit.weChatAccount" placeholder="请输入微信公众号名称"></el-input>
        </el-form-item>
      </div>


      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="公司简介" name="first">
          <div class="fuwenbenkaung">
            <editor-item v-model="formSubmit.aboutUs"></editor-item>
          </div>
        </el-tab-pane>
        <el-tab-pane label="公司荣誉" name="second">
          <div class="fuwenbenkaung">
            <editor-item v-model="formSubmit.companyGlories"></editor-item>
          </div>
        </el-tab-pane>
        <el-tab-pane label="发展历程" name="third">
          <div class="fuwenbenkaung">
            <editor-item v-model="formSubmit.developmentHistory"></editor-item>
          </div>
        </el-tab-pane>
      </el-tabs>


      <el-form-item>
        <el-button type="primary" @click="submitForm('formSubmit')">立即创建</el-button>
        <el-button @click="returnPrev">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import PageHr from "@/common/PageHr";
    import EditorItem from "@/common/wangEnduit/EditorItem";
    import {apiSupplierAdd, apiSupplierListSearchPageInation} from "../../../request/api";

    export default {
        name: "NewSupplier",
        components: {EditorItem},
        data() {
            var validateHotline = (rule, value, callback) => {
                let regExp1 = new RegExp('^400-\\d{6}-\\d{3}$');
                let regExp2 = new RegExp('^\\d{6}$');
                if (value === '') {
                    callback()
                } else if (regExp1.test(value)||regExp2.test(value)) {
                    callback()
                } else {
                    callback(new Error('格式为400-123456-123或123456'));
                }
            }
            return {
                isClear: false,
                detail: "",
                ruleForm: {
                    imageUrl1: '',
                    imageUrl2: '',
                    imageUrl3: ''
                },
                formSubmit: {
                    "fullName": '',
                    "headAddress": '',
                    "shortName": '',
                    "code": '',
                    "registerCapital": '',
                    "createDate": '',
                    "cooperationType": '',
                    "cooperationStatus": '',
                    "website": '',
                    "registerAddress": '',
                    "startDate": '',
                    "endDate": '',
                    "serviceHotline": '',
                    "serviceTelephone": '',
                    "appName": '',
                    "weChatAccount": '',
                    "aboutUs": '',
                    "companyGlories": '',
                    "developmentHistory": ''
                },
                rules: {
                    serviceHotline: [
                        {validator: validateHotline, trigger: 'blur'}
                    ],
                    serviceTelephone: [
                        {validator: validateHotline, trigger: 'blur'}
                    ]
                },
                fontCooperationType: '',
                fontCooperationStatus: '',
                activeName: '',
                supplier_name: [],
                fullName: [],
            };

        },
        created() {
            //  获取供应商全称数组
            apiSupplierListSearchPageInation({
                SkipCount: 0,
                MaxResultCount: this.totablNum
            }).then(res => {
                this.extractAttr(res.result.items, 'fullName', this.fullName);
                this.deleteAllTrim(this.fullName);
                let fullName = this.unique(this.fullName);
                this.fullName = fullName;
            });
        },
        watch: {
            'fontCooperationType': function () {
                // this.formSubmit.cooperationType =
                this.type_cooperation.forEach(item => {
                    if (item.name === this.fontCooperationType) {
                        this.formSubmit.cooperationType = item.value;
                    }
                });
            },
            'fontCooperationStatus': function () {
                this.state_cooperation.forEach(item => {
                    if (item.name === this.fontCooperationStatus) {
                        this.formSubmit.cooperationStatus = item.value;
                    }
                });
            }
        },
        props: {
            type_cooperation: Array,
            state_cooperation: Array,
            totablNum: Number,
        },
        methods: {
            //  提取结果中的指定属性，并放入一个数组中
            extractAttr(arrayJson = [], attrName = '', receiverArray = []) {
                arrayJson.forEach(item => {
                    if (item[attrName]) receiverArray.push(item[attrName]);
                });
            },
            // 删除所有空格
            deleteAllTrim(array = []) {
                array.forEach((item, index) => {
                    array[index] = item.replace(/\s*/g, "");
                });
            },
            /**
             * 删除数组内容重复的部分，并返回
             * @param arr
             * @returns {any[]}
             */
            unique(arr) {
                return Array.from(new Set(arr));
            },

            handleAvatarSuccess1(res, file) {
                this.ruleForm.image1Url = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload1(file) {
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
            handleAvatarSuccess2(res, file) {
                this.ruleForm.image2Url = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload2(file) {
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
            handleAvatarSuccess3(res, file) {
                this.ruleForm.image3Url = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload3(file) {
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
            change(val) {
                window.console.log(val)
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        apiSupplierAdd(this.formSubmit).then(res => {
                            // console.log(res)
                            if (res.status === 200){
                                this.$message({
                                    message: '保存成功',
                                    type: 'success'
                                })
                            }
                        }).catch(err => {
                            // console.log(err.message)
                            this.$message({
                                message: err['message'],
                                type: 'warning'
                            })
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            open() {
                const h = this.$createElement;
                this.$msgbox({
                    title: '消息',
                    message: h('p', null, [
                        h('span', null, '内容可以是 '),
                        h('i', {style: 'color: teal'}, 'VNode')
                    ]),
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '执行中...';
                            setTimeout(() => {
                                done();
                                setTimeout(() => {
                                    instance.confirmButtonLoading = false;
                                }, 300);
                            }, 3000);
                        } else {
                            done();
                        }
                    }
                }).then(action => {
                    this.$message({
                        type: 'info',
                        message: 'action: ' + action
                    });
                });
            },
            returnPrev() {
                this.$emit('changePage');
            }
        }
    }
</script>

<style scoped>
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
    margin-top: 40px;
    display: flex;
    background-color: #fff;
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

  .el-form-item__content .el-button {
    width: 100%;
    border: 1px solid #999;
  }

  .el-form-item__content .el-col .el-form-item {
    width: 100%;
  }

  .fuwenbenkaung {
    width: 100%;
    height: 458px;
    font-size: 18px;
    /*background-color: red;*/
  }

  .fuwenbenkaung >>> .toolbar {
    height: 30px;
  }

  .fuwenbenkaung >>> .text {
    height: 428px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #999;
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
</style>
