const nodemailer = require('nodemailer');

exports.handler = function(event, context, callback) {
     
  let data = JSON.parse(event.body)
  console.log(data);

  let transporter = nodemailer.createTransport({
    host: data.host,
    port: 587,
    secure: false,
    auth: {
      user: data.user,
      pass: data.password,
    },
    // tls: { 
    //   secure: false,
    //   ignoreTLS: false,
    //   requireTLS: true,
    //   tls: {
    //     minVersion: 'TLSv1',
    //   }
    // },
  });

  transporter.sendMail({
    from: data.user,
    to: "contact@organicgoldmusic.com",
    subject: `Contact form submission: ${data.subject}`,
    html: `
      <h2>Subject: ${data.subject}</h2>
      <h3>Name: ${data.first} ${data.last}</h3>
      <h3>Email: ${data.email}</h3>
      <h3>Phone number: ${data.mobile}</h3>
      <br />
      <br />
      <h3>Message</h3>
      <p>${data.message}<p>
    `,
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