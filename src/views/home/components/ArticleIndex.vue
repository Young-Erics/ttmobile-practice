<template>
  <div class="article-list">
    <!--
      List 列表组件：瀑布流滚动加载，用于展示长列表。

      List 组件通过 loading 和 finished 两个变量控制加载状态，
      当组件初始化或滚动到到底部时，会触发 load 事件并将 loading 自动设置成 true，此时可以发起异步操作并更新数据，
      数据更新完毕后，将 loading 设置成 false 即可。
      若数据已全部加载完毕，则直接将 finished 设置成 true 即可。

      - load 事件：
        + List 初始化后会“自动”触发一次 load 事件，用于加载第一屏的数据。
        + 如果一次请求加载的数据条数较少，导致列表内容无法铺满当前屏幕，List 会继续触发 load 事件，直到内容铺满屏幕或数据全部加载完成。

      - loading 属性：控制加载中的 loading 状态
        + 非加载中，loading 为 false，此时会根据列表滚动位置判断是否触发 load 事件（列表内容不足一屏幕时，会直接触发）
        + 加载中，loading 为 true，表示正在发送异步请求，此时不会触发 load 事件

      - finished 属性：控制加载结束的状态
        + 在每次请求完毕后，需要手动将 loading 设置为 false，表示本次加载结束
        + 所有数据加载结束，finished 为 true，此时不会触发 load 事件
     -->
    <!-- van-pull-refresh用于提供下拉刷新的组件，用此组件将想要被刷新的区域标签包起来 -->
    <!-- v-model="isreFreshLoading" 意思是 是否处于加载中状态 -->
    <van-pull-refresh
      v-model="isreFreshLoading"
      :success-text="refreshSuccessText"
      success-duration="1500"
      @refresh="onRefresh"
    >
      <!--  :error.sync="error" 控制列表加载失败的提示状态 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
export default {
  name: "ArticleList",
  data() {
    return {
      list: [], // 存储列表数据的数组
      loading: false, //false 表示loading转圈圈效果不显示了
      finished: false, //要是为True 就会在底部显示“没有更多”的提示效果
      timestamp: null, // 请求获取下一页数据的时间戳
      error: false, // 控制列表加载失败的提示状态
      isreFreshLoading: false, // 控制下拉刷新是否处于加载中状态
      refreshSuccessText: "刷新成功", // 下拉刷新成功提示文本
    };
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  methods: {
    // onLoad() {
    //   // 异步更新数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     for (let i = 0; i <script 10; i++) {
    //       this.list.push(this.list.length + 1);
    //     }
    //     // 加载状态结束
    //     this.loading = false;
    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true;
    //     }
    //   }, 1000);
    // },
    async onLoad() {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道ID,channel是props里的对象变量
          // 你可以把 timestamp 理解为页码
          // 如果请求第1页数据：当前最新时间戳 Date.now
          // 如果请求之后的数据，使用本次接口返回的数据中的 pre_timestamp
          // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          timestamp: this.timestamp || Date.now(),
        });
        // // 模拟随机失败的情况;
        // if (Math.random() > 0.5) {
        //   JSON.parse("dsnajndjsa");
        // }
        // console.log(data);
        // 2. 把请求结果数据放到 list 数组中,data.data的返回值是一个数组
        const { results } = data.data;
        // 数组的展开操作符，它会把数组元素一个一个拿出来,
        this.list.push(...results);
        // 3. 本次数据加载结束之后要把加载状态设置为结束
        this.loading = false;
        // 4. 判断数据是否全部加载完成
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp;
        } else {
          // 没有数据了，将 finished 设置为 true，不再 load 加载更多了
          this.finished = true;
        }
      } catch (err) {
        // 展示错误提示状态
        this.error = true;

        // 请求失败了，loading 也需要关闭
        this.loading = false;
        // console.log("传输失败", err);
      }
    },
    // 当下拉刷新的时候会触发调用该函数
    async onRefresh() {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道ID
          timestamp: Date.now(), // 下拉刷线，每次请求获取最新数据，所以传递当前最新时间戳
        });
        // 2. 将数据追加到列表的顶部
        const { results } = data.data;
        // unshift数组方法会把元素添加到数组最前面
        this.list.unshift(...results);

        // 3. 关闭下拉刷新的 loading 状态
        this.isreFreshLoading = false;

        // 更新下拉刷新成功提示的文本
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`;
      } catch (err) {
        // console.log("请求失败", err);
        this.refreshSuccessText = "刷新失败";
        //loading 状态 为false ，才不会加载了
        this.isreFreshLoading = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
//因为搜索框和频道都设置了固定定位，防止被覆盖住，设置他们的高度和为外边距
.article-list {
  margin-top: 180px;
  margin-bottom: 110px;
  // 设置固定高度撑满整个文章列表，overflow-y: auto 意思是在y轴上设置成超出部分自动显示滚动条
  // 以下设置能够解决，滑动频道后又返回原来频道依然显示原来的文章标题
  height: 79vh;
  overflow-y: auto;
}
</style>