<template>
  <div>
    <el-dialog
      class="mydialog"
      :title="!form.id ? '添加邮费模板' : '修改邮费模板'"
      :visible="show === $options.name"
      :close-on-click-modal="false"
      append-to-body
      @close="close"
      @closed="closed"
      width="1024px"
    >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="模板配置" name="first">
          <el-form class="form-box" size="mini" label-width="80px">
            <el-row>
              <el-col :span="13">
                <el-form-item label="模板名称" label-width="80px"
                  ><el-input
                    v-model="form.name"
                    placeholder="请输入模板名称"
                    style="width: 300px"
                    clearable
                  ></el-input
                ></el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="是否包邮">
                  <el-switch
                    v-model="form.is_free"
                    :active-value="1"
                    :inactive-value="2"
                  ></el-switch>
                </el-form-item>
              </el-col>

              <el-col :span="13" v-if="form.is_free == 2">
                <el-form-item label="计价方式">
                  <el-radio-group v-model="form.mode" @change="checkType">
                    <el-radio :label="1">计件</el-radio>
                    <el-radio :label="2">称重</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col
                :span="12"
                style="padding-left: 12px"
                v-if="form.is_free == 2"
              >
                <el-checkbox v-model="form.condition"
                  >是否指定条件包邮</el-checkbox
                >
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="计费规则" name="second" v-if="form.is_free != 1">
          <el-table
            :data="form.rule"
            border
            height="480"
            size="small"
            class="sku_table"
            style="width: 100%"
          >
            <el-table-column label="计价方式">
              <template slot-scope="scope">
                <span>{{ scope.row.mode == 1 ? "计件" : "称重" }}</span>
              </template>
            </el-table-column>

            <el-table-column label="件数" v-if="form.mode == 1">
              <template slot-scope="scope">
                <el-input
                  style="width: 70px"
                  v-model="scope.row.num"
                  size="mini"
                  :disabled="scope.$index !== editIndex"
                ></el-input>
                <span> 件</span>
              </template>
            </el-table-column>
            <el-table-column v-if="form.mode == 2" label="重量">
              <template slot-scope="scope">
                <el-input
                  style="width: 70px"
                  v-model="scope.row.weight"
                  size="mini"
                  :disabled="scope.$index !== editIndex"
                ></el-input>
                <span> kg</span>
              </template>
            </el-table-column>
            <el-table-column label="费用">
              <template slot-scope="scope">
                <el-input
                  style="width: 70px"
                  v-model="scope.row.money"
                  size="mini"
                  :disabled="scope.$index !== editIndex"
                ></el-input>
                <span> 元</span>
              </template>
            </el-table-column>
            <el-table-column label="地区">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.cateName"
                  size="mini"
                  disabled
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column width="300" align="center">
              <template slot="header">
                <el-button size="mini" type="primary" @click="addGoods"
                  >新增规则</el-button
                >
              </template>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  v-if="editIndex == scope.$index"
                  @click="editIndex = -1"
                  >保存</el-button
                >
                <el-button size="mini" v-else @click="editIndex = scope.$index"
                  >编辑</el-button
                >

                <el-button
                  size="mini"
                  type="danger"
                  v-if="editIndex == scope.$index"
                  @click="editIndex = -1"
                  >取消</el-button
                >

                <el-button
                  size="mini"
                  type="danger"
                  v-else
                  @click="delete_goods(scope.$index)"
                  >删除</el-button
                >
                <el-button
                  size="mini"
                  type="primary"
                  @click="
                    infoDialog = {
                      show: 'checkCitys',
                      value: { form: scope.row, cities: cities },
                    }
                  "
                  >选择城市</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane
          label="包邮条件"
          name="third"
          v-if="form.is_free != 1"
        >
          <el-table
            :data="form.proviso"
            border
            height="480"
            size="small"
            class="sku_table"
            style="width: 100%"
          >
            <el-table-column label="类型">
              <template slot-scope="scope">

                <el-select
                  v-model="scope.row.type"
                  clearable
                  placeholder="请选择"
                  :disabled="scope.$index !== editIndex2"
                >
                  <el-option
                    v-for="item in types"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="包邮条件">
              <template slot-scope="scope">
                <el-input
                  style="width: 100px"
                  v-model="scope.row.condition"
                  size="mini"
                  :disabled="scope.$index !== editIndex2"
                ></el-input>
                <span>{{ scope.row.type == 1 ? "件" : "kg" }}</span>
              </template>
            </el-table-column>

            <el-table-column label="地区">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.cateName"
                  size="mini"
                  :disabled="scope.$index !== editIndex2"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column width="300" align="center">
              <template slot="header">
                <el-button size="mini" type="primary" @click="addGoods2"
                  >新增条件</el-button
                >
              </template>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  v-if="editIndex2 == scope.$index"
                  @click="editIndex2 = -1"
                  >保存</el-button
                >
                <el-button size="mini" v-else @click="editIndex2 = scope.$index"
                  >编辑</el-button
                >

                <el-button
                  size="mini"
                  type="danger"
                  v-if="editIndex2 == scope.$index"
                  @click="editIndex2 = -1"
                  >取消</el-button
                >

                <el-button
                  size="mini"
                  type="danger"
                  v-else
                  @click="delete_goods2(scope.$index)"
                  >删除</el-button
                >
                <el-button
                  size="mini"
                  type="primary"
                  @click="
                    infoDialog = {
                      show: 'checkCitys',
                      value: { form: scope.row, cities: cities },
                    }
                  "
                  >选择城市</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>

      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="close">取 消</el-button>
        <el-button size="medium" type="primary" @click="submit"
          >确 定</el-button
        >
      </div>
      <el-image-viewer
        v-if="viewIndex >= 0"
        :on-close="viewIndexClose"
        :url-list="this.form.path"
        :initialIndex="viewIndex"
      ></el-image-viewer>
    </el-dialog>
    <checkCitys
      :show="infoDialog.show"
      :value="infoDialog.value"
      @visibleChange="InfoVisibleChange"
    ></checkCitys>
  </div>
