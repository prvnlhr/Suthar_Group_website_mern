const mailgun = require("mailgun-js");

const {
  SENDER_EMAIL_ADDRESS_ENQUIRY,
  SENDER_EMAIL_ADDRESS,
  MAILGUN_API_KEY,
  MAILGUN_DOMAIN,
} = process.env;

const api_key = MAILGUN_API_KEY;
const domain = MAILGUN_DOMAIN;

const sendEmail = (name, enquiry, email, company) => {
  const mg = mailgun({ apiKey: api_key, domain: domain });

  const emailData = {
    from: SENDER_EMAIL_ADDRESS_ENQUIRY,
    to: SENDER_EMAIL_ADDRESS,
    subject: `${"Business enquiry"}`,
    html: `
      <!DOCTYPE html>
      <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

      <head>
        <title></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
        <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
        <!--<![endif]-->
        <style>
          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            padding: 0;
          }

          th.column {
            padding: 0
          }

          a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
          }

          #MessageViewBody a {
            color: inherit;
            text-decoration: none;
          }

          p {
            line-height: inherit
          }

          @media (max-width:520px) {
            .row-content {
              width: 100% !important;
            }

            .stack .column {
              width: 100%;
              display: block;
            }
          }
        </style>
      </head>

      <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
        <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
          <tbody>
            <tr>
              <td>
                <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="500">
                          <tbody>
                            <tr>
                              <th class="column" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="heading_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td style="text-align:center;width:100%;">
                                      <h1 style="margin: 0; color: #214a95; direction: ltr; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size: 23px; font-weight: normal; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><strong>BUSINESS ENQUIRY</strong></h1>
                                    </td>
                                  </tr>
                                </table>
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="500">
                          <tbody>
                            <tr>
                              <th class="column" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="divider_block" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td>
                                      <div align="center">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                          <tr>
                                            <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;"><span></span></td>
                                          </tr>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="text_block" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td>
                                      <div style="font-family: 'Trebuchet MS', Tahoma, sans-serif">
                                        <div style="font-size: 14px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; color: #393d47; line-height: 1.2;">
                                          <p style="margin: 0; font-size: 14px; mso-line-height-alt: 16.8px;">&nbsp;${enquiry}</p>

                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="divider_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:60px;">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                        <tr>
                                          <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;"><span></span></td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                                <table class="text_block" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td>
                                      <div style="font-family: 'Trebuchet MS', Tahoma, sans-serif">
                                        <div style="font-size: 14px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; color: #393d47; line-height: 1.2;">
                                          <p style="margin: 0; font-size: 14px;"><strong>From ,</strong></p>
                                          <p style="margin: 0; font-size: 14px; mso-line-height-alt: 16.8px;">&nbsp;</p>
                                          <p style="margin: 0; font-size: 14px;"><strong>Name : &nbsp;</strong>${name}</p>
                                          <p style="margin: 0; font-size: 14px;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>
                                          <p style="margin: 0; font-size: 14px;"> <strong>Company : &nbsp;</strong>${company}</p>
                                          <p style="margin: 0; font-size: 14px; mso-line-height-alt: 16.8px;">&nbsp;</p>
                                          <p style="margin: 0; font-size: 14px;"><strong>Email : &nbsp;</strong>${email}&nbsp;</p>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table><!-- End -->
      </body>

      </html>
  `,
  };

  mg.messages().send(emailData, function (error, body) {
    console.log("sending email");
    if (error) {
      console.log(error);
    }
    console.log(body);
  });
};
module.exports = sendEmail;
