<template>
  <div>
    <sliderVer />
    <!-- 
      shownumber (Number) 可视区显示数量
      dotnav （Boolean） 是否显示底部导航
      automove （Boolean） 是否自动轮播 默认false
      type （String） 2D / 3D  默认2D
     -->
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

export default {
  name: 'hello',
  data() {
    return {

    }
  },
  components: {
    sliderVer,
    SJayBanner
  }
}
</script>