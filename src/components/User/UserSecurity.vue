<template>
  <div class="frame">
    <el-form :model="user" label-width="15%" class="form" size="large">
      <el-form-item label="用户名:">
        <el-input v-model="user.username" style="width: 50%;"/>
      </el-form-item>
      <el-form-item label="电话:">
        <el-input v-model="user.tel" style="width: 50%;"/>
      </el-form-item>
      <el-form-item label="密码:">
        <el-input v-model="user.tel" style="width: 50%;"/>
      </el-form-item>
      
      <el-row>
        <ElDivider />
        <div class="display-center full-width">
          <el-button type="primary" @click="onSave">保存</el-button>
          <el-button @click="onReset">重置</el-button>
        </div>
      </el-row>
      
    </el-form>
  </div>

</template>

<script>
import { mapState } from 'vuex'
import { ElMessage } from 'element-plus'
import http from '../../global/http'
import { serverUrl } from '@/global/global'

export default {
  data(){
    return {
      picture: null,
      //用户模型
      dialogVisible: false
    }
  },
  methods: {
    onSave()
    {
      this.$store.dispatch('updateUserProfile',this.user).then(() => {
        ElMessage.success('保存成功！')
      }).catch(() => {
        ElMessage.error('保存失败')
      })
      console.log('submit!')
    },
    onReset()
    {
      console.log('reset!')
    },
    handleClose()
    {
      this.dialogVisible = false
    },
    },
    computed: 
    {
      ...mapState(['user']),
    }
}
</script>
<style scoped>
  @media screen and (min-width: 960px) {
    ::v-deep .avatar-uploader .el-upload  {
      border: 0;
    }
    ::v-deep .el-form-item__label-wrap {
      display: flex;
      align-items: center;
    }
    ::v-deep .el-dialog__body {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    ::v-deep .el-dialog{
      background-color: rgba(0,0,0,0);
      border: 0px;
      box-shadow: none;
    }
    .imgCut {
     display: block; 
    }
  }

</style>
