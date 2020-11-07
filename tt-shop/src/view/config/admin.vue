<template>
  <div class="H100 flex flexv">
    <div class="headBox ali-c">
      <el-button
        size="small"
        type="primary"
        @click="infoDialog={show:'adminSave',value:{form:{},roleList:roleList}}"
      >添加用户</el-button>
      <el-button
        size="small"
        type="success"
        @click="infoDialog={show:'roles',value:{roleList:roleList}}"
      >角色管理</el-button>
      <div class="flex1" style="min-width:15px;"></div>
      <el-select
        size="small"
        style="margin-right:15px;width:100px;"
        clearable
        v-model="form.role_id"
        placeholder="请选择角色名称"
      >
        <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-input
        style="width:auto;max-width:240px;"
        size="small"
        clearable
        v-model="form.key"
        placeholder="请输入关键字查询"
      ></el-input>
      <el-button size="small" type="primary" class="ml15" @click="getList">筛选</el-button>
    </div>
    <el-divider></el-divider>
    <div ref="tableBox" class="flex1">
      <el-table
        :data="tableData.data"
        :height="tableHeight"
        border
        stripe
        class="table"
        style="width:100%;"
      >
        <el-table-column prop="id" label="用户ID" align="center" min-width="80px"></el-table-column>
        <el-table-column prop="login_name" label="登陆账号" align="center" min-width="120px"></el-table-column>
        <el-table-column label="关联角色" align="center" min-width="80px">
          <template slot-scope="scope">
            <el-tag size="mini" v-for="(item,index) in scope.row.role_id_val" :key="index">{{item}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态" min-width="80px">
          <el-switch
            slot-scope="scope"
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="2"
            @change="changeStatus(scope.row)"
          ></el-switch>
        </el-table-column>
        <el-table-column prop="create_time" label="添加时间" align="center" min-width="155px"></el-table-column>
        <el-table-column label="操作" align="center" min-width="180px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="infoDialog={show:'adminSave',value:{form:scope.row,roleList:roleList}}"
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
    </div>

    <el-pagination
      style="margin-top:15px;"
      background
      layout="prev, pager, next"
      :current-page.sync="form.page"
      :page-size="tableData.per_page"
      :page-count="tableData.last_page"
      :total="tableData.total"
    ></el-pagination>

    <adminSave :show="infoDialog.show" :value="infoDialog.value" @visibleChange="InfoVisibleChange"></adminSave>
    <roles :show="infoDialog.show" :value="infoDialog.value" @visibleChange="InfoVisibleChange"></roles>
  </div>
</template>
<script>
import {
  admin as getList,
  adminDel as del,
  adminStatus as status,
  role
} from "@/request/api.js";
import adminSave from "./components/adminSave";
import roles from "./components/roles";
export default {
  name: "admin",
  components: {
    adminSave,
    roles
  },
  watch: {
    "form.page"(val) {
      if (!val) return;
      this.getList();
    }
  },
  data() {
    return {
      tableHeight: null,
      roleList: [],
      infoDialog: {
        show: "",
        value: {}
      },
      form: {
        key: "",
        role_id: "",
        page: 1
      },
      tableData: {}
    };
  },
  mounted() {
    this.tableHeight = this.$refs.tableBox.offsetHeight + "px";
    this.getRole();
    this.getList();
  },
  methods: {
    del(row, index) {
      del({ id: row.id }).then(res => {
        this.parentRefresh = true;
        this.getList();
      });
    },
    getRole() {
      role({}).then(res => {
        this.roleList = res.data;
      });
    },
    getList() {
      getList(this.form).then(res => {
        this.tableData = res.data.data;
      });
    },
    InfoVisibleChange(e) {
      if (!e.show) {
        this.infoDialog.value = {};
        this.infoDialog.show = "";
      }
      if (e.getList) {
        this.getRole();
        this.getList();
      }
    },
    changeStatus(row) {
      status({ id: row.id }).then(res => {
        if (res.code != 1) {
          row.status = row.status == 1 ? 2 : 1;
          this.$message.error({
            message: res.msg || "未知错误"
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.table {
  .image-box {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    /deep/.image-error-slot {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background: #eee;
      color: #ccc;
      font-size: 14px;
    }
  }
}
</style>