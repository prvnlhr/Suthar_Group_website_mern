const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

router.post("/enquiry", contactController.contactUs);

module.exports = router;
