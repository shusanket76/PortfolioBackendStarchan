const mongoose = require("mongoose");

const natureSchema = new mongoose.Schema(
  {
    photographer: {
      type: String,
      required: true,
    },
    imageLink: {
      type: "String",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NatureModel", natureSchema);
