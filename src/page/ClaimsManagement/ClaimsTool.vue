<template>
  <div>
    <main-title :title="title" :title_f="title_f"></main-title>
    <page-hr></page-hr>
    <div v-if="mainshow">
      <el-table
              :data="datas"
              highlight-current-row
              @current-change="handleCurrentChange"
              style="width: 100%" v-show="mainshow">
        <el-table-column
                type="index"
                width="50">
        </el-table-column>
        <el-table-column
                prop="name"
                label="公司名称"
                width="180">
        </el-table-column>
        <el-table-column
                prop="description"
                label="说明"
                width="180">
        </el-table-column>
        <el-table-column
                prop="mobile"
                label="联系电话"
                width="180">
        </el-table-column>

      </el-table>
      <div style="margin-top: 20px" >
        <el-button @click="addbtn()">添加</el-button>
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
    <div v-if="addshow">
      <el-form label-width="100px" class="demo-dynamic">
        <el-form-item label="选择公司" >
          <el-checkbox-group v-model="selectgongsi">
            <el-checkbox v-for="(item,index) in gongsi" :key="index" :label="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item  >
          <el-button @click="oks1">确认</el-button>
          <el-button @click="back2">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
    import MainTitle from "@/common/MainTitle";
    import PageHr from "@/common/PageHr";
    import {lipeigongsi,bindgongsi,getlipeigongsidata} from "@/request/api"
    export default {
        name: "ClaimsTool",
        data () {
            return {
                title: '理赔工具',
                title_f: '理赔工具页面',
              //当前页数
              PageIndex:1,
              //每页条数
              PageSize:50,
              //总共条数
              total:1000,
              datas:[],
              mainshow:true,
              updshow:false,
              addshow:false,
              currentRow: -1,
              //理赔公司列表
              gongsi:[],
              //选择的公司列表
              selectgongsi:[]
            }
        },
      methods:{
        back2:function(){
          this.updshow=false
          this.mainshow=true
        },
        addbtn(){
          this.mainshow=false
          this.addshow=true
        },
        //分页
        handleSizeChange(val) {
          this.PageSize=val
          window.console.log(`每页 ${val} 条`);
          this.getdata();
        },
        oks1:function(){
          var that=this
          window.console.log(that.selectgongsi)
          bindgongsi({gs:that.selectgongsi}).then(res=>{
            window.console.log(res)
            that.currentRow='-1'
            this.$message(res.Msg);
            that.data=res.Data
            that.addshow=false
            that.mainshow=true
          })
        },
        handleCurrentChange(val){
          window.console.log(val)
          this.currentRow = val;

        },
        handleCurrentChange2(val) {
          this.PageIndex=val
          window.console.log(`当前页: ${val}`);
          this.getdata();
        },
        getdata(){
          var that=this;
          getlipeigongsidata({PageIndex:that.PageIndex,PageSize:that.PageSize}).then(res=>{
            var data = res.Data
            that.datas = data.Rows
            that.total = data.Records
          });
        }
      },
      mounted(){
        var that=this
        that.getdata();
        lipeigongsi().then(res=>{
          window.console.log(res)
          that.gongsi=res.Data
        })
      },
        components: {PageHr, MainTitle}
    }
</script>

<style scoped>

</style>
