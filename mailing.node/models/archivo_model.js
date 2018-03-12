var db = require('../core/db');
try {
    exports.seleccionar = function (cp, params, done) {
        try {
            var sqlString = "EXEC spm_abcs_archivo @accion = @_accion ";
            var inputs = [
                { nombre: '_accion', tipo: 'VARCHAR', tamanio: 8, valor: 'S' }
            ]
            //#region inputs
            if (params.archivoid) {
                inputs.push({ nombre: '_archivoid', tipo: 'VARCHAR', tamanio: 20, valor: params.archivoid });
                sqlString += ", @archivoid = @_archivoid";
            }
            if (params.directory) {
                inputs.push({ nombre: '_directory', tipo: 'VARCHAR', tamanio: 20, valor: params.directory });
                sqlString += ", @directory = @_directory";
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
            var sqlString = "EXEC spm_abcs_archivo @accion = @_accion ";
            var inputs = [
                { nombre: '_accion', tipo: 'VARCHAR', tamanio: 8, valor: 'A' }
            ]
            //#region inputs
            if (params.archivoid) {
                inputs.push({ nombre: '_archivoid', tipo: 'VARCHAR', tamanio: 20, valor: params.archivoid });
                sqlString += ", @archivoid = @_archivoid";
            }
            if (params.name) {
                inputs.push({ nombre: '_name', tipo: 'VARCHAR', tamanio: 500, valor: params.name });
                sqlString += ", @name = @_name";
            }
            if (params.data) {
                inputs.push({ nombre: '_data', tipo: 'VARBINARY', tamanio: 8000, valor: params.data });
                sqlString += ", @data = @_data";
            }
            if (params.encoding) {
                inputs.push({ nombre: '_encoding', tipo: 'VARCHAR', tamanio: 10, valor: params.encoding });
                sqlString += ", @encoding = @_encoding";
            }
            if (params.mimetype) {
                inputs.push({ nombre: '_mimetype', tipo: 'VARCHAR', tamanio: 100, valor: params.mimetype });
                sqlString += ", @mimetype = @_mimetype";
            }
            if (params.terceroid) {
                inputs.push({ nombre: '_terceroid', tipo: 'VARCHAR', tamanio: 20, valor: params.terceroid });
                sqlString += ", @terceroid = @_terceroid";
            }
            if (params.directory) {
                inputs.push({ nombre: '_directory', tipo: 'VARCHAR', tamanio: 1000, valor: params.directory });
                sqlString += ", @directory = @_directory";
            }
            if (params.usuarioid) {
                inputs.push({ nombre: '_usuarioid', tipo: 'VARCHAR', tamanio: 100, valor: params.usuarioid });
                sqlString += ", @usuarioid = @_usuarioid";
            }
            if (params.enviado) {
                inputs.push({ nombre: '_enviado', tipo: 'bit', tamanio: 1, valor: params.enviado });
                sqlString += ", @enviado = @_enviado";
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
            var sqlString = "EXEC spm_abcs_archivo @accion = @_accion ";
            var inputs = [
                { nombre: '_accion', tipo: 'VARCHAR', tamanio: 8, valor: 'C' }
            ]
            //#region inputs
            if (params.archivoid) {
                inputs.push({ nombre: '_archivoid', tipo: 'VARCHAR', tamanio: 20, valor: params.archivoid });
                sqlString += ", @archivoid = @_archivoid";
            }
            if (params.name) {
                inputs.push({ nombre: '_name', tipo: 'VARCHAR', tamanio: 500, valor: params.name });
                sqlString += ", @name = @_name";
            }
            if (params.data) {
                inputs.push({ nombre: '_data', tipo: 'VARBINARY', tamanio: 8000, valor: params.data });
                sqlString += ", @data = @_data";
            }
            if (params.encoding) {
                inputs.push({ nombre: '_encoding', tipo: 'VARCHAR', tamanio: 10, valor: params.encoding });
                sqlString += ", @encoding = @_encoding";
            }
            if (params.mimetype) {
                inputs.push({ nombre: '_mimetype', tipo: 'VARCHAR', tamanio: 100, valor: params.mimetype });
                sqlString += ", @mimetype = @_mimetype";
            }
            if (params.terceroid) {
                inputs.push({ nombre: '_terceroid', tipo: 'VARCHAR', tamanio: 20, valor: params.terceroid });
                sqlString += ", @terceroid = @_terceroid";
            }
            if (params.directory) {
                inputs.push({ nombre: '_directory', tipo: 'VARCHAR', tamanio: 1000, valor: params.directory });
                sqlString += ", @directory = @_directory";
            }
            if (params.usuarioid) {
                inputs.push({ nombre: '_usuarioid', tipo: 'VARCHAR', tamanio: 100, valor: params.usuarioid });
                sqlString += ", @usuarioid = @_usuarioid";
            }
            if (params.enviado) {
                inputs.push({ nombre: '_enviado', tipo: 'bit', tamanio: 1, valor: params.enviado });
                sqlString += ", @enviado = @_enviado";
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
            var sqlString = "EXEC spm_abcs_archivo @accion = @_accion ";
            var inputs = [
                { nombre: '_accion', tipo: 'VARCHAR', tamanio: 8, valor: 'B' }
            ]
            //#region inputs
            if (params.archivoid) {
                inputs.push({ nombre: '_archivoid', tipo: 'VARCHAR', tamanio: 20, valor: params.archivoid });
                sqlString += ", @archivoid = @_archivoid";
            }
            if (params.directory) {
                inputs.push({ nombre: '_directory', tipo: 'VARCHAR', tamanio: 1000, valor: params.directory });
                sqlString += ", @directory = @_directory";
            }
            //#endregion
            console.log(sqlString)
            console.log(inputs)
            db.execute(cp, sqlString, inputs, undefined, function (data, err) {
                if (err) return done(null, err);
                return done(data);
            });

        } catch (ex) {
            throw (ex);
        }
    };

    exports.agregarMuchos = function (cp, archivos, done) {
        try {
            // return done("Fino");
            var sqlString = "";
            var inputs = undefined
            var count = 0;
            archivos.forEach(function (archivo, index, array) {
                //#region inputs
                sqlString = "EXEC spm_abcs_archivo @accion = @_accion ";
                inputs = [
                    { nombre: '_accion', tipo: 'VARCHAR', tamanio: 8, valor: 'A' }
                ]
                if (archivo.archivoid) {
                    inputs.push({ nombre: '_archivoid', tipo: 'VARCHAR', tamanio: 20, valor: archivo.archivoid });
                    sqlString += ", @archivoid = @_archivoid";
                }
                if (archivo.name) {
                    inputs.push({ nombre: '_name', tipo: 'VARCHAR', tamanio: 500, valor: archivo.name });
                    sqlString += ", @name = @_name";
                }
                if (archivo.data) {
                    inputs.push({ nombre: '_data', tipo: 'VARBINARY', tamanio: 8000, valor: archivo.data });
                    sqlString += ", @data = @_data";
                }
                if (archivo.encoding) {
                    inputs.push({ nombre: '_encoding', tipo: 'VARCHAR', tamanio: 10, valor: archivo.encoding });
                    sqlString += ", @encoding = @_encoding";
                }
                if (archivo.mimetype) {
                    inputs.push({ nombre: '_mimetype', tipo: 'VARCHAR', tamanio: 100, valor: archivo.mimetype });
                    sqlString += ", @mimetype = @_mimetype";
                }
                if (archivo.terceroid) {
                    inputs.push({ nombre: '_terceroid', tipo: 'VARCHAR', tamanio: 20, valor: archivo.terceroid });
                    sqlString += ", @terceroid = @_terceroid";
                }
                if (archivo.directory) {
                    inputs.push({ nombre: '_directory', tipo: 'VARCHAR', tamanio: 1000, valor: archivo.directory });
                    sqlString += ", @directory = @_directory";
                }
                if (archivo.usuarioid) {
                    inputs.push({ nombre: '_usuarioid', tipo: 'VARCHAR', tamanio: 100, valor: archivo.usuarioid });
                    sqlString += ", @usuarioid = @_usuarioid";
                }
                //#endregion
                // console.log(sqlString)
                count++;
                // console.log("Model:", count, archivos.length)
                db.execute(cp, sqlString, inputs, undefined, function (data, err) {
                    if (err) return done(null, err);
                    if (count === archivos.length) {
                        count++;
                        return done(data);
                    }
                });
            });


        } catch (ex) {
            throw (ex);
        }
    };

    exports.lotes = function (cp, usuarioid, done) {
        try {
            var sqlString = `select usuarioid,directory, count(*) archivos from archivo where usuarioid='${usuarioid}' and isnull(enviado,0)=0 GROUP by directory, usuarioid`;

            db.query(cp, sqlString, function (data, err) {
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