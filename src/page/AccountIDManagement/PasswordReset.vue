<template>
  <div class="box">
    <page-hr></page-hr>
    <el-form ref="form" :model="form" class="search_form">
      <el-form-item>
        <div class="cell_before yellow">*原密码</div>
        <el-input v-model="form.oldpwd" type="password" placeholder="请输入原密码"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="cell_before yellow">*新密码</div>
        <el-input v-model="form.password" type="password" placeholder="请输入新密码,密码至少8位"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="cell_before yellow">*确认密码</div>
        <el-input v-model="form.password2" type="password" placeholder="请确认新密码"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="save">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import MainTitle from "@/common/MainTitle";
import PageHr from "@/common/PageHr";
import { resetPassword } from "@/mock/api";
export default {
  name: "PasswordReset",
  data() {
    return {
      form: {
        oldpwd: "",
        password: "",
        password2: ""
      }
    };
  },
  //方法
  methods: {
    save() {
      if (!this.form.oldpwd) return this.$message("请输入原密码");
      if (!this.form.password || this.form.password.length < 8)
        return this.$message("请输入新密码,密码至少8位");
      if (!(this.form.password === this.form.password2))
        return this.$message("确认新密码和新密码输入不一致");
      resetPassword(this.form).then(res => {
        this.$message(res.data.Msg);
      });
    }
  },

  components: { PageHr }
};
</script>

<style scoped lang=less>
.box {
  background: #fff;
  height: 800px;
  .search_form {
    padding: 20px;
    .el-form-item {
      float: none;
    }
  }
}
</style>
