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
        var params = { email: model.cuenta };
        // console.log(model);
        // return res.status('500').send(JSON.stringify({ success: false, error: "Pruebas de Desarrollo" })).end();
        correo_model.seleccionar(req.cp, params, function (data, err) {
            if (err) {
                return res.status('500').send(JSON.stringify({ success: false, error: err.message })).end();
            } else {
                // console.log(data);
                var mailer = data.recordset[0];
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


                // console.log(mailerConfig)
                // var i = 0;
                var terceros = model.destinatarios;
                var errorEnEnvio = undefined;
                for (var i = terceros.length - 1; i >= 0; i--) {
                    if (!errorEnEnvio) {
                        // #region Construir el correo
                        var tercero = terceros[i]['tercero'];
                        var archivo = terceros[i]['archivo'];

                        // console.log(`Tercero #${i}:`, tercero);
                        // console.log(`Archivo #${i}:`,  archivo);
                        var razon_social = tercero.razonsocial.toLowerCase().replace(/(^|\s)[a-z]/g, function (a) { return a.toUpperCase(); });
                        var to = `"${razon_social}" <${tercero.email1}>`;
                        if (tercero.email2 && tercero.email2 !== '') {
                            to += `, "${razon_social}" <${tercero.email2}>`;
                        }
                        if (tercero.email3 && tercero.email3 !== '') {
                            to += `, "${razon_social}" <${tercero.email3}>`;
                        }
                        if (tercero.email4 && tercero.email4 !== '') {
                            to += `, "${razon_social}" <${tercero.email4}>`;
                        }
                        // console.log(to);
                        var mailOptions = {
                            from: mailerConfig.from,
                            to: to,
                            // subject: `Su Recibo de Condominio de Centro Médico Maracay`,
                            // html: `Estimado <b>${razon_social}</b>, adjunto a su correo esta su recibo de condonminio de Centro Médico Maracay`,
                            // text: `Estimado ${razon_social}, adjunto a su correo esta su recibo de condonminio de Centro Médico Maracay`,
                            subject: model.cuerpoCorreo.asunto.replace('@RAZONSOCIAL', razon_social),
                            html: model.cuerpoCorreo.cuerpo.replace('@RAZONSOCIAL', razon_social),
                            text: model.cuerpoCorreo.cuerpo.replace('@RAZONSOCIAL', razon_social),
                            attachments: [
                                {
                                    path: `${settings.urlDirArchivos}${req.user.usuarioid}\\${archivo.directory}\\${archivo.name}`,
                                    filename: archivo.name,
                                }
                            ]
                        };
                        // console.log(mailOptions);
                        // #endregion

                        // #region Envío del Correo
                        mailer = require('../core/mailer.js');
                        mailer.enviarCorreo(mailerConfig, mailOptions, function (data, err) {
                            if (err) {
                                console.log(err)
                                errorEnEnvio = err;
                                return res.status('500').send(JSON.stringify({ success: false, error: err })).end();
                            } else {

                                // #region Envio de Mensajes de Texto
                                var numero = tercero.movil1;
                                // var sms = `Buen día estimado(a) sr(a) ${razon_social}, le notificamos que hemos enviado su recibo de condominio de CMM a su correo.`;
                                var sms = model.sms.replace('@RAZONSOCIAL', razon_social);
                                if (sms !== '') {
                                    var Client = require('node-rest-client').Client;
                                    var client = new Client();
                                    client.get(`https://gentle-reaches-57765.herokuapp.com/sms/o.irjuqx6PMiG9wNB98dq8eNslUDBHyYDX/ujCMTIEos68/ujCMTIEos68sjAiVsKnSTs/${numero}/${sms}`, function (data, response) {
                                        // console.log(data);
                                        // console.log(response);
                                    });
                                }
                                // #endregion
                                // console.log(i)
                                // return res.status('200').send(JSON.stringify({ success: true, token: req.token, result: true })).end();

                                var _model = {
                                    archivoid: archivo.archivoid,
                                    terceroid: tercero.terceroid,
                                    enviado: 1
                                };
                                m.cambiar(req.cp, _model, function (data, err) {
                                    if (err) {
                                        console.log(err)
                                        errorEnEnvio = err;
                                        return res.status('500').send(JSON.stringify({ success: false, error: err })).end();
                                    }
                                    if (i <= 0) {
                                        // console.log("Complete")
                                        return res.status('200').send(JSON.stringify({ success: true, token: req.token, result: true })).end();
                                    }
                                })




                            }
                        });
                        // #endregion
                    }
                }
                // return res.status('200').send(JSON.stringify({ success: true, token: req.token, result: true })).end();
            }

        })
    });

    app.use("/archivos/", router);

} catch (ex) {
    throw ex;
}