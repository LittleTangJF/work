import Cookies from "js-cookie";
import { Message } from "element-ui";

// todo 请求设置
let token = getCookie("x-access-token");
let Authorization;
token ? (Authorization = `Bearer ${token}`) : (Authorization = "");

let t; //需要登录 计时器

// todo 构建表情包数据
let expressionImg = {
  1: "呵呵",
  2: "哈哈",
  3: "吐舌",
  4: "啊",
  5: "酷",
  6: "怒",
  7: "开心",
  8: "汗",
  9: "泪",
  10: "黑线",
  11: "鄙视",
  12: "不高兴",
  13: "真棒",
  14: "钱",
  15: "疑问",
  16: "阴脸",
  17: "吐",
  18: "咦",
  19: "委屈",
  20: "花心",
  21: "呼~",
  22: "笑脸",
  23: "冷",
  24: "太开心",
  25: "滑稽",
  26: "勉强",
  27: "狂汗",
  28: "乖",
  29: "睡觉",
  30: "惊哭",
  31: "生气",
  32: "惊讶",
  33: "喷",
  34: "爱心",
  35: "心碎",
  36: "玫瑰",
  37: "礼物",
  38: "彩虹",
  39: "星星月亮",
  40: "太阳",
  41: "钱币",
  42: "灯泡",
  43: "茶杯",
  44: "蛋糕",
  45: "音乐",
  46: "haha",
  47: "胜利",
  48: "大拇指",
  49: "弱",
  50: "OK"
};
let expressionArr = [];
for (let key in expressionImg) {
  let index = {};
  index.title = expressionImg[key];
  index.src = `./img/expression/${key}.jpg`;
  expressionArr.push(index);
}
export default {
  state: {
    personIdentiIs: false, //用户个人认证状态 标识
    parseUrlData: parseUrl(decodeURI(window.location.href)), //url参数
    delUrl: window.location.origin + "/#/information/details", //文章详情 地址 (站内)
    delUrlCir: window.location.origin + "/#/scienceCircle/details", //科技圈详情 地址 (站内)
    loginUrl: "http://uc.jmrh596.com:2181/#/login", //登录网址
    indexUrl: "http://www.jmrh596.com:2181", //首页网址
    ucUrl: "http://uc.jmrh596.com:2181", //用户中心网址
    techDiscoveryUrl: "http://news.jmrh596.com:2181", //前沿技术发现网址
    loading: false, //标识(加载中.. )
    userId: sessionStorage.getItem("userId"), //用户id
    authorId: sessionStorage.getItem("authorId"), //作者id
    userMsg: sessionStorage.getItem("userMsg"), //用户信息
    setInterval: true, //首页计时器开关
    expressionArrData: expressionArr, //表情包数据
    //本机测试 访问本机JSON 文件
    /*jsonSuffix:".json", //后缀名
        baseURL:'./json/', //json根路径*/
    details: {}, //当前文章
    // 后端联调
    jsonSuffix: "", //后缀名
    baseURL: "discovery", //请求路径 （正式）
    // baseURL:'xl', //请求路径 调试（徐亮）
    // baseURL:'test', //请求路径 （测试）

    baseURLTran: "translate", //请求路径 翻译
    loginIn: false, //登录标记
    needLogin: false, //是否需要登录 标识
    needIdenti: false, //是否需要认证 标识
    loginInReadNum: 5, //未登录 可阅读文章数
    searchGlobalText: "", //全局搜索 文字
    searchGlobalIndustry: null, //全局搜索 行业
    searchGlobalTextShow: "", //全局搜索 文字(作为显示)
    searchGlobalLabel: "资讯", //全局搜索 选中的lable
    // http://translateport.yeekit.com/translate?srcl=en&tgtl=zh&text=local&app_source=2001
    axiosGet(requestData, translate) {
      this.ajaxFn(requestData, translate, "GET");
    },
    axiosPost(requestData, translate) {
      this.ajaxFn(requestData, translate, "POST");
    },
    ajaxFn(requestData, translate, type) {
      let _this = this;
      let urlType;
      if (translate) {
        //TODO 翻译接口
        urlType = _this.baseURLTran;
      } else {
        urlType = _this.baseURL;
        if (requestData.type) {
          urlType = requestData.type;
        }
      }
      // todo 是否启用加载图标
      requestData.loading ? (_this.loading = true) : "";
      const url = urlType + requestData.url + _this.jsonSuffix;
      $.ajax({
        url: url,
        type: type,
        contentType: requestData.contentType,
        data: requestData.params,
        beforeSend: function(XMLHttpRequest) {
          XMLHttpRequest.setRequestHeader("Authorization", Authorization);
        },
        success: function(response) {
          requestData.call ? requestData.call(response) : "";
          requestData.loading ? (_this.loading = false) : "";
        },
        error: function(response) {
          let code = response.status === 401;
          if (code) {
            ["x-access-token", "x-refresh-token", "userId"].forEach(item => {
              // todo 本地测试用这个
              Cookies.remove(item);
              // todo 正式线上版本用这个
              Cookies.remove(item, { path: "/", domain: "jmrh596.com" });
            });
            Message.error("您的登陆令牌已过期，请重新登陆！");
          }
          requestData.error ? requestData.error(response) : "";
          // console.log("失败");
          // console.log(response);
          requestData.loading ? (_this.loading = false) : "";
        }
      });
    },
    //todo 跳转页面
    goPage(obj, urlName) {
      obj.$router.push({
        name: urlName
      });
    },

    //跳转登录页
    loginUrlGo(isLogin) {
      let _this = this;

      //直接跳页面
      if (isLogin) {
        let url = `${_this.loginUrl}?url=${window.location.href}`;
        window.location.href = url;
        return true;
      }
      //已登录
      if (_this.loginIn) {
        return true;
      }
      // 提示需要登录
      _this.needLogin = true;
      clearTimeout(t);
      $(".contMediaMapD .el-pager .active").removeClass("active");
      $(".contMediaMapD .el-pager .number:first").addClass("active");
      t = setTimeout(() => {
        _this.needLogin = false;
      }, 3000);
      return false;
    },
    // todo 是否认证
    personIdentiIsFn() {
      let _this = this;
      if (!_this.personIdentiIs) {
        // 未实名认证 提示信息
        _this.needIdenti = true;
        clearTimeout(t);
        t = setTimeout(() => {
          _this.needIdenti = false;
        }, 3000);
        $(".contMediaMapD .el-pager .active").removeClass("active");
        $(".contMediaMapD .el-pager .number:first").addClass("active");
        return false;
      }
      return true;
    },
    // todo 进入认证页面
    goPageIdenti() {
      let _this = this;
      // let url = _this.ucUrl+'http://uc.jmrh596.com:2181/#/homePage/accountConfirmInfo'
      let url = "http://uc.jmrh596.com:2181/#/homePage/accountConfirmInfo";
      window.open(url, "_blank");
    },
    //深拷贝
    deepClone(obj) {
      let _this = this;
      let objClone = Array.isArray(obj) ? [] : {};
      if (obj && typeof obj === "object") {
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            //判断ojb子元素是否为对象，如果是，递归复制
            if (obj[key] && typeof obj[key] === "object") {
              objClone[key] = _this.deepClone(obj[key]);
            } else {
              //如果不是，简单复制
              objClone[key] = obj[key];
            }
          }
        }
      }
      return objClone;
    },
    // todo 用户状态查询 （登录，认证）
    userStausFn() {
      let _this = this;
      if (!_this.loginUrlGo()) {
        // 未登录
        return false;
      } else if (!_this.personIdentiIsFn()) {
        // 未认证
        return false;
      }
      return true;
    },
    //写cookies
    setCookie(name, value, time, domain, path) {
      var str = name + "=" + escape(value);
      if (time) {
        var date = new Date(time).toGMTString();
        str += ";expires=" + date;
      }
      str = domain ? str + ";domain=" + domain : str;
      str = path ? str + ";path=" + path : str;
      document.cookie = str;
    },
    //读取cookies
    getCookie(sName) {
      let aCookie = document.cookie.split("; ");
      for (let i = 0; i < aCookie.length; i++) {
        let aCrumb = aCookie[i].split("=");
        if (sName == aCrumb[0]) {
          return unescape(aCrumb[1]);
        }
      }
      return null;
    },
    //删除cookies
    delCookie(name, domain, path) {
      var date = new Date("1970-01-01");
      var str = name + "=null;expires=" + date.toGMTString();
      str = domain ? str + ";domain=" + domain : str;
      str = path ? str + ";path=" + path : str;
      document.cookie = str;
    },
    // todo 在光标处 添加html
    pasteHtmlAtCaret(html, id, text) {
      var sel, range;
      if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
          range = sel.getRangeAt(0);
          range.deleteContents();
          //todo 没在文本框，退出方法
          let _text = range.commonAncestorContainer.wholeText;
          let hh = text.indexOf(_text);
          // if (hh == -1 && range.commonAncestorContainer.offsetParent.className != 'ql-container ql-snow'){
          if (
            hh == -1 &&
            range.commonAncestorContainer.offsetParent &&
            range.commonAncestorContainer.offsetParent.className !=
              "ql-container ql-snow"
          ) {
            return false;
          }
          if (text == "") {
            return false;
          }
          var el = document.createElement("div");
          el.innerHTML = html;
          var frag = document.createDocumentFragment(),
            node,
            lastNode;
          while ((node = el.firstChild)) {
            lastNode = frag.appendChild(node);
          }
            range.insertNode(frag);
            if (lastNode) {
              range = range.cloneRange();
              range.setStartAfter(lastNode);
              range.collapse(true);
              sel.removeAllRanges();
              sel.addRange(range);
            }
          return true;
        }
      }
    },
    // todo 光标移到最后的位置
    setFocus(el) {
      el = el[0]; // jquery 对象转dom对象
      el.focus();
      var range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      var sel = window.getSelection();
      //判断光标位置，如不需要可删除
      if (sel.anchorOffset != 0) {
        return;
      }
      sel.removeAllRanges();
      sel.addRange(range);
    },
    //todo 时分秒转秒
    formatHMStoS(value) {
      let h = parseInt(value.split(":")[0]);
      let m = parseInt(value.split(":")[1]);
      let s = parseInt(value.split(":")[2]);
      let ss = h * 60 * 60 + m * 60 + s;
      return parseInt(ss);
    },
    // todo unicode  视频字幕解码、数据格式调整
    unescape(value, item) {
      if (!value) {
        return;
      }
      let val = JSON.parse(
        unescape(value.replace(/\u/g, "%u")) //unicode 解码
          .replace(/\\n/g, "Б")
          .replace(/\\/g, "")
      );
      val.srt_word = val.srt_word.split("ББ");
      let arr = [];
      val.srt_word.forEach(item => {
        arr.push(item.split("Б"));
      });
      item.videoTrans = arr;
      return arr;
    },
    // todo 视频字幕
    subTitleFn(el, arr) {
      // 暂停其他视频
      let videOther = $(".videoArtD")
        .not("." + el)
        .find("video");
      let i = 0;
      while (i < videOther.length) {
        videOther[i].pause();
        i++;
      }

      if (!arr.length) {
        return;
      }
      let _this = this;
      let timeArr = [];
      arr.forEach(item => {
        let _arr = item[1].replace(/-->/g, ",").split(",");
        let _time = {
          start: _this.formatHMStoS(_arr[0]),
          end: _this.formatHMStoS(_arr[2]),
          text: item[2]
        };
        timeArr.push(_time);
      });
      //监听播放时间
      let _el = $("." + el);
      let video = _el.find("video")[0];
      let _html = `<div class="videoTextD"></div>`;
      _el.find(".vjs-control-bar").before(_html);
      // 显示翻译文本
      let _textItem = _el.find(".videoTextD");
      //使用事件监听方式捕捉事件
      video.addEventListener(
        "timeupdate",
        function() {
          let timeDisplay;
          //用秒数来显示当前播放进度
          timeDisplay = Math.floor(video.currentTime);

          //查找当前时间的字幕
          let timeArrIndex = timeArr.find(value => {
            return value.start < timeDisplay && timeDisplay < value.end;
          });
          if (timeArrIndex) {
            _textItem.text(timeArrIndex.text);
          }
        },
        false
      );
    }
  },
  mutations: {},
  actions: {}
};
// todo 取url的参数
function parseUrl(url) {
  let result = {};
  let query = url.split("?")[1];
  if (!query) {
    return "";
  }
  let queryArr = query.split("&");
  queryArr.forEach(function(item) {
    let value = item.split("=")[1];
    let key = item.split("=")[0];
    result[key] = value;
  });
  return result;
}
//读取cookies
function getCookie(sName) {
  let aCookie = document.cookie.split("; ");
  for (let i = 0; i < aCookie.length; i++) {
    let aCrumb = aCookie[i].split("=");
    if (sName == aCrumb[0]) {
      return unescape(aCrumb[1]);
    }
  }
  return null;
}
