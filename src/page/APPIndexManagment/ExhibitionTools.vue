<template>
  <div>
    <div class="body-box">
      <h3 style="margin-bottom:20px">快速搜索</h3>
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

        <el-form-item>
          <div class="cell_before">类型</div>

          <el-select v-model="form.type" placeholder="请选择" clearable filterable>
            <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">搜索</el-button>
        </el-form-item>
      </el-form>
      <div style="text-align:right;margin:20px 0;">
        <el-button type="primary" @click="addDiaolog(1)">添加</el-button>
      </div>
      <el-table
        :data="tableData"
        @current-change="handleClick"
        highlight-current-row
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="supplier" label="供应商"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="remarks" label="备注"></el-table-column>
      </el-table>
    </div>
    <page-ination @changeSize="changeSize" @changeCurrentPage="changeCurrentPage" :total="totalNum">
      <div>
        <el-button @click="dialogVisible=true" type="danger" :disabled="isDisabledForm.del">删除</el-button>
        <el-button type="primary" @click="addDiaolog(2)" :disabled="isDisabledForm.edit">编辑</el-button>
        <el-button type="primary" @click="addDiaolog(3)" :disabled="isDisabledForm.view">查看</el-button>
      </div>
    </page-ination>
    <el-dialog title="删除" :visible.sync="dialogVisible" width="400px">
      <div style="text-align:left">
        <span>请确认删除此项数据。</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="del()">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="addForm.title" :visible.sync="addForm.isShow" width="1000px">
      <el-form ref="addForm" :model="addForm.data" class="dialog_from_center300">
        <el-form-item>
          <div class="cell_before yellow">*类型</div>
          <el-select
            v-model="addForm.data.type"
            placeholder="请选择"
            clearable
            filterable
            :disabled="disabled"
          >
            <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="cell_before">选择供应商</div>
          <el-select
            v-model="addForm.data.supplier"
            placeholder="请选择"
            :disabled="disabled"
            clearable
            filterable
          >
            <el-option
              v-for="item in supplierList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-row>
          <el-col :span="2" style="text-align:left">
            <el-button type="warning" @click="addTagsIsShow=true" :disabled="disabled">添加列</el-button>
          </el-col>
          <el-col :span="22" style="text-align:left">
            <el-tag
              style="margin-bottom:10px"
              v-for="(tag,i) in tags"
              :key="i"
              closable
              @close="delCol(i)"
            >{{tag}}</el-tag>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px">
          <el-col style="text-align:left">
            <el-button>添加行</el-button>
            <el-input style="width:300px" v-model="rows"></el-input>
            <el-button
              type="primary"
              @click="addRow"
              v-if="tags.length&&rows"
              :disabled="disabled"
            >确认</el-button>
          </el-col>
        </el-row>
        <el-table :data="addForm.data.tableList" border style="width: 100%;margin:20px 0;">
          <el-table-column type="index" label="序号" width="100"></el-table-column>
          <el-table-column v-for="(item,i) in tags" :label="item" :key="i">
            <template slot-scope="scope">
              <el-input v-model="addForm.data.tableList[scope.$index][item]" :disabled="disabled"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="删除行">
            <template slot-scope="scope">
              <el-button type="danger" @click="delRow(scope.$index)" :disabled="disabled">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-form-item>
          <div class="cell_before">备注</div>
          <el-input v-model="addForm.data.remarks" placeholder="请输入" clearable :disabled="disabled"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addForm.isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="添加表头名称" :visible.sync="addTagsIsShow" width="400px">
      <div style="text-align:left">
        <el-input v-model="tagsName"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addTagsIsShow = false;tagsName=''">取消</el-button>
        <el-button type="primary" @click="addCol">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  ExhibitionTools,
  getallparameter,
  getExhibitionToolTypeList,
  ExhibitionToolsDelete,
  addExhibitionTools
} from "@/mock/api";
import PageInation from "../../common/PageInation";
export default {
  name: "ExhibitionTools",
  data() {
    return {
      form: {
        supplier: "",
        type: "",
        MaxResultCount: 50, //页码数
        Sorting: 1, //排序
        SkipCount: 0 //开始的索引
      },
      totalNum: 0,
      supplierList: [],
      typeList: [],
      tableData: [],
      isDisabledForm: {
        del: true,
        edit: true,
        view: true,
        send: true,
        notSend: true
      },
      isShowForm: { send: true },
      clickRow: {},
      dialogVisible: false,
      addForm: {
        title: "",
        isShow: false,
        n: "",
        data: {
          type: "",
          supplier: "",
          remarks: "",
          tableList: [],
          id: null
        }
      },
      tags: [],
      addTagsIsShow: false,
      tagsName: "",
      rows: "",
      disabled: false
    };
  },
  watch: {
    clickRow(row) {
      if (row.id !== undefined && row.id !== "" && row.id !== null) {
        this.isDisabledForm = {
          del: false,
          edit: false,
          send: false,
          notSend: false,
          view: false
        };
        this.isShowForm.send = row.status == 2 ? true : false;
      } else {
        this.isDisabledForm = {
          del: true,
          edit: true,
          send: true,
          notSend: true,
          view: true
        };
        this.isShowForm = { send: true };
      }
    }
  },
  components: { PageInation },
  created: function() {
    this.getData();
    this.getList();
  },
  methods: {
    getData() {
      getallparameter().then(res => {
        this.supplierList = res.Data.gongyingshang;
      });
      getExhibitionToolTypeList().then(res => {
        this.typeList = res.Data;
      });
    },
    handleQuery() {
      this.form.SkipCount = 0;
      this.getList();
    },
    changeSize(val) {
      this.form.SkipCount = 0;
      this.form.MaxResultCount = val;
      this.getList(this.form);
    },
    //  当前页发生改变时
    changeCurrentPage(val) {
      this.form.SkipCount = (val - 1) * this.form.MaxResultCount;
      this.getList(this.form);
    },

    // 获取所有数据
    getList() {
      this.clickRow = {};
      ExhibitionTools(this.form).then(res => {
        this.tableData = res.result.items;
        this.totalNum = res.result.totalCount;
      });
    },
    addDiaolog(n) {
      if (n == 1) {
        this.addForm.title = "添加";
        this.disabled = false;
        this.addForm.data.tableList = [];
        this.addForm.data.type = "";
        this.addForm.data.supplier = "";
        this.addForm.data.remarks = "";
        this.tags = [];
        this.addForm.data.id = "";
        this.addForm.n = 1;
      } else if (n == 2) {
        this.addForm.title = "编辑";
        this.disabled = false;
        this.addForm.data.tableList = this.clickRow.list;
        console.log(this.addForm.data.tableList);
        this.addForm.data.type = this.clickRow.type;
        this.addForm.data.supplier = this.clickRow.supplier;
        this.addForm.data.remarks = this.clickRow.remarks;
        this.tags = this.clickRow.list.length
          ? Object.keys(this.clickRow.list[0])
          : [];
        this.addForm.data.id = this.clickRow.id;
        this.addForm.n = 2;
      } else {
        this.disabled = true;
        this.addForm.title = "查看";
        this.addForm.data.tableList = this.clickRow.list;
        this.addForm.data.type = this.clickRow.type;
        this.addForm.data.supplier = this.clickRow.supplier;
        this.addForm.data.remarks = this.clickRow.remarks;
        this.tags = this.clickRow.list.length
          ? Object.keys(this.clickRow.list[0])
          : [];
        this.addForm.data.id = this.clickRow.id;
        this.addForm.n = 3;
      }
      this.addForm.isShow = true;
    },
    handleClick(row, column, event) {
      this.clickRow = row;
    },
    del() {
      ExhibitionToolsDelete({ id: this.clickRow.id }).then(res => {
        this.$message(res.data.Msg);
        this.dialogVisible = false;
        this.getList();
      });
    },
    confirm() {
      if (this.addForm.n == 3) {
        this.addForm.isShow = false;
      } else {
        console.log(this.addForm.data);
        if (!this.addForm.data.type) return this.$message("请选择类型");
        addExhibitionTools(this.addForm.data).then(res => {
          this.$message(res.data.Msg);
          this.addForm.isShow = false;
        });
      }
    },
    addCol() {
      let tableList = this.addForm.data.tableList;
      if (tableList.length) {
        let isNotPass = Object.keys(tableList[0]).some(
          i => i === this.tagsName
        );
        if (isNotPass) return this.$message(`表头${this.tagsName}已存在`);
        this.tags.push(this.tagsName);
        let list = [];
        tableList.map((item, i) => {
          let obj = {};
          Object.keys(item).map(item2 => {
            obj[item2] = item[item2];
          });
          obj[this.tagsName] = "";
          list.push(obj);
        });
        this.addForm.data.tableList = list;
        this.tagsName = "";
        this.addTagsIsShow = false;
      } else {
        this.tags.push(this.tagsName);
        this.tagsName = "";
        this.addTagsIsShow = false;
      }
    },
    delCol(i) {
      let delItem = this.tags.splice(i, 1);
      let tableList = this.addForm.data.tableList;
      tableList.map((item, i, arr) => {
        delete arr[i][delItem];
      });
    },
    addRow() {
      let rows = parseInt(this.rows);
      if (isNaN(rows)) return this.$message("添加的行数必须是正整数");
      this.rows = rows;
      let tableList = this.addForm.data.tableList;

      for (let i = 0; i < rows; i++) {
        let data = {};
        this.tags.map(item => {
          data[item] = "";
        });
        tableList.push(data);
      }
    },
    delRow(i) {
      this.addForm.data.tableList.splice(i, 1);
    }
  }
};
</script>

