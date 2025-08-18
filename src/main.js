import { createApp } from 'vue'
import { createStore } from 'vuex'
import ElementPlus from 'element-plus'
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
window.__VUE_PROD_DEVTOOLS__ = false;
window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;

//用户模型
localStorage.setItem('token', '1')
console.log()
//如果请求失败，则删除token
localStorage.setItem('user', JSON.stringify(test_user[0]))

const store = createStore({
  state() {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      token: localStorage.getItem('token')
    }
  },
  mutations: {
    login (state,user,token) {
      //将后端传来的数据付给state
      state.user = user
      state.token = token
      //将数据存在localStorage
      localStorage.setItem('user', user)
      localStorage.setItem('token', token)
    },
    logout (state) {
      localStorage.setItem('token', null)
      localStorage.setItem('user', null)
      state.user = null
      state.token = null
    },
    updateUser(state,user){
      // 应使用异步调用
      console.log('save user!')
    }, 
  },
  actions: {
    updateUser(context,user) {
      return new Promise((resolve,reject) => {
        if(user.username === '1')
        {
          resolve()
        }
        else
          reject()
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