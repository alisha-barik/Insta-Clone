import React, { useState } from 'react';
import { Grid, List, MapPin, Camera, Settings, MoreHorizontal, Compass } from 'lucide-react';
import { BucketList } from './BucketList/BucketList';
import { ExperienceTab } from './Experience/ExperienceTab';
import { TravelMap } from './Map/TravelMap';
import { useDispatch, useSelector } from 'react-redux';
import useGetUserProfile from '@/hooks/useGetUserProfile';
import { Link, useParams } from 'react-router-dom';
import { Button } from './ui/button';
import axios from 'axios';
import PostsTab from './PostsTab';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [selectedPlace, setSelectedPlace] = useState(null);

  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);
  const [open, setOpen] = useState(false);
  const { userProfile, user } = useSelector((store) => store.auth);
  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const [isFollowing, setIsFollowing] = useState(true);
  const dispatch = useDispatch();
  const displayedPost =
    activeTab === "posts" ? userProfile?.posts : userProfile?.bookmarks;


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


  const tabs = [
    { id: 'posts', label: 'Posts', icon: Grid, count: 42 },
    { id: 'bucketlist', label: 'Bucket List', icon: List, count: 10 },
    { id: 'experiences', label: 'Experiences', icon: Compass, count: 4 }
  ];

  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);
    setActiveTab('experiences');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'bucketlist':
        return <BucketList />;
      case 'experiences':
        return <ExperienceTab selectedPlace={selectedPlace} />;
      case 'posts':
      default:
        return <PostsTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white shadow-sm">
          <div className="px-6 py-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Profile Info */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img
                    src={userProfile?.profilePic}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white"></div>
                </div>
                
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-2xl font-bold text-gray-800">Alex Chen</h1>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Settings className="w-5 h-5" />
                    </button>
                                  <div className="flex items-center gap-2 flex-wrap">
               
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
            
                  </div>
                  <p className="text-gray-600 mb-3 max-w-md">
                    🌍 Digital nomad exploring the world one adventure at a time. 
                    Currently based in Mumbai, India. Love mountains, beaches, and authentic local food! ✈️
                  </p>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-gray-800">42</div>
                      <div className="text-gray-600">Posts</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-gray-800">1.2k</div>
                      <div className="text-gray-600">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-gray-800">890</div>
                      <div className="text-gray-600">Following</div>
                    </div>
                  </div>
                </div>
              </div>

            {/* Action Buttons */}
            {/* <div className="flex items-center space-x-3 mt-6">
              <div className="flex items-center gap-2 flex-wrap">
               
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
            </div> */}
 </div>
              {/* Travel Map */}
              <div className="flex-1 w-full">
                <TravelMap onPlaceSelect={handlePlaceSelect} />
              </div>
            </div>


         

          {/* Navigation Tabs */}
          <div className="border-t border-gray-200">
            <div className="flex justify-center">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 border-t-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="py-8">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Profile;