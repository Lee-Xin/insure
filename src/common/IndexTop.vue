<template>
  <div>
    <div class="box">
      <header>
        <div id="logo">
          <router-link to="/" tag="a">
            <img :src='imgSrc'/>
          </router-link>
        </div>
        <div id="login">
          <div class="login_icon"  @click="showExit">
            <img src="../assets/avatar.jpeg"/>
          </div>
          <div>{{name}}</div>
          <div class="login_exit" v-show="isShow" @click="exitLogin">退出登录</div>
        </div>
      </header>
    </div>
  </div>
</template>

<script>
    // import {apiUserInfo} from "../request/api";

    export default {
        name: "IndexTop",
        data() {
            return {
                name: '测试',
                imgSrc: require("../assets/logo.png"),
                isShow: false
            };
        },
        created() {
            // this.apiData();
        },
        methods: {
            // apiData() {
            //     apiUserInfo({
            //         token: this.$store.token
            //     }).then(res => {
            //         window.console.log('res', res);
            //     });
            // },
            showExit() {
                this.isShow = this.isShow ? false : true;
            },
            exitLogin() {
                // window.console.log('asfds')
                localStorage.removeItem('token');
                this.$store.commit('setToken', '');
                this.$router.push('/Login');
            }
        }
    }
</script>

<style scoped>
  header {
    display: flex;
    justify-content: space-between;
  }

  .box {
    width: 100%;
    height: 48px;
    background-color: #4074e1;
  }

  #logo {
    height: inherit;
    font-size: 0;
  }

  #logo img {
    max-width: 100%;
    /*width: 200px;*/
    /*height: 60px;*/
  }

  #login {
    width: 80px;
    height: 48px;
    line-height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-left: 14px;
    padding-right: 14px;
    cursor: pointer;
    color: #fff;
    position: relative;
  }

  /*#login:hover .login_exit {*/
  /*  display: block;*/
  /*}*/

  .login_icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
  }

  .login_icon img {
    max-width: 100%;
  }

  .login_exit {
    display: block;
    position: absolute;
    top: 48px;
    left: 0;
    z-index:200;
    width: 100%;
    height: 48px;
    line-height: 48px;
    font-size: 16px;
    color: #8e8e8e;
    cursor: pointer;
  }

</style>