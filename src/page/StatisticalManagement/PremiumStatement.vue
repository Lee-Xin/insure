<template>
  <div>
    <main-title :title="title" :title_f="title_f" t></main-title>
    <page-hr></page-hr>
    <div class="content_box" v-if="searchORnewsupplier">
      <span class="content_title_1">快速搜索</span>
      <el-form ref="form" :model="form" label-width="80px">
        <div class="row_2">
          <el-form-item label="分支机构">
            <el-select v-model="form.region" placeholder="请选择分支机构">
              <el-option label="请选择" value="shanghai"></el-option>
              <el-option label="重庆众鼎保险代理有限公司南岸区第三营业部" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="绩效年月">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="承保日期">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">搜索</el-button>
          </el-form-item>
        </div>
      </el-form>
      <div class="formTable">

      </div>
    </div>
  </div>
</template>

<script>
    import MainTitle from "@/common/MainTitle";
    import PageHr from "@/common/PageHr";

    export default {
        name: "PremiumStatement",
        data() {
            return {
                title: '保费报表',
                title_f: '这是保费报表',
                searchORnewsupplier: true,
                form: {
                    region: '',
                    date1: ''
                }
            }
        },
        components: {PageHr, MainTitle}
    }
</script>

<style scoped>
.row_2{
  width: 100%;
  height: 40px;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  margin-top: 20px;
}
  .formTable{
    width: 100%;
    min-height: 300px;
    border: 1px solid #666;
    margin-top: 50px;
    overflow-x: scroll;
  }
</style>