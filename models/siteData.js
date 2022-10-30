const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  vishvakarmaProductList: [
    {
      componentName: {
        type: String,
        required: true,
      },

      imageUrl: {
        type: String,
        required: true,
      },

      cloudinary_id: {
        type: String,
        required: true,
      },
    },
  ],
  krProductList: [
    {
      productName: {
        type: String,
        required: true,
      },

      productOrderQuantity: {
        type: String,
        required: true,
      },
      productDiameter: {
        type: String,
        required: true,
      },
      productPrice: {
        type: String,
        required: true,
      },
      imageUrl: {
        type: String,
        required: true,
      },
      cloudinary_id: {
        type: String,
        // required: true,
      },
    },
  ],
});

const SiteDatabase = mongoose.model("siteDatas", siteSchema);

module.exports = SiteDatabase;
