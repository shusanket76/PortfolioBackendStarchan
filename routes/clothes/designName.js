const express = require("express");
const router = express.Router();
const {
  getAllDesignName,
  createADesignName,
} = require("../../controllers/clothesController/designType");
// ================================================================================================
router.route("/").get(getAllDesignName).post(createADesignName);
// ================================================================================================

module.exports = router;
