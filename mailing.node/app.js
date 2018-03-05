'use strict';

try {
    // #region Exigencias Varias
    var express = require('express'); // Servidor rápido express https://www.npmjs.com/package/express
    var settings = require('./settings'); // Configuraciones del proyecto
    var jwt = require('./core/jwt'); //Json Web Tokens https://www.npmjs.com/package/jsonwebtoken
    var bodyParser = require('body-parser'); // Convertir a objetos json lo que envían por el Body https://www.npmjs.com/package/body-parser
    var cors = require('cors');  // Compartición de Recursos entre Diferentes Orígenes - Cross-Origin Resource Sharing (CORS) https://www.npmjs.com/package/cors
    var sql = require('mssql'); // Base de datos https://www.npmjs.com/package/mssql
    var fileUpload = require('express-fileupload'); // Subida de archivos https://www.npmjs.com/package/express-fileupload
    // #endregion

    // #region Construir express y publicarlo
    var app = express();
    exports.app = app;
    exports.express = express;
    // #endregion

    // #region Construir Pool de conexiones SQL
    var cp = new sql.ConnectionPool(settings.dbConfig); // Para tener una solo pool de conexiones a SQL Server
    // #endregion

    // #region Convertir a objetos json todo lo que llega por el body a traves de http
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    // #endregion

    app.use(fileUpload());

    // #region Headers Permitidos
    app.use(cors());
    // #endregion

    // #region Middleware
    app.use(function (req, res, next) {
        // console.log(req.originalUrl)
        var supervisar = true;
        req.cp = cp;
        if (req.originalUrl.indexOf('/usuario/ingresar/') !== -1) {
            supervisar = false;
        }
        var token = (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') ? req.headers.authorization.split(' ')[1] : '';
        //supervisar = false;
        if (supervisar) {
            if (token === '') {
                res
                    .status(403)
                    .json({ success: false, logout: true, message: "Token de autenticacion no proporcionado. Debes iniciar sesion." })
                    .end();
            } else {
                jwt.verifyJWTToken(token)
                    .then((decodedToken) => {
                        req.user = decodedToken.data;
                        req.token = jwt.createJWToken({ sessionData: req.user });
                        next();
                    })
                    .catch((err) => {
                        console.log(err);
                        res
                            .status(403)
                            .json({ success: false, logout: true, message: `Vuelve a iniciar sesion. ${err}`, logout: true });
                    });
            }
        }
        else {
            next();
        }
    });
    // #endregion

    // #region Rutas
    require('./routes');
    // #endregion

    // #region Conectar a SQL Server y Montar el Servidor
    cp.connect()
        .then(function () {
            app.listen(settings.webPort, function () {
                console.log(`Servidor NodeJS escuchando el puerto ${settings.webPort}`);
            });
        })
        .catch(function (err) {
            console.error('Error creating connection pool', err);
        });
    // #endregion

} catch (ex) {
    console.log(ex);
}