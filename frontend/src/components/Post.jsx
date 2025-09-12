import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import {
  Bookmark,
  MessageCircle,
  Calendar,
  Clock,
  MoreHorizontal,
  Send,
  BookmarkCheck,
  Users,
  MapPin,
  Star,
  Heart,
  Share,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import CommentDialog from "./CommentDialog";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setPosts, setSelectedPost } from "@/redux/postSlice";
import { Badge } from "./ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { setSelectedUser, toggleFollow } from "@/redux/authSlice";

const Post = ({ post }) => {
  console.log("Posttttt---", post);
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const { posts } = useSelector((store) => store.post);
  const { user } = useSelector((store) => store.auth);
  const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
  const [postLike, setPostLike] = useState(post.likes.length);
  const [comment, setComment] = useState(post.comments);
  const [bookmarked, setBookmarked] = useState(post.isBookmarked || false);
  const [postFilter, setPostFilter] = useState("all");
  console.log("userrrrr---", user);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    const inpuText = e.target.value;
    if (inpuText.trim()) {
      setText(inpuText);
    } else {
      setText("");
    }
  };

  const prioritizedPosts = [...posts].sort((a, b) => {
    const aTravelScore = calculateTravelScore(a);
    const bTravelScore = calculateTravelScore(b);

    // Boost companion posts slightly in ranking
    const aBoost = a.isCompanionPost ? 2 : 0;
    const bBoost = b.isCompanionPost ? 2 : 0;

    return bTravelScore - aTravelScore;
  });

  function calculateTravelScore(post) {
    let score = 0;

    // Higher score for meaningful caption (longer, descriptive)
    if (post.caption.length > 50) score += 3;
    if (post.caption.length > 100) score += 2;

    // Higher score for specific location
    if (post.locatio?.city && post.location?.country) score += 5;

    // Higher score for travel-related tags
    const travelTags = [
      "travel",
      "adventure",
      "food",
      "culture",
      "nature",
      "beach",
      "mountain",
      "city",
    ];
    const travelTagCount = post.tags?.filter((tag) =>
      travelTags.some((travelTag) => tag.toLowerCase().includes(travelTag))
    )?.length;
    score += travelTagCount * 2;

    // Higher score for rating (shows it's a recommendation)
    if (post.rating) score += post.rating;

    // Higher score for certain categories
    if (["Adventure", "Culture", "Nature"].includes(post.category)) score += 3;

    return score;
  }

  const handleInterest = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId && post.isCompanionPost) {
          const currentInterested = post.interestedUsers || [];
          const isAlreadyInterested =
            currentInterested.includes("current-user");

          return {
            ...post,
            interestedUsers: isAlreadyInterested
              ? currentInterested?.filter((id) => id !== "current-user")
              : [...currentInterested, "current-user"],
          };
        }
        return post;
      })
    );
  };

  const isExpired = (expiresAt) => {
    return new Date(expiresAt) < new Date();
  };

  const likeOrDislikeHandler = async () => {
    console.log("heeeeeeeee like");
    try {
      const action = liked ? "dislike" : "like";
      const res = await axios.get(
        `http://localhost:8000/api/v1/post/${post._id}/${action}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        const updatedLikes = liked ? postLike - 1 : postLike + 1;
        setPostLike(updatedLikes);
        setLiked(!liked);

        const updatedPostdata = posts.map((p) =>
          p._id === post._id
            ? {
                ...p,
                likes: liked
                  ? p.likes?.filter((id) => id !== user._id)
                  : [...p.likes, user._id],
              }
            : p
        );
        dispatch(setPosts(updatedPostdata));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const followUnfollowHandler = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/followorunfollow/${post?.author?._id}`,
        {}, // send empty body
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(toggleFollow(post.author._id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const commentHandler = async () => {
    console.log("hello bro");
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/post/${post?._id}/comment`,
        { text },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);

        const updatedPostdata = posts.map((p) =>
          p._id === post._id ? { ...p, comments: updatedCommentData } : p
        );

        dispatch(setPosts(updatedPostdata));
        toast.success(res.data.message);
        setText("");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const deletePostHandler = async () => {
    console.log("heeeeeeeee");
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/post/delete/${post?._id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        const updatedPostdata = posts?.filter(
          (postItem) => postItem?._id !== post?._id
        );
        dispatch(setPosts(updatedPostdata));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const bookMarkHandler = async () => {
    console.log("heeeeeeeee like");
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/post/${post._id}/bookmark`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        if (res.data.type === "saved") {
          setBookmarked(true);
        } else if (res.data.type === "unsaved") {
          setBookmarked(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const enquaryHandle = () => {
    dispatch(setSelectedUser(post.author));
    console.log("author idddddd", post.author);
    navigate("/chat");
  };
  return (
    <>
      {/* Posts */}
      <div className="space-y-8 mb-4">
        <article
          key={post.id}
          className={`bg-white rounded-2xl border overflow-hidden hover:shadow-lg transition-all duration-300 ${
            post.isCompanionPost
              ? "border-green-300 shadow-green-50"
              : "border-gray-200"
          }`}
        >
          {/* Companion Post Badge */}
          {post.isCompanionPost && (
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 text-sm font-medium flex items-center space-x-2">
              <Users size={16} />
              <span>🤝 Looking for Travel Companion</span>
              {post.companionDetails &&
                isExpired(post.companionDetails.expiresAt) && (
                  <span className="ml-auto bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                    Expired
                  </span>
                )}
            </div>
          )}

          {/* Post Header */}
          <div className="flex items-center justify-between p-4">
           
            <div className="flex items-center space-x-3">
               <Link to={`/profile/${post.author?._id}`}>
              <img
                src={post.author?.profilePic}
                alt={post.author?.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              </Link>
              <div>
                 <Link to={`/profile/${post.author?._id}`}>
                <div className="flex items-center space-x-2">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {post.author.username}
                    </h3>
                  </div>
                  <div>
                    {" "}
                    {user?._id === post.author._id && (
                      <Badge
                        variant="secondary"
                        className="flex items-center space-x-1 bg-pink-100 text-pink-500 px-2 py-1 rounded-full text-xs"
                      >
                        Author
                      </Badge>
                    )}
                  </div>
                
                </div></Link>
                <div className="flex items-center space-x-1 text-gray-500 text-sm">
                  <MapPin size={12} />
                  <span>
                    {post.location?.city}, {post.location?.country}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <MoreHorizontal className="cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="flex flex-col items-center text-sm text-center">
                  {user?._id !== post.author._id &&
                    (user?.following?.includes(post.author._id) ? (
                      <Button
                        variant="ghost"
                        className="cursor-pointer w-fit text-[#ED4956] font-bold"
                        onClick={followUnfollowHandler}
                      >
                        Unfollow
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        className="cursor-pointer w-fit text-blue-500 font-bold"
                        onClick={followUnfollowHandler}
                      >
                        Follow
                      </Button>
                    ))}
                  <Button variant="ghost" className="cursor-pointer w-fit">
                    Add to favorite
                  </Button>
                  {user && user._id === post.author._id && (
                    <Button
                      variant="ghost"
                      className="cursor-pointer w-fit"
                      onClick={deletePostHandler}
                    >
                      Delete
                    </Button>
                  )}
                </DialogContent>
              </Dialog>
              {post.isCompanionPost && post.companionDetails && (
                <div className="flex items-center space-x-1 bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs">
                  <Users size={12} />
                  <span>{post.companionDetails.companionsNeeded} needed</span>
                </div>
              )}
              {post.rating && (
                <div className="flex items-center space-x-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full text-xs">
                  <Star size={12} className="fill-current" />
                  <span>{post.rating}/5</span>
                </div>
              )}
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  post.category === "Adventure"
                    ? "bg-green-100 text-green-700"
                    : post.category === "Food"
                    ? "bg-orange-100 text-orange-700"
                    : post.category === "Culture"
                    ? "bg-purple-100 text-purple-700"
                    : post.category === "Nature"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {post.category}
              </span>
            </div>
          </div>

          {/* Post Image */}
          <div className="relative">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-80 object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Post Actions */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4">
                <button
                  onClick={likeOrDislikeHandler}
                  className={`flex items-center space-x-2 transition-colors duration-200 ${
                    liked ? "text-red-500" : "text-gray-600 hover:text-red-500"
                  }`}
                >
                  <Heart size={24} className={liked ? "fill-current" : ""} />
                  <span className="font-medium">{post.likes.length}</span>
                </button>
                <button
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  onClick={() => {
                    dispatch(setSelectedPost(post));
                    setOpen(true);
                  }}
                >
                  <MessageCircle size={24} />
                  <span className="font-medium">{post.comments?.length}</span>
                </button>
                <button className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  <Share size={24} />
                </button>
              </div>
              {bookmarked ? (
                <BookmarkCheck
                  className="cursor-pointer text-blue-500 hover:text-blue-700"
                  onClick={bookMarkHandler}
                />
              ) : (
                <Bookmark
                  className="cursor-pointer hover:text-gray-600"
                  onClick={bookMarkHandler}
                />
              )}
              {/* <button className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
                    <Bookmark size={24} />
                  </button> */}
            </div>
            <CommentDialog open={open} setOpen={setOpen} />
            {/* Post Content */}
            <div className="space-y-3">
              {/* Companion Trip Details */}
              {post.isCompanionPost && post.companionDetails && (
                <div className="bg-green-50 rounded-xl p-4 border border-green-200 space-y-3">
                  <h3 className="font-bold text-green-800 flex items-center space-x-2">
                    <Calendar size={18} />
                    <span>{post.companionDetails.tripTitle}</span>
                  </h3>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2 text-green-700">
                      <Clock size={14} />
                      <span>{post.companionDetails.travelDuration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-green-700">
                      <Users size={14} />
                      <span>
                        {post.companionDetails.companionsNeeded} companions
                        needed
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-green-800">
                      Destinations:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.companionDetails.destinations.map((dest) => (
                        <span
                          key={dest}
                          className="bg-white text-green-700 px-2 py-1 rounded-full text-xs border border-green-200"
                        >
                          📍 {dest}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                      {post.companionDetails.tripType}
                    </span>
                  <h3 className="font-bold text-green-800 flex items-center space-x-2" onClick={() => {
                    enquaryHandle();
                    }}>
                    <MessageCircle size={18} />
                    <span>Enquary</span>
                  </h3>
                    {!isExpired(post.companionDetails.expiresAt) && (
                      <button
                        onClick={() => handleInterest(post.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          post.interestedUsers?.includes("current-user")
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-white text-green-600 border border-green-300 hover:bg-green-50"
                        }`}
                      >
                        {post.interestedUsers?.includes("current-user")
                          ? "✓ Interested"
                          : "I'm Interested"}
                      </button>
                    )}
                  </div>

                  {post.interestedUsers && post.interestedUsers?.length > 0 && (
                    <div className="text-xs text-green-600 pt-2 border-t border-green-200">
                      {post.interestedUsers?.length}{" "}
                      {post.interestedUsers?.length === 1
                        ? "person is"
                        : "people are"}{" "}
                      interested
                    </div>
                  )}
                </div>
              )}

              <h2 className="text-lg font-bold text-gray-800">{post.title}</h2>
              <p className="text-gray-700 leading-relaxed">{post.caption}</p>

              {/* Tags */}
              {post.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 5).map((tag) => (
                    <span
                      key={tag}
                      className="text-blue-600 text-sm font-medium hover:underline cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                  {post.tags?.length > 5 && (
                    <span className="text-gray-400 text-sm">
                      +{post.tags?.length - 5} more
                    </span>
                  )}
                </div>
              )}

              <div className="text-sm text-gray-500">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default Post;
