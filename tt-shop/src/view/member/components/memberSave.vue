<template>
  <div>
    <el-dialog
      title="用户信息"
      :visible="show === $options.name"
      :close-on-click-modal="false"
      append-to-body
      @close="close"
      @closed="closed"
      width="640px"
    >
      <el-form class="form-box" size="mini" label-width="150px">
        <el-row>
          <!-- <el-col :span="24">
            <el-form-item label="姓名">
              <el-input v-model="form.name" style="width:160px;" placeholder="请输入用户真实姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="会员过期时间">
              <el-date-picker
      v-model="form.vip_expir_time"
      type="date"
      value-format="yyyy-MM-dd"
      placeholder="选择日期">
    </el-date-picker>
            </el-form-item>
          </el-col> -->
          <el-col :span="24">
            <el-form-item style="width:50%;display:inline-block" label="状态">
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
import { memberSave as save } from "@/request/api.js";
export default {
  name: "memberSave",
  components: {},
  props: {
    value: {
      type: Object
    },
    show: {
      type: String
    }
  },
  watch: {
    show(val) {
      if (val === this.$options.name) {
        this.$ObjectMixed(this.form, this.value);
      }
    }
  },
  data() {
    return {
      form: {
        id: null,
        status: 1,
        vip_expir_time: '',
        name: '',
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
    }
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
    width: 80px;
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