const {
  registerController,
  loginController,
} = require("../controller/user.controller");

const { verifyToken } = require("../middleware/token.middleware");

const authRouter = require("express").Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/me", verifyToken, (req, res) => {
  res.status(200).json({ data: req.user });
});

module.exports = authRouter;
