<template>
	<div :class="det.urlName == 'searchGlobal' ? 'w1200 bgFFF p10 mT10 minHbody' : ''">
		<p style="position: fixed;bottom: 10px;left: 0;">
			<!--<span @click="aa">78455555555555555555555555........</span><br>-->
		</p>
    <h1>哈哈哈</h1>
		<el-breadcrumb separator-class="el-icon-arrow-right" class="fs12">
			<el-breadcrumb-item :to="{ name: det.urlName }">
				<span v-if="$parent.listIsBool" @click="$parent.listIsBool(true)">{{ mediaName }}</span>
				<!--<span v-if="$parent.listIsBool" @click="$parent.listIsBool(true)">{{det.name}}</span>-->
				<!--<span v-else>{{det.name}}</span>-->
				<span v-else>{{ mediaName }}</span>
			</el-breadcrumb-item>
			<el-breadcrumb-item>详情页面</el-breadcrumb-item>
      <div class="disF mT10">
            <div class="w75pre detCentD flex1">
                <articleDet ref="_articleDet"></articleDet>
            </div>
            <div :class="relatedTechArr && relatedTechArr.length ? '' : 'none'" class="w25pre pl10">
                <wordCloud ref="_wordCloud">
                    <h1 slot="title">文章相关技术词</h1>
                </wordCloud>
            </div>
        </div>
		</el-breadcrumb>
	</div>
</template>
<script>
  import articleDet from '../components/articleDet.vue'
  //todo 文章标签数据处理
    let optionsTag = []; //文章标签数据
    let _tagData = tagData.RECORDS; //文章标签原始数据
    _tagData.forEach(item=>{
        if (item.level == 1){
            item.label = item.name;
            item.value = item.id;
            optionsTag.push(item);
        }
    });
    optionsTag.forEach(item=>{
        let _index = _tagData.filter(value => {
            return value.parent == item.id;
        })
        if (!_index.length){
            return
        }
        _index.forEach(subItem=>{
            //二级
            subItem.label = subItem.name;
            subItem.value = subItem.id;
            let _subIndex = _tagData.filter(value => {
                return value.parent == subItem.id;
            })
            if (!_subIndex.length){
                return
            }
            //三级
            _subIndex.forEach(item=>{
                item.label = item.name;
                item.value = item.id;
            })
            subItem.children = _subIndex;
        })
        item.children = _index;
    });
export default {
   name: "",
        data(){
            return{
                lookMore: false, //查看更多 标识
                chartDataMax: 6, //知识图谱每级显示最大条数
                // 评论查询数据
                screen:{
                    size:5,
                    current:1,
                    media: this.$store.state.thematic.mediaSession,//文章类型
                    docId: this.$store.state.thematic.docIdSession,//文章doc_id
                    type: 3,
                    intId: this.$store.state.thematic.keyIdSession
                },
                det: JSON.parse(sessionStorage.getItem('det')) || {},
                mediaName:sessionStorage.getItem("mediaName"),
                // 知识图谱 默认数据
                chartContactChild:{
                    data:[{
                        name: '文章',
                        symbolSize: 90,
                        itemStyle: {
                            normal: {
                                color: 'rgb(254,101,7)'
                            }
                        }
                    }],
                    links:[]
                },
                // 知识图谱 全部数据
                chartObj: {},
                // 知识图谱 点击时生成的数据
                chartContactTrends: '',
                // 知识图谱 颜色配置
                chartContactColor:{
                    1: 'rgb(103,103,253)', //专家
                    2: 'rgb(254,152,54)', //机构
                    11: 'rgb(0,152,152)', //关键字
                    other: 'rgb(255,51,115)' //媒体类型
                    // other: 'rgb(219,222,229)' //媒体类型
                },
                editorIs: false,
                editorOption: {
                    modules: {
                        toolbar: false
                    },
                    placeholder: ""
                },
                articleDetail: '', // 文章详情
                contImgArr: [],// 文章详情，图片数组
                relatedTechArr: [],//文章相关技术词
                relWordsNoPage: true, // 不是通过点击相关技术词 进入搜索页面
                // commentArr: comment,
                commentData: '', // 评论数据
                //用户发表评论
                commentUser:{
                    id:"000",//主键id
                    docId: sessionStorage.getItem('docId'),//文章id
                    media: sessionStorage.getItem('media'),
                    userId: this.$store.state.global.userId,//用户id
                    userName: '',//用户名称
                    userIdAnswer:"",//用户id (回复) 新加
                    userNameAnswer:"",//用户名称 (回复) 新加
                    avatar:"",//用户头像
                    content:"",//评论内容
                    type: 3,
                    intId: this.$store.state.thematic.keyIdSession,
                },
                options: optionsTag,//文章标签
                selectedOptions:[], //文章标签选中当前
                selectedOptionsAll: [] // 文章标签全部
            }
        },
        components: {
            wordCloud,
            articleDet,
            chartContact,
            subListContact
        },
        methods: {
           // todo 文章删标签
           spiderArticleTagRemove(tag){
                let _this = this;
                let _selectedOptionsAll = _this.selectedOptionsAll;
                _selectedOptionsAll.splice(_selectedOptionsAll.indexOf(tag), 1);
                _this.spiderArticleTagFn();
            },
             // todo 文章打标签
            spiderArticleTagSet(value) {
                let _this = this;
                let name = '';
                value.forEach((item,index)=>{
                    let _data = _tagData.find(val=>{
                        return val.id == item
                    })
                    if (index != value.length - 1){
                        name += _data.name + ' / '
                    }else {
                        name += _data.name
                    }
                })
                _this.selectedOptionsAll.push(name);
                _this.spiderArticleTagFn();
            },
        },
}
</script>
