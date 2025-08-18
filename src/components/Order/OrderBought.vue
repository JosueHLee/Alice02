<template>
  <el-empty v-if="items.length === 0" description="还未购买商品">
    <el-button type="primary" @click="router.push({name: 'add'})">去发布</el-button>
  </el-empty>
  <div v-else>
    <div class="demonstration">All combined</div>
    <el-pagination
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[100, 200, 300, 400]"
      :size="size"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import router from '@/router';
import { useRouter } from 'vue-router';
  export default {
    data() {
      return {
        router: useRouter(),
        items: [],
      }
    },
    // 初始化商品
    created() {

    }
  }
</script>

<style scoped>
  @media screen and (min-width: 1200px) {
    
  }
</style>