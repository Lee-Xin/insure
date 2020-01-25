<template>
  <div class="box addTypeBox">
    <page-hr></page-hr>
    <!--添加-->
    <el-form class="content_box cell">
      <h3 class="title">产品基本信息</h3>
      <el-form-item label>
        <div class="cell_before yellow">*机构名</div>
        <el-input v-model="form.name" placeholder="请输入机构名称"></el-input>
      </el-form-item>
      <el-form-item label>
        <div class="cell_before yellow">*联系人</div>
        <el-input v-model="form.username" placeholder="请输入联系人姓名"></el-input>
      </el-form-item>
      <el-form-item label>
        <div class="cell_before yellow">*联系电话</div>
        <el-input v-model="form.phone" placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label>
        <div class="cell_before yellow">*地址</div>
        <el-input v-model="form.address" placeholder="请输入地址"></el-input>
      </el-form-item>
      <el-form-item label>
        <div class="cell_before yellow">*经纬度</div>
        <el-input v-model="form.lnglat" placeholder="请输入经纬度"></el-input>
      </el-form-item>
      <div style="clear:both;"></div>
      <my-map :obj="form"></my-map>
    </el-form>

    <div class="p_fixed">
      <div class="block center">
        <el-button type="primary" @click="save">保存/提交</el-button>
        <el-button type="default" @click="callback">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import PageHr from "@/common/PageHr";
import myMap from "@/common/Map.vue";

import { addContinuousClaims } from "@/mock/api";

export default {
  name: "addContinuousClaims",
  data() {
    return {
      form: {
        name: null,
        username: null,
        phone: null,
        address: null,
        lnglat: null
      }
    };
  },

  created() {},
  methods: {
    callback() {
      this.$router.go(-1);
    },
    save() {
      if (!this.form.name) return this.$message("请输入机构名称");
      if (!this.form.username) return this.$message("请输入联系人姓名");
      if (!this.form.phone) return this.$message("请输入联系电话");
      if (!this.form.address) return this.$message("请输入地址");
      if (!this.form.lnglat) return this.$message("请输入经纬度");
      addContinuousClaims(this.form).then(res => {
        this.$message(res.data.Msg);
        this.$router.go(-1);
      });
    },
    getLnglat(obj) {
      this.form.lnglat = obj.lnglat;
    }
  },

  components: { PageHr, myMap }
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
  height: 800px;
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
