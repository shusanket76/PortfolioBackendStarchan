const mongoose = require("mongoose");

const modelingSchema = new mongoose.Schema(
  {
    imageLink: {
      type: String,
      required: true,
    },
    photographer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ModelingModel", modelingSchema);
