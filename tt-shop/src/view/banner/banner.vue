<template>
  <div class="H100 flex flexv">
    <div class="headBox flex">
      <el-button
        size="small"
        type="primary"
        @click="infoDialog={show:'bannersave',value:{form:{},typeList:typeList}}"
      >添加轮播</el-button>
      <div class="flex1" style="min-width:15px;"></div>

       <!-- <el-select
        size="small"
        style="margin-right:15px;width:120px;"
        clearable
        v-model="form.status"
        placeholder="请选择状态"
      > 
        <el-option
          v-for="(item,index) in statusList"
          :key="index"
          :label="item[1]"
          :value="item[0]"
        ></el-option>
      </el-select> -->
      <!-- <el-input
        style="width:auto;max-width:240px;"
        size="small"
        clearable
        v-model="form.key"
        placeholder="请输入关键字查询"
      ></el-input> -->
      <!-- <el-button size="small" type="primary" class="ml15" @click="getList">筛选</el-button> -->
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
        <el-table-column prop="title" label="轮播图片标题" align="center" min-width="150px"></el-table-column>
        <el-table-column prop="create_time" label="创建时间" align="center" min-width="155px"></el-table-column>
        <el-table-column prop="type" label="类别" align="center" min-width="120px"></el-table-column>

                <!-- 缩略图 -->
        <el-table-column
          prop="cover"
          label="图片"
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

                <el-table-column align="center" label="状态" min-width="60px">
          <el-switch
            slot-scope="scope"
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="2"
            @change="changeStatus(scope.row)"
          ></el-switch>
        </el-table-column>
        
        <el-table-column label="操作" align="center" min-width="140px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              plain
              round
              size="mini"
              @click="infoDialog={show:'bannersave',value:{form:scope.row,typeList:typeList}}"
            >详情</el-button>
             <el-button type="danger" plain round size="mini" @click="del(scope.row)">删除</el-button>
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
    <bannerSave
      :show="infoDialog.show"
      :value="infoDialog.value"
      @visibleChange="InfoVisibleChange"
    ></bannerSave>
  </div>
</template>
<script>
import { bannerList as getList,bannersave,setBanner } from "@/request/api.js";

import bannerSave from "./bannerSave";
export default {
  name: "bannerList",
  components: {
    bannerSave
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
        key:"",
        status: "",
        page: 1
      },
      statusList: [],
      typeList:[
        {k:"webview",v:"外部网址/webview"},
        {k:"path",v:"内部页面/path"},
        {k:"modal",v:"弹窗/modal"},

      ],
      tableData: {}
    };
  },
  mounted() {
    this.tableHeight = this.$refs.tableBox.offsetHeight + "px";
    this.$ObjectMixed(this.form, this.$route.query);
    this.getList();
  },
  beforeRouteUpdate(to, from, next) {
    Object.assign(this.$data, this.$options.data());
    this.getList();
    next();
  },
  methods: {
    del(val) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          setBanner({ id: val.id, mode: "del" }).then(res => {
                  this.getList()
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getList() {
      getList(this.form).then(res => {
        this.tableData = res;
        console.log(res.data);
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
      setBanner({ id: row.id ,mode:'status'}).then(res => {
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