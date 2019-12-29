<template>
  <div>
    <div class="AgentFeesAdd">
      <el-form ref="form" label-width="80px">
        <div class="row_3">
          <el-form-item label="供应商">
            <el-select placeholder="供应商简称">
              <el-option label="item" key="index" value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="input-button" label="产品名称">
            <el-select placeholder="请选择">
              <el-option label="item" key="index" value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品代码">
            <el-input placeholder="请输入产品代码"></el-input>
          </el-form-item>
        </div>
        <div class="row_3">
          <el-form-item label="渠道政策">
            <el-select placeholder="请选择">
              <el-option label="item" key="index" value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="适用对象">
            <el-input placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker type="date" placeholder="请选择"></el-date-picker>
          </el-form-item>
        </div>
        <div class="row_3">
          <el-form-item label="合同结束时间">
            <el-date-picker type="date" placeholder="请选择"></el-date-picker>
          </el-form-item>
          <el-form-item label="费用类型">
            <el-select placeholder="请选择">
              <el-option label="item" key="index" value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="销量统计方式">
            <el-select placeholder="请选择">
              <el-option label="item" value="item" key="index"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-tabs type="border-card">
          <el-tab-pane label="模版一">
            <el-button>奖励名称</el-button>
            <el-table style="width: 100%">
              <el-table-column prop="date" label="交费期间" width="180">1年交</el-table-column>
              <el-table-column prop="name" label="第一年度费用" width="180">
                <templat>
                  <el-input placeholder=""></el-input>
                  %
                </templat>
              </el-table-column>
              <el-table-column prop="address" label="第二年度费用">
                <templat>
                  <el-input placeholder=""></el-input>
                  %
                </templat>
              </el-table-column>
              <el-table-column prop="address" label="第三年度费用">
                <templat>
                  <el-input placeholder=""></el-input>
                  %
                </templat>
              </el-table-column>
              <el-table-column prop="address" label="第四年度费用">
                <templat>
                  <el-input placeholder=""></el-input>
                  %
                </templat>
              </el-table-column>
              <el-table-column prop="address" label="第五年度费用">
                <templat>
                  <el-input placeholder=""></el-input>
                  %
                </templat>
              </el-table-column>
              <el-table-column prop="address" label="第六年度以上费用">
                <templat>
                  <el-input placeholder=""></el-input>
                  %
                </templat>
              </el-table-column>
            </el-table>
            <div class="search">
              <el-form-item label="机构类型">
                <el-select placeholder="请选择">
                  <el-option label="总公司" value="shanghai"></el-option>
                  <el-option label="分公司" value="beijing"></el-option>
                  <el-option label="营业部" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="机构名称">
                <el-input></el-input>
              </el-form-item>
              <el-button type="primary">查询</el-button>
              <el-button type="primary" @click="showAddAgency=true">添加</el-button>
            </div>
            <div class="DownstreamFoldingAdd_table">
              <el-table style="width: 100%">
                <el-table-column prop="id" label="序号"></el-table-column>
                <el-table-column prop="body_type" label="机构类型"></el-table-column>
                <el-table-column prop="Name_institution" label="机构名称"></el-table-column>
                <el-table-column prop="operation" label="操作"></el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="模版二">配置管理</el-tab-pane>
        </el-tabs>
        <el-form-item class="InstitutionalExpensesAdd_buttom">
          <el-button type="primary">保存/提交</el-button>
          <el-button @click="returnPrev">返回</el-button>
        </el-form-item>
      </el-form>
      <add-agency @hideAddAgency="hideAddAgency" v-if="showAddAgency"></add-agency>
    </div>
  </div>
</template>

<script>
    import AddAgency from "../../../common/AddAgency";
    export default {
        name: "AgentFeesAdd",
        data() {
            return{
                showAddAgency: false
            }
        },
        methods: {
            hideAddAgency() {
                this.showAddAgency = false
            },
            returnPrev() {
                this.$emit('returnPrev')
            }
        },
        components: {AddAgency}
    }
</script>

<style scoped>
  .AgentFeesAdd {
    width: 100%;
    min-height: 300px;
  }

  .row_3 {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .row_3 .el-form-item {
    width: 33.33%;
  }

  .row_3 .el-form-item .el-form-item__content {
    width: 100%;
  }

  .row_3 .el-form-item .el-form-item__content .el-select,
  .row_3 .el-form-item .el-form-item__content .el-input {
    width: 100%;
  }

  .search {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
  }

  .DownstreamFoldingAdd_table {
    margin-top: 30px;
    margin-bottom: 50px;
  }

  .InstitutionalExpensesAdd_buttom {
    width: 100%;
    height: 409px;
    margin-top: 40px;
    margin-bottom: 50px;
  }
</style>