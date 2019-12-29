<template>
  <div>
    <main-title :title="title" :title_f="title_f"></main-title>
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
              prop="id"
              label="id"
              width="180">
      </el-table-column>
      <el-table-column
              prop="name"
              label="策略组"
              width="180">
      </el-table-column>
      <el-table-column
              prop="created_at"
              label="创建时间"
              width="180">
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px" v-if="mainshow">
      <el-button @click="upd()">编辑</el-button>
      <el-button @click="del()">删除</el-button>
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
      <!--添加-->
      <el-form v-show="addshow" label-width="100px" class="demo-dynamic">
          <el-form-item label="策略组名称" >
              <el-input v-model="name"></el-input>
          </el-form-item>
          <el-form-item label="策略组权限" >
              <tree-table :data="ruledata" :columns="columns" border @getAuth="getAuth"></tree-table>
          </el-form-item>
          <el-form-item >
              <el-button @click="back1">返回</el-button>
          </el-form-item>
      </el-form>
      <!--编辑-->
      <el-form v-if="updshow" label-width="100px" class="demo-dynamic">
          <el-form-item label="策略组名称" >
              <el-input v-model="updataname"></el-input>
          </el-form-item>
          <el-form-item label="策略组权限" >
              <tree-table :data="updruledata" :columns="columns" border @getAuth="getAuths"></tree-table>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
    import MainTitle from "@/common/MainTitle";
    import treeTable from '@/common/TreeTableAuthor'
    import {ReadPolicyGroup,AddPolicyGroup,OnePolicyGroup,DelPolicyGroup,GetAllRuel,UpdsPolicyGroup} from "@/request/api"
    export default {
        name: "PermissionList",
        data () {
            return {
                //当前页数
                PageIndex:1,
                //每页条数
                PageSize:50,
                //总共条数
                total:1000,
                //编辑时候的数据
                updataname:'',
                updruledata:[],
                updid:-1,
                //===============
                columns: [
                    {
                        text: '菜单列表',
                        value: 'description',
                        width: 200,
                        option: 'sonData1'
                    },
                    {
                        text: '功能权限',
                        value: 'sonData1',
                        option: 'sonData1',
                        act: 'act'
                    }
                ],
                title: '策略组设置',
                title_f: '这是策略组设置页面',
                datas:[],
                onedata:[],
                mainshow:true,
                updshow:false,
                addshow:false,
                currentRow: -1,
                ruledata:[],
                selectrole:[],//选择的权限ID
                name: '',
                checkAll: false,
                checkedCities: [],
                isIndeterminate: true
            }
        },
        methods:{
            //分页
            handleSizeChange(val) {
                this.PageSize=val
                window.console.log(`每页 ${val} 条`);
                this.getdata();
            },
            handleCurrentChange2(val) {
                this.PageIndex=val
                window.console.log(`当前页: ${val}`);
                this.getdata();
            },
            back1(){
                this.addshow=false
                this.mainshow=true
            },
            getAuth (data) {
                let opt = []
                data.forEach(val => {
                    opt.push(val.id)
                    if (val.children) {
                        val.children.forEach(el => {
                            if (el.selectchecked.length) {
                                opt.push(el.id)
                                opt.push(el.selectchecked)
                            }
                        })
                    }
                })
                opt = opt.join().split(',').filter(n => { return n })
                this.selectrole=opt
                //
                if(this.name.length<=1){
                    this.$message('请输入策略组名称');
                    return false
                }
                if(opt.length<=0){
                    this.$message('请输入选择权限');
                    return false
                }
                var that=this;
                var param={
                    'name':this.name,
                    'created_at':new Date(),
                    'Permission':opt
                };
                window.console.log(param)
                AddPolicyGroup(param).then(res=>{
                    window.console.log(res)
                    this.$message(res.Msg);
                    that.datas = res.Data
                    that.addshow=false
                    that.mainshow=true
                })
                window.console.log(opt)
            },
            // 修改
            getAuths (data) {
                let opt = []
                data.forEach(val => {
                    opt.push(val.id)
                    if (val.children) {
                        val.children.forEach(el => {
                            if (el.selectchecked.length) {
                                opt.push(el.id)
                                opt.push(el.selectchecked)
                            }
                        })
                    }
                })
                opt = opt.join().split(',').filter(n => { return n })
                this.selectrole=opt
                //
                if(this.updataname.length<=1){
                    this.$message('请输入策略组名称');
                    return false
                }
                if(opt.length<=0){
                    this.$message('请输入选择权限');
                    return false
                }
                var that=this;
                var param={
                    'id':this.updid,
                    'name':this.updataname,
                    'created_at':new Date(),
                    'Permission':opt
                };
                window.console.log(param)
                UpdsPolicyGroup(param).then(res=>{
                    window.console.log(res)
                    this.$message(res.Msg);
                    that.datas = res.Data
                    that.updshow=false
                    that.mainshow=true
                })
                window.console.log(opt)
            },
          //选中事件
          handleCurrentChange(val){
            window.console.log(val)
            this.currentRow = val.id;

          },
            addbtn(){
              this.mainshow=false
              this.addshow=true
            },
          //添加策略组
          adds (){
            var data=[]
            var that=this;
            AddPolicyGroup(data).then(res=>{
              this.$message(res.Msg);
              that.datas = res.Data
            })
          },
          //单条策略组信息
          upd(){
            var that=this;
            if(that.currentRow === -1){
              that.$message('请选择一行')
              return false
            }

            OnePolicyGroup({id:that.currentRow}).then(res=>{
                that.updataname = res.Data.name
                var ruledata=that.ruledata
                for (let i = 0; i < ruledata.length ; i++) {
                    if(ruledata[i]['children'].length>0){
                        window.console.log('子类')
                        window.console.log( ruledata[i]['children'])
                        for (let j = 0; j < ruledata[i]['children'].length; j++) {
                            window.console.log( ruledata[i]['children'][j]['selectchecked'])
                            ruledata[i]['children'][j]['selectchecked']=res.Data.Permission
                        }
                    }
                }
                window.console.log(ruledata)
                that.updid=res.Data.id
                that.updruledata=ruledata
                that.mainshow=false
                that.addshow=false
                that.updshow=true
            })
          },
          //删除策略组
          del(){
            var that=this;
            if(that.currentRow === -1){
              that.$message('请选择一行')
              return false
            }
            this.currentRow = -1
            DelPolicyGroup({id:that.currentRow}).then(res=>{
              that.$message(res.Msg)
              that.datas=res.Data
            })
          },
            getdata(){
                var that=this;
                ReadPolicyGroup({PageIndex:that.PageIndex,PageSize:that.PageSize}).then(res=>{
                    var data = res.Data
                    that.datas = data.Rows
                    that.total = data.Records
                });

            }
        },
        mounted(){
          var that=this
            GetAllRuel().then(res=>{
                var data=res.Data
                window.console.log('权限列表',res.Data)

                that.ruledata = data

            })
          that.getdata();
        },
        components: {MainTitle,treeTable}
    }
</script>

<style scoped>
.mains{
    float: left;
}
    .chils{
        clear:both;
    }
</style>
