import sharp from "sharp";
import Post from "../models/post.model.js";
import { Comment } from "../models/commnet.model.js";
import cloudinary from "../utils/coudinary.js";
import User from "../models/user.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const addNewPost = async (req, res) => {
  try {
    console.log("detaillssss comp ----", req.body);

    const {
      title,
      caption,
      city,
      country,
      category,
      travelDate,
      rating,
      isCompanionPost,
    } = req.body;

    // normalize tags
    const tags = req.body.tags ? [].concat(req.body.tags).filter(Boolean) : [];

    // ============================
    // Companion details handling
    // ============================
    let companionDetails;

    if (req.body.companionDetails) {
      // Case 1: frontend sent as object
      const c = req.body.companionDetails;
      companionDetails = {
        tripTitle: c.tripTitle || "",
        travelDuration: c.travelDuration || "",
        companionsNeeded: c.companionsNeeded || 1,
        tripType: c.tripType || "",
        destinations: c.destinations ? [].concat(c.destinations).filter(Boolean) : [],
        expiresAt: c.expiresAt || null,
      };
    } else if (req.body["companionDetails[tripTitle]"]) {
      // Case 2: frontend sent as bracket notation (form-data)
      const destinations = req.body["companionDetails[destinations]"]
        ? [].concat(req.body["companionDetails[destinations]"]).filter(Boolean)
        : [];

      companionDetails = {
        tripTitle: req.body["companionDetails[tripTitle]"] || "",
        travelDuration: req.body["companionDetails[travelDuration]"] || "",
        companionsNeeded: req.body["companionDetails[companionsNeeded]"] || 1,
        tripType: req.body["companionDetails[tripType]"] || "",
        destinations,
        expiresAt: req.body["companionDetails[expiresAt]"] || null,
      };
    }

    // ============================
    // Image handling
    // ============================
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    // optimize with sharp
    const optimizedImageBuffer = await sharp(req.file.buffer)
      .resize({ width: 800, height: 800, fit: "inside" })
      .toFormat("jpeg", { quality: 80 })
      .toBuffer();

    // convert to data URI
    const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
      "base64"
    )}`;

    // upload to Cloudinary
    const cloudResponse = await cloudinary.uploader.upload(fileUri);

    // ============================
    // Create post
    // ============================
    const post = await Post.create({
      image: cloudResponse.secure_url,
      title,
      caption,
      location: { city, country },
      category,
      travelDate,
      rating: rating || 0,
      tags,
      isCompanionPost: isCompanionPost === "true" || isCompanionPost === true,
      companionDetails,
      author: req.id,
    });

    // push post id to user
    const user = await User.findById(req.id);
    if (user) {
      user.posts.push(post._id);
      await user.save();
    }

    // populate author info (hide password)
    await post.populate({ path: "author", select: "-password" });

    res.status(201).json({ success: true, message: "Post created!", post });
  } catch (error) {
    console.error("Add post error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};


export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "username profilePic" })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          select: "username profilePic",
        },
      });

    return res.status(200).json({
      posts,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: authorId })
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "username profilePic" })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          select: "username profilePic",
        },
      });

    return res.status(200).json({
      posts,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const likePost = async (req, res) => {
  try {
    const likeKrneWalaUser = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ message: "Post not found", success: false });

    //like logic
    await post.updateOne({ $addToSet: { likes: likeKrneWalaUser } });
    await post.save();

    const user = await User.findById(likeKrneWalaUser).select(
      "username profilePic"
    );
    const postOwnerId = post.author.toString();
    console.log("postOwnerId------>>>", postOwnerId, likeKrneWalaUser);
    if (postOwnerId !== likeKrneWalaUser) {
      const notification = {
        type: "like",
        userId: likeKrneWalaUser,
        userDetails: user,
        postId,
        message: "Your Post is being Liked",
      };
      console.log("notification------>>>", notification);
      const postOwnerSocketid = getReceiverSocketId(postOwnerId);
      io.to(postOwnerSocketid).emit("notification", notification);
    }
    return res
      .status(200)
      .json({ message: "Post liked brother", success: true });
  } catch (err) {
    console.log(err);
  }
};

export const dislikePost = async (req, res) => {
  try {
    const likeKrneWalaUser = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ message: "Post not found", success: false });

    //like logic
    await post.updateOne({ $pull: { likes: likeKrneWalaUser } });
    await post.save();

    const user = await User.findById(likeKrneWalaUser).select(
      "username profilePic"
    );
    const postOwnerId = post.author.toString();
    if (postOwnerId !== likeKrneWalaUser) {
      const notification = {
        type: "dislike",
        userId: likeKrneWalaUser,
        userDetails: user,
        postId,
        message: "Your Post is being Liked",
      };
      const postOwnerSocketid = getReceiverSocketId(postOwnerId);
      io.to(postOwnerSocketid).emit("notification", notification);
    }

    return res
      .status(200)
      .json({ message: "Post disliked brother", success: true });
  } catch (err) {
    console.log(err);
  }
};

export const addComment = async (req, res) => {
  try {
    const commentKrneWalaUser = req.id;
    const postId = req.params.id;
    const { text } = req.body;

    if (!text)
      return res
        .status(400)
        .json({ message: "text is required", success: false });

    const post = await Post.findById(postId).populate({
      path: "comments",
      populate: {
        path: "author",
        select: "username profilePic",
      },
    });

    if (!post)
      return res
        .status(404)
        .json({ message: "Post not found", success: false });

    const newComment = await Comment.create({
      text,
      author: commentKrneWalaUser,
      post: postId,
    });

    const comment = await Comment.findById(newComment._id).populate({
      path: "author",
      select: "username profilePic",
    });

    post.comments.push(comment._id);
    await post.save();

    return res
      .status(201)
      .json({ message: "Comment added", success: true, comment });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const getCommentsOfPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({ post: postId }).populate(
      "author",
      "username profilePic"
    );

    if (!comments || comments.length === 0)
      return res
        .status(404)
        .json({ message: "No comments found", success: false });

    return res
      .status(200)
      .json({ message: "Post disliked brother", success: true, comments });
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const authorId = req.id;
    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ message: "Post not found", success: false });

    if (post.author.toString() !== authorId)
      return res
        .status(403)
        .json({ message: "unathorised user", success: false, comments });

    //deldet post
    await Post.findByIdAndDelete(postId);

    //remove the post id from the user's post.
    const user = await User.findById(authorId);
    user.posts = user.posts.filter((id) => id.toString() !== postId);
    await user.save();

    //delete associted comments of that post
    await Comment.deleteMany({ post: postId });

    return res.status(200).json({ message: "posst deleted", success: true });
  } catch (err) {
    console.log(err);
  }
};

export const bookmarkPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const authorId = req.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found", success: false });
    }

    const user = await User.findById(authorId);

    let actionType;
    if (user.bookmarks.includes(post._id)) {
      // remove from bookmarks
      user.bookmarks.pull(post._id);
      actionType = "unsaved";
    } else {
      // add to bookmarks
      user.bookmarks.addToSet(post._id);
      actionType = "saved";
    }

    await user.save();

    return res.status(200).json({
      type: actionType,
      bookmarked: actionType === "saved", // <-- boolean for frontend
      message:
        actionType === "saved"
          ? "Post bookmarked"
          : "Post removed from bookmark",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Get single post by id
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id)
      .populate("author", "username profilePicture")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "username profilePicture",
        },
      });

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res.status(200).json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
