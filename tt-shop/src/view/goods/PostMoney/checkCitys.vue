<template>
  <div>
          <el-dialog
    class="mydialog"
      title="选择城市"
      :visible="show === $options.name"
      :close-on-click-modal="false"
      append-to-body
      @close="close"
      @closed="closed"
      width="1024px"
    >
      <el-form class="form-box" size="mini" label-width="80px">
        <el-row>

          <el-col :span="12">
            <el-form-item label="选择城市" label-width="80px"
              >
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
  <div style="margin: 15px 0;"></div>
  <el-checkbox-group v-model="form.region" @change="handleCheckedCitiesChange">
    <el-checkbox v-for="city in cities" :label="city.id" :key="city.name">{{city.name}}</el-checkbox>
  </el-checkbox-group></el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="close">取 消</el-button>
        <el-button size="medium" type="primary" @click="submit"
          >确 定</el-button
        >
      </div>
          </el-dialog>
  </div>
</template>
<script>
import { API_URL} from "@/request/api.js";

import ElImageViewer from "element-ui/packages/image/src/image-viewer";

export default {
  name: "checkCitys",
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
        // this.$ObjectMixed(this.form, this.value.form);
        console.log(this.value);
        this.cities = this.value.cities;
        this.form = this.value.form;
      }
    },
  },
  
  data() {
    return {
        //city
        checkAll: false,
        cities: ['上海', '北京', '广州', '深圳'],
        isIndeterminate: true,

        // 
      PostName: [],
      isdisabled: true,
      viewIndex: -1,
      uploadcover: {
        url: API_URL + "admin/upload",
        token: "",
      },
      form: {
        id: "",
        token: "",
        region:[]
      },
    };
  },
  methods: {
      //city
            handleCheckAllChange(val) {
                let data = [];
                let data2 = [];
                this.cities.forEach(res => {
                    data.push(res.id)
                    data2.push(res.name);
                }) 
        this.form.region = val ? data : [];
        this.form.cateName = val ? data2 : [];
        console.log(this.form.region)
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
          console.log(value)
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },


    //   计价方式
    checkType(value) {
      console.log(value);
      this.form.mode = value;
    },
    viewIndexClose() {
      this.viewIndex = -1;
    },
    submit() {
        this.close();
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
