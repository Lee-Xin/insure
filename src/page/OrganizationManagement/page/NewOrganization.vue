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
                        :disabled="item.disabled"
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
                        :disabled="item.disabled"
                    >
                    </form-item>
                </el-col>
                <el-col v-if="showMap" :span="16">
                    <el-amap ref="map" vid="amapDemo" :center="center" :zoom="12" :plugin="plugin" :events="events"
                             class="amap-demo">
                        <el-amap-marker v-for="(marker,key) in markers" :key="key" :position="marker"></el-amap-marker>
                    </el-amap>
                </el-col>
            </el-row>
        </div>
        <div class="bottom-toolbar">
            <el-button @click="submitForm" type="primary" round icon="el-icon-success">
                保存/提交
            </el-button>
            <el-button round @click="$router.push('/organization_list')">
                返回
            </el-button>
        </div>
    </div>
</template>

<script>
    import PageHr from "@/common/PageHr";
    import FormItem from '@/common/FormItem';
    import {addjigoulist} from '@/request/api'
    import VueAMap from 'vue-amap';
    import Vue from 'vue';
    let that = null;
    const addressBtn = {
        name: 'addressBtn',
        render(h) {
            return h('el-button', {
                attrs: {
                    icon: 'el-icon-search'
                },
                on: {
                    click: () => {
                        that.showMap = true;
                    }
                }
            }, '在地图中定位')
        }
    }
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
                        o.getCity(result => {})
                    },
                    'click': (e) => {
                        this.$set(this.otherForms.lonlat, 'value', e.lnglat.lng + "," + e.lnglat.lat);
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
                            component: addressBtn
                        },
                        span: 12
                    },
                    lonlat: {
                        label: '经纬度',
                        type: 'input',
                        value: '',
                        placeholder: '经纬度自动展示',
                        disabled: true,
                        span: 12
                    },
                    remarks: {
                        label: '备注',
                        type: 'input',
                        value: '',
                        placeholder: '请填写备注信息',
                        span: 12
                    },
                    time: {
                        label: '作息时间',
                        type: 'input',
                        value: '',
                        placeholder: '请填写作息时间',
                        span: 12
                    }
                },
                showMap: false
            };
        },
        computed: {
            formData() {
                let data = {};
                Object.keys(this.forms).forEach(t => {
                    data[t] = this.forms[t].value;
                });
                Object.keys(this.otherForms).forEach(t => {
                    data[t] = this.otherForms[t].value;
                });
                return data;
            }
        },
        methods: {
            validate(form) {
                let success = true;
                Object.keys(form).forEach(key => {
                    let t = form[key];
                    if (t.required) {
                        if (t.value === '') {
                            t.errorText = `${t.label}不能为空`;
                            if (success) {
                                success = false;
                            }
                            return;
                        }
                    }
                    t.errorText = '';
                });
                return success;
            },
            submitForm() {
                let res = this.validate(this.forms);
                if (!res) {
                    this.$message.error('请完善信息');
                    return;
                }
                addjigoulist(this.formData).then(res => {
                    if (res.status === 200) {
                        this.$message.success('保存成功');
                        this.$router.push('/organization_list');
                    }
                }).catch(e => {
                    console.log(e);
                    this.$message.error('保存失败');
                });
            }
        },
        mounted() {
            that = this;
        }
    }
</script>

<style scoped>
    .amap-demo {
        height: 300px;
        margin-bottom: 30px;
        font-size: 26px;
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
        overflow-y: auto;
        .form-area {
            margin: 20px;
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
            z-index: 1000;
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
