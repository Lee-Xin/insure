<template>
  <div style="height: calc(100% - 100px);">
    <el-form :inline="true" :model="formInline" class="demo-form-inline supplierListSearchForm">
      <el-row :gutter="15" style="width: 100%;">
        <el-col :span="7">
          <el-form-item class="supplierListSearch_label">
            <el-input v-model="formInline.shortName" placeholder="请输入供应商简称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item>
            <el-select v-model="formInline.cooperationType" placeholder="请选择合作类型">
              <el-option
                      v-for="(item, index) in type_cooperation"
                      :label="item.name"
                      :value="item.name"
                      :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item>
            <el-select v-model="formInline.cooperationStatus">
              <el-option
                      v-for="(item, index) in state_cooperation"
                      :label="item.name"
                      :value="item.name"
                      :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="searchData">搜索</el-button>
            <i style="margin: 0 20px; height: 36px;" class="v-line"></i>
            <el-button type="warning" icon="el-icon-plus" @click="showNewSupplier">新增供应商</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div class="table_box">
      <el-table :data="tableData" height="100%">
        <el-table-column label="序号" width="180" type="index" header-align="center" align="center"></el-table-column>
        <el-table-column prop="code" label="供应商代码" width="180"></el-table-column>
        <el-table-column prop="shortName" label="供应商简称" width="180">
          <template slot-scope="scope">
            <a style="text-decoration: underline; color: #2D8cF0;" href="javascript: void(0);" @click="clickShortName(scope.row)" type="primary">{{scope.row.shortName}}</a>
          </template>
        </el-table-column>
        <el-table-column label="合约起止时间" width="180">
          <template slot-scope="scope">
            {{scope.row.startDate}}-{{scope.row.endDate}}
          </template>
        </el-table-column>
        <el-table-column prop="cooperationType" label="合作类型" width="180"></el-table-column>
        <el-table-column prop="cooperationStatus" label="合作状态" width="180"></el-table-column>
        <el-table-column prop="serviceHotline" label="渠道经理服务电话" width="180"></el-table-column>
        <el-table-column prop="serviceTelephone" label="电话" width="180"></el-table-column>
        <el-table-column prop="website" label="供应商网址"></el-table-column>
      </el-table>
    </div>
    <div class="supplierListPage">
      <page-ination
        @changeSize="changeSize"
        @changeCurrentPage="changeCurrentPage"
        :total="totablNum"
      ></page-ination>
    </div>
<!--    显示供应商详细数据的弹窗-->
    <div v-if="showDetailPopup" class="showDetail_popup">
      <div class="showD_popup_content">
        <div class="showD_popup_content_top">
          <span>查询详情</span>
          <i @click="hideDetailPopup()" class="el-icon-close"></i>
        </div>
        <div class="showD_popup_content_table">
          <div class="showD_popup_tr_one">
            <div class="showD_popup_tr_one_left">供应商全称</div>
            <div class="showD_popup_tr_one_right">{{formDetail.fullName}}</div>
          </div>
          <div class="showD_popup_tr_two">
            <div class="showD_popup_tr_one_left">供应商简称</div>
            <div class="showD_popup_tr_one_right">{{formDetail.shortName}}</div>
            <div class="showD_popup_tr_one_left">供应商代码</div>
            <div class="showD_popup_tr_one_right">{{formDetail.code}}</div>
          </div>
          <div class="showD_popup_tr_two">
            <div class="showD_popup_tr_one_left">合约开始时间</div>
            <div class="showD_popup_tr_one_right">{{formDetail.startDate}}</div>
            <div class="showD_popup_tr_one_left">合约结束时间</div>
            <div class="showD_popup_tr_one_right">{{formDetail.endDate}}</div>
          </div>
          <div class="showD_popup_tr_two">
            <div class="showD_popup_tr_one_left">合作类型</div>
            <div class="showD_popup_tr_one_right">{{formDetail.cooperationType}}</div>
            <div class="showD_popup_tr_one_left">合作状态</div>
            <div class="showD_popup_tr_one_right">{{formDetail.cooperationStatus}}</div>
          </div>
          <div class="showD_popup_tr_two">
            <div class="showD_popup_tr_one_left">官网网址</div>
            <div class="showD_popup_tr_one_right">{{formDetail.website}}</div>
            <div class="showD_popup_tr_one_left">服务热线</div>
            <div class="showD_popup_tr_one_right">{{formDetail.serviceHotline}}</div>
          </div>
          <div class="showD_popup_tr_two">
            <div class="showD_popup_tr_one_left">注册资本</div>
            <div class="showD_popup_tr_one_right">{{formDetail.registerCapital}}</div>
            <div class="showD_popup_tr_one_left">设立时间</div>
            <div class="showD_popup_tr_one_right">{{formDetail.createDate}}</div>
          </div>
          <div class="showD_popup_tr_two">
            <div class="showD_popup_tr_one_left">总部地址</div>
            <div class="showD_popup_tr_one_right">{{formDetail.headAddress}}</div>
            <div class="showD_popup_tr_one_left">渠道经理服务电话</div>
            <div class="showD_popup_tr_one_right">{{formDetail.serviceTelephone}}</div>
          </div>
          <div class="showD_popup_tr_two">
            <div class="showD_popup_tr_one_left">公司简称</div>
            <div class="showD_popup_tr_one_right">{{formDetail.shortName}}</div>
            <div class="showD_popup_tr_one_left">APP名称</div>
            <div class="showD_popup_tr_one_right">{{formDetail.appName}}</div>
            <div class="showD_popup_tr_one_left">微信公众号</div>
            <div class="showD_popup_tr_one_right">{{formDetail.weChatAccount}}</div>
          </div>
          <div class="showD_popup_tr_two_imgBox">
            <div class="showD_popup_tr_two_left">公司logo</div>
            <div class="showD_popup_tr_two_img">
