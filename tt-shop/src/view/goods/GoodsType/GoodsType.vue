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
      width="700px"
    >
      <el-form class="form-box" size="mini" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="分类名称"
              ><el-input
                v-model="form.name"
                placeholder="请输入商品名称"
                clearable
              ></el-input
            ></el-form-item>
          </el-col>

          <!-- 单图上传 -->
          <el-col :span="24">
            <el-form-item label="图标">
              <div class="ali-c">
                <el-upload
                  class="upload-box"
                  name="upload_file"
                  :action="uploadcover.url"
                  :data="{ token: uploadcover.token }"
                  :show-file-list="false"
                  :on-success="uploadCover"
                >
                  <img v-if="form.icon" :src="form.icon" class="avatar" />
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
                  封面图片尺寸:宽:100像素,高:100像素.
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
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
import { API_URL, editCate } from "@/request/api.js";

import ElImageViewer from "element-ui/packages/image/src/image-viewer";

export default {
  name: "goodedit",
  components: {
    ElImageViewer,
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
        this.uploadcover.token = this.$store.getters.getToken;
        console.log(this.value);
        this.typeList = this.value.typeList;
        this.form.pid = this.value.pid;
        // if(this.value.pid != 0 && this.value.pid != undefined){
        //     this.isSon = true;
        // }
      }
    },
    content(val) {
      this.form.desc = val;
    },
  },
  data() {
    return {
        isSon:false,
      activeName: "first",
      classifyList: [],
      typeList: [],
      viewIndex: -1,
      content: "",
      uploadcover: {
        url: API_URL + "admin/upload",
        token: "",
      },
      form: {
        token: "",
        id: "",
        name: "",
        icon: "",
        pid: "",
      },
    };
  },
  methods: {
       //   所属分类选择
      checkType(value){
       this.form.pid = value;
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
      editCate(this.form).then((res) => {
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
      this.form.icon = res.data;
    },

    uploadResources(res) {
      console.log(res);
      if (res.code != 1) {
        this.$message.error({
          message: res.msg || "未知错误",
        });
      } else {
        this.form.goods_image.push(res.data);
      }
      this.$message.success({
        message: "上传成功",
      });
    },

    uploadResources2(res) {
      console.log(res);
      if (res.code != 1) {
        this.$message.error({
          message: res.msg || "未知错误",
        });
      } else {
        this.form.info_images.push(res.data);
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
