const mongoose = require("mongoose");

const poetrySchema = new mongoose.Schema(
  {
    bookname: {
      type: String,
    },
    mainImageLink: {
      type: String,
    },
    coverImageLinks: [
      {
        type: String,
      },
    ],
    description: {
      type: "String",
    },
    linkofBook: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PoetryModel", poetrySchema);
