<template>
  <div class="frame">
    <el-form :model="user" label-width="15%" class="form" size="large">
      <el-form-item label="头像:">
        <el-row class="full-width">
          <el-col :span="8" class="display-center">
            <el-avatar v-if="user.picture_narrow" :size="80" :src="user.picture" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-col>
          <el-col :span="16" class="display-center">
            <el-upload
              v-model:file-list="newAvatar"
              class="upload-demo full-width"
              action="#"
              :limit="1"
              :show-file-list="false"
              :http-request="selectImg"
              accept=".jpg,.jpeg,.png"
            >
              <el-button type="primary">更换头像</el-button>
              <template #tip>
                <div class="el-upload__tip">
                  单张图片大小不超过 512 kb.
                </div>
              </template>
            </el-upload>
          </el-col>
          <el-dialog
            v-model="dialogVisible"
            width="600"
            :before-close="handleClose"
            :show-close="false"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :align-center="true"
          >
          <!-- <el-image style="width: 100px; height: 100px" :src="req.img" :fit="fit" /> -->
            <avatarEdit :req="req">

            </avatarEdit>
            <template #footer>
              <div class="dialog-footer display-center">
                <el-button type="primary" @click="saveAvatar">保存</el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
                
              </div>
            </template>
          </el-dialog>
        </el-row>
      </el-form-item>
      <el-form-item label="用户名:">
        <el-input v-model="user.username" style="width: 50%;"/>
      </el-form-item>
      <el-form-item label="邮箱:">
        <el-input v-model="user.tel" style="width: 50%;"/>
      </el-form-item>
      <el-form-item label="性别:">
        <el-radio-group v-model="user.gender">
          <el-radio :value="0">女</el-radio>
          <el-radio :value="1">男</el-radio>
          <el-radio :value="2">未公开</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="个人简介:">
        <el-input v-model="user.prof" type="textarea" :autosize="{minRows: 6, maxRows: 14}"/>
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
import axios from 'axios'
import avatarEdit from '../Tools/avatarEdit.vue'
import { mapState } from 'vuex'
import { ElMessage } from 'element-plus'

export default {
  data(){
    return {
      //用户模型
      newAvatar: [],
      req: {
        img: null,
        type: null,
      },
      dialogVisible: false
    }
  },
  created(){
    // 获取用户商品信息
    
  },
  methods: {
    onSave()
    {
      this.$store.dispatch('updateUser',this.user).then(() => {
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
    selectImg()
    {
      console.log("select img")
      const url = URL.createObjectURL(this.newAvatar[0].raw)
      this.req.img = url
      this.req.type = this.newAvatar[0].name.split('.')[1]
      this.dialogVisible = true
      this.newAvatar = []
    },
    handleClose()
    {
      this.dialogVisible = false
    },
    saveAvatar()
    {
      this.dialogVisible = false
      console.log("click save Avatar!")
    }
  },
  components: {
    avatarEdit
  },
  computed: {
    ...mapState(['user'])
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
  }

</style>
