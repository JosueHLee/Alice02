<template>
  <el-skeleton v-if="!product" style="--el-skeleton-circle-size: 100px">
    <template #template>
      <el-skeleton-item variant="circle" />
    </template>
  </el-skeleton>
  <el-row v-else class="main-info">
    <!-- 商品轮播图 -->
    <el-col :span="12" class="display-center">
      <el-carousel indicator-position="outside" class="imgs">
        <el-carousel-item v-for="pic in pics" :key="pic" class="img-frame">
          <el-image class="img" :src="pic" fit="cover" />
        </el-carousel-item>
      </el-carousel>
    </el-col>
    <!-- 商品详情 -->
    <el-col :span="10" :offset="1">
      <div>
        <!-- 用户信息展示行 -->
        <el-row >
          <!-- 用户头像 -->
          <el-col :span="4" class="display-center">
            <el-link type="info" @click="clickUser" underline="never">
                <el-avatar :size="50" :src="avatorUrl" />
              </el-link>
          </el-col>
          <el-col :span="8">
            <!-- 用户名称 -->
            <el-row>
              <el-link type="info" @click="clickUser">
                <el-text truncated class="text-width">
                  {{ owner.username }}
                </el-text>
              </el-link>
            </el-row>
            <!-- 用户概要信息 -->
            <el-row>
              <el-col :span="12">
                <el-tag type="primary" style="width: 100%;">
                  性别未公开
                </el-tag>
              </el-col>
              <el-col :span="10" :offset="1">
                <el-tag type="primary" style="width: 100%;">
                  100 粉丝
                </el-tag>
              </el-col>
            </el-row>
          </el-col>
          <!-- 用户不是自己的操作 -->
          <el-col v-if="owner.userId !== user?.userId" :span="12" class="button display-center">
            <el-button type="default" plain @click="clickChat">
              聊天
            </el-button>
            <el-button v-if="true" type="success" plain @click="clickFollowed">
              关注
            </el-button>
            <!-- 已关注的要取关 -->
            <el-button v-else type="primary" @click="clickUnfollwed">
              已关注
            </el-button>
          </el-col>
        </el-row>
        <!-- 商品名称 -->
        <el-row class="item-text-content">
          <el-col :span="3">
            <h3 class="display-center second-title-color">
              名称:
            </h3>
          </el-col>
          <el-col :span="4" class="display-center name">
            <el-text size="large" type="info">{{ product.name }}</el-text>
          </el-col>
        </el-row>
        <!-- 商品属性 -->
        <el-row>
          <el-col :span="3">
            <h3 class="display-center second-title-color">
              价格:
            </h3>
          </el-col>
          <el-col :span="4" class="display-center">
            <el-tag size="large" type="warning" effect="dark"> <el-text size="large" style="color: #FAFAFA">{{ "￥" + "100" }}</el-text></el-tag>
          </el-col>
          <el-col :span="3" :offset="1" class="display-center">
            <el-tag type="success">种类</el-tag>
          </el-col>
          <el-col :span="3" class="display-center">
            <el-tag :type="state_color[product.state]">{{ state_text[product.state] }}</el-tag>
          </el-col>
          <el-col :span="3" class="display-center">
            <el-tag>{{ product.amount + "件" }}</el-tag>
          </el-col>
          <el-col :span="3" class="display-center">
            <el-tag type="success"><el-icon><Star /></el-icon><el-text type="success">{{ product.want }}</el-text></el-tag>
          </el-col>
        </el-row>
        <!-- 商品描述行 -->
        <el-row>
          <el-col :span="3">
            <h3 class="display-center second-title-color">
              描述:
            </h3>
          </el-col>
          <el-col :span="24" :offset="1" class="display-center">
            <el-text size="large" type="info">"术语 "Spring" 在不同的语境中意味着不同的东西。它可以用来指代Spring框架项目本身，它是一切的开始。随着时间的推移，其他Spring项目也被建立在Spring框架之上。大多数时候，当人们说 "Spring" 时，他们指的是整个项目家族（全家桶）。这个参考文档的重点是基础：Spring框架本身。
Spring 框架被划分为多个模块。应用程序可以选择他们需要的模块。core 是核心容器的模块，包括一个配置模型和一个依赖注入机制。除此之外，Spring框架还为不同的应用架构提供了基础支持，包括消息传递、事务性数据和持久性以及Web。</el-text>
          </el-col>
        </el-row>
        <!-- 商品操作行 -->
        <!-- 他人的商品 -->
        <el-row v-if="owner.userId !== user?.userId" class="item-text-content display-center ">
          <el-button type="warning" plain @click="clickBuy" size="large">
            购买
          </el-button>
          <el-button v-if="true" type="success" plain @click="clickWant" size="large">
            收藏
          </el-button>
          <!-- 已收藏 -->
          <el-button v-else type="success" plain @click="clickUnwant" size="large">
            已收藏
          </el-button>
            
        </el-row>
        <!-- 自己的商品 -->
        <el-row v-else class="item-text-content display-center ">
            <el-button type="warning" plain @click="clickEdit" size="large">
              编辑
            </el-button>
            <el-button type="success" plain @click="clickOff" size="large">
              下架
            </el-button>
        </el-row>
      </div>
        
    </el-col>
  </el-row>
  <ItemEdit :productid="product.id" :itemEditDialogVisable="itemEditDialogVisable" @itemEditDialogClose="itemEditDialogVisable = false">

  </ItemEdit>
  <el-dialog
    v-model="amountDialogVisible"
    title="购买数量"
    align-center
    width="500"
    :close-on-click-modal="false"
  >
    <el-input-number v-model="amount" :min="1" :max="product.amount" />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="clickAmount">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import { allProducts as publishedProduct, users} from '@/test'
