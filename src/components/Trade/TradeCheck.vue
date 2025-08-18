<template>
  <div class="step" style="height: 500px;">
    <el-steps direction="vertical" :active="1">
      <el-step title="Step 1" />
      <el-step title="Step 2" />
      <el-step title="Step 3" />
    </el-steps>
  </div >
  <div v-if="item" class="content">
    <el-descriptions width="50px" :column="1" style="width: 80%;background-color: rgb(159.5, 206.5, 255);margin-top: 40px;">
    <el-descriptions-item style="width: 50%;" label="名称" >{{ item.name }}</el-descriptions-item>
    <el-descriptions-item label="价格">{{ item.price }}</el-descriptions-item>
    <el-descriptions-item label="使用状态">{{ usage[item.usageStatus] }}</el-descriptions-item>
    <el-descriptions-item label="描述">
      {{ item.description }}
    </el-descriptions-item>
  </el-descriptions>
  <div style="width: 80%;display: flex;align-items: center;justify-content: center; margin-top: 20px;">
    <el-button type="primary" @click="$router.push({ name: 'TradePay', params: { uid, itemid} })">创建订单</el-button>
    <el-button type="danger" @click="$router.push({ name: 'ItemDetail', params: { itemid} })">取消</el-button>
  </div>
    
  </div>
</template>

<script setup>
import axios from 'axios'
import {ref} from 'vue'
const item = ref(null)
import global from '@/global/global'
import { ElNotification } from 'element-plus'
import { useRoute } from 'vue-router'
console.log('TradeCheck.vue loaded');
const usage = ref(['全新', '轻微使用痕迹', '有明显使用痕迹', '破损不堪'])
const route = useRoute()
const uid = route.params.uid
const itemid = route.params.itemid
axios.get(global.serverUrl + '/api/item/CheckItem', { params: { itemid } })
  .then(result => {
    if (result.data.code === +1) {
      item.value = result.data.result.body
      // Handle successful item retrieval
    } 
      else
      ElNotification({
            title: '获取商品信息失败',
            message: result.data.msg,
            type: 'warning',
          })
    }).catch(error => {
      item.value = {id: 0, iname: 'Yummy hamburger',iusage:'全新', price:20,  ipics:[{"url":"https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"}],idescription:"这是一个汉堡"}
      // item.value = null
      ElNotification({
        title: '网络异常',
        message: error.toString(),
        type: 'error',
      })

    })
    

</script>

<style scoped>
.step {
  width: 10%;
  margin-right: 20px;
}
.content {
  width:80%;
  height: 450px;
  background-color: rgb(216.8, 235.6, 255);
  padding-top: 5%;
  padding-left: 10%
}
</style>