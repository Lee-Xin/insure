<template>
  <div>
    <div class="body-box">
      <div class="main-box">
        <!-- 手机模拟 -->
        <div class="simulation">
          <div class="banner hasMask" @click="showMain('轮播图管理', 'banner',0)">
            <img :src="require('@/assets/img/banner.png')" />
          </div>
          <ul>
            <li class="hasMask iconImg" @click="showMain('热销热卖', 'selling',1)">
              <img :src="require('@/assets/img/selling.png')" />
              <div>热销热卖</div>
            </li>
            <li class="hasMask iconImg" @click="showMain('新品推荐', 'newProduct',2)">
              <img :src="require('@/assets/img/newProduct.png')" />
              <div>新品推荐</div>
            </li>
          </ul>
          <div class="hot-product hasMask" @click="showMain('热销产品', 'hotPro',3)">
            <img :src="require('@/assets/img/hotProduct.png')" />
          </div>
        </div>
        <div class="right">
          <!-- 轮播图管理 -->
          <div class="banner-content" v-if="plate=='banner'">
            <h3>{{bigTitle}}</h3>
            <div style="text-align: right; margin: 16px 0">
              <el-button type="warning" icon="el-icon-plus" @click="addDiaolog(1)">新增</el-button>
            </div>
            <el-table
              :data="bannerTableData"
              @current-change="currentChangeHandle"
              highlight-current-row
              border
              style="width: 100%"
            >
              <el-table-column type="index" label="序号" width="100"></el-table-column>
              <el-table-column prop="name" label="名称"></el-table-column>
              <el-table-column prop="proType" label="类型"></el-table-column>
              <el-table-column prop="pic" label="图片">
                <template slot-scope="scope">
                  <img :src="scope.row.pic" />
                </template>
              </el-table-column>
              <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                  <div>{{scope.row.status==1?"上架":"下架"}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="date" label="创建时间"></el-table-column>
            </el-table>
          </div>
          <!-- 热销热卖 -->
          <div class="selling-content" v-if="plate=='selling'">
            <h3>{{bigTitle}}</h3>
            <div style="text-align: right; margin: 16px 0">
              <el-button type="warning" icon="el-icon-plus" @click="addDiaolog(1)">新增</el-button>
            </div>
            <el-table
              :data="hotTableData"
              @current-change="currentChangeHandle"
              highlight-current-row
              border
              style="width: 100%"
            >
              <el-table-column type="index" label="序号" width="100"></el-table-column>
              <el-table-column prop="company" label="公司名称"></el-table-column>
              <el-table-column prop="date" label="创建时间"></el-table-column>
            </el-table>
          </div>
          <!-- 新品推荐 -->
          <div class="newProduct-content" v-if="plate=='newProduct'">
            <h3>{{bigTitle}}</h3>
            <div style="text-align: right; margin: 16px 0">
              <el-button type="warning" icon="el-icon-plus" @click="addDiaolog(1)">新增</el-button>
            </div>
            <el-table
              :data="hotTableData"
              @current-change="currentChangeHandle"
              highlight-current-row
              border
              style="width: 100%"
            >
              <el-table-column type="index" label="序号" width="100"></el-table-column>
              <el-table-column prop="product" label="产品名称"></el-table-column>
              <el-table-column prop="date" label="创建时间">
                <template slot-scope="scope">
                  <div>{{scope.row.date}}</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 热销产品 -->
          <div class="data-operating" v-if="plate=='hotPro'">
            <h3 style="padding-bottom:20px">{{bigTitle}}</h3>
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
              <el-tab-pane label="寿险" name="1">
                <div style="text-align: right; margin: 16px 0">
                  <el-button type="warning" @click="addDiaolog(1)" icon="el-icon-plus">新增</el-button>
                </div>
                <el-table
                  :data="hotTableData"
                  @current-change="currentChangeHandle"
                  highlight-current-row
                  border
                  style="width: 100%"
                >
                  <el-table-column type="index" label="序号" width="100"></el-table-column>
                  <el-table-column prop="product" label="产品名称"></el-table-column>
                  <el-table-column prop="date" label="创建时间"></el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="医疗险" name="2">
                <div style="text-align: right; margin: 16px 0">
                  <el-button type="warning" @click="addDiaolog(1)" icon="el-icon-plus">新增</el-button>
                </div>
                <el-table
                  :data="hotTableData"
                  @current-change="currentChangeHandle"
                  highlight-current-row
                  border
                  style="width: 100%"
                >
                  <el-table-column type="index" label="序号" width="100"></el-table-column>
                  <el-table-column prop="product" label="产品名称"></el-table-column>
                  <el-table-column prop="date" label="创建时间"></el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="重疾险" name="3">
                <div style="text-align: right; margin: 16px 0">
                  <el-button type="warning" @click="addDiaolog(1)" icon="el-icon-plus">新增</el-button>
                </div>
                <el-table
                  :data="hotTableData"
                  @current-change="currentChangeHandle"
                  highlight-current-row
                  border
                  style="width: 100%"
                >
                  <el-table-column type="index" label="序号" width="100"></el-table-column>
                  <el-table-column prop="product" label="产品名称"></el-table-column>
                  <el-table-column prop="date" label="创建时间"></el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="意外险" name="4">
                <div style="text-align: right; margin: 16px 0">
                  <el-button type="warning" @click="addDiaolog(1)" icon="el-icon-plus">新增</el-button>
                </div>
                <el-table
                  :data="hotTableData"
                  @current-change="currentChangeHandle"
                  highlight-current-row
                  border
                  style="width: 100%"
                >
                  <el-table-column type="index" label="序号" width="100"></el-table-column>
                  <el-table-column prop="product" label="产品名称"></el-table-column>
                  <el-table-column prop="date" label="创建时间"></el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="feng-pages">
            <div class="block">
              <div>
                <el-button
                  type="danger"
                  v-if="plate == 'banner'&&isShowForm.send"
                  :disabled="isDisabledForm.send"
                  @click="obtained(1)"
                >上架</el-button>
                <el-button
                  type="danger"
                  v-if="plate == 'banner'&&!isShowForm.send"
                  :disabled="isDisabledForm.notSend"
                  @click="obtained(2)"
                >下架</el-button>
                <el-button
                  @click="dialogVisible=true"
                  type="danger"
                  :disabled="isDisabledForm.del"
                >删除</el-button>
                <el-button type="primary" @click="addDiaolog(2)" :disabled="isDisabledForm.edit">编辑</el-button>
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
          ></form-item>
        </el-col>
        <el-col class="upload-img" v-if="plate=='banner'">
          <span class="label">图片</span>
          <span class="camera" @click="showImgUpload=true" style="margin-right:0">
            <img v-if="imgUrl" :src="imgUrl" />
            <img style="width:30px" v-else :src="require('@/assets/img/camera.png')" />
          </span>
          <el-button v-if="imgUrl" type="text" size="mini" style="padding:5px" @click="imgUrl=''">删除</el-button>
        </el-col>
        <el-col v-if="type==2||type==3">
          <el-row :gutter="20">
            <el-col
              v-for="(item,i) in descriptionList"
              :key="i"
              :span="12"
              style="margin-bottom:10px"
            >
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-input v-model="item.name" placeholder="标题名称"></el-input>
                </el-col>
                <el-col :span="12">
                  <el-input v-model="item.value" placeholder="详细参数"></el-input>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
        <el-col v-if="type==2||type==3">
          <el-row :gutter="20">
            <el-col :span="8" v-for="(item,i) in tags" :key="i">
              <el-input v-model="tags[i]" placeholder="标签名称"></el-input>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow=false">取消</el-button>
        <el-button type="primary" @click="save">确认</el-button>
      </span>
    </el-dialog>
    <img-upload
      :isShow.sync="showImgUpload"
      @uploadSuccess="uploadSuccess"
      @closeDialog="closeDialog"
    ></img-upload>
  </div>
</template>

<script>
import FormItem from "@/common/FormItem";
import ImgUpload from "@/common/ImgUpload";

import {
  AutoguardHomepageModule,
  AutoguardHomepageModuleDelete,
  AutoguardHomepageModuleBanner,
  sendAutoguardHome,
  getProductList,
  apiProductList,
  baoxiangongsi,
  saveAutoguardHome
} from "@/mock/api";

export default {
  name: "AutoguardHomepageModule",
  data() {
    return {
      bigTitle: "轮播图管理",
      activeName: "1",
      // 分页总数
      pagesTotal: 0,
      tableData: [],
      hotTableData: [],
      bannerTableData: [],
      // 导航分类唯一标识
      type: "1", //1热销热卖，2新品推荐，3热销产品
      category: 1, //1寿险，2医疗险，3重疾险，4意外险
      isShow: false, //添加修改弹框
      title: "", //添加修改标题
      addForm: {
        name: {
          label: "名称",
          value: null,
          type: "input",
          placeholder: "请输入名称",
          required: true
        },
        proType: {
          label: "类型",
          value: null,
          type: "select",
          placeholder: "请选择类型",
          required: true,
          options: []
        },
        status: {
          label: "状态",
          value: null,
          type: "select",
          placeholder: "请选择",
          required: true,
          options: [
            { label: "上架", value: 1 },
            { label: "下架", value: 2 }
          ]
        },
        company: {
          label: "公司",
          value: null,
          type: "select",
          placeholder: "请选择",
          options: []
        },
        product: {
          label: "产品",
          value: null,
          type: "select",
          placeholder: "请选择",
          options: []
        },
        order: {
          label: "排序",
          value: 0,
          type: "input",
          placeholder: "请输入序号",
          required: false
        },
        url: {
          label: "链接",
          value: 0,
          type: "input",
          placeholder: "请输入序号",
          required: false
        }
      },
      showImgUpload: false,
      imgUrl: "", //轮播图添加图片

      // 删除，编辑
      // 当前板块
      plate: "banner",
      // 选中行
      clickRow: null,
      // 分页
      currentPage: 1,
      pages: {
        SkipCount: 0, //开始的索引
        MaxResultCount: 10
      },
      isDisabledForm: { del: true, edit: true, send: true, notSend: true },
      isShowForm: { send: true },
      dialogVisible: false,
      id: "",
      descriptionList: [{}, {}, {}, {}],
      tags: ["", "", ""]
    };
  },
  components: { FormItem, ImgUpload },
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
    this.getProduct();
    this.getAllData();
  },
  methods: {
    getProduct() {
      getProductList().then(res => {
        this.addForm.proType.options = res.Data || [];
      });
      apiProductList().then(res => {
        this.addForm.product.options = res.Data || [];
      });
      baoxiangongsi().then(res => {
        this.addForm.company.options = res.Data.map(i => {
          return { label: i.name, value: i.id };
        });
      });
    },
    getAllData() {
      this.clickRow = {};
      this.pages.SkipCount = 0;
      this.hotTableData = [];
      this.bannerTableData = [];
      let key = this.plate == "banner" ? "banner" : "hotPro";
      switch (key) {
        case "hotPro":
          AutoguardHomepageModule({
            type: this.type,
            category: this.category,
            SkipCount: this.pages.SkipCount,
            MaxResultCount: this.pages.MaxResultCount
          }).then(res => {
            this.hotTableData = res.result.items;
            this.pagesTotal = res.result.totalCount;
          });
          break;
        case "banner":
        default:
          AutoguardHomepageModuleBanner({
            SkipCount: this.pages.SkipCount,
            MaxResultCount: this.pages.MaxResultCount
          }).then(res => {
            this.bannerTableData = res.result.items;
            this.pagesTotal = res.result.totalCount;
          });
      }
    },
    // 手机模拟处切换
    showMain(str, prop, type) {
      if (this.plate == prop) return;
      this.bigTitle = str;
      this.plate = prop;
      this.type = type;
      this.getAllData();
    },
    // 导航切换
    handleClick(tab, event) {
      this.category = tab.name;
      this.getAllData();
    },
    currentChangeHandle(obj) {
      this.clickRow = obj || {};
    },
    // 下架
    obtained(n) {
      sendAutoguardHome({ status: n, id: this.clickRow.id }).then(res => {
        this.$message(res.data.Msg);
        this.getAllData();
      });
    },
    // 删除
    del() {
      AutoguardHomepageModuleDelete({ id: this.clickRow.id }).then(res => {
        this.$message(res.Msg);
        this.dialogVisible = false;
        this.getAllData();
      });
    },
    // 编辑
    addDiaolog(n) {
      switch (this.plate) {
        case "banner":
          this.title = n == 1 ? "添加轮播图" : "编辑轮播图";
          //轮播图时隐藏选项
          for (const key in this.addForm) {
            if (this.addForm.hasOwnProperty(key)) {
              const element = this.addForm[key];
              element.hide =
                key == "url" || key == "product" || key == "company"
                  ? true
                  : false;
              element.value = n == 1 ? "" : this.clickRow[key];
              this.imgUrl = n == 1 ? "" : this.clickRow.pic;
            }
          }
          break;
        case "selling":
          this.title = n == 1 ? "添加热销热卖" : "编辑热销热卖";
          for (const key in this.addForm) {
            if (this.addForm.hasOwnProperty(key)) {
              const element = this.addForm[key];
              element.hide = key == "company" || key == "order" ? false : true;
              element.value = n == 1 ? "" : this.clickRow[key];
            }
          }
          break;
        case "newProduct":
          this.title = n == 1 ? "添加新品推荐" : "编辑新品推荐";
          for (const key in this.addForm) {
            if (this.addForm.hasOwnProperty(key)) {
              const element = this.addForm[key];
              element.hide =
                key == "product" || key == "order" || key == "company"
                  ? false
                  : true;
              element.value = n == 1 ? "" : this.clickRow[key];
            }
          }
          if (n == 1) {
            this.tags = ["", "", ""];
            this.descriptionList = [{}, {}, {}, {}];
          } else {
            this.clickRow.tags.map((item, i) => {
              this.tags[i] = item;
            });
            this.clickRow.description.map((item, i) => {
              this.descriptionList[i] = item;
            });
          }
          break;
        case "hotPro":
          for (const key in this.addForm) {
            if (this.addForm.hasOwnProperty(key)) {
              const element = this.addForm[key];
              element.hide =
                key == "product" ||
                key == "order" ||
                key == "company" ||
                key == "url"
                  ? false
                  : true;
              element.value = n == 1 ? "" : this.clickRow[key];
            }
          }
          this.title = n == 1 ? "添加热销产品" : "编辑热销产品";
          if (n == 1) {
            this.tags = ["", "", ""];
            this.descriptionList = [{}, {}, {}, {}];
          } else {
            this.clickRow.tags.map((item, i) => {
              this.tags[i] = item;
            });
            this.clickRow.description.map((item, i) => {
              this.descriptionList[i] = item;
            });
          }
          break;
      }
      this.isShow = true;
      this.id = n == 1 ? "" : this.clickRow.id;
    },
    save() {
      if (this.plate == "banner") {
        if (!this.addForm.name.value) return this.$message("请输入名称");
        if (!this.addForm.proType.value) return this.$message("请选择类型");
        if (!this.addForm.status.value) return this.$message("请选择状态");
      }
      let data = {};
      for (const key in this.addForm) {
        if (this.addForm.hasOwnProperty(key)) {
          const element = this.addForm[key];
          data[key] = element.value;
        }
      }
      data.id = this.id;
      data.type = this.type;
      data.category = this.category;
      data.description = this.descriptionList.filter(
        item => item.name || item.value
      );
      data.tags = this.tags.filter(item => item);
      saveAutoguardHome(data).then(res => {
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
    },

    closeDialog() {
      this.showImgUpload = false;
    },
    uploadSuccess(res) {
      this.$message(res.Msg);
      this.imgUrl = res.Data.url;
      this.showImgUpload = false;
    }
  }
};
</script>

<style scoped lang=less>
.body-box {
  font-size: 16px;
  width: 100%;

  padding-bottom: 20px;
  box-sizing: border-box;
  text-align: left;
  background: #edf2f6;
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
  .right {
    flex-grow: 1;
  }
}
.main-box .simulation {
  width: 300px;
  height: 600px;
  flex-shrink: 0;
  margin-right: 16px;
  border-radius: 24px;
  overflow: hidden;
  font-size: 14px;
  border: 4px solid #717171;
  box-sizing: border-box;
  overflow-y: auto;
  background: #fff;
  img {
    width: 100%;
  }
  .iconImg {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    img {
      width: 30px;
    }
  }
}
.main-box .simulation::-webkit-scrollbar {
  display: none;
}
.main-box .simulation::-webkit-scrollbar-thumb {
  display: none;
}
.main-box .simulation::-webkit-scrollbar-track {
  display: none;
}
.simulation .banner {
  img {
    width: 100%;
  }

  margin-bottom: 2px;
}
.simulation ul {
  display: flex;
  flex-wrap: wrap;
}
.simulation ul li {
  width: 64px;
  height: 86px;
}
.simulation ul li:not(:last-child) {
  margin-right: 1px;
}
.simulation .hot-product {
  width: 100%;
  height: 160px;
  margin: 2px 0;
}

.simulation .hasMask {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f1f0f6;
}
.simulation .hasMask::after {
  position: absolute;
  top: 0;
  left: 0;
  content: "编辑";
  width: 100%;
  height: 100%;
  display: none;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
}

.simulation .hasMask:hover::after {
  display: flex;
}

.data-operating,
.selling-content,
.newProduct-content,
.banner-content {
  flex-grow: 1;
  background: #fff;
  padding: 20px 10px;
  border-top: 4px solid #2c8cf0;
  border-radius: 5px 5px 0 0;
  box-sizing: border-box;
  min-height: 500px;
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
.editor {
  height: 370px;
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

.up-pic {
  margin-top: 16px;
}

.upload-img {
  text-align: left;
  cursor: pointer;

  > .label {
    color: #f29f43;
    font-size: 14px;
    font-weight: bold;
  }

  > .camera {
    display: inline-block;
    margin: 0 20px;
    width: 58px;
    height: 58px;
    line-height: 58px;
    text-align: center;
    vertical-align: middle;
    border: 1px dashed #757f98;
    border-radius: 4px;

    > img {
      vertical-align: middle;
      width: 100%;
    }
  }
}
</style>
