<template>
  <div>
      <div class="form-group">
        <label class="control-label">Elija el directorio donde están los archivos a ser enviados por correo electrónico</label>
        <!-- <div class="fileinput input-group fileinput-new" data-provides="fileinput">
            <div class="form-control" data-trigger="fileinput">
              <i class="glyphicon glyphicon-file fileinput-exists"></i> 
              <span class="fileinput-filename"></span>
            </div>
            <span class="input-group-addon btn btn-success btn-file">
              <span class="fileinput-new">Seleccionar carpeta</span>
              <span class="fileinput-exists">Cambiar</span>
              <input type="hidden" value="" name="..." webkitdirectory directory multiple>
              <input type="file" name=""></span>
              <a href="#" class="input-group-addon btn btn-danger fileinput-exists" 
              data-dismiss="fileinput">Quitar</a>
        </div> -->
        <form ref="formArchivos">
          <input type="file" webkitdirectory directory multiple ref="carpeta" v-on:change="actualizarListado"/>
        </form>
      </div>
      <div class="row">
        <div class="col-md-12">
          <button type="button" class="btn btn-success btn-lg btn-block" v-if="archivos.length>0" @click="subirArchivos" :disabled="cargando">Subir lote de archivos</button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
            <!-- Start basic table -->
            <div class="table-responsive mb-20">
                <table class="table">
                    <thead>
                        <tr>
                            <th class="text-center">#</th>
                            <th>Nombre del Archivo</th>
                            <th>Tipo</th>
                            <th>Tamaño</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in archivos" :key="index">
                            <td class="text-center">{{index+1}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.type}}</td>
                            <td>{{bytesToSize(item.size)}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- /.table-responsive -->
            <!--/ End basic table -->

        </div>
      </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      archivos: [],
      cargando: false
    };
  },
  mounted() {
    this.setCurrent({
      icon: "fa fa-file-pdf-o",
      title: "Archivos",
      subtitle: "Subir archivos para ser enviados"
    });
    this.setNav([
      // { text: "Configuración", name: "kcnfPpal" },
      { text: "Archivos", name: "" }
    ]);
  },
  methods: {
    ...mapActions(["setCurrent", "setNav"]),
    actualizarListado() {
      // console.log(this.$refs.carpeta);
      const input = this.$refs.carpeta;
      this.archivos = [];
      for (let index = 0; index < input.files.length; index++) {
        const archivo = input.files[index];
        if (archivo.type.indexOf("pdf") !== -1) {
          this.archivos.push(archivo);
        }
      }
      // console.log(this.archivos);
    },
    bytesToSize(bytes) {
      var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      if (bytes == 0) return "0 Byte";
      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
    },
    subirArchivos() {
      var files = this.archivos;
      const formData = new FormData();
      for (var i = 0; i < files.length; i++) {
        formData.append(`files[]`, files[i], files[i].name);
      }
      var self = this;
      self.cargando = true;
      self.$http
        .post(`archivos/subir`, formData)
        .then(res => {
          self.cargando = false;
          console.log(res);
          if (res.success) {
            self.archivos = [];
            self.$noty.success("Archivos cargados");
            self.$refs.formArchivos.reset();
          } else {
            self.$noty.error("Archivos no se cargaron, ¡vuelve a intentarlo!");
          }
        })
        .catch(err => {
          self.cargando = false;
          console.log(err);
        });
    }
  },
  computed: {}
};
</script>

<style>

</style>
