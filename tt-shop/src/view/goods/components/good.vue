<template>
  <div>
    <el-dialog
      class="mydialog"
      :title="!form.id ? '添加商品' : '修改商品'"
      :visible="show === $options.name"
      :close-on-click-modal="false"
      append-to-body
      @close="close"
      @closed="closed"
      width="1024px"
    >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="商品信息" name="first">
          <el-form class="form-box" size="mini" label-width="80px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="商品名称"
                  ><el-input
                    v-model="form.title"
                    style="width: 400px"
                    placeholder="请输入商品名称"
                    clearable
                  ></el-input
                ></el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="销量"
                  ><el-input
                    v-model="form.sales"
                    style="width: 150px"
                    placeholder="请设置商品销量"
                    clearable
                  ></el-input
                ></el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="库存"
                  ><el-input
                    v-model="form.stock"
                     style="width: 150px"
                    placeholder="请设置商品库存"
                    clearable
                  ></el-input
                ></el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="所属分类">
                  <el-cascader
                    :options="optionss"
                    v-model="form.cate"
                     style="width: 150px"
                    :props="{
                      expandTrigger: 'hover',
                      label: 'name',
                      value: 'id',
                      children: 'sub',
                    }"
                    @change="handleChange"
                  ></el-cascader>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="供货商">
                  <el-select
                    clearable
                    v-model="form.supplier"
                     style="width: 150px"
                    placeholder="请选择供货商"
                  >
                    <el-option
                      v-for="(item, index) in supplierList"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="包邮模板">
                  <el-select
                    clearable
                    v-model="form.postage_tpl"
                     style="width: 150px"
                    placeholder="请选择模板"
                  >
                    <el-option
                      v-for="(item, index) in postage_tplList"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="商品原价"
                  ><el-input
                    v-model="form.original_price"
                     style="width: 150px"
                    placeholder="请输入价格"
                    clearable
                  ></el-input
                ></el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="是否上架">
                  <el-switch
                    v-model="form.status"
                    :active-value="1"
                    :inactive-value="2"
                  ></el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否海外">
                  <el-switch
                    v-model="form.is_abroad"
                    :active-value="1"
                    :inactive-value="2"
                  ></el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="国家名称"
                  ><el-input
                    v-model="form.country"
                     style="width: 150px"
                    placeholder="请输入国家"
                    clearable
                  ></el-input
                ></el-form-item>
              </el-col>

              <!-- 单图上传 -->
              <el-col :span="24">
                <el-form-item label="缩略图">
                  <div class="ali-c">
                    <el-upload
                      class="upload-box"
                      name="upload_file"
                      :action="uploadcover.url"
                      :data="{ token: uploadcover.token }"
                      :show-file-list="false"
                      :on-success="uploadCover"
                    >
                      <img v-if="form.image" :src="form.image" class="avatar" />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <div
                      style="
                        margin-left: 15px;
                        color: #ccc;
                        font-size: 12px;
                        line-height: 1.5;
                      "
                    >
                      封面图片尺寸:宽:160像素,高:160像素.
                    </div>
                  </div>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="轮播图">
                  <div class="flex upload-images-box">
                    <div class="upload-box flex-wrap">
                      <ul
                        class="el-upload-list el-upload-list--picture-card flex flex-wrap"
                      >
                        <el-upload
                          class="upload-box"
                          style="margin-right: 8px; margin-bottom: 8px"
                          name="upload_file"
                          :action="uploadcover.url"
                          :data="{ token: uploadcover.token }"
                          :show-file-list="false"
                          :on-success="uploadResources"
                        >
                          <i class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <li
                          class="el-upload-list__item"
                          v-for="(item, index) in form.banner"
                          :key="index"
                        >
                          <img
                            class="el-upload-list__item-thumbnail"
                            :src="item.url"
                            alt
                          />
                          <span class="el-upload-list__item-actions">
                            <span
                              class="el-upload-list__item-preview"
                              @click="viewIndex = index"
                              ><i class="el-icon-zoom-in"></i
                            ></span>
                            <span
                              class="el-upload-list__item-delete"
                              @click="removeImages(index)"
                              ><i class="el-icon-delete"></i
                            ></span>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="添加型号" name="second">
          <el-table
            :data="form.sku"
            border
            height="480"
            size="small"
            class="sku_table"
            style="width: 100%"
          >
            <el-table-column label="型号">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.name"
                  size="mini"
                  :disabled="scope.$index !== editIndex"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="价格">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.price"
                  size="mini"
                  :disabled="scope.$index !== editIndex"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="重量">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.weight"
                  size="mini"
                  style="width: 100px"
                  :disabled="scope.$index !== editIndex"
                ></el-input>
                <span> kg</span>
              </template>
            </el-table-column>
            <el-table-column align="center">
              <template slot="header">
                <el-button size="mini" type="primary" @click="addGoods"
                  >新增型号</el-button
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
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="商品详情" name="three">
          <el-form class="form-box" size="mini" label-width="80px">
            <el-row>
              <!-- 商品详情 -->
              <wangEditor
                height="300px"
                width="300px"
                v-model="form.desc"
              ></wangEditor>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="close">取 消</el-button>
        <el-button size="medium" type="primary" @click="submit"
          >提 交</el-button
        >
      </div>
      <el-image-viewer
        v-if="viewIndex >= 0"
        :on-close="viewIndexClose"
        :url-list="this.form.goods_image"
        :initialIndex="viewIndex"
      ></el-image-viewer>
    </el-dialog>
  </div>
