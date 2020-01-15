<template>
  <div>
    <page-hr></page-hr>
    <div class="content_box" >
      <business-statement-search></business-statement-search>
    </div>
    
  </div>
</template>

<script>
    import PageHr from "@/common/PageHr";
    import BusinessStatementSearch from "./component/BusinessStatementSearch";

    export default {
        name: "BusinessStatement",
        components: {BusinessStatementSearch, PageHr},
        data() {
            return {
                
            }
        }
    }
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