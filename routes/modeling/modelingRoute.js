const express = require("express");
const router = express.Router();
const upload = require("../../config/multer");
const {
  getAllModelingData,
  createModelingData,
} = require("../../controllers/modelingController/modeling");
// ================================================================================================

router
  .route("/")
  .get(getAllModelingData)
  .post(upload.single("imageLink"), createModelingData);

// ================================================================================================

module.exports = router;
