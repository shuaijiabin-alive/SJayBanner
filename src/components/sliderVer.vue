<template>
  <div class="container">
    <div id="captcha" style="position: relative"></div>
    <div id="msg">123132</div>
  </div>
</template>
<script>

import sliderJs from '@/assets/js/slider.js'
import '@/assets/css/slider.css'
export default {
  name: 'sliderVer',
  data() {
    return {

    }
  },
  mounted: function(){
    this.sliderVer()
  },
  methods: {
    sliderVer() {
      jigsaw.init(document.getElementById('captcha'), function () {
        document.getElementById('msg').innerHTML = '登录成功！'
      }, function() {
        document.getElementById('msg').innerHTML = '登录失败！'
      })
    }
  }
}
</script>

<style type="text/css" scoped>
  .container {
    width: 310px;
    margin: 100px auto;
  }
  input {
    display: block;
    width: 290px;
    line-height: 40px;
    margin: 10px 0;
    padding: 0 10px;
    outline: none;
    border:1px solid #c8cccf;
    border-radius: 4px;
    color:#6a6f77;
  }
  #msg {
    width: 100%;
    line-height: 40px;
    font-size: 14px;
    text-align: center;
  }

</style>