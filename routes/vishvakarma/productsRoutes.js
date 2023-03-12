const express = require("express");
const router = express.Router();

const productsController = require("../../controllers/vishvakarmaProducts");

const multerUploads = require("../../middleware/multerUploads");
const auth = require("../../middleware/auth");

router.get("/getProducts", productsController.getProducts);

router.post(
  "/addProduct",
  auth,
  multerUploads.single("file"),
  productsController.addProduct
);
router.patch("/editProduct", auth, productsController.editProduct);
router.delete("/deleteProduct", auth, productsController.deleteProduct);

module.exports = router;
