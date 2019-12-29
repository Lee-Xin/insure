<template>
  <div>
    <main-title :title="title" :title_f="title_f"></main-title>
    <page-hr></page-hr>
    <!--搜索-->
    <div class="content_box">
      <span class="content_title_1">快速搜索</span>
      <el-form label-width="100px" class="demo-dynamic">
        <el-form-item label="分支机构" >
          <el-select v-model="names" placeholder="请选择">
            <el-option
                    v-for="item in jigoudata"
                    :key="item"
                    :label="item"
                    :value="item">
            </el-option>
          </el-select>
          <el-button @click="search()">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div v-show="mainshow">
      <el-table
              ref="singleTable"
              :data="accountdata"
              highlight-current-row
              @current-change="handleCurrentChange"
              style="width: 100%" >
        <el-table-column
                type="index"
                width="50">
        </el-table-column>
        <el-table-column
                property="name"
                label="机构名称"
                width="120">
        </el-table-column>
        <el-table-column
                property="account"
                label="账号"
                width="120">
        </el-table-column>
        <el-table-column
                property="role.name"
                label="策略组">
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
    <!--添加-->
    <el-form v-show="addshow" label-width="100px" class="demo-dynamic">
      <el-form-item label="分支机构" >
        <el-select v-model="names" placeholder="请选择">
          <el-option
                  v-for="item in jigoudata"
                  :key="item"
                  :label="item"
                  :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账号" >
        <el-input v-model="accounts"></el-input>
      </el-form-item>
      <el-form-item label="密码" >
        <el-input type="password" v-model="pwd1"></el-input>
      </el-form-item>
      <el-form-item label="重复密码" >
        <el-input type="password" v-model="pwd2"></el-input>
      </el-form-item>
      <el-form-item label="选择策略组" >
        <el-select v-model="roles" placeholder="请选择">
          <el-option
                  v-for="(item,index) in celuezu"
                  :key="index"
                  :label="item.name"
                  :value="index">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item  >
        <el-button @click="oks">确认</el-button>
        <el-button @click="back1">返回</el-button>
      </el-form-item>
    </el-form>
    <!--修改-->
    <el-form v-if="updshow" label-width="100px" class="demo-dynamic">
      <el-form-item label="分支机构" >
        <el-select v-model="updata.name" placeholder="请选择">
          <el-option
                  v-for="item in jigoudata"
                  :key="item"
                  :label="item"
                  :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账号" >
        <el-input  v-model="updata.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" >
        <el-input type="password" v-model="updata.pwd"></el-input>
      </el-form-item>
      <el-form-item label="重复密码" >
        <el-input type="password" v-model="updata.pwd2"></el-input>
      </el-form-item>
      <el-form-item label="选择策略组" >
        <el-select v-model="updata.role.index" placeholder="请选择">
          <el-option
                  v-for="(item,index) in celuezu"
                  :key="index"
                  :label="item.name"
                  :value="index">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item  >
        <el-button @click="oks1">确认</el-button>
        <el-button @click="back2">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
    import MainTitle from "@/common/MainTitle";
    import PageHr from "@/common/PageHr";
    import {GetAllmechanism,GetAllmechanismAccount,ReadPolicyGroup,AddMechanismAccount,DelMechanismAccount,UpdMechanismAccount} from "@/request/api"
    export default {
        name: "InstitutionalAccount",
        data () {
            return {
              //当前页数
              PageIndex:1,
              //每页条数
              PageSize:50,
              //总共条数
              total:1000,
                mainshow:true,
              addshow:false,
              updshow:false,
                title: '机构账号',
                title_f: '欢迎使用机构账号列表页面',
                jigoudata:[],//机构列表
              accountdata:[],//机构账号
                currentRow: -1,
                celuezu:[],//策略组列表,

              roles:'',//选择的策略组
              accounts:'',//策略组账号
              names:'',//选择的机构
              pwd1:'',//密码1
              pwd2:'',//密码2
              //修改数据
              updata:[]
            }
        },
        methods:{
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
          search:function(){
            this.$message('搜索中');
            this.getstaff()
          },
          back1:function(){
            this.addshow=false
            this.mainshow=true
          },
          back2:function(){
            this.updshow=false
            this.mainshow=true
          },
          handleCurrentChange(val) {
            this.currentRow = val.id;
            this.updata=val
          },
          add:function(){
            this.addshow=true
            this.mainshow=false
          },
          oks1:function(){
            var that=this
            window.console.log(that.updata)
            UpdMechanismAccount(that.updata).then(res=>{
              window.console.log(res)
              that.currentRow=''
              this.$message(res.Msg);
              that.accountdata=res.Data
              that.updshow=false
              that.mainshow=true
            })
          },
          oks:function () {
            var that=this;
            if(that.roles.length<=0){
              this.$message('请选择策略组');
              return false
            }
            if(that.accounts.length<=0){
              this.$message('请输入账号');
              return false
            }
            if(that.names.length<=0){
              this.$message('请选择机构');
              return false
            }
            if(that.pwd1 !== that.pwd2){
              this.$message('密码不一致');
              return false
            }
            AddMechanismAccount({name:that.names,account:that.accounts,role:that.celuezu[that.roles],created_at:new Date()}).then(res=>{
              this.$message(res.Msg);
              that.accountdata=res.Data
              that.addshow=false
              that.mainshow=true
            })
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
            DelMechanismAccount({id:this.currentRow}).then(res=>{
              that.$message(res.Msg);
              that.accountdata=res.Data
            })
          },
          getstaff(){
            var that=this
            GetAllmechanismAccount({PageSize:that.PageSize,PageIndex:that.PageIndex,key:that.names}).then(res=>{
              var data=res.Data
              window.console.log('机构账号列表',res.Data)

              that.accountdata = data.Rows
              that.total = data.Records
            })
          }
        },
        mounted(){
          var that=this
          GetAllmechanism().then(res=>{
            var data=res.Data
            window.console.log('机构列表',res.Data)
            that.jigoudata = data
          })
          that.getstaff()
          ReadPolicyGroup().then(res=>{
            var data=res.Data.Rows
            window.console.log('策略组列表',res.Data)
            that.celuezu = data
          })

        },
        components: {PageHr, MainTitle}
    }
</script>

<style scoped>
  .content_box{
    width: 100%;
    height: auto;
    padding-left: 16px;
    box-sizing: border-box;
  }
  .content_title_1{
    width: 100%;
    height: 18px;
    display: block;
    line-height: 18px;
    font-size: 18px;
    color: #ef8412;
    text-align: left;
    margin-bottom: 20px;
  }
</style>
