<template>
     <!-- START @SIGN WRAPPER -->
    <div id="sign-wrapper">

        <!-- Brand -->
        <div class="brand">
            <img src="src/assets/logo.png" :alt="appname" />
        </div>
        <!--/ Brand -->

        <!-- Login form -->
        <form class="sign-in form-horizontal shadow no-overflow">
            <div class="sign-header">
                <div class="form-group">
                    <div class="sign-text">
                        <span>Área de Miembros</span>
                    </div>
                </div>
                <!-- /.form-group -->
            </div>
            <!-- /.sign-header -->
            <div class="sign-body">
                <div class="form-group">
                    <div class="input-group input-group-lg rounded no-overflow">
                        <input type="text" class="form-control input-sm" placeholder="Nombre de Usuario o Email" name="usuarioid" v-focus v-model="usuario.usuarioid" ref="usuarioid" v-on:keypress.enter="ingresar">
                        <span class="input-group-addon">
                            <i class="fa fa-user"></i>
                        </span>
                    </div>
                </div>
                <!-- /.form-group -->
                <div class="form-group">
                    <div class="input-group input-group-lg rounded no-overflow">
                        <input type="password" class="form-control input-sm" placeholder="Clave Secreta" name="clave" v-model="usuario.clave" ref="clave" v-on:keypress.enter="ingresar">
                        <span class="input-group-addon">
                            <i class="fa fa-lock"></i>
                        </span>
                    </div>
                </div>
                <!-- /.form-group -->
            </div>
            <!-- /.sign-body -->
            <div class="sign-footer">
                <div class="form-group">
                    <div class="row hide">
                        <div class="col-xs-6">
                            <div class="ckbox ckbox-theme">
                                <input id="rememberme" type="checkbox">
                                <label for="rememberme" class="rounded">Remember me</label>
                            </div>
                        </div>
                        <div class="col-xs-6 text-right">
                            <a href="page-lost-password.html" title="lost password">Lost password?</a>
                        </div>
                    </div>
                </div>
                <!-- /.form-group -->
                <div class="form-group">
                    <button type="submit" class="btn btn-theme btn-lg btn-block no-margin rounded" id="login-btn" @click.prevent="ingresar">Ingresar</button>
                </div>
                <!-- /.form-group -->
            </div>
            <!-- /.sign-footer -->
        </form>
        <!-- /.form-horizontal -->
        <!--/ Login form -->

        <!-- Content text -->
        <p class="text-muted text-center sign-link hide">Need an account?
            <a href="page-signup.html"> Sign up free</a>
        </p>
        <!--/ Content text -->

    </div>
    <!-- /#sign-wrapper -->
    <!--/ END SIGN WRAPPER -->
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      cargando: false,
      usuario: {}
    };
  },
  methods: {
    ...mapActions(["animarDiv", "setUsuario", "clearUsuario"]),
    ingresar() {
      if (this.cargando) {
        return;
      }
      //   console.log("Usuario: ", this.usuario);
      if (!this.usuario.usuarioid || this.usuario.usuarioid === "") {
        // this.animarDiv("sign-wrapper");
        return this.$refs.usuarioid.select();
      }
      if (!this.usuario.clave || this.usuario.clave === "") {
        // this.animarDiv("sign-wrapper");
        return this.$refs.clave.select();
      }
      //   console.log(this.$http);
      this.cargando = true;
      this.$http
        .get(`usuario/ingresar/${this.usuario.usuarioid}/${this.usuario.clave}`)
        .then(res => {
          this.cargando = false;
          if (!res.success) {
            return this.animarDiv("sign-wrapper");
          } else {
            var usuario = res.result.recordset[0];
            this.setUsuario(usuario).then(() => {
              return this.$router.push({ name: "mails" });
              // return (document.location = "/");
            });
          }
        })
        .catch(err => {
          this.animarDiv("sign-wrapper");
          this.cargando = false;
          console.log(err);
        });
    }
  },

  computed: {
    ...mapGetters(["appname"])
  },
  mounted() {
    // console.log("Noty: ", this.$noty);
    $("body").attr("class", "page-sound page-backstretch");
    this.clearUsuario();
  }
};
</script>

<style>

</style>
