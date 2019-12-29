<template>
  <div>
    <main-title :title="title" :title_f="title_f"></main-title>
    <page-hr></page-hr>
    <div class="content_box" v-if="searchORnewsupplier">
      <span class="content_title_1">快速搜索</span>
      <el-form ref="form" :model="form" label-width="80px">
        <div class="row_2">
          <el-form-item label="机构">
            <el-select v-model="form.region" placeholder="请选择分支机构">
              <el-option label="全部" value="shanghai"></el-option>
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
      <div class="import">
        <el-button type="primary">导入</el-button>
      </div>
      <div class="tableData">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="序号"></el-table-column>
          <el-table-column prop="name" label="机构简称"></el-table-column>
          <el-table-column prop="address" label="生命线目标"></el-table-column>
          <el-table-column prop="address" label="启动达成数"></el-table-column>
          <el-table-column prop="address" label="推动达成数"></el-table-column>
          <el-table-column prop="address" label="冲锋周达成数"></el-table-column>
          <el-table-column prop="address" label="达标周达成数"></el-table-column>
          <el-table-column prop="address" label="当前差额"></el-table-column>
          <el-table-column prop="address" label="当前达成率"></el-table-column>
          <el-table-column prop="address" label="时间段"></el-table-column>

        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
    import MainTitle from "@/common/MainTitle";
    import PageHr from "@/common/PageHr";

    export default {
        name: "TargetProgressTracking",
        data() {
            return {
                form: {
                    name: '',
                    region: ''
                },
                title: '目标进度追踪',
                title_f: '这是目标进度追踪页面',
                searchORnewsupplier: true
            }
        },
        components: {PageHr, MainTitle},

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
    display: flex;
    justify-content: flex-start;
  }
  .import{
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    padding-right: 40px;
    display: flex;
    justify-content: flex-end;
    /*background-color: red;*/
  }
  .tableData{
    width: 100%;
    min-height: 500px;
    margin-top: 30px;
    border: 1px solid #999;
  }
</style>