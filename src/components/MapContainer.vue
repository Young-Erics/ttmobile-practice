<template>
  <!-- 作为地图的容器 -->
  <!-- 作为地图的容器 -->

  <div id="container"></div>
</template>
<!--引入UI组件库异步版本main-async.js（1.1版本） -->
<script src="//webapi.amap.com/ui/1.1/main-async.js"></script>
<script>
import AMapLoader from "@amap/amap-jsapi-loader";
let map = null
export default {
  name: "MapContainer",
  mounted() {
    //DOM初始化完成进行地图初始化
    this.initAMap();
  },
  methods: {
    initAMap() {
      AMapLoader.load({
        key: "9f1f02036f41128724854b3dfbb2e1cf", //设置您的key
        version: "2.0",
        // 同步加载插件放在这里
        plugins: ["AMap.Geolocation", "AMap.ToolBar"],
        AMapUI: {
          version: "1.1",
          plugins: ["overlay/SimpleMarker", "overlay/SimpleInfoWindow"],
        },
        Loca: {
          version: "2.0",
        },
      })
        .then((AMap) => {
          map = new AMap.Map("container", {
            zoom: 5,
            // center: [105.602725, 37.076636],
          });
          // 同步加载插件
          map.addControl(new AMap.Geolocation());
          map.addControl(new AMap.ToolBar());
          // 异步加载插件
          map.plugin("AMap.Scale", () => {
            // this.map.addControl(new AMap.ToolBar())
            map.addControl(new AMap.Scale());
          });
          // 点击哪个位置就增加个点标记
          map.on("click", function (e) {
            // console.log(e);
            let marker = new AMapUI.SimpleMarker({
              iconLabel: "1",
              //背景图标样式
              iconStyle: "red",
              iconTheme: "default",
              //设置基点偏移
              // offset: new AMap.Pixel(-19, -60),
              // map: this.map,
              position: e.lnglat
            });
            // 在地图上增加此标记
            map.add(marker);
          });
        })
        .catch((e) => {
          console.log(e);
          throw "地图加载失败，请重新加载";
        });
    }
  }
};
</script>

<style scoped>
#container {
  padding: 0px;
  margin: 0px;
  width: 750px;
  height: 1234px;
}
</style>