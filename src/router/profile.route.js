const {
  getProfile,
  getProfileByUserId,
  editProfile,
} = require("../controller/profile.controller");

const profileRoute = require("express").Router();

profileRoute.get("/", getProfile);
profileRoute.get("/user/:id", getProfileByUserId);
profileRoute.put("/:id", editProfile);

module.exports = profileRoute;
