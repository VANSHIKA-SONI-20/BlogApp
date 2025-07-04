// models/Post.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,
    content: String,
    featuredImage: String,
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
