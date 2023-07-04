require("dotenv").config();
// ================================================================================================

const mongoose = require("mongoose");
const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_KEY);
  } catch (error) {
    console.log(error);
  }
};
// ================================================================================================

module.exports = connectdb;
