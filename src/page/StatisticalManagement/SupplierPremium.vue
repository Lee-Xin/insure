<template>
  <div>
    <main-title :title="title" :title_f="title_f" t></main-title>
    <page-hr></page-hr>
    <div class="content_box" v-if="searchORnewsupplier">
      <supplier-premium-search></supplier-premium-search>
    </div>
  </div>
</template>

<script>
import MainTitle from "@/common/MainTitle";
import PageHr from "@/common/PageHr";
import SupplierPremiumSearch from "./component/SupplierPremiumSearch";
export default {
  name: "SupplierPremium",
  data() {
    return {
      title: "供应商保费",
      title_f: "这是供应商保费页面",
      searchORnewsupplier: true
    };
  },
  components: { SupplierPremiumSearch, PageHr, MainTitle }
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
