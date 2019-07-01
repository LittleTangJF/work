const API = {
	// 侧边栏
	getArticle: 'discovery/dictionary/getArticleSelectList',
	// 选择列表
	getTopic: 'discovery/dictionary/getTopicSelectList',
	// 轮播图
	spiderArticle: 'discovery/spiderArticle/getRecommendInformation',
	// 列表展示信息
	List:'discovery/spiderArticle/getRecommendArticleByCondition',
	
	// 热门咨询
	Information:'/discovery/spiderArticle/getRecommendInformation',
	// 热词
	hotTags:'/uc/hotTags/findHotTags',
	PageByCondition:'discovery/spiderArticle/getArticlePageByCondition',
	topic:"/topic/getPageByCondition",
}
export default API
// 推荐资讯
// _url = '/spiderArticle/getRecommendArticleByCondition'