<template>
  <div class="HomeMain single-main-width" infinite-scroll-delay="30*1000" v-infinite-scroll="load" :infinite-scroll-disabled="comeToEnd">
    <el-space wrap :size="30" class="display-center item-container" >
      <ItemCardWithUser v-for="item in items" :key="item" :product="item" :editable="false">

      </ItemCardWithUser>
    </el-space>
  </div>
  <el-text v-if="comeToEnd" class="display-center" type="info" size="large">
    已经到底了
  </el-text>
</template>

<script>
import ItemCardWithUser from '../Item/ItemCardWithUser.vue';
import http from '../../global/http'
import { ElMessage } from 'element-plus';
export default{
  data() {
    return {
      items: [],
      sort: 0,
      comeToEnd: false,
      currentPage: 1,
      pageSize: 16,
      total: 0
    }
  },
  components: {
    ItemCardWithUser,
  },
  props:['index'],
  async created() {
    await http.get('/api/products/lists',{params: {
      page: this.currentPage,
      size: this.pageSize,
      category: this.sort,
    }})
    .then(result => {
      if(result.data.data.records === null)
        return
      this.items = result.data.data.records
      this.total = result.data.data.total
    })
    .catch(error => {
      ElMessage.error("网络繁忙，请稍后再试")
      console.log(error)
    })
    // this.items = products2.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
  },
  methods: {
    async load() {
      this.currentPage++
      await http.get('/api/products/lists',{params: {
      page: this.currentPage,
      size: this.pageSize,
      category: this.sort,
      }})
      .then(result => {
        if(result.data.data.records.length === 0)
        {
          this.comeToEnd = true
          return
        }
        this.items = this.items.concat(result.data.data.records)
        this.total = result.data.data.total
      })
      .catch(error => {
        ElMessage.error("网络繁忙，请稍后再试")
        console.log(error)
      })
      // this.items = this.items.concat(products2.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize))
    },
    getItem() {
      
    }
  }
}
</script>

<style>
@media screen and (min-width: 770px) {
  .HomeMain {
    margin-top: var(--wide-slot-width);
    margin-bottom: var(--wide-slot-width);
    background-color: rgb(217, 236, 255) !important;
    border-radius: 4px
  }
  .item-container {
    padding-top: var(--wide-slot-width);
    padding-bottom: var(--wide-slot-width);
    box-shadow: var(--el-box-shadow-lighter);
    border-radius: 4px;
    max-height: 80%
  }
}
@media screen and (min-width: 960px) {
  .HomeMain {
    margin-top: var(--wide-slot-width);
    margin-bottom: var(--wide-slot-width);
    background-color: rgb(217, 236, 255) !important;
    border-radius: 4px
  }
  .item-container {
    padding-top: var(--wide-slot-width);
    padding-bottom: var(--wide-slot-width);
    box-shadow: var(--el-box-shadow-lighter);
    border-radius: 4px
  }
}

</style>