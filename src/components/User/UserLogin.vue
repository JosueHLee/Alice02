<template>
  <el-dialog
    v-model="diaglogVisable"
    title="登录"
    width="40%"
    :close-on-click-modal="false"
    center
    align-center
  >
    <el-form
      ref="ruleFormRef"
      :model="user"
      :rules="rules"
      label-width="auto"
      hide-required-asterisk=true
      size="large"
      style="text-align: center;"
    >
      <el-form-item class="InputRow" label="用户名" prop="username">
        <el-input v-model="user.username" />
      </el-form-item>
      <el-form-item class="InputRow" label="密码" prop="password">
        <el-input v-model="user.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="diaglogVisable=false">取消</el-button>

      </el-form-item>
      <el-link style="margin: 0%;" type="primary" @click="registerDiaVisable=true">没有账户？立即注册</el-link>
    </el-form>
    
  </el-dialog>
  <UserRegister :registerDiaVisable="this.registerDiaVisable" @register-Diaglog-Close="cancelRegister">

  </UserRegister>
</template>

<script>
import UserRegister from './UserRegister.vue'
  export default {
    emits: ['loginDialogClose'],
    components: {
      UserRegister
    },
    props: {
      loginDiaVisable: Boolean
    },
    data() {
      return {
        registerDiaVisable: false,
        // 用户输入表单
        user: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            { required: true, message: '用户名不能为空', trigger: 'blur'}
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur'},
          ]
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('login submit')
        this.diaglogVisable = false
      },
      cancelRegister() {
        this.registerDiaVisable = false
      }
    },
    computed: {
      // 本组件的对话框无前缀(dialogVisable)，子组件(Register)的对话框有前缀(registerDialogVisable)
      diaglogVisable: {
        get() {
          return this.loginDiaVisable
        },
        set() {
          this.$emit('loginDialogClose')
        }
      }
    }
  }
</script>
<style scoped>
  .InputArea {
    list-style-type: none;
    margin-left: 6%;
  }
  .LoginIndicate {
    width:14%;
    margin-top: 20px;
  }
  .InputRow {
    width: 50%;
    margin-left: 20%;
  }
  ::v-deep .el-form-item__content {
    justify-content: center;
  }
</style>