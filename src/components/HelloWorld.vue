<template>
  <div>
    <sliderVer />
    <!-- 
      shownumber (Number) 可视区显示数量
      dotnav （Boolean） 是否显示底部导航
      automove （Boolean） 是否自动轮播 默认false
      type （String） 2D / 3D  默认2D
     -->
     <!-- <video
      ref="videoElement"
      controls
      autoplay
    ></video> -->
     <!-- <video src='../assets/video/15483810_1_0_batch.mp4' controls="controls"></video> -->
    <s-jay-banner
      :shownumber='4'
      :dotnav='true'
      :automove='true'
      :buttonhtml='["<", ">"]'
      type='2D'
    >
      <div v-for="item in 4" :key="item">
        <h2 style="height:180px; line-height:180px; text-align:center;">{{ item }}</h2>
      </div>
    </s-jay-banner>
  </div>
</template>
<script>

import sliderVer from '@/components/sliderVer'
import SJayBanner from '@/components/SJayBanner'
import flvjs from 'flv.js'

export default {
  name: 'hello',
  data() {
    return {
      flvPlayer: null
    }
  },
  components: {
    sliderVer,
    SJayBanner
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.createVideo();
    // });
  },
  methods: {
    // createVideo() {
    //   const videoElement = this.$refs.videoElement;
    //   this.flvPlayer = flvjs.createPlayer({
    //     type: 'flv',
    //     url: '../assets/video/15483810_1_6.flv.flv'
    //   });
    //   this.flvPlayer.attachMediaElement(videoElement);
    //   this.flvPlayer.load();
    //   this.flvPlayer.play();
    // }
  },
}
</script>