<template>
  <div>
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="基本信息" prop="delivery"></el-form-item>
      <div class="row_4">
        <el-form-item label="机构代码" prop="name">
          <el-input v-model="ruleForm.code" placeholder="请输入机构代码"></el-input>
        </el-form-item>
        <el-form-item label="机构名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入机构名称"></el-input>
        </el-form-item>
        <el-form-item label="机构简称" prop="name">
          <el-input v-model="ruleForm.abbreviation" placeholder="请输入机构简称"></el-input>
        </el-form-item>
        <el-form-item label="设立时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="请选择设立时间" v-model="ruleForm.set_up_time"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
      </div>
      <div class="row_4">
        <el-form-item label="联系电话" prop="name">
          <el-input v-model="ruleForm.mobile" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="name">
          <el-input v-model="ruleForm.principal" placeholder="请输入负责人"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="name">
          <el-select v-model="ruleForm.role" placeholder="请选择角色">
            <el-option label="合作" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机构类型" prop="name">
          <el-select v-model="ruleForm.organization_type" placeholder="请选择机构类型">
            <el-option label="总公司" value="shanghai"></el-option>
            <el-option label="分公司" value="shanghai"></el-option>
            <el-option label="营业部" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="row_4">
        <el-form-item label="所属机构" prop="name">
          <el-select v-model="ruleForm.affiliation" placeholder="公司直辖">
            <el-option label="公司直辖" value="shanghai"></el-option>
            <el-option label="重庆众鼎保险代理有限公司" value="shanghai"></el-option>
            <el-option label="重庆众鼎保险代理有限公司渝北区第三营业部" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="持证状态" prop="name">
          <el-select v-model="ruleForm.licensed_status" placeholder="请选择持证状态">
            <el-option label="有证" value="shanghai"></el-option>
            <el-option label="备案" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否考核" prop="name">
          <el-select v-model="ruleForm.assessment" placeholder="是">
            <el-option label="是" value="shanghai"></el-option>
            <el-option label="否" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-form-item label="其他信息" prop="delivery"></el-form-item>

      <div class="row_3">
        <el-form-item label="注册地" prop="name">
          <el-input v-model="ruleForm.address" placeholder="请输入注册地"></el-input>
        </el-form-item>
        <el-form-item label="所属地区" prop="name">
          <el-select v-model="ruleForm.isarea" placeholder="请输入所属地区">
            <el-option label="是" value="shanghai"></el-option>
            <el-option label="否" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮政编码" prop="name">
          <el-input v-model="ruleForm.postcode" placeholder="请输入邮政编码"></el-input>
        </el-form-item>
      </div>
      <div class="row_3">
        <el-form-item label="状态" prop="name">
          <el-select v-model="ruleForm.status" placeholder="营业">
            <el-option label="营业" value="shanghai"></el-option>
            <el-option label="停业" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="在APP展示" prop="name">
          <el-input v-model="ruleForm.appshow" placeholder="请输入邮政编码"></el-input>
        </el-form-item>
        <el-form-item label="" prop="name"></el-form-item>
      </div>
      <div class="row_2">
        <el-form-item label="地址" prop="name">
          <el-input v-model="ruleForm.naddress" placeholder="请输入地址"></el-input>
          <el-amap-search-box class="search-box"  :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
        </el-form-item>
        <el-form-item label="经纬度" prop="name">
          <el-input v-model="ruleForm.lnglat" placeholder="经纬度自动展示"></el-input>
        </el-form-item>
      </div>
      <div class="row_2">
        <el-form-item >
          <el-amap ref="map" vid="amapDemo"  :center="center"  :zoom="12" :plugin="plugin" :events="events" class="amap-demo">
            <el-amap-marker v-for="(marker,key) in markers" :key="key" :position="marker" ></el-amap-marker>
          </el-amap>
        </el-form-item>
      </div>
      <div class="row_2">
        <el-form-item label="备注信息" prop="name">
          <el-input v-model="ruleForm.remark" placeholder="请填写备注信息"></el-input>
        </el-form-item>
        <el-form-item label="作息时间" prop="name">
          <el-input v-model="ruleForm.zuoxi" placeholder="请填写作息时间"></el-input>
        </el-form-item>
      </div>

      <el-form-item>
        <el-button type="primary" @click="submitForm()">保存/提交</el-button>
        <el-button @click="returnPrev">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {addjigoulist} from '@/request/api'
  import VueAMap from 'vue-amap';
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
        name: "NewOrganization",
        methods: {
            returnPrev () {
                this.$emit('changeList');
            },
            onSearchResult(pois) {
              window.console.log(pois)
              let latSum = 0;
              let lngSum = 0;
              this.ruleForm.naddress=pois[0].name
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
            submitForm(){
              addjigoulist(this.ruleForm).then(res=>{
                this.$message(res.Msg)
              })
            }
        },
        mounted(){

        },
        data() {
            return {
              amapManager:amapManager,
              zoom:12,
              markers:[],
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
                  this.ruleForm.lnglat=e.lnglat.lng+","+e.lnglat.lat
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
                isClear: false,
                detail: "",
                ruleForm: {
                  code: '机构代码1',
                  name:'名称1',
                  abbreviation:'简称1',
                  set_up_time:'设立时间',
                  mobile:"联系电话",
                  principal:'负责人',
                  role:'角色-合作',
                  organization_type:'机构类型',
                  affiliation:'所属机构',
                  licensed_status:'持证状态',
                  assessment:'否',
                  address:'注册地',
                  isarea:'所属地区-否',
                  postcode:"123456",
                  status:'营业',
                  appshow:'',
                  naddress:'地址',
                  lnglat:''
                }
                // setTime: new Date()
            };
        }
    }
</script>

<style scoped>
  .row_2 {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    /*background-color: red;*/
  }

  .row_2 .el-form-item {
    width: 50%;
  }
  .amap-demo {
    height: 300px;
    font-size: 26px;
  }
  .row_3 {
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }

  .row_3 .el-form-item {
    width: 33.33%;
  }

  .row_4 {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .row_4 .el-form-item {
    width: 25%;
  }

  .el-form-item__content .el-select {
    width: 100%;
  }

  .el-form-item__content .el-col {
    width: 100%;
  }

  .el-form-item__content .el-button {
    width: 100%;
    border: 1px solid #999;
  }

  .el-form-item__content .el-col .el-form-item {
    width: 100%;
  }
</style>
