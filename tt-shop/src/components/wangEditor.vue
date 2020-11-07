<template>
  <div>
    <div class="editor">
      <div ref="toolbar" class="toolbar"></div>
      <div ref="text" class="text" :style="{height:height}"></div>
    </div>
  </div>
</template>
<script>
import { API_URL } from "@/request/api";
import E from "wangeditor";
export default {
  name: "wangEditor",
  data() {
    return {
      editor: null
    };
  },
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    height: {
      type: String,
      default: "480px"
    }
  },
  watch: {
    value(val, old) {
      if (!old || !val) {
        this.editor.txt.html(val);
      }
    }
  },
  mounted() {
    this.editor = new E(this.$refs.toolbar, this.$refs.text);
    // 自定义菜单配置
    this.editor.customConfig.menus = [
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      // "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      // "emoticon", // 表情
      "image", // 插入图片
      "table", // 表格
      // "video", // 插入视频
      "code", // 插入代码
      "undo", // 撤销
      "redo" // 重复
    ];
    this.editor.customConfig.debug = false;
    // this.editor.customConfig.pasteIgnoreImg = true;
    this.editor.customConfig.uploadImgServer = API_URL + "admin/upload"; // 配置服务器端地址
    this.editor.customConfig.uploadImgParams = {
      token: this.$store.getters.getToken
    };
    this.editor.customConfig.uploadFileName = "upload_file"; // 后端接受上传文件的参数名
    this.editor.customConfig.uploadImgMaxLength = 1; // 限制一次最多上传 3 张图片
    this.editor.customConfig.uploadImgHooks = {
      customInsert: (insertImg, result, editor) => {
        insertImg(result.data);
      }
    };
    this.editor.customConfig.onchange = html => {
      console.log(html.match(/<img.+?>/igm));
      this.$nextTick(() => {
        this.$emit("change", html); // 将内容同步到父组件中
      });
    };
    // 创建富文本编辑器
    this.editor.create();
    this.$nextTick(() => {
      this.editor.txt.html(this.value);
    });
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.editor {
  width: 100%;
}
.toolbar {
  border: 1px solid #ccc;
}
.text {
  border: 1px solid #ccc;
  min-height: 320px;
  /deep/.w-e-text {
    overflow-y: auto;
  }
}
</style>