<template>
  <div class="H100 flex flexv">
    <div class="headBox flex">
      <div class="flex1" style="min-width: 15px"></div>

      <el-date-picker
        v-model="form.time"
        type="daterange"
        align="right"
        size="small"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        value-format="yyyy-mm-dd"
      >
      </el-date-picker>

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
      <!-- <el-input
        style="width: auto; max-width: 240px"
        size="small"
        clearable
        v-model="form.keyword"
        placeholder="请输入关键字查询"
      ></el-input> -->
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
            <!-- <el-form label-position="left" inline class="demo-divtable-expand">
              <el-form-item label="订单商品:" class="el-form-item"> -->
            <!-- <div class="lists">
                  <div class="items" v-for="(item,index) in props.row.orderGoods" :key="index"> 
                    <div class="img son"><img :src=" item.image || '../../assets/pic.png'" alt=""></div> 
                    <div class="son">{{item.goods_name}}</div> 
                    <div class="son">X {{item.num}}</div> 
                    <div class="son">$ {{(item.price)}}</div> 
                    </div>
                </div> -->
            <el-table
              :data="props.row.orderGoods"
              border
              align="center"
              style="width: 100%; text-align: center"
            >
              <el-table-column prop="image" align="center" label="购买数量">
                <el-image
                  slot-scope="scope"
                  class="image-box"
                  :src="scope.row.image"
                  :preview-src-list="[scope.row.image]"
                >
                  <div slot="error" class="image-error-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </el-table-column>
              <el-table-column
                prop="goods_name"
                align="center"
                label="商品名"
                width="180"
              >
              </el-table-column>
              <el-table-column
                prop="goods_num"
                align="center"
                label="商品型号"
                width="180"
              >
              </el-table-column>
              <el-table-column prop="num" align="center" label="购买数量">
              </el-table-column>
              <el-table-column prop="price" align="center" label="商品单价">
              </el-table-column>
            </el-table>

            <!-- </el-form-item>
            </el-form> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          label="订单编号"
          align="center"
          min-width="165px"
        ></el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          align="center"
          min-width="165px"
        ></el-table-column>
        <!-- <el-table-column
          prop="consignee"
          label="收货人"
          align="center"
          min-width="80px"
        ></el-table-column> -->
        <el-table-column
          prop="receive_tel"
          label="手机号"
          align="center"
          min-width="110px"
        ></el-table-column>
        <el-table-column
          prop="money"
          label="总金额"
          align="center"
          min-width="60px"
        ></el-table-column>
        <el-table-column
          prop="statusText"
          label="状态"
          align="center"
          min-width="80px"
        ></el-table-column>
        <el-table-column label="操作" align="center" min-width="170px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              plain
              round
              size="mini"
              @click="
                infoDialog = { show: 'orderedit', value: { form: scope.row } }
              "
              >订单详情</el-button
            >

            <el-button
              v-if="scope.row.status == 2"
              type="danger"
              plain
              round
              size="mini"
              @click="
                infoDialog = {
                  show: 'confirm',
                  value: { form: scope.row, PostList: PostList },
                }
              "
              >发货</el-button
            >
            <el-button
              v-if="scope.row.status == 3"
              type="danger"
              plain
              round
              size="mini"
              @click="
                infoDialog = { show: 'confirm', value: { form: scope.row } }
              "
              >修改</el-button
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

    <orderedit
      :show="infoDialog.show"
      :value="infoDialog.value"
      @visibleChange="InfoVisibleChange"
    ></orderedit>
    <confirm
      :show="infoDialog.show"
      :value="infoDialog.value"
      @visibleChange="InfoVisibleChange"
    ></confirm>
  </div>
</template>
<script>
import { orderList as getList, getPostType } from "@/request/api.js";
import orderedit from "./components/order";
import confirm from "./components/confirm";
export default {
  name: "order",
  components: {
    orderedit,
    confirm,
  },
  watch: {
    "form.page"(val) {
      if (!val) return;
      this.getList();
    },
  },
  data() {
    return {
      // 日期选择
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: "",
      value2: "",
      //
      tableHeight: null,
      infoDialog: {
        show: "",
        value: {},
      },
      form: {
        status: "",
        page: 1,
        id: "",
        time: [],
      },
      statusList: [],
      PostList: [], //物流公司
      tableData: {},
    };
  },
  mounted() {
    this.tableHeight = this.$refs.tableBox.offsetHeight + "px";
    this.$ObjectMixed(this.form, this.$route.query);
    this.getStatusList();
    this.getList();
    this.getPostList();
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
      console.log(this.form)
      getList(this.form).then((res) => {
        this.tableData = res.data;
        console.log(res.data);
      });
    },
    getPostList() {
      getPostType(this.form).then((res) => {
        this.PostList = res.data;
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
      // getStatus({ class: "Order", const: "STATUS" }).then((res) => {
      //   this.statusList = res.data;
      // });
    },
  },
};
</script>
<style lang="less" scoped>
  /deep/ .el-range-separator{
 padding: 0px;
}
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