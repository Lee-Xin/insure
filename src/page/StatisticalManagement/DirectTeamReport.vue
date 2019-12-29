<template>
  <div>
    <main-title :title="title" :title_f="title_f" t></main-title>
    <page-hr></page-hr>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="月度" name="first">
        <el-form ref="form" :model="form" label-width="80px">
          <div class="row_2">
            <el-form-item>
              <el-select v-model="form.region" placeholder="分支机构">
                <el-option label="全部" value="shanghai"></el-option>
                <el-option label="重庆众鼎保险代理有限公司南岸区第三营业部" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="form.region" placeholder="团队类型">
                <el-option label="直辖组" value="shanghai"></el-option>
                <el-option label="直辖部" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-date-picker type="date" placeholder="年度" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-select v-model="form.region" placeholder="月份">
                <el-option label="一月" value="shanghai"></el-option>
                <el-option label="二月" value="shanghai"></el-option>
                <el-option label="三月" value="shanghai"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">查询</el-button>
            </el-form-item>
          </div>
        </el-form>
        <div class="tab1_table">
          <el-table :data="tab1_tableData" style="width: 100%">
            <el-table-column prop="date" label="姓名"></el-table-column>
            <el-table-column prop="name" label="工号"></el-table-column>
            <el-table-column prop="address" label="所属机构"></el-table-column>
            <el-table-column prop="address" label="当前职级"></el-table-column>
            <el-table-column prop="address" label="标准保费"></el-table-column>
            <el-table-column prop="address" label="团队继续率R13"></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="季度" name="second">
        <el-form ref="form" :model="form" label-width="80px">
          <div class="row_2">
            <el-form-item>
              <el-select v-model="form.region" placeholder="分支机构">
                <el-option label="全部" value="shanghai"></el-option>
                <el-option label="重庆众鼎保险代理有限公司南岸区第三营业部" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="form.region" placeholder="团队类型">
                <el-option label="直辖组" value="shanghai"></el-option>
                <el-option label="直辖部" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-date-picker type="date" placeholder="年度" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-select v-model="form.region" placeholder="月份">
                <el-option label="一月" value="shanghai"></el-option>
                <el-option label="二月" value="shanghai"></el-option>
                <el-option label="三月" value="shanghai"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">查询</el-button>
            </el-form-item>
          </div>
        </el-form>
        <div class="tab1_table">
          <el-table :data="tab1_tableData" style="width: 100%">
            <el-table-column prop="date" label="姓名"></el-table-column>
            <el-table-column prop="name" label="工号"></el-table-column>
            <el-table-column prop="address" label="所属机构"></el-table-column>
            <el-table-column prop="address" label="当前职级"></el-table-column>
            <el-table-column prop="address" label="标准保费"></el-table-column>
            <el-table-column prop="address" label="团队继续率R13"></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="年度" name="third">
        <el-form ref="form" :model="form" label-width="80px">
          <div class="row_2">
            <el-form-item>
              <el-select v-model="form.region" placeholder="分支机构">
                <el-option label="全部" value="shanghai"></el-option>
                <el-option label="重庆众鼎保险代理有限公司南岸区第三营业部" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="form.region" placeholder="团队类型">
                <el-option label="直辖组" value="shanghai"></el-option>
                <el-option label="直辖部" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-date-picker type="date" placeholder="年度" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-select v-model="form.region" placeholder="月份">
                <el-option label="一月" value="shanghai"></el-option>
                <el-option label="二月" value="shanghai"></el-option>
                <el-option label="三月" value="shanghai"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">查询</el-button>
            </el-form-item>
          </div>
        </el-form>
        <div class="tab1_table">
          <el-table :data="tab1_tableData" style="width: 100%">
            <el-table-column prop="date" label="姓名"></el-table-column>
            <el-table-column prop="name" label="工号"></el-table-column>
            <el-table-column prop="address" label="所属机构"></el-table-column>
            <el-table-column prop="address" label="当前职级"></el-table-column>
            <el-table-column prop="address" label="标准保费"></el-table-column>
            <el-table-column prop="address" label="团队继续率R13"></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div v-if="searchORnewsupplier">
      <page-ination></page-ination>
    </div>
  </div>
</template>

<script>
    import MainTitle from "@/common/MainTitle";
    import PageHr from "@/common/PageHr";
    import PageInation from "../../common/PageInation";

    export default {
        name: "DirectTeamReport",
        data() {
            return {
                title: '直辖团队报表',
                title_f: '这是直辖团队报表',
                searchORnewsupplier: true,
                form: {
                    name: '',
                    region: ''
                },
                activeName: ''
            }
        },
        components: {PageInation, PageHr, MainTitle},
    }
</script>

<style scoped>
  .row_2 {
    width: 100%;
    height: 40px;
    margin-top: 30px;
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
  }
  .tab1_table{
    width: 100%;
    min-height: 300px;
    margin-top: 40px;
    border: 1px solid #666;
  }
</style>