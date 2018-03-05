<template>
  <div>
    <div class="row">
      <div class="col-md-12">
          <!-- Start responsive table -->
          <div class="table-responsive mb-20">
            <div class="row">
              <div class="col-xs-6 col-md-4">
                <ul class="pagination">
                  <li tabindex="0" @click="paginaActual=1" :class="{'disabled':(paginacion.paginaActual === 1) || cargando}">
                      <a href="#" ><i class="fa fa-angle-double-left"></i></a>
                  </li>
                  <li tabindex="0" @click="paginaActual=paginacion.paginaActual-1" :class="{'disabled':(paginacion.paginaActual === 1) || cargando}">
                      <a href="#" ><i class="fa fa-chevron-left"></i></a>
                  </li>
                  <li tabindex="0" @click="paginaActual=paginacion.paginaActual-1" v-if="paginacion.paginaActual>1" :class="{'disabled':(paginacion.paginaActual === 1) || cargando}">
                      <a href="#">{{ paginacion.paginaActual-1 }}</a>
                  </li>
                  <li class="paginate_button active" tabindex="0">
                      <a href="#">{{paginacion.paginaActual}}</a>
                  </li>
                  <li class="paginate_button next" tabindex="0" @click="paginaActual=paginacion.paginaActual+1" :class="{'disabled': (paginacion.paginaActual+1 > paginacion.paginas) || cargando}" v-if="!(paginacion.paginaActual+1 > paginacion.paginas)">
                      <a href="#">{{ paginacion.paginaActual+1 }}</a>
                  </li>
                  <li class="paginate_button last" tabindex="0" :class="{'disabled': (paginacion.paginaActual+1 > paginacion.paginas) || cargando}">
                      <a href="#" @click="paginaActual=paginacion.paginaActual+1"><i class="fa fa-chevron-right"></i></a>
                  </li>
                  <li class="paginate_button last" tabindex="0" :class="{'disabled': (paginacion.paginaActual+1 > paginacion.paginas) || cargando}">
                      <a href="#" @click="paginaActual = paginacion.paginas" ><i class="fa fa-angle-double-right"></i></a>
                  </li>
                </ul>
              </div>
              <div class="col-xs-6 col-md-4">
                <select class="form-control mb-15" v-model="cantPorPaginas" :disabled="cargando ">
                  <option value="10" selected>10 FILAS POR PÁGINA</option>
                  <option value="25">25 FILAS POR PÁGINA</option>
                  <option value="50">50 FILAS POR PÁGINA</option>
                  <option value="100">100 FILAS POR PÁGINA</option>
                </select>
              </div>
              <div class="col-xs-6 col-md-4">
                <div class="input-group mb-15">
                  <input class="form-control" placeholder="Escribe algo y pulsa la tecla Enter" type="text" ref="search" v-model="search" v-on:keypress.enter="consultar" v-focus>
                  <span class="input-group-btn">
                    <button type="button" class="btn btn-default" title="Consultar" @click="consultar">
                      <i class="fa fa-check"></i>
                    </button>
                    <button type="button" class="btn btn-default" title="Agregar Registro" @click="$emit('agregar')">
                      <i class="fa fa-plus"></i>
                      </button>
                  </span>
                </div>
              </div>
            </div>
            
            <table class="table">
                <thead>
                    <tr>
                        <th class="text-center"></th>
                        <th v-for="(item, index) in columnas" :key="index">{{item}}</th>
                    </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in filas" :key="index">
                    <td class="text-center">
                      <button class="btn btn-circle btn-facebook btn-stroke"  @click.prevent="details(item)">
                        <i class="fa fa-eye"></i>
                      </button>
                    </td>
                    <td v-for="(value, key, index) in item" :key="index">
                      {{value}}
                    </td>
                  </tr>
                </tbody>
            </table>
            <div class="dataTables_info" id="datatable-sample_info" role="status" aria-live="polite">
              Página {{paginacion.paginaActual|formatNumber}} de {{paginacion.paginas|formatNumber}} - Filas {{((cantPorPaginas>paginacion.registros)?paginacion.registros:cantPorPaginas)|formatNumber}} de {{paginacion.registros|formatNumber}} 
            </div>
          </div>
          <!-- /.table-responsive -->
          <!--/ End responsive table -->

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "datatable",
  props: ["tabla", "selcol"],
  data() {
    return {
      cargando: false,
      filas: [],
      columnas: [],
      search: "",
      cantPorPaginas: 10,
      paginaActual: 1,
      paginacion: {
        paginaActual: 1,
        tamPagina: 10,
        paginas: 0,
        registros: 0
      }
    };
  },
  mounted() {
    // console.log(this.tabla);
    this.refresh();
  },
  methods: {
    details(row) {
      this.$emit("viewDetail", row);
      // this.$emit("go");
    },
    add() {
      this.$emit("add");
    },
    consultar() {
      if (this.paginaActual === 1) {
        this.refresh();
      } else {
        this.paginaActual = 1;
      }
    },
    refresh() {
      if (!this.tabla) {
        return;
      }
      this.$refs.search.select();
      this.cargando = true;
      this.filas = [];
      this.paginacion.registros = 0;
      this.paginacion.paginas = 0;

      const model = {
        Tabla: this.tabla,
        StringABuscar: this.search + "%",
        NumPagina: this.paginacion.paginaActual,
        TamPagina: this.paginacion.tamPagina,
        SelCol: this.selcol
      };
      const json =
        "json=" +
        JSON.stringify({
          model
        });
      console.log(json);
      var self = this;
      this.$http
        .post(`consulta`, json)
        .then(data => {
          console.log("data.result: ", data.result);
          this.cargando = false;
          this.filas = data.result.recordset;
          this.columnas = this.getColumnsName(this.filas);
          this.paginacion.paginas = data.result.output.CantPaginas;
          this.paginacion.registros = data.result.output.TotalRegistos;
          // this.$refs.search.select();
        })
        .catch(function(err) {
          console.log(err);
          self.cargando = false;
        });
    }
  },
  computed: {
    ...mapGetters(["getColumnsName"])
  },
  watch: {
    paginaActual() {
      if (this.paginaActual > this.paginacion.paginas) {
        return (this.paginaActual = this.paginacion.paginas);
      }
      if (this.paginaActual < 1) {
        return (this.paginaActual = 1);
      }

      this.paginacion.paginaActual = this.paginaActual;
      this.refresh();
    },
    cantPorPaginas() {
      this.paginacion.tamPagina = this.cantPorPaginas;
      this.refresh();
    }
  }
};
</script>

<style>

</style>
