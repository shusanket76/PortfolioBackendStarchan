const ModelingModel = require("../../models/modeling");
const asyncHandler = require("express-async-handler");
const path = require("path");
const fs = require("fs");
const cloudinary = require("../../config/cloudinary");

// ================================================================================================

const getAllModelingData = asyncHandler(async (req, res) => {
  const modelingData = await ModelingModel.find().lean();

  if (!modelingData.length) {
    return res.status(204).json({ message: "NO DATA FOUND" });
  }
  return res.status(200).json(modelingData);
});
// ================================================================================================

const createModelingData = asyncHandler(async (req, res) => {
  // ======================================
  let cloudinaryResponse;
  if (req.file) {
    cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
      folder: "modeling",
    });
    if (cloudinaryResponse?.url) {
      const delpic = path.join(
        __dirname,
        "..",
        "..",
        "uploads",
        req.file.originalname
      );
      fs.unlink(delpic, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  }
  // ===========================================
  const { photographer } = req.body;
  if (!photographer) {
    return res.json({ message: "ALL FIELDS ARE REQUIRED" });
  }
  const modelingObject = { imageLink: cloudinaryResponse.url, photographer };
  const result = await ModelingModel.create(modelingObject);
  if (result) {
    return res.json({ message: "DATA CREATED" });
  }
  return res.json({ message: "INVALID INPUT" });
});
// ================================================================================================

module.exports = { getAllModelingData, createModelingData };
