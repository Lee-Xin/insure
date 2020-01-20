<template>
  <div>
    <page-hr></page-hr>
    <div class="content_box">
      <el-form ref="form" :model="form" class="search_form">
        <el-form-item>
          <div class="cell_before">选择机构</div>
          <el-select v-model="form.mechanism" placeholder="请选择分支机构" clearable filterable>
            <el-option
              v-for="item in mechanismList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label>
          <div class="cell_before">月份</div>
          <el-date-picker type="month" v-model="form.month" value-format="yyyy-MM"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        @click="dialogVisible=true"
        style="float:right;margin-bottom:20px"
      >导出</el-button>
      <el-table :data="tableList" style="width: 100%">
        <el-table-column prop="name" label="机构简称"></el-table-column>
        <el-table-column prop="lifeTarget" label="生命线目标"></el-table-column>
        <el-table-column prop="end" label="预警日保费达成"></el-table-column>
        <el-table-column prop="finish" label="预警日完成率"></el-table-column>
        <el-table-column prop="monthEnd" label="本月保费达成"></el-table-column>
        <el-table-column prop="monthFinish" label="本月完成率"></el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
      </el-table>
    </div>
    <el-dialog title="导出报表" :visible.sync="dialogVisible">
      <el-form ref="exportMonthForm" :model="exportMonthForm" class="dialog_from_center">
        <el-form-item>
          <div class="cell_before">机构</div>

          <el-select v-model="exportMonthForm.mechanism" placeholder="请选择分支机构" clearable filterable>
            <el-option
              v-for="item in mechanismList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="cell_before">月份</div>
          <el-date-picker v-model="exportMonthForm.month" type="month" value-format="yyyy-MM"></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="exportFile">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PageHr from "@/common/PageHr";
import {
  getallparameter,
  getlifelinereport,
  exportlifelinereport
} from "@/mock/api";
import formatDate from "@/common/formatDate.js";

export default {
  name: "LifelineReport",
  components: { PageHr },
  data() {
    return {
      form: {
        month: null,
        mechanism: null
      },
      exportMonthForm: {
        mechanism: null,
        month: null
      },
      tableList: [],
      dialogVisible: false,
      mechanismList: []
    };
  },
  created() {
    this.form.month = formatDate.month(new Date());
    this.getData();
    this.getList();
  },
  methods: {
    getData() {
      getallparameter().then(res => {
        this.mechanismList = res.Data.jigou;
      });
    },
    getList() {
      getlifelinereport(this.form).then(res => {
        this.tableList = res.Data;
      });
    },
    exportFile() {
      exportlifelinereport().then(res => {
        this.dialogVisible = false;
        console.log(res);
        this.$message.success(res.data.Msg);
        // window.open(res.data.Data.url);
      });
    }
  }
};
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

.row_2 {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  /*background-color: red;*/
}
.form_import {
  width: 100%;
  height: 60px;
}
.form_table {
  width: 100%;
  height: 500px;
  border: 1px solid #666;
}
</style>