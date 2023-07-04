const mongoose = require("mongoose");

const clothesSchema = new mongoose.Schema(
  {
    imageLink: { type: String, required: true },
    clothDesignId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "ClothesDesignNameModel ",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ClothesModel", clothesSchema);
