<template>
  <div>
    <div class="AgentFeesSearch">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="row_3">
          <el-form-item label="供应商">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option v-for="(item, index) in supplier" :label="item" :key="index" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品名称">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option v-for="(item, index) in productName" :label="item" :value="item" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品代码">
            <el-input v-model="form.name" placeholder="请输入产品代码"></el-input>
          </el-form-item>
        </div>
        <div class="row_3">
          <el-form-item label="渠道政策">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option v-for="(item, index) in channel_policy" :label="item" :value="item" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="适用对象">
            <el-input v-model="form.name" placeholder="请输入产品代码"></el-input>
          </el-form-item>
          <el-form-item label="费用类型">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option v-for="(item, index) in cost_type" :label="item" :value="item" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item class="search_button">
          <el-button type="primary">查询</el-button>
        </el-form-item>
        <el-form-item class="search_button">
          <el-button type="primary">修改</el-button>
          <el-button type="primary">复制</el-button>
          <el-button type="primary">导出</el-button>
          <el-button type="primary" @click="hideSearch">添加</el-button>
        </el-form-item>
      </el-form>
      <el-table class="search_table" :data="tableData">
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="supplier" label="供应商"></el-table-column>
        <el-table-column prop="productName" label="产品名称"></el-table-column>

        <el-table-column prop="productId" label="产品代码"></el-table-column>
        <el-table-column prop="channel_policy" label="渠道政策"></el-table-column>
        <el-table-column prop="applicable_objects" label="适用对象"></el-table-column>

        <el-table-column prop="commission_coefficient" label="佣金系数"></el-table-column>
        <el-table-column prop="applicable_agencies" label="机构列表"></el-table-column>
        <el-table-column prop="startTime" label="开始时间"></el-table-column>
        <el-table-column prop="endTime" label="结束时间"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
    export default {
        name: "AgentFeesSearch",
        data() {
            return {
                form: {
                    region: '',
                    name: ''
                },
                supplier: '',
                productName: '',
                channel_policy: '',
                cost_type: '',
                tableData: []
            }
        },
        methods: {
            hideSearch() {
                this.$emit('hideSearch')
            }
        }
    }
</script>

<style scoped>
  .AgentFeesSearch{
    width: 100%;
    min-height: 500px;
    /*background-color: red;*/
  }
  .row_3 {
    width: 100%;
    height: 40px;
    display: flex;
    margin-top: 30px;
    justify-content: space-around;
    /*background-color: #4074e1;*/
  }

  .row_3 >>> .el-form-item {
    width: 20%;
    height: 40px;
    /*background-color: #ef8412;*/
  }

  .row_3 >>> .el-form-item .el-form-item__content {
    width: 100%;
  }

  .row_3 >>> .el-form-item .el-form-item__content .el-select,
  .row_3 >>> .el-form-item .el-form-item__content .el-input {
    width: 100%;
  }

  .search_button {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    /*padding-right: 50px;*/
    /*background-color: red;*/
    margin-top: 30px;
  }

  .search_button button {
    font-size: 14px;
    color: #fff;
    margin: 0 20px;
  }
</style>