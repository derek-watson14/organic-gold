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

  const h1Style = "margin: 10px 0 5px 0; font-size: 1.5em;";
  const h2Style = "margin: 0 0 15px 0; font-size: 0.9em; font-weight: 200;"
  const infoContainerStyle = "margin-bottom: 15px;";
  const keyStyle = "margin: 0; font-size: 1.2em;";
  const valueStyle = "margin: 0; font-weight: 300;";
  const messageHeaderStyle = "margin: 0 0 5px 0; font-size: 1em;";
  const messageStyle = "margin: 0; font-size: 1em;";

  transporter.sendMail({
    from: data.user,
    to: "organicgoldmusic@gmail.com",
    subject: `CONTACT FORM: ${data.subject || "**No subject**"}`,
    html: `
      <h1 style=${h1Style}>New contact form submission!</h1>
      <h2 style=${h2Style}>The following information was submitted on ${formattedDate} at ${formattedTime}.</h2>
      <div style=${infoContainerStyle}>
        <h3 style=${keyStyle}>Subject line: <span style=${valueStyle}>${data.subject || "**No subject**"}</span></h3>
        <h3 style=${keyStyle}>Name: <span style=${valueStyle}>${fullName || "**No Name Specified**"}</span></h3>
        <h3 style=${keyStyle}>Email: <span style=${valueStyle}>${data.email}</span></h3>
        <h3 style=${keyStyle}>Phone number: <span style=${valueStyle}>${data.mobile || "**No Phone Number**"}</span></h3>  
      </div>
      <h3 style=${messageHeaderStyle}>Message:</h3>
      <p style=${messageStyle}>${data.message}<p>
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