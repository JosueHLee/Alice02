<template>
  <el-empty v-if="users.length === 0" description="还未关注用户">
  </el-empty>
  <div v-else class="main-container">
    <div class="title">
      <h2 class="first-title-color"> 关注的用户 ·{{ total }}</h2>
    </div>
    <div class="page-content display-center">
      <el-space class="page-container" :size="24" wrap>
        <UserCard v-for="user in users" :key="user" :user="user">

        </UserCard>
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
import UserCard from './UserCard.vue';
import PaginationCom from '../Tools/paginationCom.vue';
import { users } from '@/test';
  export default {
    data() {
      return {
        router: useRouter(),
        users: [],
        pageSize: 8,
        total: undefined,
        currentPage: 1,
      }
    },
    // 初始化商品
    created() {
      this.users = users.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      this.total = users.length
    },
    watch: {
      currentPage() {
        this.items = users.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      },
      pageSize() {
        this.items = users.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      },
      total() {
        this.items = users.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
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
      UserCard,
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