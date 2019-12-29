<template>
  <div>
    <main-title :title="title" :title_f="title_f"></main-title>
    <template v-if="mainToggle">
      <div class="body-box">
        <h3>{{bigTitle}}</h3>
        <div class="main-box">
          <!-- 手机模拟 -->
          <div class="simulation">
            <ul>
              <li v-for="(item, index) of tableData" :key="index">
                <h4>{{item.name}}</h4>
                <div class="desc">
                  <p v-for="(item1, index1) of item.description" :key="index1">{{item1}}</p>
                </div>
                <div class="tags">
                  <span v-for="(item3, index3) of item.tags" :key="index3">{{item3}}</span>
                </div>
              </li>
            </ul>
          </div>
          <!-- 热销产品 -->
          <div class="data-operating">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
              <el-tab-pane label="热门险种管理" name="one">
                <div style="text-align: right; margin: 16px 0">
                  <el-button type="warning" @click="hideMsak()" icon="el-icon-plus">新增热门险种管理</el-button>
                </div>
                <el-table
                  :data="tableData"
                  @current-change="currentChangeHandle"
                  highlight-current-row
                  border
                  style="width: 100%"
                >
                  <el-table-column type="index" label="编号" width="50"></el-table-column>
                  <el-table-column prop="name" label="产品名称"></el-table-column>
                  <el-table-column prop="description" label="说明"></el-table-column>
                  <el-table-column prop="tags" label="标签"></el-table-column>
                  <el-table-column prop="num" label="排序号" width="100"></el-table-column>
                  <el-table-column prop="createTime" label="创建时间"></el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button @click="detailHandle(scope.row)" type="text" size="small">查看产品详情</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>

        <div class="feng-pages">
          <div>
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
      <div class="mask" :hidden="isMask">
        <div class="superInput">
          <h4>热门推荐管理</h4>
          <div class="s-content">
            <div class="sel-box">
              <span>产品</span>
              <el-select v-model="recAddPro.productVal" placeholder="请选择">
                <el-option
                  v-for="item in recAddPro.product"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <el-input v-model="recAddPro.sort" placeholder="请输入排序">
              <template slot="prepend">排序</template>
            </el-input>
            <div class="btn-group">
              <el-button @click="hideMsak">取消</el-button>
              <el-button type="primary" @click="save">确认</el-button>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="body-box">
        <h3>{{bigTitle}}</h3>
        <div class="main-box">
          <!-- 手机模拟 -->
          <div class="simulation detail-pages">
            <h4>产品特色</h4>
            <ul>
              <li v-for="(item, index) of detailData" :key="index">
                <h4>{{item.title}}</h4>
                <p>{{item.description}}</p>
              </li>
            </ul>
          </div>
          <!-- 热销产品 -->
          <div class="data-operating">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
              <el-tab-pane label="产品特色" name="one">
                <div style="text-align: right; margin: 16px 0">
                  <el-button type="success" @click="hideMsak()" icon="el-icon-plus">新增产品特色</el-button>
                </div>
                <el-table
                  :data="detailData"
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
          </div>
        </div>

        <div class="feng-pages">
          <div>
            <el-button type="danger" @click="deleteHandle">删除</el-button>
            <el-button type="primary" @click="editHandle">编辑</el-button>
            <el-button type="primary" @click="backHandle">返回</el-button>
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
      <div class="mask" :hidden="isMask">
        <div class="superInput">
          <h4>产品</h4>
          <div class="s-content">
            <el-input v-model="detailAdd.sort" placeholder="请输入排序">
              <template slot="prepend">排序</template>
            </el-input>
            <el-input v-model="detailAdd.title" placeholder="请输入标题名称"></el-input>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入说明"
              v-model="detailAdd.description">
            </el-input>
            <div class="btn-group">
              <el-button @click="hideMsak">取消</el-button>
              <el-button type="primary" @click="save">确认</el-button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import MainTitle from "@/common/MainTitle";
import { APPHomepageModule, APPHomepageModuleDelete, APPHomepageModuleBanner } from "@/request/api";

