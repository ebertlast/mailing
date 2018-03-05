<template>
 <div>
     <!-- 0.- Tabla de Registros -->
    <transition enter-active-class="animated fadeIn" mode="out-in" appear >
      <data-table tabla="tercero" :selcol="columnas" @viewDetail="fila=$event;vista=1" v-show="vista===0" @agregar="vista=3" ref="datatable"></data-table>
    </transition>

   <!-- 1.- Detalles del Registro -->
    <transition enter-active-class="animated fadeIn" mode="out-in" appear>
      <fila-detail  v-if="vista===1" :registro="registro" @volver="vista=0" @editar="vista=2" @borrar="vista=4"></fila-detail>
    </transition>
    
    <!-- 2.- Edición del Registro -->
    <transition enter-active-class="animated fadeIn" mode="out-in" appear>
      <fila-edit  v-if="vista===2" :registro="registro" @volver="vista=1"></fila-edit>
    </transition>

    <!-- 3.- Nuevo Registro -->
    <transition enter-active-class="animated fadeIn" mode="out-in" appear>
      <fila-add  v-if="vista===3" @volver="vista=0" @agregado="refrescar" ></fila-add>
    </transition>

    <!-- 4.- Eliminar Registro -->
    <transition enter-active-class="animated fadeIn" mode="out-in" appear>
      <fila-delete v-if="vista===4" :registro="registro" @volver="vista=1" @eliminado="refrescar" :ruta="rutaEliminar"></fila-delete>
    </transition>

 </div>
</template>

<script>
import { mapActions } from "vuex";
import { default as components } from "../../../../common/components";
import Add from "./Add";
import Detail from "./Detail";
import Edit from "./Edit";
export default {
  data() {
    return {
      cargando: false,
      correos: [],
      columnas: "",
      fila: {},
      vista: 0,
      registro: {}
    };
  },
  mounted() {
    this.vista = 0;
    this.setCurrent({
      icon: "fa fa-gears",
      title: "Terceros",
      subtitle: "Terceros destinatarios de correos"
    });
    this.setNav([
      { text: "Emails", name: "mails" },
      { text: "Configurar terceros", name: "" }
    ]);
  },
  computed: {
    rutaEliminar() {
      return `tercero/${this.registro.terceroid}`;
    }
  },
  methods: {
    ...mapActions(["setCurrent", "setNav"]),
    refrescar() {
      this.vista = 0;
      this.$refs.datatable.search = "";
      this.$refs.datatable.refresh();
    }
  },
  components: {
    DataTable: components.Datatable,
    FilaAdd: Add,
    FilaDetail: Detail,
    FilaEdit: Edit,
    FilaDelete: components.Delete
  },
  watch: {
    fila() {
      this.cargando = true;
      // console.log(this.fila);
      this.$http
        .get(`tercero/${this.fila.terceroid}`)
        .then(res => {
          this.cargando = false;
          this.registro = res.result.recordset[0];
          // console.log("Registro: ", this.registro);
          // this.vista = 1;
        })
        .catch(err => {
          this.cargando = false;
          console.log(err);
        });
    },
    vista() {
      var self = this;
      switch (this.vista) {
        case 1:
          this.setCurrent({
            icon: "fa fa-list-alt",
            title: "Terceros",
            subtitle: `Datos del registro ${this.fila.razonsocial}`
          });
          break;
        case 2:
          this.setCurrent({
            icon: "fa fa-edit",
            title: "Terceros",
            subtitle: `Editando el registro de ${this.fila.razonsocial}`
          });
          break;
        case 3:
          this.setCurrent({
            icon: "fa fa-pencil-square-o",
            title: "Terceros",
            subtitle: `Nuevo registro`
          });
          break;
        case 4:
          this.setCurrent({
            icon: "fa fa-trash",
            title: "Terceros",
            subtitle: `Eliminando el registro de ${this.fila.razonsocial}`
          });
          break;
        default:
          this.setCurrent({
            icon: "fa fa-gears",
            title: "Terceros",
            subtitle: "Configurar cuentas de correo electrónico"
          });
      }
    }
  }
};
</script>

<style>

</style>
