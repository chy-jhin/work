<template>
  <div class="system">
    <div class="head">
      <div>
        <router-link tag="div" :to="{path:'./about'}">关于我们</router-link>
      </div>
      <div>
        <router-link tag="div" :to="{path:'./vip_info'}">会员激活说明</router-link>
      </div>
      <div>
        <router-link tag="div" :to="{path:'./user_help'}">用户指南</router-link>
      </div>
    </div>
    <div class="body">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.system {
  & > div {
    margin: 20px auto;
  }
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .router-link-active {
    color: #409EFF;
    &::after {
      content: "";
      width: 50%;
      height: 2px;
      display: block;
      background-color: #409EFF;
      border-radius: 30rpx;
      overflow: hidden;
      transform: translate(50%, 5px);
    }
  }
  div {
    padding: 5px 15px;
    cursor: pointer;
  }
}
.body {
}
.footer {
  display: flex;
  justify-content: flex-end;
}
</style>