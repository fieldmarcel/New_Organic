import mongoose, { Schema } from "mongoose";

const userRelationshipSchema = new Schema(
  {
    follower: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    following: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  },
  { timestamps: true }
);

export const UserRelationship = mongoose.model("UserRelationship", userRelationshipSchema);