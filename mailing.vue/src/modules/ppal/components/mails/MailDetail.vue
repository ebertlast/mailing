<template>
    <div class="row">
        <div class="col-md-6">

            <!-- Start input fields - basic form -->
            <div class="panel rounded shadow">
                <div class="panel-body no-padding" style="display: block;">

                    <form action="#">
                        <div class="form-body">
                            <div>
                                <label class="control-label">Nombre del Remitente:</label>
                                <code>
                                    {{registro.nombre}}
                                </code>
                            </div>
                            <div>
                                <label class="control-label">Dirección de Correo Electrónico:</label>
                                <code>
                                    {{registro.email}}
                                </code>
                            </div>
                            <div>
                                <label class="control-label">Clave:</label>
                                <code>
                                    {{registro.clave}}
                                </code>
                            </div>
                            <div>
                                <label class="control-label">Servicio:</label>
                                <code>
                                    {{registro.servicio}}
                                </code>
                            </div>
                            <div>
                                <label class="control-label">Servidor:</label>
                                <code>
                                    {{registro.servidor}}
                                </code>
                            </div>
                            <div>
                                <label class="control-label">Conexión con SSL (Segura):</label>
                                <code>
                                    {{registro.conexion_segura}}
                                </code>
                            </div>
                            <div>
                                <label class="control-label">Cuenta Activa:</label>
                                <code>
                                    {{registro.activa}}
                                </code>
                            </div>
                            <div>
                                <label class="control-label">Fecha de Registro:</label>
                                <code>
                                    {{registro.fecha_registro}}
                                </code>
                            </div>

                        </div>
                        <!-- /.form-body -->
                        <div class="form-footer">
                            <div class="pull-right">
                                <button type="button" class="btn btn-default btn-stroke" @click="$emit('volver')">
                                    <i class="fa fa-undo"></i>
                                    Regresar
                                </button>
                                <button type="button" class="btn btn-primary btn-stroke" @click="$emit('editar')">
                                    <i class="fa fa-edit"></i>
                                    Editar
                                </button>
                                <button type="button" class="btn btn-danger btn-stroke" @click="$emit('borrar')">
                                    <i class="fa fa-trash"></i>
                                    Borrar
                                </button>
                                <!-- <button class="btn btn-success" type="submit">Submit</button> -->
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
</template>

<script>
export default {
  props: ["registro"],
  mounted() {
    // console.log(this.registro);
  }
};
</script>

<style>

</style>
