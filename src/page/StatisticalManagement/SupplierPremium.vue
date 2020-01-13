<template>
  <div>
    <page-hr></page-hr>
    <div class="content_box">
      <supplier-premium-search></supplier-premium-search>
    </div>
  </div>
</template>

<script>
import PageHr from "@/common/PageHr";
import SupplierPremiumSearch from "./component/SupplierPremiumSearch";
export default {
  name: "SupplierPremium",
  data() {
    return {};
  },
  components: { SupplierPremiumSearch, PageHr }
};
</script>

<style scoped>
.content_box {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding-left: 16px;
  padding-top: 10px;
  background: #fff;
}

.content_title_1 {
  width: 100%;
  height: 18px;
  display: block;
  line-height: 18px;
  font-size: 18px;
  color: #ef8412;
  text-align: left;
  margin-bottom: 20px;
}
</style>
