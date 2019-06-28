<template>
	<div class="mainD ">
		<slot name="recommend"></slot>
		<div class="contMediaMapD" style="display: flex">
			<div class="mediaMapD">
				<p class="mediaMapDFirst">大家都在看</p>
				<!--<p @click="currentIndex(),mediaMapFn(key),$parent.getPageByConditionFn('all')">推荐资讯</p>-->
				<p
					v-for="(val, key) in queryNav.mediaMap"
					:class="mediaMapIndex == key ? 'active' : ''"
					@click="currentIndex(), mediaMapFn(key), $parent.getPageByConditionFn()"
					:key="key"
				>
					<img class="mediaMapImg" :src="mediaImg[key]" alt="" />
					{{ val }}
				</p>
			</div>
			<div class="contMediaRight">
				<el-row justify="space-between" class="pLR20 queryNavD">
					<el-col :span="19">
						<span class="hotRankD disF">
							<el-select @change="currentIndex(), $parent.getPageByCondition()" v-model="mediaDef" slot="prepend" width="50px" placeholder="新闻">
								<el-option v-for="(val, key) in queryNav.mediaMap" :key="key" :label="val" :value="key"></el-option>
							</el-select>
							<el-select
								@change="currentIndex(), $parent.getPageByCondition()"
								v-model="screen.country"
								slot="prepend"
								placeholder="国家"
								width="50px"
							>
								<el-option v-for="(item, index) in countryListArr" :key="index" :label="item.zh_name" :value="item.code"></el-option>
							</el-select>
							<el-select @change="currentIndex(), $parent.getPageByCondition()" v-model="screen.language" slot="prepend" placeholder="语言">
								<el-option label="全部" :value="languageInt"></el-option>
								<el-option v-for="(val, key) in queryNav.languageMap" :key="key" :label="val" :value="key"></el-option>
							</el-select>

							<el-select
								v-if="$store.state.thematic.topArrTypeSession != 'topic' || $store.state.thematic.userLeftNavSession != 'subscribe'"
								@change="currentIndex(), $parent.getPageByCondition()"
								v-model="screen.industry"
								
								class="w95"
								slot="prepend"
								placeholder="行业"
							>
							
								<el-option label="全部行业" :value="industryInt"></el-option>
								<el-option v-for="(val, key) in industryArr.industryMap" :key="key" :label="val" :value="key"></el-option>
							</el-select>
							<el-select
								@change="currentIndex(), $parent.getPageByCondition(true)"
								v-model="screen.orderByField"
								slot="prepend"
								placeholder="排序"
								class="w95"
							>
								<!--资讯-->
								<el-option v-for="(val, key) in queryNav.spiderSortMap" :key="key" :label="val" :value="key"></el-option>
								<!--文章-->
								<!-- <el-option
                                v-for="(val,key) in queryNav.articleSortMap" :key="key" :label="val" :value="key"></el-option> -->
							</el-select>

							<el-date-picker
								class="analMDate mT4"
								size="small"
								@change="timeSelectFn"
								v-model="valueTime"
								value-format="yyyy-MM-dd hh:mm:ss"
								type="datetimerange"
								:picker-options="pickerOptions2"
								:default-time="['00:00:00', '23:23:59']"
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
							>
							</el-date-picker>
						</span>
					</el-col>
					<el-col :span="5" class="textR mt5">
						<span>
							<el-select height="30px" @change="translate()" v-model="translateActive" slot="prepend" placeholder="全文翻译" class="w130 borGarden">
								<el-option label="中文" value="1"></el-option>
								<!--<el-option label="英文" value="2"></el-option>-->
							</el-select>
						</span>
					</el-col>
				</el-row>
				<el-row justify="space-between" class="navMsg" v-if="!$parent.articleListChild_totalNo">
					<el-col>
						<span class="mR15"
							>当前相关数据约<em>{{ articleData.total }}</em
							>条</span
						>
						<!--<span class="mR15">为您找到相关数据约<em>{{articleData.total}}</em>条</span>-->
						<!--<span>最后更新时间：2018-08-20</span>-->
						<!--<span>最后更新时间：{{articleData.records[0].pub_time}}</span>-->
					</el-col>
				</el-row>
				<!-- 插槽 -->
				<el-row>
					<el-col>
						<slot name="noArt"></slot>
					</el-col>
				</el-row>

				<!-- 文章数据列表 -->
				<el-row justify="space-between" v-for="(item, index) in articleData.records" class="centMainD">
					<!--<el-col>
                    ////{{item.media}}
                </el-col>-->
					<!--标题-->
					<el-col
						:class="
							item.videoSrc
								? 'pl250 mh100'
								: item.otherImages && queryNav.mediaMap[item.media] != '社交' && toArr(item.otherImages).length == 1
								? 'mh100 pl160'
								: ''
						"
						:span="24"
						class="wbFlex"
					>
						<div class="mainTitle">
							<div v-if="item.zhTitle">
								<p @click="goPageDetails(item, index)" class="c333 href cuP">原文：{{ item.title }}</p>
								<span @click="goPageDetails(item, index)" class="fs1rem href">翻译：{{ item.zhTitle }}</span>
							</div>
							<span v-else @click="goPageDetails(item, index)" class="fs1rem href">{{ item.title }}</span>

							<p class="fr articleTagsD">
								<span @click="goSearchGlobal(subItem)" v-for="(subItem, index) in item.keywordList" :key="index">{{ subItem }}</span>
							</p>
						</div>
						<!--文章按钮-->
						<slot name="articleBtn" :item="(item, index)"></slot>
					</el-col>

					<el-col>
						<div class="flexW hcFlex">
							<div class="flex80" v-if="queryNav.mediaMap[item.media] == '社交'">
								<img v-if="item.avatar" :src="item.avatar" class="borR100" width="70" alt="" />
								<img v-else src="../assets/img/userDef.png" class="borR100" width="70" alt="" />
							</div>
							<div v-if="queryNav.mediaMap[item.media] == '社交'" class="mainCunt flex1">
								<span class="clamp4" @click="goPageDetails(item, index)" v-html="$options.filters.numFilter(item.summary, item.keywordList)"></span>
							</div>
							<!--视频-->
							<!--文章目录图-->

							<!--文章信息-->
							<div
								class="w100pre"
								:class="item.videoSrc ? 'pl250 mtF20' : item.otherImages && toArr(item.otherImages).length == 1 ? 'pl160 mtF20' : 'mT10'"
							>
								<!--摘要-->
								<!--<el-col :span="24" class="mainCunt">
                                <span class="clamp4" @click="goPageDetails(item,index)" v-html="$options.filters.numFilter(item.summary,item.keywordList)"></span>
                            </el-col>-->

								<el-col :span="12" class="lOperate">
									<!--todo 订阅专题的文章：显示专题名-->
									<span
										class="mR10 c666"
										v-if="urlName == 'subscribe'"
										v-html="$options.filters.getTopicNameById(item.topicId, $store.state.thematic.listArr)"
									></span>

									<span v-if="item.sfs">{{ item.sfs.readCount || 0 }}</span>
									<span v-else-if="item.ufs">{{ item.ufs.readCount || 0 }}</span>
									<span v-else>0</span> 人阅读
									<span class="pl10">{{ item.pubTime }}</span>
								</el-col>
								<el-col :span="12" class="rOperate">
									<span v-if="item.repostedCount">转载量：{{ item.repostedCount }}</span>
									<span
										><a :title="item.source" :href="'http://' + item.source" target="_blank">{{ item.sourceNameZh }}</a></span
									>

									<span><a :title="item.url" :href="item.url" target="_blank">原文链接</a></span>
									<span v-if="item.score && item.score !== 'NaN'">相关度：{{ item.score | toFixed(2) }}%</span>
								</el-col>
							</div>
						</div>
					</el-col>
					<!-- todo 不同类型的显示数据-->
					<!--<p>{{item}}//{{queryNav.mediaMap}}</p>-->
					<articleListClass
						v-if="articleListClassIs"
						ref="_articleListClass"
						:mediaName="queryNav.mediaMap[item.media]"
						:item="item"
					></articleListClass>
				</el-row>
			</div>
		</div>
	</div>
