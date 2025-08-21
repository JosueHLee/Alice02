<template>
  <el-menu
    v-model="internalIndex"
    mode="horizontal"
    class="nav"
    @select="emit('update:activeIndex', $event)"
  >
    <el-menu-item index="推荐">推荐</el-menu-item>
    <el-menu-item index="教材教辅">教材教辅</el-menu-item>
    <el-menu-item index="文具用品">文具用品</el-menu-item>
    <el-menu-item index="宿舍生活">宿舍生活</el-menu-item>
    <el-menu-item index="服装服饰">服装服饰</el-menu-item>
    <el-menu-item index="运动健身">运动健身</el-menu-item>
    <el-menu-item index="电子数码">电子数码</el-menu-item>
    <el-menu-item index="乐器">乐器</el-menu-item>
    <el-menu-item index="兴趣爱好">兴趣爱好</el-menu-item>
    <el-menu-item index="二次元">二次元</el-menu-item>
    <el-menu-item index="毕业生专区">毕业生专区</el-menu-item>
    <el-menu-item index="新生专区">新生专区</el-menu-item>
  </el-menu>
</template>

<script setup>
import { ref,defineProps,defineEmits, watch} from 'vue'
const props = defineProps(['activeIndex'])
const emit = defineEmits(['update:activeIndex'])
const internalIndex = ref(props.activeIndex)
watch(() => props.activeIndex, (newVal) => {
  internalIndex.value = newVal
})
</script>

<style scoped>
@media screen and (min-width: 960px) {
  .nav {
    width: 100%;
    background-color: rgb(197.7, 225.9, 255);
    display: flex;
    border-bottom: none !important;
    box-shadow:var(--el-box-shadow-light)!important;
  }
  :deep(.el-menu-item) {
    width: 300px;
  }
}

</style>