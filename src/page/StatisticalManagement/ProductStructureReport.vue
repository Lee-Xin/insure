<template>
  <div>
    <main-title :title="title" :title_f="title_f" t></main-title>
    <page-hr></page-hr>
    <div class="content_box" v-if="searchORnewsupplier">

      <el-form ref="form" :model="form" label-width="100px">
        <div class="row_2">
          <el-form-item label="选择供应商">
            <el-input v-model="form.name" placeholder="选择保险公司"></el-input>
          </el-form-item>
          <el-form-item>
            <el-date-picker type="date" placeholder="2019-11" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">搜索</el-button>
          </el-form-item>
        </div>
      </el-form>
      <div class="form_cord">
        <div class="form_cord_children">
          <span>承保总件数(件)</span>
          <span>0</span>
        </div>
        <div class="form_cord_children">
          <span>承保总保费(元)</span>
          <span>0</span>
        </div>
        <div class="form_cord_children">
          <span>件均保费(元)</span>
          <span>0</span>
        </div>
      </div>
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
    import MainTitle from "@/common/MainTitle";
    import PageHr from "@/common/PageHr";

    export default {
        name: "ProductStructureReport",
        data() {
            return {
                form: {
                    name: '',
                    region: ''
                },
                title: '产品结构报表',
                title_f: '这是产品结构报表页面',
                searchORnewsupplier: true
            }
        },
        components: {PageHr, MainTitle}
    }
</script>

<style scoped>
  .content_box {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding-left: 16px;
  }

  .row_2 {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    /*background-color: red;*/
  }
  .form_cord{
    width: 100%;
    height: 300px;
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    /*background-color: red;*/
  }
  .form_cord_children{
    width: 300px;
    height: 120px;
    border: 1px solid #000;
    margin-bottom: 60px;
  }
  .form_cord_children span:first-child{
    width: 100%;
    height: 40px;
    display: block;
    line-height: 40px;
    font-size: 32px;
    color: #4074e1;
    /*background-color: #ef8412;*/
    margin-top: 10px;
  }
  .form_cord_children span:last-child{
    width: 100%;
    height: 20px;
    font-size: 16px;
    color: #666;
    display: block;
    margin-top: 30px;
    /*background-color: #ef8412;*/
  }
</style>