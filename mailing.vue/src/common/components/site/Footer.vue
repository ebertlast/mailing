<template>
  <!-- Start footer content -->
  <footer class="footer-content">
    {{yearscopyrigth}} -
    &copy; {{appname}}. Created by
    <a :href="webpage" target="_blank">{{companyname}}</a>
    <span class="pull-right">Versión {{version}}</span>
  </footer>
  <!-- /.footer-content -->
  <!--/ End footer content -->
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "yearscopyrigth",
      "appname",
      "companyname",
      "webpage",
      "version"
    ])
  }
};
</script>

<style>

</style>
