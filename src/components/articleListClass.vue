<!--todo 资讯列表不同类型的显示数据-->
<template>
	<div>
		<el-col class="fs875 mT10 cababab artlClass">
			<el-col :span="8" v-if="item[key]" v-for="(val, key) in nameContrastIndex">
				<!--申请日-->
				<span v-if="key == 'applyDay'">{{ val }}：{{ item[key] | formatDate('YY-MM-DD') }}</span>
				<span v-else>{{ val }}：{{ item[key] }}</span>
			</el-col>
		</el-col>
	</div>
</template>

<script>
// todo 初始化中文名
let nameContrast = [
	{
		name: '专利', //媒体名称
		contrast: {
			//显示数据中文名
			applyCode: '申请号',
			pubCode: '公开号',
			applyUnit: '申请人',
			applyDay: '申请日',
			agent: '发明人'
		}
	},
	{
		name: '专著',
		contrast: {
			pubUnit: '出版单位',
			bookCode: '国内刊号',
			interCode: '国际刊号',
			bookType: '出版周期',
			mainUnit: '主办单位'
		}
	},
	{
		name: '会议',
		contrast: {
			pubTime: '发布时间',
			address: '会议地点'
		}
	},
	{
		name: '文献',
		contrast: {
			academicType: '类型',
			unit: '所属',
			formatType: '格式',
			canDownload: '可下载'
		}
	},
	{
		name: '报告',
		contrast: {
			presentationType: '报告类型',
			pubStatus: '公开状态',
			approvalYear: '立项批准年'
		}
	},
	{
		name: '成果',
		contrast: {
			completeUnit: '第一完成单位',
			achieveCode: '中文图书分类号',
			achieveCode1: '学科分类号'
		}
	},
	{
		name: '标准',
		contrast: {
			standCode: '标准号',
			pubUnit: '发布部门',
			chinaCode: '国内标准分类号',
			interCode: '国际标准分类号'
		}
	}
]
export default {
	name: '',
	props: ['mediaName', 'item'],
	data() {
		return {
			nameContrastArr: nameContrast,
			nameContrastIndex: '' //当前媒体数据
		}
	},
	methods: {
		// todo 构造显示数据
		nameContrastFn(_mediaName = this.mediaName) {
			let _this = this
			let nameIndex = _this.nameContrastArr.find((value) => {
				return value.name == _mediaName
			})
			nameIndex ? (_this.nameContrastIndex = nameIndex.contrast) : (_this.nameContrastIndex = '')
		}
	},
	mounted() {
		let _this = this
		_this.nameContrastFn()
	}
}
</script>
