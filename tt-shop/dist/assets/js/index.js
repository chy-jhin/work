(function(e){function t(t){for(var o,r,i=t[0],u=t[1],s=t[2],l=0,f=[];l<i.length;l++)r=i[l],Object.prototype.hasOwnProperty.call(a,r)&&a[r]&&f.push(a[r][0]),a[r]=0;for(o in u)Object.prototype.hasOwnProperty.call(u,o)&&(e[o]=u[o]);h&&h(t);while(f.length)f.shift()();return c.push.apply(c,s||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],o=!0,r=1;r<n.length;r++){var i=n[r];0!==a[i]&&(o=!1)}o&&(c.splice(t--,1),e=u(u.s=n[0]))}return e}var o={},r={index:0},a={index:0},c=[];function i(e){return u.p+"assets/js/"+({}[e]||e)+".js"}function u(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n={"chunk-5f697d76":1,"chunk-2e8af0f9":1,"chunk-4a8eb70e":1,"chunk-64e2663e":1,"chunk-d3adfce0":1,"chunk-ed3b4dcc":1,"chunk-74e05856":1,"chunk-fd89d8d0":1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise((function(t,n){for(var o="assets/css/"+({}[e]||e)+".css",a=u.p+o,c=document.getElementsByTagName("link"),i=0;i<c.length;i++){var s=c[i],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===o||l===a))return t()}var f=document.getElementsByTagName("style");for(i=0;i<f.length;i++){s=f[i],l=s.getAttribute("data-href");if(l===o||l===a)return t()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=t,h.onerror=function(t){var o=t&&t.target&&t.target.src||a,c=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=o,delete r[e],h.parentNode.removeChild(h),n(c)},h.href=a;var d=document.getElementsByTagName("head")[0];d.appendChild(h)})).then((function(){r[e]=0})));var o=a[e];if(0!==o)if(o)t.push(o[2]);else{var c=new Promise((function(t,n){o=a[e]=[t,n]}));t.push(o[2]=c);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,u.nc&&l.setAttribute("nonce",u.nc),l.src=i(e);var f=new Error;s=function(t){l.onerror=l.onload=null,clearTimeout(h);var n=a[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+o+": "+r+")",f.name="ChunkLoadError",f.type=o,f.request=r,n[1](f)}a[e]=void 0}};var h=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(t)},u.m=e,u.c=o,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)u.d(n,o,function(t){return e[t]}.bind(null,o));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="",u.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var f=0;f<s.length;f++)t(s[f]);var h=l;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},2395:function(e,t,n){},4360:function(e,t,n){"use strict";n("ac1f"),n("5319");var o=n("2b0e"),r=n("2f62"),a=n("a18c");o["default"].use(r["a"]);var c=new r["a"].Store({state:{token:localStorage.getItem("token"),authList:localStorage.getItem("authList")||"[]",userName:localStorage.getItem("userName")||"未知用户",timer:null},getters:{getToken:function(e){return!!e.token&&e.token},getAuthList:function(e){return"string"==typeof e.authList?JSON.parse(e.authList):e.authList},getUserName:function(e){return e.userName}},mutations:{setToken:function(e,t){t?(localStorage.setItem("token",t),e.token=t):(localStorage.removeItem("token"),localStorage.removeItem("authList"),localStorage.removeItem("userName"),e.token=void 0,e.authList=[],e.userName="未知用户",a["a"].replace({path:"/login"}))},setAuthList:function(e,t){localStorage.setItem("authList",JSON.stringify(t)),e.authList=t},setUserName:function(e,t){localStorage.setItem("userName",t),e.userName=t}},actions:{setToken:function(e,t){e.commit("setToken",t)},setAuthList:function(e,t){e.commit("setAuthList",t)},setUserName:function(e,t){e.commit("setUserName",t)}}});t["a"]=c},"56d7":function(e,t,n){"use strict";n.r(t);n("4de4"),n("c975"),n("b0c0"),n("ac1f"),n("5319");var o=n("53ca"),r=(n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("2b0e")),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},c=[],i=(n("7c55"),n("2877")),u={},s=Object(i["a"])(u,a,c,!1,null,null,null),l=s.exports,f=n("a18c"),h=n("4360"),d=n("5c96"),p=n.n(d);n("0fae"),n("add7");r["default"].config.productionTip=!1,r["default"].prototype.$copyTxt=function(e){function t(t){t.clipboardData.setData("text/plain",e),r["default"].prototype.$message.success({message:"内容已复制到剪切板"}),t.preventDefault()}document.addEventListener("copy",t),document.execCommand("copy"),document.removeEventListener("copy",t)},r["default"].prototype.$ObjectMixed=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if("object"==Object(o["a"])(e)&&"object"==Object(o["a"])(t)){for(var r in e)e[r]=t.hasOwnProperty(r)?"object"==Object(o["a"])(t[r])?JSON.parse(JSON.stringify(t[r])):t[r]:e[r];return n?e:void 0}},f["a"].beforeEach((function(e,t,n){var o=!!h["a"].getters.getToken;0==o&&"login"!=e.name&&f["a"].replace({path:"/login"}),"login"===e.name&&0!=o&&f["a"].replace({path:"/main"}),e.meta&&e.meta.authList?e.meta.authList.filter((function(e){return-1!==h["a"].getters.getAuthList.indexOf(e)})).length>0?n():r["default"].prototype.$message.success({message:"你没有权限访问该页面",onClose:function(){history.back()}}):n()})),r["default"].use(p.a),new r["default"]({router:f["a"],store:h["a"],render:function(e){return e(l)}}).$mount("#app")},"7c55":function(e,t,n){"use strict";var o=n("2395"),r=n.n(o);r.a},9883:function(e,t,n){"use strict";t["a"]=[{path:"/goods",redirect:"/goods/index",component:{render:function(e){return e("router-view")}},meta:{title:"商品管理",icon:"el-icon-files"},children:[{path:"/goods/index",component:function(e){return Promise.all([n.e("chunk-a406584c"),n.e("chunk-2bc40473"),n.e("chunk-2e8af0f9")]).then(function(){var t=[n("00ce")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{authList:[14,15],title:"商品列表",icon:"el-icon-s-unfold"}},{path:"/goods/GoodsType/index",component:function(e){return Promise.all([n.e("chunk-a406584c"),n.e("chunk-2bc40473"),n.e("chunk-64e2663e")]).then(function(){var t=[n("de2f")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{authList:[20,21],title:"商品分类",icon:"el-icon-s-grid"}},{path:"/goods/PostMoney/index",component:function(e){return Promise.all([n.e("chunk-a406584c"),n.e("chunk-2bc40473"),n.e("chunk-4a8eb70e")]).then(function(){var t=[n("1bfa")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{authList:[22],title:"邮费模板",icon:"el-icon-document"}},{path:"/goods/supplier/index",component:function(e){return Promise.all([n.e("chunk-a406584c"),n.e("chunk-2bc40473"),n.e("chunk-ed3b4dcc")]).then(function(){var t=[n("f653")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{authList:[22],title:"供货商",icon:"el-icon-truck"}}]},{path:"/order",redirect:"/order/index",component:{render:function(e){return e("router-view")}},meta:{title:"订单管理",icon:"el-icon-film"},children:[{path:"/order/index",component:function(e){return Promise.all([n.e("chunk-a406584c"),n.e("chunk-2bc40473"),n.e("chunk-d3adfce0")]).then(function(){var t=[n("45e1")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{title:"订单列表",icon:"el-icon-chat-line-square",authList:[16,17]}}]}]},a18c:function(e,t,n){"use strict";n("99af");var o=n("2909"),r=n("2b0e"),a=n("8c4f"),c=n("9883");r["default"].use(a["a"]),t["a"]=new a["a"]({scrollBehavior:function(e,t,n){return n||{x:0,y:0}},routes:[{path:"/",redirect:"/main"},{path:"/jump",component:function(e){return n.e("chunk-2d225b4c").then(function(){var t=[n("e616")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/login",name:"login",component:function(e){return Promise.all([n.e("chunk-a406584c"),n.e("chunk-74e05856")]).then(function(){var t=[n("4009")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{name:"登录"}},{path:"/",component:function(e){return Promise.all([n.e("chunk-a406584c"),n.e("chunk-fd89d8d0")]).then(function(){var t=[n("5c79")];e.apply(null,t)}.bind(this)).catch(n.oe)},children:[{path:"/main",component:function(e){return n.e("chunk-5f697d76").then(function(){var t=[n("3843")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{title:"首页",icon:"el-icon-monitor"}}].concat(Object(o["a"])(c["a"]))}]})},add7:function(e,t,n){}});