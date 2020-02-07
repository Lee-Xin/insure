<template>
  <div style="height: 100%;">
    <page-hr></page-hr>
    <div class="content_box" v-if="searchORnewsupplier">
      <span class="content_title_1">快速搜索</span>
      <continuation-rate-bonus-search @showSearch="showAddContnution"></continuation-rate-bonus-search>
    </div>
    <continuation-rate @showSearch="showSearch" v-if="!searchORnewsupplier"></continuation-rate>

  </div>
</template>

<script>
    import PageHr from "@/common/PageHr";
    import ContinuationRateBonusSearch from "./component/ContinuationRateBonusSearch";
    import ContinuationRate from "./page/ContinuationRate";
    export default {
        name: "ContinuationRateBonus",
        data () {
          return {
              searchORnewsupplier: true
          }
        },
        methods: {
            showAddContnution() {
                this.searchORnewsupplier = false;
            },
            showSearch() {
                this.searchORnewsupplier = true;
            }
        },
        components: {ContinuationRate, ContinuationRateBonusSearch, PageHr}
    }
</script>

<style scoped>
  .content_box {
    width: 100%;
    height: 100%;
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
      margin-bottom: 10px;
      padding: 10px;
  }

</style>
