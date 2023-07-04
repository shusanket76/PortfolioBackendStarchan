const NatureModel = require("../../models/nature");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../../config/cloudinary");
const path = require("path");
const fs = require("fs");
// ================================================================================================

const getAllNatureData = asyncHandler(async (req, res) => {
  const natureData = await NatureModel.find().lean().exec();

  if (!natureData.length) {
    return res.json({ message: "NO DATA FOUND" });
  }
  return res.json(natureData);
});

// ================================================================================================

const createNatureData = asyncHandler(async (req, res) => {
  // ================================================
  let cloudinaryResponse;

  if (req.file) {
    cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
      folder: "nature",
    });

    if (cloudinaryResponse?.url) {
      const delpic = path.join(
        __dirname,
        "..",
        "..",
        "uploads",
        req.file.originalname
      );
      console.log(delpic);
      fs.unlink(delpic, (err) => {
        if (err) {
          return res.json(err);
        }
      });
    }
  }
  // =================================================
  const { photographer } = req.body;
  if (!photographer) {
    return res.json({ message: "ALL FIELDS ARE REQUIRED" });
  }
  const natureObject = { photographer, imageLink: cloudinaryResponse.url };
  const result = await NatureModel.create(natureObject);
  if (result) {
    return res.json({ message: "DATA CREATED" });
  }
  return res.json({ message: "NOT A VALID INPUT" });
});

// ================================================================================================

module.exports = { getAllNatureData, createNatureData };
