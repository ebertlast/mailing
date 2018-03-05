var db = require('../core/db');

exports.consultar = function (cp, params, done) {
    try {
        var sqlString = 'EXEC spm_consultar @Tabla = @_Tabla';
        // #region Parametros
        var inputs = [
            { nombre: '_Tabla', tipo: 'varchar', tamanio: 100, valor: params.Tabla }
        ]
        if (params.Esquema) {
            sqlString += ', @Esquema = @_Esquema';
            inputs.push(
                { nombre: '_Esquema', tipo: 'varchar', tamanio: 20, valor: params.Esquema }
            );
        }
        if (params.StringABuscar) {
            sqlString += ', @StringABuscar = @_StringABuscar';
            inputs.push(
                { nombre: '_StringABuscar', tipo: 'varchar', tamanio: 100, valor: params.StringABuscar }
            );
        }
        if (params.NumPagina) {
            sqlString += ', @NumPagina = @_NumPagina';
            inputs.push(
                { nombre: '_NumPagina', tipo: 'int', tamanio: 0, valor: params.NumPagina }
            );
        }
        if (params.TamPagina) {
            sqlString += ', @TamPagina = @_TamPagina';
            inputs.push(
                { nombre: '_TamPagina', tipo: 'int', tamanio: 0, valor: params.TamPagina }
            );
        }
        if (params.OrdenarPor) {
            sqlString += ', @OrdenarPor = @_OrdenarPor';
            inputs.push(
                { nombre: '_OrdenarPor', tipo: 'varchar', tamanio: 100, valor: params.OrdenarPor }
            );
        }
        if (params.Columnas) {
            sqlString += ', @Columnas = @_Columnas';
            inputs.push(
                { nombre: '_Columnas', tipo: 'varchar', tamanio: 8000, valor: params.Columnas }
            );
        }
        if (params.SelCol) {
            sqlString += ', @SelCol = @_SelCol';
            inputs.push(
                { nombre: '_SelCol', tipo: 'varchar', tamanio: 8000, valor: params.SelCol }
            );
        }
        sqlString += ', @CantPaginas = @CantPaginas OUTPUT';
        sqlString += ', @TotalRegistos = @TotalRegistos OUTPUT';
        var outputs = [
            { nombre: 'CantPaginas', tipo: 'INT', tamanio: 0, valor: 0 },
            { nombre: 'TotalRegistos', tipo: 'INT', tamanio: 0, valor: 0 }
        ]
        // #endregion

        // console.log(sqlString)
        // console.log(inputs)
        db.execute(cp, sqlString, inputs, outputs, function (data, err) {
            if (err) {
                return done(null, err);
            }
            done(data);
        });
    } catch (ex) {
        throw (ex);
    }
};
