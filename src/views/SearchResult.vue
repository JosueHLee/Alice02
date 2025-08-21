<template>
<div class="App">
    <div class="header header-nav">
      <SearchHeader />
    </div>
    <div class="head-nav">
      <ToolsSort>

      </ToolsSort>
    </div>
    <div class="RankContainer">
      <ToolsRank>

      </ToolsRank>
    </div>
    <div class="main-page">
      <HomeMain>
          
      </HomeMain>
    </div>
  </div>
</template>

<script>
  import SearchHeader from '@/components/Search/SearchHeader.vue';
  import HomeMain from '@/components/Home/HomeMain.vue';
  import ToolsSort from '@/components/Tools/ToolsSort.vue';
  import ToolsRank from '@/components/Tools/ToolsRank.vue';
  export default {
    components: {
      SearchHeader,
      HomeMain,
      ToolsSort,
      ToolsRank
    }
  }
</script>

<style>
/* 小屏电脑样式 */
@media screen and (min-width: 960px) {
  /* 头部导航栏样式 */
  .head-nav {
    top: var(--header-height);
    position: sticky;
    z-index: 3;
  }
}
</style>