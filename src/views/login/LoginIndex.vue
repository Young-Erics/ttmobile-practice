<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <!-- slot="left"插槽自定义左侧区域内容，van-icon是vant的图标 -->
      <van-icon slot="left" name="cross" @click="$router.back()" />
      <!-- @click="$router.back()" 路由方法，返回上一个路由路径 -->
    </van-nav-bar>
    <!-- 登录表单 -->
    <!-- 表单验证：
        1、给 van-field 组件配置 rules 验证规则
          参考文档：https://youzan.github.io/vant/#/zh-CN/form#rule-shu-ju-jie-gou
        2、当表单提交的时候会自动触发表单验证
           如果验证通过，会触发 submit 事件
           如果验证失败，不会触发 submit -->
    <van-form ref="loginForm" @submit="onSubmit">
      <!-- van-field可以理解为输入框 -->
      <!-- label是左侧提示文本 -->
      <!-- :rules是验证消息 -->
      <!-- i标签中的slot是vant中的slots具名插槽 class是字体图标 -->
      <van-field v-model="user.mobile" name="mobile" placeholder="请输入手机号"
        :rules="userFormRules.mobile">
        <i slot="left-icon" class="mobilett mobilett-shouji"></i>
      </van-field>
      <van-field v-model="user.code" name="code" placeholder="请输入验证码" :rules="userFormRules.code"><i
          slot="left-icon" class="mobilett mobilett-yanzhengma"></i>
        <!-- 通过 button 插槽可以在输入框尾部插入按钮。 -->
        <template #button>
          <!-- v-if="isCountDownShow" 为ture，则显示倒计时，否则显示下面的获取验证码 -->
          <!-- @finish事件在倒计时结束后触发 -->
          <van-count-down :time="1000 * 5" format="ss s" v-if="isCountDownShow"
            @finish="isCountDownShow = false" />
          <van-button v-else class="sent-msg-btn" round native-type="button" size="small"
            type="default" @click="onSendSms">获取验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap" style="margin: 16px">
        <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// 这是登录页面的路由组件
// 按需导入user请求
// 万能登录验证码246810
import { login, sendCode } from "@/api/user";

export default {
  name: "LoginPage",
  components: {},
  props: {},
  data() {
    return {
      //接口文档要求提供mobile和code
      user: {
        mobile: "", //手机号
        code: "", //验证码
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: "手机号格式错误",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
      isCountDownShow: false, //显示倒计时的组件
    };
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {
    async onSubmit() {
      // 1. 展示登陆中 loading
      // Toast 轻提示,黑色半透明提示
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true, // 禁用背景点击
        duration: 2000, // 持续时间，默认 2000，0 表示持续展示不关闭
      });
      // 1. 获取表单数据

      // TODO: 2. 表单验证

      // 3. 提交表单请求登录
      //try{    } 不是一个函数，是一个语句块，如果加了try｛｝标识，
      // 如果这一块语句有问题的话，错误会被忽略，任然可以通过编译
      // 这是一套语句，还应该有捕捉的catch语句来捕捉异常。
      try {
        // const res = await login(user);
        // {data}解构赋值，await login直接返回promise的结果，这个结果就是axios的post方法返回后的数据
        const { data } = await login(this.user);
        // data 打印出来的信息里面有个data包含token身份令牌
        // console.log("登录成功", data);
        //$store是vuex的语法，在main.js中全局引用了，可以再组件内使用
        // store.commit 触发状态更改
        this.$store.commit("setUser", data.data);
        // 提示 success 或者 fail 的时候，会先把其它的 toast 先清除
        this.$toast.success("登录成功");
        // 登录成功，跳转回原来页面：my 组件
        // back 的方式不严谨，后面讲功能优化的时候再说
        this.$router.back();
      } catch (err) {
        if (err.response.status === 400) {
          console.log("手机号或验证码错误");
          this.$toast.fail("登录失败，手机号或验证码错误");
        } else {
          console.log("登录失败，请稍后重试", err);
          this.$toast.fail("登录失败，请稍后重试");
        }
      }

      // 4. 根据请求响应结果处理后续操作
    },
    async onSendSms() {
      console.log("onSendSms");
      // 1. 校验手机号是否正确
      try {
        //validate验证表单，支持传入 name 来验证单个或部分表单项,返回promise
        await this.$refs.loginForm.validate("mobile");
      } catch (err) {
        return console.log("验证失败", err); //return后面以下的代码不执行了
      }

      // 2. 验证通过，显示倒计时
      this.isCountDownShow = true;
      // 3. 请求发送验证码
      try {
        await sendCode(this.user.mobile);
        //$toast是vant内置的窗口提醒方法
        this.$toast("发送成功");
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false;
        if (err.response.status === 429) {
          this.$toast("发送太频繁了，请稍后重试");
        } else {
          this.$toast("发送失败，请稍后重试");
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.login-container {
  .mobilett {
    font-size: 37px;
  }
}
.sent-msg-btn {
  background-color: #ededed;
  color: #666;
}
.login-btn-wrap {
  padding: 20px 8px;
  .login-btn {
    background-color: #6db4fb;
    border: none;
  }
}
</style>