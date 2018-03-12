<template>
  <div>
    <!-- <button class="cbp-filter-item-active cbp-filter-item">EBERT</button> -->
    <button class="btn btn-default btn-lg btn-slidedown" :class="{'active':mostrar==='correo'}" @click="mostrar='correo'">Contenido del Correo</button>
    <button class="btn btn-default btn-lg btn-slidedown" :class="{'active':mostrar==='mensaje'}" @click="mostrar='mensaje'">Mensaje de Texto</button>
    <button class="btn btn-default btn-lg btn-slidedown" :class="{'active':mostrar==='archivos'}" @click="mostrar='archivos'">Archivos</button>
    <br>
    <br>
    <transition enter-active-class="animated zoomIn" mode="out-in" appear>
      <div class="row " v-if="mostrar==='correo'">
        <div class="col-md-12">
            <!-- Start input grid -->
            <div class="panel rounded shadow">
               <!-- /.panel-heading -->
                <div class="panel-body no-padding">

                    <form action="#">
                        <div class="form-body">
                            <div class="form-group">
                                <label class="control-label">Asunto</label>
                                <input class="form-control" type="text" placeholder="Escribe el asunto del correo" v-focus v-model="cuerpoCorreo.asunto">
                            </div>

                            <div class="form-group">
                                <label class="control-label">Cuerpo del Correo</label>
                                <textarea class="form-control" rows="5" placeholder="Puedes usar variables como @RAZONSOCIAL para que el sistema sustituya esa variable por el nombre del tercero" v-model="cuerpoCorreo.cuerpo"></textarea>
                            </div>

                        </div>
                        <!-- /.form-body -->
                        <!-- <div class="form-footer">
                            <div class="pull-right">
                                <button class="btn btn-danger mr-5">Cancel</button>
                                <button class="btn btn-success" type="submit">Submit</button>
                            </div>
                            <div class="clearfix"></div>
                        </div> -->
                        <!-- /.form-footer -->
                    </form>

                </div>
                <!-- /.panel-body -->
            </div>
            <!-- /.panel -->
            <!--/ End input grid -->
        </div>
      </div>
    </transition>
    <transition enter-active-class="animated zoomIn" mode="out-in" appear>
      <div class="row" v-if="mostrar==='mensaje'">
        <div class="col-md-12">
            <!-- Start input grid -->
            <div class="panel rounded shadow">
               <!-- /.panel-heading -->
                <div class="panel-body no-padding">

                    <form action="#">
                        <div class="form-body">
                            <div class="form-group">
                                <label class="control-label">Mensaje de Texto</label>
                                <textarea class="form-control" rows="5" placeholder="Puedes usar variables como @RAZONSOCIAL para que el sistema sustituya esa variable por el nombre del tercero" v-model="sms" v-focus></textarea>
                            </div>

                        </div>
                    </form>

                </div>
                <!-- /.panel-body -->
            </div>
            <!-- /.panel -->
            <!--/ End input grid -->
        </div>
      </div>
    </transition>
    <transition enter-active-class="animated zoomIn" mode="out-in" appear>
      <div class="row" v-if="mostrar==='archivos'">
        <div class="col-md-12">

          <!-- Start input fields - basic form -->
          <div class="panel rounded shadow">
            <!-- /.panel-heading -->
            <div class="panel-sub-heading"  v-show="!valido">
              <div class="callout callout-info">
                <p>Para crear lotes de archivos, debes subirlos en la sección 
                  <router-link tag="a" :to="{name:'cargarArchivos'}">
                    Subir Archivos
                  </router-link>. <code>Si guardas los archivos con el nombre igual al código del tercero, éste se seleccionara automaticamente cuando elijas el lote a enviar.</code></p>
                </div>
              </div>
              <button type="button" class="btn btn-success btn-lg btn-block" v-show="valido" @click="enviarMails" :disabled="cargando">Enviar Mails</button>
              <!-- /.panel-subheading -->
              <div class="panel-body no-padding">

                <form action="#">
                  <div class="form-body">
                    <div class="form-group">
                      <label class="control-label">Cuenta de correo remitente</label>
                      <select class="form-control" v-model="correo" v-focus v-on:change="directorio=(correo==='')?'':directorio">
                        <option value="">Elija una cuenta de correo</option>
                        <option :value="item.email" v-for="(item, index) in correos" :key="index">{{item.email}}</option>
                      </select>
                    </div>
                    <!-- /.form-group -->

                    <div class="form-group" v-show="correo!==''">
                      <label class="control-label">Lotes pendientes</label>
                      <select class="form-control" v-model="directorio" v-focus>
                        <option value="">Elija un lote</option>
                        <option :value="item.directory" v-for="(item, index) in lotes" :key="index">{{item.directory}}.- {{item.archivos}} archivos.</option>
                      </select>
                    </div>
                    <!-- /.form-group -->

                    <div class="form-group" v-if="archivos.length>0">
                      <label class="control-label">Archivos que componen el lote <code>{{directorio}}</code></label>
                      <div class="table-responsive mb-20">
                        <table class="table table-striped">
                          <thead>
                            <tr>
                              <th class="text-center">#</th>
                              <th>Archivo</th>
                              <th>Tercero</th>
                              <!-- <th>Mails</th> -->
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item,index) in archivos" :key="index">
                              <td class="text-center">{{index+1}}</td>
                              <!-- <td>{{item.archivoid}}</td> -->
                              <!-- <td>{{item.mimetype}}</td> -->
                              <td>
                                {{item.name}}
                              </td>
                              <td>
                                <!-- <div class="form-group has-error" :class="{'has-error': terceroElegido(item.archivoid)}"> -->
                                  <div class="form-group">
                                    <select class="form-control tercero" :ref="item.archivoid" :id="item.archivoid" v-on:change="valido=false">
                                      <option value="">Elegir</option>
                                      <option 
                                        :value="ter.terceroid" 
                                        v-for="(ter, i) in terceros" :key="i" 
                                        :selected="item.name.toLowerCase().indexOf(ter.terceroid.toLowerCase())>-1"
                                        v-once
                                        >
                                          {{ter.razonsocial}} ({{ter.terceroid}}) [{{ter.email1}}]
                                        </option>
                                      <!-- <option :value="ter.terceroid" v-for="(ter, i) in terceros" :key="i">{{ter.razonsocial}} ({{ter.terceroid}}) [{{ter.email1}}]</option> -->
                                    </select>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <!-- /.form-group -->

                    </div>
                    <!-- /.form-body -->
                    <div class="form-footer">
                      <div class="col-lg-3 col-md-4 col-sm-6 animated bounceIn" v-if="confirmar_eliminacion" >

                        <div class="bs-example-modal">
                          <div class="modal modal-danger">
                            <div class="modal-dialog">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <!-- <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> -->
                                  <h4 class="modal-title">Eliminar Registro</h4>
                                </div>
                                <div class="modal-body">
                                  <p>¿Confirma que desea realmente descartar el registro?, ésta acción no podrá deshacerse</p>
                                </div>
                                <div class="modal-footer">
                                  <button type="button" class="btn btn-default" data-dismiss="modal"  @click.prevent="confirmar_eliminacion=false" :disabled="cargando">Cancelar</button>
                                  <button type="button" class="btn btn-danger" @click.prevent="descartarLote" :disabled="cargando">Borrar Registro</button>
                                </div>
                              </div>
                            </div>
                            <!-- /.modal-dialog -->
                          </div>
                          <!-- /.modal -->
                        </div>
                        <!-- /.bs-example-modal -->

                      </div>
                      <button class="btn btn-danger mr-5" v-show="directorio!=='' && !confirmar_eliminacion" @click.prevent="confirmar_eliminacion=true">Descartar Lote</button>

                      <div class="pull-right">

                        <!-- <button type="button" class="btn btn-success btn-lg btn-block" v-show="valido">Enviar Mails</button> -->
                        <button class="btn btn-primary" type="button" @click.prevent="validar" v-show="!valido" v-if="archivos.length>0">Validar</button>
                        <button class="btn btn-success" type="submit" @click.prevent="enviarMails" v-show="valido" :disabled="cargando">Enviar Mails</button>
                      </div>
                      <div class="clearfix"></div>
                    </div>
                    <!-- /.form-footer -->
                  </form>

                </div>
                <!-- /.panel-body -->
              </div>
              <!-- /.panel -->
              <!--/ End input fields - basic form-->

        </div>
        <!-- /.col-md-6 -->

      </div>
    </transition>

    
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      cargando: false,
      lotes: [],
      directorio: "",
      archivos: [],
      terceros: [],
      correos: [],
      correo: "",
      valido: false,
      confirmar_eliminacion: false,
      mostrar: "correo",
      cuerpoCorreo: {
        asunto: "Su SUSTITUIR correspondiente a SUSTITUIR",
        cuerpo:
          "Estimado(a) sr(a) @RAZONSOCIAL, adjunto a su correo se encuentra SUSTITUIR, correspondiente a SUSTITUIR."
      },
      sms:
        "Estimado(a) sr(a) @RAZONSOCIAL, adjunto a su correo se encuentra SUSTITUIR, correspondiente a SUSTITUIR."
    };
  },
  mounted() {
    this.cargando = true;
    this.$http
      .get(`archivos/lotes`)
      .then(res => {
        // this.cargando = false;
        this.lotes = res.result.recordset;
        this.$http
          .get(`tercero/`)
          .then(res => {
            // this.cargando = false;
            this.terceros = res.result.recordset;
            // console.log(this.terceros);

            this.$http
              .get(`correo/`)
              .then(res => {
                this.cargando = false;
                this.correos = res.result.recordset;
                // console.log(res.result.recordset);
              })
              .catch(err => {
                this.cargando = false;
                console.log(err);
              });
          })
          .catch(err => {
            this.cargando = false;
            console.log(err);
          });
      })
      .catch(err => {
        this.cargando = false;
        console.log(err);
      });

    this.setCurrent({
      icon: "fa fa-send",
      title: "Emails",
      subtitle: "Envío masivo de emails"
    });
    this.setNav([
      // { text: "Configuración", name: "kcnfPpal" },
      { text: "Emails", name: "" }
    ]);
  },
  watch: {
    directorio() {
      var self = this;
      self.cargando = true;
      self.archivos = [];
      if (self.directorio === "") {
        return;
      }
      self.$http
        .get(`archivos/${self.directorio}/`)
        .then(res => {
          self.cargando = false;
          self.archivos = res.result.recordset;
          //   console.log(self.archivos);
          self.valido = false;
          // alert("");
          self.validar();
        })
        .catch(err => {
          self.cargando = false;
          console.log(err);
        });
    }
  },
  methods: {
    ...mapActions(["setCurrent", "setNav"]),
    terceroElegido(archivoid) {
      //   console.log(archivoid);
      //   var ter = document.getElementById(archivoid);
      //   console.log(ter);
      return true;
    },
    validar() {
      this.valido = true;
      if (this.archivos.length <= 0) {
        return (this.valido = false);
      }
      this.archivos.forEach(archivo => {
        // console.log(archivo.archivoid + ":", $("#" + archivo.archivoid).val());
        if (this.valido) {
          var terceroid = $("#" + archivo.archivoid).val();
          if (!terceroid || terceroid === "") {
            this.valido = false;
          }
        }
        // console.log(archivo.archivoid, terceroid);
      });
      //   console.log(this.valido);
    },
    enviarMails() {
      // console.log("directorio: ", this.directorio);
      // console.log("correo: ", this.correo);
      var self = this;
      var model = {
        directorio: self.directorio,
        cuenta: self.correo,
        destinatarios: [],
        cuerpoCorreo: self.cuerpoCorreo,
        sms: self.sms
      };
      self.archivos.forEach(archivo => {
        delete archivo["data"];
        var terceroid = $("#" + archivo.archivoid).val();
        var tercero = self.terceros.filter(element => {
          return element.terceroid.toLowerCase().match(terceroid.toLowerCase());
        });
        // console.log("Tercero:", tercero);
        model.destinatarios.push({
          archivo: archivo,
          tercero: tercero[0]
        });
      });
      const json = "json=" + JSON.stringify({ model });
      // console.log("Json: ", json);
      // alert()
      // return false;
      self.cargando = true;
      self.$http
        .post(`archivos/enviar_mails`, json)
        .then(res => {
          self.cargando = false;
          // console.log("Response: ", res);
          if (!res.success) {
            return self.$noty.error(
              `Ha ocurrido un problema al enviar los correos, ¡vuelve a intentarlo!`
            );
          } else {
            self.$noty.success(`Archivos enviados`);
            self.cargando = true;
            self.$http
              .get(`archivos/lotes`)
              .then(res => {
                self.cargando = false;
                // alert("");
                self.directorio = "";
                self.mostrar = "correo";
                self.valido = false;
                this.lotes = res.result.recordset;
              })
              .catch(err => {
                console.log(err);
                self.cargando = false;
              });
            // return self.$emit("volver");
          }
        })
        .catch(err => {
          self.cargando = false;
          console.log(err);
        });
    },
    descartarLote() {
      var self = this;
      // console.log(self.directorio);
      if (self.directorio === "") {
        return;
      }
      self.cargando = true;
      self.$http
        .delete(`archivos/${self.directorio}`)
        .then(res => {
          // console.log(res);
          self.cargando = true;
          if (res.success) {
            self.$http
              .get(`archivos/lotes`)
              .then(res => {
                self.lotes = res.result.recordset;
              })
              .catch(err => {
                console.log(err);
              });
            self.directorio = "";
            self.correo = "";
            self.confirmar_eliminacion = false;
            self.$noty.success("Lote descartado");
          } else {
            return self.$noty.error(
              "El registro no ha podido ser descartado, vuelve a intentarlo"
            );
          }
        })
        .catch(err => {
          console.log(err);
          self.cargando = false;
        });
    }
  }
};
</script>

<style>

</style>
