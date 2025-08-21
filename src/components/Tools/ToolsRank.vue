<template>

  <el-menu
    v-model="internalIndex"
    mode="horizontal"
    class="nav"
    @select="emit('update:activeIndex', $event)"
  >
    <el-menu-item index="0">发布从新到旧</el-menu-item>
    <el-menu-item index="1">发布从旧到新</el-menu-item>
    <el-menu-item index="2">价格从低到高</el-menu-item>
    <el-menu-item index="3">价格从高到低</el-menu-item>
  </el-menu>
  <ElDivider class="bottomDivider">
  </ElDivider>
</template>

<script setup>
import { ElDivider } from 'element-plus'
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
    display: flex;
    border-bottom: none !important;
    background-color: aliceblue;
  }
  .bottomDivider {
    margin-top: 0px !important;
  }
}

</style>