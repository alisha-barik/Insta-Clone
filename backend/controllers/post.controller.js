import sharp from "sharp";
import Post from "../models/post.model.js";
import {Comment} from "../models/commnet.model.js";
import cloudinary from "../utils/coudinary.js";
import User from "../models/user.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";


export const addNewPost = async (req, res) => {
    try {
        const { caption } = req.body;
        const image = req.file;
        const authorId = req.id;

        if (!image) return res.status(400).json({ message: 'Image required' });

        // image upload 
        const optimizedImageBuffer = await sharp(image.buffer)
            .resize({ width: 800, height: 800, fit: 'inside' })
            .toFormat('jpeg', { quality: 80 })
            .toBuffer();

        // buffer to data uri
        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
        const cloudResponse = await cloudinary.uploader.upload(fileUri);
        const post = await Post.create({
            caption,
            image: cloudResponse.secure_url,
            author: authorId
        });
        const user = await User.findById(authorId);
        if (user) {
            user.posts.push(post._id);
            await user.save();
        }

        await post.populate({ path: 'author', select: '-password' });

        return res.status(201).json({
            message: 'New post added',
            post,
            success: true,
        })

    } catch (error) {
        console.log(error);
    }
}

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
    const post = await Post.findById( postId );
    if (!post)
      return res
        .status(404)
        .json({ message: "Post not found", success: false });

    //like logic
    await post.updateOne({ $addToSet: { likes: likeKrneWalaUser } });
    await post.save();

    const user = await User.findById(likeKrneWalaUser).select('username profilePic')
 const postOwnerId = post.author.toString();
 console.log("postOwnerId------>>>",postOwnerId,likeKrneWalaUser);
 if(postOwnerId !== likeKrneWalaUser){
  const notification = {
    type:'like',
    userId:likeKrneWalaUser,
    userDetails:user,
    postId,
    message:"Your Post is being Liked"
  }
   console.log("notification------>>>",notification);
  const postOwnerSocketid = getReceiverSocketId(postOwnerId);
  io.to(postOwnerSocketid).emit('notification', notification);
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
    const post = await Post.findById( postId );
    if (!post)
      return res
        .status(404)
        .json({ message: "Post not found", success: false });

    //like logic
    await post.updateOne({ $pull: { likes: likeKrneWalaUser } });
    await post.save();

    const user = await User.findById(likeKrneWalaUser).select('username profilePic')
 const postOwnerId = post.author.toString();
 if(postOwnerId !== likeKrneWalaUser){
  const notification = {
    type:'dislike',
    userId:likeKrneWalaUser,
    userDetails:user,
    postId,
    message:"Your Post is being Liked"
  }
  const postOwnerSocketid = getReceiverSocketId(postOwnerId);
  io.to(postOwnerSocketid).emit('notification', notification);
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

    const post = await Post.findById(postId);
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
    if (!comment)
      return res
        .status(404)
        .json({ message: "Post not found", success: false });

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
      return res.status(404).json({ message: "Post not found", success: false });
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
