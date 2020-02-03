<template>
  <div class="wrapper">
    <page-hr></page-hr>
    <div class="form-area">
      <div class="section">基本信息</div>
      <el-row :gutter="20">
        <el-col v-for="(item, index) in forms" :key="index" :span="item.span || 12">
          <form-item
            :type="item.type"
            :label="item.label"
            :options="item.options"
            v-model="item.value"
            :required="item.required"
            :placeholder="item.placeholder"
            :errorText="item.errorText || ''"
          ></form-item>
        </el-col>
      </el-row>
      <div class="section">经营资质</div>
      <el-row :gutter="20" style="padding: 10px 0;">
        <el-col :span="8" v-for="(item, index) in jingyingzhizhi" :key="index">
          <div class="upload-img">
            <span class="label">{{item.label}}</span>
            <span class="camera" @click="handleUpload(item)" style="margin-right:0">
              <img v-if="item.url" :src="item.url" />
              <img style="width:30px" v-else :src="require('@/assets/img/camera.png')" />
            </span>
            <el-button
              v-if="item.url"
              type="text"
              size="mini"
              style="padding:5px"
              @click="item.url=''"
            >删除</el-button>
          </div>
        </el-col>
      </el-row>
      <div class="section">其他信息</div>
      <el-row :gutter="20" style="padding: 20px 0;">
        <el-col :span="6" v-for="(item, index) in otherInfo" :key="index">
          <div class="upload-img">
            <span class="label">{{item.label}}</span>
            <span class="camera" @click="handleUpload(item)" style="margin-right:0">
              <img v-if="item.url" :src="item.url" />
              <img style="width:30px" v-else :src="require('@/assets/img/camera.png')" />
            </span>
            <el-button
              v-if="item.url"
              type="text"
              size="mini"
              style="padding:5px"
              @click="item.url=''"
            >删除</el-button>
          </div>
        </el-col>
      </el-row>
      <div class="section">互联网信息披露</div>

      <el-row :gutter="20">
        <el-col v-for="(item, index) in internetInfo" :key="index" :span="item.span || 12">
          <form-item
            :type="item.type"
            :label="item.label"
            :options="item.options"
            v-model="item.value"
            :required="item.required"
            :placeholder="item.placeholder"
          ></form-item>
        </el-col>
      </el-row>
      <el-tabs style="margin-top: 20px; margin-bottom: 40px;" v-model="activeName" type="card">
        <el-tab-pane label="公司简介" name="first">
          <div class="fuwenbenkaung">
            <editor-item v-model="editorContent.comdetail"></editor-item>
          </div>
        </el-tab-pane>
        <el-tab-pane label="公司荣誉" name="second">
          <div class="fuwenbenkaung">
            <editor-item v-model="editorContent.comhonor"></editor-item>
          </div>
        </el-tab-pane>
        <el-tab-pane label="发展历程" name="third">
          <div class="fuwenbenkaung">
            <editor-item v-model="editorContent.comcourse"></editor-item>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <img-upload
      :isShow.sync="showImgUpload"
      @uploadSuccess="uploadSuccess"
      @closeDialog="closeDialog"
    ></img-upload>
    <div class="bottom-toolbar">
      <el-button @click="save" type="primary" round icon="el-icon-success">保存/提交</el-button>
    </div>
  </div>
</template>

<script>
import PageHr from "@/common/PageHr";
import {
  apiSupplierAdd,
  apiSupperlist,
  supplierGetCooperationStatus,
  supplierGetCooperationType,
  getComTypeList,
  getBusinessScopeList,
  getaccountdetailss,
  accountdetailss
} from "@/mock/api";
import FormItem from "@/common/FormItem";
import ImgUpload from "@/common/ImgUpload";
import EditorItem from "@/common/wangEnduit/EditorItem";

