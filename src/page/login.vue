<template>
  <div class="login">
    <div class="login_form">
      <span class="login_form_span">快保家</span>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="id">
          <el-input type="text" v-model="ruleForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {apiLogin} from "../request/api";
  import router from "../router";

  export default {
        name: "login",
        data() {
            var validateId = (rule, value, callback) => {
                if(value === ''){
                    callback(new Error('请输入账号'));
                }else{
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    id: '',
                    pass: '',
                    checkPass: '',
                },
                rules: {
                    id: [
                        {validator:validateId, trigger:'blur'}
                    ],
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        apiLogin({
                            id: this.ruleForm.id,
                            password: this.ruleForm.checkPass
                        }).then((res) => {
                            if (res.StatusCode === 200){
                                this.$store.commit('setToken', res.Data);
                                localStorage.setItem('token', res.Data);
                                router.push('/');
                            }
                        });
                    } else {
                        window.console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
  .Login {
  }

  .login_form {
    width: 400px;
    height: 487px;
    position: fixed;
    top: 50%;
    margin-top: -243.5px;
    left: 50%;
    margin-left: -200px;
    background-color: #495060;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .login_form_span {

  }
</style>