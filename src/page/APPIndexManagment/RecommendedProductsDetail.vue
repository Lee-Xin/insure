<template>
  <div>
    <template>
      <div>
        <div class="main-box">
          <!-- 手机模拟 -->
          <div class="simulation detail-pages">
            <h4>产品特色</h4>
            <ul>
              <li v-for="(item, index) of tableData" :key="index">
                <h4>{{item.title}}</h4>
                <p>{{item.description}}</p>
              </li>
            </ul>
          </div>
          <!-- 热销产品 -->
          <div class="data-operating body-box">
            <el-tabs v-model="activeName" type="card">
              <el-tab-pane label="产品特色" name="one">
                <div style="text-align: right; margin: 16px 0">
                  <el-button type="success" @click="addDiaolog(1)" icon="el-icon-plus">新增产品特色</el-button>
                </div>
                <el-table
                  :data="tableData"
                  @current-change="currentChangeHandle"
                  highlight-current-row
                  border
                  style="width: 100%"
                >
                  <el-table-column prop="sort" label="排序" width="100"></el-table-column>
                  <el-table-column prop="title" label="标题名称"></el-table-column>
                  <el-table-column prop="description" label="说明"></el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
            <div class="feng-pages">
              <div class="block">
                <div>
                  <el-button
                    @click="dialogVisible=true"
                    type="danger"
                    :disabled="isDisabledForm.del"
                  >删除</el-button>
                  <el-button
                    type="primary"
                    @click="addDiaolog(2)"
                    :disabled="isDisabledForm.edit"
                  >编辑</el-button>
                  <el-button type="primary" @click="$router.go(-1)">返回</el-button>
                </div>
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="100"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="pagesTotal"
                ></el-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <el-dialog title="删除" :visible.sync="dialogVisible" width="400px">
      <div style="text-align:left">
        <span>请确认删除此项数据。</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="del()">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="title" :visible.sync="isShow">
      <el-row class="s-content">
        <el-col v-for="(item, index) in addForm" :key="index">
          <form-item
            :type="item.type"
            :label="item.label"
            :options="item.options"
            v-model="item.value"
            :required="item.required"
            :placeholder="item.placeholder"
            :hide="item.hide"
            :disabled="item.disabled"
          ></form-item>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow=false">取消</el-button>
        <el-button type="primary" @click="save">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRecommendProductsDetail,
  saveRecommendProductsDetail,
  delRecommendProductsDetail
} from "@/mock/api";

