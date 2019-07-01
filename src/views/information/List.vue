<template>
	<div class>
		<div class="w1200 disF minHD artListM">
			<div class="w1200 flex1 bgFFF mT10 plr10 pB10">
				<div class="mT10">
					<div class="disF">
						<!-- 中间的acrticle -->
						<div class="flex1">
							<articleList ref="_articleList" class="mT0" :articleData="articleData"></articleList>
						</div>
						<!-- 轮播图 -->
						<div class="flex210 pl10">
							<el-carousel height="150px" class="carouselD">
								<el-carousel-item v-for="(item, index) in recommendInfoArr['1']" :key="index">
									<div class="posR" @click="delUrlSet(item)">
										<a :href="$store.state.global.delUrl + '?docId=' + item.docId + '&media=' + item.media" target="_blank" class="fs875">
											<img class="carouselImg" height="150px" :src="item.otherImages | toImgOne" alt />
											<p class="carouselMsg">{{ item.title }}</p>
										</a>
									</div>
								</el-carousel-item>
							</el-carousel>
							<!-- 热门资讯 -->
							<div class="mT10">
								<h1 class="borBE5 fs1d2 mbf10">热门资讯</h1>
								<!--<h1 class="borBE5 fs1d2 mbf10" @click="getRecommendArticleByCondition">获取推荐资讯</h1>-->
								<div class="recomInfoD">
									<p class="textOver w217" @click="delUrlSet(item)" v-for="(item, index) in recommendInfoArr['0']" :title="item.title" :key="index">
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
			scrollTop: '',
			articleData: []
		}
	},
	components: {
		articleList
	},
	// props:[articleData],
	// 设置过滤器
	filters: {
		toImgOne(value) {
			if (!value) {
				return value
			}
			let _val = value
				.replace(/"/g, '')
				.replace(/\[/g, '')
				.replace(/\]/g, '')
				.split(',')[0]
			return _val
		}
	},
	methods: {
		// 获取轮播图数据
		getRecommendInformation(type, size) {
			let _this = this
			let _recommendInfoSreen = JSON.parse(JSON.stringify(_this.recommendInfoSreen))
			_recommendInfoSreen.type = type
			// console.log(type, '000')
			if (size) {
				_recommendInfoSreen.size = size
			}
			let params = {
				params: _recommendInfoSreen
			}
			// console.log(params, '111')
			_this.$axios.get(_this.$API.spiderArticle, params).then((res) => {
				// console.log(res.data.data.records)

				_this.recommendInfoArr[`${type}`] = res.data.data.records

				// console.log(_this.recommendInfoArr['1'])
			})
		},
		// todo 查询用户感兴趣的行业热词 findHotTags
		findHotTags(orderByField) {
			let _this = this
			let _articleList = _this.$refs._articleList
			if (_articleList.screen.hotTags) {
				_this.getPageByConditionFn(orderByField)
				return
			}
			_this.$axios.get(_this.$API.hotTags, '').then((response) => {
				let _data = response.data
				// console.log(_data);

				_data.length > 15 ? (_data.length = 15) : ''
				_articleList.screen.hotTags = JSON.stringify(response.data)
				if (!response.data.length) {
					_articleList.screen.hotTags = ''
				}
				_this.getPageByConditionFn(orderByField)
			})
		},
		//todo 获取文章分页信息
		getPageByCondition(orderByField) {
			let _this = this
			_this.findHotTags(orderByField)
		},
		getPageByConditionFn(orderByField = false) {
			let _this = this
			let _articleList = _this.$refs._articleList
			let _url = _this.$API.PageByCondition
			// console.log(_articleList.screen.media)

			if (_articleList.screen.media == 0 || !_articleList.screen.media) {
				// 推荐资讯
			 _url = _this.$API.List
			 console.log(_this.$API.List);
			 
				_articleList.screen.orderByField = ''
				delete _articleList.screen['media']
			} else {
				if (!orderByField) {
					_articleList.screen.orderByField = 'pubTime'
				}
			}
			let params = {
				params: _articleList.screen
			}
			// console.log(_articleList.screen);
			
			_this.axios.get(_url, params).then((response) => {
				let keyW = response.data.data.keywords
				_articleList.articleData = response.data.data
				// console.log(response.data.data)	
				_articleList.articleData.keywords = keyW
				_articleList.articleListClassIs = true
			})
		}
	},
	mounted() {
		let _this = this
		console.log();
		
		let _articleList = _this.$refs._articleList
		_this.getPageByCondition()
		_this.getPageByConditionFn()
		_this.getRecommendInformation(0)
		_this.getRecommendInformation(1, 5)
		_this.getRecommendInformation(2)
		// _this.getRecommendArticleByCondition()
		_articleList.getArticleSelectList()
		let _global = _this.$store.state.global
		_articleList.screen.orderByField = 'pubTime'
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