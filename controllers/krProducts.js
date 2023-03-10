const SiteDatabase = require("../models/siteData");
const mongoose = require("mongoose");

const cloudinary = require("../utils/cloudinaryConfig");
const { response } = require("express");

const krProductController = {
  getProducts: async (req, res) => {
    // const id = req.user.id;
    console.log("getProduct controller KR", "61682efa71f33a6aa6eb866e");
    try {
      const response = await SiteDatabase.findOne({
        _id: "61682efa71f33a6aa6eb866e",
      }).select("-password");
      console.log("get products KR response");
      res.status(200).send(response);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  addProduct: async (req, res) => {
    // console.log(
    //   "add product controller KR request",
    //   req.body.rib_name,
    //   filePath
    // );
    const filePath = req.file.path;
    const userId = req.user.id;
    try {
      const cloudinaryResponse = await cloudinary.v2.uploader.upload(filePath, {
        folder: "kr",
      });
      console.log("cloudinary response_kr", cloudinaryResponse);
      const productData = {
        // _id: mongoose.Types.ObjectId(),
        productName: req.body.rib_name,
        productOrderQuantity: req.body.order_quantity,
        productDiameter: req.body.rib_diameter,
        productPrice: req.body.rib_price,
        imageUrl: cloudinaryResponse.secure_url,
        cloudinary_id: cloudinaryResponse.public_id,
      };
      console.log(productData);
      // const addProductResponse = await SiteDatabase.findOneAndUpdate(
      //   { _id: userId },
      //   {
      //     $push: {
      //       krProductList: productData,
      //     },
      //   },
      //   { returnOriginal: false }
      // );
      const addProductResponse = await SiteDatabase.findOneAndUpdate(
        { _id: userId },
        { $push: { krProductList: { $each: [productData], $position: 0 } } },
        { returnOriginal: false }
      );
      console.log("mongodb KR product add Response ", addProductResponse);
      res.status(200).json(addProductResponse);
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error.message });
    }
  },

  deleteProduct: async (req, res) => {
    const cloudId = req.body.cloudId;
    const productId = req.body.productId;
    const userId = req.user.id;
    console.log(
      "delete product KR controller request",
      typeof productId,
      typeof userId,
      cloudId
    );

    try {
      const result = await cloudinary.v2.uploader.destroy(cloudId);
      console.log(result);
      const response = await SiteDatabase.findOneAndUpdate(
        { _id: userId },
        {
          $pull: {
            krProductList: {
              _id: productId,
            },
          },
        },
        { returnOriginal: false }
      );
      console.log(response);
      res.status(200).send({
        data: response.krProductList,
        msg: "kr_productDeleted",
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  editProduct: async (req, res) => {
    console.log("edit Product KR controller ", req.user.id, req.body);
    const {
      productName,
      productOrderQuantity,
      productDiameter,
      productPrice,
      _id,
    } = req.body;
    try {
      const response = await SiteDatabase.findOneAndUpdate(
        { "krProductList._id": _id },
        {
          $set: {
            "krProductList.$.productName": productName,
            "krProductList.$.productOrderQuantity": productOrderQuantity,
            "krProductList.$.productDiameter": productDiameter,
            "krProductList.$.productPrice": productPrice,
          },
        },
        { returnOriginal: false }
      );
      res.status(201).json(response.krProductList);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};

module.exports = krProductController;
