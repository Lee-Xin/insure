<template>
  <div>
    <main-title :title="title" :title_f="title_f"></main-title>
    <page-hr></page-hr>
    <div class="content_box" v-show="mainshow">
      <span class="content_title_1">快速搜索</span>
      <el-row :gutter="20">
        <el-col :span="3">
          <el-input v-model="uname" placeholder="出险人姓名"></el-input>
        </el-col>
        <el-col :span="2"> <el-input v-model="udanhao" placeholder="保险单号"></el-input></el-col>
        <el-col :span="2"> <el-input v-model="yewuyuan" placeholder="业务员姓名"></el-input></el-col>
        <el-col :span="3">
          <el-date-picker
                  v-model="searchdate"
                  type="date"
                  placeholder="选择出险日期">
          </el-date-picker>
        </el-col>
        <el-col :span="3">
          <el-select v-model="statuss" placeholder="请选择结案情况">
            <el-option
                    v-for="item in zhuangtai"
                    :key="item"
                    :label="item"
                    :value="item">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-button @click="search()">搜索</el-button>
        </el-col>
      </el-row>
      <el-table
              :data="datas"
              stripe
              highlight-current-row
              @current-change="handleCurrentChange"
              style="width: 100%">
        <el-table-column
                prop="policy_number"
                label="保单号"
                width="180">
        </el-table-column>
        <el-table-column
                prop="insurance_name"
                label="险种名称"
                width="180">
        </el-table-column>
        <el-table-column
                prop="mechanism"
                label="机构名称">
        </el-table-column>
        <el-table-column
                prop="salesman"
                label="业务员姓名">
        </el-table-column>
        <el-table-column
                prop="insurance_company"
                label="保险公司">
        </el-table-column>
        <el-table-column
                prop="payment_period"
                label="缴费年限">
        </el-table-column>
        <el-table-column
                prop="insurance_amount"
                label="保额">
        </el-table-column>
        <el-table-column
                prop="risk_taker"
                label="出险人姓名">
        </el-table-column>
        <el-table-column
                prop="idcard"
                label="身份证号">
        </el-table-column>
        <el-table-column
                prop="risk_date"
                label="出险日期">
        </el-table-column>
        <el-table-column
                prop="risk_cause"
                label="出险原因">
        </el-table-column>
        <el-table-column
                prop="send_time"
                label="寄出时间">
        </el-table-column>
        <el-table-column
                prop="send_order_number"
                label="寄出单号">
        </el-table-column>
        <el-table-column
                prop="closing_case"
                label="结案情况">
        </el-table-column>
        <el-table-column
                prop="closing_time"
                label="结案时间">
        </el-table-column>
        <el-table-column
                prop="claim_amount"
                label="理赔金额">
        </el-table-column>
        <el-table-column
                prop="remark"
                label="备注">
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="upd()">修改</el-button>
        <el-button @click="del()">删除</el-button>
        <el-button @click="add()">添加</el-button>
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

    <div v-show="addshow">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="保单号">
          <el-input v-model="form.policy_number"></el-input>
        </el-form-item>
        <el-form-item label="险种名称">
          <el-input v-model="form.insurance_name"></el-input>
        </el-form-item>
        <el-form-item label="机构名称">
          <el-input v-model="form.mechanism"></el-input>
        </el-form-item>
        <el-form-item label="业务员姓名">
          <el-input v-model="form.salesman"></el-input>
        </el-form-item>
        <el-form-item label="保险公司">
          <el-select v-model="form.insurance_company" placeholder="请选择保险公司">
            <el-option
                    v-for="(item,index) in gongsi"
                    :key="index"
                    :label="item.name"
                    :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="缴费年限">
          <el-input  v-model="form.payment_period"></el-input>
        </el-form-item>
        <el-form-item label="保额">
          <el-input  v-model="form.insurance_amount"></el-input>
        </el-form-item>
        <el-form-item label="出险人姓名">
          <el-input  v-model="form.risk_taker"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码">
          <el-input  v-model="form.idcard"></el-input>
        </el-form-item>
        <el-form-item label="出险日期">
          <el-input  v-model="form.risk_date"></el-input>
        </el-form-item>
        <el-form-item label="出险原因">
          <el-input  v-model="form.risk_cause"></el-input>
        </el-form-item>
        <el-form-item label="寄出时间">
          <el-input  v-model="form.send_time"></el-input>
        </el-form-item>
        <el-form-item label="寄出单号">
          <el-input  v-model="form.send_order_number"></el-input>
        </el-form-item>
        <el-form-item label="结案情况">
          <el-input  v-model="form.closing_case"></el-input>
        </el-form-item>
        <el-form-item label="结案时间">
          <el-input  v-model="form.closing_time"></el-input>
        </el-form-item>
        <el-form-item label="理赔金额（元）">
          <el-input  v-model="form.claim_amount"></el-input>
        </el-form-item>
        <el-form-item label="影视资料">
          <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="form.movie_info"
                  list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认添加</el-button>
          <el-button @click="back">取消</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--修改-->
    <div v-show="updshow">
      <el-form ref="form" :model="updata" label-width="80px">
        <el-form-item label="保单号">
          <el-input v-model="updata.policy_number"></el-input>
        </el-form-item>
        <el-form-item label="险种名称">
          <el-input v-model="updata.insurance_name"></el-input>
        </el-form-item>
        <el-form-item label="机构名称">
          <el-input v-model="updata.mechanism"></el-input>
        </el-form-item>
        <el-form-item label="业务员姓名">
          <el-input v-model="updata.salesman"></el-input>
        </el-form-item>
        <el-form-item label="保险公司">
          <el-select v-model="updata.insurance_company" placeholder="请选择保险公司">
            <el-option
                    v-for="(item,index) in gongsi"
                    :key="index"
                    :label="item.name"
                    :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="缴费年限">
          <el-input  v-model="updata.payment_period"></el-input>
        </el-form-item>
        <el-form-item label="保额">
          <el-input  v-model="updata.insurance_amount"></el-input>
        </el-form-item>
        <el-form-item label="出险人姓名">
          <el-input  v-model="updata.risk_taker"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码">
          <el-input  v-model="updata.idcard"></el-input>
        </el-form-item>
        <el-form-item label="出险日期">
          <el-input  v-model="updata.risk_date"></el-input>
        </el-form-item>
        <el-form-item label="出险原因">
          <el-input  v-model="updata.risk_cause"></el-input>
        </el-form-item>
        <el-form-item label="寄出时间">
          <el-input  v-model="updata.send_time"></el-input>
        </el-form-item>
        <el-form-item label="寄出单号">
          <el-input  v-model="updata.send_order_number"></el-input>
        </el-form-item>
        <el-form-item label="结案情况">
          <el-input  v-model="updata.closing_case"></el-input>
        </el-form-item>
        <el-form-item label="结案时间">
          <el-input  v-model="updata.closing_time"></el-input>
        </el-form-item>
        <el-form-item label="理赔金额（元）">
          <el-input  v-model="updata.claim_amount"></el-input>
        </el-form-item>
        <el-form-item label="影视资料">
          <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="updata.remark"
                  list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="updata.remark"></el-input>
        </el-form-item>
        <el-form-item  >
          <el-button @click="oks">确认</el-button>
          <el-button @click="back1">返回</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
    import MainTitle from "@/common/MainTitle";
    import PageHr from "@/common/PageHr";
    import {lipeilist,addlipeidata,updlipeidata,dellipeidata,baoxiangongsi} from "@/request/api"
    export default {
        name: "ClaimsList",
        data () {
            return {
              currentRow: -1,
              gongsi:[],
              mainshow:true,
              addshow:false,
              updshow:false,
              PageIndex:1,
              //每页条数
              PageSize:50,
              //总共条数
              total:1000,
              zhuangtai:['全部','是','否','未知'],
              uname:'',//出险人姓名
              searchdate:'',//出险日期
              udanhao:'',//保险单号
              yewuyuan:'',//业务员姓名
              statuss:'',//结案情况
                title: '理赔列表',
                title_f: '理赔列表页面',
              datas:[],
              updata:[],
              //添加表单
              form:{
                mechanism:'',
                salesman:'',
                insurance_company:'',
                policy_number:'',
                insurance_name:'',
                payment_period:'',
                insurance_amount:'',
                risk_taker:'',
                idcard:'',
                risk_date:'',
                risk_cause:'',
                send_time:'',
                send_order_number:'',
                closing_case:'',
                closing_time:'',
                claim_amount:'',
                remark:'',
                movie_info:'',
              }
            }
        },
      methods:{
        handleSizeChange(val) {
          this.PageSize=val
          window.console.log(`每页 ${val} 条`);
          this.getdata();
        },
        handleRemove(file, fileList) {
          window.console.log(file, fileList);
        },
        handlePreview(file) {
          window.console.log(file);
        },
        handleCurrentChange2(val) {
          this.PageIndex=val
          window.console.log(`当前页: ${val}`);
          this.getdata();
        },
        search:function(){
          this.$message('搜索中');
          this.getdata();
        },
          back(){
            this.addshow=false
            this.mainshow=true
          },
          back1(){
            this.updshow=false
            this.mainshow=true
          },
        onSubmit(){
            var that=this
            window.console.log(that.form)
            addlipeidata(that.form).then(res=>{
              that.datas=res.Data
            })
        },
        oks(){
          var that=this
          updlipeidata(that.updata).then(res=>{
            that.$message(res.Msg);
            that.datas=res.Data
          })
        },
        handleCurrentChange(val) {
          this.currentRow = val.id;
          this.updata=val
        },
        add:function(){
          this.mainshow=false
          this.addshow=true
        },
        upd:function () {
          if(this.currentRow == -1){
            this.$message('请选择一行');
            return false
          }
          var that=this
          that.updshow=true
          that.mainshow=false
        },
        del:function () {
          var that=this
          if(this.currentRow == -1){
            this.$message('请选择一行');
            return false
          }
          dellipeidata({id:this.currentRow}).then(res=>{
            that.$message(res.Msg);
            that.datas=res.Data
          })
        },
        getdata(){
            var that=this
            lipeilist({PageIndex:that.PageIndex,PageSize:that.PageSize,uname:that.uname,searchdate:that.searchdate,udanhao:that.udanhao,yewuyuan:that.yewuyuan,statuss:that.statuss}).then(res=>{
              that.datas=res.Data.Rows
              that.total=res.Data.Records
            })
        }
      },
      mounted(){
          var that=this
          baoxiangongsi().then(res=>{
            window.console.log(res)
              that.gongsi=res.Data
          })
          that.getdata();
      },
        components: {PageHr, MainTitle}
    }
</script>

<style scoped>

</style>
