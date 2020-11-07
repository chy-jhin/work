<template>
  <div>
    <el-dialog
      :title="form.id != null?'修改角色':'添加角色'"
      :visible="show === $options.name"
      :close-on-click-modal="false"
      @close="close"
      append-to-body
      @closed="closed"
      width="680px"
    >
      <el-form size="mini" label-width="120px">
        <el-form-item style="width:50%;display:inline-block" label="角色名称">
          <el-input v-model="form.name" placeholder="请输入角色名称"></el-input>
        </el-form-item>

        <el-form-item style="width:50%;display:inline-block" label="角色状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>

        <el-form-item label="关联权限">
          <el-tree
            class="tree"
            ref="tree"
            :data="data"
            show-checkbox
            node-key="authIndex"
            default-expand-all
            check-strictly
            :props="{children: 'item',label:'authName'}"
          >
            <div class="el-tree-node__label jus-b" slot-scope="{ node, data }">
              <span>{{node.data.authName}}</span>
              <span class="tips" v-if="!node.data.item">{{node.data.authIndex}}</span>
            </div>
          </el-tree>
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
import { roleAuthList as getList, roleSave as save } from "@/request/api.js";
export default {
  name: "roleSave",
  data() {
    return {
      data: [],
      form: {
        id: null,
        name: "",
        auth_list: [],
        status: 1
      }
    };
  },
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
        this.$ObjectMixed(this.form, this.value);
        this.getList();
      }
    }
  },
  methods: {
    getList() {
      getList({}).then(res => {
        this.data = res.data;
        if (this.form.auth_list.length > 0) {
          this.$refs.tree.setCheckedKeys(this.value.auth_list);
        }
      });
    },
    submit() {
      this.form.auth_list = this.$refs.tree.getCheckedKeys();
      save(this.form).then(res => {
        this.$message.success({
          message: res.msg || "操作成功"
        });
        this.$emit("visibleChange", { getList: true, show: "" });
      });
    },
    close() {
      this.$emit("visibleChange", { getList: this.parentRefresh, show: "" });
    },
    closed() {
      Object.assign(this.$data, this.$options.data());
      this.$refs.tree.setCheckedKeys([]);
    }
  }
};
</script>
<style lang="less" scoped>
.tree {
  height: 420px;
  overflow-y: auto;
}
.el-tree-node__label {
  width: 100%;
  .tips {
    font-size: 12px;
    color: #999;
    padding-right: 15px;
  }
}
</style>