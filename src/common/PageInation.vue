<template>
  <div>
    <div class="block">
      <span class="demonstration">完整功能</span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[50, 100, 150, 200]"
        :page-size="50"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
    export default {
        methods: {
            handleSizeChange(val) {
              this.currentPage = val;
                // window.console.log(`每页 ${val} 条`);
                this.$emit('changeSize',val);
            },
            handleCurrentChange(val) {
              // currentPage
              //   window.console.log(`当前页: ${val}`);
                this.$emit('changeCurrentPage',val);
            },
        },
        props: {
            total: Number
        },
        data() {
            return {
                currentPage: 1,
            };
        }
    }
</script>

<style scoped>
.block{
  width: 720px;
  height: 82px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  right: 0;
  bottom: 0;
  background-color: #fff;
}
</style>
