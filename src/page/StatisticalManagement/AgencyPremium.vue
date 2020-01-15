<template>
  <div>
    <page-hr></page-hr>
    <div class="content_box">
      <agency-premium-search></agency-premium-search>
    </div>
  </div>
</template><script>
import PageHr from "@/common/PageHr";
import AgencyPremiumSearch from "./component/AgencyPremiumSearch";

export default {
  name: "AgencyPremium",
  data() {
    return {};
  },

  components: {
    AgencyPremiumSearch,
    PageHr
  }
};
</script><style scoped>
.content_box {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding-left: 16px;
  background: #fff;
  padding-top: 10px;
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