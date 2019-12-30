<template>
    <div id="app">
        <index-top v-if="showLogin"></index-top>
        <index-left v-if="showLogin"></index-left>
        <div id="main">
            <main-title title="承保业绩统计"></main-title>
            <div class="main">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
    import IndexTop from "@/common/IndexTop";
    import IndexLeft from "@/common/IndexLeft";
    import MainTitle from '@/common/MainTitle';

    export default {
        name: 'app',
        data() {
            return {
                showLogin: true
            }
        },
        components: {
            IndexLeft,
            IndexTop,
            MainTitle
        },
        mounted: function () {
            if (this.$route.path === "/Login") {
                this.showLogin = false;
            } else {
                this.showLogin = true;
            }
        },
        watch: {
            '$route.path': function (newVal, oldVal) {
                if (newVal === '/Login' && this.$store.getters.IS_TOKEN === false) {
                    this.showLogin = false;
                }
                if (oldVal === '/Login' && this.$store.getters.IS_TOKEN === true) {
                    this.showLogin = true;
                    this.$router.push('/Index');
                }
            }
        }
    }
</script>

<style>
    html{
        overflow: hidden;
    }
    #app {
        text-align: center;
        box-sizing: border-box;
        overflow: hidden;
    }

    ul {

        list-style-type: disc;
        margin-block-start: 0em;
        margin-block-end: 0em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        overflow: hidden;
        padding-inline-start: 0px;
    }

    #main {
        position: absolute;
        left: 194px;
        right: 0;
        top: 56px;
        height: calc(100vh - 121px);
        font-size: 0;
        background-color: #edf2f6;
    }
    .main{
        margin: 15px;
    }
    *{
        margin: 0;
        padding: 0;
    }
    a {
        text-decoration: none;
        color: #999;
    }
</style>
