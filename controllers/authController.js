const SiteDatabase = require("../models/siteData");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var cookieParser = require("cookie-parser");
const sendMail = require("../utils/sendMail");

const {
  ACTIVATION_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  CLIENT_URL,
  SEND_GRID_API_KEY,
} = process.env;
//_________________________________________________________________________________________________________________________________________
//REGISTERING NEW USER_____________________________________________________________________________________________________________________

const authController = {
  register: async (req, res) => {
    const { email, password, confirmPassword, owner } = req.body;

    try {
      console.log(
        "auth Controller register",
        email,
        password,
        confirmPassword,
        owner
      );
      // checking all field fill or not.
      if (!owner || !email || !password || !confirmPassword) {
        return res.status(400).json({ msg: "Please fill in all fields" });
      }
      //checking email address is valid or not.
      if (!validateEmail(email)) {
        return res.status(400).json({ msg: "Not a valid email address" });
      }
      //checking if password fields match or not
      if (password !== confirmPassword) {
        return res.status(400).json({ msg: " Passwords does not match" });
      }
      //checking email address already exist or not.
      const existingUser = await SiteDatabase.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ msg: "Email address already exist" });
      }
      //checking password length for minimum password length.
      if (password.length < 6) {
        return res.status(400).json({ msg: "Password must be least 6 digit" });
      }
      //hashing password.
      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = {
        owner: owner,
        email,
        password: passwordHash,
      };
      //creating jwt Token.
      const activation_token = createActivationToken(newUser);
      const txt = "Account Activation Link";
      const url = `${CLIENT_URL}/company/auth/activate/${activation_token}`;

      const response = sendMail(email, url, txt);
      res.status(200).json({ msg: "Check your email for activation link" });
    } catch (error) {
      console.log("error in registration", error);
    }
  },
  activateEmail: async (req, res) => {
    try {
      // const { activation_token } = req.body.data;
      console.log("activation token controller", req.body.data);
      const user = jwt.verify(
        req.body.data.activation_token,
        ACTIVATION_TOKEN_SECRET
      );

      const { owner, email, password } = user;
      console.log("activate email controller", user);

      const check = await SiteDatabase.findOne({ email });
      if (check)
        return res.status(400).json({ msg: "This email already exists." });

      const newUser = await SiteDatabase.create({
        owner: owner,
        email: email,
        password: password,
      });

      res.json({ msg: "Account has been activated!" });
    } catch (err) {
      if (
        err.name === "TokenExpiredError" ||
        err.name === "JsonWebTokenError"
      ) {
        return res.status(401).json({ msg: "Link Expired! Register again" });
      }
      console.log("error at activateEmail", err.name);
      return res.status(500).json({ msg: err.message });
    }
  },
};

//_________________________________________________________________________________________________________________-
//_______________________________________________________________________________________________________

//___________________________________________________________________________________________________
function createActivationToken(payload) {
  return jwt.sign(payload, ACTIVATION_TOKEN_SECRET, { expiresIn: "5m" });
}
function createAccessToken(payload) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}
function createRefreshToken(payload) {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "2d" });
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
module.exports = authController;
