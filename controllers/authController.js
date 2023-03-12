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
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log("at login controller", req.body);
      const user = await SiteDatabase.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "This email does not exist." });
      // console.log("check1");
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Password is incorrect." });
      // console.log("check2");
      const refresh_token = createRefreshToken({ id: user._id });
      console.log("login controller refresh_token", refresh_token);
      res.cookie("sg_refreshtoken", refresh_token, {
        httpOnly: true,
        secure: true,
        samSite: "none",
        path: "/company/auth/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      // console.log("req.cookies", req.cookies.sg_refreshtoken);

      const access_token = createAccessToken({ id: user._id });
      // console.log("check4");

      res.status(200).json(access_token);
    } catch (err) {
      console.log("error at Login controller", err);
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    console.log("logout controller");
    try {
      res.clearCookie("sg_refreshtoken", {
        path: "/company/auth/refresh_token",
      });
      return res.status(200).json({ msg: "Successfully Logged out" });
    } catch (error) {
      console.log("error at logout controller", error);
      return res.status(404).send(error);
    }
  },
  getAccessToken: async (req, res) => {
    try {
      const rf_token = req.cookies.sg_refreshtoken;
      console.log("refresh_token from cookies::", req.cookies.sg_refreshtoken);
      if (!rf_token) {
        console.log("no token");
        return res.status(401).json({ msg: "Please Login to continue !" });
      }
      const decode = jwt.verify(rf_token, REFRESH_TOKEN_SECRET);
      var userId = decode.id;
      const access_token = createAccessToken({ id: userId });
      // console.log("token", access_token);

      res.status(200).json(access_token);
    } catch (error) {
      // console.log("error at get token controller", error.name);
      if (
        error.name === "TokenExpiredError" ||
        error.name === "JsonWebTokenError"
      ) {
        console.log("token error", error);

        return res.status(401).json({ msg: "Please Login to continue !" });
      }
      console.log("token error2", error);

      return res.status(400).json({ msg: error });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

      // console.log("forget password controller", req.body);
      const user = await SiteDatabase.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Email Id doest not exist" });
      }

      const tokenPayload = {
        owner: user.owner,
        email: user.email,
        id: user._id,
      };
      const reset_token = createAccessToken(tokenPayload);
      // const activation_token = createActivationToken(user);

      const url = `${CLIENT_URL}/company/auth/reset/${reset_token}`;
      sendMail(email, url, "Reset your password. Click the below link");
      console.log(
        "forgot password controller check your email for pass reset link"
      );
      res.json({ msg: "Please check your email for reset link" });
    } catch (error) {
      console.log("error at forgot password controller", error);
      return res.status(404).send(error);
    }
  },
  resetPassword: async (req, res) => {
    try {
      // console.log("reset password cntrl", req.body);
      const { password } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);
      console.log(req.user);
      const newPassword = await SiteDatabase.findOneAndUpdate(
        { _id: req.user.id },
        { password: passwordHash }
      );
      res.json({ msg: "Password successfully changed !" });
    } catch (error) {
      console.log("error at reset password controller", error);
      return res.status(404).send(error);
    }
  },
  getUserInfo: async (req, res) => {
    // console.log("get user info controller", req.user.id);
    try {
      const user = await SiteDatabase.findById(req.user.id).select("-password");
      // console.log("get user controller DB response", user);
      res.json({ user });
    } catch (error) {
      console.log("error at getUserInfo controller", error);
      return res.status(404).send(error);
    }
  },
  // ___NOT IN USE_____________________________________________________________________
  // __________________________________________________________________________________
  changePassword: async (req, res) => {
    // console.log("at change PAss controller",req.body)
    try {
      const { oldPassword, newPassword } = req.body;
      const id = req.user.id;
      const user = await SiteDatabase.findById(id);
      if (!user) {
        return res.status(400).send({ msg: "Email Id does not exist." });
      }
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).send({ msg: "Old Password does not matched !" });
      }
      const passwordHash = await bcrypt.hash(newPassword, 12);
      const changePassword = await SiteDatabase.findOneAndUpdate(
        { _id: req.user.id },
        { password: passwordHash }
      );
      res.json({ msg: "Password successfully changed !" });
    } catch (error) {
      console.log("error at changePassword controller", error);
      return res.status(404).send(error);
    }
  },
  updateProfile: async (req, res) => {
    const { owner, email } = req.body.profileData;
    try {
      const id = req.user.id;
      const user = await SiteDatabase.findById(id);
      if (!user) {
        return res.status(400).send({ msg: "Email Id does not exist." });
      }
      const response = await SiteDatabase.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            owner: owner,
            email: email,
          },
        },
        { returnOriginal: false }
      );
      const newData = {
        _id: response._id,
        owner: response.owner,
        email: response.email,
      };
      res.json({ msg: "Profile Successfully updated !", newData });
    } catch (error) {
      console.log("error at edit profile controller", error);
      return res.status(404).send(error);
    }
  },
  deleteAccountPermanently: async (req, res) => {
    try {
      console.log(req.body);
      const { oldPassword } = req.body;
      const id = req.user.id;
      const user = await SiteDatabase.findById(id);
      if (!user) {
        return res.status(400).send({ msg: "User does not exist." });
      }
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).send({ msg: "Password invalid !" });
      }
      const response = await SiteDatabase.findByIdAndDelete({
        _id: req.user.id,
      });

      res.json({ msg: "Account successfully deleted !" });
    } catch (error) {
      console.log("error at edit delete account controller", error);

      return res.status(404).send(error);
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await SiteDatabase.findById(req.user.id).select("-password");
      res.status(200).send(user);
    } catch (error) {
      console.log(error);

      res.status(404).json({ message: error.message });
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
