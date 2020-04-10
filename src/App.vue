<template>
  <div class="app">
    欢迎使用rad-radVideo,此为测试环境
    <!-- 如果使用一个组件，那么属性值的设置优先设置给子组件中的props属性 -->
    <radvideo style="height:600px;width:800px;"
      src="https://video.pearvideo.com/mp4/adshort/20200103/cont-1638717-14760593_adpkg-ad_hd.mp4"
    ></radvideo>
  </div>
</template>

<script>
import radvideo from './components/video.vue';
export default {
  components: {
    radvideo
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
</style>