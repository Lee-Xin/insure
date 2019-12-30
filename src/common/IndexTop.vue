<template>
    <div>
        <div class="box">
            <header>
                <router-link to="/" tag="div" class="logo-wrapper">
                    <img src="../assets/logo.png" alt="" class="cloud-logo">
                    <h1 class="logo-text">云后台</h1>
                </router-link>
                <div class="login">
                    <div class="login_icon" @click="showExit">
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

<style scoped lang="scss">
    .box {
        width: 100%;
        height: 56px;
        background-color: #4074e1;
    }
    header {
        height: 56px;
        line-height: 56px;
        position: relative;
        text-align: left;
        .logo-wrapper{
            display: inline-block;
            width: 194px;
            height: 56px;
            line-height: 56px;
            background-color: #3664c8;
        }
        .cloud-logo{
            display: inline-block;
            margin: 0 14px;
            vertical-align: middle;
        }
        .logo-text{
            display: inline-block;
            line-height: 28px;
            margin: 0;
            margin-bottom: 3px;
            margin-left: 4px;
            font-size: 28px;
            color: #fff;
            vertical-align: middle;
            width: 112px;
            overflow: hidden;
            text-overflow: clip;
            white-space: nowrap;
        }
        .login {
            position: absolute;
            top: 50%;
            right: 20px;
            margin-top: -28px;
            width: 80px;
            height: 56px;
            line-height: 56px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            padding-left: 14px;
            padding-right: 14px;
            cursor: pointer;
            color: #fff;
        }
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
        top: 56px;
        left: 0;
        z-index: 200;
        width: 100%;
        height: 56px;
        line-height: 56px;
        font-size: 16px;
        color: #8e8e8e;
        cursor: pointer;
    }

</style>