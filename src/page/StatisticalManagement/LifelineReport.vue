<template>
  <div>
    <main-title :title="title" :title_f="title_f" t></main-title>
    <page-hr></page-hr>
    <div class="content_box" v-if="searchORnewsupplier">
      <span class="content_title_1">快速搜索</span>
      <el-form ref="form" :model="form" label-width="80px">
        <div class="row_2">
          <el-form-item>
            <el-select v-model="form.region" placeholder="请选择分支结构">
              <el-option label="请选择机构" value="shanghai"></el-option>
              <el-option label="重庆众鼎保险代理有限公司南岸区第三营业部" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">搜索</el-button>
          </el-form-item>
        </div>
      </el-form>
      <div class="form_import">
        <el-button type="primary">导入</el-button>
      </div>
      <div class="form_table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="机构简称"></el-table-column>
          <el-table-column prop="name" label="生命线目标"></el-table-column>
          <el-table-column prop="address" label="预警日保费达成"></el-table-column>
          <el-table-column prop="address" label="预警日完成率"></el-table-column>
          <el-table-column prop="address" label="本月保费达成"></el-table-column>
          <el-table-column prop="address" label="本月完成率"></el-table-column>
          <el-table-column prop="address" label="时间"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
    import MainTitle from "@/common/MainTitle";
    import PageHr from "@/common/PageHr";

    export default {
        name: "LifelineReport",
        components: {PageHr, MainTitle},
        data() {
            return {
                title: '生命线报表',
                title_f: '这是生命线报表',
                searchORnewsupplier: true,
                form: {
                    name: '',
                    region: ''
                },
                tableData: []
            }
        }
    }
</script>

<style scoped>
  .content_box {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding-left: 16px;
  }

  .content_title_1 {
    width: 100%;
    height: 18px;
    display: block;
    line-height: 18px;
    font-size: 18px;
    color: #ef8412;
    text-align: left;
    margin-bottom: 20px;
  }

  .row_2{
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    /*background-color: red;*/
  }
  .form_import{
    width: 100%;
    height: 60px;
  }
  .form_table{
    width: 100%;
    height: 500px;
    border: 1px solid #666;
  }
</style>