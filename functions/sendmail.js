const nodemailer = require('nodemailer');

exports.handler = function (event, context, callback) {
  const data = JSON.parse(event.body);
  const fullName = `${data.first} ${data.last}`;

  const formatMobile = (number) => {
    const numStr = number.toString();
    const area = numStr.slice(0, 3);
    const firstThree = numStr.slice(3, 6);
    const lastFour = numStr.slice(6, 10);
    return `(${area}) ${firstThree}-${lastFour}`;
  };

  const submissionTimestamp = new Date();

  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/Los_Angeles',
  };
  const formattedDate = submissionTimestamp.toLocaleDateString(
    'en-US',
    dateOptions,
  );

  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'America/Los_Angeles',
  };
  const formattedTime = submissionTimestamp.toLocaleTimeString(
    'en-US',
    timeOptions,
  );

  const transporter = nodemailer.createTransport({
    host: data.host,
    port: data.port,
    auth: {
      user: data.user,
      pass: data.password,
    },
    tls: {
      secureProtocol: 'TLSv1_method',
    },
  });

  transporter.sendMail(
    {
      from: data.user,
      to: 'organicgoldmusic@gmail.com',
      subject: `WEBSITE: New Contact Form Submission!`,
      html: `
      <h1 style="margin: 10px 0 5px 0; font-size: 1.5em;">New contact form submission!</h1>
      <p style="margin: 0 0 5px 0; font-size: 1.05em;">The following information was submitted on ${formattedDate} at ${formattedTime}.</p>
      <p style="margin: 0 0 15px 0; font-size: 1em; font-style: italic;">Do not reply to this email directly, but to the email address below.</p>
      <div style="margin-bottom: 15px;">
        <h3 style="margin: 0; font-size: 1.1em;">Subject line: <span style="margin: 0; font-weight: 300;">${
          data.subject || '**No subject**'
        }</span></h3>
        <h3 style="margin: 0; font-size: 1.1em;">Name: <span style="margin: 0; font-weight: 300;">${
          fullName || '**No name provided**'
        }</span></h3>
        <h3 style="margin: 0; font-size: 1.1em;">Email: <span style="margin: 0; font-weight: 300;">${
          data.email
        }</span></h3>
        <h3 style="margin: 0; font-size: 1.1em;">
          Phone number: <span style="margin: 0; font-weight: 300;">${
            formatMobile(data.mobile) || '**No phone number**'
          }</span>
        </h3>  
      </div>
      <h3 style="margin: 0 0 5px 0; font-size: 1.2em;">Message:</h3>
      <h3 style="margin: 0; font-size: 1.1em; font-weight: 300;">${data.message}<h3>
    `,
    },
    function (error, info) {
      if (error) {
        callback(error);
      } else {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            result: 'success',
          }),
        });
      }
    },
  );
};
