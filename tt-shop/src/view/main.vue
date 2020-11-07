<template>
  <div class="H100 flexc">
    <el-image :draggable="false" class="welcome" :src="src" lazy></el-image>
  </div>
</template>
<script>
export default {
  name: "main_page",
  data() {
    return {
      src: require("@/assets/welcome.png")
    };
  }
};
</script>
<style lang="less" scoped>
.welcome {
  width: 50%;
  max-width: 1024px;
  min-width: 320px;
}
</style>