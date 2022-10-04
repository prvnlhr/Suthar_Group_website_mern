const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");
router.post("/register", authController.register);
router.post("/activation", authController.activateEmail);

module.exports = router;
