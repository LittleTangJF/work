"use strict";

import Vue from "vue";
import axios from "axios";
import Cookies from "js-cookie";
import { Message } from "element-ui";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    const token = Cookies.get("x-access-token");
    if (token) config.headers["Authorization"] = "Bearer " + token;
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    let code = error.toString().includes(401);
    if (code) {
      Message.error("您的登陆令牌已过期，请重新登陆！");
      Cookies.remove("x-access-token", { path: "/", domain: "jmrh596.com" });
      Cookies.remove("x-refresh-token", { path: "/", domain: "jmrh596.com" });
      window.location.href =
        "http://www.jmrh596.com:2181/#/login?url=http://news.jmrh596.com:2181/#/homeIndex";
    }
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    }
  });
};

Vue.use(Plugin);

export default Plugin;