export default {
  name: "AccountDetails",
  components: { PageHr, FormItem, ImgUpload, EditorItem },
  data() {
    return {
      forms: {
        comname: {
          label: "公司名称",
          type: "input",
          value: "",
          errorText: "",
          placeholder: "请输入"
        },
        comaddress: {
          label: "公司地址",
          type: "input",
          value: "",
          placeholder: "请输入"
        },
        comjc: {
          label: "公司简称",
          type: "input",
          value: "",
          errorText: "",
          placeholder: "请输入",
          span: 8
        },
        comtype: {
          label: "公司类型",
          type: "select",
          value: "",
          placeholder: "请选择",
          span: 8,
          options: []
        },
        comwebaddress: {
          label: "官网地址",
          type: "input",
          value: "",
          placeholder: "请输入",
          span: 8
        },
        comcode: {
          label: "统一社会信用代码",
          type: "input",
          value: "",
          placeholder: "请输入",
          span: 8
        },
        comprice: {
          label: "注册资本",
          type: "input",
          value: "",
          placeholder: "请输入",
          span: 8
        },
        comdate: {
          label: "成立时间",
          type: "date",
          value: "",
          placeholder: "选择日期",
          span: 8
        },
        comrange: {
          label: "经营范围",
          type: "select",
          value: 0,
          required: false,
          errorText: "",
          placeholder: "请选择经营范围",
          span: 8,
          options: []
        },
        commobile: {
          label: "服务热线",
          type: "input",
          value: "",
          placeholder: "请输入服务热线",
          span: 8
        },
        Complaint: {
          label: "投诉电话",
          type: "input",
          value: "",
          required: false,
          errorText: "",
          placeholder: "请输入",
          span: 8
        },
        compostcode: {
          label: "邮政编码",
          type: "input",
          value: "",
          placeholder: "请输入",
          span: 8
        },
        comemail: {
          label: "E-mail",
          type: "input",
          value: "",
          placeholder: "请输入",
          span: 8
        }
      },
      internetInfo: {
        MechanismFullName: {
          label: "披露机构全称",
          type: "input",
          value: "",
          placeholder: "请输入",
          span: 12
        },
        MechanismAbbreviationName: {
          label: "披露机构简称",
          type: "input",
          value: "",
          placeholder: "请输入",
          span: 12
        },
        MechanismWebAddress: {
          label: "披露机构网站地址",
          type: "input",
          value: "",
          placeholder: "请输入",
          span: 12
        },
        OperatingWebName: {
          label: "经营互联网保险业务网站名称",
          type: "input",
          value: "",
          placeholder: "请输入",
          span: 12
        },
        OperatingWebAddress: {
          label: "经营互联网保险业务网站地址",
          type: "input",
          value: "",
          placeholder: "请输入",
          span: 12
        },
        OperatingAppName: {
          label: "经营互联网保险业务App名称",
          type: "input",
          value: "",
          placeholder: "请输入",
          span: 12
        },
        OperatingWechatName: {
          label: "经营互联网保险业务微信公众号名称",
          type: "input",
          value: "",
          placeholder: "请输入",
          span: 12
        },
        ServiceMobile: {
          label: "客户服务及消费者投诉电话",
          type: "input",
          value: "",
          placeholder: "请输入",
          span: 12
        }
      },
      jingyingzhizhi: {
        Gsurl: {
          label: "工商营业执照",
          url: ""
        },
        xkzurl: {
          label: "经营保险业务许可证",
          url: ""
        },
        zzurl: {
          label: "互联网资质信息",
          url: ""
        }
      },

      otherInfo: {
        comlogo: {
          label: "公司logo",
          url: ""
        },
        appqrcode: {
          label: "APP二维码",
          url: ""
        },
        wxserverqrcode: {
          label: "微信服务号二维码",
          url: ""
        },
        wxsubqrcode: {
          label: "微信订阅号二维码",
          url: ""
        }
      },

      editorContent: {
        comdetail: "",
        comhonor: "",
        comcourse: ""
      },
      showImgUpload: false,
      clickImgItem: null,
      activeName: "first",
      id: null
    };
  },
  created() {
    this.getComTypeList();
    this.getBusinessScopeList();
    this.getaccountdetailss();
  },
  watch: {
    formData: {
      deep: true,
      handler() {
        // 表单值改变时，校验基本信息（this.forms）
        this.validate(this.forms);
      }
    }
  },
  computed: {},
  methods: {
    getComTypeList() {
      getComTypeList().then(res => {
        this.forms.comtype.options = res.Data;
      });
    },
    getBusinessScopeList() {
      getBusinessScopeList().then(res => {
        this.forms.comrange.options = res.Data;
      });
    },
    getaccountdetailss() {
      getaccountdetailss().then(res => {
        let data = res.Data || [];
        Object.keys(this.forms).map(key => {
          this.forms[key].value = data[key];
        });
        Object.keys(this.otherInfo).map(key => {
          this.otherInfo[key].url = data[key];
        });
        Object.keys(this.jingyingzhizhi).map(key => {
          this.jingyingzhizhi[key].url = data[key];
        });
        Object.keys(this.editorContent).map(key => {
          this.editorContent[key] = data[key];
        });
        Object.keys(this.internetInfo).map(key => {
          this.internetInfo[key].value = data[key];
        });
        this.id = data.id;
      });
    },
    closeDialog() {
      this.showImgUpload = false;
    },
    uploadSuccess(res) {
      this.$message(res.Msg);
      this.clickImgItem.url = res.Data.url;
      this.showImgUpload = false;
    },
    //点击上传图片的item
    handleUpload(item) {
      this.showImgUpload = true;
      this.clickImgItem = item;
    },

    save() {
      let data = {};
      Object.keys(this.forms).map(key => {
        data[key] = this.forms[key].value;
      });
      Object.keys(this.otherInfo).map(key => {
        data[key] = this.otherInfo[key].url;
      });
      Object.keys(this.jingyingzhizhi).map(key => {
        data[key] = this.jingyingzhizhi[key].url;
      });
      Object.keys(this.editorContent).map(key => {
        data[key] = this.editorContent[key];
      });
      Object.keys(this.internetInfo).map(key => {
        data[key] = this.internetInfo[key].value;
      });
      data.id = this.id;
      accountdetailss(data).then(res => {
        this.$message(res.data.Msg);
      });
    }
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  background-color: #fff;
  height: 100%;
  overflow-y: auto;
  .form-area {
    padding: 20px;

    .section {
      padding: 15px 20px;
      margin-bottom: 10px;
      font-size: 16px;
      font-weight: bold;
      text-align: left;
      background-color: #edf2f6;
      color: #495060;
    }
  }

  .upload-img {
    text-align: left;
    cursor: pointer;

    > .label {
      color: #f29f43;
      font-size: 14px;
      font-weight: bold;
    }

    > .camera {
      display: inline-block;
      margin: 0 20px;
      width: 58px;
      height: 58px;
      line-height: 58px;
      text-align: center;
      vertical-align: middle;
      border: 1px dashed #757f98;
      border-radius: 4px;

      > img {
        vertical-align: middle;
        width: 100%;
      }
    }
  }

  .bottom-toolbar {
    position: absolute;
    width: calc(100% - 30px);
    margin: 0 15px;
    padding: 0 20px;
    box-sizing: border-box;
    height: 80px;
    line-height: 80px;
    z-index: 2;
    right: 0;
    bottom: 0;
    background-color: #fff;
    box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.28);

    .el-button.is-round {
      padding: 6px 15px 7px 15px;
    }
  }
}
</style>
