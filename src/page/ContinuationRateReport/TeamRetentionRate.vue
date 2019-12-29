<template>
  <div>
    <main-title :title="title" :title_f="title_f"></main-title>
    <page-hr></page-hr>
    <div class="content_box" v-if="searchORnewsupplier">
      <span class="content_title_1">快速搜索</span>
      <team-retention-rate-search></team-retention-rate-search>
    </div>
    <div v-if="searchORnewsupplier">
      <page-ination></page-ination>
    </div>
  </div>
</template>

<script>
    import MainTitle from "@/common/MainTitle";
    import PageHr from "@/common/PageHr";
    import PageInation from "../../common/PageInation";
    import TeamRetentionRateSearch from "./component/TeamRetentionRateSearch";
    export default {
        name: "TeamRetentionRate",
        data () {
            return {
                title: '团队继续率',
                title_f: '这是团队继续率展示页面',
                searchORnewsupplier: true
            }
        },
        components: {TeamRetentionRateSearch, PageInation, PageHr, MainTitle}
    }
</script>

<style scoped>

</style>