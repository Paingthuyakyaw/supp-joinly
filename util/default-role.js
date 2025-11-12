// utils/seedAdminRole.js
const Role = require("../src/models/role.model");

const menus = [
  { name: "Employee", code: "employee" },
  { name: "Checklist", code: "checklist" },
  { name: "Attendance", code: "attendance" },
  { name: "Payroll", code: "payroll" },
  { name: "Performance", code: "performance" },
];

const createAdminRole = async () => {
  const adminRole = new Role({
    name: "Admin",
    description: "System Administrator with full access",
    permissions: menus.map((menu) => ({
      menuCode: menu.code,
      actions: ["create", "read", "update", "delete"],
      scope: "all",
    })),
  });

  await adminRole.save();
  console.log("Admin role created with default permissions.");
};

module.exports = createAdminRole;
