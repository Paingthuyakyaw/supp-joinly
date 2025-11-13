const mongoose = require("mongoose");
const dotenv = require("dotenv");
const RoleSchema = require("./models/role.model");
const createAdminRole = require("../util/default");
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("MongoDB connected successfully");
    const adminRoleExists = await RoleSchema.findOne({ name: "Admin" });
    if (!adminRoleExists) {
      await createAdminRole();
    }
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
