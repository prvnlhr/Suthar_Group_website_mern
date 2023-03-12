const sendEnquiry = require("../utils/contactMail1");
const { SEND_GRID_API_KEY_ENQUIRY, SENDER_EMAIL_ADDRESS } = process.env;
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(SEND_GRID_API_KEY_ENQUIRY);
//_________________________________________________________________________________________________________________________________________
//REGISTERING NEW USER_____________________________________________________________________________________________________________________

const contactController = {
  contactUs: async (req, res) => {
    try {
      console.log("at contactUs controller", req.body);
      const { firstName, lastName, company, email, enquiry } = req.body;

      const name = `${firstName} ${lastName}`;

      const response = sendEnquiry(name, enquiry, email, company);
      console.log("DSSDS", response);
      res
        .status(200)
        .json({ msg: "Thank your for contacting us ! We will reply soon" });
    } catch (err) {
      console.log("error at contact controller", err);
      return res.status(500).json({ msg: err.message });
    }
  },
};

//___________________________________________________________________________________________________

module.exports = contactController;
