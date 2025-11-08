const mongoose = require("mongoose");

const roleSchema = mongoose.Schema(
  {
    role: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const RoleSchema = mongoose.model("Role", roleSchema);
module.exports = RoleSchema;
