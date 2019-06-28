<template>
	<div class>
		<div class="w1200 disF minHD artListM">
			<div class="w1200 flex1 bgFFF mT10 plr10 pB10">
				<div class="mT10">
					<div class="disF">
						<!-- 中间的acrticle -->
						<div class="flex1">
							<articleList ref="_articleList" class="mT0"></articleList>
						</div>
						<!-- 轮播图 -->
						<div class="flex210 pl10">
							<el-carousel height="150px" class>
								<el-carousel-item v-for="(item, index) in recommendInfoArr" :key="index">
									<div class="posR" @click="delUrlSet(item)">
										<a :href="$store.state.global.delUrl + '?docId=' + item.docId + '&media=' + item.media" target="_blank" class="fs875">
											<img class="carouselImg" height="150px" :src="item.otherImages" alt />
											<!-- | toImgOne -->
											<p class="carouselMsg">
												{{ item.title }}
											</p>
										</a>
									</div>
								</el-carousel-item>
							</el-carousel>
							<!-- 热门资讯 -->
							<div class="mT10">
								<h1 class="borBE5 fs1d2 mbf10">热门资讯</h1>
								<!--<h1 class="borBE5 fs1d2 mbf10" @click="getRecommendArticleByCondition">获取推荐资讯</h1>-->
								<div class="recomInfoD">
									<p class="textOver w217" @click="delUrlSet(item)" v-for="(item, index) in recommendInfoArr" :title="item.title" :key="index">
										<a :href="$store.state.global.delUrl + '?docId=' + item.docId + '&media=' + item.media" target="_blank" class="fs875">
											<span class="recomInfoDIndex">{{ index + 1 }}</span>
											{{ item.title || item.summary }}
										</a>
									</p>
								</div>
							</div>
							<div class>
								<h1 class="borBE5 pB10 fs1d2">视频精选</h1>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import articleList from '../../components/arcticleList'
// import listHead from "../../components/listHead.vue";
export default {
	data() {
		return {
			//热点资讯
			recommendInfoArr: {
				0: [], // 有文字
				1: [], // 有图片
				2: [] // 有视频
			},
			recommendInfoSreen: {
				size: 10,
				current: 1,
				media: 1
			},
			/**
			 * 用于子组件
			 * */
			listHeadChild_ListArrNo: true,
			articleListChild_SubNavdelNo: true,
			articleListChild_SourceNo: true,
			articleListChild: {
				detailsPageName: 'informationDetails' //详情页面 路由名
			},
			scrollTop: ''
		}
	},
	components: {
		articleList
	},
	// 设置过滤器
	
	methods: {
		// 获取轮播图数据
		getDataSpider() {
			let _this = this
			// let _recommendInfoSreen = _this.recommendInfoSreen;
			// {params:{_recommendInfoSreen}}
			_this.$axios.get(_this.$API.spiderArticle).then((res) => {
				// console.log(res)
				_this.recommendInfoArr = res.data.record
			})
		},
		// todo 查询用户感兴趣的行业热词 findHotTags
		findHotTags(orderByField) {
			let _this = this
			// let _articleList = _this.$refs._articleList
			// if (_articleList.screen.hotTags) {
			// 	_this.getPageByConditionFn(orderByField)
			// 	return
			// }
			_this.$axios.get(_this.$API.hotTags).then(res=> {
				// console.log(res)
			})
		},
		
		// 	const data = {
		// 		url: '/hotTags/findHotTags',
		// 		params: '',
		// 		type: 'uc',
		// 		call(response) {
		// 			let _data = response.data
		// 			_data.length > 15 ? (_data.length = 15) : ''
		// 			_articleList.screen.hotTags = JSON.stringify(response.data)
		// 			if (!response.data.length) {
		// 				_articleList.screen.hotTags = ''
		// 			}
		// 			_this.getPageByConditionFn(orderByField)
		// 		}
		// 	}
		// },
		//todo 获取文章分页信息
		getPageByCondition(orderByField) {
			let _this = this
			_this.findHotTags(orderByField)
		},

		getPageByConditionFn() {
			let _this = this
			let _articleList = _this.$refs._articleList
			
			// _articleList.screen.media = null;
			let params = {
				params: _articleList.screen
			}
			_this.axios.get(_this.$API.List	,params).then(res => {
				console.log(res)
			})
		}
		// 	getPageByConditionFn(orderByField = false) {
		// 	let _this = this
		// 	let _articleList = _this.$refs._articleList
		// 	let _url = '/spiderArticle/getArticlePageByCondition'
		// 	console.log(_articleList.screen.media)
		// 	// const _orderByField = _articleList.screen.orderByField;
		// 	if (_articleList.screen.media == 0 || !_articleList.screen.media) {
		// 		// 推荐资讯
		// 		_url = '/spiderArticle/getRecommendArticleByCondition'
		// 		_articleList.screen.orderByField = ''
		// 		delete _articleList.screen['media']
		// 	} else {
		// 		if (!orderByField) {
		// 			_articleList.screen.orderByField = 'pubTime'
		// 		}
		// 	}
		// 	const data = {
		// 		url: _url,
		// 		params: _articleList.screen,
		// 		loading: true,
		// 		call(response) {
		// 			if (response.data) {
		// 				let keyW = response.data.keywords
		// 				_articleList.articleData = response.data
		// 				_articleList.articleData.keywords = keyW
		// 				_articleList.articleListClassIs = true
		// 			}
		// 		}
		// 	}
		// 	_this.$store.state.global.axiosGet(data)
		// }
	},
	mounted() {
		this.getDataSpider()
		this.getPageByConditionFn()
		this.findHotTags()
		let _this = this
		let _articleList = _this.$refs._articleList
		let _global = _this.$store.state.global
		_articleList.screen.orderByField = 'pubTime'
		
	},
	created() {
		
	},
		beforeRouteLeave(to, from, next) {
		let position = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
		sessionStorage.setItem('scrollTop', position)
		to.meta.keepAliveSerch = false
		next()
	},
	beforeRouteEnter(to, from, next) {
		to.meta.keepAlive = true
		let position = sessionStorage.getItem('scrollTop') //返回页面取出来
		$('body,html').animate({ scrollTop: position }, 10)
		next()
	}
}
</script>
<style lang="scss">
</style>