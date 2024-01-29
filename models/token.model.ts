import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    token: {
      type: String,
      required: true,
    },

    expiresIn: {
      type: Date,
    },

    type: {
      type: String,
      enum: ["emailVerification", "passwordReset"],
      required: true,
    },
  },
  { timestamps: true }
);

const Token = mongoose.models.token || mongoose.model("token", tokenSchema);

export default Token;
