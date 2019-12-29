<template>
  <div>
    <div class="DeskListSearch" v-show="mainshow">
      <el-form ref="form" :model="form">
        <div class="row_5">
          <el-form-item>
            <el-select v-model="form.region" placeholder="姓名">
              <el-option label="姓名" value="shanghai"></el-option>
              <el-option label="手机号码" value="beijing"></el-option>
              <el-option label="工号" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.name" placeholder="请输入工号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.name" placeholder="请输入工号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="form.region" placeholder="请选择性别">
              <el-option label="全部" value="shanghai"></el-option>
              <el-option label="男" value="beijing"></el-option>
              <el-option label="女" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="form.region" placeholder="在职">
              <el-option label="全部" value="shanghai"></el-option>
              <el-option label="在职" value="beijing"></el-option>
              <el-option label="离职" value="beijing"></el-option>
              <el-option label="其他" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="row_5">
          <el-form-item>
            <el-date-picker type="date" placeholder="请选择入司时间段" v-model="form.date1"
                            style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item></el-form-item>
          <el-form-item></el-form-item>
          <el-form-item></el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">搜索</el-button>
          </el-form-item>
        </div>
      </el-form>
      <div class="DeskListSearch_button">
        <el-button type="primary" @click="xiazai">内勤模版下载</el-button>
        <input type="file" style="font-size: 26px" @change="importfxx(this)"  accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" value="导入机构" />


        <el-button type="primary" @click="export2Excel">导出员工</el-button>
        <el-button type="primary" @click="hideSearch">新增</el-button>
      </div>
      <div class="DeskListSearch_table">
        <el-table :data="tableData"    @current-change="handleCurrentChange" style="width: 100%">
          <el-table-column prop="id" label="编号"></el-table-column>
          <el-table-column prop="Job_number" label="工号"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="sex" label="性别"></el-table-column>
          <el-table-column prop="age" label="年龄"></el-table-column>
          <el-table-column prop="phone" label="手机号"></el-table-column>
          <el-table-column prop="Branch_office" label="机构"></el-table-column>
          <el-table-column prop="department" label="部门"></el-table-column>
          <el-table-column prop="post" label="岗位"></el-table-column>
          <el-table-column prop="In_service_status" label="状态"></el-table-column>
        </el-table>
      </div>
      <div class="DeskListSearch_table">
        <div style="margin-top: 20px">
          <el-button @click="upds()">修改</el-button>
          <el-button @click="dels()">删除</el-button>
        </div>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange2"
                :current-page.sync="PageIndex"
                :page-sizes="[50,100, 200, 300, 400]"
                :page-size="PageSize"
                layout="sizes, prev, pager, next"
                :total="total">
        </el-pagination>
      </div>

    </div>

    <div  v-show="updshow" class="DeskListSearch">
        <el-tabs type="border-card">
          <el-tab-pane label="基本信息">
            <el-form ref="form" :model="updata" label-width="80px">
              <div class="title">基本信息</div>
              <el-upload class="avatar-uploader"
                         action="https://jsonplaceholder.typicode.com/posts/"
                         :show-file-list="false"
                         :on-success="handleAvatarSuccess"
                         :before-upload="beforeAvatarUpload">>
                <el-button size="small" type="primary">头像上传</el-button>
              </el-upload>
              <div class="row_4">
                <el-form-item label="姓名">
                  <el-input v-model="updata.name"></el-input>
                </el-form-item>
                <el-form-item label="曾用名">
                  <el-input v-model="updata.Used_name"></el-input>
                </el-form-item>
                <el-form-item label="证件类型">
                  <el-select v-model="updata.cardtype">
                    <el-option label="身份证" value="身份证"></el-option>
                    <el-option label="护照" value="护照"></el-option>
                    <el-option label="台湾居民来往大陆通行证" value="台湾居民来往大陆通行证"></el-option>
                    <el-option label="港澳居民来往内地通行证" value="港澳居民来往内地通行证"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="证件号码">
                  <el-input v-model="updata.idcard"></el-input>
                </el-form-item>
              </div>
              <div class="row_4">
                <el-form-item label="性别">
                  <el-select v-model="updata.sex">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="出生日期">
                  <el-date-picker type="date" placeholder="选择日期" v-model="updata.date_of_birth"
                                  style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="婚姻状况">
                  <el-select v-model="updata.marital_status">
                    <el-option label="未婚" value="未婚"></el-option>
                    <el-option label="已婚" value="已婚"></el-option>
                    <el-option label="丧偶" value="丧偶"></el-option>
                    <el-option label="离异" value="离异"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="文化程度">
                  <el-select v-model="updata.Educational_level">
                    <el-option label="初中以下学历" value="初中以下学历"></el-option>
                    <el-option label="初中及同等学历" value="初中及同等学历"></el-option>
                    <el-option label="高中及同等学历" value="高中及同等学历"></el-option>
                    <el-option label="中专" value="中专"></el-option>
                    <el-option label="大专" value="大专"></el-option>
                    <el-option label="本科" value="本科"></el-option>
                    <el-option label="研究生" value="研究生"></el-option>
                    <el-option label="博士" value="博士"></el-option>
                    <el-option label="博士后" value="博士后"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="row_4">
                <el-form-item label="民族">
                  <el-select v-model="updata.Nationality">
                    <el-option label="汉族" value="汉族"></el-option>
                    <el-option label="壮族" value="壮族"></el-option>
                    <el-option label="满族" value="满族"></el-option>
                    <el-option label="回族" value="回族"></el-option>
                    <el-option label="苗族" value="苗族"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="政治面貌">
                  <el-select v-model="updata.political_status">
                    <el-option label="中共党员" value="中共党员"></el-option>
                    <el-option label="中共预备党员" value="中共预备党员"></el-option>
                    <el-option label="共青团员" value="共青团员"></el-option>
                    <el-option label="AB民革会员型" value="AB民革会员型"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="星座">
                  <el-select v-model="updata.constellation">
                    <el-option label="双子座" value="双子座"></el-option>
                    <el-option label="射手座" value="射手座"></el-option>
                    <el-option label="白羊座" value="白羊座"></el-option>
                    <el-option label="金牛座" value="金牛座"></el-option>
                    <el-option label="狮子座" value="狮子座"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="血型">
                  <el-select v-model="updata.blood_group">
                    <el-option label="O型" value="O型"></el-option>
                    <el-option label="A型" value="A型"></el-option>
                    <el-option label="B型" value="B型"></el-option>
                    <el-option label="AB型" value="AB型"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="row_4">
                <el-form-item label="籍贯">
                  <el-input v-model="updata.Birthplace"></el-input>
                </el-form-item>
                <el-form-item></el-form-item>
                <el-form-item></el-form-item>
                <el-form-item></el-form-item>
              </div>
              <div class="title">联系方式</div>
              <div class="row_4">
                <el-form-item label="手机号">
                  <el-input v-model="updata.phone"></el-input>
                </el-form-item>
                <el-form-item label="电话号码">
                  <el-input v-model="updata.mobile"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                  <el-input v-model="updata.email"></el-input>
                </el-form-item>
                <el-form-item label="QQ">
                  <el-input v-model="updata.qq"></el-input>
                </el-form-item>
              </div>
              <div class="row_4">
                <el-form-item label="微信">
                  <el-input v-model="updata.wechat"></el-input>
                </el-form-item>
                <el-form-item label="邮编">
                  <el-input v-model="updata.postcode"></el-input>
                </el-form-item>
                <el-form-item label="省市区">
                  <el-cascader
                          v-model="updata.Province_City_District"
                          :options="area"
                          @change="handleChange"></el-cascader>
                </el-form-item>

              </div>
              <div class="row_4">
                <el-form-item label="详细地址">
                  <el-input v-model="updata.address"></el-input>
                </el-form-item>
                <el-form-item></el-form-item>
                <el-form-item></el-form-item>
                <el-form-item></el-form-item>
              </div>
              <div class="title">入司信息</div>
              <div class="row_4">
                <el-form-item label="工号">
                  <el-input v-model="updata.Job_number"></el-input>
                </el-form-item>
                <el-form-item label="合同号码">
                  <el-input v-model="updata.Contract_number"></el-input>
                </el-form-item>
                <el-form-item label="合同开始时间">
                  <el-date-picker type="date" placeholder="选择日期" v-model="updata.Contract_start_time"
                                  style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="合同结束时间">
                  <el-date-picker type="date" placeholder="选择日期" v-model="updata.Contract_end_time"
                                  style="width: 100%;"></el-date-picker>
                </el-form-item>
              </div>
              <div class="row_4">
                <el-form-item label="分支机构">
                  <el-input v-model="updata.Branch_office"></el-input>
                </el-form-item>
                <el-form-item label="所属部门">
                  <el-input v-model="updata.department"></el-input>
                </el-form-item>
                <el-form-item label="入司时间">
                  <el-date-picker type="date" placeholder="选择日期" v-model="updata.Entry_time"
                                  style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="在职状态">
                  <el-select v-model="updata.In_service_status">
                    <el-option label="在职" value="shanghai"></el-option>
                    <el-option label="离职" value="beijing"></el-option>
                    <el-option label="留职" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="row_4">
                <el-form-item label="岗位">
                  <el-input v-model="updata.post"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input v-model="updata.remark"></el-input>
                </el-form-item>
                <el-form-item></el-form-item>
                <el-form-item></el-form-item>
              </div>
              <div class="title">其他信息</div>
              <div class="row_4">
                <el-form-item label="银行账号">
                  <el-input v-model="updata.bank_number"></el-input>
                </el-form-item>
                <el-form-item label="银行账号开户">
                  <el-input v-model="updata.bank_name"></el-input>
                </el-form-item>
                <el-form-item></el-form-item>
                <el-form-item></el-form-item>
              </div>
              <div class="row_4">
                <el-form-item label="i云保code码">
                  <el-input v-model="updata.icoundcode"></el-input>
                </el-form-item>
                <el-form-item></el-form-item>
                <el-form-item></el-form-item>
                <el-form-item></el-form-item>
              </div>
              <div class="title">紧急联系人</div>
              <div class="row_4">
                <el-form-item label="姓名">
                  <el-input v-model="updata.urgent_name"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                  <el-input v-model="updata.urgent_mobile"></el-input>
                </el-form-item>
                <el-form-item label="详细地址">
                  <el-input v-model="updata.urgent_address"></el-input>
                </el-form-item>
                <el-form-item></el-form-item>
              </div>
              <el-form-item>
                <el-button type="primary" @click="saves">保存/提交</el-button>
                <el-button @click="backs">返回</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>

  </div>
