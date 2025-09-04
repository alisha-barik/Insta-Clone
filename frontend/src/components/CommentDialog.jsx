import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { MoreHorizontal } from "lucide-react";
import Comment from "./Comment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setPosts } from "@/redux/postSlice";

const CommentDialog = ({ open, setOpen }) => {
const [text, setText] = useState("");
const dispatch = useDispatch();
  const { selectedPost, posts} = useSelector(store=>store.post);
  console.log("selectedPost------", selectedPost);
  const [comment, setComment] = useState(selectedPost?.comments);
const {user} = useSelector(store=>store.auth);

useEffect(()=>{
  if(selectedPost){
    setComment(selectedPost.comments);
  }
}, [selectedPost]);
const changeEventHandler = (e) =>{
  const inputText = e.target.value;
  if(inputText.trim()){
    setText(inputText);
  } 
  else{
    setText("");
  }
}
  const sendMessageHandler = async () => {
    console.log("hello bro");
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/post/${selectedPost?._id}/comment`,
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
          p._id === selectedPost._id ? { ...p, comments: updatedCommentData } : p
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


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="p-0 flex flex-col w-auto h-auto !max-w-none !max-h-none"
      >
        <div className="flex flex-1">
          <div className="w-1/2">
            <img
              src={selectedPost?.image}
              alt="post_text"
              className="w-full h-full max-h-[90vh] object-cover rounded-l-lg"
            />
          </div>{" "}
          <div className="w-1/2 flex flex-col justify-between">
            <div className="flex justify-between items-center p-4">
              <div className="flex gap-3 items-center">
                <Link>
                  <Avatar>
                    <AvatarImage src={selectedPost?.author?.profilePic} className="h-8 w-8" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link className="font-semibold text-xs">{selectedPost?.author?.username}</Link>
                  {/* <span>Bio here.....</span> */}
                </div>
              </div>

              <Dialog className="">
                <DialogTrigger asChild>
                  <MoreHorizontal className="cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="flex flex-col items-center text-sm text-center">
                  <div className="cursor-pointer w-full text-[#ED4956] font-bold">
                    Unfollow
                  </div>
                  <div className="cursor-pointer w-full">Add to favorites</div>
                </DialogContent>
              </Dialog>
            </div>
            <hr />
            <div className="flex-1 overflow-y-auto max-h-96 p-4">
              {
                comment?.map((comment)=> <Comment key={comment._id} comment={comment} />)
              }
            </div>
            <div className="p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={text}
                  onChange={changeEventHandler}
                  placeholder="Add a comment"
                  className="w-full outline-none border border-gray-300 p-2 rounded"
                />
                <Button disabled={!text.trim()} onClick={sendMessageHandler} className="curser-pointer border border-gray-300">Send</Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