import { state_text, state_color } from '@/global/global'
import { mapState } from 'vuex'
import ItemEdit from './ItemEdit.vue'
import router from '@/router'
import http from '../../global/http'
import { serverUrl } from '@/global/global'
  export default {
    data() {
      return {
        product: {

        },
        owner: null,
        pics: ["https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
                "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                ],
        state_text,
        state_color,
        itemEditDialogVisable: false,
        amountDialogVisible: false,
        amount: 1,
        avatorUrl: '',
      }
    },
    props:['productId'],
    async created(){
      // 根据productId查询用户和商品信息
      
      await http.get(serverUrl + '/api/users/prof/' + this.product.sellerId)
      .then(result => {
        if(result.data.code === 1)
        {
          this.owner = {
            ...result.data.data,
            picture: serverUrl + '/api/users/icon/' + result.data.data.userId,
            picture_narrow: serverUrl + '/api/users/icon/' + result.data.data.userId
          }
          http.get(this.owner.picture, { responseType: "blob"})
          .then(result => {
            if(result.data != null)
            {
              this.avatorUrl = URL.createObjectURL(result.data)
            }
              
            else
              return null
          })
        }
      })
      .catch(error => {
        this.$emit('connectFailed',error)
      })
      this.stateType = this.product.state === 1? 'danger':'primary'

      await http.get(serverUrl + '/api/products/pics/' + this.product.id)
      .then(result => {
        if(result.data.code == 1)
        {
          for(let i = 0; i < result.data.data.length; i++)
          {
            // if(result.data.data[i].kind == 1)
            // {
            //   this.picId = result.data.data[i].id
            //   break
            // }
            http.get(serverUrl + '/api/products/' + this.picId,{ responseType: 'blob' })
          .then(result => {
            if(result.data != null)
            {
              this.pics.push(URL.createObjectURL(result.data))
            }
          })
          .catch(error => {
            console.log(error)
          })
          }
          
        }
      })
      .catch(error => {
        //连接出错时抛出异常
        this.$emit('connectFailed',error)
      })

      // for(let i = 0; i < publishedProduct.length; i++)
      // {
      //   if(publishedProduct[i].id === this.productId)
      //   {
      //     this.product = publishedProduct[i]
      //     break
      //   }
      // }
      // for(let i = 0; i < users.length; i++)
      // {
      //   if(this.product.userId === users[i].userId)
      //   {
      //     this.owner = users[i]
      //     return
      //   }
      // }
      
    },
    methods: {
      clickUser() {
        const href = router.resolve({name: 'UserHome', params: {uName: this.owner.username}}).href
        window.open(href, '_blank')
      },
      clickChat() {
        window.open("", "chat")
      },
      clickFollowed(){
        console.log("clickFollwed!")
      },
      clickUnfollwed(){
        console.log("clickedUnFolled")
      },
      clickBuy(){
        this.amountDialogVisible = true
      },
      clickWant(){
        console.log("clickFollwed!")
      },
      clickUnwant(){
        console.log("clickFollwed!")
      },
      clickEdit(){
        this.itemEditDialogVisable = true
      },
      clickOff(){
        console.log("clickFollwed!")
      },
      clickAmount() {
        this.itemEditDialogVisable = false
        //创建订单，获取订单id
        
        //测试时假设订单号和商品号相同，方便展示
        const href = router.resolve({name: 'Trade', params: {orderid: this.product.id}}).href
        window.open(href, '_blank')
      }
  },
  computed: {
    ...mapState(['user'])
  },
  components: {
    ItemEdit,
  }
}
</script>
<style scoped>
  @media screen and (min-width: 960px) {
    ::v-deep span {
      font-size: 20 px !important;
    }
    .main-info {
      display: block;
      width: 90%;
      padding: var(--wide-slot-width) var(--wide-slot-width) var(--wide-slot-width) var(--wide-slot-width);
    }
    .el-col {
      width: 100%;
    }
  }
  @media screen and (min-width: 1200px) {
    ::v-deep span {
      font-size: 20 px !important;
    }
    .main-info {
      display: flex;
      width: 100%;
      padding: calc(var(--wide-slot-width) * 2) var(--wide-slot-width) calc(var(--wide-slot-width) * 2) var(--wide-slot-width);
    }
    .el-col {
      width: 100%;
    }
    .imgs {
      width: calc((var(--large-pc-screen-col-width) + var(--wide-slot-width)) * 5);
      /* height: calc((var(--large-pc-screen-col-width) + var(--wide-slot-width)) * 5 + var(--large-pc-screen-col-width)); */
      /* background-color: antiquewhite; */  
    }
    :deep(.el-carousel__container) {
      width: calc((var(--large-pc-screen-col-width) + var(--wide-slot-width)) * 5 - var(--wide-slot-width)) !important;
      height: calc((var(--large-pc-screen-col-width) + var(--wide-slot-width)) * 5 - var(--wide-slot-width)) !important;
      margin: calc(var(--wide-slot-width) / 2) 0 0 calc(var(--wide-slot-width) / 2);
      box-shadow: var(--el-box-shadow-dark);
    }
    .img {
      width: calc((var(--large-pc-screen-col-width) + var(--wide-slot-width)) * 5 - var(--wide-slot-width));
      height: calc((var(--large-pc-screen-col-width) + var(--wide-slot-width)) * 5 - var(--wide-slot-width));
      background-color: black;
    }
    .button {
      justify-content: left;
    }
    .item-text-content {
      margin-top: 5%;
    }
    .el-tag {
      width: 95%;
    }
    .name {
      justify-content: left;
    }
  }
</style>