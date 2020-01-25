<template>
  <div class="box">
    <page-hr></page-hr>
    <!--添加-->
    <el-form class="content_box cell">
      <el-form-item label>
        <div class="cell_before yellow">*保单号</div>
        <el-input v-model="form.orderId" placeholder="请输入保单号"></el-input>
      </el-form-item>
      <el-form-item label>
        <div class="cell_before yellow">*险种名称</div>
        <el-input v-model="form.xianzhong" placeholder="请输入险种名称"></el-input>
      </el-form-item>
      <el-form-item label>
        <div class="cell_before yellow">*机构名称</div>
        <el-input v-model="form.mechanism" placeholder="请输入机构名称"></el-input>
      </el-form-item>
      <el-form-item label>
        <div class="cell_before yellow">*业务员姓名</div>
        <el-input v-model="form.salesman" placeholder="请输入业务员姓名"></el-input>
      </el-form-item>
      <el-form-item label>
        <div class="cell_before yellow">*保险公司</div>
        <el-select v-model="form.companyId" placeholder="请选择保险公司" clearable filterable>
          <el-option
            v-for="item in supplierList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label>
        <div class="cell_before yellow">*缴费年限</div>
        <el-input v-model="form.year" placeholder="请输入缴费年限"></el-input>
      </el-form-item>
      <el-form-item label>
        <div class="cell_before yellow">*保额</div>
        <el-input v-model="form.money" placeholder="请输入保额"></el-input>
      </el-form-item>
      <el-form-item label>
        <div class="cell_before yellow">*出险人姓名</div>
        <el-input v-model="form.insuranceName" placeholder="请输入出险人姓名"></el-input>
      </el-form-item>
      <el-form-item label>
        <div class="cell_before yellow">*身份证号码</div>
        <el-input v-model="form.idcard" placeholder="请输入身份证号码"></el-input>
      </el-form-item>
      <el-form-item label>
        <div class="cell_before yellow">*出险日期</div>
        <el-date-picker
          v-model="form.date"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="请选择出险日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <div class="cell_before yellow">*出险原因</div>
        <el-input v-model="form.reason" placeholder="请输入出险原因"></el-input>
      </el-form-item>
      <el-form-item label>
        <div class="cell_before yellow">*寄出时间</div>
        <el-date-picker
          v-model="form.outDate"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="请选择寄出时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <div class="cell_before yellow">*寄出单号</div>
        <el-input v-model="form.outId" placeholder="请输入寄出单号"></el-input>
      </el-form-item>
      <el-form-item label>
        <div class="cell_before yellow">*结案情况</div>
        <el-select v-model="form.status" placeholder="请选择结案情况">
          <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label>
        <div class="cell_before yellow">*结案时间</div>
        <el-date-picker
          v-model="form.endTime"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="请选择结案时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <div class="cell_before yellow">*理赔金额(元)</div>
        <el-input v-model="form.endMoney" placeholder="请输入寄出单号"></el-input>
      </el-form-item>

      <div style="clear:both;"></div>
    </el-form>
    <el-form style="padding:10px">
      <el-form-item class="photos">
        <h3 class="title">影视资料</h3>
        <div class="upload-img">
          <span class="camera" @click="showImgUpload = true;">
            <img :src="require('@/assets/img/camera.png')" />
          </span>
        </div>
        <div>注释:大小600*365</div>
        <img :src="form.imgUrl" class="img_box" />
      </el-form-item>
      <h3 class="title w100">备注</h3>
      <el-form-item class="w100">
        <el-input type="textarea" v-model="form.remark" :rows="6" resize="none"></el-input>
      </el-form-item>
    </el-form>
    <div class="p_fixed">
      <div class="block center">
        <el-button type="primary" @click="save">保存/提交</el-button>
        <el-button type="default" @click="callback">返回</el-button>
      </div>
    </div>
    <img-upload-big
      :isShow.sync="showImgUpload"
      @uploadSuccess="uploadSuccess"
      @closeDialog="closeDialog"
    ></img-upload-big>
  </div>
</template>

<script>
import PageHr from "@/common/PageHr";
import ImgUploadBig from "@/common/ImgUploadBig";

import { addClaims, getallparameter, getClaimsDetail } from "@/mock/api";

