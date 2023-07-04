const express = require("express");
const router = express.Router();
const upload = require("../../config/multer");
const {
  getAllPoetryData,
  createPoetryData,
} = require("../../controllers/poetryController/poetry");
// ================================================================================================

router
  .route("/")
  .get(getAllPoetryData)
  .post(
    // upload.single("mainImage"),
    upload.fields([
      {
        name: "mainImageLink",
      },
      {
        name: "coverImageLinks",
        maxCount: 5,
      },
    ]),
    // upload.array("coverImages"),

    createPoetryData
  );
// ================================================================================================

module.exports = router;
