exports.dbConfig = {
    server: 'DESKTOP-IL7UVNG',
    database: 'Mailing',
    user: 'sa',
    password: '123456',
    port: 1433
};

exports.mailerConfig = {
    service: 'Gmail',
    from: '"Contraloría CMM" <contraloriacmm@gmail.com>',
    host: 'smtp.gmail.com', // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
    auth: {
        user: 'contraloriacmm@gmail.com',
        pass: 'j075121503'
    }
};

exports.webPort = 9000; // process.env.PORT || 9000;
exports.appName = 'ScriptForms';

exports.urlDirArchivos = __dirname + '\\archivos\\subidos\\';

exports.JWT_secret = '5cR1p7F0rM5';
exports.JWT_maxAge = 3600;
exports.JWT_algorithm = 'HS256';