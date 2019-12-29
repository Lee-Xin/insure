<template>
  <div>
    <main-title :title="title" :title_f="title_f"></main-title>
    <page-hr></page-hr>
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
                property="lv_name"
                label="分类级别"
                width="120">
        </el-table-column>
        <el-table-column
                property="name"
                label="分类名称"
                width="120">
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
      <el-form-item label="上级分类" >
        <el-select v-model="lvs" placeholder="请选择">
          <el-option
                  v-for="(item,index) in jigoudata"
                  :key="item.id"
                  :label="item.name"
                  :value="index">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称" >
        <el-input v-model="name"></el-input>
      </el-form-item>

      <el-form-item  >
        <el-button @click="oks">确认</el-button>
        <el-button @click="back1">返回</el-button>
      </el-form-item>
    </el-form>
    <!--修改-->
    <el-form v-if="updshow" label-width="100px" class="demo-dynamic">
      <el-form-item label="上级分类" >
        <el-select v-model="updata.pid" placeholder="请选择">
          <el-option
                  v-for="(item,index) in jigoudata"
                  :key="index"
                  :label="item.name"
                  :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称" >
        <el-input  v-model="updata.name"></el-input>
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
  import {GetLpclass,GetLpdata,Addlipei,Dellipei,Updlipei} from "@/request/api"
  export default {
    name: "ClassificationOfKnowledge",
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
        title: '理赔分类',
        title_f: '理赔分类',
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
        updata:[],
        //添加
        lvs:'',
        name:''
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
        window.console.log(val)
      },
      add:function(){
        this.addshow=true
        this.mainshow=false
      },
      oks1:function(){
        var that=this
        window.console.log(that.updata)
        Updlipei(that.updata).then(res=>{
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
        window.console.log(that.lvs)
        Addlipei({name:that.name,pid:that.jigoudata[that.lvs]['id']}).then(res=>{
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
        Dellipei({id:this.currentRow}).then(res=>{
          that.$message(res.Msg);
          that.accountdata=res.Data
        })
      },
      getstaff(){
        var that=this
        GetLpdata({PageIndex:that.PageIndex,PageSize:that.PageSize}).then(res=>{
          var data=res.Data
          that.accountdata = data.Rows
          that.total = data.Records
        })
      }
    },
    mounted(){
      var that=this
      GetLpclass().then(res=>{
        var data=res.Data
        window.console.log(res)
        that.jigoudata = data
      })
      that.getstaff()

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
