<template>
	<el-row>
		<el-col :span="24">
			<!--<span @click="getLikeStatus">查询点赞状态............</span><br><br>-->
			<!--<span @click="aa">查询收藏状态..........</span><br><br>-->
			<span class="artDetTitle">{{ articleDetail.title }}</span>
		</el-col>
		<el-col :span="17" class="detCentTip">
			<i @click="$parent.getPageByCondition(item.name)" v-for="(item, index) in keywordsArr" v-if="index < 3" :key="index">{{ item.name }}</i>
			<!--<i v-if="$store.state.global.details.score">相关度：{{$store.state.global.details.score | toFixed(2)}}%</i>-->
		</el-col>
	</el-row>
</template>
<script>
export default {
	name: '',
	components: {
		articleListClass
	},
	data() {
		return {
			// lookMore: false, //查看更多 标识
			chooseTopic: '', // 选择的专题
			authorThemaArr: '', // 专题列表
			articleEntity: '', //文章翻译后的实体
			curArticle: JSON.parse(sessionStorage.getItem('curArticle')), //当前文章 - （加入专题使用）
			dialogFormShare: false, //分享 弹窗
			dialogFormVisibleTopic: false, //选择专题 弹窗
			insert: {
				author: '林敏俐',
				avatar: 'imgUrl',
				type: 0, // 动态
				content: '',
				title: '',
				summary: '', //转发摘要
				originalLink: '' //原文链接
			},
			dialogFormVisible: false, //加入专题 弹窗
			form: {
				reason: ''
			},
			rules: {
				reason: [
					{ required: true, message: '请输入推荐理由', trigger: 'blur' },
					{ min: 3, max: 300, message: '长度在 3 到 300 个字符', trigger: 'blur' }
				]
			},
			topArrTypeSession: sessionStorage.getItem('topArrType'),
			userLeftNavSession: sessionStorage.getItem('userLeftNav'),
			articleDetail: '', //文章详情
			contentTranslate: '', //翻译的文章
			contentOld: '', //原文
			detailTran: {}, //翻译文
			titleTranslate: '', //翻译的标题
			titleOld: '', //标题
			translateIs: false, //翻译标识
			likeStatus: '', // 点赞数据、状态
			collectStatus: '', // 收藏数据、状态
			collect: false, //收藏标记
			keywordsArr: [], //关键词
			centerDialogVisible: false,
			idea: {
				title: '',
				content: ''
			}, //加入云笔记 数据
			// 正文图片
			contentImg: {
				imgNameArr: '', //图片标识
				contImgArr: '' //图片实体路径
			}
		}
	},
	filters: {
		// todo 视频传参
		playerOptionsFn(value) {
			let playerOptions = {
				playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
				autoplay: false, //如果true,浏览器准备好时开始回放。
				muted: false, // 默认情况下将会消除任何音频。
				loop: false, // 导致视频一结束就重新开始。
				preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
				language: 'zh-CN',
				aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
				fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
				sources: [
					{
						type: '',
						src: '' //url地址
						// src: "http://vali.cp31.ott.cibntv.net/youku/6572d250f8031713ad3395e8f/03000801005C1C6272E6C97003E880233362BF-ABE2-40A2-B257-6ABAD05037AA.mp4?sid=054742831100010001762_00_Aa3449832232eece15a48bea6ab5ac52a&sign=5e37e5238a76d4139ccde7d98001ec79&ctype=50" //url地址
					}
				],
				poster: '', //你的封面地址
				// width: document.documentElement.clientWidth,
				notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
				controlBar: {
					timeDivider: true,
					durationDisplay: true,
					remainingTimeDisplay: false,
					fullscreenToggle: true //全屏按钮
				}
			}
			playerOptions.sources[0].src = `http://cdn.jmrh596.com/${value}`
			return playerOptions
		},
		//todo 获取书 图片路径
		otherImagesFn(value) {
			let _val = value.split('"')
			return _val[1]
		},
		//todo 高亮关键字
		numFilter(value, arr, contentImg) {
			let _valIndex = value
			if (!value) {
				return ''
			}

			if (arr) {
				if (arr.length > 3) {
					arr.length = 3
				}
				arr.forEach((item) => {
					let index = `<span class="cff6262">${item}</span>`
					_valIndex = _valIndex.replace(new RegExp(item, 'g'), index)
				})
				_valIndex = _valIndex.replace(/\/>/g, "/><span class='p1rem'></span>")
			}
			let _contentImg = contentImg
			if (_contentImg.imgNameArr.length) {
				_contentImg.imgNameArr.forEach((item) => {
					const index = _contentImg.contImgArr.find((value) => {
						return value.name == item
					})
					if (!index.src) {
						return
					}
					let _item = `Бimg:${item}Б`
					let _val = `<p class="textC maxW100pre"><img src="${index.src}" alt="${index.alt}" /></p>`
					_valIndex = _valIndex.replace(new RegExp(_item, 'g'), _val)
				})
			}
			return _valIndex
    },
    methods: {
      // todo 获取作者的专题
            getAuthorThema(){
                let _this = this;
                let _global = _this.$store.state.global;
                if (!_global.userStausFn()) {
                    return
                }
                const data = {
                    url: "/topic/getPageByCondition",
                    params: {
                        userId: _global.userId,
                    },
                    call(response){
                        _this.dialogFormVisibleTopic = true;
                        _this.authorThemaArr = response.data.records;
                    }
                }
                _global.axiosGet(data);

            },
      // todo 跳转详情页，设置文章参数
       delUrlSet(defData){
                sessionStorage.setItem('media',defData.media);
                sessionStorage.setItem('docId',defData.docId);
                sessionStorage.setItem('mediaName',defData.media);
            },
    },
	}
}
</script>