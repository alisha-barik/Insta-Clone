import useGetUserProfile from "@/hooks/useGetUserProfile";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { AtSign, Heart, MessageCircle } from "lucide-react";
import { Badge } from "./ui/badge";
import VisitedPlacesMap from "./VisitedPlacesMap";
import { toggleFollow } from "@/redux/authSlice";
import axios from "axios";
import { toast } from "sonner";
import { setSelectedPost } from "@/redux/postSlice";
import CommentDialog from "./CommentDialog";

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);
  const [open, setOpen] = useState(false);
  const { userProfile, user } = useSelector((store) => store.auth);
  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const [isFollowing, setIsFollowing] = useState(true);
  const [activeTab, setActiveTab] = useState("posts");
  const dispatch = useDispatch();
  const displayedPost =
    activeTab === "posts" ? userProfile?.posts : userProfile?.bookmarks;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const followUnfollowHandler = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/followorunfollow/${userProfile?._id}`,
        {}, // send empty body
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(toggleFollow(userProfile._id));
      }
    } catch (error) {
      console.log(error);
    }
  };
const handlePostClick = async (post) => {
  try {
    // Check if we already have the full post data (with populated comments)
    if (post.comments && post.comments.length > 0 && typeof post.comments[0] === 'object') {
      // We already have the full post data with populated comments
      dispatch(setSelectedPost(post));
      setOpen(true);
    } else {
      // We need to fetch the full post data
      const res = await axios.get(
        `http://localhost:8000/api/v1/post/${post}`,
        { withCredentials: true }
      );
      
      if (res.data.success) {
        dispatch(setSelectedPost(res.data.post));
        setOpen(true);
      }
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to load post details");
  }
};

  return (
    <div className="flex max-w-5xl justify-center mx-auto px-2 sm:px-4">
      {/* 👇 Added pb-24 to leave space for bottom navbar (adjust based on navbar height) */}
      <div className="flex flex-col gap-8 sm:gap-12 md:gap-20 p-4 sm:p-6 md:p-8 w-full pb-24">
        {/* Profile Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="flex items-center justify-center">
            <img
              src={userProfile?.profilePic}
              alt="profile_pic"
              className="w-40 h-40 rounded-full object-cover"
            />
          </section>

          <section>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-lg pr-4">{userProfile?.username}</span>
                {isLoggedInUserProfile ? (
                  <>
                    <Link to="/account/edit">
                      <Button
                        variant="secondary"
                        className="hover:bg-gray-200 h-8"
                      >
                        Edit profile
                      </Button>
                    </Link>
                  </>
                ) : user?.following?.includes(userProfile?._id) ? (
                  <>
                    <Button
                      variant=""
                      className="hcursor-pointer w-fit bg-[#ED4956] hover:bg-[#e92a2a] text-white font-bold"
                      onClick={followUnfollowHandler}
                    >
                      Unfollow
                    </Button>
                    <Button
                      variant="secondary"
                      className="h-8 bg-gray-100 hover:bg-gray-200"
                    >
                      Message
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className="bg-[#4A5DF9] text-white hover:bg-[#2350d6] h-8"
                      onClick={followUnfollowHandler}
                    >
                      Follow
                    </Button>
                    <Button
                      variant="secondary"
                      className="h-8 bg-gray-100 hover:bg-gray-200"
                    >
                      Message
                    </Button>
                  </>
                )}
              </div>

              <div className="flex items-center gap-4">
                <p>
                  <span className="font-semibold">
                    {userProfile?.posts?.length}{" "}
                  </span>
                  posts
                </p>
                <p>
                  <span className="font-semibold">
                    {userProfile?.followers?.length}{" "}
                  </span>
                  followers
                </p>
                <p>
                  <span className="font-semibold">
                    {userProfile?.following?.length}{" "}
                  </span>
                  following
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-semibold">
                  {userProfile?.bio || "bio here..."}
                </span>
                <Badge className="w-fit" variant="secondary">
                  <AtSign />
                  <span className="pl-1">{userProfile?.username}</span>
                </Badge>
              </div>
            </div>
          </section>
        </div>

        {/* Visited Places */}
        <div className="border-t border-t-gray-200 mt-6">
          <h2 className="text-lg font-bold mb-2">🌍 Visited Places</h2>
          {userProfile?.places?.length > 0 ? (
            <VisitedPlacesMap places={userProfile.places} />
          ) : (
            <p className="text-sm text-gray-500">No places added yet.</p>
          )}
        </div>

        {/* Tabs */}
        <div className="border-t border-t-gray-200">
          <div className="flex items-center justify-center gap-10 text-sm">
            <span
              className={`py-3 cursor-pointer ${
                activeTab === "posts" ? "font-bold" : ""
              }`}
              onClick={() => handleTabChange("posts")}
            >
              POSTS
            </span>
            <span
              className={`py-3 cursor-pointer ${
                activeTab === "saved" ? "font-bold" : ""
              }`}
              onClick={() => handleTabChange("saved")}
            >
              SAVED
            </span>
            <span className="py-3 cursor-pointer">REELS</span>
            <span className="py-3 cursor-pointer">TAGS</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {displayedPost?.map((post) => (
              <div
                key={post?._id}
                className="relative group cursor-pointer"
  onClick={() => handlePostClick(post._id)}

              >
                <img
                  src={post.image}
                  alt="postimage"
                  className="rounded-sm my-2 w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center text-white space-x-4">
                    <button className="flex items-center gap-2 hover:text-gray-300">
                      <Heart />
                      <span>{post?.likes?.length}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-gray-300">
                      <MessageCircle />
                      <span>{post?.comments?.length}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CommentDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
