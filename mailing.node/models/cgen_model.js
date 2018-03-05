var db = require('../core/db');
try {
    exports.tabla = function (cp, params, done) {
        try {
            var sqlString = "select ESQUEMA = (SELECT NAME FROM SYS.schemas WHERE schema_id = (select schema_id from sys.tables where name='" + params.TABLA + "')),SYS.COLUMNS.NAME AS COLUMNA, SYS.TYPES.NAME AS TIPO, SYS.COLUMNS.MAX_LENGTH AS TAMANIO, SYS.COLUMNS.PRECISION, columns.SCALE AS ESCALA, " +
                "LLAVE = CASE WHEN SYS.COLUMNS.NAME IN " +
                "(SELECT column_name as PRIMARYKEYCOLUMN " +
                "FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS AS TC " +
                "INNER JOIN " +
                "INFORMATION_SCHEMA.KEY_COLUMN_USAGE AS KU " +
                "ON TC.CONSTRAINT_TYPE = 'PRIMARY KEY' AND " +
                "TC.CONSTRAINT_NAME = KU.CONSTRAINT_NAME AND " +
                "KU.table_name = '" + params.TABLA + "') THEN 1 ELSE 0 END " +
                "from sys.columns " +
                "LEFT JOIN  sys.types  ON columns.system_type_id = types.system_type_id " +
                "where object_id= (select object_id from sys.tables where name='" + params.TABLA + "')";
            //console.log(sqlString)
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