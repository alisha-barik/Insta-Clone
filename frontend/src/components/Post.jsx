import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send, BookmarkCheck } from "lucide-react";
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
import { Link } from "react-router-dom";

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

  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    const inpuText = e.target.value;
    if (inpuText.trim()) {
      setText(inpuText);
    } else {
      setText("");
    }
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
                  ? p.likes.filter((id) => id !== user._id)
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
        const updatedPostdata = posts.filter(
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

  return (
<div className="my-8 w-full max-w-full md:max-w-md mx-auto">
      <div className="flex items-center justify-between">
        <Link to={`/profile/${post.author?._id}`}>
          {" "}
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={post.author?.profilePic}
                alt="post_image"
                className="h-8 w-8"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1>{post.author.username}</h1>
            {user?._id === post.author._id && (
              <Badge variant="secondary">Author</Badge>
            )}
          </div>
        </Link>

        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center">
                        {user?._id !== post.author._id && (
                         <Button
              variant="ghost"
              className="cursor-pointer w-fit text-[#ED4956] font-bold"
            >
              Unfollow
            </Button>
            )}

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
      </div>
      <img
        className="rounded-sm my-2 w-full aspect-square object-center"
        src={post.image}
        alt="post_image"
      />

      <div className="flex  items-center justify-between m-y">
        <div className="flex items-center gap-3">
          {liked ? (
            <FaHeart
              onClick={likeOrDislikeHandler}
              size={"22px"}
              className="cursor-pointer text-red-500 hover:text-red-600"
            />
          ) : (
            <FaRegHeart
              onClick={likeOrDislikeHandler}
              size={"22px"}
              className="cursor-pointer hover:text-gray-600"
            />
          )}
          <MessageCircle
            className="cursor-pointer hover:text-gray-600"
            onClick={() => {
              dispatch(setSelectedPost(post));
              setOpen(true);
            }}
          />
          <Send className="cursor-pointer hover:text-gray-600" />
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
      </div>
      <span className=" font-medium block mb-2">{postLike} likes</span>
      <p>
        <span className="font-medium mr-2">{post.author?.username}</span>
        {post.caption}
      </p>
      {comment?.length > 0 && (
        <span
          onClick={() => {
            dispatch(setSelectedPost(post));
            setOpen(true);
          }}
          className="cursor-pointer text-sm text-gray-400"
        >
          View all {post.comments.length} comments
        </span>
      )}

      <CommentDialog open={open} setOpen={setOpen} />
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={changeEventHandler}
          className="outline-none text-sm w-full"
        />
        {text && (
          <span
            onClick={commentHandler}
            className="text-[#3BADF8] cursor-pointer"
          >
            Post
          </span>
        )}
      </div>
    </div>
  );
};

export default Post;
