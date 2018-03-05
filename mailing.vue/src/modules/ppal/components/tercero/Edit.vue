<template>
  <div class="row">
      <div class="col-md-6">

        <!-- Start input fields - basic form -->
        <div class="panel rounded shadow">
            <div class="panel-body no-padding">

                <form action="#">
                    <div class="form-body">
                        
                        <div class="form-group" :class="{'has-error': errors.has('terceroid')}">
                            <label class="control-label">Identificador del Tercero</label>
                            <input  
                                placeholder="Ejemplo: V123456789..."
                                class="form-control" 
                                type="text" 
                                title="Identificador del Tercero" 
                                name="terceroid" 
                                v-model="registro.terceroid" 
                                ref="terceroid"
                                v-validate 
                                data-vv-rules="required" 
                                data-vv-as="Identificador del Tercero"
                                disabled
                                v-on:keypress.enter="guardar"
                            >
                            <span v-show="errors.has('terceroid')" class="text-danger">{{ errors.first('terceroid') }}</span>
                        </div>
                        <!-- /.form-group -->

                        <div class="form-group" :class="{'has-error': errors.has('razonsocial')}">
                            <label class="control-label">Razón Social del Destinatario</label>
                            <input  
                                placeholder="Ejemplo: Pablo Escobar..."
                                class="form-control" 
                                type="text" 
                                title="Razón Social del Destinatario" 
                                name="razonsocial" 
                                v-model="registro.razonsocial" 
                                ref="razonsocial"
                                v-validate 
                                data-vv-rules="required" 
                                data-vv-as="Razón Social del Destinatario"
                                v-focus 
                                v-on:keypress.enter="guardar"
                            >
                            <span v-show="errors.has('razonsocial')" class="text-danger">{{ errors.first('razonsocial') }}</span>
                        </div>
                        <!-- /.form-group -->

                        <div class="form-group" :class="{'has-error': errors.has('email1')}">
                            <label class="control-label">Dirección de Correo Electrónico #1</label>
                            <input  
                                placeholder="Ejemplo: nombre@correo.com"
                                class="form-control" 
                                type="text" 
                                title="Dirección de Correo Electrónico #1" 
                                name="email1" 
                                v-model="registro.email1" 
                                ref="email1"
                                v-validate 
                                data-vv-rules="required|email" 
                                data-vv-as="Dirección de Correo Electrónico #1"
                                v-on:keypress.enter="guardar"
                            >
                            <span v-show="errors.has('email1')" class="text-danger">{{ errors.first('email1') }}</span>
                        </div>
                        <!-- /.form-group -->

                        <div class="form-group" :class="{'has-error': errors.has('email2')}">
                            <label class="control-label">Dirección de Correo Electrónico #2</label>
                            <input  
                                placeholder="Ejemplo: nombre@correo.com"
                                class="form-control" 
                                type="text" 
                                title="Dirección de Correo Electrónico #2" 
                                name="email2" 
                                v-model="registro.email2" 
                                ref="email2"
                                v-validate 
                                data-vv-rules="email" 
                                data-vv-as="Dirección de Correo Electrónico #2"
                                v-on:keypress.enter="guardar"
                            >
                            <span v-show="errors.has('email2')" class="text-danger">{{ errors.first('email2') }}</span>
                        </div>
                        <!-- /.form-group -->

                        <div class="form-group" :class="{'has-error': errors.has('email3')}">
                            <label class="control-label">Dirección de Correo Electrónico #3</label>
                            <input  
                                placeholder="Ejemplo: nombre@correo.com"
                                class="form-control" 
                                type="text" 
                                title="Dirección de Correo Electrónico #3" 
                                name="email3" 
                                v-model="registro.email3" 
                                ref="email3"
                                v-validate 
                                data-vv-rules="email" 
                                data-vv-as="Dirección de Correo Electrónico #3"
                                v-on:keypress.enter="guardar"
                            >
                            <span v-show="errors.has('email3')" class="text-danger">{{ errors.first('email3') }}</span>
                        </div>
                        <!-- /.form-group -->

                        <div class="form-group" :class="{'has-error': errors.has('email4')}">
                            <label class="control-label">Dirección de Correo Electrónico #4</label>
                            <input  
                                placeholder="Ejemplo: nombre@correo.com"
                                class="form-control" 
                                type="text" 
                                title="Dirección de Correo Electrónico #4" 
                                name="email4" 
                                v-model="registro.email4" 
                                ref="email4"
                                v-validate 
                                data-vv-rules="email" 
                                data-vv-as="Dirección de Correo Electrónico #4"
                                v-on:keypress.enter="guardar"
                            >
                            <span v-show="errors.has('email4')" class="text-danger">{{ errors.first('email4') }}</span>
                        </div>
                        <!-- /.form-group -->

                        <div class="form-group">
                            <label class="control-label">Teléfono Móvil #1</label>
                            <input  
                                placeholder="Ejemplo: +584121234567"
                                class="form-control" 
                                type="number" 
                                title="Teléfono Movil #1" 
                                name="movil1" 
                                v-model="registro.movil1" 
                                ref="movil1"
                                v-on:keypress.enter="guardar"
                            >
                        </div>
                        <!-- /.form-group -->

                        <div class="form-group">
                            <label class="control-label">Teléfono Móvil #2</label>
                            <input  
                                placeholder="Ejemplo: +584121234567"
                                class="form-control" 
                                type="number" 
                                title="Teléfono Movil #2" 
                                name="movil2" 
                                v-model="registro.movil2" 
                                ref="movil2"
                                v-on:keypress.enter="guardar"
                            >
                        </div>
                        <!-- /.form-group -->

                        <div class="form-group">
                            <label class="control-label">Teléfono Móvil #3</label>
                            <input  
                                placeholder="Ejemplo: +584121234567"
                                class="form-control" 
                                type="number" 
                                title="Teléfono Movil #3" 
                                name="movil3" 
                                v-model="registro.movil3" 
                                ref="movil3"
                                v-on:keypress.enter="guardar"
                            >
                        </div>
                        <!-- /.form-group -->

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
  props: ["registro"],
  data() {
    return {
      cargando: false
    };
  },
  mounted() {
    // console.log("Registro a Editar: ", this.registro);
  },
  methods: {
    guardar() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.cargando = true;
          const json = "json=" + JSON.stringify({ model: this.registro });
          //   console.log(json);
          this.cargando = true;
          this.$http
            .post(`tercero`, json)
            .then(res => {
              this.cargando = false;
              // console.log("Response: ", res);
              if (!res.success) {
                return this.$noty.error(
                  `No se han podido guardar los cambios en la base de datos, ¡vuelve a intentarlo!`
                );
              } else {
                this.$noty.success(`Cambios guardados en la base de datos`);
                return this.$emit("volver");
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
  }
};
</script>

<style>

</style>
