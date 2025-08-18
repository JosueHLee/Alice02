<template>
  <el-scrollbar>
    <el-tag v-for="user in userList" :key="user.userId" closable class="">
      {{ user.username }}
    </el-tag>
  </el-scrollbar>
</template>
<script>
import { users } from '@/test';
export default{
  data() {
    return {
      userList: users
    }
  }
}
</script>
<style scoped>
</style>