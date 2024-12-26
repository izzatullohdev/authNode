const Auth = require("../models/auth.model");

// @route POST /api/auth/register
// @desc register user
// @access public
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const checkUser = await Auth.findOne({ email });
    if (checkUser) {
      return res
        .status(400)
        .json({ success: false, message: "Bunday Email mavjud " });
    }
    const user = await Auth.create({ name, email, password });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const token = await user.generateAuthToken();
    res
      .status(201)
      .json({ success: true, message: "User registered", data: user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route POST /api/auth/login
// @desc login user
// @access public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = await user.generateAuthToken();
    res.status(200).json({ success: true,data: user, message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route POST /api/auth/logout
// @desc logout user
// @access public
exports.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/auth/me
// @desc get user details
// @access private
exports.me = async (req, res) => {
  try {
    const users = await Auth.find();
    res
      .status(200)
      .json({ success: true, message: "Users details", data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
