<template>
  <div>
    <div class="card-box flex-wrap">
      <el-card class="item-card flex flexv" v-for="(item,index) in list" :key="index">
        <div slot="header" class="clearfix ali-c">
          <span class="flex1 title">{{item.title||'无标题'}}</span>
          <el-button size="mini" type="primary" round @click="save(item)">保存修改</el-button>
        </div>
        <div class="flex1 flexc">
          <el-switch
            v-if="item.type == 'switch'"
            v-model="item.value"
            active-text="开启"
            inactive-text="关闭"
            :active-value="'1'"
            :inactive-value="'2'"
          ></el-switch>

          <el-input-number
            v-else-if="item.type == 'int'"
            v-model="item.value"
            :step="1"
            placeholder="请输入配置内容"
          ></el-input-number>
          <el-input
            v-else-if="item.type == 'string'"
            style="width:180px;"
            v-model="item.value"
            placeholder="请输入配置内容"
          ></el-input>
          <el-input
            v-else-if="item.type == 'url'"
            style="width:240px;"
            v-model="item.value"
            placeholder="请输入配置内容"
          ></el-input>

          <template v-else-if="item.type == 'image'">
            <div class="ali-e">
              <el-image class="image-box" :src="item.value" :preview-src-list="[item.value]"></el-image>
              <el-upload
                class="upload-box"
                name="upload_file"
                :action="uploadData.url"
                :data="{token:uploadData.token}"
                :show-file-list="false"
                :on-success="((response, file)=>(uploadSuccess(item,response, file)))"
              >
                <i class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </template>
          <el-input v-else style="width:240px;" v-model="item.value" placeholder="请输入配置内容"></el-input>
        </div>
        <el-divider content-position="center">配置说明</el-divider>
        <div class="describe">* {{item.describe||'无配置说明'}}</div>
      </el-card>
    </div>
  </div>
</template>
<script>
import { API_URL, configIndex, configSave } from "@/request/api.js";
export default {
  name: "configIndex",
  data() {
    return {
      uploadData: {
        url: API_URL + "admin/upload",
        token: this.$store.getters.getToken
      },
      list: [],
      infoDialog: {
        show: "",
        value: {}
      }
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    save(item) {
      configSave(item).then(res => {
        this.$message.success({
          message: res.msg || "操作成功"
        });
      });
    },
    uploadSuccess(item, res, file) {
      item.value = res.data;
    },
    getList() {
      configIndex({}).then(res => {
        this.list = res.data;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.card-box {
  margin-left: -15px;
  .item-card {
    height: 320px;
    margin-left: 15px;
    width: calc(25% - 15px);
    margin-bottom: 15px;
    /deep/ .el-card__body {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    /deep/ .el-card__header {
      padding: 15px 20px;
    }
    /deep/ .el-divider__text {
      color: #999;
      font-size: 12px;
    }
    .title {
      font-size: 12px;
      font-weight: bold;
    }
    .describe {
      color: #909399;
      font-size: 12px;
      line-height: 1.4;
    }
    .save-btn {
      display: block;
      margin-top: 10px;
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
    }
  }
}
</style>