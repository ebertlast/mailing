var m = require("../models/usuario_model");
var app = require('../app').app;
var router = require('../app').express.Router();
var jwt = require('../core/jwt');
try {
    router.get('/ingresar/:usuarioid/:clave', function (req, res) {
        m.ingresar(req.cp, req.params, function (data, err) {
            if (err) {
                return res.status('500').send(JSON.stringify({ success: false, error: err.message })).end();
            } else {
                var user = data.recordset[0];
                if (typeof (user) === "undefined") {
                    return res.status('200').send(JSON.stringify({ success: false, data: data, message: 'Credenciales incorrectas' })).end();
                } else {
                    user.clave = req.params.clave;
                    var token = '';
                    if (user) {
                        token = jwt.createJWToken({ sessionData: user });
                    }
                    user.clave = '';
                    user.token = token;
                    return res.status('200').send(JSON.stringify({ success: true, token: token, result: data })).end();
                }
            }
        });
    });

    app.use("/usuario/", router);

} catch (ex) {
    throw ex;
}