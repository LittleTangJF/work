import mediaMap from "./jsonData/mediaMap";
export default {
  state: {
    topicId: sessionStorage.getItem("topicId"), //当前专题id
    // topicId: 1,//当前专题id
    listArr: [], //专题、专栏分页列表
    industryArr: [], //行业列表
    topicSortMap: "", //专题排序
    orderByField: "", //文章默认排序
    thematicArticle: false, //专题文章 标识
    mediaMap: mediaMap, //媒体类型 列表
    // detBoole: false, //标记 （查看主页列表详情）
    detBoole: sessionStorage.getItem("detBoole"), //标记 （查看主页列表详情）
    mediaSession: sessionStorage.getItem("media"), // 媒体类型
    docIdSession: sessionStorage.getItem("docId"), // 文章id
    keyIdSession: sessionStorage.getItem("keyId"), //主键
    topArrTypeSession: sessionStorage.getItem("topArrType"), // 专题类型：推荐资讯（crawler）、专题文章（topic）
    keywordsListArrSession: JSON.parse(sessionStorage.getItem("keywordList")), //关键词 （列表）
    mediaNameSession: sessionStorage.getItem("mediaName"), // 媒体名称
    userLeftNavSession: sessionStorage.getItem("userLeftNav"), // 二级导航
    topicCurrent() {
      //当前专题
      let _this = this;
      let index = _this.listArr.find(val => {
        return val.id == _this.topicId;
      });
      return index;
    }
  },
  mutations: {
    topicIdChang(state, val) {
      //这里的state对应着上面这个state
      state.listArr = val.records;
      if (!val.topicIdNo && val.records[0]) {
        state.topicId = val.records[0].id;
      }
      //你还可以在这里执行其他的操作改变state
    }
    // ugcLikeFn(state, val) {}
  },
  actions: {
    /**
     * 获取专题，专栏列表
     */
    topicIdChang(context, dataG) {
      //这里的context和我们使用的$store拥有相同的对象和方法
      let _global = context.rootState.global;
      if (!context.state.topicId) {
        const data = {
          url: dataG.url,
          params: {
            userId: _global.userId,
            size: 100
          },
          call(response) {
            let val = response.data;
            if (dataG.topicIdNo) {
              // 不赋值第一个的id
              val.topicIdNo = dataG.topicIdNo;
            }
            if (dataG.callBack) {
              context.commit("topicIdChang", val);
              dataG.callBack();
            }
          }
        };
        _global.axiosGet(data);
      } else {
        if (dataG.callBack) {
          dataG.callBack();
        }
      }
      //你还可以在这里触发其他的mutations方法
    },
    /**
     * 添加行为记录
     */
    addUserAction(context, dataParams) {
      let _global = context.rootState.global;
      //
      const data = {
        url: "/userAction/addUserAction",
        params: JSON.stringify(dataParams),
        contentType: "application/json"
        // call(response) {}
      };
      _global.axiosPost(data);
    }
    /**
     * 点赞，取赞 （专题，科技圈）
     */
  },
  getters: {}
};
