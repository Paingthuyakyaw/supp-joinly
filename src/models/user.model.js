const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
    status: {
      type: String,
      enum: ["Pending", "Approve", "Reject"],
      default: "Pending",
    },
    attendance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attendance",
      required: true,
    },
  },
  { timestamps: true }
);

const UserSchema = mongoose.model("User", userSchema);
module.exports = UserSchema;
