const mongoose = require("mongoose");
const permissionSchema = require("./permission.model");

const roleSchema = new mongoose.Schema(
  {
    role: { type: String, required: true, unique: true, default: "admin" },
    permissions: [permissionSchema],
  },
  {
    timestamps: true,
  }
);

const RoleSchema = mongoose.model("Role", roleSchema);
module.exports = RoleSchema;
