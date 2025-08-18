<template>
  <el-card class="product" @click="onClick">
    <template #header>
      <el-row>
        <el-col :span="21">
          <el-text>{{user.name}}</el-text>
        </el-col>
      </el-row>
    </template>
    <div class="display-center">
      <el-image class="img" :src="user.picture_narrow" fit="cover" />
    </div>
    
    <template #footer>
      <el-row>
        <el-col :span="8">
          <el-tag><el-text>{{ "粉丝数：" + user.fans }}</el-text></el-tag>
        </el-col>
        <el-col :span="8">
          <el-tag><el-text>{{ "关注数：" + user.follows }}</el-text></el-tag>
        </el-col>
      </el-row>
    </template>
  </el-card>
  
</template>
<script>
import global from '../../global/global'
import router from '@/router'
  export default {
    data() {
      return {
        global,
        // picUrl: global.serverUrl + '/api/products/' + picId,
      }
    },
    props: ['user']
      //需要 商品名，商品图片(实际是商品id)，商品价格，商品状态,收藏数量
    ,
    async created() {

    },
    methods: {
      onClick(){
        const href = router.resolve({name: 'userDetail', params: {uName: this.user.username}}).href
        window.open(href, '_blank')
      },
    }
  }
</script>
<style scoped>
  @media screen and (min-width: 960px) {
    .product {
      width: 259px;
    }
    .product:hover {
      cursor: pointer !important;
      transform: scale(1.02);
    }
      .dropdown-container {
        display: flex !important;
        justify-content: center;
        align-items: center;
      }
      .dropdown {
        cursor: pointer;
        color: var(--el-color-primary);
        display: flex !important;
        justify-content: center;
        align-items: center;
        transition: all 0.3s linear; 
      }
      .dropdown:hover{    
        transform: scale(1.5);
      }
      .img {
        width: 200px;
        height: 200px;
      }
    :focus-visible {
        outline: none !important;
      }
    ::v-deep .el-tag .el-icon{
      cursor: default !important;
    }
  }
</style>