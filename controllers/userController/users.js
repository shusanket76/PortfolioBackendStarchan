const User = require("../../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
// ================================================================================================

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();

  if (!users.length) {
    return res.status(204).json({ message: "NO USER FOUND" });
  }
  return res.status(200).json({ data: users });
});
// ================================================================================================

const createauser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // check if all the values are given or not
  if (!username || !password) {
    return res.json({ message: "NOT ALL FIELD PROVIDED" });
  }
  // check for duplicate value
  const duplicate = await User.findOne({ username }).lean().exec();

  if (duplicate) {
    return res.json({ message: "USER EXIST WITH THIS USERNAME" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const userObject = { username, password: hashedPassword };
  const user = await User.create(userObject);
  if (user) {
    return res.json({ message: "USER CREATED SUCCESSFULLY" });
  }
  return res.json({ message: "INVALID USER DATA" });
});
// ================================================================================================

module.exports = { getAllUsers, createauser };
