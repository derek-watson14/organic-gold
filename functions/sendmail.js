const nodemailer = require('nodemailer');

exports.handler = function(event, context, callback) {
     
  const data = JSON.parse(event.body)
  const fullName = `${data.first} ${data.last}`;

  const transporter = nodemailer.createTransport({
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
    to: "organicgoldmusic@gmail.com",
    subject: `Contact form submission: ${data.subject || "**No subject**"}`,
    html: `
      <h2>Subject: ${data.subject || "**No subject**"}</h2>
      <h3>Name: ${fullName || "**No name specified**"}</h3>
      <h3>Email: ${data.email}</h3>
      <h3>Phone number: ${data.mobile || "**No phone number**"}</h3>
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