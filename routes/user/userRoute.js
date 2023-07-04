const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createauser,
} = require("../../controllers/userController/users");


// ================================================================================================


router.route("/").get(getAllUsers).post(createauser);

// ================================================================================================

module.exports = router;
