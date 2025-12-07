import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique:true,

      // to make it easier in database searching
    },
    email: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },
    profileImage: {
      type: String,
      default: "https://cdn.pixabay.com/photo/2016/07/13/13/59/men-chef-1514505_640.png", // default avatar
    },
    password: {
      type: String, // not no.
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
    accessToken: {
      type: String,
    },
    resetOTP: Number,
resetOTPExpire: Date,

  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
