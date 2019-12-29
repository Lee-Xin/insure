<template>
  <div>
    <main-title :title="title" :title_f="title_f"></main-title>
    <div class="body-box">
      <h3>快速搜索</h3>
      <div class="date-select">
        供应商
        <el-select v-model="supplierVal" placeholder="请选择" style="margin-right: 30px">
          <el-option
            v-for="item in supplier"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>类型
        <el-select v-model="typeVal" placeholder="请选择">
          <el-option v-for="item in type" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="btn-group" style="margin-bottom: 20px">
        <el-button type="warning" icon="el-icon-plus" @click="addMsg">新增</el-button>
        <el-button type="primary" icon="el-icon-search" @click="searchHandle">搜索</el-button>
      </div>
      <el-table
        :data="tableData"
        @current-change="selectOption"
        highlight-current-row
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="supplier" label="供应商"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="remarks" label="备注"></el-table-column>
      </el-table>

      <div class="feng-pages">
        <div>
          <el-button type="danger" @click="deleteHandle">删除</el-button>
          <el-button type="primary" @click="editHandle">编辑</el-button>
          <el-button type="primary" @click="viewHandle">查看</el-button>
        </div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="40"
        ></el-pagination>
      </div>

      <div class="mask" :hidden="isMask">
        <div class="masks"></div>
        <div class="superInput">
          <h4>展业工具</h4>
          <div class="s-content">
            <div>
              <span style="color: red">*类型</span>
              <el-select v-model="newType" placeholder="请选择">
                <el-option
                  v-for="item in type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div>
              <span>供应商</span>
              <el-select v-model="newSupplier" placeholder="请选择">
                <el-option
                  v-for="item in supplier"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div>
              <span>线上线下</span>
              <el-select v-model="newOnline" placeholder="请选择">
                <el-option
                  v-for="item in supplier"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div>
              <span>划款顺序</span>
              <el-select v-model="newOrder" placeholder="请选择">
                <el-option
                  v-for="item in supplier"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div>
              <span>添加列</span>
              <el-tag
                :key="tag"
                v-for="tag in dynamicTags"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >{{tag}}</el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              ></el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新增</el-button>
            </div>
            <div>
              <span>行数</span>
              <el-input v-model="rowsVal" type="number" min="1" placeholder></el-input>
              <el-button type="primary" style="margin-left: 20px" @click="addRow">确定</el-button>
            </div>
            <div class="expansion">
              <el-table :data="newTable" border style="width: 100%">
                <el-table-column v-for="(item, index) of dynamicTags" :key="index" :label="item" >
                  <template>
                    <el-input
                      type="textarea"
                      autosize
                      placeholder="请输入内容"
                      v-model="newTableInput" style="heigth: 33px">
                    </el-input>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div>
              <el-input placeholder v-model="addMessage.content" class="colorRed">
                <template slot="prepend">备注</template>
              </el-input>
            </div>
            <div class="btn-group">
              <el-button @click="addMsg">取消</el-button>
              <el-button type="primary" @click="save">确认</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainTitle from "@/common/MainTitle";
import {
  ExhibitionTools,
  ExhibitionToolsSearch,
  ExhibitionToolsDelete
} from "@/request/api";

export default {
  name: "ExhibitionTools",
  data() {
    return {
      title: "展业工具",
      title_f: "这是展业工具页面",
      supplier: [
        {
          value: "黄金糕",
          label: "黄金糕"
        },
        {
          value: "双皮奶",
          label: "双皮奶"
        },
        {
          value: "蚵仔煎",
          label: "蚵仔煎"
        },
        {
          value: "龙须面",
          label: "龙须面"
        },
        {
          value: "北京烤鸭",
          label: "北京烤鸭"
        }
      ],
      type: [
        {
          value: "黄金糕",
          label: "黄金糕"
        },
        {
          value: "双皮奶",
          label: "双皮奶"
        },
        {
          value: "蚵仔煎",
          label: "蚵仔煎"
        },
        {
          value: "龙须面",
          label: "龙须面"
        },
        {
          value: "北京烤鸭",
          label: "北京烤鸭"
        }
      ],
      // 搜索
      supplierVal: "",
      typeVal: "",
      // 新建
      newSupplier: "",
      newType: "",
      newOnline: "",
      newOrder: "",
      rowsVal: "",
      addMessage: {
        content: "", // 富文本
        title: "" // 添加信息，文本框
      },
      tableData: [],
      // 选中项
      selectedItem: "",
      // 分页
      currentPage: 1,
      pages: {
        page: 1,
        pageSize: 10
      },
      // 显示遮罩
      isMask: true,
      // 新增添加列
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      newTable: [],
      newTableInput: ''
    };
  },
  components: { MainTitle },
  methods: {
    save() {
      this.addMessage.date = new Date()
        .toLocaleDateString()
        .replace(/\//g, "-");
      console.log(this.addMessage);
      // addMyMessage(this.addMessage).then(res => {
      //   console.log(res);
      //   this.getAllData();
      //   this.addMsg();
      // });
    },
    // 获取所有数据
    getAllData() {
      console.log(this.pages);
      ExhibitionTools({...this.pages}).then(res => {
        this.tableData = res.Data;
      });
    },
    selectOption(item) {
      this.selectedItem = item;
    },
    // 删除
    deleteHandle() {
      if (!this.selectedItem) {
        this.$message("请选择一项");
        return;
      }
      ExhibitionToolsDelete(this.selectedItem).then(res => {
        this.tableData = res.Data;
        this.selectedItem = null;
        this.$message(res.Msg);
      });
    },
    // 编辑
    editHandle () {
      if (!this.selectedItem) {
        this.$message("请选择一项");
        return;
      }
      this.isMask = !this.isMask;
    },
    // 查看
    viewHandle () {
      if (!this.selectedItem) {
        this.$message("请选择一项");
        return;
      }
    },
    // 显示弹窗
    addMsg() {
      this.isMask = !this.isMask;
      this.addMessage.title = "";
      this.addMessage.content = "";
    },
    // 搜索
    searchHandle() {
      if(this.supplierVal == "" && this.typeVal == ""){
        this.getAllData()
      } else {
        ExhibitionToolsSearch({
          type: this.typeVal,
          supplier: this.supplierVal
        }).then(res => {
          this.tableData = res.Data;
        });
      }
    },
    handleSizeChange(val) {
      this.pages.pageSize = val;
      this.getAllData();
    },
    handleCurrentChange(val) {
      this.pages.page = val;
      this.getAllData();
    },
    superChangeVal(e) {
      console.log(e);
    },
    // 添加列
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        if(this.dynamicTags.includes(inputValue)){
          this.$message("已存在");
        } else {
          this.dynamicTags.push(inputValue);
        }
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    // 添加行
    addRow () {
      this.newTable = [...this.newTable, ...new Array(Number(this.rowsVal))]
    }
  },
  created: function() {
    this.getAllData()
  }
};
</script>

<style scoped>
.body-box {
  font-size: 16px;
  width: 100%;
  border-top: 4px solid #2c8cf0;
  border-radius: 5px 5px 0 0;
  padding: 20px;
  box-sizing: border-box;
  text-align: left;
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
.el-table{
  margin: 0;
}
.el-table {

}
</style>