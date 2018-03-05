<template>
    <div class="row">
        <div class="col-md-6">

            <!-- Start input fields - basic form -->
            <div class="panel rounded shadow">
                <div class="panel-body no-padding" style="display: block;">

                    <form action="#">
                        <div class="form-body">
                            <div>
                                <label class="control-label">Identificador del Tercero:</label>
                                <code>
                                    {{registro.terceroid}}
                                </code>
                            </div>
                            <div>
                                <label class="control-label">Razón Social del Destinatario:</label>
                                <code>
                                    {{registro.razonsocial}}
                                </code>
                            </div>
                            <div>
                                <label class="control-label">Email #1:</label>
                                <code>
                                    {{registro.email1}}
                                </code>
                            </div>
                            <div>
                                <label class="control-label">Email #2:</label>
                                <code>
                                    {{registro.email2}}
                                </code>
                            </div>
                            <div>
                                <label class="control-label">Email #3:</label>
                                <code>
                                    {{registro.email3}}
                                </code>
                            </div>
                            <div>
                                <label class="control-label">Email #4:</label>
                                <code>
                                    {{registro.email4}}
                                </code>
                            </div>
                            <div>
                                <label class="control-label">Teléfono Móvil #1:</label>
                                <code>
                                    {{registro.movil1}}
                                </code>
                            </div>
                            <div>
                                <label class="control-label">Teléfono Móvil #2:</label>
                                <code>
                                    {{registro.movil2}}
                                </code>
                            </div>
                            <div>
                                <label class="control-label">Teléfono Móvil #3:</label>
                                <code>
                                    {{registro.movil3}}
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
