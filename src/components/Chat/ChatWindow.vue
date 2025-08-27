<template>
  <el-container>
    <el-main class="dialogWindow">
    <diaglogPane :sender="myProfile" :acceptor="acceptor" :messageList="messageList">

    </diaglogPane>
    </el-main>
    <el-footer class="inputField">
    <div class="inputBox">
        <el-input
        v-model="message"
        style="width: 400px;border-radius: 20px;overflow: hidden;"
        size="large"
        placeholder="输入消息"
        @keyup.enter="$emit('sendMessage')"
        />
    </div>
    <div class="inputOptions">
        <div class="sendButton">
        <el-button size="large" circle @click="$emit('sendMessage')">
            <el-icon size="large"><Promotion /></el-icon>
        </el-button>
        </div>
        <div class="moreButton">
        <el-button size="large" circle >
            <el-icon><MoreFilled /></el-icon>
        </el-button>
        </div>
    </div>
    </el-footer>
  </el-container>
</template>
<script>
import diaglogPane from '@/components/Chat/diaglogPane.vue';
    export default{
        data() {
            return {
              dialogList: [
                {name: 'Tom', avatorUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'}
              ],
              message: '',
              activeIndex: +0,
              acceptor: undefined,
              messageList: [
              ],
            }
        },
        props: ['myProfile'], 
        methods: {
        },
        mounted() {
      },
      components: {
        diaglogPane
      }
    }
</script>
<style scoped>
  .inputField {
    width: 100%;
    padding: 0;
    background-color: rgb(252.5, 245.7, 235.5);
    display:flex;
  }
  .inputBox {
    width:70%;
    display: flex;
    align-items: center;
    padding-left:10px;
  }
  .inputOptions {
    width:35%;
    height:100%;
    padding: 0;
    display:flex;
  }
  .sendButton {
    width: 30%;
    display: flex;
    align-items: center;
  }
  .moreButton {
    width:30%;
    display:flex;
    align-items: center;
  }
</style>