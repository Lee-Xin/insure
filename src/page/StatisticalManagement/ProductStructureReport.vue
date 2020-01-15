<template>
  <div>
    <page-hr></page-hr>
    <div class="content_box">
      <el-form ref="form" :model="form" class="search_form">
        <el-form-item>
          <div class="cell_before">选择供应商</div>
          <el-select v-model="form.supplier" placeholder="请选择保险公司" clearable filterable>
            <el-option
              v-for="item in supplierList"
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
      <div class="form_cord">
        <div class="form_cord_children">
          <span>承保总件数(件)</span>
          <span>{{totalNum}}</span>
        </div>
        <div class="form_cord_children" style="margin:0 20px">
          <span>承保总保费(元)</span>
          <span>{{totalMoney}}</span>
        </div>
        <div class="form_cord_children">
          <span>件均保费(元)</span>
          <span>{{numAvgMoney}}</span>
        </div>
      </div>
      <el-table :data="tableList" style="width: 100%;">
        <el-table-column prop="supplier" label="供应商"></el-table-column>
        <el-table-column prop="xianzhong" label="险种"></el-table-column>
        <el-table-column prop="money" label="承保保费(元)"></el-table-column>
        <el-table-column prop="num" label="保单件数(件)"></el-table-column>
        <el-table-column prop="id" label="查看详情">
          <template slot-scope="scope">
            <el-button type="text" @click="detail(scope.row.id)">查看详情</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="时间段"></el-table-column>
      </el-table>
    </div>
    <el-dialog title="导出报表" :visible.sync="dialogVisible">
      <el-form ref="exportMonthForm" :model="exportMonthForm" class="dialog_from_center">
        <el-form-item>
          <div class="cell_before">选择供应商</div>
          <el-select v-model="exportMonthForm.supplier" placeholder="请选择保险公司" clearable filterable>
            <el-option
              v-for="item in supplierList"
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

    <el-dialog title="查看详情" :visible.sync="dialogVisibleDetail" width="900px">
      <el-button type="primary" @click="exportFileDetail" style="float:right;margin-bottom:20px">导出</el-button>
      <el-table :data="tableDetailList" style="width: 100%;">
        <el-table-column prop="supplier" label="供应商"></el-table-column>
        <el-table-column prop="xianzhong" label="险种"></el-table-column>
        <el-table-column prop="baodanId" label="保单号"></el-table-column>
        <el-table-column prop="money" label="承保保费(元)"></el-table-column>
        <el-table-column prop="jiaofeiqijian" label="交费期间"></el-table-column>
        <el-table-column prop="time" label="时间段"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisibleDetail = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PageHr from "@/common/PageHr";
import {
  getallparameter,
  getproductStructureList,
  getproductStructureDetailList,
  exportproductStructureDetail,
  exportproductStructure
} from "@/mock/api";
import formatDate from "@/common/formatDate.js";

export default {
  name: "ProductStructureReport",
  data() {
    return {
      form: {
        month: null,
        supplier: null
      },
      exportMonthForm: {
        month: null,
        supplier: null
      },
      supplierList: [],
      dialogVisible: false,
      tableList: [],
      totalMoney: 0,
      totalNum: 0,
      numAvgMoney: 0,
      dialogVisibleDetail: false,
      tableDetailList: [],
      id: null
    };
  },
  components: { PageHr },
  created() {
    this.form.month = formatDate.month(new Date());
    this.getData();
    this.getList();
  },
  methods: {
    getData() {
      getallparameter().then(res => {
        this.supplierList = res.Data.gongyingshang;
      });
    },
    getList() {
      getproductStructureList(this.form).then(res => {
        const data = res.Data;
        this.totalMoney = data.totalMoney;
        this.totalNum = data.totalNum;
        this.numAvgMoney = data.numAvgMoney;
        this.tableList = data.list;
      });
    },
    exportFile() {
      exportproductStructure().then(res => {
        this.dialogVisible = false;
        console.log(res);
        this.$message.success(res.data.Msg);
        // window.open(res.data.Data.url);
      });
    },
    detail(id) {
      this.id = id;
      getproductStructureDetailList({ id }).then(res => {
        this.tableDetailList = res.Data;
        this.dialogVisibleDetail = true;
      });
    },
    exportFileDetail() {
      exportproductStructureDetail({ id: this.id }).then(res => {
        console.log(res);
        this.$message.success(res.data.Msg);
        // window.open(res.data.Data.url);
      });
    }
  }
};
</script>

<style scoped lang="less">
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
.form_cord {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.form_cord_children {
  width: 300px;
  height: 120px;
  border: 1px solid #69efe6;
  border-radius: 4px;
  box-shadow: 0 0 4px #888;
  &:hover {
    transform: translateY(-5px);
  }
  cursor: pointer;
}
.form_cord_children span:first-child {
  width: 100%;
  height: 40px;
  display: block;
  line-height: 40px;
  font-size: 24px;
  color: #4074e1;
  margin-top: 10px;
}
.form_cord_children span:last-child {
  width: 100%;
  height: 20px;
  font-size: 16px;
  color: #666;
  display: block;
  margin-top: 30px;
}
</style>