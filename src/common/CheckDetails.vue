<template>
  <div>
    <div class="popup_window">
      <div class="popup_div">
        <div class="popup_div_title">{{title}}</div>
        <div class="popup_div_table">
          <el-table :data="tableDataDetails" style="width: 100%; padding: 0 30px;">
            <el-table-column v-for="(item, index) in tableEle" :prop="index" :label="item" :key="index"></el-table-column>
          </el-table>
        </div>
        <div class="popup_button">
          <el-button @click="cancelPopup">取消</el-button>
          <el-button @click="cancelPopup">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "CheckDetails",
        props: {
            'tableEle': Object,
            'tableDataDetails': Array,
            title: String
            // 'tableDataDetails': []
        },
        methods: {
            cancelPopup(){
                this.$emit('showPage');
            }
        }
    }
</script>

<style scoped>
  .popup_button button {
    margin-right: 30px;
  }

  .popup_button {
    width: 100%;
    height: 40px;
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: flex-end;
  }

  .popup_div_title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #fff;
    text-align: center;
    font-size: 16px;
    background-color: #4074e1;
  }

  .popup_window {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 500;
    background-color: rgba(0, 0, 0, .5);
  }

  .popup_div {
    width: 600px;
    height: 300px;
    border-radius: 0 0 10px 10px;
    position: absolute;
    top: 50%;
    margin-top: -150px;
    left: 50%;
    margin-left: -300px;
    background-color: #fff;
  }
  .popup_div_table{
    width: 100%;
    height: 200px;
    overflow-x: scroll;
    overflow-y: scroll;
  }
</style>