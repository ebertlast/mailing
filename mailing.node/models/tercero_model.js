var db = require('../core/db');
try {
    exports.seleccionar = function (cp, params, done) {
        try {
            var sqlString = "EXEC spm_abcs_tercero @accion = @_accion ";
            var inputs = [
                { nombre: '_accion', tipo: 'VARCHAR', tamanio: 8, valor: 'S' }
            ]
            //#region inputs
            if (params.terceroid) {
                inputs.push({ nombre: '_terceroid', tipo: 'VARCHAR', tamanio: 20, valor: params.terceroid });
                sqlString += ", @terceroid = @_terceroid";
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
            var sqlString = "EXEC spm_abcs_tercero @accion = @_accion ";
            var inputs = [
                { nombre: '_accion', tipo: 'VARCHAR', tamanio: 8, valor: 'A' }
            ]
            //#region inputs
            if (params.terceroid) {
                inputs.push({ nombre: '_terceroid', tipo: 'VARCHAR', tamanio: 20, valor: params.terceroid });
                sqlString += ", @terceroid = @_terceroid";
            }
            if (params.razonsocial) {
                inputs.push({ nombre: '_razonsocial', tipo: 'VARCHAR', tamanio: 500, valor: params.razonsocial });
                sqlString += ", @razonsocial = @_razonsocial";
            }
            if (params.email1) {
                inputs.push({ nombre: '_email1', tipo: 'VARCHAR', tamanio: 100, valor: params.email1 });
                sqlString += ", @email1 = @_email1";
            }
            if (params.email2) {
                inputs.push({ nombre: '_email2', tipo: 'VARCHAR', tamanio: 100, valor: params.email2 });
                sqlString += ", @email2 = @_email2";
            }
            if (params.email3) {
                inputs.push({ nombre: '_email3', tipo: 'VARCHAR', tamanio: 100, valor: params.email3 });
                sqlString += ", @email3 = @_email3";
            }
            if (params.email4) {
                inputs.push({ nombre: '_email4', tipo: 'VARCHAR', tamanio: 100, valor: params.email4 });
                sqlString += ", @email4 = @_email4";
            }
            if (params.movil1) {
                inputs.push({ nombre: '_movil1', tipo: 'VARCHAR', tamanio: 13, valor: params.movil1 });
                sqlString += ", @movil1 = @_movil1";
            }
            if (params.movil2) {
                inputs.push({ nombre: '_movil2', tipo: 'VARCHAR', tamanio: 13, valor: params.movil2 });
                sqlString += ", @movil2 = @_movil2";
            }
            if (params.movil3) {
                inputs.push({ nombre: '_movil3', tipo: 'VARCHAR', tamanio: 13, valor: params.movil3 });
                sqlString += ", @movil3 = @_movil3";
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
            var sqlString = "EXEC spm_abcs_tercero @accion = @_accion ";
            var inputs = [
                { nombre: '_accion', tipo: 'VARCHAR', tamanio: 8, valor: 'C' }
            ]
            //#region inputs
            if (params.terceroid) {
                inputs.push({ nombre: '_terceroid', tipo: 'VARCHAR', tamanio: 20, valor: params.terceroid });
                sqlString += ", @terceroid = @_terceroid";
            }
            if (params.razonsocial) {
                inputs.push({ nombre: '_razonsocial', tipo: 'VARCHAR', tamanio: 500, valor: params.razonsocial });
                sqlString += ", @razonsocial = @_razonsocial";
            }
            if (params.email1) {
                inputs.push({ nombre: '_email1', tipo: 'VARCHAR', tamanio: 100, valor: params.email1 });
                sqlString += ", @email1 = @_email1";
            }
            if (params.email2) {
                inputs.push({ nombre: '_email2', tipo: 'VARCHAR', tamanio: 100, valor: params.email2 });
                sqlString += ", @email2 = @_email2";
            }
            if (params.email3) {
                inputs.push({ nombre: '_email3', tipo: 'VARCHAR', tamanio: 100, valor: params.email3 });
                sqlString += ", @email3 = @_email3";
            }
            if (params.email4) {
                inputs.push({ nombre: '_email4', tipo: 'VARCHAR', tamanio: 100, valor: params.email4 });
                sqlString += ", @email4 = @_email4";
            }
            if (params.movil1) {
                inputs.push({ nombre: '_movil1', tipo: 'VARCHAR', tamanio: 13, valor: params.movil1 });
                sqlString += ", @movil1 = @_movil1";
            }
            if (params.movil2) {
                inputs.push({ nombre: '_movil2', tipo: 'VARCHAR', tamanio: 13, valor: params.movil2 });
                sqlString += ", @movil2 = @_movil2";
            }
            if (params.movil3) {
                inputs.push({ nombre: '_movil3', tipo: 'VARCHAR', tamanio: 13, valor: params.movil3 });
                sqlString += ", @movil3 = @_movil3";
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
            var sqlString = "EXEC spm_abcs_tercero @accion = @_accion ";
            var inputs = [
                { nombre: '_accion', tipo: 'VARCHAR', tamanio: 8, valor: 'B' }
            ]
            //#region inputs
            if (params.terceroid) {
                inputs.push({ nombre: '_terceroid', tipo: 'VARCHAR', tamanio: 20, valor: params.terceroid });
                sqlString += ", @terceroid = @_terceroid";
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