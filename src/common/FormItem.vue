<template>
    <div class="wrapper">
        <div class="label" :class="{required: required}">
            <span v-if="required">*</span>
            {{label}}
        </div>
        <el-input
            class="form-item"
            :class="{isError: showError}"
            v-model="computedValue"
            v-if="type === 'input'"
            :placeholder="placeholder"
        >
        </el-input>
        <el-select
            class="form-item"
            :class="{isError: showError}"
            v-else-if="type === 'select'"
            v-model="computedValue"
            :placeholder="placeholder"
        >
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
        <el-date-picker
            class="form-item"
            v-else-if="type === 'date'"
            v-model="computedValue"
            :placeholder="placeholder"
        >
        </el-date-picker>
        <p class="error" v-show="showError">
            {{label}}不能为空
        </p>
    </div>
</template>

<script>
    import dayjs from 'dayjs';
    export default {
        name: "FormItem",
        props: {
            type: [String],
            options: [Array],
            label: String,
            value: [String, Number],
            required: [Boolean],
            placeholder: String
        },
        data() {
            return {
                computedValue: '',
                showError: false
            }
        },
        mounted() {
            this.computedValue = this.value;
        },
        watch:{
            computedValue(val) {
                if(this.type === 'date') {
                    this.$emit('input', dayjs(val).format('YYYY-MM-DD'));
                } else {
                    this.$emit('input', val);
                }
                if(this.required) {
                    if(val === '') {
                        this.showError = true;
                    } else {
                        this.showError = false;
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-input{
        width: initial!important;
    }
    .wrapper {
        position: relative;
        width: 100%;
        line-height: 36px;
        margin-bottom: 20px;
        height: 36px;
        font-size: 14px;
        /deep/.el-input__icon{
            line-height: 36px;
        }
        .label {
            float: left;
            height: 100%;
            width: 120px;
            box-sizing: border-box;
            background-color: #fafafa;
            border: 1px solid #bebebe;
            border-right-width: 0;
            cursor: default;
            &.required{
                color: #ef8411;
            }
        }

        /deep/.form-item {
            display: block;
            margin-left: 120px;
            &.isError{
                .el-input__inner{
                    border-color: #ee3f14;
                }
                .el-select{
                    border-color: #ee3f14;
                }
            }
        }
        .error{
            position: absolute;
            bottom: -20px;
            left: 120px;
            line-height: 20px;
            color: #ee3f14;
            font-size: 14px;
        }
    }
</style>