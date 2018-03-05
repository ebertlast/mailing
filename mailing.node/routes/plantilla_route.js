var m = require("../models/plantilla_model");
var app = require('../app').app;
var router = require('../app').express.Router();
try {
    router.get('/:plantillaid?', function (req, res) {
        m.seleccionar(req.cp, req.params, function (data, err) {
            if (err) {
                return res.status('500').send(JSON.stringify({ success: false, error: err.message })).end();
            } else {
                return res.status('200').send(JSON.stringify({ success: true, token: req.token, result: data })).end();
            }
        });
    });

    router.delete('/:plantillaid', function (req, res) {
        m.borrar(req.cp, req.params, function (data, err) {
            if (err) {
                return res.status('500').send(JSON.stringify({ success: false, error: err.message })).end();
            } else {
                return res.status('200').send(JSON.stringify({ success: true, token: req.token, result: data })).end();
            }
        });
    });

    router.put('', function (req, res) {
        var model = JSON.parse(req.body.json).model;
        m.agregar(req.cp, model, function (data, err) {
            if (err) {
                return res.status('500').send(JSON.stringify({ success: false, error: err.message })).end();
            } else {
                return res.status('200').send(JSON.stringify({ success: true, token: req.token, result: data })).end();
            }
        });
    });

    router.post('', function (req, res) {
        var model = JSON.parse(req.body.json).model;
        m.cambiar(req.cp, model, function (data, err) {
            if (err) {
                return res.status('500').send(JSON.stringify({ success: false, error: err.message })).end();
            } else {
                return res.status('200').send(JSON.stringify({ success: true, token: req.token, result: data })).end();
            }
        });
    });

    app.use("/plantilla/", router);

} catch (ex) {
    throw ex;
}