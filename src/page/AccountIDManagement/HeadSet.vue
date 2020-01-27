<template>
  <div class="box">
    <page-hr></page-hr>
    <div>
      <h3 class="title">头像:</h3>
      <div class="avator">
        <img :src="imgUrl" @click="showImgUpload=true" />
      </div>
    </div>
    <img-upload
      :isShow.sync="showImgUpload"
      @uploadSuccess="uploadSuccess"
      @closeDialog="closeDialog"
    ></img-upload>
    <div class="btn">
      <el-button type="primary" @click="save">提交</el-button>
    </div>
  </div>
</template>

<script>
import PageHr from "@/common/PageHr";
import ImgUpload from "@/common/ImgUpload";
import { getAvatar, editAvatar } from "@/mock/api";
export default {
  name: "HeadSet",
  components: { PageHr, ImgUpload },
  data() {
    return {
      showImgUpload: false,
      imgUrl: "",
      form: { imgUrl: null }
    };
  },
  created() {
    this.getAvatar();
  },
  methods: {
    closeDialog() {
      this.showImgUpload = false;
    },
    uploadSuccess(res) {
      this.$message(res.Msg);
      this.form.imgUrl = res.Data.url;
      this.imgUrl = res.Data.url;
      this.showImgUpload = false;
    },
    getAvatar() {
      getAvatar().then(res => {
        this.imgUrl = res.Data.imgUrl;
      });
    },
    save() {
      editAvatar(this.form).then(res => {
        if (!this.imgUrl) this.$message("请上传头像");
        this.$message(res.data.Msg);
      });
    }
  }
};
</script>

<style scoped lang=less>
.box {
  background: #fff;
  height: 700px;
  text-align: left;
  h3 {
    padding: 20px 20px 0;
  }
  .avator {
    text-align: left;
    padding-left: 30px;
    img {
      cursor: pointer;
      width: 100px;
      height: 100px;
    }
  }
  .btn {
    padding: 20px 50px;
  }
}
</style>