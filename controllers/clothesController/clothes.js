const ClothesModel = require("../../models/clothes");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../../config/cloudinary");
const path = require("path");
const fs = require("fs");
const ClothesDesignNameModel = require("../../models/designType");
// ===============================================================================================================================================
// GETTING CLOTHESDATA
const getAllClothesData = asyncHandler(async (req, res) => {
  const clothesData = await ClothesModel.find().lean();
  // CHECKING IF THE CLOTHES DATA IS EMPTY OR NOT
  if (!clothesData.length) {
    return res.json("NO CLOTHES FOUND");
  }
  // ADDING DESING NAME TO THE CLOTHES DATA
  const clothesWithDesignName = await Promise.all(
    clothesData.map(async (singlecloth) => {
      const clothdesignName = await ClothesDesignNameModel.findById(
        singlecloth.clothDesignId
      )
        .lean()
        .exec();
      return { ...singlecloth, designName: clothdesignName.name };
    })
  );

  return res.json(clothesWithDesignName);
});
// =====================================================================================================================================
const createClothesData = asyncHandler(async (req, res) => {
  // ======================================
  let cloudinaryResponse;
  if (req.file) {
    cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
      folder: "clothes",
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
          return res.json(err);
        }
      });
    }
  }
  // ==================================
  const { clothDesignId } = req.body;

  const clotheImageObject = {
    imageLink: cloudinaryResponse.url,
    clothDesignId,
  };
  const result = await ClothesModel.create(clotheImageObject);
  if (result) {
    return res.json({ message: "DATA CREATED" });
  }
  return res.json({ message: "INVALID INPUT" });
});

// ================================================================================================

module.exports = { getAllClothesData, createClothesData };
