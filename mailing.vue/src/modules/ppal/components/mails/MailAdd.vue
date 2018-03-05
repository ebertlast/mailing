<template>
  <div class="row">
      <div class="col-md-6">

        <!-- Start input fields - basic form -->
        <div class="panel rounded shadow">
            <div class="panel-body no-padding">

                <form action="#">
                    <div class="form-body">
                        
                        <div class="form-group" :class="{'has-error': errors.has('nombre')}">
                            <label class="control-label">Nombre que aparecerá como remitente</label>
                            <input  
                                placeholder="Ejemplo: Ivón Mendoza..."
                                class="form-control" 
                                type="text" 
                                title="Nombre del Remitente" 
                                name="nombre" 
                                v-model="registro.nombre" 
                                ref="nombre"
                                v-validate 
                                data-vv-rules="required" 
                                data-vv-as="Nombre del Remitente"
                                v-focus 
                                v-on:keypress.enter="guardar"
                            >
                            <span v-show="errors.has('nombre')" class="text-danger">{{ errors.first('nombre') }}</span>
                        </div>
                        <!-- /.form-group -->

                        <div class="form-group" :class="{'has-error': errors.has('email')}">
                            <label class="control-label">Dirección de Correo Electrónico</label>
                            <input  
                                placeholder="Ejemplo: nombre@correo.com"
                                class="form-control" 
                                type="text" 
                                title="Dirección de Correo Electrónico" 
                                name="email" 
                                v-model="registro.email" 
                                ref="email"
                                v-validate 
                                data-vv-rules="required|email" 
                                data-vv-as="Correo"
                                v-on:keypress.enter="guardar"
                            >
                            <span v-show="errors.has('email')" class="text-danger">{{ errors.first('email') }}</span>
                        </div>
                        <!-- /.form-group -->

                        <div class="form-group" :class="{'has-error': errors.has('clave')}">
                            <label class="control-label">Clave Secreta</label>
                            <input  
                                placeholder="Contraseña para acceder al correo"
                                class="form-control" 
                                type="text" 
                                title="Clave Secreta" 
                                name="clave" 
                                v-model="registro.clave" 
                                ref="clave"
                                v-validate 
                                data-vv-rules="required" 
                                data-vv-as="Clave Secreta"
                                v-on:keypress.enter="guardar"
                            >
                            <span v-show="errors.has('clave')" class="text-danger">{{ errors.first('clave') }}</span>
                        </div>
                        <!-- /.form-group -->

                        <div class="form-group" :class="{'has-error': errors.has('servicio')}">
                            <label class="control-label">Servicio</label>
                            <input  
                                placeholder="Ejemplo: Gmail"
                                class="form-control" 
                                type="text" 
                                title="Servicio" 
                                name="servicio" 
                                v-model="registro.servicio" 
                                ref="servicio"
                                v-validate 
                                data-vv-rules="required" 
                                data-vv-as="Servicio"
                                v-on:keypress.enter="guardar"
                            >
                            <span v-show="errors.has('servicio')" class="text-danger">{{ errors.first('servicio') }}</span>
                        </div>
                        <!-- /.form-group -->

                        <div class="form-group" :class="{'has-error': errors.has('servidor')}">
                            <label class="control-label">Servidor</label>
                            <input  
                                placeholder="Ejemplo: smtp.gmail.com"
                                class="form-control" 
                                type="text" 
                                title="Servidor" 
                                name="servidor" 
                                v-model="registro.servidor" 
                                ref="servidor"
                                v-validate 
                                data-vv-rules="required" 
                                data-vv-as="Servidor"
                                v-on:keypress.enter="guardar"
                            >
                            <span v-show="errors.has('servidor')" class="text-danger">{{ errors.first('servidor') }}</span>
                        </div>
                        <!-- /.form-group -->

                        <div class="form-group" :class="{'has-error': errors.has('puerto')}">
                            <label class="control-label">Puerto Saliente</label>
                            <input  
                                placeholder="Ejemplo: 465"
                                class="form-control" 
                                type="text" 
                                title="puerto" 
                                name="puerto" 
                                v-model="registro.puerto" 
                                ref="puerto"
                                v-validate 
                                data-vv-rules="required" 
                                data-vv-as="Puerto"
                                v-on:keypress.enter="guardar"
                            >
                            <span v-show="errors.has('puerto')" class="text-danger">{{ errors.first('puerto') }}</span>
                        </div>
                        <!-- /.form-group -->

                        <div class="form-group" :class="{'has-error': errors.has('metodo_transporte')}">
                            <label class="control-label">Método de Transporte</label>
                            <input  
                                placeholder="Ejemplo: SMTP"
                                class="form-control" 
                                type="text" 
                                title="Método de Transporte" 
                                name="metodo_transporte" 
                                v-model="registro.metodo_transporte" 
                                ref="metodo_transporte"
                                v-validate 
                                data-vv-rules="required" 
                                data-vv-as="Método de Transporte"
                                v-on:keypress.enter="guardar"
                            >
                            <span v-show="errors.has('metodo_transporte')" class="text-danger">{{ errors.first('metodo_transporte') }}</span>
                        </div>
                        <!-- /.form-group -->

                        <div class="form-group">
                            <div class="ckbox ckbox-theme">
                                <input id="activa" type="checkbox" v-model="registro.activa">
                                <label for="activa">Cuenta de Correo Activa</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="ckbox ckbox-theme">
                                <input id="conexion_segura" type="checkbox" v-model="registro.conexion_segura">
                                <label for="conexion_segura">Usa SSL para la conexión</label>
                            </div>
                        </div>

                    </div>
                    <!-- /.form-body -->
                    <div class="form-footer">
                        <div class="pull-right">
                             <button type="button" class="btn btn-default btn-stroke" @click="$emit('volver')" :disabled="cargando">
                                <i class="fa fa-undo"></i>
                                Regresar
                            </button>
                            <button type="button" class="btn btn-success btn-stroke" @click="guardar()" :disabled="cargando">
                                <i class="fa fa-save"></i>
                                Guardar
                            </button>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      cargando: false,
      registro: {
        activa: true,
        conexion_segura: true
      }
    };
  },
  created() {},
  methods: {
    guardar() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.cargando = true;
          this.$http
            .get(`correo/${this.registro.email}`)
            .then(res => {
              this.cargando = false;
              if (res.result.recordset.length > 0) {
                this.$noty.error(
                  `Ya existe un registro con la dirección ${
                    this.registro.email
                  } en la base de datos`
                );
                return this.$refs.correo.focus();
              } else {
                const json = "json=" + JSON.stringify({ model: this.registro });
                // console.log(json);
                this.cargando = true;
                this.$http
                  .put(`correo`, json)
                  .then(res => {
                    this.cargando = false;
                    if (!res.success) {
                      return this.$noty.error(
                        `No se ha podido guardar el registro en la base de datos, ¡vuelve a intentarlo!`
                      );
                    } else {
                      this.$noty.success(
                        `Registro guardado en la base de datos`
                      );
                      return this.$emit("agregado");
                    }
                  })
                  .catch(err => {
                    this.cargando = false;
                    console.log(err);
                  });
              }
            })
            .catch(err => {
              this.cargando = false;
              console.log(err);
            });
        }
        return;
      });
    }
  },
  computed: {}
};
</script>

<style>

</style>
