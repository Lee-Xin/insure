<template>
  <div>
    <main-title :title_f="title_f" :title="title"></main-title>
    <page-hr></page-hr>
    <div class="content_box" v-if="searchORnewsupplier">
      <span class="content_title_1">快速搜索</span>
      <renewal-data-search></renewal-data-search>
    </div>
    <!-- <agent-fees-add @returnPrev="returnPrev" v-if="!searchORnewsupplier"></agent-fees-add> -->
    <div v-if="searchORnewsupplier">
      <page-ination></page-ination>
    </div>
  </div>
</template>

<script>
import MainTitle from "@/common/MainTitle";
import PageHr from "@/common/PageHr";
import PageInation from '@/common/PageInation';
import RenewalDataSearch from './component/RenewalDataSearch';
export default {
  name: "RenewalData",
  data() {
    return {
      title: "应收清单",
      title_f: "这是应收清单页面",
      searchORnewsupplier: true
    };
  },
  components: { PageHr, MainTitle, PageInation, RenewalDataSearch }
};
</script>

<style scoped>
.content_box {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding-left: 16px;
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