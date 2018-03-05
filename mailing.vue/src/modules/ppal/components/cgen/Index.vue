<template>
	<div>
		<div id="inputTabla">
			<div class="col-md-12">
				<!-- <code>Tabla:</code><br>  -->
				<!-- <input type="text" name="" value="" v-focus> -->
				<div class="input-group mb-15">
					<span class="input-group-addon bg-success">@</span>
					<input class="form-control no-border-left" type="text" v-model="tabla" placeholder="Ingresa el nombre de una tabla y presiona la tecla Enter" v-focus ref="tabla" v-on:keypress.enter="generar" id="tabla">
					<span class="input-group-btn">
						<button type="button" class="btn btn-default" @click="generar">Generar</button>
					</span>
				</div>
			</div>
		</div>

		<div class="col-md-12">
			<!-- Start default tabs -->
			<div class="panel panel-tab rounded shadow">
				<!-- Start tabs heading -->
				<div class="panel-heading no-padding">
					<ul class="nav nav-tabs">
						<li class="active">
							<a href="#tab1-1" data-toggle="tab" aria-expanded="true">
								<i class="fa fa-database"></i>
								<span>spm_abcs_{{Tabla}}.sql</span>
							</a>
						</li>
						<li class="">
							<a href="#tab1-2" data-toggle="tab" aria-expanded="false">
								<i class="fa fa-file-code-o"></i>
								<span>{{tabla.toLowerCase()}}_model.js</span>
							</a>
						</li>
						<li>
							<a href="#tab1-3" data-toggle="tab">
								<i class="fa fa-file-code-o"></i>
								<span>{{tabla.toLowerCase()}}_route.js</span>
							</a>
						</li>
						<li class="hide">
							<a href="#tab1-4" data-toggle="tab" aria-expanded="false">
								<i class="fa fa-check-circle"></i>
								<span>Confirmation</span>
							</a>
						</li>
					</ul>
				</div><!-- /.panel-heading -->
				<!--/ End tabs heading -->

				<!-- Start tabs content -->
				<div class="panel-body">
					<div class="tab-content">
						<div class="tab-pane fade active in" id="tab1-1">
              <p><code>Nombre del archivo:</code> spm_abcs_{{Tabla}}.sql</p>
							

							<pre class="prettyprint linenums lang-html no-margin prettyprinted" style="">IF EXISTS(SELECT NAME FROM SYS.OBJECTS WHERE NAME = 'spm_abcs_{{Tabla}}' AND TYPE='P')<br>&#9;DROP PROCEDURE spm_abcs_{{Tabla}}<br>GO<br>CREATE PROCEDURE DBO.spm_abcs_{{Tabla}}<br>(<br>&#9;@accion VARCHAR(10) = 'S',<br><div v-for="(item, index) in propiedades" :key="index">&#9;{{parametro(item, index)}}</div>)<br>WITH ENCRYPTION<br>AS<br>BEGIN<br>&#9;IF @accion = 'A'<br>&#9;BEGIN<br>&#9;&#9;INSERT INTO {{Tabla}}(<div v-for="(item, index) in propiedades">&#9;&#9;&#9;{{item.COLUMNA}}{{(index===propiedades.length-1)?"":","}}</div>&#9;&#9;)<br>&#9;&#9;SELECT<br><div v-for="(item, index) in propiedades">&#9;&#9;&#9;@{{item.COLUMNA}}{{(index===propiedades.length-1)?"":","}}</div>&#9;END<br><br>&#9;IF @accion = 'B'<br>&#9;BEGIN<br>&#9;&#9;{{cadenaDelete()}}<br>&#9;END<br><br>&#9;IF @accion = 'C'<br>&#9;BEGIN<br>&#9;&#9;UPDATE {{Tabla}} SET <div v-for="(item, index) in noLlaves">&#9;&#9;&#9;{{item.COLUMNA}} = CASE WHEN @{{item.COLUMNA}} IS NULL THEN {{item.COLUMNA}} ELSE @{{item.COLUMNA}} END{{(index===noLlaves.length-1)?"":","}}</div>&#9;&#9;WHERE <div v-for="(item, index) in llaves">&#9;&#9;&#9;{{item.COLUMNA}} = @{{item.COLUMNA}} {{(index===llaves.length-1)?"":"AND"}}</div>&#9;END<br><br>&#9;IF @accion = 'S'<br>&#9;BEGIN<br>&#9;&#9;SELECT <div v-for="(item, index) in propiedades">&#9;&#9;&#9;{{item.COLUMNA}}{{(index===propiedades.length-1)?"":","}}</div>&#9;&#9;FROM {{Tabla}}<br>&#9;&#9;WHERE 1 = 1<div v-for="(item, index) in llaves">&#9;&#9;AND (@{{item.COLUMNA}} IS NULL OR @{{item.COLUMNA}} = {{item.COLUMNA}})</div>&#9;END<br>END<br>GO
							</pre>

						</div>
						<div class="tab-pane fade" id="tab1-2">
              <p><code>Nombre del archivo:</code> {{tabla}}_model.js</p>
              
							<pre class="prettyprint linenums lang-html no-margin prettyprinted" style="">var db = require('../core/db');<br>try {<br>&#9;exports.seleccionar = function (cp, params, done) {<br>&#9;&#9;try {<br>&#9;&#9;&#9;var sqlString = "EXEC spm_abcs_{{Tabla}} @accion = @_accion ";<br>&#9;&#9;&#9;var inputs = [<br>&#9;&#9;&#9;&#9;{ nombre: '_accion', tipo: 'VARCHAR', tamanio: 8, valor: 'S' }<br>&#9;&#9;&#9;]<br>&#9;&#9;&#9;//#region inputs<div v-for="(item, index) in llaves">&#9;&#9;&#9;if (params.{{item.COLUMNA}}) {<br>&#9;&#9;&#9;&#9;inputs.push({ nombre: '_{{item.COLUMNA}}', tipo: '{{item.TIPO.toUpperCase()}}', tamanio: {{item.TAMANIO}}, valor: params.{{item.COLUMNA}} });<br>&#9;&#9;&#9;&#9;sqlString += ", @{{item.COLUMNA}} = @_{{item.COLUMNA}}";<br>&#9;&#9;&#9;}</div>&#9;&#9;&#9;//#endregion<br><br>&#9;&#9;&#9;db.execute(cp, sqlString, inputs, undefined, function (data, err) {<br>&#9;&#9;&#9;&#9;if (err) return done(null, err);<br>&#9;&#9;&#9;&#9;return done(data);<br>&#9;&#9;&#9;});<br><br>&#9;&#9;} catch (ex) {<br>&#9;&#9;&#9;throw (ex);<br>&#9;&#9;}<br>&#9;};<br><br>&#9;exports.agregar = function (cp, params, done) {<br>&#9;&#9;try {<br>&#9;&#9;&#9;var sqlString = "EXEC spm_abcs_{{Tabla}} @accion = @_accion ";<br>&#9;&#9;&#9;var inputs = [<br>&#9;&#9;&#9;&#9;{ nombre: '_accion', tipo: 'VARCHAR', tamanio: 8, valor: 'A' }<br>&#9;&#9;&#9;]<br>&#9;&#9;&#9;//#region inputs<div v-for="(item, index) in propiedades">&#9;&#9;&#9;if (params.{{item.COLUMNA}}) {<br>&#9;&#9;&#9;&#9;inputs.push({ nombre: '_{{item.COLUMNA}}', tipo: '{{item.TIPO.toUpperCase()}}', tamanio: {{item.TAMANIO}}, valor: params.{{item.COLUMNA}} });<br>&#9;&#9;&#9;&#9;sqlString += ", @{{item.COLUMNA}} = @_{{item.COLUMNA}}";<br>&#9;&#9;&#9;}</div>&#9;&#9;&#9;//#endregion<br><br>&#9;&#9;&#9;db.execute(cp, sqlString, inputs, undefined, function (data, err) {<br>&#9;&#9;&#9;&#9;if (err) return done(null, err);<br>&#9;&#9;&#9;&#9;return done(data);<br>&#9;&#9;&#9;});<br><br>&#9;&#9;} catch (ex) {<br>&#9;&#9;&#9;throw (ex);<br>&#9;&#9;}<br>&#9;};<br><br>&#9;exports.cambiar = function (cp, params, done) {<br>&#9;&#9;try {<br>&#9;&#9;&#9;var sqlString = "EXEC spm_abcs_{{Tabla}} @accion = @_accion ";<br>&#9;&#9;&#9;var inputs = [<br>&#9;&#9;&#9;&#9;{ nombre: '_accion', tipo: 'VARCHAR', tamanio: 8, valor: 'C' }<br>&#9;&#9;&#9;]<br>&#9;&#9;&#9;//#region inputs<div v-for="(item, index) in propiedades">&#9;&#9;&#9;if (params.{{item.COLUMNA}}) {<br>&#9;&#9;&#9;&#9;inputs.push({ nombre: '_{{item.COLUMNA}}', tipo: '{{item.TIPO.toUpperCase()}}', tamanio: {{item.TAMANIO}}, valor: params.{{item.COLUMNA}} });<br>&#9;&#9;&#9;&#9;sqlString += ", @{{item.COLUMNA}} = @_{{item.COLUMNA}}";<br>&#9;&#9;&#9;}</div>&#9;&#9;&#9;//#endregion<br><br>&#9;&#9;&#9;db.execute(cp, sqlString, inputs, undefined, function (data, err) {<br>&#9;&#9;&#9;&#9;if (err) return done(null, err);<br>&#9;&#9;&#9;&#9;return done(data);<br>&#9;&#9;&#9;});<br><br>&#9;&#9;} catch (ex) {<br>&#9;&#9;&#9;throw (ex);<br>&#9;&#9;}<br>&#9;};<br><br>&#9;exports.borrar = function (cp, params, done) {<br>&#9;&#9;try {<br>&#9;&#9;&#9;var sqlString = "EXEC spm_abcs_{{Tabla}} @accion = @_accion ";<br>&#9;&#9;&#9;var inputs = [<br>&#9;&#9;&#9;&#9;{ nombre: '_accion', tipo: 'VARCHAR', tamanio: 8, valor: 'B' }<br>&#9;&#9;&#9;]<br>&#9;&#9;&#9;//#region inputs<div v-for="(item, index) in llaves">&#9;&#9;&#9;if (params.{{item.COLUMNA}}) {<br>&#9;&#9;&#9;&#9;inputs.push({ nombre: '_{{item.COLUMNA}}', tipo: '{{item.TIPO.toUpperCase()}}', tamanio: {{item.TAMANIO}}, valor: params.{{item.COLUMNA}} });<br>&#9;&#9;&#9;&#9;sqlString += ", @{{item.COLUMNA}} = @_{{item.COLUMNA}}";<br>&#9;&#9;&#9;}</div>&#9;&#9;&#9;//#endregion<br><br>&#9;&#9;&#9;db.execute(cp, sqlString, inputs, undefined, function (data, err) {<br>&#9;&#9;&#9;&#9;if (err) return done(null, err);<br>&#9;&#9;&#9;&#9;return done(data);<br>&#9;&#9;&#9;});<br><br>&#9;&#9;} catch (ex) {<br>&#9;&#9;&#9;throw (ex);<br>&#9;&#9;}<br>&#9;};<br>} catch (ex) {<br>&#9;throw ex;<br>}
							</pre>
						</div>
						<div class="tab-pane fade" id="tab1-3">
              <p><code>Nombre del archivo:</code> {{tabla}}_route.js</p>
							<pre class="prettyprint linenums lang-html no-margin prettyprinted" style="">var m = require("../models/{{tabla.toLowerCase()}}_model");<br>var app = require('../app').app;<br>var router = require('../app').express.Router();<br>try {<br>&#9;router.get('{{rutaGet()}}', function (req, res) {<br>&#9;&#9;m.seleccionar(req.cp, req.params, function (data, err) {<br>&#9;&#9;&#9;if (err) {<br>&#9;&#9;&#9;&#9;return res.status('500').send(JSON.stringify({ success: false, error: err.message })).end();<br>&#9;&#9;&#9;} else {<br>&#9;&#9;&#9;&#9;return res.status('200').send(JSON.stringify({ success: true, token: req.token, result: data })).end();<br>&#9;&#9;&#9;}<br>&#9;&#9;});<br>&#9;});<br><br>&#9;router.delete('{{rutaDelete()}}', function (req, res) {<br>&#9;&#9;m.borrar(req.cp, req.params, function (data, err) {<br>&#9;&#9;&#9;if (err) {<br>&#9;&#9;&#9;&#9;return res.status('500').send(JSON.stringify({ success: false, error: err.message })).end();<br>&#9;&#9;&#9;} else {<br>&#9;&#9;&#9;&#9;return res.status('200').send(JSON.stringify({ success: true, token: req.token, result: data })).end();<br>&#9;&#9;&#9;}<br>&#9;&#9;});<br>&#9;});<br><br>&#9;router.put('', function (req, res) {<br>&#9;&#9;var model = JSON.parse(req.body.json).model;<br>&#9;&#9;m.agregar(req.cp, model, function (data, err) {<br>&#9;&#9;&#9;if (err) {<br>&#9;&#9;&#9;&#9;return res.status('500').send(JSON.stringify({ success: false, error: err.message })).end();<br>&#9;&#9;&#9;} else {<br>&#9;&#9;&#9;&#9;return res.status('200').send(JSON.stringify({ success: true, token: req.token, result: data })).end();<br>&#9;&#9;&#9;}<br>&#9;&#9;});<br>&#9;});<br><br>&#9;router.post('', function (req, res) {<br>&#9;&#9;var model = JSON.parse(req.body.json).model;<br>&#9;&#9;m.cambiar(req.cp, model, function (data, err) {<br>&#9;&#9;&#9;if (err) {<br>&#9;&#9;&#9;&#9;return res.status('500').send(JSON.stringify({ success: false, error: err.message })).end();<br>&#9;&#9;&#9;} else {<br>&#9;&#9;&#9;&#9;return res.status('200').send(JSON.stringify({ success: true, token: req.token, result: data })).end();<br>&#9;&#9;&#9;}<br>&#9;&#9;});<br>&#9;});<br><br>&#9;app.use("/{{Tabla}}/", router);<br><br>} catch (ex) {<br>&#9;throw ex;<br>}
							</pre>
						</div>
						<div class="tab-pane fade" id="tab1-4">
							<h4>Confirmation content</h4>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
						</div>
					</div>
				</div><!-- /.panel-body -->
				<!--/ End tabs content -->
			</div><!-- /.panel -->
			<!--/ End default tabs -->
		</div>
	</div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "cgen",

  data() {
    return {
      cargando: false,
      tabla: "",
      propiedades: {}
    };
  },
  methods: {
    ...mapActions(["setCurrent", "setNav", "animarDiv"]),
    generar() {
      if (this.tabla === "") {
        this.animarDiv("inputTabla");
        return this.$refs.tabla.focus();
      }
      this.cargando = true;
      this.$http
        .get(`cgen/${this.tabla}`)
        .then(res => {
          this.cargando = false;
          this.propiedades = res.result.recordset;
          if (this.propiedades.length <= 0) {
            this.animarDiv("inputTabla");
          }
        })
        .catch(err => {
          this.cargando = false;
          console.log(err);
        });
      return this.$refs.tabla.select();
    },
    parametro(fila, index) {
      var linea = `@${fila.COLUMNA} ${fila.TIPO.toUpperCase()}`;
      switch (fila.TIPO.toUpperCase()) {
        case "VARCHAR":
          linea += `(${fila.TAMANIO})`;
          break;
        case "DECIMAL":
          linea += `(${fila.PRECISION}, ${fila.ESCALA})`;
          break;
        default:
          break;
      }
      linea += ` = NULL`;
      if (index !== this.propiedades.length - 1) {
        linea += `,`;
      }

      return linea;
    },
    cadenaDelete() {
      var cadena = `DELETE ${this.tabla} WHERE 1 = 1 `;
      if (this.propiedades.length <= 0 || this.llaves.length <= 0) {
        return "";
      } else {
        this.llaves.forEach(propiedad => {
          // 	console.log(propiedad);
          cadena += `AND ${propiedad.COLUMNA} = @${propiedad.COLUMNA} `;
        });
        // console.log(cadena)
        return cadena;
      }
    },
    rutaGet() {
      var ruta = "";
      this.llaves.forEach(propiedad => {
        ruta += `/:${propiedad.COLUMNA}`;
        if (this.llaves.length === 1) ruta += "?";
      });
      return ruta;
    },
    rutaDelete() {
      var ruta = "";
      this.llaves.forEach(propiedad => {
        ruta += `/:${propiedad.COLUMNA}`;
      });
      return ruta;
    }
  },
  mounted() {
    this.setCurrent({
      icon: "fa fa-code",
      title: "Generador de Códigos",
      subtitle: "Helper generador de código"
    });
    this.setNav([
      { text: "Desarrollo", name: "kdevPpal" },
      { text: "Generador de Códigos", name: "" }
    ]);
  },
  computed: {
    Tabla() {
      return this.tabla.toLowerCase();
    },
    llaves() {
      var llaves = [];
      for (var i = this.propiedades.length - 1; i >= 0; i--) {
        if (this.propiedades[i].LLAVE === 1) {
          llaves.push(this.propiedades[i]);
        }
      }
      return llaves;
    },
    noLlaves() {
      var llaves = [];
      for (var i = this.propiedades.length - 1; i >= 0; i--) {
        if (this.propiedades[i].LLAVE === 0) {
          llaves.push(this.propiedades[i]);
        }
      }
      return llaves;
    }
  }
};
</script>

<!-- <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700" rel="stylesheet"> -->
<style lang="css" scoped>

</style>