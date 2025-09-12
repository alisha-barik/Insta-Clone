import React, { useState } from 'react';
import { Heart, MessageCircle, UserPlus, Check, X } from 'lucide-react';

 const mockUsers = [
  {
    id: '1',
    username: 'wanderlust_sarah',
    name: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: '2',
    username: 'travel_marco',
    name: 'Marco Rodriguez',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: '3',
    username: 'adventure_emma',
    name: 'Emma Chen',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  }
];

 const mockPosts = [
  {
    id: '1',
    title: 'Sunset at Santorini',
    caption: 'One of the most magical sunsets I\'ve ever witnessed in Santorini. The combination of blue domes, white buildings, and golden hour light creates pure magic. This place should be on every traveler\'s bucket list!',
    image: 'https://images.pexels.com/photos/161815/santorini-oia-greece-travel-161815.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    location: {
      city: 'Santorini',
      country: 'Greece',
      coordinates: [25.4615, 36.3932]
    },
    category: 'Culture',
    tags: ['santorini', 'greece', 'sunset', 'architecture', 'mediterranean'],
    date: '2024-01-15',
    rating: 5,
    user: mockUsers[0],
    likes: 234,
    comments: 18,
    isLiked: false,
    createdAt: '2024-01-16T10:30:00Z',
    isCompanionPost: false
  },
  {
    id: '2',
    title: 'Swiss Alps Adventure',
    caption: 'Hiking through the breathtaking Swiss Alps. The fresh mountain air, crystal clear lakes, and snow-capped peaks make this an unforgettable adventure. Already planning my next trip back!',
    image: 'https://images.pexels.com/photos/917494/pexels-photo-917494.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    location: {
      city: 'Interlaken',
      country: 'Switzerland',
      coordinates: [7.8632, 46.6863]
    },
    category: 'Adventure',
    tags: ['alps', 'hiking', 'mountains', 'switzerland', 'nature'],
    date: '2024-01-10',
    rating: 5,
    user: mockUsers[1],
    likes: 156,
    comments: 12,
    isLiked: true,
    createdAt: '2024-01-11T14:45:00Z',
    isCompanionPost: true,
    companionDetails: {
      tripTitle: 'Swiss Alps Hiking Adventure 🏔️',
      travelDuration: '7 days',
      destinations: ['Interlaken', 'Zermatt', 'Grindelwald'],
      companionsNeeded: 2,
      tripType: 'Adventure Trek',
      expiresAt: '2024-02-15T00:00:00Z'
    },
    interestedUsers: ['3']
  },
  {
    id: '3',
    title: 'Tokyo Street Food',
    caption: 'Discovering the incredible flavors of Tokyo\'s street food scene. From fresh sushi to authentic ramen, every bite tells a story. The energy of these local markets is absolutely infectious!',
    image: 'https://images.pexels.com/photos/4253352/pexels-photo-4253352.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    location: {
      city: 'Tokyo',
      country: 'Japan',
      coordinates: [139.6503, 35.6762]
    },
    category: 'Food',
    tags: ['tokyo', 'streetfood', 'japan', 'sushi', 'culture'],
    date: '2024-01-08',
    rating: 4,
    user: mockUsers[2],
    likes: 89,
    comments: 7,
    isLiked: false,
    createdAt: '2024-01-09T08:20:00Z',
    isCompanionPost: false
  },
  {
    id: '4',
    title: 'Bali Temple Serenity',
    caption: 'Finding peace and tranquility at this ancient Balinese temple. The intricate architecture and spiritual atmosphere make this place truly special. Perfect for meditation and reflection.',
    image: 'https://images.pexels.com/photos/2473848/pexels-photo-2473848.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    location: {
      city: 'Ubud',
      country: 'Indonesia',
      coordinates: [115.2624, -8.5069]
    },
    category: 'Culture',
    tags: ['bali', 'temple', 'spirituality', 'architecture', 'indonesia'],
    date: '2024-01-05',
    rating: 5,
    user: mockUsers[0],
    likes: 198,
    comments: 23,
    isLiked: true,
    createdAt: '2024-01-06T16:10:00Z',
    isCompanionPost: true,
    companionDetails: {
      tripTitle: 'Bali Cultural Immersion 🏛️',
      travelDuration: '10 days',
      destinations: ['Ubud', 'Canggu', 'Sanur'],
      companionsNeeded: 1,
      tripType: 'Cultural Tour',
      expiresAt: '2024-02-01T00:00:00Z'
    },
    interestedUsers: ['2', '3']
  }
];

 const mockNotifications = [
  {
    id: '1',
    type: 'like',
    user: mockUsers[1],
    post: mockPosts[0],
    message: 'liked your post',
    timestamp: '2024-01-16T15:30:00Z',
    isRead: false
  },
  {
    id: '2',
    type: 'comment',
    user: mockUsers[2],
    post: mockPosts[1],
    message: 'commented on your post',
    timestamp: '2024-01-16T14:20:00Z',
    isRead: false
  },
  {
    id: '3',
    type: 'follow',
    user: mockUsers[0],
    message: 'started following you',
    timestamp: '2024-01-16T12:45:00Z',
    isRead: true
  },
  {
    id: '4',
    type: 'like',
    user: mockUsers[1],
    post: mockPosts[3],
    message: 'liked your post',
    timestamp: '2024-01-15T20:15:00Z',
    isRead: true
  }
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState('all');

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.isRead)
    : notifications;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (notificationId) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId ? { ...n, isRead: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (notificationId) => {
    setNotifications(notifications.filter(n => n.id !== notificationId));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like': return Heart;
      case 'comment': return MessageCircle;
      case 'follow': return UserPlus;
      default: return Heart;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'like': return 'text-red-500';
      case 'comment': return 'text-blue-500';
      case 'follow': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`;
    return time.toLocaleDateString();
  };

  return (
    <div className="flex-1 bg-gray-50 pt-20 pb-20 md:pt-24 md:pb-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
            {unreadCount > 0 && (
              <p className="text-gray-600">
                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-3">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
              >
                Mark all read
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
              filter === 'unread'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>

        {/* Notifications List */}
        {filteredNotifications.length > 0 ? (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type);
              const iconColor = getNotificationColor(notification.type);
              
              return (
                <div
                  key={notification.id}
                  className={`bg-white rounded-xl p-4 border transition-all duration-200 hover:shadow-md ${
                    notification.isRead 
                      ? 'border-gray-200' 
                      : 'border-blue-200 bg-blue-50/30'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {/* Notification Icon */}
                    <div className={`p-2 rounded-full ${
                      notification.type === 'like' ? 'bg-red-100' :
                      notification.type === 'comment' ? 'bg-blue-100' :
                      'bg-green-100'
                    }`}>
                      <Icon className={iconColor} size={16} />
                    </div>

                    {/* User Avatar */}
                    <img
                      src={notification.user.avatar}
                      alt={notification.user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-gray-800">
                            <span className="font-semibold">{notification.user.name}</span>
                            <span className="ml-1">{notification.message}</span>
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {formatTimeAgo(notification.timestamp)}
                          </p>
                        </div>
                        
                        {/* Post Thumbnail */}
                        {notification.post && (
                          <img
                            src={notification.post.image}
                            alt={notification.post.title}
                            className="w-12 h-12 rounded-lg object-cover ml-3"
                          />
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1.5 text-green-600 hover:bg-green-100 rounded-full transition-colors duration-200"
                          title="Mark as read"
                        >
                          <Check size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
                        title="Delete notification"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="text-gray-400" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {filter === 'unread' ? 'All caught up!' : 'No notifications yet'}
            </h3>
            <p className="text-gray-500">
              {filter === 'unread' 
                ? 'You have no unread notifications' 
                : "When people interact with your posts, you'll see it here"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