</template>

<script>
  import { export_json_to_excel } from '@/vendor/Export2Excel'
  import AreaJson from "@/request/area.json"
    import {yglist,delyg,updyg,addyg} from "@/request/api";
    export default {
        name: "DeskListSearch",
        data() {
            return {
              area:AreaJson,
              mainshow:true,
              updshow:false,
              //当前页数
              PageIndex:1,
              //每页条数
              PageSize:50,
              //总共条数
              total:1000,
              currentRow: -1,
              form: {
                  region: ''
              },
              tableData: [],
              updata:[],
              tableHead:{
                name: '姓名',
                Used_name: '曾用名',
                cardtype: '证件类型',
                idcard: '证件号码',
                sex:'男',
                date_of_birth:'出生日期',
                age:'年龄',
                marital_status:'婚姻状态',
                Educational_level:'文化程度',
                Nationality:'名族',
                political_status:'团员',
                constellation:'天秤座',
                blood_group:'血型',
                Birthplace:'籍贯',
                phone:'手机号',
                mobile:'电话',
                email:'邮箱',
                qq:'qq',
                wechat:'微信',
                postcode:'邮政编码',
                Province_City_District:'省市区',
                address:'地址',
                Job_number:'工号',
                Contract_number:'合同号码',
                Contract_start_time:'合同开始时间',
                Contract_end_time:'合同结束时间',
                Branch_office:'分支机构',
                department:'所属部门',
                Entry_time:'入司时间',
                In_service_status:'在职状态',
                post:'岗位',
                remark:'备注',
                bank_number:'银行账号',
                bank_name:'开户行',
                icoundcode:'云代码',
                urgent_name:'紧急联系人',
                urgent_mobile:'紧急电话',
                urgent_address:'紧急地址'
              }
            }
        },
        methods: {
          handleAvatarSuccess(res, file) {
            this.updata.imageUrl = URL.createObjectURL(file.raw);
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
          },
          search(){
            this.getdata()
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
                  obj.name=v.姓名;
                    obj.Used_name=v.曾用名;
                    obj.cardtype=v.证件类型;
                    obj.idcard=v.证件号码;
                    obj.sex=v.男;
                    obj.date_of_birth=v.出生日期;
                    obj.age=v.年龄;
                    obj.marital_status=v.婚姻状态;
                    obj.Educational_level=v.文化程度;
                    obj.Nationality=v.名族;
                    obj.political_status=v.团员;
                    obj.constellation=v.天秤座;
                    obj.blood_group=v.血型;
                    obj.Birthplace=v.籍贯;
                    obj.phone=v.手机号;
                    obj.mobile=v.电话;
                    obj.email=v.email;
                    obj.qq=v.qq;
                    obj.wechat=v.微信;
                    obj.postcode=v.邮政编码;
                    obj.Province_City_District=v.城市;
                    obj.address=v.北京市;
                    obj.Job_number=v.工号;
                    obj.Contract_number=v.合同号码;
                    obj.Contract_start_time=v.合同开始时间;
                    obj.Contract_end_time=v.合同结束时间;
                    obj.Branch_office=v.分支机构;
                    obj.department=v.所属部门;
                    obj.Entry_time=v.入司时间;
                    obj.In_service_status=v.在职状态;
                    obj.post=v.岗位;
                    obj.remark=v.备注;
                    obj.bank_number=v.银行账号;
                    obj.bank_name=v.开户行;
                    obj.icoundcode=v.云代码;
                    obj.urgent_name=v.紧急联系人;
                    obj.urgent_mobile=v.紧急电话;
                    obj.urgent_address=v.紧急地址
                    addyg(obj).then(res=>{
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
          export2Excel() {
            var that=this
            require.ensure([], () => {
              const tHeader = [] // 对应表格输出的中文title
              const filterVal = [] // 对应表格输出的数据
              var item;
              window.console.log(that.tableHead,that.tableData)
              for (item in that.tableHead){
                tHeader.push(that.tableHead[item])
                filterVal.push(item)
              }
              // this.tableHead.forEach((item,index) => {
              //   window.console.log(item,index)
              // })
              const list = that.tableData // 表格data
              const data = that.formatJson(filterVal, list)
              window.console.log(tHeader,data)
              export_json_to_excel(tHeader, data, '员工列表') // 对应下载文件的名字
            })

          },
          formatJson(filterVal, jsonData) {

            jsonData.map(v => filterVal.map(j => v[j]))

            return jsonData.map(v => filterVal.map(j => v[j]))

          },
          xiazai(){
            var that=this
            require.ensure([], () => {
              const { export_json_to_excel } = require('@/vendor/Export2Excel');
              const tHeader = [] // 对应表格输出的中文title
              var item;
              window.console.log(that.tableHead)
              for (item in that.tableHead){
                tHeader.push(that.tableHead[item])
              }
              window.console.log(tHeader)
              const data = [];
              export_json_to_excel(tHeader, data, '员工列表模板');

            })
          },
          handleChange(value) {
            this.updata.Province_City_District=value
            window.console.log(value);
          },
          backs(){
            this.mainshow=true
            this.updshow=false
          },
          //添加
          dels(){
            if(this.currentRow == -1){
              this.$message('请选择一行');
              return false
            }
            delyg({id:this.currentRow}).then(res=>{
              this.$message(res.Msg);
              this.getdata()
            })
          },
          //修改
          upds(){
            if(this.currentRow == -1){
              this.$message('请选择一行');
              return false
            }
            this.mainshow=false
            this.updshow=true
          },
          saves(){
            var that=this
            updyg(that.updata).then(res=>{
              this.$message(res.Msg);
              that.getstaff();
            })
          },
          //分页
          handleSizeChange(val) {
            this.PageSize=val
            window.console.log(`每页 ${val} 条`);
            this.getstaff();
          },
          handleCurrentChange2(val) {
            this.PageIndex=val
            window.console.log(`当前页: ${val}`);
            this.getstaff();
          },
          handleCurrentChange(val) {
            this.currentRow = val.id;
            this.updata=val
          },
          hideSearch() {
            this.$emit('hideSearch')
          },
          getdata(){
            var that=this
            yglist({PageIndex:that.PageIndex,PageSize:that.PageSize,form:that.form}).then(res=>{
              var data=res.Data
              window.console.log('员列表',res.Data)
              that.tableData = data.Rows
              that.total = data.Records
            })
          }
        },
        created() {
          window.console.log(this.tablehead)
          this.getdata()
        },

    }
</script>

<style scoped>
  .DeskListSearch {
    width: 100%;
    min-height: 500px;
    /*background-color: red;*/
  }
  .row_4{
    background-color: #fff;
  }
  .row_5 {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    /*background-color: red;*/
  }

  .row_5 >>> .el-form-item {
    width: 20%;
    height: 40px;
  }

  .row_5 >>> .el-form-item .el-form-item__content {
    width: 100%;
  }

  .row_5 >>> .el-form-item .el-form-item__content .el-select,
  .row_5 >>> .el-form-item .el-form-item__content .el-input,
  .row_5 >>> .el-form-item .el-form-item__content button {
    width: 100%;
  }

  .DeskListSearch_button {
    width: 100%;
    height: 40px;
    margin-top: 50px;
    margin-bottom: 80px;
    /*background-color: #4074e1;*/
  }

  .DeskListSearch_button button {
    width: 120px;
    height: 40px;
    background-color: #2c8cf0;
    color: #fff;
    border: 0;
    margin: 0 50px;
  }

  .DeskListSearch_table {
    width: 100%;
    min-height: 300px;
    /*background-color: red;*/
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
