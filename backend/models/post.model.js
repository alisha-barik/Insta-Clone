import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    caption: { type: String, default: "" },
    title: { type: String, default: "" },
    location: { 
    city: { type: String, default: "" },
    country: { type: String, default: "" },
    },
    category: { type: String, default: "" }, // ✅ fixed typo (was cataeory)
    travelDate: { type: Date, default: "" },
    tags: { type: [String], default: [] },
    rating: { type: Number, default: 0 }, // e.g. 4.5
    isCompanionPost: { type: Boolean, default: false },
    // 🔹 Companion Trip Fields
    companionDetails: {
      tripTitle: { type: String, default: "" },
      travelDuration: { type: String, default: "" },
      destinations: { type: [String], default: [] }, // e.g. ["Goa", "Kerala"]
      companionsNeeded: { type: Number, default: 1 },
      tripType: { type: String, default: "" }, // e.g. "Adventure", "Leisure"
      expiresAt: { type: Date, default: null },
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError
const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;
