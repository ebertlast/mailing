var app = require('../app').app;
var router = require('../app').express.Router();
var m = require("../models/consulta_model");
try {
    router.post('', function (req, res) {
        // console.log(req.body.json)
        var model = JSON.parse(req.body.json).model;
        m.consultar(req.cp, model, function (data, err) {
            if (err) {
                return res.status('500').send(JSON.stringify({ success: false, error: err })).end();
            } else {
                return res.status('200').send(JSON.stringify({ success: true, token: req.token, result: data })).end();
            }
        });
        // return res.status('200').send(JSON.stringify({ success: true, token: req.token, result: "data" })).end();
    });

    app.use("/consulta/", router);

} catch (ex) {
    throw ex;
}