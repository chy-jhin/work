<template>
  <div>
    <el-dialog
      :title="!form.id?'添加轮播':'修改轮播'"
      :visible="show === $options.name"
      :close-on-click-modal="false"
      append-to-body
      @close="close"
      @closed="closed"
      width="640px"
    >
      <el-form class="form-box" size="mini" label-width="150px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="轮播标题">
              <el-input v-model="form.title" style="width:250px;" placeholder="请输入标题" clearable></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item label="跳转链接">
              <el-input v-model="form.data" style="width:250px;" placeholder="请输入链接" clearable></el-input>
            </el-form-item>
          </el-col>
                    <el-col :span="24">
            <el-form-item label="备注">
              <el-input v-model="form.remake" style="width:250px;" placeholder="请输入备注" clearable></el-input>
            </el-form-item>
          </el-col>

                     <el-col :span="12">
            <el-form-item label="事件类型">
              <el-select size="small" style="width:250px;" v-model="form.type" placeholder="请选择类型">
                <el-option v-for="item in typeList" :key="item.k" :label="item.v" :value="item.k"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

 <!-- 单图上传 -->
          <el-col :span="24">
            <el-form-item label="轮播图片">
              <div class="ali-c">
                <el-upload
                  class="upload-box"
                  name="upload_file"
                  :action="uploadData.url"
                  :data="{token:uploadData.token}"
                  :show-file-list="false"
                  :on-success="uploadImage"
                >
                  <img v-if="form.image" :src="form.image" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <div style="margin-left:15px;color:#ccc;font-size:12px; line-height:1.5;">
                  轮播图片尺寸：690*300像素
                </div>
              </div>
            </el-form-item>
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
        <el-button size="medium" type="primary" @click="submit">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { bannersave as save, API_URL } from "@/request/api.js";
export default {
  name: "bannersave",
  components: {},
  props: {
    value: {
      type: Object
    },
    show: {
      type: String
    },
    
  },
  watch: {
    show(val) {
      if (val === this.$options.name) {
        this.$ObjectMixed(this.form, this.value.form);
        this.uploadData.token = this.$store.getters.getToken;
        this.typeList = this.value.typeList;
      }
    }
  },
  data() {
    return {
      uploadData: {
        url: API_URL + "admin/upload",
        token: "",
      },
        typeList:[],
      form: {
        token: "",
        id: "",
        title:"",
        type:"",
        image:"",
        status:1,
        data:"",
        sort:"",
        remark:"",
        ap_id:"1"
      }
    };
  },
  methods: {
    submit() {
      save(this.form).then(res => {
        this.$message.success({
          message: res.msg || "操作成功"
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
    uploadImage(res) {
      this.form.image = res.data;
    },
  }
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
    width: 120px;
    height: 80px;
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