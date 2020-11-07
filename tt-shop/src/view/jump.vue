<template>
  <div></div>
</template>

<script>
export default {
  name: "jump",
  created() {
    this.$router.push({
      path: this.$route.query.path || "/main",
      query: this.$route.query.query
    });
  }
};
</script>

<style lang='less' scoped>
</style>