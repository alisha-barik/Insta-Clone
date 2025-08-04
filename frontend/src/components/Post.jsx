import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import CommentDialog from "./CommentDialog";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setPosts } from "@/redux/postSlice";

const Post = ({ post }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const {posts} = useSelector(store=>store.post)
  const dispatch = useDispatch()
  const { user } = useSelector((store) => store.auth);
  const changeEventHandler = (e) => {
    const inpuText = e.target.value;
    if (inpuText.trim()) {
      setText(inpuText);
    } else {
      setText("");
    }
  };

const deletePostHandler = async () => {
  console.log("heeeeeeeee")
  try{
    const res = await axios.delete(`http://localhost:8000/api/v1/post/delete/${post?._id}`, {withCredentials:true});
    if(res.data.success){
      const updatedPostdata= posts.filter((postItem)=> postItem?._id !== post?._id);
      dispatch(setPosts(updatedPostdata));
      toast.success(res.data.message);

    }
  } catch(error){
    console.log(error);
toast.error(error.response.data.message);
  }
}

  return (
    <div className="my-8 w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between">
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
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center">
            <Button
              variant="ghost"
              className="cursor-pointer w-fit text-[#ED4956] font-bold"
            >
              Unfollow
            </Button>
            <Button variant="ghost" className="cursor-pointer w-fit">
              Add to favorite
            </Button>
            {user && user._id === post.author._id && (
              <Button variant="ghost" className="cursor-pointer w-fit" onClick={deletePostHandler}>
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
          <FaHeart
            size={"22px"}
            className="cursor-pointer hover:text-gray-600"
          />
          <MessageCircle
            className="cursor-pointer hover:text-gray-600"
            onClick={() => setOpen(true)}
          />
          <Send className="cursor-pointer hover:text-gray-600" />
        </div>
        <Bookmark className="cursor-pointer hover:text-gray-600" />
      </div>
      <span className=" font-medium block mb-2">{post.likes.length} likes</span>
      <p>
        <span className="font-medium mr-2">{post.author.username}</span>
        {post.caption}
      </p>
      <span
        onClick={() => setOpen(true)}
        className="cursor-pointer text-sm text-gray-400"
      >
        View all {post.comments.length} comments
      </span>
      <CommentDialog open={open} setOpen={setOpen} />
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={changeEventHandler}
          className="outline-none text-sm w-full"
        />
        {text && <span className="text-[#3BADF8]">Post</span>}
      </div>
    </div>
  );
};

export default Post;
