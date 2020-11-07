<template>
  <div>
    <el-dialog
      title="查看订单"
      :visible="show === $options.name"
      :close-on-click-modal="false"
      append-to-body
      @close="close"
      @closed="closed"
      width="540px"
    >
      <el-form class="form-box" size="mini" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="供货商" label-width="80px"
              ><el-input
                v-model="form.name"
                placeholder="请输入供货商名称"
                clearable
              ></el-input
            ></el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="联系方式" label-width="80px"
              ><el-input
                v-model="form.mobile"
                placeholder="请输入联系方式"
                clearable
              ></el-input
            ></el-form-item>
          </el-col>

            <el-col :span="12">
            <el-form-item style="width:50%;display:inline-block" label="启用状态">
              <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
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
  </div>
</template>
<script>
import { API_URL, saveSupplier } from "@/request/api.js";

import ElImageViewer from "element-ui/packages/image/src/image-viewer";

export default {
  name: "saveSupplier",
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
  watch: {
    show(val) {
      if (val === this.$options.name) {
        this.$ObjectMixed(this.form, this.value.form);
        // this.form = this.value.form;
        console.log(this.value);
        // this.PostName = this.value.PostList;
      }
    },
  },
  data() {
    return {
      PostName: [],
      isdisabled: true,
      viewIndex: -1,
      uploadcover: {
        url: API_URL + "admin/upload",
        token: "",
      },
      form: {
        id:"",
        token: "",
        name: "",
        status: "",
        mobile: "",
      },
    };
  },
  methods: {
    viewIndexClose() {
      this.viewIndex = -1;
    },
    submit() {
      saveSupplier(this.form).then(res => {
      	this.$message.success({
      		message: res.msg || '操作成功'
      	});
      	this.$emit('visibleChange', { getList: true, show: '' });
      });
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
