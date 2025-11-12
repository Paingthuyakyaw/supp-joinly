const { Schema } = require("mongoose");

const permissionSchema = new Schema({
  menuCode: {
    type: String,
    required: true,
  },
  actions: [
    {
      type: String,
      enum: ["create", "read", "update", "delete"],
      required: true,
    },
  ],
  scope: {
    type: String,
    enum: ["own", "department", "all"],
    default: "own",
  },
});

module.exports = permissionSchema;
