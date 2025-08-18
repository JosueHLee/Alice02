<template>
<el-menu
    v-model="internalIndex"
    default-active="1"
    :collapse="iscollapse"
    @hover="handleHover"
    @select="emit('update:activeIndex', $event)"
  >
    <el-menu-item index="1">
        <el-icon><SortUp /></el-icon>
        <template #title><span>价格从低到高</span></template>
    </el-menu-item>

    <el-menu-item index="-1">
      <el-icon><SortDown /></el-icon>
      <template #title><span>价格从高到低</span></template>
    </el-menu-item>

    <el-menu-item index="2">
      <el-icon><Top /></el-icon>
      <template #title><span>发布从新到旧</span></template>
    </el-menu-item>

    <el-menu-item index="-2">
      <el-icon><Bottom /></el-icon>
      <template #title><span>价格从旧到新</span></template>
    </el-menu-item>

  </el-menu>
</template>

<script setup>
import {ref,defineProps,defineEmits,watch} from 'vue'
const iscollapse = ref(true)
const handleHover = () => {
  iscollapse.value = false
}
const props = defineProps(['activeIndex'])
const emit = defineEmits(['update:activeIndex'])
const internalIndex = ref(props.activeIndex)
watch(() => props.activeIndex, (newVal) => {
  internalIndex.value = newVal
})
</script>

<style scoped>

</style>    