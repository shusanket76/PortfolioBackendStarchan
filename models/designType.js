const mongoose = require("mongoose");

const clothesDesignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ClothesDesignNameModel", clothesDesignSchema);
