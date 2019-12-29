<template>
  <div>
    <main-title :title="title" :title_f="title_f" t></main-title>
    <page-hr></page-hr>
  </div>
</template>

<script>
    import MainTitle from "@/common/MainTitle";
    import PageHr from "@/common/PageHr";
    export default {
        name: "DeclarationList",
        data () {
            return {
                title: '报单列表',
                title_f: '这是报单列表页面'
            }
        },
        components: {PageHr, MainTitle}
    }
</script>

<style scoped>

</style>