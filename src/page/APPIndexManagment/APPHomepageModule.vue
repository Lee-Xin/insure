<template>
  <div>
    <main-title :title="title" :title_f="title_f"></main-title>
    <div class="body-box">
      <h3>{{bigTitle}}</h3>
      <div class="main-box">
        <!-- 手机模拟 -->
        <div class="simulation">
          <div class="banner hasMask" @click="showMain('轮播图管理', 'banner')">轮播图管理</div>
          <ul>
            <li class="hasMask" @click="showMain('热销热卖', 'selling')">热销热卖</li>
            <li class="hasMask" @click="showMain('新品推荐', 'newProduct')">新品推荐</li>
          </ul>
          <div class="hot-product hasMask" @click="showMain('热销产品', 'hotPro')">热销产品</div>
        </div>
        <!-- 轮播图管理 -->
        <div class="banner-content" v-if="item.banner">
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
                    :before-upload="beforeAvatarUpload">
                    <img v-if="bannerAdd.imageUrl" :src="bannerAdd.imageUrl">
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
          <div style="text-align: right; margin: 16px 0">
            <el-button type="warning" icon="el-icon-plus" @click="hideMsak('banner')">新增</el-button>
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
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column prop="pic" label="图片">
              <template slot-scope="scope">
                <img :src="scope.row.pic" >
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="date" label="创建时间"></el-table-column>
          </el-table>
        </div>
        <!-- 热销热卖 -->
        <div class="selling-content" v-if="item.selling">
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
          <div style="text-align: right; margin: 16px 0">
            <el-button type="warning" icon="el-icon-plus" @click="hideMsak('selling')">新增</el-button>
          </div>
          <el-table
            :data="hotTableData.one"
            @current-change="currentChangeHandle"
            highlight-current-row
            border
            style="width: 100%"
          >
            <el-table-column type="index" label="序号" width="100"></el-table-column>
            <el-table-column prop="name" label="公司名称"></el-table-column>
            <el-table-column prop="date" label="创建时间"></el-table-column>
          </el-table>
        </div>
        <!-- 新品推荐 -->
        <div class="newProduct-content" v-if="item.newProduct">
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
          <div style="text-align: right; margin: 16px 0">
            <el-button type="warning" icon="el-icon-plus" @click="hideMsak('newProduct')">新增</el-button>
          </div>
          <el-table
            :data="tableData.one"
            @current-change="currentChangeHandle('newProduct')"
            highlight-current-row
            border
            style="width: 100%"
          >
            <el-table-column type="index" label="序号" width="100"></el-table-column>
            <el-table-column prop="name" label="产品名称"></el-table-column>
            <el-table-column prop="name" label="说明"></el-table-column>
            <el-table-column prop="date" label="创建时间"></el-table-column>
          </el-table>
        </div>
        <!-- 热销产品 -->
        <div class="data-operating" v-if="item.hotPro">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="寿险" name="one">
              <div style="text-align: right; margin: 16px 0">
                <el-button type="warning" @click="hideMsak('hot')" icon="el-icon-plus">新增</el-button>
              </div>
              <el-table
                :data="hotTableData.one"
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
            <el-tab-pane label="医疗险" name="two">
              <div style="text-align: right; margin: 16px 0">
                <el-button type="warning" @click="hideMsak('hot')" icon="el-icon-plus">新增</el-button>
              </div>
              <el-table
                :data="hotTableData.two"
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
            <el-tab-pane label="重疾险" name="there">
              <div style="text-align: right; margin: 16px 0">
                <el-button type="warning" @click="hideMsak('hot')" icon="el-icon-plus">新增</el-button>
              </div>
              <el-table
                :data="hotTableData.there"
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
            <el-tab-pane label="意外险" name="four">
              <div style="text-align: right; margin: 16px 0">
                <el-button type="warning" @click="hideMsak('hot')" icon="el-icon-plus">新增</el-button>
              </div>
              <el-table
                :data="hotTableData.four"
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
      </div>

      <div class="feng-pages">
        <div>
          <el-button type="danger" v-if="this.plate == 'banner'" @click="obtained">下架</el-button>
          <el-button type="danger" @click="deleteHandle">删除</el-button>
          <el-button type="primary" @click="editHandle">编辑</el-button>
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
</template>

<script>
import MainTitle from "@/common/MainTitle";
import { APPHomepageModule, APPHomepageModuleDelete, APPHomepageModuleBanner } from "@/request/api";

