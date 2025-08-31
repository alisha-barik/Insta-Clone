import React from "react";
import Feed from "./Feed";
import { Outlet } from "react-router-dom";
import RightSidebar from "./RightSidebar";
import useGetAllPost from "@/hooks/useGetAllPost";
import useGetSuggestedUsers from "@/hooks/useGetSuggestedUsers";

const Home = () => {
  useGetAllPost();
  useGetSuggestedUsers();
  return (
    <div className="flex w-full">
      <div className="flex-1 max-w-2xl mx-auto px-2">
        <Feed />
        <Outlet />
      </div>
      <RightSidebar />
    </div>
  );
};

export default Home;
