import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/coudinary.js";
import Post from "../models/post.model.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(401)
        .json({ message: "please fill all the feilds", success: false });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(401)
        .json({ message: "Email Already Registered", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res
      .status(201)
      .json({ message: "Successfully Registered", success: true });
  } catch (err) {
    console.log(err);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .json({ message: "please fill all the feilds", success: false });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "incorrect userid or password", success: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: "incorrect userid or password", success: false });
    }

    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    //populate each post if in the posts array
    const populatedPost = await Promise.all(
      user.posts.map(async (postId) => {
        const post = await Post.findById(postId);
        if (post.author.equals(user._id)) {
          return post;
        }
        return null;
      })
    );

    user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      posts: populatedPost,
    };

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: `Welcome back ${user.username}`,
        success: true,
        user,
      });
  } catch (err) {
    console.log(err);
  }
};

export const logout = async (_, res) => {
  try {
    return res.cookie("token", "", { maxAge: 0 }).json({
      message: "Successfully Logged out",
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    let user = await User.findById(userId)
      .populate({ path: "posts", createdAt: -1 })
      .populate("bookmarks");
    return res.status(200).json({
      user,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const editProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { bio, gender, places } = req.body; // ✅ include places
    const profilePic = req.file;
    let cloudResponse;

    if (profilePic) {
      const fileUri = getDataUri(profilePic);
      cloudResponse = await cloudinary.uploader.upload(fileUri);
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User Not found.",
        success: false,
      });
    }

    // ✅ update fields if provided
    if (bio) user.bio = bio;
    if (gender) user.gender = gender;
    if (cloudResponse) user.profilePic = cloudResponse.secure_url;

    if (places) {
      const parsedPlaces =
        typeof places === "string" ? JSON.parse(places) : places;

      const normalizedPlaces = parsedPlaces.map((p) => ({
        lat: Number(p.lat),
        lng: Number(p.lng),
        name: p.name ? p.name.toLowerCase().trim() : "",
        visitedAt: p.visitedAt ? new Date(p.visitedAt) : new Date(),
      }));

      // overwrite
      user.places = normalizedPlaces;

      // OR if merging, do something like:
      // user.places = [...user.places, ...normalizedPlaces];
    }

    await user.save();

    return res.status(200).json({
      message: "Profile Updated",
      success: true,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong", success: false });
  }
};

export const getSuggestedUsers = async (req, res) => {
  try {
    const suggestedusers = await User.find({ _id: { $ne: req.id } }).select(
      "-password"
    );
    if (!suggestedusers) {
      return res.status(400).json({
        message: "no suggestion",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      users: suggestedusers,
    });
  } catch (err) {
    console.log("err-", err);
  }
};

export const followUnfollow = async (req, res) => {
  try {
    const currentUserId = req.id;
    const targetUserId = req.params.id;

    if (currentUserId === targetUserId) {
      return res.status(400).json({
        message: "You can't follow/unfollow yourself",
        success: false,
      });
    }

    const user = await User.findById(currentUserId);
    const targetUser = await User.findById(targetUserId);

    if (!user || !targetUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const isFollowing = user.following.includes(targetUserId);
    console.log("User:", user);
    console.log("Target User:", targetUser);
    console.log("Already Following?", isFollowing);

    if (isFollowing) {
      // UNFOLLOW
      await Promise.all([
        User.updateOne(
          { _id: currentUserId },
          { $pull: { following: targetUserId } }
        ),
        User.updateOne(
          { _id: targetUserId },
          { $pull: { followers: currentUserId } }
        ),
      ]);

      return res.status(200).json({
        message: "Unfollowed successfully",
        success: true,
      });
    } else {
      // FOLLOW
      await Promise.all([
        User.updateOne(
          { _id: currentUserId },
          { $push: { following: targetUserId } }
        ),
        User.updateOne(
          { _id: targetUserId },
          { $push: { followers: currentUserId } }
        ),
      ]);

      return res.status(200).json({
        message: "Followed successfully",
        success: true,
      });
    }
  } catch (err) {
    console.error("Follow/Unfollow error:", err);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
