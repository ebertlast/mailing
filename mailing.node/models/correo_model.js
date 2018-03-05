var db = require('../core/db');
try {
    exports.seleccionar = function (cp, params, done) {
        try {
            var sqlString = "EXEC spm_abcs_correo @ACCION = @_ACCION ";
            var inputs = [
                { nombre: '_ACCION', tipo: 'VARCHAR', tamanio: 8, valor: 'S' }
            ]
            //#region inputs
            if (params.email) {
                inputs.push({ nombre: '_email', tipo: 'VARCHAR', tamanio: 100, valor: params.email });
                sqlString += ", @email = @_email";
            }
            //#endregion
            // console.log(params)
            // console.log(sqlString)

            db.execute(cp, sqlString, inputs, undefined, function (data, err) {
                if (err) return done(null, err);
                return done(data);
            });

        } catch (ex) {
            throw (ex);
        }
    };

    exports.agregar = function (cp, params, done) {
        try {
            var sqlString = "EXEC spm_abcs_correo @ACCION = @_ACCION ";
            var inputs = [
                { nombre: '_ACCION', tipo: 'VARCHAR', tamanio: 8, valor: 'A' }
            ]
            //#region inputs
            if (params.nombre) {
                inputs.push({ nombre: '_nombre', tipo: 'VARCHAR', tamanio: 100, valor: params.nombre });
                sqlString += ", @nombre = @_nombre";
            }
            if (params.email) {
                inputs.push({ nombre: '_email', tipo: 'VARCHAR', tamanio: 100, valor: params.email });
                sqlString += ", @email = @_email";
            }
            if (params.clave) {
                inputs.push({ nombre: '_clave', tipo: 'VARCHAR', tamanio: 100, valor: params.clave });
                sqlString += ", @clave = @_clave";
            }
            if (params.servicio) {
                inputs.push({ nombre: '_servicio', tipo: 'VARCHAR', tamanio: 20, valor: params.servicio });
                sqlString += ", @servicio = @_servicio";
            }
            if (params.servidor) {
                inputs.push({ nombre: '_servidor', tipo: 'VARCHAR', tamanio: 100, valor: params.servidor });
                sqlString += ", @servidor = @_servidor";
            }
            if (params.conexion_segura) {
                inputs.push({ nombre: '_conexion_segura', tipo: 'BIT', tamanio: 1, valor: params.conexion_segura });
                sqlString += ", @conexion_segura = @_conexion_segura";
            }
            if (params.puerto) {
                inputs.push({ nombre: '_puerto', tipo: 'SMALLINT', tamanio: 2, valor: params.puerto });
                sqlString += ", @puerto = @_puerto";
            }
            if (params.metodo_transporte) {
                inputs.push({ nombre: '_metodo_transporte', tipo: 'VARCHAR', tamanio: 10, valor: params.metodo_transporte });
                sqlString += ", @metodo_transporte = @_metodo_transporte";
            }
            if (params.activa) {
                inputs.push({ nombre: '_activa', tipo: 'BIT', tamanio: 1, valor: params.activa });
                sqlString += ", @activa = @_activa";
            }
            // if (params.fecha_registro) {
            //     inputs.push({ nombre: '_fecha_registro', tipo: 'DATETIME', tamanio: 8, valor: params.fecha_registro });
            //     sqlString += ", @fecha_registro = @_fecha_registro";
            // }
            //#endregion

            db.execute(cp, sqlString, inputs, undefined, function (data, err) {
                if (err) return done(null, err);
                return done(data);
            });

        } catch (ex) {
            throw (ex);
        }
    };

    exports.cambiar = function (cp, params, done) {
        try {
            var sqlString = "EXEC spm_abcs_correo @ACCION = @_ACCION ";
            var inputs = [
                { nombre: '_ACCION', tipo: 'VARCHAR', tamanio: 8, valor: 'C' }
            ]
            //#region inputs
            if (params.nombre) {
                inputs.push({ nombre: '_nombre', tipo: 'VARCHAR', tamanio: 100, valor: params.nombre });
                sqlString += ", @nombre = @_nombre";
            }
            if (params.email) {
                inputs.push({ nombre: '_email', tipo: 'VARCHAR', tamanio: 100, valor: params.email });
                sqlString += ", @email = @_email";
            }
            if (params.clave) {
                inputs.push({ nombre: '_clave', tipo: 'VARCHAR', tamanio: 100, valor: params.clave });
                sqlString += ", @clave = @_clave";
            }
            if (params.servicio) {
                inputs.push({ nombre: '_servicio', tipo: 'VARCHAR', tamanio: 20, valor: params.servicio });
                sqlString += ", @servicio = @_servicio";
            }
            if (params.servidor) {
                inputs.push({ nombre: '_servidor', tipo: 'VARCHAR', tamanio: 100, valor: params.servidor });
                sqlString += ", @servidor = @_servidor";
            }
            if (params.conexion_segura) {
                inputs.push({ nombre: '_conexion_segura', tipo: 'BIT', tamanio: 1, valor: params.conexion_segura });
                sqlString += ", @conexion_segura = @_conexion_segura";
            }
            if (params.puerto) {
                inputs.push({ nombre: '_puerto', tipo: 'SMALLINT', tamanio: 2, valor: params.puerto });
                sqlString += ", @puerto = @_puerto";
            }
            if (params.metodo_transporte) {
                inputs.push({ nombre: '_metodo_transporte', tipo: 'VARCHAR', tamanio: 10, valor: params.metodo_transporte });
                sqlString += ", @metodo_transporte = @_metodo_transporte";
            }
            if (params.activa) {
                inputs.push({ nombre: '_activa', tipo: 'BIT', tamanio: 1, valor: params.activa });
                sqlString += ", @activa = @_activa";
            }
            // if (params.fecha_registro) {
            //     inputs.push({ nombre: '_fecha_registro', tipo: 'DATETIME', tamanio: 8, valor: params.fecha_registro });
            //     sqlString += ", @fecha_registro = @_fecha_registro";
            // }
            //#endregion
            console.log(inputs);
            console.log(sqlString)
            db.execute(cp, sqlString, inputs, undefined, function (data, err) {
                if (err) return done(null, err);
                return done(data);
            });

        } catch (ex) {
            throw (ex);
        }
    };

    exports.borrar = function (cp, params, done) {
        try {
            var sqlString = "EXEC spm_abcs_correo @ACCION = @_ACCION ";
            var inputs = [
                { nombre: '_ACCION', tipo: 'VARCHAR', tamanio: 8, valor: 'B' }
            ]
            //#region inputs
            if (params.email) {
                inputs.push({ nombre: '_email', tipo: 'VARCHAR', tamanio: 100, valor: params.email });
                sqlString += ", @email = @_email";
            }
            //#endregion

            db.execute(cp, sqlString, inputs, undefined, function (data, err) {
                if (err) return done(null, err);
                return done(data);
            });

        } catch (ex) {
            throw (ex);
        }
    };
} catch (ex) {
    throw ex;
}