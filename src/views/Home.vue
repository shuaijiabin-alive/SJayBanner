<template>
  <div class="home">
    <Cropper></Cropper>
    <a-button type="primary" @click="getCropData"> 获取裁剪地址 </a-button>
    <HelloWorld msg="Welcome to Your Vue.js App" />567567567
    <UEditer></UEditer>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import UEditer from "@/components/UEditer.vue";
import Cropper from "@/components/Cropper.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    UEditer,
    Cropper,
  },
  data() {
    return {};
  },
  methods: {
    getCropData() {
      this.$refs.cropper.getCropData((data) => {
        console.log(data);
      });
    },
  },
};
</script>
