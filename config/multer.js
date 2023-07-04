const multer = require("multer");
// ================================================================================================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "video/mp4"
  )
    cb(null, true); // this means file should be accepted
  else cb(null, false); // this means file should not be accepted
};
const uploads = multer({
  storage: storage,
  fileFilter: fileFilter,
});
// ================================================================================================

module.exports = uploads;
