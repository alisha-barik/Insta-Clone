import React, { useState } from 'react'
import Post from './Post'
import { useSelector } from 'react-redux'
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

const AllPosts = () => {
  const {posts} = useSelector(store=>store.post);
  const [postFilter, setPostFilter] = useState("all");
  console.log(posts);
    // Prioritize travel-related posts (those with meaningful captions, locations, or travel tags)
  let filteredPosts = posts;
  if (postFilter === "companion") {
    filteredPosts = posts.filter((post) => post.isCompanionPost);
  } else if (postFilter === "normal") {
    filteredPosts = posts.filter((post) => !post.isCompanionPost);
  }
  return (
    <div>


    <div className="flex-1 pt-20 pb-20 md:pt-24 md:pb-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Travel Feed</h2>
          <p className="text-gray-600">
            Discover inspiring travel experiences from the community
          </p>

          {/* Post Filter */}
          <div className="flex space-x-2">
            <button
              onClick={() => setPostFilter("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                postFilter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              All Posts
            </button>
            <button
              onClick={() => setPostFilter("companion")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                postFilter === "companion"
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <Users size={16} />
              <span>Looking for Companions</span>
            </button>
            <button
              onClick={() => setPostFilter("normal")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                postFilter === "normal"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              Travel Stories
            </button>
          </div>
        </div>

        {
            filteredPosts.map((post)=><Post post={post} key={post._id}/>)
        }

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-colors duration-200">
            Load More Posts
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AllPosts