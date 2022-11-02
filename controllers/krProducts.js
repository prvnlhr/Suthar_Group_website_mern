const SiteDatabase = require("../models/siteData");
const mongoose = require("mongoose");
var objectId = mongoose.Types.ObjectId();

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
      // console.log("get products KR response");
      res.status(200).send(response);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },



 
};

module.exports = krProductController;
