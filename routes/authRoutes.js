const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");
router.post("/register", authController.register);
router.post("/activation", authController.activateEmail);
router.post("/login", authController.login);
router.post("/refresh_token", authController.getAccessToken);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/resetPassword", auth, authController.resetPassword);
router.get("/logout", authController.logout);
router.get("/info", auth, authController.getUserInfo);

// not in use
router.get("/getUser", auth, authController.getUser);
router.post("/updateProfile", auth, authController.updateProfile);
router.delete("/deleteAccount", auth, authController.deleteAccountPermanently);
router.post("/changePassword", auth, authController.changePassword);
module.exports = router;