export default {
  name: "APPHomepageModule",
  data() {
    return {
      title: "热门推荐管理",
      title_f: "这是热门推荐管理",
      bigTitle: "",
      activeName: "one",
      isMask: true,
      // 分页总数
      pagesTotal: 0,
      tableData: [
        {id: 1, name: '百年康盛保终身重大疾病保险', description: ['承保年龄0-60周岁', '交费期间,3年交、5年交、10年交、15年交、20年、30年','保险期间终身', '最低保额10万'], tags: ['重疾险','多次赔'],num: 1,createTime: '2019-11-14'},
        {id: 2, name: '百年康盛保终身重大疾病保险', description: ['承保年龄0-60周岁', '交费期间,3年交、5年交、10年交、15年交、20年、30年','保险期间终身', '最低保额10万'], tags: ['重疾险','多次赔'],num: 1,createTime: '2019-11-14'},
        {id: 3, name: '百年康盛保终身重大疾病保险', description: ['承保年龄0-60周岁', '交费期间,3年交、5年交、10年交、15年交、20年、30年','保险期间终身', '最低保额10万'], tags: ['重疾险','多次赔'],num: 1,createTime: '2019-11-14'},
        {id: 3, name: '百年康盛保终身重大疾病保险', description: ['承保年龄0-60周岁', '交费期间,3年交、5年交、10年交、15年交、20年、30年','保险期间终身', '最低保额10万'], tags: ['重疾险','多次赔'],num: 1,createTime: '2019-11-14'}
      ],
      hotTableData: [],
      bannerTableData: [],
      // 导航分类唯一标识
      type: "one",
      // 添加
      recAddPro: {
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
        sort: '',
        link: '',
        title1: '',
        title2: '',
        title3: '',
        title4: '',
        title5: '',
        title6: '',
        title7: '',
        para1: '',
        para2: '',
        para3: '',
      },
      // 删除，编辑
      // 选中行
      selectTr: null,
      // 分页
      currentPage: 1,
      pages: {
        page: 1,
        pageSize: 10
      },
      // 显示产品详情
      mainToggle: true,
      // 详情页数据
      detailData: [
        {sort: 1, title: '轻症赔付比例逐渐增高', description: '35种轻症赔付3次第一次35%保额赔付，第二次40%保额赔付，第三次45%保额赔付'},
        {sort: 2, title: '中症赔付比例高', description: '20种中症赔付2次，每次60%赔付'},
        {sort: 2, title: '中症赔付比例高', description: '100种重症5次赔付，分5组每次赔付基本保额，癌症单列，首次患恶性肿瘤赔付基本保额，首次恶性肿瘤确诊之日起间隔5年后，不论恶性肿瘤复发、转移、持续、新发；再次发生恶性肿瘤，给付恶性肿瘤二次基本保额赔付，二次恶性肿瘤确诊之日起间隔5年后，不论恶性肿瘤复发、转移、持续、新发；再次发生恶性肿瘤，给付恶性肿瘤三次基本保额赔付。%赔付'},
        {sort: 2, title: '中症赔付比例高', description: '100种重症5次赔付，分5组每次赔付基本保额，癌症单列，首次患恶性肿瘤赔付基本保额，首次恶性肿瘤确诊之日起间隔5年后，不论恶性肿瘤复发、转移、持续、新发；再次发生恶性肿瘤，给付恶性肿瘤二次基本保额赔付，二次恶性肿瘤确诊之日起间隔5年后，不论恶性肿瘤复发、转移、持续、新发；再次发生恶性肿瘤，给付恶性肿瘤三次基本保额赔付。%赔付'},
        {sort: 2, title: '中症赔付比例高', description: '20种中症赔付2次，每次60%赔付'},
      ],
      // 详情页添加
      detailAdd: {
        sort: '',
        title: '',
        description: ''
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
    handleClick () {
      //
    },
    // 导航切换
    detailHandle(tab, event) {
      console.log(tab, event);
      this.mainToggle = !this.mainToggle
    },
    // 返回
    backHandle (){
      this.mainToggle = !this.mainToggle
    },
    currentChangeHandle(obj) {
      this.selectTr = obj;
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
    hideMsak() {
      this.isMask = !this.isMask
    },
    save() {
      //
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
.simulation ul{
  width: 100%;
}
.simulation li {
  width: 100%;
  margin-bottom: 6px;
  padding: 14px;
  box-sizing: border-box;
  background: #fff;
}
.simulation h4{
  margin: 0;
}
.simulation li .desc{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 16px 0;
  padding: 12px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
.desc p{
  width: 50%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 4px 0;
  color: #757677;
}
.simulation .tags{
  color: #fd1e1f;
}
.simulation .tags span:not(:last-child){
  margin-right: 4px;
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
.input-group{
  display: flex;
  flex-wrap: wrap;
}
.mask .el-input{
  margin-bottom: 16px;
}
.input-group .el-input{
  width: 24%;
  margin-top: 4px;
}
.input-group .el-input:not(:nth-of-type(4n)){
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

.simulation.detail-pages{
  background: #fff;
}
.simulation.detail-pages>h4{
  font-weight: normal;
  text-align: center;
  margin-top: 20px;
  font-size: 17px;
  padding-bottom: 16px;
  border-bottom: 1px solid #dfdfdf;
}
.detail-pages li{
  padding: 8px 12px;
  border-bottom: 1px solid #dfdfdf;
}
.detail-pages li h4{
  font-weight: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #fd576d;
}
.detail-pages li p{
  margin: 4px 0;
  color: #495060;
}

</style>
