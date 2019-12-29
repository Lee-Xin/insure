<template>
  <div>
    <main-title :title="title" :title_f="title_f" t></main-title>
    <page-hr></page-hr>
    <div class="content_box" v-if="searchORnewsupplier">
      <span class="content_title_1">快速搜索</span>

      <el-form ref="form" :model="form" label-width="80px">
        <div class="row_2">
          <el-form-item label="活动名称">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动名称">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="活动名称">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">搜索</el-button>
          </el-form-item>
        </div>
      </el-form>
      <div class="form_table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="姓名"></el-table-column>
          <el-table-column prop="name" label="工号"></el-table-column>
          <el-table-column prop="address" label="所属机构"></el-table-column>
          <el-table-column prop="address" label="当前职级"></el-table-column>
          <el-table-column prop="address" label="件数"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
    import MainTitle from "@/common/MainTitle";
    import PageHr from "@/common/PageHr";

    export default {
        name: "NumberReport",
        data() {
            return {
                form: {
                    name: '',
                    region: '',
                    date1: ''
                },
                title: '件数报表',
                title_f: '这是件数报表',
                searchORnewsupplier: true
            }
        },
        components: {PageHr, MainTitle}
    }
</script>

<style scoped>
  .row_2 {
    width: 100%;
    height: 40px;
    /*background-color: red;*/
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
  }
  .form_table{
    margin-top: 40px;
    width: 100%;
    min-height: 300px;
    border: 1px solid #666;
  }
</style>