<template>
  <div class="p_fixed">
    <div class="block">
      <slot></slot>
      <el-pagination
        class="page-bar"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[50, 100, 150, 200]"
        :page-size="50"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    handleSizeChange(val) {
      this.currentPage = val;
      // window.console.log(`每页 ${val} 条`);
      this.$emit("changeSize", val);
    },
    handleCurrentChange(val) {
      // currentPage
      //   window.console.log(`当前页: ${val}`);
      this.$emit("changeCurrentPage", val);
    }
  },
  props: {
    total: Number
  },
  data() {
    return {
      currentPage: 1
    };
  }
};
</script>

<style scoped lang="scss">
.p_fixed {
  width: 100%;
  text-align: right;
  position: fixed;
  z-index: 2;
  right: 0;
  left: 0;
  bottom: 0;
  padding-left: 210px;
  box-sizing: border-box;
  .block {
  box-sizing: border-box;
    width: 100%;
    padding: 1px 20px 11px;
   
    text-align: right;
    background-color: #fff;
    box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.28);
    .page-bar {
      margin: 25px 0 10px;
    }
  }
}
</style>
