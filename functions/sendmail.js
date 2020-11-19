const nodemailer = require('nodemailer');

exports.handler = function(event, context, callback) {

    let data = JSON.parse(event.body)
    console.log(data);

    let transporter = nodemailer.createTransport({
      host: data.host,
      port: data.port,
      auth: {
        user: data.user,
        pass: data.password,
      },
      tls: { 
        secureProtocol: "TLSv1_method" 
      },
    });

    transporter.sendMail({
        from: data.user,
        to: "contact@organicgoldmusic.com",
        subject: `Test email`,
        html: `
            <h3>Email from ${data.first} ${data.last} ${data.email}<h3>
            <p>${data.message}<p>
            `
    }, function(error, info) {
        if (error) {
            callback(error);
        } else {
            callback(null, {
            statusCode: 200,
            body: JSON.stringify({
                   'result': 'success'
                })
        });
        }
    });
}