<template>
  <header class="NavBar">
    <div class="NavBar-top">
      <!-- logo -->
      <a href="http://www.jmrh596.com:2181"
        ><img src="../assets/img/logoNew.png"
      /></a>
      <!-- 登录 -->
      <div>
        <el-dropdown
        >
          <!--todo 如果在cookies 里有用户头像字段，则显示图像，否则显示icon-->
          <img
          />
          <i
           
            class="icon el-icon-user el-button el-button--default is-circle"
          ></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="1">用户中心</el-dropdown-item>
            <el-dropdown-item :command="0">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <template>
          <a :href="`http://uc.jmrh596.com:2181/#/login?url=W`"
            >登录</a
          >
          <span>&emsp;|&emsp;</span>
          <a href="http://uc.jmrh596.com:2181/#/join">注册</a>
        </template>
      </div>
    </div>
    <nav class="NavBar-menu">
      <!--todo 请修改 :class index 对应的数字-->
      <a
        v-for="(nav, index) of navBar"
        :key="index"
        :href="nav.href"
        :class="index === 0 ? 'active' : ''"
        >{{ nav.name }}
        <menu v-if="nav.children.length">
          <a
            v-for="(menu, idx) of nav.children"
            @click="setHeadNav(menu.headNav)"
            :key="`${index}-${idx}`"
            :href="menu.href"
            >{{ menu.name }}</a
          >
        </menu>
      </a>
    </nav>
  </header>
</template>
<script>
export default {
  data() {
    return {
       navBar: [
        {
          id:1,
          name: "前沿技术发现",
          href: "//news.jmrh596.com:2181",
          children: [
            {
              name: "发现",
              href: "//news.jmrh596.com:2181/#/information/list",
              headNav: "informationList"
            },
            {
              name: "专题",
              href: "//news.jmrh596.com:2181/#/thematic/index"
            },
            {
              name: "科技圈",
              href: "//news.jmrh596.com:2181/#/scienceCircle/list"
            }
          ]
        },
        { id:2,
          name: "项目组织管理",
          href: "//pm.jmrh596.com:2181",
          children: []
        },
        {
           id:3,
          name: "创新资源整合",
          href: "//shop.jmrh596.com:2181",
          children: []
        },
        {
           id:4,
          name: "政策先行先试",
          href: "//policy.jmrh596.com:2181",
          children: [
            {
              name: "最新发布",
              href: "//policy.jmrh596.com:2181"
            },
            {
              name: "政策法规",
              href: "//policy.jmrh596.com:2181/#/policyAndstatute"
            },
            {
              name: "行业标准",
              href: "//policy.jmrh596.com:2181/#/industryStandard"
            }
          ]
        },
        {
           id:5,
          name: "科技成果转化",
          href: "//achievement.jmrh596.com:2181",
          children: []
        },
        {
           id:6,
          name: "科技金融服务",
          href: "//finance.jmrh596.com:2181",
          children: [
            {
              name: "贷款",
              href: "//finance.jmrh596.com:2181/#/loanList"
            },
            {
              name: "资金",
              href: "//finance.jmrh596.com:2181/#/financProject?type=10"
            },
            {
              name: "项目",
              href: "//finance.jmrh596.com:2181/#/financProject"
            }
          ]
        },
        {
           id:7,
          name: "国际合作交流",
          href: "//cooperation.jmrh596.com:2181",
          children: [
            {
              name: "国际交流活动",
              href: "//cooperation.jmrh596.com:2181/#/events"
            },
            {
              name: "交流活动秀",
              href: "//cooperation.jmrh596.com:2181/#/show"
            },
            {
              name: "人才引入",
              href: "//cooperation.jmrh596.com:2181/#/talent"
            },
            {
              name: "海归落户",
              href: "//cooperation.jmrh596.com:2181/#/returnees"
            }
          ]
        },
        {
           id:8,
          name: "关于我们",
          href: "//www.jmrh596.com:2181/#/about",
          children: []
        }
      ],
    }
  },
};
</script>
<style lang="scss">
$bg: rgba(0, 0, 0, 0.3);
.NavBar {
  position: relative;
  width: 100vw;
  height: 132px;
  &-input {
    width: 385px;
    margin-right: 50px;
    input {
      padding-left: 30px;
      padding-right: 50px;
      background: #f8f8f8;
      border: #f8f8f8;
      border-radius: 20px !important;
    }
    i {
      width: 50px;
      font-size: 18px;
    }
  }
  &-avatar {
    border-radius: 50%;
  }
  &-top,
  &-menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &-top {
    height: 80px;
    background: #fff;
    padding: 0 calc(50% - 600px);
    a,
    span {
      color: #c0c4cc;
      cursor: pointer;
      font-size: 14px;
    }
  }
  &-menu {
    position: absolute;
    background: #104297;
    padding: 0 calc(50% - 600px);
    z-index: 10;
    > a {
      text-decoration:none;
      position: relative;
      display: block;
      width: 150px;
      height: 52px;
      line-height: 52px;
      color: #fff;
      cursor: pointer;
      font-size: 16px;
      text-align: center;
      text-indent: 2px;
      transition: 0.2s all linear;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 100%;
        width: 0;
        height: 100%;
        background: $bg;
        transition: 0.2s all linear;
      }
      &:hover {
        &::before {
          width: 100%;
          top: 0;
          left: 0;
          transition-delay: 0.1s;
          background: $bg;
          z-index: -1;
        }
        ~ a::before {
          left: 0;
        }
        menu {
          font-weight: normal;
          display: block;
        }
      }
      &.active {
        background: $bg;
        font-weight: 800;
      }
    }
  }

  menu {
    display: none;
    position: absolute;
    left: 0;
    width: 100%;
    padding: 10px 0;
    background: #fff;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    a {
      display: block;
      color: black;
      text-align: center;
      /*text-align: left;*/
      /*text-indent: 1rem;*/
      &:hover {
        color: #fff;
        background: #0147cb;
      }
    }
  }
  .input-with-select {
    border-radius: 20px;
    overflow: hidden;
  }
  .el-input-group__prepend {
    border: none !important;
  }
  .el-input-group__append {
    border: none !important;
  }
}
</style>

