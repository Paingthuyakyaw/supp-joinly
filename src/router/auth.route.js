const {
  registerController,
  loginController,
} = require("../controller/user.controller");

const authRouter = require("express").Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);

module.exports = authRouter;
