<template>
  <div>
    <!-- Start header content -->
    <div class="header-content">
      <h2>
        <i :class="current.icon"></i>{{current.title}}
        <span>{{current.subtitle}}</span>
      </h2>
      <div class="breadcrumb-wrapper hidden-xs">
        <span class="label">Estás aquí:</span>
        <ol class="breadcrumb">
          <li>
            <i class="fa fa-home"></i>
            <router-link tag="a" :to="{name:'mails'}">Inicio</router-link>
            <i class="fa fa-angle-right"></i>
          </li>
          <li v-for="(item, index) in nav" :key="index">
            <span v-if="item.name===''" :class="{'active': index===nav.length}">{{item.text}}</span>
            <span v-if="item.name!==''">
              <router-link tag="a" :to="{name:item.name}">
                {{item.text}}
              </router-link>
            </span>
            <i class="fa fa-angle-right" v-if="item.name!==''"></i>
          </li>
          <!-- <li class="active">Sidebar Fixed Page</li> -->
        </ol>
      </div>
    </div>
    <!-- /.header-content -->
    <!--/ End header content -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  mounted() {
    // console.log(this.nav);
  },
  computed: {
    ...mapGetters(["current", "nav"])
  }
};
</script>
 
<style>

</style>
