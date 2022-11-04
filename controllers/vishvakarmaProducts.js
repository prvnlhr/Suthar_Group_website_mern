const SiteDatabase = require("../models/siteData");
const mongoose = require("mongoose");
var objectId = mongoose.Types.ObjectId();

const cloudinary = require("../utils/cloudinaryConfig");
const { response } = require("express");

const VVProductController = {
  getProducts: async (req, res) => {
    // const id = req.user.id;
    console.log("getProduct controller VV", "61682efa71f33a6aa6eb866e");
    try {
      const response = await SiteDatabase.findOne({
        _id: "61682efa71f33a6aa6eb866e",
      }).select("-password");
      console.log("get products VV response");
      res.status(200).send(response);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },



  addProduct: async (req, res) => {
    const filePath = req.file.path;
    const userId = req.user.id;
    console.log(
      "add product controller VK request",
      req.user.id,
      req.body.componentName,
      filePath
    );

    try {
      const cloudinaryResponse = await cloudinary.v2.uploader.upload(filePath, {
        folder: "vishvakarma",
      });
      // console.log("cloudinary response_vv", cloudinaryResponse);
      const productData = {
        componentName: req.body.componentName,
        imageUrl: cloudinaryResponse.secure_url,
        cloudinary_id: cloudinaryResponse.public_id,
      };
      console.log(productData);
      const addProductResponse = await SiteDatabase.findOneAndUpdate(
        { _id: userId },
        {
          $push: {
            vishvakarmaProductList: { $each: [productData], $position: 0 },
          },
        },
        { returnOriginal: false }
      );
      console.log("mongodb VV product add Response ", addProductResponse);
      res.status(200).json(addProductResponse);
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error.message });
    }
  },
}