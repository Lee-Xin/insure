<template>
  <div>
    <div class="main_title">
      <h2>{{title}}
        <span>{{title_f}}</span>
      </h2>
    </div>
  </div>
</template>

<script>
    export default {
        name: "MainTitle",
        data () {
            return {
                // title: '供应商一览表',
                // title_f: 'Insurance Supplier List'
            }
        },
        props:['title','title_f']
    }
</script>

<style scoped>
.main_title {
  width: 100%;
  height: 65px;
  line-height: 65px;
  padding-left: 15px;
  box-sizing: border-box;
  color: #4074e1;
  text-align: left;
  background-color: #fff;
}
.main_title h2{
  display: block;
  height: 65px;
  font-size: 22px;
  font-weight: normal;
}
.main_title span{
  font-size: 14px;
  margin-left: 35px;
}
</style>
