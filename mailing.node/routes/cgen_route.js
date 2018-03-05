var m = require("../models/cgen_model");
var app = require('../app').app;
var router = require('../app').express.Router();
try {
    router.get('/:TABLA', function (req, res) {
        m.tabla(req.cp, req.params, function (data, err) {
            if (err) {
                return res.status('500').send(JSON.stringify({ success: false, error: err.message })).end();
            } else {
                return res.status('200').send(JSON.stringify({ success: true, token: req.token, result: data })).end();
            }
        });
    });

    app.use("/cgen/", router);

} catch (ex) {
    throw ex;
}