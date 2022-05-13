<template>
  <div></div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
export default {
  mounted() {
    //DOM初始化完成进行地图初始化
    this.initUi();
  },
  methods: {
    initUi() {
      AMapUI.loadUI(['overlay/SimpleMarker'], function (SimpleMarker) {
        //启动页面
        initPage(SimpleMarker);
      });
    }
  }
}
</script>

<style>
</style>