<template>
  <div>
    <div class="DeskListSearch">
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <el-upload>
            <el-button size="small" type="primary">头像上传</el-button>
          </el-upload>
          <el-form ref="form" :model="form" label-width="80px">
            <div class="title">基本信息</div>
            <div class="row_4">
              <el-form-item label="姓名">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="曾用名">
                <el-input v-model="form.Used_name"></el-input>
              </el-form-item>
              <el-form-item label="证件类型">
                <el-select v-model="form.cardtype">
                  <el-option label="身份证" value="身份证"></el-option>
                  <el-option label="护照" value="护照"></el-option>
                  <el-option label="台湾居民来往大陆通行证" value="台湾居民来往大陆通行证"></el-option>
                  <el-option label="港澳居民来往内地通行证" value="港澳居民来往内地通行证"></el-option>
                  <el-option label="其他" value="其他"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="证件号码">
                <el-input v-model="form.idcard"></el-input>
              </el-form-item>
            </div>
            <div class="row_4">
              <el-form-item label="性别">
                <el-select v-model="form.sex">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="出生日期">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date_of_birth"
                                style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item label="婚姻状况">
                <el-select v-model="form.marital_status">
                  <el-option label="未婚" value="未婚"></el-option>
                  <el-option label="已婚" value="已婚"></el-option>
                  <el-option label="丧偶" value="丧偶"></el-option>
                  <el-option label="离异" value="离异"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="文化程度">
                <el-select v-model="form.Educational_level">
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
                <el-select v-model="form.Nationality">
                  <el-option label="汉族" value="汉族"></el-option>
                  <el-option label="壮族" value="壮族"></el-option>
                  <el-option label="满族" value="满族"></el-option>
                  <el-option label="回族" value="回族"></el-option>
                  <el-option label="苗族" value="苗族"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="政治面貌">
                <el-select v-model="form.political_status">
                  <el-option label="中共党员" value="中共党员"></el-option>
                  <el-option label="中共预备党员" value="中共预备党员"></el-option>
                  <el-option label="共青团员" value="共青团员"></el-option>
                  <el-option label="AB民革会员型" value="AB民革会员型"></el-option>
                  <el-option label="其他" value="其他"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="星座">
                <el-select v-model="form.constellation">
                  <el-option label="双子座" value="双子座"></el-option>
                  <el-option label="射手座" value="射手座"></el-option>
                  <el-option label="白羊座" value="白羊座"></el-option>
                  <el-option label="金牛座" value="金牛座"></el-option>
                  <el-option label="狮子座" value="狮子座"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="血型">
                <el-select v-model="form.blood_group">
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
                <el-input v-model="form.Birthplace"></el-input>
              </el-form-item>
              <el-form-item></el-form-item>
              <el-form-item></el-form-item>
              <el-form-item></el-form-item>
            </div>
            <div class="title">联系方式</div>
            <div class="row_4">
              <el-form-item label="手机号">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
              <el-form-item label="电话号码">
                <el-input v-model="form.mobile"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
              <el-form-item label="QQ">
                <el-input v-model="form.qq"></el-input>
              </el-form-item>
            </div>
            <div class="row_4">
              <el-form-item label="微信">
                <el-input v-model="form.wechat"></el-input>
              </el-form-item>
              <el-form-item label="邮编">
                <el-input v-model="form.postcode"></el-input>
              </el-form-item>
              <el-form-item label="省市区">
                <el-cascader
                        v-model="form.Province_City_District"
                        :options="area"
                        @change="handleChange"></el-cascader>
              </el-form-item>

            </div>
            <div class="row_4">
              <el-form-item label="详细地址">
                <el-input v-model="form.address"></el-input>
              </el-form-item>
              <el-form-item></el-form-item>
              <el-form-item></el-form-item>
              <el-form-item></el-form-item>
            </div>
            <div class="title">入司信息</div>
            <div class="row_4">
              <el-form-item label="工号">
                <el-input v-model="form.Job_number"></el-input>
              </el-form-item>
              <el-form-item label="合同号码">
                <el-input v-model="form.Contract_number"></el-input>
              </el-form-item>
              <el-form-item label="合同开始时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.Contract_start_time"
                                style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item label="合同结束时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.Contract_end_time"
                                style="width: 100%;"></el-date-picker>
              </el-form-item>
            </div>
            <div class="row_4">
              <el-form-item label="分支机构">
                <el-input v-model="form.Branch_office"></el-input>
              </el-form-item>
              <el-form-item label="所属部门">
                <el-input v-model="form.department"></el-input>
              </el-form-item>
              <el-form-item label="入司时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.Entry_time"
                                style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item label="在职状态">
                <el-select v-model="form.In_service_status">
                  <el-option label="在职" value="shanghai"></el-option>
                  <el-option label="离职" value="beijing"></el-option>
                  <el-option label="留职" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="row_4">
              <el-form-item label="岗位">
                <el-input v-model="form.post"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="form.remark"></el-input>
              </el-form-item>
              <el-form-item></el-form-item>
              <el-form-item></el-form-item>
            </div>
            <div class="title">其他信息</div>
            <div class="row_4">
              <el-form-item label="银行账号">
                <el-input v-model="form.bank_number"></el-input>
              </el-form-item>
              <el-form-item label="银行账号开户">
                <el-input v-model="form.bank_name"></el-input>
              </el-form-item>
              <el-form-item></el-form-item>
              <el-form-item></el-form-item>
            </div>
            <div class="row_4">
              <el-form-item label="i云保code码">
                <el-input v-model="form.icoundcode"></el-input>
              </el-form-item>
              <el-form-item></el-form-item>
              <el-form-item></el-form-item>
              <el-form-item></el-form-item>
            </div>
            <div class="title">紧急联系人</div>
            <div class="row_4">
              <el-form-item label="姓名">
                <el-input v-model="form.urgent_name"></el-input>
              </el-form-item>
              <el-form-item label="手机号码">
                <el-input v-model="form.urgent_mobile"></el-input>
              </el-form-item>
              <el-form-item label="详细地址">
                <el-input v-model="form.urgent_address"></el-input>
              </el-form-item>
              <el-form-item></el-form-item>
            </div>
          <el-form-item>
            <el-button type="primary" @click="save">保存/提交</el-button>
            <el-button @click="backs">返回</el-button>
          </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import {delyg} from "@/request/api";
  import AreaJson from "@/request/area.json"
    export default {
        name: "DeskListAdd",
        methods:{
            handleChange(value) {
              window.console.log(value);
            },
          save(){
              delyg(this.form).then(res=>{
                this.$message(res.Msg);
              })
            },
          backs(){
              this.$emit('dasds')
            window.console.log('11');
          }
        },
        mounted(){},
        data() {
            return {
              area:AreaJson,
                form: {
                  name: '姓名',
                  Used_name: '曾用名',
                  cardtype: '证件类型',
                  idcard: '证件号码',
                  sex:'男',
                  date_of_birth:'出生日期',
                  age:'12',
                  marital_status:'婚姻状态',
                  Educational_level:'文化程度',
                  Nationality:'名族',
                  political_status:'团员',
                  constellation:'天秤座',
                  blood_group:'血型',
                  Birthplace:'籍贯',
                  phone:'1596655326',
                  mobile:'023-156',
                  email:'123@qq.com',
                  qq:'4856',
                  wechat:'dasd1`',
                  postcode:'456123',
                  Province_City_District:['北京','北京','东城区'],
                  address:'北京市',
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
        }
    }
</script>

<style scoped>
  .DeskListSearch {
    width: 100%;
    min-height: 300px;
    /*background-color: red;*/
  }

  .title {
    width: 100%;
    height: 80px;
    font-size: 16px;
    line-height: 80px;
    font-weight: bold;
    color: #666;
    text-align: left;
    padding-left: 30px;
    box-sizing: border-box;
    /*background-color: red;*/
  }

  .row_4 {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    background-color: #fff;
  }

  .row_4 >>> .el-form-item {
    width: 25%;
  }

  .row_4 >>> .el-form-item .el-form-item__content {
    width: 70%;
  }

  .row_4 >>> .el-form-item .el-form-item__content .el-input,
  .row_4 >>> .el-form-item .el-form-item__content .el-select {
    width: 100%;
  }
</style>
