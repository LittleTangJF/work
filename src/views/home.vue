<template>
  <div>
    <homeTop></homeTop>
    <keep-alive>
      <router-view ref="_child"/>
    </keep-alive>

    <div v-if="!footerNo" class="footer">四川省军民科技协同创新平台 版权所有 Copyright © 2018-京ICP备13002826号-9</div>
  </div>
</template>
<script>
import homeTop from './header';
export default {
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      footerNo: ''
    };
  },
  components: {
    homeTop
  },
  created() {
    // this.getData();
  },
  methods: {
    reload() {
      let _this = this;
      _this.isRouterAlive = false;
      _this.$nextTick(function() {
        _this.isRouterAlive = true;
      });
    },
    getPageByConditionChild() {
      this.$refs._child.getPageByCondition();
    },
    currentIndexList() {
      this.$refs._child.currentIndexList();
    }
  },
  mounted() {
    let _this = this;
    _this.footerNo = _this.$refs._child.footerNo;
  }
};
</script>
<style >
</style>