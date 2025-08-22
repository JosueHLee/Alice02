<template>
  <div v-if="item !== null">
    <el-row>
      <el-col :span="12">
        <el-image class="img" :src="pics.url" fit="cover" />
      </el-col>
      <el-col>

      </el-col>
    </el-row>
    <el-row>
      <el-select v-model="method" placeholder="选择支付方式" style="width: 240px">
        <el-option
          v-for="(pay_method,index) in pay_methods"
          :key="index"
          :label="pay_method"
          :value="index"
        />
      </el-select>
    </el-row>
      <el-button type="primary" @click="clickPay">去支付</el-button>
  </div>
  <el-dialog v-model="resultDialogVisible" title="是否支付成功" width="500" align-center :close-on-click-modal="false">
    <template #footer>
      <div class="dialog-footer">
        <el-button type="danger" @click="resultDialogVisible = false">否</el-button>
        <el-button type="success" @click="paySucess">
          是
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import { allProducts } from '@/test';
import { pay_methods } from '@/global/global';
import router from '@/router';
import { ElMessage } from 'element-plus';
  export default {
    data() {
      return {
        item: null,
        pics: undefined,
        method: undefined,
        pay_methods,
        resultDialogVisible: false,
      }
    },
    props:['productid'],
    created() {
      
      for(let i = 0; i < allProducts.length; i++)
      {
        if(this.productid == allProducts[i].id)
        {
          this.item = allProducts[i]
          this.pics = {
            name: '',
            url: this.item.pics[0]
          }
          
          break
        }
      }
    },
    methods: {
      clickPay() {
        const href = router.resolve({name: 'TradePay', params: this.productid}).href
        window.open(href, "_blank")
        this.resultDialogVisible = true
      },
      paySucess() {
        this.resultDialogVisible = false
        ElMessage.success("支付成功，即将跳转到订单详情页")
      }
    }
  }
</script>
<style>

</style>