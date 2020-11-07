<template>
  <div class="H100 flex flexv">
    <div class="headBox flex">
      <div class="flex1" style="min-width: 15px"></div>
      <el-select
        size="small"
        style="margin-right: 15px; width: 120px"
        clearable
        v-model="form.status"
        placeholder="请选择状态"
      >
        <el-option
          v-for="(item, index) in statusList"
          :key="index"
          :label="item[1]"
          :value="item[0]"
        ></el-option>
      </el-select>
      <el-input
        style="width: auto; max-width: 240px"
        size="small"
        clearable
        v-model="form.keyword"
        placeholder="请输入关键字查询"
      ></el-input>
      <el-button size="small" type="primary" class="ml15" @click="getList"
        >筛选</el-button
      >
    </div>
    <el-divider></el-divider>
    <div ref="tableBox" class="flex1">
      <el-table
        :data="tableData.data"
        :height="tableHeight"
        border
        stripe
        class="table"
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="用户编号"
          align="center"
          min-width="100px"
        ></el-table-column>
        <el-table-column
          prop="nickname"
          label="昵称"
          show-overflow-tooltip
          align="center"
          min-width="120px"
        ></el-table-column>
        <el-table-column
          prop="image"
          label="头像"
          align="center"
          class-name="image-conlum"
          min-width="60px"
        >
          <el-avatar
            slot-scope="scope"
            :size="36"
            :src="scope.row.nickname"
          ></el-avatar>
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号"
          align="center"
          min-width="120px"
        ></el-table-column>
        <el-table-column align="center" label="用户状态" min-width="60px">
          <el-switch
            slot-scope="scope"
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="2"
            @change="changeStatus(scope.row)"
          ></el-switch>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="注册时间"
          align="center"
          min-width="160px"
        ></el-table-column>
        <el-table-column label="操作" align="center" min-width="100px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              plain
              round
              size="mini"
              @click="infoDialog = { show: 'memberSave', value: scope.row }"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      style="margin-top: 15px"
      background
      layout="prev, pager, next"
      :current-page.sync="form.page"
      :page-size="tableData.per_page"
      :page-count="tableData.last_page"
      :total="tableData.total"
    ></el-pagination>
    <!-- <memberSave
      :show="infoDialog.show"
      :value="infoDialog.value"
      @visibleChange="InfoVisibleChange"
    ></memberSave> -->
  </div>
</template>
<script>
import { member as getList, getStatus, memberSave } from "@/request/api.js";

// import memberSave from "@/view/member/components/memberSave";
export default {
  name: "member",
  // components: {
  //   memberSave
  // },
  watch: {
    "form.page"(val) {
      if (!val) return;
      this.getList();
    },
  },
  data() {
    return {
      tableHeight: null,
      infoDialog: {
        show: "",
        value: {},
      },
      form: {
        status: "",
        key: "",
        page: 1,
      },
      statusList: [],
      tableData: {},
    };
  },
  mounted() {
    this.tableHeight = this.$refs.tableBox.offsetHeight + "px";
    this.$ObjectMixed(this.form, this.$route.query);
    this.getStatusList();
    this.getList();
  },
  beforeRouteUpdate(to, from, next) {
    Object.assign(this.$data, this.$options.data());
    this.getStatusList();
    this.getList();
    next();
  },
  methods: {
    memberSave(row) {
      this.infoDialog.value = { form: row, statusList: this.statusList };
      this.infoDialog.show = "memberSave";
    },
    getList() {
      getList(this.form).then((res) => {
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
    getStatusList() {
      getStatus({ class: "User", const: "STATUS" }).then((res) => {
        this.statusList = res.data;
      });
    },
    changeStatus(row) {
      memberSave({ id: row.id, mode: "status" }).then((res) => {
        if (res.code != 1) {
          row.status = row.status == 1 ? 2 : 1;
          this.$message.error({
            message: res.msg || "未知错误",
          });
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
</style>