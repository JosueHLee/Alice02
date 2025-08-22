<template>
  <div class="HomeMain single-main-width">
    <el-space wrap :size="30" class="display-center item-container" v-infinite-scroll="load">
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
import { products2 } from '@/test';
export default{
  data() {
    return {
      items: [],
      sort: 0,
      comeToEnd: false,
      currentPage: 1,
      pageSize: 16,
    }
  },
  components: {
    ItemCardWithUser,
  },
  created() {
    this.items = products2.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
  },
  methods: {
    load() {
      if(this.currentPage * this.pageSize >= products2.length)
      {
        this.comeToEnd = true
        return
      }
      this.currentPage++
      this.items = this.items.concat(products2.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize))
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
    border-radius: 4px
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