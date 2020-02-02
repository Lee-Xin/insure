<template>
  <div>
    <div class="body-box">
      <div class="main-box">
        <!-- 手机模拟 -->
        <div class="simulation">
          <div class="banner hasMask" @click="showMain('轮播图管理', 'banner',0)">轮播图管理</div>
          <ul>
            <li class="hasMask" @click="showMain('热销热卖', 'selling',1)">热销热卖</li>
            <li class="hasMask" @click="showMain('新品推荐', 'newProduct',2)">新品推荐</li>
          </ul>
          <div class="hot-product hasMask" @click="showMain('热销产品', 'hotPro',3)">热销产品</div>
        </div>
        <div class="right">
          <!-- 轮播图管理 -->
          <div class="banner-content" v-if="plate=='banner'">
            <div class="mask" :hidden="mask.banner">
              <div class="superInput">
                <h4>轮播图管理</h4>
                <div class="s-content">
                  <el-input v-model="bannerAdd.name" placeholder="请输入名称">
                    <template slot="prepend">*名称</template>
                  </el-input>
                  <div class="sel-box">
                    <span>*类型</span>
                    <el-select v-model="bannerAdd.typeVal" placeholder="请选择">
                      <el-option
                        v-for="item in bannerAdd.type"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                  <el-select style="width: 100%" v-model="bannerAdd.selectVal" placeholder="请选择">
                    <el-option
                      v-for="item in bannerAdd.select"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <div class="up-pic">
                    <el-upload
                      class="avatar-uploader"
                      action="#"
                      list-type="picture-card"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                    >
                      <img v-if="bannerAdd.imageUrl" :src="bannerAdd.imageUrl" />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </div>
                  <div class="sel-box">
                    <span>*状态</span>
                    <el-select v-model="bannerAdd.statusVal" placeholder="请选择">
                      <el-option
                        v-for="item in bannerAdd.status"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                  <el-input v-model="bannerAdd.sort" placeholder="请输入排序">
                    <template slot="prepend">排序</template>
                  </el-input>
                  <div class="btn-group" style="text-align: right">
                    <el-button @click="hideMsak('banner')">取消</el-button>
                    <el-button type="primary" @click="save">确认</el-button>
                  </div>
                </div>
              </div>
            </div>
            <h3>{{bigTitle}}</h3>
            <div style="text-align: right; margin: 16px 0">
              <el-button type="warning" icon="el-icon-plus" @click="hideMsak('banner')">新增</el-button>
            </div>
            <el-table
              :data="bannerTableData"
              v-if="plate=='banner'"
              @current-change="currentChangeHandle"
              highlight-current-row
              border
              style="width: 100%"
            >
              <el-table-column type="index" label="序号" width="100"></el-table-column>
              <el-table-column prop="name" label="名称"></el-table-column>
              <el-table-column prop="type" label="类型"></el-table-column>
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
            <div class="mask" :hidden="mask.selling">
              <div class="superInput">
                <h4>热销热卖</h4>
                <div class="s-content">
                  <div class="sel-box">
                    <span>公司</span>
                    <el-select v-model="selling.companyVal" placeholder="请选择">
                      <el-option
                        v-for="item in selling.company"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                  <el-input v-model="selling.sort" placeholder="请输入排序">
                    <template slot="prepend">排序</template>
                  </el-input>
                  <div class="btn-group" style="text-align: right">
                    <el-button @click="hideMsak('selling')">取消</el-button>
                    <el-button type="primary" @click="save">确认</el-button>
                  </div>
                </div>
              </div>
            </div>
            <h3>{{bigTitle}}</h3>
            <div style="text-align: right; margin: 16px 0">
              <el-button type="warning" icon="el-icon-plus" @click="hideMsak('selling')">新增</el-button>
            </div>
            <el-table
              :data="hotTableData"
              @current-change="currentChangeHandle"
              highlight-current-row
              border
              style="width: 100%"
            >
              <el-table-column type="index" label="序号" width="100"></el-table-column>
              <el-table-column prop="title" label="公司名称"></el-table-column>
              <el-table-column prop="date" label="创建时间"></el-table-column>
            </el-table>
          </div>
          <!-- 新品推荐 -->
          <div class="newProduct-content" v-if="plate=='newProduct'">
            <div class="mask" :hidden="mask.newProduct">
              <div class="superInput">
                <h4>产品</h4>
                <div class="s-content">
                  <div class="sel-box">
                    <span>公司</span>
                    <el-select v-model="newProduct.companyVal" placeholder="请选择">
                      <el-option
                        v-for="item in newProduct.company"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                  <div class="sel-box">
                    <span>产品</span>
                    <el-select v-model="newProduct.productVal" placeholder="请选择">
                      <el-option
                        v-for="item in newProduct.product"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                  <el-input v-model="newProduct.sort" placeholder="请输入排序">
                    <template slot="prepend">排序</template>
                  </el-input>
                  <div class="btn-group" style="text-align: right">
                    <el-button @click="hideMsak('newProduct')">取消</el-button>
                    <el-button type="primary" @click="save">确认</el-button>
                  </div>
                </div>
              </div>
            </div>
            <h3>{{bigTitle}}</h3>
            <div style="text-align: right; margin: 16px 0">
              <el-button type="warning" icon="el-icon-plus" @click="hideMsak('newProduct')">新增</el-button>
            </div>
            <el-table
              v-if="plate=='newProduct'"
              :data="hotTableData"
              @current-change="currentChangeHandle"
              highlight-current-row
              border
              style="width: 100%"
            >
              <el-table-column type="index" label="序号" width="100"></el-table-column>
              <el-table-column prop="title" label="产品名称"></el-table-column>
              <el-table-column prop="description" label="说明"></el-table-column>
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
                  <el-button type="warning" @click="hideMsak('hot')" icon="el-icon-plus">新增</el-button>
                </div>
                <el-table
                  :data="hotTableData"
                  @current-change="currentChangeHandle"
                  highlight-current-row
                  border
                  style="width: 100%"
                >
                  <el-table-column type="index" label="序号" width="100"></el-table-column>
                  <el-table-column prop="title" label="产品名称"></el-table-column>
                  <el-table-column prop="description" label="说明"></el-table-column>
                  <el-table-column prop="date" label="创建时间"></el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="医疗险" name="2">
                <div style="text-align: right; margin: 16px 0">
                  <el-button type="warning" @click="hideMsak('hot')" icon="el-icon-plus">新增</el-button>
                </div>
                <el-table
                  :data="hotTableData"
                  @current-change="currentChangeHandle"
                  highlight-current-row
                  border
                  style="width: 100%"
                >
                  <el-table-column type="index" label="序号" width="100"></el-table-column>
                  <el-table-column prop="title" label="产品名称"></el-table-column>
                  <el-table-column prop="description" label="说明"></el-table-column>
                  <el-table-column prop="date" label="创建时间"></el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="重疾险" name="3">
                <div style="text-align: right; margin: 16px 0">
                  <el-button type="warning" @click="hideMsak('hot')" icon="el-icon-plus">新增</el-button>
                </div>
                <el-table
                  :data="hotTableData"
                  @current-change="currentChangeHandle"
                  highlight-current-row
                  border
                  style="width: 100%"
                >
                  <el-table-column type="index" label="序号" width="100"></el-table-column>
                  <el-table-column prop="title" label="产品名称"></el-table-column>
                  <el-table-column prop="description" label="说明"></el-table-column>
                  <el-table-column prop="date" label="创建时间"></el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="意外险" name="4">
                <div style="text-align: right; margin: 16px 0">
                  <el-button type="warning" @click="hideMsak('hot')" icon="el-icon-plus">新增</el-button>
                </div>
                <el-table
                  :data="hotTableData"
                  @current-change="currentChangeHandle"
                  highlight-current-row
                  border
                  style="width: 100%"
                >
                  <el-table-column type="index" label="序号" width="100"></el-table-column>
                  <el-table-column prop="title" label="产品名称"></el-table-column>
                  <el-table-column prop="description" label="说明"></el-table-column>
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
      <div class="mask" :hidden="mask.hot">
        <div class="superInput">
          <h4>产品</h4>
          <div class="s-content">
            <div class="sel-box">
              <span>公司</span>
              <el-select v-model="hotPro.companyVal" placeholder="请选择">
                <el-option
                  v-for="item in hotPro.company"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="sel-box">
              <span>产品</span>
              <el-select v-model="hotPro.productVal" placeholder="请选择">
                <el-option
                  v-for="item in hotPro.product"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <el-input v-model="hotPro.sort" placeholder="请输入排序">
              <template slot="prepend">排序</template>
            </el-input>
            <div class="btn-group">
              <el-button @click="hideMsak('hot')">取消</el-button>
              <el-button type="primary" @click="save">确认</el-button>
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
  </div>
