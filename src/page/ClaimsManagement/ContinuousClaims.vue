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
              prop="name"
              label="机构名称"
              width="180">
      </el-table-column>
      <el-table-column
              prop="user"
              label="联系人"
              width="180">
      </el-table-column>
      <el-table-column
              prop="mobile"
              label="联系电话"
              width="180">
      </el-table-column>
      <el-table-column
              prop="address"
              label="地址"
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
      <el-form-item label="机构名称" >
        <el-input v-model="names"></el-input>
      </el-form-item>
      <el-form-item label="联系人" >
        <el-input v-model="user"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" >
        <el-input v-model="mobile"></el-input>
      </el-form-item>
      <el-form-item label="地址" >
        <!--<el-input v-model="address"></el-input>-->
        <el-amap-search-box class="search-box"  :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
      </el-form-item>
      <el-form-item label="经纬度" >
        <el-input v-model="lnglat"></el-input>
      </el-form-item>
      <el-form-item >


        <el-amap ref="map" vid="amapDemo"  :center="center"  :zoom="12" :plugin="plugin" :events="events" class="amap-demo">
          <el-amap-marker v-for="(marker,key) in markers" :key="key" :position="marker" ></el-amap-marker>
        </el-amap>

      </el-form-item>
      <el-form-item  >
        <el-button @click="oks">确认</el-button>
        <el-button @click="back1">返回</el-button>
      </el-form-item>
    </el-form>
    <!--编辑-->
    <el-form v-if="updshow" label-width="100px" class="demo-dynamic">

      <el-form-item label="机构名称" >
        <el-input v-model="upddata.name"></el-input>
      </el-form-item>
      <el-form-item label="联系人" >
        <el-input v-model="upddata.user"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" >
        <el-input v-model="upddata.mobile"></el-input>
      </el-form-item>
      <el-form-item label="地址" >
        <!--<el-input v-model="upddata.address"></el-input>-->
        <el-amap-search-box class="search-box"  :search-option="searchOption" :on-search-result="onSearchResults"></el-amap-search-box>
      </el-form-item>
      <el-form-item label="经纬度" >
        <el-input v-model="upddata.lnglat"></el-input>
      </el-form-item>
      <el-form-item >

        <el-amap ref="map" vid="amapDemo"  :center="center"  :zoom="12" :plugin="plugin" :events="eventss" class="amap-demo">
          <el-amap-marker v-for="(marker,key) in markers" :key="key" :position="marker" ></el-amap-marker>
        </el-amap>
      </el-form-item>
      <el-form-item  >
        <el-button @click="oks1">确认</el-button>
        <el-button @click="back2">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import VueAMap from 'vue-amap';
  import MainTitle from "@/common/MainTitle";
  import {lxlipei,addlianxulipei,updlianxulipei,dellianxulipei} from "@/request/api"
  import Vue from 'vue';
  Vue.use(VueAMap);
  VueAMap.initAMapApiLoader({
    key: '5db10bb7ce525d18f79b2df704f885d8',
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
    // 默认高德 sdk 版本为 1.4.4
    v: '1.4.4'
  });
  let amapManager = new VueAMap.AMapManager();
  export default {
    name: "continuous_claims",
    data () {
      return {
        amapManager:amapManager,
        zoom:12,
        searchOption: {
          city: '',
          citylimit: true
        },
        center: [121.59996, 31.197646],
        events: {
          init: (o) => {
            window.console.log(o.getCenter())
            window.console.log(this.$refs.map.$$getInstance())
            o.getCity(result => {
              window.console.log('======',result)
            })
          },
          'moveend': (e) => {
            window.console.log('===',e)
          },
          'zoomchange': (e) => {
            window.console.log('+++',e)
          },
          'click': (e) => {
            this.lnglat=e.lnglat.lng+","+e.lnglat.lat
            window.console.log(e.lnglat.lng,e.lnglat.lat)
          }
        },
        eventss: {
          init: (o) => {
            window.console.log(o.getCenter())
            window.console.log(this.$refs.map.$$getInstance())
            o.getCity(result => {
              window.console.log(result)
            })
          },
          'moveend': () => {
          },
          'zoomchange': () => {
          },
          'click': (e) => {
            this.upddata.lnglat=e.lnglat.lng+","+e.lnglat.lat
            window.console.log(e.lnglat.lng,e.lnglat.lat)
          }
        },
        plugin: ['ToolBar', {
          pName: 'MapType',
          defaultType: 0,
          events: {
            init(o) {
              window.console.log('samdionsa',o);
            }
          }
        }],
        //当前页数
        PageIndex:1,
        //每页条数
        PageSize:50,
        //总共条数
        total:1000,

        title: '连续理赔',
        title_f: '连续理赔',
        datas:[],
        onedata:[],
        mainshow:true,
        updshow:false,
        addshow:false,
        currentRow: -1,
        //添加字段
        names:'',
        user:'',
        mobile:'',
        address:'',
        lnglat:'',
        //编辑数据
        upddata:[],
        markers:[]
      }
    },
    methods:{
      onSearchResult(pois) {
        window.console.log(pois)
        let latSum = 0;
        let lngSum = 0;
        this.address=pois[0].name
        if (pois.length > 0) {
          pois.forEach(poi => {
            let {lng, lat} = poi;
            lngSum += lng;
            latSum += lat;
            this.markers.push([poi.lng, poi.lat]);
          });
          let center = {
            lng: lngSum / pois.length,
            lat: latSum / pois.length
          };
          this.center = [center.lng, center.lat];
        }
      },
      onSearchResults(pois) {
        window.console.log(pois)
        let latSum = 0;
        let lngSum = 0;
        this.upddata.address=pois[0].name
        if (pois.length > 0) {
          pois.forEach(poi => {
            let {lng, lat} = poi;
            lngSum += lng;
            latSum += lat;
            this.markers.push([poi.lng, poi.lat]);
          });
          let center = {
            lng: lngSum / pois.length,
            lat: latSum / pois.length
          };
          this.center = [center.lng, center.lat];
        }
      },
      getaddress(){
        var that=this
        window.console.log(that.address)

      },
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
      //选中事件
      handleCurrentChange(val){
        window.console.log(val)
        this.currentRow = val;

      },
      addbtn(){
        this.mainshow=false
        this.addshow=true
      },
      back2:function(){
        this.updshow=false
        this.mainshow=true
      },
      //编辑
      upd(){
        var that=this;
        if(that.currentRow === -1){
          that.$message('请选择一行')
          return false
        }
        that.upddata=that.currentRow
        that.mainshow=false
        that.addshow=false
        that.updshow=true
      },
      //编辑确认
      oks1:function(){
        var that=this
        window.console.log(that.upddata)
        updlianxulipei(that.upddata).then(res=>{
          window.console.log(res)
          that.currentRow='-1'
          this.$message(res.Msg);
          that.data=res.Data
          that.updshow=false
          that.mainshow=true
        })
      },
      oks:function () {
        var that=this;
        if(that.names.length<=0){
          this.$message('请输入名称');
          return false
        }
        if(that.user.length<=0){
          this.$message('请输入联系人');
          return false
        }
        if(that.address.length<=0){
          this.$message('请输入地址');
          return false
        }
        if(that.lnglat.length<=0){
          this.$message('请选择地址');
          return false
        }
        var datas={name:that.names,user:that.user,mobile:that.mobile,address:that.address,lnglat:that.lnglat};
        window.console.log(datas)
        addlianxulipei(datas).then(res=>{
          this.$message(res.Msg);
          that.datas = res.Data
          that.addshow=false
          that.mainshow=true
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
        dellianxulipei({id:that.currentRow.id}).then(res=>{
          that.$message(res.Msg)
          that.datas=res.Data
        })
      },
      getdata(){
        var that=this;
        lxlipei({PageIndex:that.PageIndex,PageSize:that.PageSize}).then(res=>{
          var data = res.Data
          that.datas = data.Rows
          that.total = data.Records
        });

      }
    },
    mounted(){
      var that=this
      that.getdata();
    },
    components: {MainTitle}
  }
</script>

<style scoped>
  .mains{
    float: left;
  }
  .chils{
    clear:both;
  }
  .amap-demo {
    height: 300px;
  }
</style>
