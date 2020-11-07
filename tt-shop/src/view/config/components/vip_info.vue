<template>
  <div class="active_code_remark">
    <wangEditor height="600px" width="300px" v-model="content"></wangEditor>
    <div class="footer">
      <el-button size="medium" type="primary" @click="submit">提 交</el-button>
    </div>
  </div>
</template>

<script>
import wangEditor from "@/components/wangEditor";
import { getConfig} from "@/request/api";
import { saveConfig} from "@/request/api";
export default {
  name: "active_code_remark",
  data() {
    return {
      msg: "1",
      content: "",
      form: {
        token: this.$store.getters.getToken,
        key: "active_code_remark",
        value:''
      },
    };
  },
  watch:{
    content(val){
      this.form.value = val
    }
  },
  created() {
    this.getdata();
  },
  components: {
    wangEditor,
  },
  methods: {
    submit(){
      console.log(this.form)
      saveConfig(this.form).then(res => {
        this.$message({
          message: '修改成功',
          type: 'success'
        });
      })
    },
    getdata() {
      getConfig(this.form).then((res) => {
        this.content = res.data.value;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.footer {
  display: flex;
  justify-content: flex-end;
  margin: 20px auto;
  padding-right: 30px;
}
</style>