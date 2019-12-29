<template>
  <div>
    <div class="RenewalDataSearch">
      <el-form ref="form" :model="form" label-width="120px">
        <div class="row_4">
          <el-form-item label="机构名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="保险公司">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="保单号">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="代理人">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </div>
        <div class="row_4">
          <el-form-item label="服务人员">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="生效年月">
            <el-date-picker
              type="date"
              placeholder="Pick a date"
              v-model="form.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="交费年度">
            <el-date-picker
              type="date"
              placeholder="Pick a date"
              v-model="form.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="实收状态">
            <el-select v-model="form.region" placeholder="please select your zone">
              <el-option label="Zone one" value="shanghai"></el-option>
              <el-option label="Zone two" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button type="primary">模板下载</el-button>
          <el-button>导入</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="Date" width="180"></el-table-column>
        <el-table-column prop="name" label="Name" width="180"></el-table-column>
        <el-table-column prop="address" label="Address"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "RenewalDataSearch",
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: ""
      }
    };
  }
};
</script>

<style scope>
.RenewalDataSearch {
  width: 100%;
  min-height: 500px;
  /* background-color: red; */
}
.row_4 {
  width: 100%;
  height: 40px;
  background-color: blue;
  display: flex;
  justify-content: flex-start;
}
.row_4 >>> .el-form-item {
  width: 100%;
}
.row_4 >>> .el-form-item .el-form-item__content {
  width: 100%;
}
.row_4 >>> .el-form-item .el-form-item__content .el-date-editor,
.row_4 >>> .el-form-item .el-form-item__content .el-input,
.row_4 >>> .el-form-item .el-form-item__content .el-select {
  width: 100%;
}
</style>