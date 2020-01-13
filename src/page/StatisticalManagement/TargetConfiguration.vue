<template>
  <div>
    <page-hr></page-hr>
    <div class="content_box">
      <target-configuration-search></target-configuration-search>
    </div>
  </div>
</template>

<script>
import PageHr from "@/common/PageHr";
import TargetConfigurationSearch from "./component/TargetConfigurationSearch";
export default {
  name: "TargetConfiguration",
  data() {
    return {};
  },
  components: { TargetConfigurationSearch, PageHr }
};
</script>

<style scoped>
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
