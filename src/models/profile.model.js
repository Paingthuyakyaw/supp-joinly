const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bio: String,
    avatar_link: String,
  },
  {
    timestamps: true,
  }
);

const ProfileSchema = mongoose.model("Profile", profileSchema);
module.exports = ProfileSchema;
