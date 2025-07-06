import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React, { useRef } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef();
  const createPostHandler = async (e) => {
    e.preventDefault();
    try {
      // your logic
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        {/* 👇 Add DialogTitle for accessibility */}
        <DialogTitle>Create a New Post</DialogTitle>
        <div onClick={createPostHandler} className="flex gap-3 items-center">
          <Avatar>
            <AvatarImage src="" alt="image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-xs">Username</h1>
            <span className="text-gray-600 text-xs">Bio here....</span>
          </div>
        </div>
        <Textarea
          className="focus-visible:ring-transparent border-none"
          placeholder="write a caption..."
        />
        <input ref={imageRef} type="file" className="hidden" />
        <Button
          onClick={() => imageRef.current.click()}
          className="w-fit mx-auto bg-[#0095F6] hover:bg-[#258bcf]"
        >
          Select from computer
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
