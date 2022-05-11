<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar">
      <!-- slot="title" 是van-nav-bar的自定义插槽，用来自定义标题文字，这里就是插入了button按钮搜索框 -->
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 频道列表 -->
    <!-- 通过 v-model 绑定当前激活标签对应的索引值，默认情况下启用第一个标签
      通过 animated 属性可以开启切换标签内容时的转场动画
      通过 swipeable 属性可以开启滑动切换标签页 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <!-- v-for="channel in channels" 用来遍历渲染频道 -->
      <!-- 同时在频道列表中把文章列表遍历出来 -->
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
      >
        <!-- 文章列表组件，直接引入 -->
        <!-- :channel="channel" 把频道对象传递给文章列表组件  -->
        <!-- 这是父传子的组件通信，注意：组件名称就是引入组件的变量名称 -->
        <ArticleList :channel="channel" />
        <!-- 文章列表 -->
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="mobilett mobilett-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道列表 -->
  </div>
</template>

<script>
import { getUserChannels } from "@/api/user";
import ArticleList from "./components/ArticleIndex";
export default {
  // 引入组件记得注册
  components: {
    ArticleList,
  },
  data() {
    return {
      active: 0,
      channels: [], // 频道列表
    };
  },
  created() {
    this.loadChannels();
  },
  methods: {
    async loadChannels() {
      try {
        const { data } = await getUserChannels();
        // console.log(data);
        // 从后台把频道列表的channels传进来
        this.channels = data.data.channels;
      } catch (err) {
        this.$toast("获取频道数据失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.home-container {
  /deep/ .page-nav-bar {
    //这是给搜索框设置固定定位
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    .van-nav-bar__title {
      max-width: unset;
      .search-btn {
        width: 555px;
        height: 64px;
        background-color: #5babfb;
        border: none;
        font-size: 28px;
        .van-icon {
          font-size: 32px;
        }
      }
    }
  }

  // 频道列表
  // “/deep/”是深度作用操作符
  // 我们作用于一个子组件的样式，如果是在scoped作用域组件样式中，默认是只能作用到组件的根节点
  // 如果想要样式作用得更深，来影响他的后代元素，要在父节点加上 /deep/ or >>>
  // flex-basis规定元素的初始宽度,这里的.van-tab 的flex-basis 就是 22%，从而第五个标签也能显示完全

  /deep/ .channel-tabs {
    // 设置频道固定定位，right 和 left是为了让他左右撑开
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      z-index: 1;
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777777;
    }
    // 设置激活时候的颜色
    .van-tab--active {
      color: #333333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }
    .placeholder {
      // 倘若给父元素设置了flex布局后，若要其子元素的width有效果，必须给子元素设置flex-shrink为0。
      // flex-shrink: 默认值是1，若子元素的宽度大于父元素，那么多出的宽度会被shrink的值分成若干份，
      // 子元素的宽度就=子元素初始宽度-每个子元素占得份数宽度，即子元素被压缩;
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;

      i.mobilett {
        font-size: 33px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 58px;
        background-image: url(~@/assets/gradient-gray-line.png); //伪元素，这个背景图是图标前面的竖线
        background-size: contain; //覆盖整个背景图的意思
      }
    }
  }
}
</style>