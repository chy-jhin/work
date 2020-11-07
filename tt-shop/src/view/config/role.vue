<template>
  <div class="H100 flex flexv">
    <div class="headBox flex">
      <el-button size="small" type="primary" @click="infoDialog.show = 'newsSave'">发布文章</el-button>
      <div class="flex1" style="min-width:15px;"></div>

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
        :data="tableData"
        :height="tableHeight"
        size="mini"
        border
        stripe
        class="table"
        style="width:100%;"
      >
        <el-table-column prop="id" label="角色编号" align="center" width="100px"></el-table-column>
        <el-table-column prop="name" label="角色名称" align="center"></el-table-column>

        <el-table-column align="center" label="状态" width="80px">
          <el-switch
            slot-scope="scope"
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="2"
            @change="changeStatus(scope.row)"
          ></el-switch>
        </el-table-column>
        <el-table-column label="操作" align="center" width="350px">
          <template slot-scope="scope">
            <el-button @click="infoDialog={show:'newsSave',value:scope.row}" round size="mini">编辑</el-button>
            <el-popconfirm
              style="margin-left:10px;"
              title="确定删除吗？"
              @onConfirm="NewsDel(scope.row,scope.$index)"
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
    <!-- <newsSave :show="infoDialog.show" :value="infoDialog.value" @visibleChange="InfoVisibleChange"></newsSave> -->
  </div>
</template>
<script>
import {
  role as getList,
  roleStatus as status,
  roleDel as del
} from "@/request/api.js";
// import newsSave from "./components/newsSave";
export default {
  name: "role",
  components: {
    // newsSave
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
      infoDialog: {
        show: "",
        value: {}
      },
      form: {
        key: "",
        page: 1
      },
      tableData: []
    };
  },
  mounted() {
    this.tableHeight = this.$refs.tableBox.offsetHeight + "px";
    this.getList();
  },
  methods: {
    getList() {
      getList(this.form).then(res => {
        //   console.log(res)
        this.tableData = res.data;
      });
    },
    InfoVisibleChange(e) {
      if (!e.show) {
        this.infoDialog.value = {};
        this.infoDialog.show = "";
      }
      if (e.getList) {
        this.getList();
      }
    },
    changeStatus(row) {
      NewsStatus({ id: row.id }).then(res => {
        if (res.code != 1) {
          row.status = row.status == 1 ? 2 : 1;
          this.$message.error({
            message: res.msg || "未知错误"
          });
        }
      });
    },
    NewsTop(row) {
      NewsTop({ id: row.id }).then(res => {
        this.getList();
      });
    },
    NewsDel(row, index) {
      NewsDel({ id: row.id }).then(res => {
        this.tableData.splice(index, 1);
      });
    },
    NewsSort(row) {
      NewsSort({ id: row.id }).then(res => {
        this.getList();
      });
    }
  }
};
</script>
<style lang="less" scoped>
.table {
  .image-box {
    width: 60px;
    height: 42px;
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