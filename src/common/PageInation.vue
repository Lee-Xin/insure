<template>
  <div class="p_fixed">
    <div class="block">
      <slot>
        <div style="min-width:10px"></div>
      </slot>
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
</style>
