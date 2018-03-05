<template>
  <div>
    <div class="row">
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
            <button type="button" class="btn btn-success btn-lg btn-block" v-show="valido" @click="enviarMails">Enviar Mails</button>
            <!-- /.panel-subheading -->
            <div class="panel-body no-padding">

              <form action="#">
                <div class="form-body">
                  <div class="form-group">
                    <label class="control-label">Cuenta de correo remitente</label>
                    <select class="form-control" v-model="correo" v-focus>
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
                                  <select class="form-control" :ref="item.archivoid" :id="item.archivoid" v-on:change="validar">
                                    <option value="">Elegir</option>
                                    <option :value="ter.terceroid" v-for="(ter, i) in terceros" :key="i" :selected="item.name.toLowerCase().indexOf(ter.terceroid.toLowerCase())>-1">{{ter.razonsocial}} ({{ter.terceroid}}) [{{ter.email1}}]</option>
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
                      <button class="btn btn-success" type="submit" @click.prevent="enviarMails" v-show="valido">Enviar Mails</button>
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
          confirmar_eliminacion: false
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
      this.archivos.forEach(archivo => {
        if (this.valido) {
          var terceroid = $("#" + archivo.archivoid).val();
          //   console.log($("#" + archivo.archivoid).val());
          if (terceroid === "") {
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
      var model = {
        directorio: this.directorio,
        cuenta: this.correo,
        destinatarios: []
      };
      this.archivos.forEach(archivo => {
        delete archivo['data'];
        var terceroid = $("#" + archivo.archivoid).val();
        var tercero = this.terceros.filter(element => {
          return element.terceroid.toLowerCase().match(terceroid.toLowerCase());
        });
        console.log("Tercero:",tercero)
        model.destinatarios.push({
          archivo: archivo,
          tercero: tercero[0]
        });
      });
      const json = "json=" + JSON.stringify({ model });
      console.log("Json: ", json);
      this.cargando = true;
      this.$http
      .post(`archivos/enviar_mails`, json)
      .then(res => {
        this.cargando = false;
        console.log("Response: ", res);
        if (!res.success) {
          return this.$noty.error(
                                  `Ha ocurrido un problema al enviar los correos, ¡vuelve a intentarlo!`
                                  );
        } else {
          this.$noty.success(`Archivos enviados`);
            // return this.$emit("volver");
          }
        })
      .catch(err => {
        this.cargando = false;
        console.log(err);
      });
    },
    descartarLote() {
      var self=this;
      console.log(self.directorio);
      if(self.directorio===''){return;}
      self.cargando=true;
      self.$http.delete(`archivos/${self.directorio}`)
      .then(res=>{
        console.log(res)
        self.cargando=true;
        if(res.success){
          self.$http
          .get(`archivos/lotes`)
          .then(res => {
            self.lotes = res.result.recordset;
          }).catch(err=>{
            console.log(err)      
          })
          self.directorio="";
          self.correo="";
          self.confirmar_eliminacion=false;
          self.$noty.success('Lote descartado')

        }else{
          return self.$noty.error('El registro no ha podido ser descartado, vuelve a intentarlo')
        }
      }).catch(err=>{
        console.log(err)
        self.cargando=false;
      });
    }
  }
};
</script>

<style>

</style>