</template>
<script>
import { API_URL, postageInfo, editPostage } from "@/request/api.js";

import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import checkCitys from "./checkCitys.vue";

export default {
  name: "saveSupplier",
  components: {
    ElImageViewer,
    checkCitys,
  },
  props: {
    value: {
      type: Object,
    },
    show: {
      type: String,
    },
  },
  watch: {
    show: {
      handler(val) {
        if (val === this.$options.name) {
          this.$ObjectMixed(this.form, this.value.form);
        
          // this.form = this.value.form;
          console.log(this.value);
          this.cities = this.value.cities;
          if (this.form.id) {
            postageInfo({ id: this.form.id }).then((res) => {
              console.log("aaaaa");
              console.log(res.data);
              this.form = res.data;
            });
          }
          this.form.condition == 1
            ? (this.form.condition = true)
            : (this.form.condition = false);
            console.log(this.form)
        }
      },
      deep: true,
      immediate: true,
    },
    "form.mode"(val) {
      this.form.rule.forEach((res) => {
        res.mode = val;
      });
    },
  },

  data() {
    return {
      tableData: [],
      infoDialog: {
        show: "",
        value: {},
      },
      editIndex: 0,
      editIndex2: 0,
      PostName: [],
      types: [
        { value: 1, label: "计件" },
        { value: 2, label: "称重" },
      ],
      isdisabled: true,
      viewIndex: -1,
      activeName: "first",
      uploadcover: {
        url: API_URL + "admin/upload",
        token: "",
      },
      form: {
        id: "",
        token: "",
        name: "",
        mode: 1,
        is_free: 1,
        condition: 1,
        rule: [],
        proviso: [],
      },
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 新增规则
    addGoods() {
      let data = {
        id: "",
        num: "",
        weight: "",
        money: "",
        mode: this.form.mode,
        region: [],
      };
      this.form.rule.push(data);
    },
    // 新增条件
    addGoods2() {
      let data = { id: "", condition: "", type: 1, region: [] };
      this.form.proviso.push(data);
    },
    // 删除规则
    delete_goods(index) {
      this.$confirm("此操作将永久删除该选项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.form.rule.splice(index, 1);
      });
    },
    // 删除条件
    delete_goods2(index) {
      this.$confirm("此操作将永久删除该选项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.form.proviso.splice(index, 1);
      });
    },
    //计价方式
    checkType(value) {
      this.form.mode = value;
    },
    checkType2(value) {
      this.form.condition = value;
    },
    viewIndexClose() {
      this.viewIndex = -1;
    },
    submit() {
      this.form.condition == true
        ? (this.form.condition = 1)
        : (this.form.condition = 2);
      console.log(this.form);
      editPostage(this.form).then((res) => {
        this.$message.success({
          message: res.msg || "操作成功",
        });
        this.$emit("visibleChange", { getList: true, show: "" });
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
    close() {
      this.$emit("visibleChange", { getList: false, show: "" });
    },
    closed() {
      Object.assign(this.$data, this.$options.data());
    },
  },
};
</script>
<style lang="less" scoped>
.mydialog {
  /deep/ .el-dialog__body {
    padding-top: 0;
    padding-bottom: 0;
    .el-tab-pane {
      height: 480px;
      overflow-y: auto;
    }
  }
}
.image-box {
  width: 80px;
  height: 80px;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-right: 10px;
}
.upload-box {
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    border: 1px dashed #d9d9d9;
    border-radius: 4px;
  }
  .avatar {
    width: 100px;
    height: 125px;
  }
}
.upload-images-box {
  & /deep/ .el-upload-list__item {
    width: 80px;
    height: 80px;
  }
  & /deep/ .el-upload--picture-card {
    width: 80px;
    height: 80px;
    line-height: 80px;
  }
}
</style>