<!--              <img src="" alt="">-->
            </div>
            <div class="showD_popup_tr_two_left">APP二维码</div>
            <div class="showD_popup_tr_two_img">
<!--              <img src="" alt="">-->
            </div>
            <div class="showD_popup_tr_two_left">公众号二维码</div>
            <div class="showD_popup_tr_two_img">
<!--              <img src="" alt="">-->
            </div>

          </div>
          <div class="showD_popup_tr_big">
            <div class="showD_popup_tr_big_left">公司简介</div>
            <div class="showD_popup_tr_big_right">{{formDetail.aboutUs}}</div>
          </div>
          <div class="showD_popup_tr_big">
            <div class="showD_popup_tr_big_left">公司荣誉</div>
            <div class="showD_popup_tr_big_right">{{formDetail.companyGlories}}</div>
          </div>
          <div class="showD_popup_tr_big">
            <div class="showD_popup_tr_big_left">发展历程</div>
            <div class="showD_popup_tr_big_right">{{formDetail.developmentHistory}}</div>
          </div>
        </div>
        <div class="showD_popup_content_bottom">
          <el-button @click="hideDetailPopup()" type="primary">关闭</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {
      apiSupperlist,
    } from "@/mock/api";

    import PageInation from "../../../common/PageInation";

    export default {
        name: "SupplierListSearch",
        components: {PageInation},
        data() {
            return {
                url: "/supplier_list/new_supplier",
                formInline: {
                    shortName: "",
                    cooperationType: "",
                    cooperationStatus: "",
                    MaxResultCount: 50,
                    Sorting: 1,
                    SkipCount: 0,
                },
                tableData: [],
                type_cooperation: [],
                state_cooperation: [],
                fullName: [],
                // MaxResultCount: 50,
                // SkipCount: 0,
                // Sorting: 1,
                startEndTime: "",
                totablNum: 0,
                showDetailPopup: false,
                formDetail: {
                    aboutUs: "",
                    appName: "",
                    appQrCode: null,
                    code: "",
                    companyGlories: "",
                    cooperationStatus: "",
                    cooperationType: "",
                    createDate: "",
                    developmentHistory: "",
                    endDate: "",
                    fullName: "",
                    headAddress: "",
                    id: "",
                    logo: null,
                    qrCode: null,
                    registerCapital: "",
                    serviceHotline: "",
                    serviceTelephone: "",
                    shortName: "",
                    startDate: "",
                    weChatAccount: "",
                    website: "",
                }
            };
        },
        created() {
            /*//  获取合作类型
            apiSupperListSearchType().then(res => {
                // console.log(res)
                if (res.success) {
                    let result = res.result;
                    for (let i = 0; i < result.length; i++) {
                        this.type_cooperation.push(result[i]);
                    }
                }
            });
            //  获取合作状态
            apiSupplierListSearchStatus().then(res => {
                if (res.success) {
                    let result = res.result;
                    for (let i = 0; i < result.length; i++) {
                        this.state_cooperation.push(result[i]);
                    }
                }
            });*/
            //  初始化时的分页
          apiSupperlist(this.formInline).then(res => {
            console.log(res);
            /*if (res.success) {
                this.totablNum = res.result["totalCount"];
                this.tableData = res.result["items"];
            }*/
          });
        },
        methods: {
            clickShortName(row) {
                apiSupplierListGetById({
                    id: row.id
                }).then(res => {
                    if (res.success){
                        this.formDetail = res.result;
                    }
                })
                this.showDetailPopup = true;
            },
            hideDetailPopup() {
                this.showDetailPopup = false;
            },
            //  当页每页显示的条数发生改变
            changeSize(val) {
                this.formInline.SkipCount = 0;
                this.formInline.MaxResultCount = val;
                apiSupplierListSearchPageInation(this.formInline).then(res => {
                    if (res.success) {
                        this.totablNum = res.result["totalCount"];
                        this.tableData = res.result["items"];
                    }
                });
            },
            //  当前页发生改变时
            changeCurrentPage(val) {
                this.formInline.SkipCount = (val - 1) * 50;
                apiSupplierListSearchPageInation(this.formInline).then(res => {
                    // console.log('asdas')
                    // console.log(res);
                    if (res.success) {
                        this.totablNum = res.result["totalCount"];
                        this.tableData = res.result["items"];
                    }
                });
            },
            //  搜索数据
            searchData() {
                apiSupplierListSearchPageInation(this.formInline).then(res => {
                    if (res.success) {
                        this.tableData = res.result.items;
                    }
                });
            },
            showNewSupplier() {
                this.$emit(
                    "showNewSupplier",
                    this.state_cooperation,
                    this.type_cooperation,
                    this.totablNum
                );
            }
        }
    };
