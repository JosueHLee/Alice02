<template>
  <el-dialog
    v-model="diaglogVisable"
    title="注册"
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
    >
      <el-form-item class="InputRow" label="用户名" prop="username">
        <el-input v-model="user.username" />
      </el-form-item>
      <el-form-item class="InputRow" label="密码" prop="password">
        <el-input v-model="user.password" />
      </el-form-item>
      <el-form-item class="InputRow" label="确认密码" prop="password">
        <el-input v-model="user.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="diaglogVisable=false">取消</el-button>
      </el-form-item>
    </el-form>
    
  </el-dialog>
</template>

<script>
  export default {
    props: {
      registerDiaVisable: Boolean
    },
    data() {
      return {
        // 用户输入表单
        user: {
          username: '',
          password: '',
          checkpass: '',
        },
        rules: {
          username: [
            { required: true, message: '用户名不能为空', trigger: 'blur'}
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur'},
          ],
          checkpass: [
            { required: true, message: '请再次输入密码', trigger: 'blur'},
          ]
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('register submit')
        this.diaglogVisable = false
      }
    },
    computed: {
      // 本组件的对话框无前缀(dialogVisable)，子组件(Register)的对话框有前缀(registerDialogVisable)
      diaglogVisable: {
        get() {
          return this.registerDiaVisable
        },
        set() {
          this.$emit('registerDialogClose')
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