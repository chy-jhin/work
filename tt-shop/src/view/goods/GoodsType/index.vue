<template>
  <div class="H100 flex flexv">
    <div class="headBox flex">
      <el-button
        size="small"
        type="primary"
        @click="infoDialog = { show: 'goodedit', value: { form: {},typeList:typeList } }"
        >添加分类</el-button
      >
      <div class="flex1" style="min-width: 15px"></div>
      <el-select
        size="small"
        style="margin-right: 15px; width: 120px"
        clearable
        v-model="form.status"
        placeholder="请选择状态"
      >
        <el-option label="有效" value="1"></el-option>
        <el-option label="无效" value="2"></el-option>
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
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table
              :data="props.row.sub"
              border
              align="center"
              style="width: 100%; text-align: center"
            >
              <el-table-column
                prop="name"
                align="center"
                label="子分类名称"
                width="250"
              >
              </el-table-column>
              <el-table-column prop="id" align="center" label="子分类id">

              </el-table-column>
                              <el-table-column prop="icon" align="center" label="子分类图标">
                  <el-image
                    slot-scope="scope"
                    class="image-box"
                    :src="scope.row.icon"
                    :preview-src-list="[scope.row.icon]"
                  >
                    <div slot="error" class="image-error-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </el-table-column>
                <el-table-column label="操作" align="center" min-width="150px">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      plain
                      round
                      size="mini"
                      @click="
                        infoDialog = {
                          show: 'goodedit',
                          value: { form: scope.row,typeList:typeList},
                        }
                      "
                      >编辑</el-button
                    >
                  </template>
                </el-table-column>
            </el-table>

            <!-- </el-form-item>
            </el-form> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="分类名称"
          align="center"
          min-width="165px"
        ></el-table-column>
        <el-table-column
          prop="id"
          label="分类id"
          align="center"
          min-width="165px"
        ></el-table-column>
                                      <el-table-column prop="icon" align="center" label="分类图标">
                  <el-image
                    slot-scope="scope"
                    class="image-box"
                    :src="scope.row.icon"
                    :preview-src-list="[scope.row.icon]"
                  >
                    <div slot="error" class="image-error-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </el-table-column>

        <el-table-column align="center" label="状态" min-width="65px">
          <el-switch
            slot-scope="scope"
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="2"
            @change="changeStatus(scope.row)"
          ></el-switch>
        </el-table-column>

        <el-table-column label="操作" align="center" min-width="180px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              plain
              round
              size="mini"
              @click="
                infoDialog = { show: 'goodedit', value: { form: scope.row, } }
              "
              >编辑</el-button>

                          <el-button
              type="primary"
              plain
              round
              size="mini"
              @click="
                infoDialog = { show: 'goodedit', value: { pid: scope.row.id } }
              "
              >添加子分类</el-button>
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

    <goodedit
      :show="infoDialog.show"
      :value="infoDialog.value"
      @visibleChange="InfoVisibleChange"
    ></goodedit>
  </div>
</template>
<script>
import { getCate as getList, cateStatus } from "@/request/api.js";
import goodedit from "./GoodsType.vue";
export default {
  name: "order",
  components: {
    goodedit,
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
        keyword: "",
        status: "",
        key: "",
        page: 1,
      },
      statusList: [],
      typeList:[],
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
    del(val) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          setResource({ id: val.id, mode: "del" }).then((res) => {
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    getList() {
      getList(this.form).then((res) => {
        this.tableData = res.data;
        this.typeList = res.data.data;
        console.log(res.data);
      });
    },
    changeStatus(row) {
      cateStatus({ id: row.id, mode: "status" }).then((res) => {
        if (res.code != 1) {
          row.status = row.status == 1 ? 2 : 1;
          this.$message.error({
            message: res.msg || "未知错误",
          });
        }
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
    //   getStatus({ class: "Order", const: "STATUS" }).then((res) => {
    //     this.statusList = res.data;
    //   });
    },
  },
};
</script>
<style lang="less" scoped>
.el-form-item,
.el-form-item__content {
  width: 100%;
}
.lists {
  width: 100%;
  .items {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-content: center;
    .son {
      margin-right: 30px;
      display: flex;
      align-items: center;
    }
    .img {
      width: 100px;
      img {
        width: 100%;
      }
    }
  }
}

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