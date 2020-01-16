<template>
    <div class="wrapper">
        <page-hr></page-hr>
        <div class="form-area">
            <div class="section">基本信息</div>
            <el-row :gutter="20">
                <el-col v-for="(item, index) in forms" :key="index" :span="item.span || 6">
                    <form-item
                        :type="item.type"
                        :label="item.label"
                        :options="item.options"
                        v-model="item.value"
                        :definedSlot="item.definedSlot"
                        :required="item.required"
                        :placeholder="item.placeholder"
                        :errorText="item.errorText || ''"
                    >
                    </form-item>
                </el-col>
            </el-row>
        </div>
        <div class="form-area">
            <div class="section">其他信息</div>
            <el-row :gutter="20">
                <el-col v-for="(item, index) in otherForms" :key="index" :span="item.span || 6">
                    <form-item
                        :type="item.type"
                        :label="item.label"
                        :options="item.options"
                        v-model="item.value"
                        :definedSlot="item.definedSlot"
                        :required="item.required"
                        :placeholder="item.placeholder"
                        :errorText="item.errorText || ''"
                    >
                    </form-item>
                </el-col>
            </el-row>
        </div>
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
                    <el-amap-search-box class="search-box" :search-option="searchOption"
                                        :on-search-result="onSearchResult"></el-amap-search-box>
                </el-form-item>
                <el-form-item label="经纬度" prop="name">
                    <el-input v-model="ruleForm.lnglat" placeholder="经纬度自动展示"></el-input>
                </el-form-item>
            </div>
            <div class="row_2">
                <el-form-item>
                    <el-amap ref="map" vid="amapDemo" :center="center" :zoom="12" :plugin="plugin" :events="events"
                             class="amap-demo">
                        <el-amap-marker v-for="(marker,key) in markers" :key="key" :position="marker"></el-amap-marker>
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
    import PageHr from "@/common/PageHr";
    import FormItem from '@/common/FormItem';
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
        components: {PageHr, FormItem},
        data() {
            return {
                amapManager: amapManager,
                zoom: 12,
                markers: [],
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
                            window.console.log('======', result)
                        })
                    },
                    'moveend': (e) => {
                        window.console.log('===', e)
                    },
                    'zoomchange': (e) => {
                        window.console.log('+++', e)
                    },
                    'click': (e) => {
                        this.ruleForm.lnglat = e.lnglat.lng + "," + e.lnglat.lat
                        window.console.log(e.lnglat.lng, e.lnglat.lat)
                    }
                },

                plugin: ['ToolBar', {
                    pName: 'MapType',
                    defaultType: 0,
                    events: {
                        init(o) {
                            window.console.log('samdionsa', o);
                        }
                    }
                }],
                isClear: false,
                detail: "",
                forms: {
                    code: {
                        label: '机构代码',
                        type: 'input',
                        value: '',
                        placeholder: '请输入机构代码'
                    },
                    name: {
                        label: '机构名称',
                        type: 'input',
                        value: '',
                        placeholder: '请输入机构名称',
                        required: true,
                        errorText: ''
                    },
                    abbreviation: {
                        label: '机构简称',
                        type: 'input',
                        value: '',
                        placeholder: '请输入机构简称'
                    },
                    set_up_time: {
                        label: '设立时间',
                        value: '',
                        type: 'date',
                        placeholder: '请选择设立时间'
                    },
                    mobile: {
                        label: '联系电话',
                        value: '',
                        type: 'input',
                        placeholder: '请输入联系电话'
                    },
                    principal: {
                        label: '负责人',
                        value: '',
                        type: 'input',
                        placeholder: '请输入负责人'
                    },
                    role: {
                        label: '角色',
                        type: 'select',
                        value: '',
                        options: []
                    },
                    organization_type: {
                        label: '机构类型',
                        type: 'select',
                        value: '',
                        options: [
                            {
                                label: '总公司',
                                value: '总公司'
                            },
                            {
                                label: '分公司',
                                value: '分公司'
                            },
                            {
                                label: '营业部',
                                value: '营业部'
                            }
                        ]
                    },
                    affiliation: {
                        label: '所属机构',
                        value: '',
                        type: 'select',
                        options: [],
                        span: 12
                    },
                    licensed_status: {
                        label: '持证状态',
                        value: '',
                        type: 'select',
                        options: [
                            {
                                label: '有证',
                                value: '有证'
                            },
                            {
                                label: '备案',
                                value: '备案'
                            }
                        ]
                    },
                    assessment: {
                        label: '是否考核',
                        value: 0,
                        type: 'select',
                        options: [
                            {
                                label: '是',
                                value: 0
                            },
                            {
                                label: '否',
                                value: 1
                            },
                            {
                                label: '只算首佣',
                                value: 2
                            }
                        ]
                    },
                },
                otherForms: {
                    address: {
                        label: '注册地',
                        type: 'input',
                        value: '',
                        placeholder: '请输入注册地',
                        span: 9
                    },
                    area: {
                        label: '所属地区',
                        type: 'region',
                        value: '',
                        placeholder: '请选择所属地区',
                        span: 9
                    },
                    postcode: {
                        label: '邮政编码',
                        type: 'input',
                        value: '',
                        placeholder: '请输入邮政编码',
                        span: 6
                    },
                    status: {
                        label: '状态',
                        type: 'select',
                        value: 0,
                        options: [
                            {
                                label: '营业',
                                value: 0
                            },
                            {
                                label: '停业',
                                value: 1
                            }
                        ],
                        span: 9
                    },
                    appshow: {
                        label: '在APP展示',
                        type: 'select',
                        value: 0,
                        options: [
                            {
                                label: '展示',
                                value: 0
                            },
                            {
                                label: '不展示',
                                value: 1
                            }
                        ],
                        span: 9
                    },
                    addressDetail: {
                        label: '地址',
                        value: '',
                        type: 'input',
                        definedSlot: {
                            name: 'append',
                            component: function(h) {
                                return h('p', 123)
                            }
                        }
                    }
                },
                ruleForm: {
                    code: '机构代码1',
                    name: '名称1',
                    abbreviation: '简称1',
                    set_up_time: '设立时间',
                    mobile: "联系电话",
                    principal: '负责人',
                    role: '角色-合作',
                    organization_type: '机构类型',
                    affiliation: '所属机构',
                    licensed_status: '持证状态',
                    assessment: '否',
                    address: '注册地',
                    isarea: '所属地区-否',
                    postcode: "123456",
                    status: '营业',
                    appshow: '',
                    naddress: '地址',
                    lnglat: ''
                }
            };
        },
        methods: {
            returnPrev() {
                this.$emit('changeList');
            },
            onSearchResult(pois) {
                window.console.log(pois)
                let latSum = 0;
                let lngSum = 0;
                this.ruleForm.naddress = pois[0].name
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
            submitForm() {
                addjigoulist(this.ruleForm).then(res => {
                    this.$message(res.Msg)
                })
            }
        },
        mounted() {

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
<style lang="scss" scoped>
    .wrapper {
        background-color: #fff;
        height: 100%;
        padding: 20px;
        overflow-y: auto;
        .form-area {
            .section {
                padding: 15px 20px;
                margin-bottom: 10px;
                font-size: 16px;
                font-weight: bold;
                text-align: left;
                background-color: #edf2f6;
                color: #495060;
            }
        }

        .upload-img {
            text-align: left;
            cursor: pointer;

            > .label {
                color: #F29F43;
                font-size: 14px;
                font-weight: bold;
            }

            > .camera {
                display: inline-block;
                margin: 0 20px;
                width: 58px;
                height: 58px;
                line-height: 58px;
                text-align: center;
                vertical-align: middle;
                border: 1px dashed #757F98;
                border-radius: 4px;

                > img {
                    vertical-align: middle;
                    width: 18px;
                }
            }
        }

        .bottom-toolbar {
            position: absolute;
            width: calc(100% - 30px);
            margin: 0 15px;
            padding: 0 20px;
            box-sizing: border-box;
            height: 80px;
            line-height: 80px;
            z-index: 2;
            right: 0;
            bottom: 0;
            background-color: #fff;
            box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.28);

            .el-button.is-round {
                padding: 6px 15px 7px 15px;
            }
        }
    }
</style>
