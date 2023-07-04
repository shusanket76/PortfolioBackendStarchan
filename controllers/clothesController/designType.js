const ClothesDesignNameModel = require("../../models/designType");
const asyncHandler = require("express-async-handler");

// ================================================================================================

const getAllDesignName = asyncHandler(async (req, res) => {
  const clothdesignName = await ClothesDesignNameModel.find().lean();

  if (!clothdesignName.length) {
    return res.json({ message: "NO DATA FOUND" });
  }
  return res.json(clothdesignName);
});

// ================================================================================================

const createADesignName = asyncHandler(async (req, res) => {
  const { name } = req.body;
  //   check if req.body has value or not
  if (!name) {
    return res.json({ message: "NO DATA FOUND" });
  }
  //   check if there is a duplicate value or not
  const duplicate = await ClothesDesignNameModel.findOne({ name })
    .lean()
    .exec();
  if (duplicate) {
    return res.json({ message: "YOU ALREADY HAVE THIS DESIGN NAME" });
  }
  const result = await ClothesDesignNameModel.create({ name });
  if (result) {
    return res.json({ message: "CREATED DESIGN NAME" });
  }
  return res.json({ message: "INVALID DATA " });
});

// ================================================================================================

module.exports = { getAllDesignName, createADesignName };
