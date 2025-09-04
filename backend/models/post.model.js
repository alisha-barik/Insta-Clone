import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  image: { type: String, required: true },
  caption: { type: String, default: "" },
  title: { type: String, default: "" },
  city: { type: String, default: "" },
  country: { type: String, default: "" },
  cataeory: { type: String, default: "" },
  travelDate: { type: String, default: "" },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
}, { timestamps: true });

// ✅ Prevent OverwriteModelError in dev (especially with nodemon)
const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;
