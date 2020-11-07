<template>
  <div class="H100 flex flexv">
    <div class="headBox flex">
      <el-button
        size="small"
        type="primary"
        @click="infoDialog = { show: 'saveSupplier', value: { form: {},cities:cities } }"
        >添加邮费模板</el-button
      >
      <div class="flex1" style="min-width: 15px"></div>
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
          prop="name"
          label="模板名称"
          align="center"
          min-width="140px"
        ></el-table-column>
        <el-table-column
          prop="is_free"
          label="是否包邮"
          align="center"
          min-width="140px"
        ></el-table-column>
        <el-table-column
          prop="condition"
          label="是否指定条件包邮"
          align="center"
          min-width="140px"
        ></el-table-column>

        <el-table-column label="操作" align="center" min-width="145px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              plain
              round
              size="mini"
              @click="infoDialog = { show: 'saveSupplier', value: { form: scope.row,cities:cities } }"
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
    <saveSupplier
      :show="infoDialog.show"
      :value="infoDialog.value"
      @visibleChange="InfoVisibleChange"
    ></saveSupplier>
  </div>
</template>
<script>
import saveSupplier from "./PostMoney.vue";
import { postage ,getArea} from "@/request/api.js";
export default {
  name: "resources",
  components: {
    saveSupplier,
  },
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
        page: 1,
      },
      cities:[],
      statusList: [{ 1: "上架", 2: "上架" }],
      tableData: {},
    };
  },
  mounted() {
    this.tableHeight = this.$refs.tableBox.offsetHeight + "px";
    this.$ObjectMixed(this.form, this.$route.query);
    this.getStatusList();
    this.getList();
    this.getArea()
  },
  beforeRouteUpdate(to, from, next) {
    Object.assign(this.$data, this.$options.data());
    this.getStatusList();
    this.getList();
    next();
  },
  methods: {
    getList() {
      postage(this.form).then((res) => {
        this.tableData = res.data;
        console.log(res.data);
      });
    },
    // 获取城市
    getArea(){
          getArea({}).then(res => {
              this.cities = res.data;
          })
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
      // getStatus({ class: "Goods", const: "STATUS" }).then(res => {
      //   console.log(res.data)
      //   this.statusList = res.data;
      // });
    },
    changeStatus(row) {
      setGoods({ id: row.id, mode: "status" }).then((res) => {
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
.table {
  .image-box {
    width: 42px;
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