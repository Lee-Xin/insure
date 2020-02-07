<template>
    <div class="import_popup">
        <div class="form_box">
            <div class="form_body">
                <div class="form_box_title">
                    {{title}}
                    <el-icon @click.native="cancel_popup" class="el-icon-close"
                             style="float: right; cursor: pointer;"></el-icon>
                </div>
                <div style="text-align: left; padding: 20px 15px; height: calc(100% - 120px);">
                    <el-col
                        v-for="(item, index) in data"
                        :key="index"
                        :span="6"
                        style="margin-bottom: 5px;"
                    >
                        <el-checkbox v-model="item.value">{{item.label}}</el-checkbox>
                    </el-col>
                </div>
                <div class="btn">
                    <el-button @click="cancel_popup" type="primary">关闭</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "multiCheck",
        props: {
            data: {
                type: Array
            },
            title: String
        },
        methods: {
            cancel_popup() {
                this.$emit('cancel_popup');
            }
        }
    }
</script>

<style scoped lang="less">
    .import_popup {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .5);
    }

    .form_box {
        width: 500px;
        height: 600px;
        position: absolute;
        top: 50%;
        margin-top: -350px;
        left: 50%;
        margin-left: -250px;
        background-color: #fff;
        .form_body{
            position: relative;
            height: 100%;
            .form_box_title {
                width: 100%;
                padding: 15px 20px;
                line-height: 1;
                font-size: 14px;
                color: #ffffff;
                box-sizing: border-box;
                text-align: left;
                background-color: #4074e1;
            }
            .btn{
                position: absolute;
                bottom: 10px;
                right: 10px;
            }
        }
    }
</style>
