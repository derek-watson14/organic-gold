const nodemailer = require('nodemailer');

exports.handler = function(event, context, callback) {
     
  const data = JSON.parse(event.body)
  const fullName = `${data.first} ${data.last}`;

  const submissionTimestamp = new Date();

  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: "America/Los_Angeles" };
  const formattedDate = submissionTimestamp.toLocaleDateString("en-US", dateOptions);

  const timeOptions = { hour: 'numeric', minute: 'numeric', timeZone: "America/Los_Angeles" };
  const formattedTime = submissionTimestamp.toLocaleTimeString("en-US", timeOptions);


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
    subject: `CONTACT FORM: ${data.subject || "**No subject**"}`,
    html: `
      <h1 style="margin: 10px 0 5px 0; font-size: 1.5em;">New contact form submission!</h1>
      <h2 style="margin: 0 0 15px 0; font-size: 0.9em; font-weight: 200;">The following information was submitted on ${formattedDate} at ${formattedTime}.</h2>
      <div style="display: grid !important; grid-template-columns: 120px 1fr; grid-template-rows: 1fr 1fr 1fr 1fr; margin-bottom: 15px;">
        <h3 style="margin: 0; font-size: 1.2em;">Subject line: </h3>
        <h3 style="margin: 0; font-weight: 300;">${data.subject || "**No subject**"}</h3>
        <h3 style="margin: 0; font-size: 1.2em;">Name: </h3>
        <h3 style="margin: 0; font-weight: 300;">${data.subject || "**No subject**"}</h3>
        <h3 style="margin: 0; font-size: 1.2em;">Email: </h3>
        <h3 style="margin: 0; font-weight: 300;">${data.subject || "**No subject**"}</h3>
        <h3 style="margin: 0; font-size: 1.2em;">Phone number: </h3>  
        <h3 style="margin: 0; font-weight: 300;">${data.subject || "**No subject**"}</h3>
      </div>
      <h3 style="margin: 0 0 5px 0; font-size: 1em;">Message:</h3>
      <p style="margin: 0; font-size: 1em;">${data.message}<p>
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