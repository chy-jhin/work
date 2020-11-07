<template>
  <div id="app">
    <router-view />
  </div>
</template>


<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}

.table {
  /deep/.image-conlum {
    .cell {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.H100 {
  height: 100%;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.image-colum .cell {
  line-height: 1 !important;
}

.expand-form {
  .item {
    width: 50%;
    display: inline-block;
    margin-right: 0;
    margin-bottom: 0;
    &.el-form-item--mini,
    &.el-form-item--small {
      margin-bottom: unset;
    }
    .el-form-item__label {
      color: #99a9bf;
    }
  }
}
</style>
