<template>
  <div class="upload-box">

<ul class="el-upload-list el-upload-list--picture-card flex flex-wrap">
                    <el-upload
                      class="upload-box"
                      style="margin-right:8px;margin-bottom:8px;"
                      name="upload_file"
                      :action="uploadData.url"
                      :data="{token:uploadData.token}"
                      :show-file-list="false"
                      :on-success="uploadImages"
                    >
                      <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <li
                      class="el-upload-list__item"
                      v-for="(item,index) in form.images"
                      :key="index"
                    >
                      <img class="el-upload-list__item-thumbnail" :src="item" alt />
                      <span class="el-upload-list__item-actions">
                        <span class="el-upload-list__item-preview" @click="viewIndex = index">
                          <i class="el-icon-zoom-in"></i>
                        </span>
                        <span class="el-upload-list__item-delete" @click="removeImages(index)">
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </li>
                  </ul>







    <el-upload
      class="upload-box"
      :action="uploadData.url"
      :data="{token:uploadData.token}"
      :on-success="uploadImages"
      :fileList="list"
      list-type="picture-card"
    >
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" class="111" slot-scope="{file}">
        <img class="el-upload-list__item-thumbnail" :src="file" alt />
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePreview(file)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-image-viewer
      v-if="viewIndex > -1"
      :on-close="viewIndex = -1"
      :url-list="list"
      :initialIndex="viewIndex"
    />
  </div>
</template>

<script>
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import { API_URL } from "@/request/api.js";
export default {
  name: "uploadImage",
  data() {
    return {
      uploadData: {
        url: API_URL + "admin/upload",
        token: ""
      },
      viewIndex: -1,
      list: []
    };
  },
  props: {
    value: {
      type: [Array, String],
      default: []
    }
  },
  created() {
    if (typeof this.value !== "string") {
      this.list = this.value;
    } else {
      this.list = [this.value];
    }
  },
  watch: {
    value: (val, old) => {
      if (typeof val !== "string") {
        this.list = val;
      } else {
        this.list = [val];
      }
    }
  },
  methods: {
    uploadImages(res) {
      if (res.code !== 1) {
        this.$message.error({ message: res.msg || "未知错误" });
      } else {
        this.list.push(res.data);
        this.$emit("change", this.list);
      }
    },
    handlePreview(index) {
      this.viewIndex = index;
    },
    handleRemove(index) {
      this.list.splice(index, 1);
      this.$emit("change", this.list);
    }
  }
};
</script>

<style lang='less' scoped>
</style>