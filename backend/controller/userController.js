const User = require("../models/userModel");
exports.home = (req, res) => {
  res.send("Home Page !");
};
// Create
exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      throw new Error("Name and Email are Compulsory!");
    }
    const userAlreadyExists = User.findOne({ email });
    if (!userAlreadyExists) {
      throw new Error("User Already Exists !");
    }
    const user = await User.create({ name, email });
    res.status(201).json({
      success: true,
      message: "User created Successfully !",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
// Read
exports.getUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
// Update
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndUpdate(userId, req.body);
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
// Delete
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    res.status(201).json({
      success: true,
      message: "User Deleted Successfully !",
      deletedUser: user,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
