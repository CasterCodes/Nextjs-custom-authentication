import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "User name is required"],
  },
  email: {
    type: String,
    required: [true, "User  email required"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "User password is required"],
  },

  isEmailVerified: {
    type: String,
  },

  role: {
    type: String,
    required: true,
    enum: {
      values: ["admin", "user"],
      message: "Role not accepted",
    },
  },
});

const User = mongoose.model("users", userSchema);
