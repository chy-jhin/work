<template>
  <div>
    <el-dialog
      :visible="show === $options.name"
      :close-on-click-modal="false"
      @close="close"
      append-to-body
      @closed="closed"
      width="720px"
    >
      <div slot="title" class="ali-c">
        <span class="el-dialog__title flex1">角色管理</span>
        <el-button size="small" type="primary" class="ml15" @click="infoDialog.show='roleSave'">添加角色</el-button>
        <el-popconfirm
          style="margin-left:10px;"
          title="刷新权限将导致不可预期的后果，确定刷新吗？"
          @onConfirm="refreshAuth"
        >
          <el-button slot="reference" type="warning" size="small">刷新权限</el-button>
        </el-popconfirm>
        <div style="width:48px;"></div>
      </div>
      <el-table size="mini" border class="table" :data="list" height="447px" style="width: 100%;">
        <el-table-column align="center" prop="id" label="角色ID"></el-table-column>
        <el-table-column align="center" prop="name" label="角色名称"></el-table-column>
        <el-table-column align="center" label="状态" width="80px">
          <el-switch
            slot-scope="scope"
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="2"
            @change="changeStatus(scope.row)"
          ></el-switch>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="infoDialog={show:'roleSave',value:scope.row}"
              plain
              round
              size="mini"
            >查看详情</el-button>
            <el-popconfirm
              style="margin-left:10px;"
              title="确定删除吗？"
              @onConfirm="del(scope.row,scope.$index)"
            >
              <el-button slot="reference" round plain type="danger" size="mini">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <roleSave :show="infoDialog.show" :value="infoDialog.value" @visibleChange="InfoVisibleChange"></roleSave>
  </div>
</template>
<script>
import {
  role as getList,
  roleDel as del,
  roleStatus,
  roleRefresh
} from "@/request/api.js";
import roleSave from "./roleSave";
export default {
  name: "roles",
  components: {
    roleSave
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
        this.list = this.value.roleList;
        // this.getList();
      }
    }
  },
  data() {
    return {
      infoDialog: {
        show: "",
        value: {}
      },
      parentRefresh: false,
      list: []
    };
  },

  methods: {
    del(row, index) {
      del({ id: row.id }).then(res => {
        this.parentRefresh = true;
        this.list.splice(index, 1);
      });
    },
    getList() {
      getList({}).then(res => {
        this.list = res.data;
      });
    },
    changeStatus(row) {
      status({ id: row.id }).then(res => {
        if (res.code != 1) {
          row.status = row.status == 1 ? 2 : 1;
          this.$message.error({
            message: res.msg || "未知错误"
          });
        } else {
          this.parentRefresh = true;
        }
      });
    },
    InfoVisibleChange(e) {
      if (!e.show) {
        this.infoDialog.value = {};
        this.infoDialog.show = "";
      }
      if (e.getList) {
        this.parentRefresh = true;
        this.getList();
      }
    },
    close() {
      this.$emit("visibleChange", { getList: this.parentRefresh, show: "" });
    },
    closed() {
      Object.assign(this.$data, this.$options.data());
    },
    refreshAuth() {
      roleRefresh({}).then(res => {
        this.$message.success({
          message: "刷新成功"
        });
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>