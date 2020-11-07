<template>
  <div class="login-page">
    <el-form :model="form" status-icon class="form">
      <div class="title-container">
        <h3 class="title">系统数据管理中心</h3>
      </div>
      <el-form-item prop="mobile">
        <el-input v-model="form.name" prefix-icon="el-icon-user" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input
          v-model="form.pwd"
          prefix-icon="el-icon-lock"
          @keyup.enter.native="login()"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" style="width:100%;" @click="login">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { Login } from "@/request/api.js";
export default {
  name: "login",
  data() {
    return {
      form: {
        name: "",
        pwd: ""
      }
    };
  },
  created() {
    if (this.$store.getters.getToken != false) {
      this.$router.push({ path: "/main" });
    }
  },
  methods: {
    login() {
      console.log(this.form)
      Login(this.form).then(res => {
        this.$store.dispatch("setUserName", res.data.login_name);
        this.$store.dispatch("setAuthList", res.data.auth_list);
        this.$message.success({
          message: res.msg || "登陆成功"
        });
        this.$router.push({ path: "/main" });
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login-page {
  height: 100%;
  background-color: #2d3a4b;
  padding-top: 120px;
  .title-container {
    .title {
      font-size: 26px;
      color: #eee;
      margin: 10px auto 30px auto;
      text-align: center;
    }
  }
  .form {
    padding: 25px;
    max-width: 320px;
    margin: auto auto;
    background-color: rgba(0, 0, 0, 0.15);
    border-radius: 5px;
  }
}
</style>