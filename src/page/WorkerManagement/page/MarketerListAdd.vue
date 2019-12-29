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
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="证件类型">
                <el-select v-model="form.region">
                  <el-option label="身份证" value="shanghai"></el-option>
                  <el-option label="护照" value="beijing"></el-option>
                  <el-option label="台湾居民来往大陆通行证" value="beijing"></el-option>
                  <el-option label="港澳居民来往内地通行证" value="beijin"></el-option>
                  <el-option label="其他" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="证件号码">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </div>
            <div class="row_4">
              <el-form-item label="性别">
                <el-select v-model="form.region">
                  <el-option label="男" value="shanghai"></el-option>
                  <el-option label="女" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="出生日期">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                                style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item label="婚姻状况">
                <el-select v-model="form.region">
                  <el-option label="未婚" value="shanghai"></el-option>
                  <el-option label="已婚" value="beijing"></el-option>
                  <el-option label="丧偶" value="beijing"></el-option>
                  <el-option label="离异" value="beijin"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="文化程度">
                <el-select v-model="form.region">
                  <el-option label="初中以下学历" value="shanghai"></el-option>
                  <el-option label="初中及同等学历" value="beijing"></el-option>
                  <el-option label="高中及同等学历" value="beijing"></el-option>
                  <el-option label="中专" value="beijin"></el-option>
                  <el-option label="大专" value="beijin"></el-option>
                  <el-option label="本科" value="beijin"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="row_4">
              <el-form-item label="民族">
                <el-select v-model="form.region">
                  <el-option label="汉族" value="shanghai"></el-option>
                  <el-option label="壮族" value="beijing"></el-option>
                  <el-option label="满族" value="beijing"></el-option>
                  <el-option label="回族" value="beijin"></el-option>
                  <el-option label="苗族" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="政治面貌">
                <el-select v-model="form.region">
                  <el-option label="中共党员" value="shanghai"></el-option>
                  <el-option label="中共预备党员" value="beijing"></el-option>
                  <el-option label="共青团员" value="beijing"></el-option>
                  <el-option label="AB民革会员型" value="beijin"></el-option>
                  <el-option label="其他" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="星座">
                <el-select v-model="form.region">
                  <el-option label="双子座" value="shanghai"></el-option>
                  <el-option label="射手座" value="beijing"></el-option>
                  <el-option label="白羊座" value="beijing"></el-option>
                  <el-option label="金牛座" value="beijin"></el-option>
                  <el-option label="狮子座" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="血型">
                <el-select v-model="form.region">
                  <el-option label="O型" value="shanghai"></el-option>
                  <el-option label="A型" value="beijing"></el-option>
                  <el-option label="B型" value="beijing"></el-option>
                  <el-option label="AB型" value="beijin"></el-option>
                  <el-option label="其他" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="row_4">
              <el-form-item label="籍贯">
                <el-input></el-input>
              </el-form-item>
              <el-form-item></el-form-item>
              <el-form-item></el-form-item>
              <el-form-item></el-form-item>
            </div>
            <div class="title">联系方式</div>
            <div class="row_4">
              <el-form-item label="手机号">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="电话号码">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="QQ">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </div>
            <div class="row_4">
              <el-form-item label="微信">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="邮编">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="省市区">
              </el-form-item>
              <el-form-item></el-form-item>
            </div>
            <div class="row_4">
              <el-form-item label="详细地址">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item></el-form-item>
              <el-form-item></el-form-item>
              <el-form-item></el-form-item>
            </div>
            <div class="title">入司信息</div>
            <div class="row_4">
              <el-form-item label="工号">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="合同号码">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="合同开始时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                                style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item label="合同结束时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                                style="width: 100%;"></el-date-picker>
              </el-form-item>
            </div>
            <div class="row_4">
              <el-form-item label="分支机构">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="所属部门">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="入司时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                                style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item label="在职状态">
                <el-select v-model="form.region">
                  <el-option label="在职" value="shanghai"></el-option>
                  <el-option label="离职" value="beijing"></el-option>
                  <el-option label="留职" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="row_4">
              <el-form-item label="岗位">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item></el-form-item>
              <el-form-item></el-form-item>
            </div>
            <div class="title">其他信息</div>
            <div class="row_4">
              <el-form-item label="银行账号">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="银行账号开户">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item></el-form-item>
              <el-form-item></el-form-item>
            </div>
            <div class="row_4">
              <el-form-item label="i云保code码">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item></el-form-item>
              <el-form-item></el-form-item>
              <el-form-item></el-form-item>
            </div>
            <div class="title">紧急联系人</div>
            <div class="row_4">
              <el-form-item label="姓名">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="手机号码">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="详细地址">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item></el-form-item>
            </div>
            <el-form-item>
              <el-button type="primary">保存/提交</el-button>
              <el-button>返回</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
    export default {
        name: "MarketerListAdd",
        data() {
            return {
                form: {
                    name: '',
                    region: ''
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