<template>
  <div class="full-width">
    <div class="display-center">
        <h1>注册</h1>
    </div>
    <el-form
      ref="ruleFormRef"
      :model="user"
      :rules="rules"
      label-width="30%"
      :hide-required-asterisk="true"
      size="large"
      data-testid="regisForm"
    >
      <el-form-item for="username" class="InputRow" label="用户名" prop="username">
        <el-input data-testid="username" v-model="user.username" />
      </el-form-item>
      <el-form-item class="InputRow" label="电话号码" prop="tel">
        <el-input data-testid="telephone" v-model="user.tel" />
      </el-form-item>
      <el-form-item class="InputRow" label="密码" prop="password" >
        <el-input data-testid="password" v-model="user.password" show-password/>
      </el-form-item>
      <el-form-item class="InputRow" label="确认密码" prop="checkpass" >
        <el-input data-testid="password2" v-model="user.checkpass" show-password/>
      </el-form-item>
      <div class="display-center">
        <el-button data-testid="submit" type="primary" @click="onSubmit()" :disable="sending">提交</el-button>
        <el-button @click="notRegis">取消</el-button>
      </div>
    </el-form>
    
  </div>
</template>

<script>
import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router/index.js'
  export default {
    data() {
      return {
        // 用户输入表单
        user: {
          username: '',
          tel: '',
          password: '',
          checkpass: '',
        },
        rules: {
          username: [
            { validator: (rule, value,callback) => {
              if(value === '')
              {
                callback(new Error( '用户名不能为空'))
              }
              else if(!/^(?!\d+$)[A-Za-z0-9\u4e00-\u9fa5]+$/.test(value))
              {
                callback(new Error('用户名由汉字、字母、数字组成,且非纯数字'))
              }
              else if(value.length < 4 || value.length > 30)
              {
                callback(new Error('用户名长度为4-30'))
              }
              else
              {
                callback()
              }
              }, trigger: 'blur'}
          ],
          tel: [
            { required: true, message: '电话号码不能为空', trigger: 'blur'},
            { pattern:/^1[34578][0-9]{9}$/, message: '请输入正确的电话号码', trigger: 'blur'}
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur'},
            { max: 20, message: "不超过20字符", trigger: 'blur'}
          ],
          checkpass: [
            { validator: (rule, value, callback) => {
              if( this.user.password !== '' && value === '')
              {
                callback(new Error("请再输入一次密码"))
              }
              else if(value !== this.user.password)
              {
                callback(new Error("两次输入的密码不一致"))
              }
              else
              {
                callback()
              }
              }, trigger: 'blur'}
          ]
        },
        sending: undefined,

      }
    },
    methods: {
      async onSubmit() {
        
        // 先检查表单，防止空提交
        if(!this.$refs.ruleFormRef) return
        try {
          await this.$refs.ruleFormRef.validate()
        // } catch(error) {
        //   console.log(error)
        //   return
        // }
        // try {
          const post_user = {
            username: this.user.username,
            pwd: this.user.password,
            tel: this.user.tel
          }
          const result = await axios.post('/api/users/register',JSON.stringify(post_user),
                                          {headers: {'Content-Type': 'application/json'}})
          if(result.data.code === 1)
          {
            ElMessage.success(result.data.msg)
            router.push({name : 'Login'})
          }
          else
          {
            ElMessage.error(result.data.msg)
          }
        } catch (error) {
          ElMessage.error("服务器繁忙请稍后再试")
        }
      },
      notRegis() {
        router.push({name: 'Login'})
      },
      async out() {
        try {
          await this.$refs.ruleFormRef.validate()
          // console.log("here")
        } catch(error) {
          console.log("here")
          return
        }
        console.log("log out")
      }
    },
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
  :deep(.el-form-item__content) {
    justify-content: center;
  }
</style>