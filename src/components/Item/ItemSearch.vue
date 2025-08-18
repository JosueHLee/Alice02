<template>
  <div class="HomeMain">
     <ul v-if="ItemArray.length !== 0" class="ShowItem" v-infinite-scroll="load">
      <li v-for="item in ItemArray" :key = "item.id" class="Item">
        <a href="#">
              <el-card shadow="hover" @click="router.push({name: 'ItemDetail', params: {itemid: item.id}})">
                <template #header><div>{{ item.name }}</div></template>
                <img
                  :src="item.imgURL"
                  style="width: 100%"
                />
                <template #footer><el-text class="mx-1" type="warning">{{ item.price }}RMB</el-text></template>
              </el-card>
            </a>
      </li>
     </ul>
      <el-empty v-else description="没有找到相关商品" style="margin-top: 20px;"/>
    
  </div>
    <div class="RankContainer">
      <ToolsRank v-model:activeIndex="rank" @rankChange:activeIndex="rank = $event" />
    </div>
</template>

<script setup>
import {ref,watch} from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import axios from 'axios'
import global from '@/global/global'
import { ElNotification } from 'element-plus'
import { ElEmpty } from 'element-plus'
import ToolsRank from '../Tools/ToolsRank.vue'
const route = useRoute()
const key = route.params.key

const ItemArray = ref([])
const rank = ref("1") // 1 means ascending, -1 means descending 
const cpage = ref(0)
const testItem = {id: 0, name: 'Yummy hamburger', imgURL:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', price: 20}
const loadpage = (page) =>{
  axios.get(global.serverUrl + '/api/item/GetPages', { params: {uid: global.user.userID, pagenum: page, filter:key, rank: Number.parseInt(rank.value)}})
  .then(result => {
    if(result.data.code === +1)
      ItemArray.value.push(...result.data.result)
    else
    ElNotification({
          title: '获取商品信息失败',
          message: result.data.msg,
          type: 'warning',
        })
  }).catch(error => {
    // ElNotification({
    //   title: '网页异常',
    //   message: error.toString(),
    //   type: 'error',
    //   })
      console.log(error)
      const page = ref([])
    for(let i = 0; i < 10; i++)
      {
        page.value.push({...testItem, id: i+1, iname: 'Yummy hamburger ' + i})
      }
    ItemArray.value.push(...page.value)
  })
}

function load(){
      cpage.value++;
      console.log('in load loadpage called, current page is ' + cpage.value)
      loadpage(cpage.value)
}  //向后端请求数据

    watch(rank, () => {
  cpage.value = 0
  ItemArray.value = []
  // console.log('rank changed to ' + newrank)
  loadpage(cpage.value)
})
</script>

<style>
a {
  text-decoration: none;
}
  .HomeMain {
    margin-left: 5%;
    display: grid;
    width:90%;
    background-color: aliceblue;
  }
  .ShowItem {
    list-style-type: none;
  }
  .Item {
    display: inline-block;
    margin-left: 10px;
    max-width: 300px;
    text-decoration: none;
  }
  .RankContainer {
  position: absolute;
  top: 11%;
  right: 2%;
  z-index: 10;
}
</style>