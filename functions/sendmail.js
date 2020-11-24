const nodemailer = require('nodemailer');

exports.handler = function(event, context, callback) {
     
  const data = JSON.parse(event.body)
  const fullName = `${data.first} ${data.last}`;

  const submissionTimestamp = new Date();

  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = submissionTimestamp.toLocaleDateString("en-US", dateOptions);

  const timeOptions = { hour: 'numeric', minute: 'numeric' };
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

  const h1Style = "margin: 10px 0 5px 0; font-size: 1.5em;";
  const h2Style = "margin: 0 0 15px 0; font-size: 0.9em; font-weight: 200;"
  const infoContainerStyle = "display: grid; grid-template-columns: 120px 1fr; grid-template-rows: 1fr 1fr 1fr 1fr; margin-bottom: 15px;";
  const h3KeyStyle = "margin: 0; font-size: 1em;";
  const h3ValueStyle = "margin: 0; font-size: 1em; font-weight: 200;";
  const h3MessageStyle = "margin: 0 0 5px 0; font-size: 1em;";

  transporter.sendMail({
    from: data.user,
    to: "organicgoldmusic@gmail.com",
    subject: `Contact form: ${data.subject || "**No subject**"}`,
    html: `
      <h1 style=${h1Style}>New contact form submission!</h1>
      <h2 style=${h2Style}>The following information was submitted on ${formattedDate} at ${formattedTime}.</h2>
      <div style=${infoContainerStyle}>
        <h3 style=${h3KeyStyle}>Subject line: </h3>
        <h3 style=${h3ValueStyle}>${data.subject || "**No subject**"}</h3>
        <h3 style=${h3KeyStyle}>Name: </h3>
        <h3 style=${h3ValueStyle}>${fullName || "**No name specified**"}</h3>
        <h3 style=${h3KeyStyle}>Email: </h3>
        <h3 style=${h3ValueStyle}>${data.email}</h3>
        <h3 style=${h3KeyStyle}>Phone number: </h3>
        <h3 style=${h3ValueStyle}>${data.mobile || "**No phone number**"}</h3>
      </div>
      <h3 style=${h3MessageStyle}>Message:</h3>
      <p style="margin: 0;">${data.message}<p>
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