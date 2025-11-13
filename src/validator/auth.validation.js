const { checkSchema } = require("express-validator");

exports.registerSchema = checkSchema({
  username: {
    notEmpty: {
      errorMessage: "Username is required",
    },
    isString: true,
    isLength: {
      options: { min: 3, max: 20 },
      errorMessage: "Username must be between 3 and 20 characters",
    },
    errorMessage: "Invalid username",
  },

  email: {
    isEmail: {
      errorMessage: "Invalid email address",
    },
    normalizeEmail: true,
  },
  password: {
    notEmpty: {
      errorMessage: "Password is required",
    },
  },
  roleId: {
    notEmpty: {
      errorMessage: "Role ID is required",
    },
    isMongoId: {
      errorMessage: "Invalid roleId format",
    },
  },
});

exports.loginSchema = checkSchema({
  email: {
    isEmail: {
      errorMessage: "Invalid email address",
    },
    normalizeEmail: true,
  },
  password: {
    notEmpty: {
      errorMessage: "Password is required",
    },
  },
});
