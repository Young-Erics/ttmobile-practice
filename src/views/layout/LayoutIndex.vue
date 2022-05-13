<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- /子路由出口 -->

    <!-- 标签导航栏 -->
    <!-- route开启路由模式 -->
    <van-tabbar class="layout-tabbar" route>
      <!-- icon 智能配置vant内置的图标 -->
      <!-- slot="icon" 是vant的插槽自定义图标 -->
      <van-tabbar-item to="/">
        <i slot="icon" class="mobilett mobilett-shouye"></i>
        <span>首页</span>
      </van-tabbar-item>
      <!-- <van-tabbar-item icon="home-o">首页</van-tabbar-item> -->
      <van-tabbar-item to="/qa">
        <i slot="icon" class="mobilett mobilett-wenda"></i>
        <span>地图</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="mobilett mobilett-shipin"></i>
        <span>地图</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="mobilett mobilett-wode"></i>
        <span>{{ $store.state.user ? "我的" : "未登录" }}</span>
      </van-tabbar-item>
    </van-tabbar>
    <!-- 标签导航栏 -->
  </div>
</template>

<script>
export default {
  name: "LayoutIndex",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {},
};
</script>

<style scoped lang="less">
.layout-container {
  .layout-tabbar {
    i.mobilett {
      font-size: 40px;
    }
    span {
      font-size: 20px;
    }
  }
}
</style>