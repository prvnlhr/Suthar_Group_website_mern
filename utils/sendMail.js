const mailgun = require("mailgun-js");
const { SENDER_EMAIL_ADDRESS, MAILGUN_API_KEY, MAILGUN_DOMAIN } = process.env;

const api_key = MAILGUN_API_KEY;
const domain = MAILGUN_DOMAIN;
const sendEmail = (to, url, txt) => {
  const mg = mailgun({ apiKey: api_key, domain: domain });

  const emailData = {
    from: SENDER_EMAIL_ADDRESS,
    to: to,
    subject: `${txt}`,
    html: `
      <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
      <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the suthargroup.com</h2>
      <p>Congratulations! You're almost set to start using eCrypt.
          Just click the button below to validate your email address.
      </p>
      <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
      <p>If the button doesn't work for any reason, you can also click on the link below:</p>
      <div>${url}</div>
      </div>
  `,
  };
  mg.messages().send(emailData, function (error, body) {
    console.log("sending email");
    if (error) {
      console.log(error);
    }
    // console.log(body);
  });
};
module.exports = sendEmail;
