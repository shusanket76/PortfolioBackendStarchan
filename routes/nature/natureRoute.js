const express = require("express");
const router = express.Router();
const upload = require("../../config/multer");
const {
  getAllNatureData,
  createNatureData,
} = require("../../controllers/natureController/natureController");
// ================================================================================================

router
  .route("/")
  .get(getAllNatureData)
  .post(upload.single("imageLink"), createNatureData);
// ================================================================================================

module.exports = router;
