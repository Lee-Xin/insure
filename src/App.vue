<template>
  <div id="app">
    <index-top v-if="showLogin"></index-top>
    <index-left v-if="showLogin"></index-left>
    <div id="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
    import IndexTop from "@/common/IndexTop";
    import IndexLeft from "@/common/IndexLeft";
    export default {
        name: 'app',
        data() {
          return{
            showLogin: true
          }
        },
        components: {
            IndexLeft,
            IndexTop
        },
        mounted: function() {
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
                if (oldVal === '/Login' && this.$store.getters.IS_TOKEN === true){
                    this.showLogin = true;
                    this.$router.push('/Index');
                }
            }
        }
    }
</script>

<style>
  #app {
    text-align: center;
    box-sizing: border-box;
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
    left: 182px;
    right: 0;
    top: 48px;
    height: auto;
    font-size: 0;
    padding: 0 15px;
  }
  h2 {
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: normal;
  }
  a{
    text-decoration: none;
    color: #999;
  }
</style>
