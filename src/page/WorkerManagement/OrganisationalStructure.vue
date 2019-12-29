<template>
  <div>
    <main-title :title="title" :title_f="title_f" t></main-title>
    <page-hr></page-hr>
    <div class="content_box">
      <span class="content_title_1">快速搜索</span>
      <div class="search">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="分支结构">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="重庆众鼎保险代理有限公司南岸区第三营业部" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="在职状态">
            <el-select v-model="form.region">
              <el-option label="在职" value="shanghai"></el-option>
              <el-option label="全部" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="工号" value="shanghai"></el-option>
              <el-option label="分部" value="beijing"></el-option>
              <el-option label="分支机构" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="职级" name="type"></el-checkbox>
              <el-checkbox label="入职时间" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">搜索</el-button>
            <el-button>导出</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="OrganisationalStructure_content">
          <div class="content_children">
            <div class="content_icon"></div>
            <span>初级独立代理人</span>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
    import MainTitle from "@/common/MainTitle";
    import PageHr from "@/common/PageHr";

    export default {
        name: "OrganisationalStructure",
        data() {
            return {
                title: '组织架构页面',
                title_f: '组织架构页面',
                searchORnewsupplier: true,
                form: {
                    type: '',
                    region: ''
                }
            }
        },
        components: {PageHr, MainTitle}
    }
</script>

<style scoped>
  .search .el-form {
    width: 100%;
    height: 40px;
    /*background: #ef8412;*/
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    padding-bottom: 50px;
    border-bottom: 1px solid #666;
  }
  .OrganisationalStructure_content{
    width: 100%;
    min-height: 500px;
    /*background-color: red;*/
  }
  .content_children{
    width: 300px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: #2c8cf0;
  }
  .content_icon{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: red;
  }
  .content_children span{
    height: 20px;
    line-height: 20px;
    display: block;
    text-align: left;
    color: #999;
    font-size: 16px;
  }
</style>