<style scoped lang=less>
.body-box {
  font-size: 16px;
  width: 100%;
  border-top: 4px solid #2c8cf0;
  border-radius: 5px 5px 0 0;
  padding: 20px;
  box-sizing: border-box;
  text-align: left;
  background: #fff;
}
.body-box h3 {
  font-weight: normal;
  margin: 0;
  color: #f39312;
}
.date-select {
  margin: 22px 0;
}
.btn-group {
  text-align: right;
}

.el-table {
  margin-top: 20px;
}
.el-table .cell {
  text-align: center !important;
}
.feng-pages {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
.editor {
  height: 370px;
}

.superInput {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  background: #fff;
}
.superInput h4 {
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 16px;
  box-sizing: border-box;
  background: #4074e1;
  color: #fff;
}
.superInput .s-content {
  padding: 16px;
  box-sizing: border-box;
  height: 600px;
  overflow-y: auto;
}
.superInput .el-input {
  /* margin-bottom: 20px; */
}
.superInput .btn-group {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
.s-content > div {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.s-content > div span {
  width: 70px;
  flex-shrink: 0;
}
.superInput .el-select {
  flex-grow: 1;
}
.expansion {
  width: 100%;
  min-height: 70px;
  border: 1px solid #dddee1;
}
.el-tag {
  margin-right: 8px;
}
.el-table {
  margin: 0;
}
.el-table {
}
</style>