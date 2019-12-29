<template>
  <div>
    <el-form class="row_6" ref="form" :model="form" label-width="80px">
      <el-form-item label="">
        <el-input v-model="form.name" placeholder="请输入机构简称"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="form.date1" placeholder="请输入机构代码"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="form.region" placeholder="选择机构类型">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="总公司" value="总公司"></el-option>
          <el-option label="分公司" value="分公司"></el-option>
          <el-option label="营业部" value="营业部"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="form.date2" placeholder="营业">
          <el-option label="营业" value="营业"></el-option>
          <el-option label="停业" value="停业"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="form.delivery" placeholder="选择持证状态">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="有证" value="有证"></el-option>
          <el-option label="备案" value="备案"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="form.delivery" placeholder="选择是否考核">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="是" value="是"></el-option>
          <el-option label="否" value="否"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search()">搜索</el-button>
        <!--          <el-button>取消</el-button>-->
      </el-form-item>
    </el-form>
    <div class="my_button">
      <el-button @click="xiazai">机构模版下载</el-button>
     <!--<el-button ></el-button>-->
      <el-button @click="export2Excel">导出机构</el-button>
      <el-button @click="showNew" id="newADD">新增</el-button>
    </div>
    <input type="file" style="font-size: 26px" @change="importfxx(this)"  accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" value="导入机构" />


    <div class="table_box">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="mobile" label="机构电话" width="180"></el-table-column>
        <el-table-column prop="code" label="供应商代码" width="180"></el-table-column>
        <el-table-column prop="abbreviation" label="供应商简称" width="180"></el-table-column>
        <el-table-column prop="principal" label="负责人	" width="180"></el-table-column>
        <el-table-column prop="set_up_time" label="设立时间" width="180"></el-table-column>
        <el-table-column prop="status" label="状态" width="180"></el-table-column>
        <el-table-column prop="address" label="注册地" width="180"></el-table-column>
        <el-table-column prop="organization_type" label="机构类型" width="180"></el-table-column>
        <el-table-column prop="licensed_status" label="持证状态"></el-table-column>
        <el-table-column prop="assessment" label="是否考核"></el-table-column>
      </el-table>
    </div>
    <div class="pageInation">
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="PageIndex"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="PageSize"
              :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    import { export_json_to_excel } from '@/vendor/Export2Excel'
    import {getjigoulist,getjigouclass,addjigoulist} from "@/request/api"
    export default {
        name: "OrganizationListSearch",
        methods: {
          xiazai(){
            require.ensure([], () => {
              const { export_json_to_excel } = require('@/vendor/Export2Excel');
              const tHeader = ['机构代码', '名称', '简称', '设立时间', '联系电话', '负责人', '角色', '机构类型', '所属机构', '持证状态', '是否考核', '注册地', '所属地区', '邮政编码', '状态', 'app显示','地址']; //将对应的属性名转换成中文
              const data = [];
              export_json_to_excel(tHeader, data, '机构账号模板');

            })
          },
          importfxx() {
            let _this = this;
            this.file = event.currentTarget.files[0];
            var rABS = false;//是否将文件读取为二进制字符串
            var f = this.file;
            var reader = new FileReader();
            //if (!FileReader.prototype.readAsBinaryString) {
            FileReader.prototype.readAsBinaryString = function(f) {
              var binary = "";
              var rABS = false; //是否将文件读取为二进制字符串
              var wb; //读取完成的数据
              var outdata;
              var reader = new FileReader();
              reader.onload = function() {
                var bytes = new Uint8Array(reader.result);
                var length = bytes.byteLength;
                for(var i = 0; i < length; i++) {
                  binary += String.fromCharCode(bytes[i]);
                }
                var XLSX = require('xlsx');
                window.console.log(rABS)
                // if(rABS) {
                //   wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
                //     type: 'base64'
                //   });
                // } else {
                  wb = XLSX.read(binary, {
                    type: 'binary'
                  });
                // }
                // outdata就是你想要的东西 excel导入的数据
                outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
                //excel数据再处理
                let arr = []
                outdata.map(v => {
                  let obj = {}
                  obj.code = v.机构代码
                  obj.name = v.名称
                  obj.abbreviation = v.简称
                  obj.set_up_time = v.设立时间
                  obj.mobile = v.联系电话
                  obj.principal = v.负责人
                  obj.role = v.角色
                  obj.organization_type = v.机构类型
                  obj.affiliation = v.所属机构
                  obj.licensed_status = v.持证状态
                  obj.assessment = v.是否考核
                  obj.address = v.注册地
                  obj.isarea = v.所属地区
                  obj.status = v.状态
                  obj.appshow = v.app显示
                  obj.postcode = v.邮政编码
                  obj.naddress = v.地址
                  addjigoulist(obj).then(res=>{
                    window.console.log(res)
                    _this.getdata()
                  })
                  arr.push(obj)
                  _this.tableData.push(obj)
                })
                window.console.log(arr)
                // _this.tableData = [...arr];
              }
              reader.readAsArrayBuffer(f);
            }
            if(rABS) {
              reader.readAsArrayBuffer(f);
            } else {
              reader.readAsBinaryString(f);
            }
          },
          downloadExcel() {
            let a = document.createElement('a')
            a.href ="/jiagoulistwenjian"
            a.click();
          },
          export2Excel() {
            require.ensure([], () => {
              const tHeader = [] // 对应表格输出的中文title
              const filterVal = [] // 对应表格输出的数据
              var item;
              for (item in this.tableHead){
                tHeader.push(this.tableHead[item])
                filterVal.push(item)
              }
              // this.tableHead.forEach((item,index) => {
              //   window.console.log(item,index)
              // })
              const list = this.tableData // 表格data
              const data = this.formatJson(filterVal, list)
              window.console.log(tHeader)
              export_json_to_excel(tHeader, data, '机构列表') // 对应下载文件的名字

            })

          },
          formatJson(filterVal, jsonData) {

            jsonData.map(v => filterVal.map(j => v[j]))

            return jsonData.map(v => filterVal.map(j => v[j]))

          },
            handleSizeChange(val) {
              this.PageSize=val
              window.console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
              this.PageIndex=val
              window.console.log(`当前页: ${val}`);
            },
            showNew () {
                this.$emit('changeNew')
            },
            search(){
                this.getdata()
            },
            getdata(){
              var that=this
              getjigoulist({PageSize:that.PageSize,PageIndex:that.PageIndex,form:that.form}).then(res=>{
                window.console.log(res)
                that.tableData=res.Data.Rows
                that.PageSize=res.Data.TotalPage
                that.total=res.Data.Records
              })
            }
        },
        mounted(){
          //机构分类
          getjigouclass().then(res=>{
            this.classtype=res.Data
          })
          this.getdata()
        },

        data() {
            return {
              tableHead:{
                code: '机构代码',
                name:'名称',
                abbreviation:'简称',
                set_up_time:'设立时间',
                mobile:"联系电话",
                principal:'负责人',
                role:'角色',
                organization_type:'机构类型',
                affiliation:'所属机构',
                licensed_status:'持证状态',
                assessment:'是否考核',
                address:'注册地',
                isarea:'所属地区',
                postcode:"邮政编码",
                status:'状态',
                appshow:'app显示',
                naddress:'地址',
              },
              total:0,
              PageIndex:1,
              PageSize:100,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                },
                url: "",
                formInline: {
                    user: '',
                    region: ''
                },
                tableData: []
            }
        }
    }
</script>

<style scoped>
  .row_6 {
    width: 100%;
    display: flex;
    overflow: hidden;
    /*background-color: red;*/
    justify-content: flex-start;
  }

  .row_6 .el-form-item {
    width: 16%;
  }

  .row_6 .el-form-item >>> .el-form-item__content {
    width: 100%;
  }

  .my_button {
    width: 100%;
    height: 40px;
    /*background-color: red;*/
  }

  .my_button .el-button {
    background-color: #2db7f5;
    border-color: #2db7f5;
    font-size: 16px;
    color: #fff;
    margin-right: 30px;
  }

  #newADD {
    background-color: #f90;
    border-color: #f90;
  }

  .table_box {
    width: 100%;
    margin-top: 36px;
  }
  .pageInation{
    width: 100%;
    height: 40px;
    /*background-color: red;*/
    margin-top: 20px;
  }
</style>
