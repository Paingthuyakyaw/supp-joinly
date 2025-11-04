const UserSchema = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ProfileSchema = require("../models/profile.model");
require("dotenv").config();

exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existEmail = await UserSchema.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const user = await new UserSchema({
      username,
      email,
      password: hashPassword,
    });

    const profile = await ProfileSchema.create({
      user: user._id,
      bio: "",
      avatar_link: "",
    });
    user.profile = profile._id;
    user.save();

    res.status(201).json({
      data: {
        username: user.username,
        email: user.email,
        id: user._id,
      },
      message: "User Registered Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existEmail = await UserSchema.findOne({ email });
    if (!existEmail) {
      return res.status(400).json({ message: "Email or Password wrong " });
    }

    const isPassword = bcrypt.compareSync(password, existEmail.password);
    if (!isPassword) {
      return res.status(400).json({ message: "Email or Password wrong" });
    }

    const token = jwt.sign(
      { id: existEmail._id, username: existEmail.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      data: {
        username: existEmail.username,
        email: existEmail.email,
        token,
      },
      message: "User Logged In Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