</script>

<style scoped>
  .showDetail_popup{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background-color: rgba(0,0,0,.6);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .showD_popup_content_bottom{
    width: 100%;
    height: 60px;
    border-top: 1px solid #8e8e8e;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 15px;
    box-sizing: border-box;
  }
  .showD_popup_content{
    width: 1000px;
    height: 686px;
    background-color: #fff;
  }
  .showD_popup_tr_big_right{
    padding: 15px 15px 15px 15px;
    line-height: 18px;
    font-size: 14px;
    color: #333;
    text-align: justify;
  }
  .showD_popup_tr_big{
    width:100%;
    height:auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .showD_popup_tr_big_left{
    padding: 0 15px;
    height: auto;
    display: block;
    border-right: 1px solid #8e8e8e;
    background-color: #F4F4F4;
    font-size: 14px;
    color: #333;
    white-space: nowrap;
  }
  .showD_popup_content_top{
    width: 100%;
    height: 43px;
    color: #fff;
    font-size: 14px;
    padding: 0 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #4074e1;
  }
  .showD_popup_content_top i{
    font-size: 20px;
  }
  .showD_popup_content_table{
    width: 950px;
    height: 550px;
    padding: 15px;
    margin: 0 auto;
    overflow-y: scroll;
  }
  .showD_popup_tr_two_img{
    width: 100%;
    height: 121px;
    display: block;
  }
  .showD_popup_tr_two_left{
    padding: 0 15px;
    height: 121px;
    line-height: 121px;
    text-align: center;
    border-right: 1px solid #8e8e8e;
    background-color: #F4F4F4;
    font-size: 14px;
    font-weight: bold;
    white-space: nowrap;
  }
  .showD_popup_tr_two_imgBox{
    width: 100%;
    height: 121px;
    display: flex;
    justify-content: flex-start;
    border-top: 1px solid #8e8e8e;
    border-left: 1px solid #8e8e8e;
    border-right: 1px solid #8e8e8e;
  }
  .showD_popup_tr_two{
    width: 100%;
    height: 50px;
    border-top: 1px solid #8e8e8e;
    border-left: 1px solid #8e8e8e;
    border-right: 1px solid #8e8e8e;
    display: flex;
    justify-content: flex-start;
  }
  .showD_popup_tr_one{
    width: 100%;
    height: 50px;
    border-top: 1px solid #8e8e8e;
    border-right: 1px solid #8e8e8e;
    border-left: 1px solid #8e8e8e;
    display: flex;
  }
  .showD_popup_tr_one_left{
    padding: 0 15px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    border-right: 1px solid #8e8e8e;
    background-color: #F4F4F4;
    white-space: nowrap;
  }
  .showD_popup_tr_one_right{
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding-left: 15px;
    box-sizing: border-box;
    font-size: 12px;
    color: #333;
    text-align: left;
    white-space: nowrap;
  }
  .el-form {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .el-form-item {
    width: 100%;
    margin: 0!important;
  }

  .el-form-item >>> .el-form-item__content {
    width: 100%;
  }

  .el-form-item >>> .el-form-item__content .el-select {
    width: 100%;
  }

  .el-form >>> label {
    display: none;
  }

  .table_box {
    width: 100%;
    height: calc(100% - 80px);
    overflow: hidden;
    margin-top: 30px;
    overflow-y: auto;
  }
  .table_box button{
    font-size: 14px;
    color: #fff;
  }
</style>
