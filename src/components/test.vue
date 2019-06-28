<template>
  <div>
    <div class="contMediaMapD" style="display: flex">
      <div class="mediaMapD">
        <p class="mediaMapDFirst">大家都在看</p>
        <p
          v-for="(val, key) in queryNav.mediaMap"
          :class="mediaMapIndex == key ? 'active' : ''"
          @click="currentIndex(), mediaMapFn(key), $parent.getPageByConditionFn()"
          :key="key"
        >
          <img class="mediaMapImg" :src="mediaImg[key]" alt>
          {{ val }}
        </p>
      </div>
    </div>
    <div class="contMediaRight">
      <el-row
        justify="space-between"
        class="pLR20 queryNavD"
        v-if="!$parent.articleListChild_queryNavNo"
      >
        <el-col :span="19">
          <span class="hotRankD disF">
            <el-select
              @change="currentIndex(), $parent.getPageByCondition()"
              v-if="urlName != 'informationList'"
              v-model="mediaDef"
              slot="prepend"
              width="50px"
              placeholder="新闻"
            >
              <el-option
                v-for="(val, key) in queryNav.mediaMap"
                :key="key"
                :label="val"
                :value="key"
              ></el-option>
            </el-select>
          </span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
// import filter from "../assets/filter/filter";
import img0 from "../assets/img/tuij.svg";
import img1 from "../assets/img/xinw.svg";
import img2 from "../assets/img/shej.svg";
import img3 from "../assets/img/zhuanl.svg";
import img4 from "../assets/img/zhuanz.svg";
import img5 from "../assets/img/huiy.svg";
import img6 from "../assets/img/wenx.svg";
import img7 from "../assets/img/baog.svg";
import img8 from "../assets/img/chengg.svg";
import img9 from "../assets/img/biaoz.svg";
import img10 from "../assets/img/zhenc.svg";
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
};
let subNavdel = [
  { name: "核粒子", value: 11 },
  { name: "核原子", value: 14 },
  { name: "核材料", value: 7 },
  { name: "核武器", value: 2 }
];

export default {
  data() {
    return {
      mediaImg: mediaImgInt,
      queryNav: {
        // 筛选条件
        mediaMap: "", //文章媒体列表（新闻、期刊...）
        subNavdelArr: subNavdel, //文章媒体 子列表（核粒子、核原子...）
        countryList: "", //国家列表
        languageMap: "", //语言列表
        spiderSortMap: "" //排序列表
      }
    };
  },
  methods: {
    getData() {
      let _this = this;
      _this.$axios.get(_this.$API.discovery).then(res => {
        console.log(res.data.data);
        _this.queryNav = res.data.data;
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>