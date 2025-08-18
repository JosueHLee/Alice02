<template>
  <el-dialog
    v-model="Publish2EditDiaVisable"
    title="修改商品"
    width="80%"
    top="5%"
    :show-close="false"
    :close-on-click-modal="false"
    center
  >
  <ul class="InputArea">
    <li><div class="InputIndicate">商品名（必填）：</div>
      <el-input v-model="iname" style="width: 40%" placeholder="请输入商品名" size="large"/>
      <el-text class="warning" type="danger" v-show="isInputNull">商品名不能为空</el-text>
    </li>
    <li><div class="InputIndicate">商品使用情况(必填)：</div>
      <el-select
      v-model="iusage"
      placeholder="请选择商品使用情况"
      size="large"
      style="width: 240px"
    >
      <el-option
        v-for="item in itemUsage"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
      <el-text class="warning" type="danger" v-show="isInputNull">商品使用情况不能为空（必填）</el-text>
    </li>
    <li><div class="InputIndicate">商品价格(必填)：</div>
      <el-input
      v-model="price"
      placeholder="请输入商品价格，建议为原价七折"
      size="large"
      style="width: 240px"
    />
      <el-text class="warning" type="danger" v-show="isPriceNull">商品使用情况不能为空（必填）</el-text>
      <el-text class="warning" type="danger" v-show="isPriceValid === false">商品价格必须为数字</el-text>
    </li>
    <li>
      <div class="InputIndicate">添加你的描述（必填）：</div>
      <el-input
        v-model="idescription"
        style="width: 90%"
        :autosize="{ minRows: 10, maxRows: 10 }"
        type="textarea"
        placeholder="好的描述能增大下单机率"
      />
    </li>
    <li>
      <div class="InputIndicate">添加商品图片(必填)</div>
      <el-upload
        class="avatar-uploader"
        :show-file-list="false"
        :on-change="getImgSuccess"
        :before-upload="beforeAvatarUpload"
        :auto-upload="false"
      >
        <img v-for="(img,index) in ipics" :key="index" :src=img.url class="preview" />
        <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </li>
  </ul>
  <div style="text-align: center;">
    <el-button type="primary" :disabled="iname === '' || isPriceNull !== false || isPriceValid !== true || iusage === undefined || idescription === '' || ipics.length === 0"    @click="confirmPublish">
      修改
    </el-button>
    <el-button type="primary" @click="cancelEdit">
      取消
    </el-button>

  </div>
  </el-dialog>

</template>

<script setup>
  import { ref,watch,defineProps,defineEmits,computed} from 'vue'
  import { ElMessage } from 'element-plus'
  import { Plus } from '@element-plus/icons-vue'
  import global from '@/global/global'
  import axios from 'axios'
  import { ElNotification } from 'element-plus'

  const props = defineProps(['isEditDiaVisable','item'])
  const emit = defineEmits(['update:isEditDiaVisable', 'update:item'])
  let Publish2EditDiaVisable = computed({
    get: () => props.isEditDiaVisable,
    set: v => emit('update:isEditDiaVisable', v)
  })
  let itemLocal = computed({
    get: () => props.item,
    set: v => emit('update:item', v)
  })
  const cancelEdit = () => {
    Publish2EditDiaVisable.value = false
  }

  const iname = ref(itemLocal.value.iname)
  const iusage = ref(itemLocal.value.iusage)
  const idescription = ref(itemLocal.value.idescription)
  const price = ref(itemLocal.value.price)
  const itemUsage = ref([
    {value: 1, label:" 全新"}, 
    {value: 2, label:" 轻微使用痕迹"}, 
    {value: 3, label:" 明显使用痕迹"}, 
    {value: 4, label:" 破损不堪"}, 
    ])
    const isPriceNull = ref(false)
    const isPriceValid = ref(true)
    watch(price, (newprice) => {
      if(/^[0-9]+$/.test(newprice))
      {
        isPriceValid.value = true
        isPriceNull.value = false
      }
      else
      {
        isPriceValid.value = false
      }
    })
    console.log(itemLocal.value.iname)
  const ipics = ref(itemLocal.value.ipics)
  const getImgSuccess = (
    uploadFile
  ) => {
    if(uploadFile.raw)
    {
      ipics.value.push({img: uploadFile.raw, url:URL.createObjectURL(uploadFile.raw)})
    }
    // console.log(ipics)
  }
  const beforeAvatarUpload = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
      ElMessage.error('Avatar picture must be JPG format!')
      return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
      ElMessage.error('Avatar picture size can not exceed 2MB!')
      return false
    }
    return true
  }
  


  const confirmPublish = () => {  
  const formData = new FormData()
  formData.append('uid', global.user.userID)
  formData.append('iname', iname)
   formData.append('iusage', iusage)
  formData.append('idescription', idescription)
  formData.append('price', price)
  ipics.value.forEach(f => {
    formData.append('file', f.img)    
  });
    axios.post(global.serverUrl + '/api/item/publish', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(result => {
      if(result.data.code === 1)
      {
        ElNotification({
          title: '更改成功',
          message: result.data.msg,
          type: 'success',
        })
        itemLocal.value = result.data
        //返回管理界面
      }
      else
      {
        ElNotification({
            title: '失败',
            message: result.data.msg,
            type: 'warning',
          })
      }
    }).catch((error) => {
              ElNotification({
                title: '网页异常',
                message: error.toString(),
                type: 'error',
              })
          })
  }
</script>

<style scoped>
  .ItemInputMain
  {
    margin-left: 5%;
    display: grid;
    width:90%;
    background-color: aliceblue;
  }
  .InputArea {
    list-style-type: none;
    margin-left: 3%;
  }
  .InputIndicate {
    width:14%;
    margin-top: 20px;
    margin-bottom: 10px;
  }
</style>
<style>
.avatar-uploader .el-upload {
  border: 2px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.preview {
  max-width: 178px;
  max-height: 178px;
  object-fit: contain;
}
</style>