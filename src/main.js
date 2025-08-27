import { createApp } from 'vue'
import { createStore } from 'vuex'
import ElementPlus, { ElMessage } from 'element-plus'
import Router from './router'
import 'element-plus/dist/index.css'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import HomeHeader from './components/Home/HomeHeader.vue'
import 'element-plus/dist/index.css'
import VueCropper from 'vue-cropper'; 
import 'vue-cropper/dist/index.css'
import '../src/global/global.css'
import { users as test_user } from './test'
import http from './global/http'
import { serverUrl } from './global/global'
window.__VUE_PROD_DEVTOOLS__ = false;
window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;

// //用户模型
// localStorage.setItem('token', '1')
// console.log()
// //如果请求失败，则删除token
// localStorage.setItem('user', JSON.stringify(test_user[0]))

// localStorage.removeItem('user')
// localStorage.removeItem('token')
const store = createStore({
  state() {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      token: localStorage.getItem('token')
    }
  },
  mutations: {
    login (state,user) {
      
      //将数据存在localStorage
      localStorage.setItem('user', JSON.stringify(user))
      //将后端传来的数据付给state
      state.user = user
      state.token = localStorage.getItem('token')
    },
    logout (state) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      state.user = null
      state.token = null
    },
    updateUser(state,user){
      // 应使用异步调用
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    }, 
  },
  actions: {
    async updateUserProfile(context,user) {
      await http.put(serverUrl + '/api/users/prof',JSON.stringify(user), {headers: {"Content-Type":"application/json"}})
      .then(result => {
        if(result.data.code === 1)
        {
          context.commit('updateUser', user)
          return result.data
        }
        else
          return new Error(result.data.msg)
      })
      .catch(error =>
      {
        return new Error('网络繁忙，请稍后再试')
      })
    }
  }
})
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(Router)
app.use(ElementPlus)
app.use(store)
app.use(VueCropper)

app.mount('#app')
app.component('HomeHeader', HomeHeader)