export default {
  name: "addContinuousClaims",
  data() {
    return {
      form: {
        id: "",
        mechanism: "",
        salesman: "",
        companyId: "",
        orderId: "",
        xianzhong: "",
        year: "",
        money: "",
        insuranceName: "",
        idcard: "",
        date: "",
        reason: "",
        outDate: "",
        outId: "",
        status: "",
        endTime: "",
        endMoney: "",
        imgUrl: "",
        remark: ""
      },
      supplierList: [],
      showImgUpload: false,
      statusList: [
        { id: 1, name: "是" },
        { id: 2, name: "否" },
        { id: 3, name: "未知" }
      ]
    };
  },

  created() {
    this.getData();
    this.form.id = this.$route.query.id;
    this.getDetail();
  },
  methods: {
    getDetail() {
      getClaimsDetail({ id: this.form.id }).then(res => {
        const {
          id,
          mechanism,
          salesman,
          companyId,
          orderId,
          xianzhong,
          year,
          money,
          insuranceName,
          idcard,
          date,
          reason,
          outDate,
          outId,
          status,
          endTime,
          endMoney,
          imgUrl,
          remark
        } = res.Data;
        this.form = {
          id,
          mechanism,
          salesman,
          companyId,
          orderId,
          xianzhong,
          year,
          money,
          insuranceName,
          idcard,
          date,
          reason,
          outDate,
          outId,
          status,
          endTime,
          endMoney,
          imgUrl,
          remark
        };
      });
    },
    closeDialog() {
      this.showImgUpload = false;
    },
    uploadSuccess(res) {
      this.$message(res.Msg);
      this.form.imgUrl = res.Data.url;
      this.showImgUpload = false;
    },
    getData() {
      getallparameter().then(res => {
        this.supplierList = res.Data.gongyingshang;
      });
    },
    callback() {
      this.$router.go(-1);
    },
    save() {
      if (!this.form.mechanism) return this.$message("请输入机构名称");
      if (!this.form.salesman) return this.$message("请输入业务员姓名");
      if (!this.form.companyId) return this.$message("请选择公司");
      if (!this.form.orderId) return this.$message("请输入保单号");
      if (!this.form.year) return this.$message("请输入缴费年限");
      if (!this.form.money) return this.$message("请输入保额");
      if (!this.form.insuranceName) return this.$message("请输入出险人姓名");
      if (!this.form.idcard) return this.$message("请输入身份证号");
      if (!this.form.date) return this.$message("请选择出险日期");
      if (!this.form.reason) return this.$message("请输入出险原因");
      if (!this.form.outDate) return this.$message("请选择寄出日期");
      if (!this.form.outId) return this.$message("请输入寄出单号");
      if (!this.form.status) return this.$message("请选择结案情况");
      if (!this.form.endTime) return this.$message("请选择结案时间");
      if (!this.form.endMoney) return this.$message("请输入理赔金额");
      addClaims(this.form).then(res => {
        this.$message(res.data.Msg);
        this.$router.go(-1);
      });
    }
  },

  components: { PageHr, ImgUploadBig }
};
</script>

<style  lang="less" scoped>
.el-dialog__body {
  padding: 0 !important;
  .typeBox {
    display: flex;
    & > div:first-child {
      width: 60%;
      padding: 16px;
      height: 400px;
      overflow-y: auto;
      .el-input {
        width: 300px;
      }
      i {
        color: #f00;
        padding: 5px;
        cursor: pointer;
        font-size: 18px;
      }
      .flex {
        display: flex;
        justify-content: space-between;
        width: 100%;
      }
      ul {
        li {
          text-align: left;
          border: 1px solid #eeee;
          padding: 10px 34px 10px 10px;
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
        }
      }
    }
    & > div:last-child {
      width: 40%;
      padding: 15px;
      background-color: rgb(206, 234, 247);
      height: 400px;
    }
  }
}
.box {
  height: 1000px;
  background: #fff;
}
.photos {
  width: 100%;
  .el-form-item__content {
    width: 100% !important;
    padding: 20px 0;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-wrap: nowrap;
    .upload-img {
      .camera {
        margin: 0 30px;
        display: flex;
        width: 70px;
        height: 70px;
        border: 1px dashed #666;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
    .img_box {
      width: 200px;
      height: 67px;
      border: 1px solid #ececec;
      margin-left: 30px;
    }
  }
}
</style>
