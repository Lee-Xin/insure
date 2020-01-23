<template>
  <div class="box">
    <page-hr></page-hr>
    <!--添加-->
    <el-form class="content_box cell">
      <h3 class="title">基本信息</h3>
      <el-form-item label>
        <div class="cell_before yellow">*标题</div>
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label>
        <div class="cell_before yellow">*作者</div>
        <el-input v-model="form.author" placeholder="请输入作者"></el-input>
      </el-form-item>
      <el-form-item label>
        <div class="cell_before">状态</div>
        <el-select v-model="form.status" placeholder="请选择">
          <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <div style="clear:both"></div>
    </el-form>
    <el-form style="padding:10px">
      <el-form-item class="photos">
        <h3 class="title">封面</h3>
        <div class="upload-img">
          <span class="camera" @click="showImgUpload = true;">
            <img :src="require('@/assets/img/camera.png')" />
          </span>
        </div>
        <div>注释:大小600*365</div>
        <img :src="form.imgUrl" class="img_box" />
      </el-form-item>
      <h3 class="title w100">详细信息</h3>
      <el-form-item class="w100">
        <editor-item v-model="form.content" :isClear="isClear" @change="change"></editor-item>
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

import EditorItem from "@/common/wangEnduit/EditorItem";
import { addtoutiao, uploadImg } from "@/mock/api";
import ImgUploadBig from "@/common/ImgUploadBig";

export default {
  name: "addHeadlineNews",
  data() {
    return {
      form: {
        title: null,
        author: null,
        status: null,
        content: null,
        imgUrl: null
      },
      statusList: [
        { id: 1, name: "发布" },
        { id: 2, name: "未发布" }
      ],
      isClear: false,
      showImgUpload: false
    };
  },

  created() {},
  methods: {
    closeDialog() {
      this.showImgUpload = false;
    },
    change(v) {
      this.form.content = v;
    },
    callback() {
      this.$router.go(-1);
    },
    save() {
      if (!this.form.title) return this.$message("请输入标题");
      if (!this.form.author) return this.$message("请输入作者名字");
      addtoutiao(this.form).then(res => {
        this.$message(res.data.Msg);
        this.$router.go(-1);
      });
    },
    uploadSuccess(res) {
      this.$message(res.Msg);
      this.form.imgUrl = res.Data.url;
      this.showImgUpload = false;
    }
  },

  components: { PageHr, EditorItem, ImgUploadBig }
};
</script>

<style  lang="less" scoped>
.box {
  height: 1070px;
  background: #fff;
}
</style>
