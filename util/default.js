// utils/seedAdminRole.js
const Role = require("../src/models/role.model");
const UserSchema = require("../src/models/user.model");
const bcrypt = require("bcryptjs");

const menus = [
  { name: "Employee", code: "employee" },
  { name: "Checklist", code: "checklist" },
  { name: "Attendance", code: "attendance" },
  { name: "Payroll", code: "payroll" },
  { name: "Performance", code: "performance" },
];

const createAdminRole = async () => {
  // Check existing role
  const existingRole = await Role.findOne({ role: "admin" });

  if (existingRole) {
    console.log("Admin role already exists. Skipping creation.");
    return;
  }

  // Create Admin Role
  const adminRole = new Role({
    name: "Admin",
    description: "System Administrator with full access",
    permissions: menus.map((menu) => ({
      menuCode: menu.code,
      actions: ["create", "read", "update", "delete"],
      scope: "all",
    })),
  });

  const savedRole = await adminRole.save();

  console.log("Admin role created with default permissions.");

  // Check admin user exist
  const existAdminUser = await UserSchema.findOne({ email: "admin@gmail.com" });

  if (existAdminUser) {
    console.log("Admin user already exists. Skipping creation.");
    return null;
  }

  const adminUser = new UserSchema({
    username: "Paing Thura Kyaw",
    email: "admin@gmail.com",
    password: "123456",
    status: "Approve",
    roleId: savedRole._id,
  });

  await adminUser.save();

  console.log("Admin user created.");
};

module.exports = createAdminRole;
