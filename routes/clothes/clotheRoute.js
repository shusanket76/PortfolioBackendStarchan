const express = require("express");
const router = express.Router();
const uploads = require("../../config/multer");
const {
  getAllClothesData,
  createClothesData,
} = require("../../controllers/clothesController/clothes");

// =================================================================================================
router
  .route("/")
  .get(getAllClothesData)
  .post(uploads.single("imageLink"), createClothesData);

// ================================================================================================
module.exports = router;
