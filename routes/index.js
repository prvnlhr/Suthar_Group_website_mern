const express = require("express");
const router = express.Router();

router.use("/company/kr/product", require("./kr/productRoutes"));
router.use("/company/auth", require("./authRoutes"));

router.use(
  "/company/vishvakarma/product",
  require("./vishvakarma/productsRoutes")
);
router.use("/company/contactUs", require("./contactUsRoute"));

module.exports = router;
