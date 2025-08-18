<template>
  <div class="step" style="height: 500px;">
    <el-steps direction="vertical" :active="1">
      <el-step title="Step 1" />
      <el-step title="Step 2" />
      <el-step title="Step 3" />
    </el-steps>
  </div >
  <div v-if="order" class="content">
    <el-button type="primary" >确认支付</el-button>
    <el-button type="danger" @click="$router.push({ name: 'ItemDetail', params: { itemid} })">取消</el-button>
  </div>
</template>

<script setup>
console.log('TradePay.vue loaded');

import axios from 'axios'
import {ref} from 'vue'
import { ElNotification } from 'element-plus'
import { useRoute } from 'vue-router'
const route = useRoute()
const uid = route.params.uid
const itemid = route.params.itemid
const order= ref(null)
axios.post('/api/order', {   
  buyerId: uid,
  productId: itemid,
  quantity: 1 }
)
  .then(result => {
    if (result.data.code === +1) {
      order.value = result.data.result

      // Handle successful item retrieval
    }
      else
      ElNotification({
            title: '获取商品信息失败',
            message: result.data.msg,
            type: 'warning',
          })
    }).catch(error => {
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