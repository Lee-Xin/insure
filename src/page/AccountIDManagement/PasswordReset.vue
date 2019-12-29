<template>
  <div>
    <main-title :title="title" :title_f="title_f"></main-title>
    <page-hr>

    </page-hr>
    <el-form :inline="true"  class="demo-form-inline supplierListSearchForm">
      <el-form-item required label="旧密码" class="supplierListSearch_label">
        <el-input v-model="oldpwd" type="password" placeholder="请输入原密码"></el-input>
      </el-form-item>
      <el-form-item required  label="新密码" class="supplierListSearch_label">
        <el-input v-model="newpwd1" type="password" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item required label="新密码" class="supplierListSearch_label">
        <el-input v-model="newpwd2" type="password" placeholder="请再次输入新密码"></el-input>
      </el-form-item>
      <el-form-item class="supplierListSearch_label">
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import MainTitle from "@/common/MainTitle";
    import PageHr from "@/common/PageHr";
    import {passwordReset} from '@/request/api'
    export default {
        name: "PasswordReset",
        data () {
            return {
                title: '修改密码',
                title_f: '这是修改密码页面',
                newpwd1:'',
                newpwd2:'',
                oldpwd:''
            }
        },
        //方法
        methods:{
          onSubmit () {
            var that=this
            if(that.oldpwd.length<=1){
              this.$message('请输入旧密码');
              return false
            }
            if(that.newpwd1 !== that.newpwd2){
              this.$message('新密码不一致');
              return false
            }
            passwordReset({
              id: '10001',
              oldpwd:that.oldpwd,
              newpwd1:that.newpwd1,
              newpwd2:that.newpwd2
            }).then(res => {
              this.$message(res.Msg);
            })
          }
        },
        //加载函数
        mounted:function(){

        },
        components: {PageHr, MainTitle}
    }
</script>

<style scoped>
.supplierListSearch_label{
  display: block !important;
  float: left;
  clear: both;
}
</style>
