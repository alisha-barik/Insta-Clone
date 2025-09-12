import React from 'react';
import { Heart, MessageCircle, Share, MapPin } from 'lucide-react';
import { useSelector } from 'react-redux';

const PostsTab = () => {

const userPosts = useSelector(store=>store.auth);
const posts = userPosts.user.posts

  const postss = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Magical Sunrise at Tiger Hill",
      caption: "Woke up at 4 AM to catch this incredible sunrise over the Himalayas from Tiger Hill in Darjeeling. The golden light hitting the snow-capped peaks was absolutely breathtaking! ☀️🏔️",
      likes: 234,
      comments: 18,
      location: "Tiger Hill, Darjeeling",
      category: "Nature",
      rating: 5,
      tags: ["sunrise", "himalayas", "darjeeling"]
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Epic Trek to Kedarkantha Peak",
      caption: "Just completed the most challenging yet rewarding trek of my life! 6 days through snow-covered trails, camping under starlit skies, and finally reaching the summit at 12,500 feet. The view was worth every step! 🏔️❄️",
      likes: 187,
      comments: 12,
      location: "Kedarkantha Peak, Uttarakhand",
      category: "Adventure",
      rating: 5,
      tags: ["trekking", "himalayas", "adventure"]
    },
    {
      id: 3,
      image: "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Street Food Paradise in Bangkok",
      caption: "Spent the entire day exploring Bangkok's street food scene! From pad thai to mango sticky rice, every bite was an explosion of flavors. The local vendors were so welcoming and taught me about traditional cooking methods 🍜🥭",
      likes: 156,
      comments: 9,
      location: "Chatuchak Market, Bangkok",
      category: "Food",
      rating: 5,
      tags: ["streetfood", "bangkok", "thailand"]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold text-gray-800 mb-2">{post.title}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.caption}</p>
            <p className="text-gray-500 text-xs mb-3 flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              {post.location.city}, {post.location.country}
            </p>
            
            {/* Rating and Category */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-sm ${i < post.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                    ⭐
                  </span>
                ))}
              </div>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                {post.category}
              </span>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {post.tags.map((tag, index) => (
                <span key={index} className="text-blue-600 text-xs">
                  #{tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between text-gray-600">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span className="text-xs">{post.likes}</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-xs">{post.comments}</span>
                </button>
              </div>
              <button className="hover:text-blue-500 transition-colors">
                <Share className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsTab;