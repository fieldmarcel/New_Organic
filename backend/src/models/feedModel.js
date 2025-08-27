import mongoose from "mongoose";

const feedSchema = new mongoose.Schema(
  {
    user: String,
    message: String,
  },
  { timestamps: true }
);

export default mongoose.model("Feed", feedSchema);
