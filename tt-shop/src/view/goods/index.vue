<template>
  <div class="H100 flex flexv">
    <div class="headBox flex">
      <el-button
        size="small"
        type="primary"
        @click="infoDialog = { show: 'goodedit', value: { form: {},optionss:optionss,supplierList:supplierList,postage_tplList:postage_tplList } }"
        >添加商品</el-button
      >
      <div class="flex1" style="min-width: 15px"></div>
      <el-select
        size="small"
        style="margin-right: 15px; width: 120px"
        clearable
        v-model="form.status"
        placeholder="请选择状态"
      >
        <el-option label="上架" value="1"></el-option>
        <el-option label="下架" value="2"></el-option>
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
        <!-- <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品描述:">
                <span>{{ props.row.desc || "暂无" }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="title"
          label="商品名称"
          align="center"
          min-width="140px"
        ></el-table-column>
        <el-table-column
          prop="cateName"
          label="分类名称"
          align="center"
          min-width="140px"
        ></el-table-column>
        <!-- 缩略图 -->
        <el-table-column
          prop="cover"
          label="缩略图"
          class-name="image-conlum"
          align="center"
          min-width="80px"
        >
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
          prop="original_price"
          label="原价"
          align="center"
          min-width="65px"
        ></el-table-column>
        <el-table-column
          prop="price"
          label="单价"
          align="center"
          min-width="65px"
        ></el-table-column>
        <el-table-column
          prop="stock"
          label="库存"
          align="center"
          min-width="65px"
        ></el-table-column>
        <el-table-column
          prop="statusText"
          label="商品状态"
          align="center"
          min-width="100px"
        ></el-table-column>
        <el-table-column align="center" label="状态" min-width="65px">
          <el-switch
            slot-scope="scope"
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="2"
            @change="changeStatus(scope.row)"
          ></el-switch>
        </el-table-column>

        <el-table-column label="操作" align="center" min-width="145px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              plain
              round
              size="mini"
              @click="
                infoDialog = { show: 'goodedit', value: { form: scope.row,optionss:optionss,supplierList:supplierList,postage_tplList:postage_tplList } }
              "
              >详情</el-button
            >

            <!-- <el-button type="danger" plain round size="mini" @click="del(scope.row)">删除</el-button> -->
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
import goodedit from "./components/good";
import { goodList, getStatus, setGoods ,getCate,supplier,postage} from "@/request/api.js";
export default {
  name: "resources",
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
        status: "",
        page: 1,
      },
      optionss:[],
      statusList: [{ 1: "上架", 2: "上架" }],
      supplierList:[],
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
    getList() {
      goodList(this.form).then((res) => {
        this.tableData = res.data;
        console.log(res.data);
      });
      // 分类列表
      getCate({}).then(res => {
        this.optionss = res.data.data;
      })
      //供货商
      supplier({}).then(res => {
        this.supplierList = res.data.data;
      })
      //邮费模板
      postage({}).then(res => {
        this.postage_tplList = res.data.data;
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