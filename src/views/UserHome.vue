<template>
  <div class="App">
    <div class="header-nav">
      <HomeHeader>

      </HomeHeader>
    </div>
    <div v-if="route.params.uName === user?.username" @mouseenter="isHover=true"
          @mouseleave="isHover=false" 
          class="sidebar"
    >
      <el-menu
        :default-active="route.name"
        class="el-menu-vertical-demo"
        
        background-color="rgb(198, 226, 255)"
        router
        :show-timeout="0"
      >
        <el-menu-item index="userDetail">
          <el-icon><User /></el-icon>
          <span>个人信息</span>
        </el-menu-item>
        <el-menu-item index="editDetail">
          <el-icon><EditPen /></el-icon>
          <span>修改个人信息</span>
        </el-menu-item>
        <el-menu-item index="userFollowed">
          <el-icon><CircleCheck /></el-icon>
          <span>我关注的</span>
        </el-menu-item>
        <el-menu-item index="fans">
          <el-icon><View /></el-icon>
          <span>我的粉丝</span>
        </el-menu-item>
        <el-menu-item index="published">
          <el-icon><Goods /></el-icon>
          <span>我发布的</span>
        </el-menu-item>
        <el-menu-item index="bought">
          <el-icon><SoldOut /></el-icon>
          <span>我购买的</span>
        </el-menu-item>
        <el-menu-item index="sold">
          <el-icon><Sell /></el-icon>
          <span>我卖出的</span>
        </el-menu-item>
        <el-menu-item index="favourite">
          <el-icon><Star /></el-icon>
          <span>我收藏的</span>
        </el-menu-item>
        <el-menu-item index="add">
          <el-icon><CirclePlus /></el-icon>
          <span>发布商品</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div v-else @mouseenter="isHover=true"
          @mouseleave="isHover=false" 
          class="sidebar"
    >
      <el-menu
        :default-active="route.name"
        class="el-menu-vertical-demo"
        
        background-color="rgb(198, 226, 255)"
        router
        :show-timeout="0"
      >
        <el-menu-item index="userDetail">
          <el-icon><User /></el-icon>
          <span>个人信息</span>
        </el-menu-item>
        <el-menu-item index="userFollowed">
          <el-icon><CircleCheck /></el-icon>
          <span>Ta关注的</span>
        </el-menu-item>
        <el-menu-item index="fans">
          <el-icon><View /></el-icon>
          <span>Ta的粉丝</span>
        </el-menu-item>
        <el-menu-item index="published">
          <el-icon><Goods /></el-icon>
          <span>Ta发布的</span>
        </el-menu-item>
        <el-menu-item index="bought">
          <el-icon><SoldOut /></el-icon>
          <span>Ta购买的</span>
        </el-menu-item>
        <el-menu-item index="sold">
          <el-icon><Sell /></el-icon>
          <span>Ta卖出的</span>
        </el-menu-item>
        <!-- <el-menu-item index="favourite">
          <el-icon><Star /></el-icon>
          <span>他收藏的</span>
        </el-menu-item> -->
      </el-menu>
    </div>
    <div class="main-page">
      <RouterView>

      </RouterView>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import HomeHeader from '@/components/Home/HomeHeader.vue';
import { mapState } from 'vuex';
export default {
  data(){
    return {
      route: useRoute(),
      isHover: false
    }
  },
  components: 
  {
    HomeHeader
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped>
/* 小屏电脑样式 */
@media screen and (min-width: 960px) {
  /* 头部导航栏样式 */
  .header-nav {
    position: sticky;
    top: 0;
    left: 0;
    height: var(--header-height);
    width: 100%;
    padding: 0;
    z-index: 3;
  }
  /* 左侧导航栏样式 */
  .sidebar {
    top: var(--header-height);
    width: var(--sidebar-width-unfold);
    position: fixed;
    height: 90%;
    overflow: hidden;
    border-left: 0px;
    z-index: 2;
    box-shadow: var(--el-box-shadow);
  }
  .sidebar:hover {
    width: var(--sidebar-width-unfold);
    transition: all var(--animation-transition-duration);
  }
    :deep(.el-menu) {
      border-right: 0px;
      height: 100%;
      transition: all var(--animation-transition-duration);
    }
    .el-menu-item {
      font-size: 1.25rem;
    }
  /* 主页面样式 */
  .main-page {
    padding-left: calc(var(--sidebar-width-unfold) + var(--wide-slot-width));
    height: 100%;
    width: calc(var(--pc-screen-content-width) - var(--wide-slot-width))
  }
}
</style>