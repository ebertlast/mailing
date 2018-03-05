var db = require('../core/db');
try {
    exports.seleccionar = function (cp, params, done) {
        try {
            var sqlString = "EXEC spm_abcs_plantilla @accion = @_accion ";
            var inputs = [
                { nombre: '_accion', tipo: 'VARCHAR', tamanio: 8, valor: 'S' }
            ]
            //#region inputs
            if (params.plantillaid) {
                inputs.push({ nombre: '_plantillaid', tipo: 'VARCHAR', tamanio: 20, valor: params.plantillaid });
                sqlString += ", @plantillaid = @_plantillaid";
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

    exports.agregar = function (cp, params, done) {
        try {
            var sqlString = "EXEC spm_abcs_plantilla @accion = @_accion ";
            var inputs = [
                { nombre: '_accion', tipo: 'VARCHAR', tamanio: 8, valor: 'A' }
            ]
            //#region inputs
            if (params.plantillaid) {
                inputs.push({ nombre: '_plantillaid', tipo: 'VARCHAR', tamanio: 20, valor: params.plantillaid });
                sqlString += ", @plantillaid = @_plantillaid";
            }
            if (params.descripcion) {
                inputs.push({ nombre: '_descripcion', tipo: 'VARCHAR', tamanio: 100, valor: params.descripcion });
                sqlString += ", @descripcion = @_descripcion";
            }
            if (params.email) {
                inputs.push({ nombre: '_email', tipo: 'BIT', tamanio: 1, valor: params.email });
                sqlString += ", @email = @_email";
            }
            if (params.asunto) {
                inputs.push({ nombre: '_asunto', tipo: 'VARBINARY', tamanio: 1000, valor: params.asunto });
                sqlString += ", @asunto = @_asunto";
            }
            if (params.cuerpohtml) {
                inputs.push({ nombre: '_cuerpohtml', tipo: 'VARCHAR', tamanio: 8000, valor: params.cuerpohtml });
                sqlString += ", @cuerpohtml = @_cuerpohtml";
            }
            if (params.cuerpotexto) {
                inputs.push({ nombre: '_cuerpotexto', tipo: 'VARCHAR', tamanio: 8000, valor: params.cuerpotexto });
                sqlString += ", @cuerpotexto = @_cuerpotexto";
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

    exports.cambiar = function (cp, params, done) {
        try {
            var sqlString = "EXEC spm_abcs_plantilla @accion = @_accion ";
            var inputs = [
                { nombre: '_accion', tipo: 'VARCHAR', tamanio: 8, valor: 'C' }
            ]
            //#region inputs
            if (params.plantillaid) {
                inputs.push({ nombre: '_plantillaid', tipo: 'VARCHAR', tamanio: 20, valor: params.plantillaid });
                sqlString += ", @plantillaid = @_plantillaid";
            }
            if (params.descripcion) {
                inputs.push({ nombre: '_descripcion', tipo: 'VARCHAR', tamanio: 100, valor: params.descripcion });
                sqlString += ", @descripcion = @_descripcion";
            }
            if (params.email) {
                inputs.push({ nombre: '_email', tipo: 'BIT', tamanio: 1, valor: params.email });
                sqlString += ", @email = @_email";
            }
            if (params.asunto) {
                inputs.push({ nombre: '_asunto', tipo: 'VARBINARY', tamanio: 1000, valor: params.asunto });
                sqlString += ", @asunto = @_asunto";
            }
            if (params.cuerpohtml) {
                inputs.push({ nombre: '_cuerpohtml', tipo: 'VARCHAR', tamanio: 8000, valor: params.cuerpohtml });
                sqlString += ", @cuerpohtml = @_cuerpohtml";
            }
            if (params.cuerpotexto) {
                inputs.push({ nombre: '_cuerpotexto', tipo: 'VARCHAR', tamanio: 8000, valor: params.cuerpotexto });
                sqlString += ", @cuerpotexto = @_cuerpotexto";
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

    exports.borrar = function (cp, params, done) {
        try {
            var sqlString = "EXEC spm_abcs_plantilla @accion = @_accion ";
            var inputs = [
                { nombre: '_accion', tipo: 'VARCHAR', tamanio: 8, valor: 'B' }
            ]
            //#region inputs
            if (params.plantillaid) {
                inputs.push({ nombre: '_plantillaid', tipo: 'VARCHAR', tamanio: 20, valor: params.plantillaid });
                sqlString += ", @plantillaid = @_plantillaid";
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