import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import axios from "axios";
import {
  Heart,
  HeartIcon,
  Home,
  icons,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { setAuthUser } from '@/redux/authSlice'
import { useDispatch, useSelector } from "react-redux";
import CreatePost from "./CreatePost";

const LeftSidebar = () => {
  const navigate = useNavigate();
const {user} = useSelector(store=>store.auth);
const dispatch = useDispatch();
const [open, setOpen] = useState(false);

const sidebarItems = [
  { icon: <Home />, text: "Home" },
  { icon: <Search />, text: "Search" },
  { icon: <TrendingUp />, text: "Explore" },
  { icon: <MessageCircle />, text: "Message" },
  { icon: <HeartIcon />, text: "Notifications" },
  { icon: <PlusSquare />, text: "Create" },
  {
    icon: (
      <Avatar className="rounded-lg w-6 h-6">
        <AvatarImage
          className="rounded-lg"
          src={user?.profilePic}
        />
        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
      </Avatar>
    ),
    text: "Profile",
  },
  { icon: <LogOut />, text: "Logout" },
];


  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(null))
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error); // log the full error for debugging
      const message = error?.response?.data?.message || "Logout failed";
      toast.error(message);
    }
  };
  const sidebarHandler = (textType) => {
    if (textType === "Logout") {
      logoutHandler();
    }
    else if(textType === "Create"){
      console.log(textType,"tgbhynj")
       setOpen(true);
    }



  };
  return (
    <div className="fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen">
      <div className="flex flex-col">
        <h1 className="my-8 pl-3 font-bold text-xl">LOGO</h1>
     
      <div>
        {sidebarItems.map((item, index) => {
          return (
            <div
              onClick={() => sidebarHandler(item.text)}
              key={index}
              className="flex gap-2 items-center relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3"
            >
              {item.icon}
              <span>{item.text}</span>
            </div>
          );
        })}
      </div>
       </div>
          <CreatePost open={open} setOpen={setOpen}/>
    </div>

  );
};

export default LeftSidebar;
