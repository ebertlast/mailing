<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <transition enter-active-class="animated fadeIn"
                mode="out-in"
                appear>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    ...mapActions(["initUsuario"])
  },
  mounted() {
    this.initUsuario();
  }
};
</script>

<style>
@import "~vuejs-noty/dist/vuejs-noty.css";
.hide {
  display: none;
}
</style>
