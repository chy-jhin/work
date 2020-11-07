<template>
  <div class="frame">
    <el-container style="height: 100%;">
      <el-aside width="auto" class="flex flexv">
        <el-menu
          class="el-menu-vertical flex1"
          :default-active="$route.path"
          :collapse="isCollapse"
          background-color="#2d3a4b"
          text-color="#fff"
          active-text-color="#409eff"
          unique-opened
          router
        >
          <el-menu-item :key="-1" index="/main" route="/main">
            <i class="el-icon-monitor"></i>
            <span>首页</span>
          </el-menu-item>

          <template v-for="(item,index) in routerList">
            <template v-if="menuShow(item)">
              <el-menu-item
                :key="index"
                v-if="item.children == undefined"
                :index="item.path"
                :route="{path:item.path}"
              >
                <i :class="item.meta.icon||'el-icon-folder'"></i>
                <span>{{item.meta.title}}</span>
              </el-menu-item>
              <el-submenu v-else :key="index" :index="item.path">
                <template slot="title">
                  <i :class="item.meta.icon||'el-icon-folder-opened'"></i>
                  <span>{{item.meta.title}}</span>
                </template>
                <template v-for="(subItem,subIndex) in item.children">
                  <el-menu-item
                    v-if="menuShow(subItem)"
                    :key="subIndex"
                    :index="subItem.path"
                    :route="{path:subItem.path}"
                  >
                    <i :class="subItem.meta.icon||'el-icon-folder'"></i>
                    <span>{{subItem.meta.title}}</span>
                  </el-menu-item>
                </template>
              </el-submenu>
            </template>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="elHeader ali-c">
          <el-button
            @click="isCollapse=!isCollapse"
            type="text"
            style="font-size:18px;color:#999;margin-right:30px;"
            :icon="!isCollapse?'el-icon-s-fold':'el-icon-s-unfold'"
          ></el-button>
          <el-breadcrumb separator-class="el-icon-arrow-right" class="flex1">
            <el-breadcrumb-item :to="{ path: '/main' }">数据管理中心</el-breadcrumb-item>
            <el-breadcrumb-item
              v-if="$route.matched[$route.matched.length-1].parent != undefined && $route.matched[$route.matched.length-1].parent.meta.title != undefined"
            >{{$route.matched[$route.matched.length-1].parent.meta.title}}</el-breadcrumb-item>
            <el-breadcrumb-item v-if="$route.meta.title">{{$route.meta.title}}</el-breadcrumb-item>
          </el-breadcrumb>

          

          <el-dropdown @command="handleCommand">
            <div class="ali-c" style="cursor: pointer;">
              <el-avatar size="large" :src="avatar"></el-avatar>
              <div style="margin-left:10px;">{{userName}}</div>
            </div>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="modPwd">修改密码</el-dropdown-item>
              <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main style="height: 100%;">
          <router-view />
        </el-main>
        <el-footer height="48px" class="elFooter ali-c">
          <span>© 遇憬软件工作室</span>
          <span style="margin-left:10px;">技术支持：</span>
          <a
            target="_blank"
            href="http://wpa.qq.com/msgrd?v=3&uin=5557965&site=qq&menu=yes"
          >QQ:5557965</a>
          <i class="el-icon-mobile-phone" style="margin-left:10px;margin-right:3px;"></i>
          <span>18170901365</span>
        </el-footer>
      </el-container>
    </el-container>

    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="480px">
      <el-form :model="form" label-width="120px">
        <el-form-item label="当前密码">
          <el-input v-model="form.oldPwd" style="width:240px;" placeholder="请输入当前密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="新的密码">
          <el-input v-model="form.newPwd" style="width:240px;" placeholder="请输入新的密码" show-password></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="modAdminPwd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { modAdminPwd } from "@/request/api.js";
import router from "@/router/router.js";
export default {
  name: "frame",
  data() {
    return {
      isCollapse: JSON.parse(localStorage.getItem("isCollapse") || "false"),
      dialogVisible: false,
      avatar: require("@/assets/avatar.png"),
      form: {
        oldPwd: "",
        newPwd: "",
      },
      routerList: router,
      timer: null,
    };
  },
  computed: {
    adminAuthList() {
      return this.$store.getters.getAuthList;
    },
    userName() {
      return this.$store.getters.getUserName;
    },
    menuShow() {
      return (item) => {
        let authList = [];

        if (item.children) {
          item.children.forEach((val) => {
            authList = authList.concat(val.meta.authList);
          });
        } else {
          authList = item.meta.authList;
        }
        let list = authList.filter((val) => {
          return this.adminAuthList.indexOf(val) !== -1;
        });
        return list.length > 0 ? true : false;
      };
    },
  },
  mounted() {
  },
  beforeDestroy() {
    if (this.timer != null) {
      clearInterval(this.timer);
    }
  },
  watch: {
    dialogVisible(val) {
      if (!val) {
        this.form = {
          oldPwd: "",
          newPwd: "",
        };
      }
    },
    isCollapse(val) {
      localStorage.setItem("isCollapse", val);
    },
  },
  methods: {
    handleCommand(key) {
      switch (key) {
        case "logout":
          this.logout();
          break;
        case "modPwd":
          this.dialogVisible = true;

          break;
      }
    },
    modAdminPwd() {
      modAdminPwd(this.form).then((res) => {
        this.$message.success({
          message: "密码修改成功，请重新登录！",
        });
        this.dialogVisible = false;
        this.$store.dispatch("setToken", false);
      });
    },
    logout() {
      this.$confirm("此操作将退出当前账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("setToken", false);
        })
        .catch(() => {});
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.frame {
  height: 100%;
}
.elHeader {
  border-bottom: solid 1px #e6e6e6;
}
.elFooter {
  border-top: solid 1px #e6e6e6;
  font-size: 12px;
  line-height: 24px;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 240px;
}
.badgeBox {
  .item {
    margin-right: 30px;
  }
}
</style>
