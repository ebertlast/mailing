<template>
  <div>
    <!--
      START @SIDEBAR LEFT
      |=========================================================================================================================|
      |  TABLE OF CONTENTS (Apply to sidebar left class)                                                                        |
      |=========================================================================================================================|
      |  01. sidebar-box               |  Variant style sidebar left with box icon                                              |
      |  02. sidebar-rounded           |  Variant style sidebar left with rounded icon                                          |
      |  03. sidebar-circle            |  Variant style sidebar left with circle icon                                           |
      |=========================================================================================================================|
    -->
    <aside id="sidebar-left" class="sidebar-circle">

        <!-- Start left navigation - profile shortcut -->
        <div id="tour-8" class="sidebar-content">
          <div class="media">
            <a class="pull-left has-notif avatar" href="page-profile.html">
              <img :src="avatar" alt="admin">
              <i class="online"></i>
            </a>
            <div class="media-body">
              <h4 class="media-heading">Hola,
                <span>{{nombreUsuario|capitalize}}</span>
              </h4>
              <!-- <small>{{nombreGrupo|capitalize}}</small> -->
            </div>
          </div>
        </div>
        <!-- /.sidebar-content -->
        <!--/ End left navigation -  profile shortcut -->

        <!-- Start left navigation - menu -->
        <ul id="tour-9" class="sidebar-menu">

          <!-- Start navigation - dashboard -->
          <li class="submenu" :class="{'active': isActive('mails') || isActive('cargarArchivos')}">
            <a href="javascript:void(0);">
              <span class="icon">
                <i class="fa fa-home"></i>
              </span>
              <span class="text">Inicio</span>
              <span class="arrow"></span>
              <span class="selected"></span>
            </a>
            <ul>
              <!-- <li class="active"> -->
              <!-- </li> -->
              <router-link tag="li" active-class="active" :to="{name:'mails'}">
                <a href="#">Emails</a>
              </router-link>
              <router-link tag="li" active-class="active" :to="{name:'cargarArchivos'}">
                <a href="#">Cargar Archivos</a>
              </router-link>
            </ul>
          </li>
          <!--/ End navigation - dashboard -->

          <!-- Start Seguridad -->
          <li class="submenu hide" :class="{'active': isActive('ksegPpal')}">
            <a href="javascript:void(0);">
              <span class="icon">
                <i class="fa fa-shield"></i>
              </span>
              <span class="text">Seguridad</span>
              <span class="arrow"></span>
            </a>
            <ul>
              <router-link tag="li" :to="{name:'usuario'}" active-class="active">
                <a href="#">Usuarios</a>
              </router-link>
            </ul>
          </li>
          <!--/ End Seguridad -->

           <!-- Start Configuración -->
          <li class="submenu" :class="{'active': isActive('cnfmail')||isActive('terceros')||isActive('plantillas')}">
            <a href="javascript:void(0);">
              <span class="icon">
                <i class="fa fa-sun-o"></i>
              </span>
              <span class="text">Configuración</span>
              <span class="arrow"></span>
            </a>
            <ul>
              <router-link tag="li" :to="{name:'cnfmail'}" active-class="active">
                <a href="#">Cuentas de Correos</a>
              </router-link>
              <router-link tag="li" :to="{name:'terceros'}" active-class="active">
                <a href="#">Terceros</a>
              </router-link>
              <router-link tag="li" :to="{name:'plantillas'}" active-class="active" class="hide">
                <a href="#">Plantillas</a>
              </router-link>
              <!-- 
              <router-link tag="li" :to="{name:'ser'}" active-class="active">
                <a href="#">Servicios</a>
              </router-link> -->
            </ul>
          </li>
          <!--/ End Configuración -->

          <!-- Start navigation - blankon versions -->
          <li class="hide">
            <a href="blankon-versions.html">
              <span class="icon">
                <i class="fa fa-dropbox"></i>
              </span>
              <span class="text">Blankon Versions</span>
            </a>
          </li>
          <!--/ End navigation - blankon versions -->

          <!-- Start navigation - blankon special -->
          <li class="hide">
            <a href="blankon-special.html">
              <span class="icon">
                <i class="fa fa-diamond"></i>
              </span>
              <span class="text">Blankon Special</span>
            </a>
          </li>
          <!--/ End navigation - blankon special -->

          <!-- Start category apps -->
          <li class="sidebar-category hide">
            <span>APPS</span>
            <span class="pull-right">
              <i class="fa fa-trophy"></i>
            </span>
          </li>
          <!--/ End category apps -->

          <!-- Start navigation - blog -->
          <li class="submenu hide">
            <a href="javascript:void(0);">
              <span class="icon">
                <i class="fa fa-globe"></i>
              </span>
              <span class="text">Blog</span>
              <span class="arrow"></span>
            </a>
            <ul>
              <li class="submenu">
                <a href="javascript:void(0);">Grid
                  <span class="label label-danger pull-right">NEW</span>
                </a>
                <ul>
                  <li>
                    <a href="blog-grid.html">Type 1</a>
                  </li>
                  <li>
                    <a href="blog-grid-type-2.html">Type 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="blog-list.html">List</a>
              </li>
              <li>
                <a href="blog-single.html">Single</a>
              </li>
            </ul>
          </li>
          <!--/ End navigation - blog -->

          <!-- Start navigation - mail -->
          <li class="submenu hide">
            <a href="javascript:void(0);">
              <span class="icon">
                <i class="fa fa-envelope"></i>
              </span>
              <span class="text">Mail</span>
              <span class="arrow"></span>
            </a>
            <ul>
              <li>
                <a href="mail-inbox.html">Inbox</a>
              </li>
              <li>
                <a href="mail-compose.html">Compose mail</a>
              </li>
              <li>
                <a href="mail-view.html">View mail</a>
              </li>
              <li class="submenu">
                <a href="javascript:void(0);">Template mail
                  <span class="arrow"></span>
                </a>
                <ul>
                  <li>
                    <a href="mail-template-billing.html" target="_blank">Billing</a>
                  </li>
                  <li>
                    <a href="mail-template-newsletter.html" target="_blank">Newsletter</a>
                  </li>
                  <li>
                    <a href="mail-template-promo.html" target="_blank">Promotion</a>
                  </li>
                </ul>
              </li>
              <li class="submenu">
                <a href="javascript:void(0);">Responsive Layout
                  <span class="arrow"></span>
                </a>
                <ul>
                  <li>
                    <a href="mail-layout-responsive-basic.html" target="_blank">Basic</a>
                  </li>
                  <li>
                    <a href="mail-layout-responsive-basic-2col.html" target="_blank">Basic 2 col</a>
                  </li>
                  <li>
                    <a href="mail-layout-responsive-bodyimage.html" target="_blank">Body image</a>
                  </li>
                  <li>
                    <a href="mail-layout-responsive-bodyimage-2col.html" target="_blank">Body image 2 col</a>
                  </li>
                  <li>
                    <a href="mail-layout-responsive-boxed-2col.html" target="_blank">Boxed 2 col</a>
                  </li>
                  <li>
                    <a href="mail-layout-responsive-boxed-3col.html" target="_blank">Boxed 3 col</a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <!--/ End navigation - mail -->

          <!-- Start navigation - project -->
          <li class="submenu hide">
            <a href="javascript:void(0);">
              <span class="icon">
                <i class="fa fa-rocket"></i>
              </span>
              <span class="text">Project</span>
              <span class="arrow"></span>
            </a>
            <ul>
              <li class="submenu">
                <a href="javascript:void(0);">Portfolio
                  <span class="arrow"></span>
                </a>
                <ul>
                  <li>
                    <a href="project-portfolio.html">Type 1</a>
                  </li>
                  <li>
                    <a href="project-portfolio-type-2.html">Type 2</a>
                  </li>
                  <li>
                    <a href="project-portfolio-type-3.html">Type 3</a>
                  </li>
                  <li>
                    <a href="project-portfolio-type-4.html">Type 4</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="project-team.html">Team</a>
              </li>
              <li>
                <a href="project-team-board.html">Team Board</a>
              </li>
              <li>
                <a href="project-team-profile.html">Team Profile</a>
              </li>
              <li>
                <a href="project-issue-tracker.html">Issue Tracker</a>
              </li>
              <li>
                <a href="project-clients.html">Clients</a>
              </li>
            </ul>
          </li>
          <!--/ End navigation - project -->

          <!-- Start navigation - pages -->
          <li class="submenu hide">
            <a href="javascript:void(0);">
              <span class="icon">
                <i class="fa fa-file-o"></i>
              </span>
              <span class="text">Pages</span>
              <span class="arrow"></span>
            </a>
            <ul>
              <li class="submenu">
                <a href="javascript:void(0);">Gallery
                  <span class="arrow"></span>
                </a>
                <ul>
                  <li>
                    <a href="page-gallery.html">Type 1</a>
                  </li>
                  <li>
                    <a href="page-gallery-type-2.html">Type 2</a>
                  </li>
                  <li>
                    <a href="page-gallery-type-3.html">Type 3</a>
                  </li>
                  <li>
                    <a href="page-gallery-type-4.html">Type 4</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="page-calendar.html">Calendar</a>
              </li>
              <li>
                <a href="page-faq.html">FAQ
                  <span class="label label-danger pull-right">New</span>
                </a>
              </li>
              <li>
                <a href="page-invoice.html">Invoice</a>
              </li>
              <li>
                <a href="page-messages.html">Messages</a>
              </li>
              <li class="submenu">
                <a href="javascript:void(0);">Timeline
                  <span class="arrow"></span>
                </a>
                <ul>
                  <li>
                    <a href="page-timeline.html">Type 1</a>
                  </li>
                  <li>
                    <a href="page-timeline-type-2.html">Type 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="page-profile.html">Profile</a>
              </li>
              <li class="submenu">
                <a href="javascript:void(0);">Search
                  <span class="arrow"></span>
                </a>
                <ul>
                  <li>
                    <a href="page-search-basic.html">Basic</a>
                  </li>
                  <li>
                    <a href="page-search-course.html">Courses</a>
                  </li>
                </ul>
              </li>
              <li class="submenu">
                <a href="javascript:void(0);">Error
                  <span class="arrow"></span>
                </a>
                <ul>
                  <li>
                    <a href="page-error-403.html">Error 403</a>
                  </li>
                  <li>
                    <a href="page-error-403-type-2.html">Error 403 Type 2</a>
                  </li>
                  <li>
                    <a href="page-error-404.html">Error 404</a>
                  </li>
                  <li>
                    <a href="page-error-404-type-2.html">Error 404 Type 2</a>
                  </li>
                  <li>
                    <a href="page-error-500.html">Error 500</a>
                  </li>
                  <li>
                    <a href="page-error-500-type-2.html">Error 500 Type 2</a>
                  </li>
                </ul>
              </li>
              <li class="submenu">
                <a href="javascript:void(0);">Account
                  <span class="arrow"></span>
                </a>
                <ul>
                  <li>
                    <a href="page-signin.html">Sign In</a>
                  </li>
                  <li>
                    <a href="page-signin-type-2.html">Sign In Type 2</a>
                  </li>
                  <li>
                    <a href="page-signup.html">Sign Up</a>
                  </li>
                  <li>
                    <a href="page-lost-password.html">Lost password</a>
                  </li>
                  <li>
                    <a href="page-lock-screen.html">Lock Screen</a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <!--/ End navigation - pages -->

          <!-- Start category ui kit-->
          <li class="sidebar-category hide">
            <span>UI KIT</span>
            <span class="pull-right">
              <i class="fa fa-magic"></i>
            </span>
          </li>
          <!--/ End category ui kit-->

          <!-- Start navigation - forms -->
          <li class="submenu hide">
            <a href="javascript:void(0);">
              <span class="icon">
                <i class="fa fa-list-alt"></i>
              </span>
              <span class="text">Forms</span>
              <span class="arrow"></span>
            </a>
            <ul>
              <li>
                <a href="form-element.html">Element</a>
              </li>
              <li>
                <a href="form-advanced.html">Advanced</a>
              </li>
              <li>
                <a href="form-layout.html">Layout</a>
              </li>
              <li>
                <a href="form-validation.html">Validation</a>
              </li>
              <li>
                <a href="form-wizard.html">Wizard</a>
              </li>
              <li>
                <a href="form-wysiwyg.html">Text Editor</a>
              </li>
              <li>
                <a href="form-xeditable.html">X-Editable</a>
              </li>
              <li>
                <a href="form-picker.html">Picker</a>
              </li>
            </ul>
          </li>
          <!--/ End navigation - forms -->

          <!-- Start navigation - tables -->
          <li class="submenu hide">
            <a href="javascript:void(0);">
              <span class="icon">
                <i class="fa fa-table"></i>
              </span>
              <span class="text">Tables</span>
              <span class="arrow"></span>
            </a>
            <ul>
              <li>
                <a href="table-default.html">Default</a>
              </li>
              <li>
                <a href="table-color.html">Color</a>
              </li>
              <li>
                <a href="table-advanced.html">Advanced</a>
              </li>
              <li>
                <a href="table-datatable.html">Datatable</a>
              </li>
              <li>
                <a href="table-samples.html">Samples
                  <span class="label label-danger pull-right">NEW</span>
                </a>
              </li>
            </ul>
          </li>
          <!--/ End navigation - tables -->

          <!-- Start navigation - maps -->
          <li class="submenu hide">
            <a href="javascript:void(0);">
              <span class="icon">
                <i class="fa fa-map-marker"></i>
              </span>
              <span class="text">Maps</span>
              <span class="arrow"></span>
            </a>
            <ul>
              <li>
                <a href="maps-google.html">Google</a>
              </li>
              <li class="submenu">
                <a href="javascript:void(0);">
                  <span class="text">Vector</span>
                  <span class="arrow"></span>
                </a>
                <ul>
                  <li>
                    <a href="maps-vector.html">Jqvmap</a>
                  </li>
                  <li>
                    <a href="maps-vector-2.html">Jvectormap
                      <span class="label label-danger pull-right">NEW</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <!--/ End navigation - maps -->

          <!-- Start navigation - charts -->
          <li class="submenu hide">
            <a href="javascript:void(0);">
              <span class="icon">
                <i class="fa fa-signal"></i>
              </span>
              <span class="text">Charts</span>
              <span class="arrow"></span>
            </a>
            <ul>
              <li>
                <a href="chart-flot.html">Flot</a>
              </li>
              <li>
                <a href="chart-morris.html">Morris</a>
              </li>
              <li>
                <a href="chart-chartjs.html">Chartjs</a>
              </li>
              <li>
                <a href="chart-c3js.html">C3js</a>
              </li>
              <li>
                <a href="chart-peity.html">Peity</a>
              </li>
              <li>
                <a href="chart-easy-pie-chart.html">Easy Pie Chart</a>
              </li>
              <li>
                <a href="chart-chartist.html">Chartist</a>
              </li>
            </ul>
          </li>
          <!--/ End navigation - charts -->

          <!-- Start category development -->
          <li class="sidebar-category" v-if="nombreUsuario==='ebert'">
            <span>DESARROLLO</span>
            <span class="pull-right">
              <i class="fa fa-code"></i>
            </span>
          </li>
          <!--/ End category development -->

          <!-- Start development - ui features -->
          <li class="submenu" :class="{'active': isActive('dev')}" v-if="nombreUsuario==='ebert'">
            <a href="javascript:void(0);">
              <span class="icon">
                <i class="fa fa-cubes"></i>
              </span>
              <span class="text">Componentes</span>
              <span class="plus"></span>
            </a>
            <ul>
              <router-link tag="li" :to="{name:'cgen'}" active-class="active" v-if="nombreUsuario==='ebert'">
                <a href="#">Generador de Códigos</a>
              </router-link>
            </ul>
          </li>
          <!--/ End development - ui features -->

       
       
          <!-- Start category widget -->
          <li class="sidebar-category hide">
            <span>WIDGET</span>
            <span class="pull-right">
              <i class="fa fa-cubes"></i>
            </span>
          </li>
          <!--/ End category widget -->

          <!-- Start widget - overview -->
          <li class="hide">
            <a href="widget-overview.html">
              <span class="icon">
                <i class="fa fa-desktop"></i>
              </span>
              <span class="text">Overview</span>
              <span class="label label-primary pull-right rounded">10</span>
            </a>
          </li>
          <!--/ End widget - overview -->

          <!-- Start widget - social -->
          <li class="hide">
            <a href="widget-social.html">
              <span class="icon">
                <i class="fa fa-group"></i>
              </span>
              <span class="text">Social</span>
              <span class="label label-success pull-right rounded">28</span>
            </a>
          </li>
          <!--/ End widget - social -->

          <!-- Start widget - blog -->
          <li class="hide">
            <a href="widget-blog.html">
              <span class="icon">
                <i class="fa fa-pencil"></i>
              </span>
              <span class="text">Blog</span>
              <span class="label label-info pull-right rounded">15</span>
            </a>
          </li>
          <!--/ End widget - blog -->

          <!-- Start widget - weather -->
          <li class="hide">
            <a href="widget-weather.html">
              <span class="icon">
                <i class="fa fa-sun-o"></i>
              </span>
              <span class="text">Weather</span>
              <span class="label label-warning pull-right rounded">6</span>
            </a>
          </li>
          <!--/ End widget - weather -->

          <!-- Start widget - misc -->
          <li class="hide">
            <a href="widget-misc.html">
              <span class="icon">
                <i class="fa fa-puzzle-piece"></i>
              </span>
              <span class="text">Misc</span>
              <span class="label label-danger pull-right rounded">9</span>
            </a>
          </li>
          <!--/ End widget - misc -->

          <!-- Start category documentation -->
          <li class="sidebar-category hide">
            <span>
              <span class="hidden-sidebar-minimize">BLANKON</span> CORE</span>
            <span class="pull-right">
              <i class="fa fa-coffee"></i>
            </span>
          </li>
          <!--/ End category documentation -->

          <!-- Start documentation - api documentation -->
          <li class="hide">
            <a href="../../../documentation/admin/html/full-documentation.html" target="_blank">
              <span class="icon">
                <i class="fa fa-book"></i>
              </span>
              <span class="text">API Documentation</span>
            </a>
          </li>
          <!--/ End documentation - api documentation -->

        </ul>
        <!-- /.sidebar-menu -->
        <!--/ End left navigation - menu -->

        <!-- Start left navigation - footer -->
        <div id="tour-10" class="sidebar-footer hidden-xs hidden-sm hidden-md hide">
          <a id="setting" class="pull-left" href="javascript:void(0);" data-toggle="tooltip" data-placement="top" data-title="Setting">
            <i class="fa fa-cog"></i>
          </a>
          <a id="fullscreen" class="pull-left" href="javascript:void(0);" data-toggle="tooltip" data-placement="top" data-title="Fullscreen">
            <i class="fa fa-desktop"></i>
          </a>
          <a id="lock-screen" data-url="page-signin.html" class="pull-left" href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
            data-title="Lock Screen">
            <i class="fa fa-lock"></i>
          </a>

          <router-link :to="{name:'ingresar'}" tag="a" class="pull-left" data-toggle="tooltip" data-placement="top" data-title="Salir">
            <i class="fa fa-power-off"></i>
          </router-link>
        </div>
        <!-- /.sidebar-footer -->
        <!--/ End left navigation - footer -->

      </aside>

    <!-- /#sidebar-left -->
    <!--/ END SIDEBAR LEFT -->
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "sidebar",
  methods: {
    isActive(nameRoute) {
      var isActive = false;
      // console.log(this.currentRoutes);
      this.currentRoutes.forEach(name => {
        if (name.indexOf(nameRoute) > -1 && !isActive) {
          isActive = true;
        }
      });
      return isActive;
    }
  },
  computed: {
    ...mapGetters([
      "usuario",
      "appname",
      "companyname",
      "yearscopyrigth",
      "current",
      "nombreUsuario",
      //   "nombreGrupo",
      "avatar",
      "currentRoutes"
    ])
  }
};
</script>

<style>

</style>
