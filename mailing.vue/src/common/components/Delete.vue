<template>
  <div class="col-lg-12 col-md-12 col-sm-12">
        <div class="bs-example-modal">
            <div class="modal modal-danger">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">¿Confirma que realmente desea eliminar el registro en la base de datos?</h4>
                        </div>
                        <div class="modal-body">
                            <p>Ésta acción no podrá deshacerse</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" @click="$emit('volver')">¡No, Regresar!</button>
                            <button type="button" class="btn btn-danger" @click="borrar">Si, borrar</button>
                        </div>
                    </div>
                </div><!-- /.modal-dialog -->
            </div><!-- /.modal -->
        </div><!-- /.bs-example-modal -->

    </div>
</template>

<script>
export default {
  name: "delete",
  props: ["registro", "ruta"],
  data() {
    return {
      cargando: false
    };
  },
  methods: {
    borrar() {
      //   return this.$emit("eliminado");
      this.cargando = true;
      this.$http
        .delete(this.ruta)
        .then(res => {
          this.cargando = false;
          if (res.success) {
            this.$noty.success(`Registro eliminado de la base de datos`);
            return this.$emit("eliminado");
          } else {
            this.$noty.error(
              `Registro no ha podido ser eliminado de la base de datos, ¡Vuelve a Intentarlo!`
            );
          }
        })
        .catch(err => {
          this.cargando = false;
          console.log(err);
        });
    }
  }
};
</script>

<style>

</style>