</template>
<script>
import { API_URL, addGoods, getCate } from "@/request/api.js";

import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import wangEditor from "@/components/wangEditor";

export default {
  name: "goodedit",
  components: {
    ElImageViewer,
    wangEditor,
  },
  props: {
    value: {
      type: Object,
    },
    show: {
      type: String,
    },
  },
  computed: {
    showvideo() {
      if (this.form.type != 1 && this.form.path != "") return true;
      return false;
    },
  },
  watch: {
    show(val) {
      if (val === this.$options.name) {
        this.$ObjectMixed(this.form, this.value.form);
        // this.uploadData.token = this.$store.getters.getToken;
        this.uploadcover.token = this.$store.getters.getToken;
        console.log(this.value);
        this.optionss = this.value.optionss;
        this.supplierList = this.value.supplierList;
        this.postage_tplList = this.value.postage_tplList;
      }
    },
    // content(val) {
    //   this.form.desc = val;
    // },
  },
  data() {
    return {
      activeName: "first",
      classifyList: [],
      supplierList: [],
      postage_tplList: [],
      editIndex: 0,
      typeList: [],
      viewIndex: -1,
      uploadcover: {
        url: API_URL + "admin/upload",
        token: "",
      },
      form: {
        token: "",
        id: "",
        title: "", //商品名称
        desc: "", //首页描述
        image: "", //首页缩略图
        stock: "", //库存
        supplier: "", //供货商
        is_abroad: 1, //是否海外
        country: "", //国家名称
        postage_tpl: "", //包邮模板
        sku: [], //型号数组
        sales: "", //销量
        status: 1, //是否下架
        is_top: 1, //是否推荐
        banner: [], //轮播
        cate: [],
        original_price: "", //原价
      },
      optionss: [],
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
      this.form.cate = value;
    },
    // 切换tab栏
    handleClick(tab, event) {
      console.log(tab, event);
      this.f_index = tab.index;
    },
    // 新增型号
    addGoods() {
      let data = { id: "", name: "", price: "", weight: "" };
      this.form.sku.push(data);
    },
    // 删除型号
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
        this.form.sku.splice(index, 1);
      });
    },
    // 切换资源类型
    typeChange(e) {
      if (e == 1) {
        this.form.path = [];
      } else {
        this.form.path = "";
      }
    },
    viewIndexClose() {
      this.viewIndex = -1;
    },
    // 文件上传
    handleRemove(file, fileList) {
      console.log("删除文件");
    },
    handlePreview(file) {
      console.log("上传文件");
    },

    removeImages(i) {
      this.$confirm("确定删除此图片吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.form.banner.splice(i, 1);
        })
        .catch(() => {});
    },

    submit() {
      console.log(this.form);
      addGoods(this.form).then((res) => {
        this.$message.success({
          message: res.msg || "操作成功",
        });
        this.$emit("visibleChange", { getList: true, show: "" });
      });
    },
    close() {
      this.$emit("visibleChange", { getList: false, show: "" });
    },
    closed() {
      Object.assign(this.$data, this.$options.data());
    },

    uploadCover(res) {
      this.form.image = res.data;
      console.log(this.form);
    },

    uploadResources(res) {
      console.log(res);
      if (res.code != 1) {
        this.$message.error({
          message: res.msg || "未知错误",
        });
      } else {
        let data = { url: res.data };
        this.form.banner.push(data);
      }
      this.$message.success({
        message: "上传成功",
      });
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
.sku_table {
  /deep/ input[disabled="disabled"] {
    border: 0;
    background-color: inherit;
    color: inherit;
    cursor: inherit;
  }
}
.sku_price {
  width: 120px;
}
.sku_weight {
  width: 80px;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
  overflow-y: hidden;
}
.addGoods {
  margin-bottom: 20px;
}
.el-scrollbar,
.el-scrollbar__wrap,
.el-scrollbar__view {
  white-space: nowrap;
}
.demo {
  padding: 20px 15px;
  width: 350px;
  height: 200px;
  border: 1px solid #eeeeee;
  border-radius: 12px;
  display: inline-block;
  margin-right: 30px;
  padding-bottom: 30px;
  position: relative;
  .delete {
    position: absolute;
    bottom: 10px;
    right: 30px;
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
