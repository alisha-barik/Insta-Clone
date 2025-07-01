import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  image: { type: String, required: true },
  caption: { type: String, default: "" },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
}, { timestamps: true });

// ✅ Prevent OverwriteModelError in dev (especially with nodemon)
const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;