</template>
<script>
// import filter from "../assets/filter/filter";
import img0 from '../assets/img/tuij.svg'
import img1 from '../assets/img/xinw.svg'
import img2 from '../assets/img/shej.svg'
import img3 from '../assets/img/zhuanl.svg'
import img4 from '../assets/img/zhuanz.svg'
import img5 from '../assets/img/huiy.svg'
import img6 from '../assets/img/wenx.svg'
import img7 from '../assets/img/baog.svg'
import img8 from '../assets/img/chengg.svg'
import img9 from '../assets/img/biaoz.svg'
import img10 from '../assets/img/zhenc.svg'
let mediaImgInt = {
	0: img0,
	1: img1,
	2: img2,
	3: img3,
	4: img4,
	5: img5,
	6: img6,
	7: img7,
	8: img8,
	9: img9,
	10: img10
}
let subNavdel = [{ name: '核粒子', value: 11 }, { name: '核原子', value: 14 }, { name: '核材料', value: 7 }, { name: '核武器', value: 2 }]
let countryListInt = [
	{
		id: null,
		code: null,
		zh_name: '全部',
		en_name: 'all'
	},
	{
		id: 37,
		code: 'CN',
		zh_name: '中国',
		en_name: 'China'
	},
	{
		id: 58,
		code: 'GB',
		zh_name: '英国',
		en_name: 'United Kiongdom'
	},
	{
		id: 173,
		code: 'US',
		zh_name: '美国',
		en_name: 'United States of America'
	},
	{
		id: 56,
		code: 'FR',
		zh_name: '法国',
		en_name: 'France'
	},
	{
		id: 89,
		code: 'KR',
		zh_name: '韩国',
		en_name: 'Korea'
	},
	{
		id: 84,
		code: 'JP',
		zh_name: '日本',
		en_name: 'Japan'
	}
]
export default {
	data() {
		return {
			mediaImg: mediaImgInt,
			industryArr: [],
			screen: {
				size: 10,
				current: 1,
				media: 1,
				// media: 5,
				country: '',
				language: '',
				// query:'实时数据处理层',
				query: '',
				startTime: '',
				endTime: '',
				industry: null, //行业
				source: '',
				hotTags: '', //用户感兴趣的行业热词
				// orderByField: 'pubTime'
				orderByField: this.$store.state.thematic.orderByField
			},
			pickerOptions2: {
				shortcuts: [
					{
						text: '今天',
						onClick(picker) {
							const end = filter.formatDate(new Date(), 'YY-MM-DD') + ' 23:59:59'
							const start = filter.formatDate(new Date(), 'YY-MM-DD') + ' 00:00:00'
							// start.setTime(start);
							// console.log(start, end, 999)
							picker.$emit('pick', [start, end])
						}
					},
					{
						text: '最近一周',
						onClick(picker) {
							const end = new Date()
							const start = new Date()
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
							picker.$emit('pick', [start, end])
						}
					},
					{
						text: '最近一个月',
						onClick(picker) {
							const end = new Date()
							const start = new Date()
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
							picker.$emit('pick', [start, end])
						}
					}
				]
			},
			queryNav: {
				// 筛选条件
				mediaMap: '', //文章媒体列表（新闻、期刊...）
				subNavdelArr: subNavdel, //文章媒体 子列表（核粒子、核原子...）
				countryList: '', //国家列表
				languageMap: '', //语言列表
				spiderSortMap: '' //排序列表
			},
			countryListArr: countryListInt,
			mediaDef: '',
			valueTime: '',
			mediaMapIndex: 0,
			languageInt: null, //默认语言 （搜索条件）
			industryInt: null, //默认行业 （搜索条件）
			addArticleItem: {}, // 加入专题数据
			dialogFormVisible: false, //加入专题 弹窗
			translateActive: '',
			articleData: ''
		}
	},
	methods: {
		getArticle() {
			let _this = this
			console.log(_this.screen.country);
			
			_this.$axios.get(_this.$API.getArticle).then((res) => {
				// console.log(res.data.data);
				_this.queryNav = res.data.data
			})
		},
		getTopic() {
			let _this = this
			_this.$axios.get(_this.$API.getTopic).then((res) => {
				// console.log(res.data.data)
				_this.industryArr = res.data.data
			})
		},
		timeSelectFn() {
			let _this = this
			if (_this.valueTime) {
				_this.screen.startTime = _this.valueTime[0]
				_this.screen.endTime = _this.valueTime[1]
			}
			_this.$parent.getPageByCondition()
		},
		currentIndex() {
			let _this = this
			_this.screen.current = 1
			_this.translateActive = ''
			if (_this.mediaDef) {
				_this.screen.media = _this.mediaDef
			} else {
				_this.headNav != 'informationList' ? (_this.screen.media = 1) : ''
			}

			let searchGb = JSON.parse(sessionStorage.getItem('searchGb'))
			let _val
			for (let key in searchGb) {
				_val = searchGb[key]
			}
			let newSearchGb = {}
			newSearchGb[_this.screen.media] = _val
			sessionStorage.setItem('searchGb', JSON.stringify(newSearchGb))

			_this.$refs._articleListClass.forEach((item) => {
				item.nameContrastFn(_this.queryNav.mediaMap[_this.screen.media])
			})
		},
		mediaMapFn(key) {
			let _this = this
			_this.mediaMapIndex = key
			_this.screen.media = key
			_this.articleListClassIs = false
			$('body,html').animate({ scrollTop: '0' }, 10)
		},
		translate() {
			let _this = this
			// 正则 匹配首尾 "
			let reg = /^["|'](.*)["|']$/g
			_this.articleData.records.forEach((item) => {
				let _language = item.language.toUpperCase()
				if (_language == 'ZH') {
					return false
				}
				let dataTitleParams = {
					from: _language, // 来源语种
					to: 'ZH', // 翻译语种
					text: item.title.replace(/<[^>]+>/g, '')
				}
				let dataTitle = {
					url: '/bigData/translationData',
					params: JSON.stringify(dataTitleParams),
					type: 'allTranslate',
					contentType: 'application/json',
					call(response) {
						if (!response.data && !response.data[0]) {
							return
						}
						item.title = response.data[0].replace(reg, '$1')
					}
				}
				_this.$store.state.global.axiosPost(dataTitle)

				let dataSummaryParams = {
					from: _language, // 来源语种
					to: 'ZH', // 翻译语种
					text: item.summary.replace(/<[^>]+>/g, '')
				}
				let dataSummary = {
					url: '/bigData/translationData',
					params: JSON.stringify(dataSummaryParams),
					type: 'allTranslate',
					contentType: 'application/json',
					call(response) {
						if (!response.data[0]) {
							return
						}
						item.summary = response.data[0].replace(reg, '$1')
					}
				}
				_this.$store.state.global.axiosPost(dataSummary)
			})
		},
		sessionStoreSet(name, val) {
			let _thematic = this.$store.state.thematic
			sessionStorage.setItem(name, val)
			_thematic[name + 'Session'] = val
		},
		handleSizeChange(val) {
			let _this = this
			_this.screen.size = val
			_this.screen.current = 1
			_this.$parent.getPageByCondition()
		},
		handleCurrentChange(val) {
			let _this = this
			let _global = _this.$store.state.global
			if (!_global.userStausFn()) {
				return
			}
			_this.screen.current = val
			_this.translateActive = ''
			_this.$parent.getPageByCondition()
			$('body,html').animate({ scrollTop: 0 }, 10)
		}
	},
	created() {
		this.getArticle()
		this.getTopic()
	}
}
</script>
<style  scoped>
.contMediaRight {
	width: calc(100% - 130px);
}
</style>