</template>

<script>
import {
  APPHomepageModule,
  APPHomepageModuleDelete,
  APPHomepageModuleBanner,
  sendAppHome
} from "@/mock/api";

export default {
  name: "APPHomepageModule",
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
      // 不同分类的弹窗
      mask: {
        hot: true,
        selling: true,
        banner: true,
        newProduct: true
      },

      // 轮播图管理添加
      bannerAdd: {
        name: "",
        typeVal: "",
        type: [
          { label: "产品", value: "产品" },
          { label: "资讯", value: "资讯" }
        ],
        select: [
          { label: "产品", value: "产品" },
          { label: "资讯", value: "资讯" }
        ],
        selectVal: "",
        imageUrl: "",
        status: [
          { label: "上架", value: "上架" },
          { label: "下架", value: "下架" }
        ],
        statusVal: "",
        sort: ""
      },
      // 热销产品-添加
      hotPro: {
        company: [
          {
            value: "黄金糕",
            label: "黄金糕"
          },
          {
            value: "双皮奶",
            label: "双皮奶"
          }
        ],
        companyVal: "",
        product: [
          {
            value: "龙须面",
            label: "龙须面"
          },
          {
            value: "北京烤鸭",
            label: "北京烤鸭"
          }
        ],
        productVal: "",
        sort: ""
      },
      // 热销热卖-添加
      selling: {
        company: [
          {
            value: "黄金糕",
            label: "黄金糕"
          },
          {
            value: "双皮奶",
            label: "双皮奶"
          }
        ],
        companyVal: "",
        sort: ""
      },
      // 新品推荐-添加
      newProduct: {
        company: [
          {
            value: "黄金糕",
            label: "黄金糕"
          },
          {
            value: "双皮奶",
            label: "双皮奶"
          }
        ],
        companyVal: "",
        product: [
          {
            value: "龙须面",
            label: "龙须面"
          },
          {
            value: "北京烤鸭",
            label: "北京烤鸭"
          }
        ],
        productVal: ""
      },
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
      dialogVisible: false
    };
  },
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
      this.clickRow = {};
      this.pages.SkipCount = 0;
      this.hotTableData = [];
      this.bannerTableData = [];
      let key = this.plate == "banner" ? "banner" : "hotPro";

      switch (key) {
        case "hotPro":
          APPHomepageModule({
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
          APPHomepageModuleBanner({
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
      sendAppHome({ status: n, id: this.clickRow.id }).then(res => {
        this.$message(res.data.Msg);
        this.getAllData();
      });
    },
    // 删除
    del() {
      APPHomepageModuleDelete({ id: this.clickRow.id }).then(res => {
        this.$message(res.Msg);
        this.dialogVisible = false;
        this.getAllData();
      });
    },
    // 编辑
    editHandle() {
      switch (this.plate) {
        case "banner":
          console.log("banner");
          break;
        case "hotPro":
          this.mask.hot = !this.mask.hot;
          console.log("hotPro");
          break;
        case "selling":
          console.log("selling");
          break;
        case "newProduct":
          console.log("newProduct");
          break;
      }
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
    // 新增,显示
    hideMsak(key) {
      this.mask[key] = !this.mask[key];
    },
    save() {
      switch (this.plate) {
        case "banner":
          console.log(this.bannerAdd);
          this.mask.banner = !this.mask.banner;
          break;
        case "hotPro":
          console.log(this.hotPro);
          this.mask.hot = !this.mask.hot;
          break;
        case "selling":
          console.log(this.selling);
          this.mask.selling = !this.mask.selling;
          break;
        case "newProduct":
          console.log(this.newProduct);
          this.mask.newProduct = !this.mask.newProduct;
          break;
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
  /* background: #eee; */
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
  width: 100%;
  height: 100px;
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
</style>
