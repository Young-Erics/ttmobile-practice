<template>
  <div class="my-container">
    <!-- 已登录头部 -->
    <div v-if="user" class="header user-info">
      <!-- 头像 -->
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" fit="cover" round :src="userInfo.photo" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <!-- size="mini"意思是按钮是小型的，round指四个角是圆的 -->
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 已登录头部 -->

    <!-- 未登录头部 -->
    <div v-else class="header not-login">
      <!-- this.$router.push()配置path/name，用来切换路径 -->
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- /未登录头部 -->
    <!-- 宫格导航 -->
    <van-grid class="grid-nav mb-9" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="mobilett mobilett-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="mobilett mobilett-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <van-cell title="消息通知" is-link />
    <van-cell class="mb-9" title="小杨同学" is-link />
    <van-cell v-if="user" class="logout-cell" clickable title="退出登录" @click="onLogout" />
    <!-- 宫格导航 -->
  </div>
</template>

<script>
import { mapState } from "vuex";
// 从接口文件user里面引入--得到用户自己的信息
import { getUserInfo } from "@/api/user";
export default {
  name: "MyIndex",
  components: {},
  props: {},
  data() {
    return {
      userInfo: {}, // 用户信息
    };
  },
  computed: {
    ...mapState(["user"]), //对象扩展运算符 user：state => state.user
  },
  created() {
    // 如果用户登录了，则请求加载用户信息数据
    // this.user是vuex容器中...mapState(["user"])映射过来的数据
    if (this.user) {
      this.loadUserInfo();
    }
  },
  methods: {
    onLogout() {
      // 退出提示
      // 在组件中需要使用 this.$dialog 来调用弹框组件,调用后会直接在页面中弹出相应的模态框。
      this.$dialog
        // Dialog.confirm展示消息确认弹窗，弹出模态框
        .confirm({
          title: "确认退出吗？",
        })
        .then(() => {
          // on confirm
          // 确认退出：清除登录状态（容器中的 user + 本地存储中的 user）
          this.$store.commit("setUser", null);
        })
        .catch(() => {
          // on cancel
          console.log("取消执行这里");
        });
    },
    async loadUserInfo() {
      try {
        const { data } = await getUserInfo();
        // console.log(data); //获取用户自己的信息
        this.userInfo = data.data;
      } catch (err) {
        this.$toast("获取数据失败，请稍后重试");
      }
    },
  },
};
</script>

<style scoped lang="less">
.my-container {
  // 未登录状态CSS
  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    // cover指覆盖整个背景
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  // 已登录状态CSS
  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between; //space-between先两边贴边 再平分剩余空间（重要）
      align-items: center;
      .left {
        display: flex;
        align-items: center; // 设置侧轴上的子元素排列方式（单行）
        .avatar {
          width: 132px;
          height: 132px;
          border: 2px solid #fff;
          margin-right: 23px;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column; //锤子分布
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  // 宫格导航
  .grid-nav {
    .grid-item {
      height: 141px;
      i.mobilett {
        font-size: 45px;
      }
      .mobilett-shoucang {
        color: #eb5253;
      }
      .mobilett-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
  }

  .mb-9 {
    margin-bottom: 9px;
  }
}
</style>