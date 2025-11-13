const { getAllUser } = require("../controller/user.controller");

const userRouter = require("express").Router();

userRouter.get("/", getAllUser);

module.exports = userRouter;
