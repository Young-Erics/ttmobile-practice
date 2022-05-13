<template>
  <div id="mapView" ref="mapView">
    <!--自定义窗体-->
    <div class="info" ref="infoWindow">
      <!-- <div class="info-head">{{ info.name }}</div> -->
      <div style="display: flex; align-items: center">
        <div style="width: 120px; height: 80px; margin-right: 10px">
          <img style="width: 100%; height: 100%" :src="info.imageUrl" :alt="info.name" />
        </div>
        <div style="font-size: 13px">
          <p>地址：{{ info.address }}</p>
          <p>电话：{{ info.phone }}</p>
          <p>营业时间： {{ info.time }}</p>
          <!-- 9f1f02036f41128724854b3dfbb2e1cf -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
#mapView {
  height: calc(100vh - 86px);
}

.info {
  display: none;
}

:deep(.amap-marker-label) {
  border: none !important;
}
</style>