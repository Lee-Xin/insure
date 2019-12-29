<template>
  <div>
    <main-title :title="title" :title_f="title_f"></main-title>
    <page-hr></page-hr>
    <div class="NewBasicLaw">
      <div class="NewBasicLaw_hr"></div>
      <div class="NewBasicLaw_children">
        <div class="NewBasicLaw-icon">1</div>
        <span>新增基本法模版</span>
      </div>
      <div class="NewBasicLaw_children">
        <div class="NewBasicLaw-icon">2</div>
        <span>职级设置</span>
      </div>
      <div class="NewBasicLaw_children">
        <div class="NewBasicLaw-icon">3</div>
        <span> 薪资职级设置</span>
      </div>
      <div class="NewBasicLaw_children">
        <div class="NewBasicLaw-icon">4</div>
        <span>晋升设置</span>
      </div>
      <div class="NewBasicLaw_children">
        <div class="NewBasicLaw-icon">5</div>
        <span>考核设置</span>
      </div>

    </div>
    <el-button type="primary" class="NewBasicLaw-button">下一步</el-button>
  </div>
</template>

<script>
    import MainTitle from "@/common/MainTitle";
    import PageHr from "@/common/PageHr";

    export default {
        name: "NewBasicLaw",
        data() {
            return {
                title: '新增基本法',
                title_f: '这是新增基本法'
            }
        },
        components: {PageHr, MainTitle}
    }
</script>

<style scoped>
  .NewBasicLaw {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }

  .NewBasicLaw_children {
    width: 140px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    /*background-color: #fff;*/
  }
  .NewBasicLaw-icon{
    width: 26px;
    height: 26px;
    line-height: 26px;
    border: 1px solid #999;
    border-radius: 50%;
    font-size: 16px;
    color: #999;
  }
  .NewBasicLaw_children span{
    width: 114px;
    height: 16px;
    display: block;
    line-height: 16px;
    font-size: 16px;
    color: #999;
    /*background-color: red;*/
  }
  .NewBasicLaw_hr{
    width: 100%;
    height: 1px;
    position: absolute;
    top: 50%;
    /*margin-top: -40px;*/
    left: 0;
    /*z-index: -100;*/
    background-color: #999;
  }
  .NewBasicLaw-button{
    position: fixed;
    bottom: 40px;
  }
</style>