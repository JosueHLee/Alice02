<template>
  <el-empty v-if="items.length === 0" description="还未发布商品">
    <el-button type="primary" @click="router.push({name: 'add'})">去发布</el-button>
  </el-empty>
  <div v-else class="main-container">
    <div class="title">
      <h2 class="first-title-color">发布的商品 ·{{ total }}</h2>
    </div>
    <div class="page-content display-center">
      <el-space class="page-container" :size="24" wrap>
        <ItemCardWithoutUser v-for="item in items" :key="item" :product="item" :editable="true">

        </ItemCardWithoutUser>
      </el-space>
    </div>
    <paginationCom 
    :currentPage="currentPage" :pageSize="pageSize" :total="total"
    @current-page-change="currentPageChange" @page-size-change="pageSizeChange" @total-change="totalChange"/>
  </div>
</template>

<script>
import router from '@/router';
import { useRouter } from 'vue-router';
import { products1 } from '@/test';
import ItemCardWithoutUser from './ItemCardWithoutUser.vue';
import PaginationCom from '../Tools/paginationCom.vue';
  export default {
    data() {
      return {
        router: useRouter(),
        items: [],
        pageSize: 8,
        total: undefined,
        currentPage: 1,
      }
    },
    // 初始化商品
    created() {
      this.items = products1.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      this.total = products1.length
    },
    watch: {
      currentPage() {
        this.items = products1.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      },
      pageSize() {
        this.items = products1.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      },
      total() {
        this.items = products1.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      }
    },
    methods: {
      currentPageChange(newValue) {
        this.currentPage = newValue
      },
      pageSizeChange(newValue) {
        this.pageSize = newValue
      },
      totalChange(newValue) {
        this.total = newValue
      }
    },
    components: {
      ItemCardWithoutUser,
      PaginationCom
    }
  }
</script>

<style scoped>
  @media screen and (min-width: 1200px) {
    .page-content {
      justify-content: left;
      width: 100%;
    }
    .main-container {
      margin-top: var(--wide-slot-width);
    }
    .title {
      padding-left: var(--wide-slot-width);
    }
    .page-container {
      display: flex;
      padding-left: var(--wide-slot-width);
    }
    .pagination {
      margin-top: var(--wide-slot-width);
      padding-bottom: var(--wide-slot-width);
    }
    :deep(.el-pagination.is-background .btn-next) {
      background-color: white;
    }
    :deep(.el-pagination.is-background .btn-prev) {
      background-color: white;
    }
    :deep(.el-pagination.is-background .el-pager li) {
      background-color: white;
    }
  }
</style>