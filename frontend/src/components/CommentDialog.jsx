import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { MoreHorizontal } from "lucide-react";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const CommentDialog = ({ open, setOpen }) => {
const [text, setText] = useState("");
const changeEventHandler = (e) =>{
  const inputText = e.target.value;
  if(inputText.trim()){
    setText(inputText);
  } 
  else{
    setText("");
  }
}
const sendMessageHandler = async ()=>{
alert(text)
}

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="p-0 flex flex-col w-auto h-auto !max-w-none !max-h-none"
      >
        <div className="flex flex-1">
          <div className="w-1/2">
            <img
              src="https://www.hubspot.com/hubfs/Losing-Followers-on-Instagram.webp"
              alt="post_text"
              className="w-full h-full max-h-[90vh] object-cover rounded-l-lg"
            />
          </div>{" "}
          <div className="w-1/2 flex flex-col justify-between">
            <div className="flex justify-between items-center p-4">
              <div className="flex gap-3 items-center">
                <Link>
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link className="font-semibold text-xs">username</Link>
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
              r444444444444 eeeeeeeeeeeeeee cfffffffffff r444444444444
              eeeeeeeeeeeeeee cfffffffffff r444444444444 eeeeeeeeeeeeeee
              cfffffffffff r444444444444 eeeeeeeeeeeeeee cfffffffffff
              r444444444444 eeeeeeeeeeeeeee cfffffffffff
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
