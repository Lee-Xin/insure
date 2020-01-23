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
      <el-form-item label>
        <div class="cell_before">栏目分类</div>
        <el-cascader
          v-model="form.type"
          clearable
          :options="typeList"
          :props="{ expandTrigger: 'hover' }"
        ></el-cascader>
      </el-form-item>
      <el-form-item style="width:auto">
        <el-button type="primary" @click="dialogVisible=true">管理</el-button>
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
    <el-dialog title="分类管理" :visible.sync="dialogVisible">
      <h3 class="title">添加分类</h3>
      <el-form ref="typeForm" :model="typeForm" class="dialog_from_center">
        <el-form-item>
          <div class="cell_before">上级分类</div>
          <el-select v-model="typeForm.collegeType" placeholder="请选择上级分类" clearable filterable>
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="cell_before">分类名称</div>
          <el-input v-model="typeForm.type" placeholder="请输入分类名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addType()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PageHr from "@/common/PageHr";

import EditorItem from "@/common/wangEnduit/EditorItem";
import { addzhishi, uploadImg, GetLpclass, addCollegeType } from "@/mock/api";
import ImgUploadBig from "@/common/ImgUploadBig";

export default {
  name: "addMyCollege",
  data() {
    return {
      form: {
        title: null,
        author: null,
        status: null,
        content: null,
        imgUrl: null,
        type: null
      },
      statusList: [
        { id: 1, name: "发布" },
        { id: 2, name: "未发布" }
      ],
      isClear: false,
      showImgUpload: false,
      typeList: [],
      typeForm: {
        collegeType: null,
        type: null
      },
      dialogVisible: false
    };
  },

  created() {
    this.getType();
  },
  methods: {
    closeDialog() {
      this.showImgUpload = false;
    },
    getType() {
      GetLpclass().then(res => {
        this.typeList = res.Data;
      });
    },
    addType() {
      addCollegeType(this.typeForm).then(res => {
        this.dialogVisible = false;
        this.getType();
        this.$message(res.data.Msg);
      });
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
      addzhishi(this.form).then(res => {
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

<style  lang="less">
.box {
  height: 1070px;
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
