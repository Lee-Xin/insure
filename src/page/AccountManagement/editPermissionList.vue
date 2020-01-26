<template>
  <div class="box">
    <page-hr></page-hr>
    <!--添加-->
    <el-form class="content_box cell">
      <el-form-item label>
        <div class="cell_before yellow">*策略组名称</div>
        <el-input v-model="form.name" placeholder="请输入策略组名称"></el-input>
      </el-form-item>
      <div style="clear:both"></div>
    </el-form>
    <el-form>
      <el-form-item label>
        <div style="text-align:left;padding-left:10px">操作权限:</div>
        <ul class="permission">
          <li v-for="(item,i) in form.permissionList" :key="i">
            <h3>{{item.name}}</h3>
            <ul v-if="item.list">
              <li v-for="(item2,j) in item.list" :key="j">
                <div>
                  <el-checkbox v-model="item2.checked" class="yellow">{{item2.name}}</el-checkbox>
                  <div v-if="item2.operation" style="border-top:1px solid #ececec;">
                    <el-checkbox
                      v-for="item3 in item2.operation"
                      :key="item3.id"
                      v-model="item3.checked"
                    >{{item3.name}}</el-checkbox>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </el-form-item>
      <div style="clear:both"></div>
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
import ImgUploadBig from "@/common/ImgUploadBig";

import { addClaims, getPermissionListDetail } from "@/mock/api";

export default {
  name: "editPermissionList",
  data() {
    return {
      form: {
        name: "",
        permissionList: []
      }
    };
  },

  created() {
    this.getData();
  },
  methods: {
    getData() {
      getPermissionListDetail().then(res => {
        const { name, permissionList } = res.Data;
        this.form = { name, permissionList };
      });
    },
    callback() {
      this.$router.go(-1);
    },
    save() {
      if (!this.form.name) return this.$message("请输入策略组名称");

      addClaims(this.form).then(res => {
        this.$message(res.data.Msg);
        this.$router.go(-1);
      });
    }
  },

  components: { PageHr }
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
  min-height: 1000px;
  background: #fff;
  padding-bottom: 100px;
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
.permission {
  text-align: left;
  padding-left: 10px;
  list-style: none;
  li {
    padding-left: 20px;
  }
}
</style>
