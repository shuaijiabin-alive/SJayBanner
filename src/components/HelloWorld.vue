<template>
  <div>
    <sliderVer />
    <s-jay-banner
      :rownumber='12'
      :shownumber='5'
      :dotnav='true'
      type='2D'
    >
      <div v-for="item in 12" :key="item">
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