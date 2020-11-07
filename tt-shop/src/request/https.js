import Vue from 'vue'
import axios from 'axios';
import store from "../store";
import router from '../router';

// 1.配置post请求参数，url，请求参数，默认配置项,判断token如果存在，则拿着token发送请求，不存在则跳转登录页
// 2.封装post请求拦截，默认给post请求加上请求头，声明内容格式，还有：，以及验证token有效性
// 3.封装post响应拦截，判断code码不成功的情况，分别跳转不同的页面，login，404等，获取的最新的token并且更新掉。
export function post(url, params, _config) {
  let config = Object.assign({
    token: true, //默认不需要token参数
    check: true, //默认要判断返回的状态,
    responseType: 'json'
  }, _config);
  if (config.token) {
    if (store.getters.getToken != false) {
      params.token = store.getters.getToken
    } else {
      return router.replace({
        path: '/login'
      });
    }
  }
  return new Promise((resolve, reject) => {
    axios.post(url, params, {
      responseType: config.responseType, headers: {
        'Content-Type': 'application/json'
      }, transformRequest: [function (data) {
        data = JSON.stringify(data)
        return data
      }],
    })
      .then(res => {
        if (res.headers.token) {     //token,  用户身份凭证
          store.dispatch("setToken", res.headers.token)
        }
        if (config.check) {
          if (res.data.code != 1) {
            switch (res.data.code) {
              case 1002:
              case 1003:
                Vue.prototype.$message.error({
                  message: res.data.msg || '未知错误',
                  onClose() {
                    store.dispatch("setToken", false)
                  }
                });
                break;
              case 3001:
                setTimeout(() => {
                  router.go(-1);
                }, 1000)
                break;
              default:
                Vue.prototype.$message.error({
                  message: res.data.msg || '未知错误'
                });
            }
          } else {
            resolve(res.data);
          }
        } else {
          resolve(res.data);
        }
      })
      .catch(err => {
        // 错误捕获
        // reject(err.data)
        Vue.prototype.$message.error({
          message: '请求服务器失败'
        });
      })
  });
}

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
