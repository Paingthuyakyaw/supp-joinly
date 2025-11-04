const ProfileSchema = require("../models/profile.model");

// get all
exports.getProfile = async (req, res) => {
  try {
    const profile = await ProfileSchema.find().populate(
      "user",
      "username email"
    );

    return res
      .status(200)
      .json({ data: profile, message: "Profile fetched successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.getProfileByUserId = async (req, res) => {
  try {
    const { id } = req.params;

    const profile = await ProfileSchema.findOne({ user: id }).populate(
      "user",
      "username email"
    );

    if (!profile) {
      return res
        .status(404)
        .json({ message: "Profile not found for the given user ID" });
    }

    return res
      .status(200)
      .json({ data: profile, message: "Profile fetched successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

//
exports.editProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { bio, avatar_link } = req.body;

    const profile = await ProfileSchema.findByIdAndUpdate(id, {
      bio,
      avatar_link,
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res
      .status(200)
      .json({ data: profile, message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