import FormItem from "@/common/FormItem";
export default {
  name: "RecommendedProductsDetail",
  data() {
    return {
      addForm: {
        order: {
          label: "排序",
          value: 0,
          type: "input",
          placeholder: "请输入序号",
          required: false
        },
        title: {
          label: "标题",
          value: "",
          type: "input",
          placeholder: "请输入",
          required: false
        },
        description: {
          label: "说明",
          value: "",
          type: "textarea",
          placeholder: "请输入",
          required: false
        }
      },
      isDisabledForm: { del: true, edit: true, send: true, notSend: true },
      isShowForm: { send: true },
      dialogVisible: false,
      id: "",
      isShow: false,
      pagesTotal: 0,
      currentPage: 1,
      pages: {
        SkipCount: 0, //开始的索引
        MaxResultCount: 10
      },
      clickRow: {},
      title: "",
      activeName: "one",
      tableData: []
    };
  },
  components: { FormItem },
  watch: {
    clickRow(row) {
      if (row.id !== undefined && row.id !== "" && row.id !== null) {
        this.isDisabledForm = {
          del: false,
          edit: false,
          send: false,
          notSend: false
        };
        this.isShowForm.send = row.status == 2 ? true : false;
      } else {
        this.isDisabledForm = {
          del: true,
          edit: true,
          send: true,
          notSend: true
        };
        this.isShowForm = { send: true };
      }
    }
  },
  created: function() {
    this.getAllData();
  },
  methods: {
    getAllData() {
      getRecommendProductsDetail({
        SkipCount: this.pages.SkipCount,
        MaxResultCount: this.pages.MaxResultCount
      }).then(res => {
        this.tableData = res.result.items;
        this.pagesTotal = res.result.totalCount;
      });
    },
    currentChangeHandle(obj) {
      this.clickRow = obj || {};
    },
    // 删除
    del() {
      delRecommendProductsDetail({ id: this.clickRow.id }).then(res => {
        this.$message(res.data.Msg);
        this.dialogVisible = false;
        this.getAllData();
      });
    },
    // 编辑
    addDiaolog(n) {
      for (const key in this.addForm) {
        if (this.addForm.hasOwnProperty(key)) {
          const element = this.addForm[key];

          element.value = n == 1 ? "" : this.clickRow[key];
        }
      }
      this.addForm.title.disabled = n == 1 ? false : true;
      this.title = n == 1 ? "添加特色" : "编辑特色";
      this.isShow = true;
      this.id = n == 1 ? "" : this.clickRow.id;
    },
    save() {
      let data = {};
      Object.keys(this.addForm).map(key => {
        data[key] = this.addForm[key];
      });

      saveRecommendProductsDetail(data).then(res => {
        this.isShow = false;
        this.$message(res.data.Msg);
      });
    },
    // 分页等
    handleSizeChange(val) {
      this.pages.SkipCount = 0;
      this.pages.MaxResultCount = val;
      this.getAllData();
    },
    handleCurrentChange(val) {
      this.pages.SkipCount = (val - 1) * this.pages.MaxResultCount;
      this.getAllData();
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
  padding: 10px;
  box-sizing: border-box;
  text-align: left;
  background: #fff;
}
.body-box h3 {
  font-weight: normal;
  margin: 0;
  color: #f39312;
}
.main-box {
  width: 100%;
  display: flex;
  margin: 16px 0;
}
.main-box .simulation {
  position: relative;
  width: 300px;
  height: 600px;
  flex-shrink: 0;
  margin-right: 16px;
  border-radius: 24px;
  overflow: hidden;
  font-size: 14px;
  padding: 2px 0;
  border: 4px solid #717171;
  box-sizing: border-box;
  overflow-y: auto;
  background: #f1f1f1;
}
/* .main-box .simulation::after{
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  content: '';
  width: 50%;
  height: 26px;
  border-radius: 0 0 20px 20px;
  background: #717171;
} */
.main-box .simulation::-webkit-scrollbar {
  display: none;
}
.main-box .simulation::-webkit-scrollbar-thumb {
  display: none;
}
.main-box .simulation::-webkit-scrollbar-track {
  display: none;
}
.simulation ul {
  width: 100%;
}
.simulation li {
  width: 100%;
  margin-bottom: 6px;
  padding: 14px;
  box-sizing: border-box;
  background: #fff;
}
.simulation h4 {
  margin: 0;
}
.simulation li .desc {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 16px 0;
  padding: 12px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
.desc p {
  width: 50%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 4px 0;
  color: #757677;
}
.simulation .tags {
  color: #fd1e1f;
}
.simulation .tags span:not(:last-child) {
  margin-right: 4px;
}

.data-operating,
.selling-content,
.newProduct-content,
.banner-content {
  flex-grow: 1;
}
.feng-pages {
  height: 80px;
  line-height: normal !important;

  text-align: center;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.28);

  .block {
    box-sizing: border-box;
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: right;
    background-color: #fff;
  }

  .center {
    justify-content: center !important;
  }
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
.input-group {
  display: flex;
  flex-wrap: wrap;
}
.mask .el-input {
  margin-bottom: 16px;
}
.input-group .el-input {
  width: 24%;
  margin-top: 4px;
}
.input-group .el-input:not(:nth-of-type(4n)) {
  margin-right: 6px;
}

.superInput {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  font-size: 16px;
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
  padding: 16px 20px;
}
.s-content .sel-box {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  margin-top: 16px;
}
.s-content .sel-box > span {
  width: 70px;
}
.s-content .sel-box > .el-select {
  flex-grow: 1;
}
.superInput .btn-group {
  margin-top: 20px;
}

.simulation.detail-pages {
  background: #fff;
}
.simulation.detail-pages > h4 {
  font-weight: normal;
  text-align: center;
  margin-top: 20px;
  font-size: 17px;
  padding-bottom: 16px;
  border-bottom: 1px solid #dfdfdf;
}
.detail-pages li {
  padding: 8px 12px;
  border-bottom: 1px solid #dfdfdf;
}
.detail-pages li h4 {
  font-weight: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #fd576d;
}
.detail-pages li p {
  margin: 4px 0;
  color: #495060;
}
</style>
