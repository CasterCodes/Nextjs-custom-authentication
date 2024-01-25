import databaseConnection from "@/database.config";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { Document } from "mongoose";

databaseConnection();

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
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
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(12);

  this.password = await bcrypt.hash(this.password, salt);
  return next();
});

userSchema.methods.comparePassword = async function (rawPassword: string) {
  return await bcrypt
    .compare(rawPassword, this.password)
    .catch((error: any) => false);
};

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
