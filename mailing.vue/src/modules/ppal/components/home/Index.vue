<template>
   <div>
    <!-- START @WRAPPER -->
    <section id="wrapper">

      <navbar></navbar>

      <sidebar></sidebar>

      <!-- START @PAGE CONTENT -->
      <section id="page-content">

        <header-content></header-content>

        <!-- Start body content -->
        <div class="body-content animated fadeIn" style="min-height: 600px;">
            <transition enter-active-class="animated fadeIn"
                mode="out-in"
                appear>
                <router-view></router-view>
            </transition>
        </div>
        <!-- /.body-content -->
        <!--/ End body content -->

        <footer-view></footer-view>
      </section>
      <!-- /#page-content -->
      <!--/ END PAGE CONTENT -->

      <sidebar-right></sidebar-right>


    </section>
    <!-- /#wrapper -->
    <!--/ END WRAPPER -->

    <!-- START @BACK TOP -->
    <div id="back-top" class="animated pulse circle">
      <i class="fa fa-angle-up"></i>
    </div>
    <!-- /#back-top -->
    <!--/ END BACK TOP -->
  </div>
</template>

<script>
import { default as components } from "../../../../common/components/site";
export default {
  components,
  mounted() {
    $("body").attr(
      "class",
      "page-session page-header-fixed page-sidebar-fixed demo-dashboard-session"
    );
  }
};
</script>

<style>

</style>
