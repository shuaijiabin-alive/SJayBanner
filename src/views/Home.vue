<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />567567567
    <UEditer></UEditer>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import UEditer from "@/components/UEditer.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    UEditer
  },
  data() {
    return {
    }
  }
};
</script>
