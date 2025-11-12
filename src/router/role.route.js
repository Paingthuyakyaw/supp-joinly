const { createRole, getAllRole } = require("../controller/role.controller");

const roleRoute = require("express").Router();

roleRoute.post("/role", createRole);
roleRoute.get("/role", getAllRole);

module.exports = roleRoute;
