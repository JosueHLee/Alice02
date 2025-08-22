<template>
<div class="App">
    <div class="header header-nav">
      <HomeHeader>

      </HomeHeader>
    </div>
    <div class="head-nav">
      <ToolsSort>

      </ToolsSort>
    </div>
    <div class="main-page">
      <HomeMain>
          
      </HomeMain>
    </div>
  </div>
</template>

<script>
  import HomeHeader from '../components/Home/HomeHeader.vue'
  import HomeMain from '@/components/Home/HomeMain.vue';
  import ToolsSort from '@/components/Tools/ToolsSort.vue';
  export default {
    components: {
      HomeHeader,
      HomeMain,
      ToolsSort,
    }
  }
</script>

<style>
</style>