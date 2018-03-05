var app = require('../app').app;
var router = require('../app').express.Router();
var fs = require('fs');
var settings = require('../settings');
var m = require("../models/archivo_model");
var rimraf = require('rimraf');
var correo_model = require('../models/correo_model');
var tercero_model = require('../models/tercero_model');
try {
    router.post('/subir', function (req, res) {
        if (!req.files) {
            return res.status(400).send(JSON.stringify({
                success: false, error: 'Ningún archivo fue cargado.'
            })).end();
        }
        var archivos = req.files['files[]']; // Archivos enviados para subir
        // console.log(archivos)
        var urlBase = `${settings.urlDirArchivos}${req.user.usuarioid}\\`; // Directorio raíz donde se suben todos los archivos
        if (!fs.existsSync(urlBase)) {
            fs.mkdirSync(urlBase); // Creamos el directorio del usuario
        }
        var directorio = (+new Date).toString(36).slice(-10).toUpperCase();
        fs.mkdirSync(urlBase + directorio); // Creamos el directorio

        var archivosARegistrarEnBD = [];
        var count = 0;
        // console.log(archivos.length)
        if (!archivos.length) {
            var archivo = archivos;
            archivo.mv(`${urlBase}${directorio}\\${archivo.name}`, function (err) {
                if (err) {
                    return res.status('500').send(JSON.stringify({ success: false, error: err })).end();
                }
                // Aquí se pueden ir guardando en la base de datos;
                archivo.usuarioid = req.user.usuarioid;
                archivo.directory = directorio;
                archivosARegistrarEnBD.push(archivo);
                // console.log("Route: ", count, archivos.length)
                m.agregarMuchos(req.cp, archivosARegistrarEnBD, function (data, err) {
                    if (err) {
                        return res.status('500').send(JSON.stringify({ success: false, error: err.message })).end();
                    } else {
                        return res.status('200').send(JSON.stringify({ success: true, token: req.token, result: true })).end();
                    }
                })
            })
        } else {
            archivos.forEach(function (archivo, index, array) {
                archivo.mv(`${urlBase}${directorio}\\${archivo.name}`, function (err) {
                    if (err) {
                        return res.status('500').send(JSON.stringify({ success: false, error: err })).end();
                    }
                    // Aquí se pueden ir guardando en la base de datos;
                    archivo.usuarioid = req.user.usuarioid;
                    archivo.directory = directorio;
                    archivosARegistrarEnBD.push(archivo);
                    count++;
                    // console.log("Route: ", count, archivos.length)
                    if (count === archivos.length) {
                        m.agregarMuchos(req.cp, archivosARegistrarEnBD, function (data, err) {
                            if (err) {
                                return res.status('500').send(JSON.stringify({ success: false, error: err.message })).end();
                            } else {
                                return res.status('200').send(JSON.stringify({ success: true, token: req.token, result: true })).end();
                            }
                        })
                        // return res.status('200').send(JSON.stringify({ success: true, token: req.token, result: true })).end();
                    }
                })
            });
        }

        // return res.status('200').send(JSON.stringify({ success: true, token: req.token, result: true })).end();
    });

    router.get('/lotes', function (req, res) {
        m.lotes(req.cp, req.user.usuarioid, function (data, err) {
            if (err) {
                return res.status('500').send(JSON.stringify({ success: false, error: err.message })).end();
            } else {
                return res.status('200').send(JSON.stringify({ success: true, token: req.token, result: data })).end();
            }
        });
    });

    router.get('/:directory/:archivoid?', function (req, res) {
        m.seleccionar(req.cp, req.params, function (data, err) {
            if (err) {
                return res.status('500').send(JSON.stringify({ success: false, error: err.message })).end();
            } else {
                return res.status('200').send(JSON.stringify({ success: true, token: req.token, result: data })).end();
            }
        });
    });

    router.delete('/:directory/:archivoid?', function (req, res) {
        m.borrar(req.cp, req.params, function (data, err) {
            if (err) {
                return res.status('500').send(JSON.stringify({ success: false, error: err.message })).end();
            } else {
                console.log(`${settings.urlDirArchivos}${req.user.usuarioid}\\${req.params.directory}`);
                rimraf(`${settings.urlDirArchivos}${req.user.usuarioid}\\${req.params.directory}`, function () { 
                    // console.log('done'); 
                    return res.status('200').send(JSON.stringify({ success: true, token: req.token, result: data })).end();
                });
            }
        });
    });

    router.post('/enviar_mails', function (req, res) {
        var model = JSON.parse(req.body.json).model;
        console.log(model)
        // m.cambiar(req.cp, model, function (data, err) {
        //     if (err) {
        //         return res.status('500').send(JSON.stringify({ success: false, error: err.message })).end();
        //     } else {
        //         return res.status('200').send(JSON.stringify({ success: true, token: req.token, result: data })).end();
        //     }
        // });
        var params={correo: model.cuenta};
        correo_model.seleccionar(req.cp, params,function(data,err){
            if (err) {
                return res.status('500').send(JSON.stringify({ success: false, error: err.message })).end();
            } else {
                var mailer=data.recordset[0];
                var mailerConfig = {
                    service: mailer.servicio,
                    from: `"${mailer.nombre}" <${mailer.email}>`,
                    host: mailer.servidor, // hostname
                    secureConnection: mailer.conexion_segura, // use SSL
                    port: mailer.puerto, // port for secure SMTP
                    transportMethod: mailer.metodo_transporte, // default is SMTP. Accepts anything that nodemailer accepts
                    auth: {
                        user: mailer.email,
                        pass: mailer.clave
                    }
                };
                console.log(mailerConfig)
                // var i = 0;
                var terceros=model.destinatarios;
                for (var i = terceros.length - 1; i >= 0; i--) {
                    var tercero=terceros[i]['tercero'];
                    var archivo=terceros[i]['archivo'];

                    // console.log(`Tercero #${i}:`,  tercero);
                    // console.log(`Archivo #${i}:`,  archivo);
                    var to = `"${tercero.razonsocial.toLowerCase().replace(/(^|\s)[a-z]/g, function (a) { return a.toUpperCase(); })}" <${tercero.email1}>`;
                    if(tercero.email2 && tercero.email2!==''){
                        to += `, "${tercero.razonsocial.toLowerCase().replace(/(^|\s)[a-z]/g, function (a) { return a.toUpperCase(); })}" <${tercero.email2}>`;
                    }
                    if(tercero.email3 && tercero.email3!==''){
                        to += `, "${tercero.razonsocial.toLowerCase().replace(/(^|\s)[a-z]/g, function (a) { return a.toUpperCase(); })}" <${tercero.email3}>`;
                    }
                    if(tercero.email4 && tercero.email4!==''){
                        to += `, "${tercero.razonsocial.toLowerCase().replace(/(^|\s)[a-z]/g, function (a) { return a.toUpperCase(); })}" <${tercero.email4}>`;
                    }
                    // console.log(to);
                    var mailOptions = {
                        from: mailerConfig.from,
                        to: to,
                        subject: `Su Recibo de Condominio de Centro Médico Maracay`,
                        html: `Estimado <b>${tercero.razonsocial.toLowerCase().replace(/(^|\s)[a-z]/g, function (a) { return a.toUpperCase(); })}</b>, adjunto a su correo esta su recibo de condonminio de Centro Médico Maracay`,
                        text: `Estimado ${tercero.razonsocial.toLowerCase().replace(/(^|\s)[a-z]/g, function (a) { return a.toUpperCase(); })}, adjunto a su correo esta su recibo de condonminio de Centro Médico Maracay`,
                        // attachments: [{path: `${settings.urlDirArchivos}${req.user.usuarioid}\\${archivo.directory}\\${archivo.name}`}]
                    };
                    console.log(mailOptions);
                    mailer = require('../core/mailer.js');
                    mailer.sendmail(mailOptions, function (data, err) {
                        if (err) {
                            console.log(err)
                            return res.status('500').send(JSON.stringify({ success: false, error: err })).end();
                        } else {
                            // return res.status('200').send(JSON.stringify({ success: true, token: req.token, result: true })).end();
                            if(i===0){
                                return res.status('200').send(JSON.stringify({ success: true, token: req.token, result: true })).end();
                            }
                        }
                    });


                }

                // console.log(mailOptions);

                // return res.status('200').send(JSON.stringify({ success: true, token: req.token, result: true })).end();
            }
            
        })
    });

app.use("/archivos/", router);

} catch (ex) {
    throw ex;
}