export default {
  name: "APPHomepageModule",
  data() {
    return {
      title: "app首页管理",
      title_f: "这是app首页管理",
      bigTitle: "",
      activeName: "one",
      // 分页总数
      pagesTotal: 0,
      tableData: [],
      hotTableData: [],
      bannerTableData: [],
      // 导航分类唯一标识
      type: "one",
      // 不同分类的弹窗
      mask: {
        hot: true,
        selling: true,
        banner: true,
        newProduct: true
      },
      // 显示手机对应板块
      item: {
        banner: true,
        selling: false,
        newProduct: false,
        hotPro: false
      },
      // 轮播图管理添加
      bannerAdd: {
        name: '',
        typeVal: '',
        type: [
          {label: '产品', value: '产品'},
          {label: '资讯', value: '资讯'},
        ],
        select: [
          {label: '产品', value: '产品'},
          {label: '资讯', value: '资讯'},
        ],
        selectVal: '',
        imageUrl: '',
        status: [
          {label: '上架', value: '上架'},
          {label: '下架', value: '下架'},
        ],
        statusVal: '',
        sort: ''
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
        companyVal: '',
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
        productVal: '',
        sort: ''
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
        companyVal: '',
        sort: ''
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
        companyVal: '',
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
        productVal: '',
      },
      // 删除，编辑
      // 当前板块
      plate: 'banner',
      // 选中行
      selectTr: null,
      // 分页
      currentPage: 1,
      pages: {
        page: 1,
        pageSize: 10
      }
    };
  },
  components: { MainTitle },
  created: function() {
    this.getAllData();
  },
  methods: {
    getAllData(key) {
      switch(key){
        case 'hotPro':
          APPHomepageModule({ type: this.type, ...this.pages }).then(res => {
            this.hotTableData = res.Data;
            this.pagesTotal = res.Data.total;
          });
          break;
        case 'banner':
        default:
          APPHomepageModuleBanner({ type: this.type, ...this.pages }).then(res => {
            this.bannerTableData = res.Data.data;
            this.pagesTotal = res.Data.total;
          });
      }
    },
    // 手机模拟处切换
    showMain(str, prop) {
      this.bigTitle = str;
      this.plate = prop
      this.selectTr = null
      for (var key in this.item) {
        this.item[key] = false;
      }
      this.item[prop] = true;
      this.getAllData(prop);
    },
    // 导航切换
    handleClick(tab, event) {
      // console.log(tab, event);
      this.type = tab.name;
      this.getAllData();
    },
    currentChangeHandle(obj) {
      this.selectTr = obj;
    },
    // 下架
    obtained(){
      if (!this.selectTr) {
        this.$message("请选择一项");
        return;
      }
    },
    // 删除
    deleteHandle() {
      if (!this.selectTr) {
        this.$message("请选择一项");
        return;
      }
      APPHomepageModuleDelete({ type: this.type, id: this.selectTr.id }).then(
        res => {
          console.log(res);
          this.$message(res.Msg);
          this.hotTableData = res.Data;
        }
      );
    },
    // 编辑
    editHandle() {
      if (!this.selectTr) {
        this.$message("请选择一项");
        return;
      }
      console.log(this.selectTr)
      switch(this.plate){
        case 'banner':
          console.log('banner')
          break
        case 'hotPro':
          this.mask.hot = !this.mask.hot;
          console.log('hotPro')
          break
        case 'selling':
          console.log('selling')
          break
        case 'newProduct':
          console.log('newProduct')
          break
      }
    },
    // 分页等
    handleSizeChange(val) {
      this.pages.pageSize = val;
      this.getAllData();
    },
    handleCurrentChange(val) {
      this.pages.page = val;
      this.getAllData();
    },
    // 新增,显示
    hideMsak(key) {
      this.mask[key] = !this.mask[key];
    },
    save() {
      switch(this.plate){
        case 'banner':
          console.log(this.bannerAdd);
          this.mask.banner = !this.mask.banner;
          break
        case 'hotPro':
          console.log(this.hotPro);
          this.mask.hot = !this.mask.hot;
          break
        case 'selling':
          console.log(this.selling);
          this.mask.selling = !this.mask.selling;
          break
        case 'newProduct':
          console.log(this.newProduct);
          this.mask.newProduct = !this.mask.newProduct;
          break
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style scoped>
.body-box {
  font-size: 16px;
  width: 100%;
  border-top: 4px solid #2c8cf0;
  border-radius: 5px 5px 0 0;
  padding: 20px 0;
  box-sizing: border-box;
  text-align: left;
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
}
.feng-pages {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
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

.up-pic{
  margin-top: 16px;
}
</style>
