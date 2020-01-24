<template>
  <div>
    <page-hr></page-hr>
    <div class="content_box">
      <div style="text-align:right;padding:10px 0;margin:10px 0;">
        <el-button type="warning" @click="addOrEdit(1)">新增</el-button>
      </div>
      <!--列表-->
      <el-table
        ref="singleTable"
        :data="tableList"
        highlight-current-row
        @row-click="handleClick"
        style="width: 100%;"
      >
        <el-table-column prop="id2" label="序号"></el-table-column>
        <el-table-column prop="jibie" label="分类级别"></el-table-column>
        <el-table-column prop="name" label="分类名称"></el-table-column>
      </el-table>
      <page-ination :isHide="true">
        <div>
          <el-button @click="dialogVisible=true" type="danger" :disabled="isDisabledForm.del">删除</el-button>
          <el-button type="primary" @click="addOrEdit(2)" :disabled="isDisabledForm.edit">编辑</el-button>
        </div>
      </page-ination>
    </div>
    <el-dialog :title="title" :visible.sync="addOrEditFormIsShow">
      <el-form ref="addOrEditForm" :model="addOrEditForm" class="dialog_from_center100">
        <el-form-item>
          <div class="cell_before">上级分类</div>
          <el-select v-model="addOrEditForm.id1" placeholder="请选择上级分类" clearable filterable>
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="cell_before">分类名称</div>
          <el-input v-model="addOrEditForm.name" placeholder="请输入分类名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addOrEditFormIsShow = false">取消</el-button>
        <el-button type="primary" @click="confirm()">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="删除" :visible.sync="dialogVisible" width="400px">
      <div style="text-align:left">
        <span>请确认删除此项数据。</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="del()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PageHr from "@/common/PageHr";
import PageInation from "../../common/PageInation";

import {
  getClassificationOfKnowledgeList,
  delClassificationOfKnowledge,
  addClassificationOfKnowledge,
  editClassificationOfKnowledge
} from "@/mock/api";
export default {
  name: "ClaimsKnowledge",
  data() {
    return {
      addOrEditForm: {
        id1: null,
        id2: null,
        name: null
      },
      title: null,
      typeList: [],
      addOrEditFormIsShow: false,
      tableList: [],
      isDisabledForm: { del: true, edit: true },
      clickRow: {},
      dialogVisible: false,
      n: null //1添加2编辑
    };
  },
  watch: {
    clickRow(row) {
      if (row.id2 !== undefined && row.id2 !== "" && row.id2 !== null) {
        this.isDisabledForm = {
          del: false,
          edit: false
        };
      } else {
        this.isDisabledForm = {
          del: true,
          edit: true
        };
      }
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.clickRow = {};
      getClassificationOfKnowledgeList(this.form).then(res => {
        this.typeList = res.Data;
        let list = [];
        res.Data.map(item => {
          item.children &&
            item.children.map(item2 => {
              list.push({
                jibie: item.label,
                id1: item.value,
                name: item2.label,
                id2: item2.value
              });
            });
        });
        this.tableList = list;
      });
    },

    del() {
      delClassificationOfKnowledge({ id: this.clickRow.id2 }).then(res => {
        this.$message(res.data.Msg);
        this.dialogVisible = false;
        this.getList();
      });
    },

    handleClick(row, column, event) {
      this.clickRow = row;
    },
    addOrEdit(n) {
      this.n = n;
      this.title = n == 1 ? "新增知识分类" : "编辑知识分类";
      this.addOrEditForm.id1 = n == 1 ? null : this.clickRow.id1;
      this.addOrEditForm.id2 = n == 1 ? null : this.clickRow.id2;
      this.addOrEditForm.name = n == 1 ? null : this.clickRow.name;
      this.addOrEditFormIsShow = true;
    },
    confirm() {
      if (this.n == 1) this.add();
      else this.edit();
    },
    add() {
      addClassificationOfKnowledge(this.addOrEditForm).then(res => {
        this.$message(res.data.Msg);
        this.addOrEditFormIsShow = false;
        this.getList();
      });
    },
    edit() {
      editClassificationOfKnowledge(this.addOrEditForm).then(res => {
        this.$message(res.data.Msg);
        this.addOrEditFormIsShow = false;
        this.getList();
      });
    }
  },

  components: { PageHr, PageInation }
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
.fuwenbenkaung {
  width: 100%;
  height: 458px;
  font-size: 18px;
  /*background-color: red;*/
}
.row {
  display: flex;
  justify-content: flex-start;
}
.row >>> .el-col {
  width: 30%;
}
.row >>> .el-col .el-input,
.row >>> .el-col .el-select {
  width: 100%;
}
</style>
