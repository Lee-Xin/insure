<template>
  <div class="box">
    <page-hr></page-hr>
    <el-form ref="form" :model="form" class="search_form">
      <el-form-item>
        <div class="cell_before">热销推荐</div>
        <el-select v-model="form.hotPro" placeholder="请选择" clearable filterable>
          <el-option v-for="item in hotProList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <div class="cell_before">新品推荐</div>
        <el-select v-model="form.newPro" placeholder="请选择" clearable filterable>
          <el-option v-for="item in newProList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <div class="cell_before">热销产品</div>
        <el-select v-model="form.selling" placeholder="请选择" clearable filterable>
          <el-option v-for="item in sellingList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="save">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import MainTitle from "@/common/MainTitle";
import PageHr from "@/common/PageHr";
import { APPHomepageModule, saveAPPConfig } from "@/mock/api";
export default {
  name: "PasswordReset",
  data() {
    return {
      form: {
        hotPro: "",
        newPro: "",
        selling: ""
      },
      hotProList: [],
      newProList: [],
      sellingList: []
    };
  },
  created() {
    this.getData();
  },
  //方法
  methods: {
    getData() {
      APPHomepageModule({ type: 1, SkipCount: 0, MaxResultCount: 1000 }).then(
        res => {
          this.hotProList = res.result.items;
        }
      );
      APPHomepageModule({ type: 2, SkipCount: 0, MaxResultCount: 1000 }).then(
        res => {
          this.newProList = res.result.items;
        }
      );
      APPHomepageModule({ type: 3, SkipCount: 0, MaxResultCount: 1000 }).then(
        res => {
          this.sellingList = res.result.items;
        }
      );
    },
    save() {
      saveAPPConfig(this.form).then(res => {
        this.$message(res.data.Msg);
      });
    }
  },

  components: { PageHr }
};
</script>

<style scoped lang=less>
.box {
  background: #fff;
  height: 800px;
  .search_form {
    padding: 20px;
    .el-form-item {
      float: none;
    }
  }
}
</style>
