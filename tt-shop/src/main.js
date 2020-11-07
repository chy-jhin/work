import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './style/common.less'; //全局css

Vue.config.productionTip = false

//复制内容
Vue.prototype.$copyTxt = function (val) {
  document.addEventListener('copy', save); // 监听浏览器copy事件 
  document.execCommand('copy'); // 执行copy事件，这时监听函数会执行save函数。 
  document.removeEventListener('copy', save); // 移除copy事件 // 保存方法 
  function save(e) {
    e.clipboardData.setData('text/plain', val); // 剪贴板内容设置 
    Vue.prototype.$message.success({
      message: '内容已复制到剪切板'
    });
    e.preventDefault();
  }
}


//取对象的交集
Vue.prototype.$ObjectMixed = function (to, from, cb = false) {
  if (typeof (to) != 'object' || typeof (from) != 'object') return;
  for (let key in to) {
    to[key] = from.hasOwnProperty(key) ? (typeof (from[key]) == 'object' ? JSON.parse(JSON.stringify(from[key])) : from[key]) : to[key];
  }
  if (cb) return to;
}

router.beforeEach((to, from, next) => {
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  let isLogin = !store.getters.getToken ? false : true; // 是否登录
  // 未登录状态；当路由到route指定页时，跳转至login
  if (isLogin == false && to.name != 'login') {
    router.replace({ path: '/login', });
  }
  // 已登录状态；当路由到login时，跳转至main 
  if (to.name === 'login') {
    if (isLogin != false) {
      router.replace({ path: '/main', });
    }
  }

  if (to.meta && to.meta.authList) {
    if (to.meta.authList.filter(val => {
      return store.getters.getAuthList.indexOf(val) !== -1;
    }).length > 0) {
      next();
    } else {
      Vue.prototype.$message.success({
        message: '你没有权限访问该页面',
        onClose() {
          history.back();
        }
      });
    }
  } else {
    next();
  }

});

Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
