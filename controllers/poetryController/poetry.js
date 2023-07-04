const PoetryModel = require("../../models/poetry");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../../config/cloudinary");
const path = require("path");
const fs = require("fs");
// ================================================================================================

const getAllPoetryData = asyncHandler(async (req, res) => {
  const poetryData = await PoetryModel.find().lean();

  if (!poetryData.length) {
    return res.json([]);
  }

  return res.json(poetryData);
});

// ================================================================================================

const createPoetryData = asyncHandler(async (req, res) => {
  // ==============================================
  let cloudResponse = {};
  let cloudinarResponse;
  if (req.files) {
    if (req.files["mainImageLink"]) {
      cloudinarResponse = await cloudinary.uploader.upload(
        req.files["mainImageLink"][0].path,
        {
          folder: "poetry",
        }
      );
      if (cloudinarResponse?.url) {
        cloudResponse.mainImageLink = cloudinarResponse.url;
        const delpic = path.join(
          __dirname,
          "..",
          "..",
          "uploads",
          req.files["mainImageLink"][0].originalname
        );
        fs.unlink(delpic, (err) => {
          if (err) {
            console.log(err);
            return res.json(err);
          }
        });
      }
    }
    // ========================END FOR MAINIMAGE=======================================
    if (req.files["coverImageLinks"]) {
      const coverFiles = req.files["coverImageLinks"];
      for (let i = 0; i < coverFiles.length; i++) {
        let file = coverFiles[i];
        cloudinarResponse = await cloudinary.uploader.upload(file.path, {
          folder: "poetry",
        });
        if (cloudinarResponse?.url) {
          if ("coverImageLinks" in cloudResponse) {
            cloudResponse.coverImageLinks.push(cloudinarResponse.url);
          } else {
            cloudResponse.coverImageLinks = [cloudinarResponse.url];
          }

          const delpic = path.join(
            __dirname,
            "..",
            "..",
            "uploads",
            file.originalname
          );
          fs.unlink(delpic, (err) => {
            if (err) {
              console.log(err);
              return res.json(err);
            }
          });
        }
      }
    }
  }
  // =============================================
  const { bookname, description, linkofBook } = req.body;
  console.log(cloudResponse);

  if (!bookname || !description || !linkofBook) {
    return res.json({ message: "ALL FIELDS REQUIRED" });
  }
  const poetryObject = {
    bookname,
    description,
    mainImageLink: cloudResponse["mainImageLink"],
    coverImageLinks: cloudResponse["coverImageLinks"],
    linkofBook,
  };
  const result = await PoetryModel.create(poetryObject);
  if (result) {
    return res.json({ message: "CREATED" });
  }
  return res.json({ message: "INVALID INPUT TYPE" });
});
// ================================================================================================

module.exports = { getAllPoetryData, createPoetryData };
