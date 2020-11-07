<template>
  <div>
    <el-dialog
      :title="form.id != null?'修改用户':'添加用户'"
      :visible="show === $options.name"
      :close-on-click-modal="false"
      append-to-body
      @close="close"
      @closed="closed"
      width="640px"
    >
      <el-form class="form-box" size="mini" label-width="120px">
        <el-form-item label="登陆账号">
          <el-input v-model="form.login_name" style="width:215px;" placeholder="请输入登录账号"></el-input>
        </el-form-item>
        <el-form-item label="关联角色">
          <el-select
            style="width:85%;"
            size="small"
            v-model="form.role_id"
            multiple
            placeholder="请选择关联角色"
          >
            <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width:50%;display:inline-block" label="用户状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>

        <el-form-item label="手机号码">
          <el-input v-model="form.mobile" style="width:160px;" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="登陆密码">
          <el-input show-password v-model="form.pwd" style="width:160px;" placeholder="请输入登陆密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="close">取 消</el-button>
        <el-button size="medium" type="primary" @click="submit">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { adminSave as save } from "@/request/api.js";
export default {
  name: "adminSave",
  components: {},
  props: {
    value: {
      type: Object
    },
    show: {
      type: String
    }
  },
  watch: {
    show(val) {
      if (val === this.$options.name) {
        this.$ObjectMixed(this.form, this.value.form);
        this.roleList = this.value.roleList;
      }
    }
  },
  data() {
    return {
      roleList: [],
      form: {
        id: null,
        login_name: "",
        mobile: "",
        role_id: [],
        status: 1,
        pwd: ""
      }
    };
  },
  methods: {
    submit() {
      save(this.form).then(res => {
        this.$message.success({
          message: res.msg || "操作成功"
        });
        this.$emit("visibleChange", { getList: true, show: "" });
      });
    },
    close() {
      this.$emit("visibleChange", { getList: false, show: "" });
    },
    closed() {
      Object.assign(this.$data, this.$options.data());
    }
  }
};
</script>
<style lang="less" scoped>
</style>