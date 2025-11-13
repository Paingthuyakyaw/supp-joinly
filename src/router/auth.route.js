const {
  registerController,
  loginController,
} = require("../controller/user.controller");

const { verifyToken } = require("../middleware/token.middleware");
const { registerSchema, loginSchema } = require("../validator/auth.validation");

const authRouter = require("express").Router();

authRouter.post("/register", registerSchema, registerController);
authRouter.post("/login", loginSchema, loginController);
authRouter.get("/me", verifyToken, (req, res) => {
  res.status(200).json({ data: req.user });
});

module.exports = authRouter;
