<template>
  <div>
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="产品基本信息"></el-form-item>
      <div class="row_4">
        <el-form-item label="供应商">
          <el-select v-model="ruleForm.supplier_name" placeholder="请选择供应商">
            <el-option v-for="(item, index) in supplier_name" :value="item" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="haveUpload" label="产品名称">
          <el-input v-model="ruleForm.product_name" placeholder="请选择产品名称"></el-input>
          <el-button type="primary" @click="showImportProduct">导入</el-button>
        </el-form-item>
        <el-form-item label="产品简称">
          <el-input v-model="ruleForm.product_niceName" placeholder="请输入产品简称"></el-input>
        </el-form-item>
        <el-form-item label="产品代码">
          <el-input v-model="ruleForm.product_code" placeholder="请输入产品代码"></el-input>
        </el-form-item>
      </div>
      <div class="row_4">
        <el-form-item label="销售状态">
          <el-select v-model="ruleForm.sales_status" placeholder="在售">
            <el-option v-for="(item, index) in sales_status" :value="item" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主附险类型">
          <el-select v-model="ruleForm.main_risks_attached" placeholder="主险">
            <el-option v-for="(item, index) in main_risks_attached" :value="item" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="承保年龄">
          <el-input v-model="ruleForm.insured_age" placeholder="例：0-65周岁"></el-input>
        </el-form-item>
        <el-form-item class="haveUpload" label="产品分类">
          <el-select v-model="ruleForm.type" placeholder="请选择产品分类">
            <el-option v-for="(item, index) in type.first_type" :key="index" :value="item"></el-option>
          </el-select>
          <el-button type="primary">管理</el-button>
        </el-form-item>
      </div>

      <div class="row_4">
        <el-form-item class="haveUpload" label="交费方式">
          <el-input v-model="pay_way" placeholder="请输入内容"></el-input>
          <el-button type="primary" @click="addPay_Way">添加</el-button>
        </el-form-item>
        <el-form-item label="众安code">
          <el-input v-model="ruleForm.zhonganCode" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="产品性质">
          <el-select v-model="ruleForm.nature_product" placeholder="请选择">
            <el-option v-for="(item, index) in nature_product" :value="item" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-tag :key="index" v-for="(item, index) in ruleForm.pay_way" closable :disable-transitions="false" @close="handleClose(index)">
            {{item}}
          </el-tag>
<!--          <el-input v-model="ruleForm.name" placeholder="请输入内容"></el-input>-->
        </el-form-item>
      </div>

      <el-button id="mybutton0" type="primary">保险期间</el-button>
      <el-button id="mybutton1" type="primary">交费期间</el-button>

      <div class="fuwenbenkaung">
        <editor-item v-model="detail" :isClear="isClear" @change="change"></editor-item>
      </div>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button type="primary" @click="returnPrev">返回</el-button>
      </el-form-item>
    </el-form>
    <import-popup v-if="isShowImportPopup" @importData="importData" @cancel_popup="hideImportPopup" :importPopup="productName" :title="title"></import-popup>
  </div>
</template>

<script>
    import EditorItem from "@/common/wangEnduit/EditorItem";
    import {apiProductListAdd, apiProductList} from "../../../request/api";
    import ImportPopup from "../../../common/ImportPopup";

    export default {
        name: "NewProduct",
        components: {ImportPopup, EditorItem},
        data() {
            return {
                pay_way: '',
                title: '产品列表',
                isShowImportPopup: false,
                fileList: [{name: '', url: ''}],
                isClear: false,
                detail:"",
                ruleForm: {
                    supplier_name: '',
                    product_name: [],
                    product_niceName: '',
                    product_code: '',
                    sales_status:'',
                    main_risks_attached: '',
                    insured_age: '',
                    type: [],
                    pay_way: [],
                    zhonganCode: '',
                    nature_product: ''
                },
                supplier_name: [],
                productName: [],
                sales_status: [],
                main_risks_attached: [],
                nature_product: [],
                rules: {
                    product_name: [
                        {required: true, message: '请选择供应商', trigger: 'blur'},
                    ],
                },
                type: {}
                // setTime: new Date()
            };
        },
        methods: {
            handleClose(index){
                this.ruleForm.pay_way.splice(index,1);
            },
            addPay_Way() {
                if (this.pay_way !== ''){
                    this.ruleForm.pay_way.push(this.pay_way);
                    this.pay_way = '';
                }
            },
            hideImportPopup() {
                this.isShowImportPopup = false;
            },
            showImportProduct(){
                this.isShowImportPopup = true;
            },
            returnPrev(){
                this.$emit('changeSearch')
            },
            change(val) {
                window.console.log(val)
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        apiProductListAdd().then(res => {
                            window.console.log(res);
                        })
                        // alert('submit!');
                    } else {
                        window.console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            //属于load
            handleRemove(file, fileList) {
                window.console.log(file, fileList);
            },
            handlePreview(file) {
                window.console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                window.console.log(fileList);
                return this.$confirm(`确定移除 ${ file.name }？`);
            }
        },
        created() {
            apiProductList().then(res => {
                this.supplier_name = res.Data.supplier_name;
                this.productName = res.Data.product_name;
                this.sales_status  =res.Data.sales_status;
                this.main_risks_attached = res.Data.main_risks_attached;
                this.nature_product = res.Data.nature_product;
                this.type = res.Data.type;
                window.console.log(res);
            })
        }
    }
</script>

<style scoped>
  #mybutton0,#mybutton1{
    width: 100px;
    height: 40px;
    font-size: 16px;
    color: #fff;
    background-color: #ff9628;
    margin-right: 20px;
    margin-bottom: 20px;
  }

  .row_2 {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    /*background-color: #fff;*/
  }

  .row_2 .el-form-item {
    width: 50%;
  }

  .row_3 {
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }

  .row_3 .el-form-item {
    width: 33.33%;
    /*background-color: #fff;*/
  }

  .row_4 {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
  }

  .row_4 .el-form-item {
    width: 25%;
  }
  .haveUpload >>> .el-form-item__content{
    /*background-color: red;*/
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .haveUpload >>> .el-form-item__content > .el-input,
  .haveUpload >>> .el-form-item__content > .el-select{
    width: 80%;
  }
  .haveUpload >>> .el-form-item__content > .upload-demo,
  .haveUpload >>> .el-form-item__content > .el-button{
    width: 20%;
    /*background-color: blue;*/
  }
  /*.haveUpload >>> .el-form-item__content > .el-button--success{*/
  /*  height: 40px;*/
  /*  background-color: #ff9628;*/
  /*  line-height: 40px;*/
  /*  font-size: 16px;*/
  /*  color: #fff;*/
  /*  border: 0;*/
  /*}*/
  .el-form-item__content .el-select {
    width: 100%;
  }

  .el-form-item__content .el-col {
    width: 100%;
  }

  .el-form-item__content .el-button{
    width: 100%;
    border: 1px solid #999;
  }
  .el-form-item__content .el-col .el-form-item {
    width: 100%;
  }
  .fuwenbenkaung{
    width: 100%;
    height: 458px;
    font-size: 18px;
    /*background-color: red;*/
  }
  .fuwenbenkaung >>> .toolbar{
    height: 30px;
  }
  .fuwenbenkaung >>> .text{
    height: 428px;
  }
</style>
