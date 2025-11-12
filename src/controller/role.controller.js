const RoleSchema = require("../models/role.model");

exports.createRole = async (req, res) => {
  try {
    const { role, permission } = req.body;

    if (!role || !Array.isArray(permission)) {
      return res.status(400).json({ message: "Invalid payload" });
    }

    const existRole = await RoleSchema.findOne({ role });

    if (existRole) {
      return res.status(400).json({ message: "Role is exist" });
    }

    const newRole = new RoleSchema({ role, permission });
    const newRoleData = await newRole.save();

    res
      .status(201)
      .json({ message: "Role created Successfully", data: newRoleData });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      error: err,
    });
  }
};

exports.getAllRole = async (req, res) => {
  try {
    const roles = await RoleSchema.find();
    res.status(200).json({
      message: "Role Fetched",
      data: roles,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      error: err,
    });
  }
};

exports.editRole = async (req, res) => {};
