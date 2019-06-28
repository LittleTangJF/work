const API = {
	// 侧边栏
	getArticle: 'discovery/dictionary/getArticleSelectList',
	// 选择列表
	getTopic: 'discovery/dictionary/getTopicSelectList',
	// 轮播图
	spiderArticle: 'discovery/spiderArticle/getRecommendInformation?size=5&current=1&media=1&type=1',
	// 列表展示信息
	List:'/spiderArticle/getRecommendArticleByCondition',
	
	// 热门咨询
	Information:'/discovery/spiderArticle/getRecommendInformation?size=10&current=1&media=1&type=0',
	// 热词
	hotTags:'/uc/hotTags/findAllHotTags',

}
export default API
