<template>
  <div class="video-container">
    <!-- <map-container></map-container> -->
    <!-- <MapContainer></MapContainer> -->
    <mapContainer></mapContainer>
  </div>
</template>

<script>
import mapContainer from "@/components/MapContainer.vue";
export default {
  components: { mapContainer },
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.video-container {
  height: 100%;
  width: 100%;
  padding: 0px;
  margin: 0px;
}
</style>