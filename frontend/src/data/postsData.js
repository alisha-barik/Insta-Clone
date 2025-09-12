export const mockPosts = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Alex Chen',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    title: 'Magical Goa Sunset',
    caption: 'Just witnessed the most incredible sunset at Anjuna Beach! The colors were absolutely breathtaking. Had amazing seafood at Curlies and met some wonderful fellow travelers. Goa never fails to amaze me! 🌅',
    image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800',
    location: 'Anjuna Beach, Goa, India',
    category: 'relaxation',
    tags: ['#goa', '#sunset', '#beach', '#seafood', '#travel'],
    date: new Date('2024-02-15'),
    rating: 5,
    likes: 234,
    comments: 18,
    isLiked: false,
    isSaved: false
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Priya Sharma',
    userAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    title: 'Himalayan Adventure',
    caption: 'Completed the Kedarkantha trek! 6 days of pure bliss in the snow-covered mountains. The sunrise from the summit was worth every step. Met amazing people and pushed my limits. Already planning the next trek! ⛰️',
    image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800',
    location: 'Kedarkantha, Uttarakhand, India',
    category: 'adventure',
    tags: ['#trekking', '#himalayas', '#snow', '#adventure', '#mountains'],
    date: new Date('2024-02-10'),
    rating: 5,
    likes: 189,
    comments: 25,
    isLiked: true,
    isSaved: true
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'Rahul Gupta',
    userAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
    title: 'Rajasthani Culture Immersion',
    caption: 'Spent 3 days exploring the Pink City! The architecture at Hawa Mahal is mind-blowing. Tried authentic Dal Baati Churma and watched traditional folk dance. The hospitality here is unmatched! 🏰',
    image: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=800',
    location: 'Jaipur, Rajasthan, India',
    category: 'culture',
    tags: ['#jaipur', '#culture', '#architecture', '#food', '#heritage'],
    date: new Date('2024-02-08'),
    rating: 4,
    likes: 156,
    comments: 12,
    isLiked: false,
    isSaved: false
  },
  {
    id: '4',
    userId: 'user4',
    userName: 'Sarah Johnson',
    userAvatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150',
    title: 'Kerala Backwater Bliss',
    caption: 'Floating through the serene backwaters of Alleppey on a traditional houseboat. The coconut trees, local cuisine, and peaceful waters made this the perfect digital detox. Nature therapy at its finest! 🛶',
    image: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=800',
    location: 'Alleppey, Kerala, India',
    category: 'nature',
    tags: ['#kerala', '#backwaters', '#houseboat', '#nature', '#peaceful'],
    date: new Date('2024-02-05'),
    rating: 5,
    likes: 298,
    comments: 31,
    isLiked: true,
    isSaved: false
  }
];

export const mockNotifications = [
  {
    id: '1',
    type: 'like',
    fromUser: {
      id: 'user2',
      name: 'Priya Sharma',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    postId: '1',
    postImage: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=150',
    message: 'liked your post',
    timestamp: new Date('2024-02-16T10:30:00'),
    isRead: false
  },
  {
    id: '2',
    type: 'comment',
    fromUser: {
      id: 'user3',
      name: 'Rahul Gupta',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    postId: '1',
    postImage: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=150',
    message: 'commented: "Amazing sunset! Which camera did you use?"',
    timestamp: new Date('2024-02-16T09:15:00'),
    isRead: false
  },
  {
    id: '3',
    type: 'like',
    fromUser: {
      id: 'user4',
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    postId: '2',
    postImage: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=150',
    message: 'liked your post',
    timestamp: new Date('2024-02-15T18:45:00'),
    isRead: true
  },
  {
    id: '4',
    type: 'follow',
    fromUser: {
      id: 'user5',
      name: 'Mike Wilson',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    message: 'started following you',
    timestamp: new Date('2024-02-15T14:20:00'),
    isRead: true
  }
];

export const trendingDestinations = [
  {
    id: '1',
    name: 'Ladakh',
    country: 'India',
    image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'adventure',
    rating: 4.8,
    postsCount: 1247,
    description: 'High-altitude desert with stunning landscapes'
  },
  {
    id: '2',
    name: 'Goa',
    country: 'India',
    image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'relaxation',
    rating: 4.6,
    postsCount: 2156,
    description: 'Beautiful beaches and vibrant nightlife'
  },
  {
    id: '3',
    name: 'Rajasthan',
    country: 'India',
    image: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'culture',
    rating: 4.7,
    postsCount: 1893,
    description: 'Royal palaces and rich cultural heritage'
  },
  {
    id: '4',
    name: 'Kerala',
    country: 'India',
    image: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'nature',
    rating: 4.9,
    postsCount: 1654,
    description: 'Backwaters, spices, and lush greenery'
  }
];

export const suggestedItineraries = [
  {
    id: '1',
    title: '3 Days in Goa',
    destination: 'Goa, India',
    duration: '3 days',
    budget: 'mid',
    image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400',
    highlights: ['Beach hopping', 'Seafood tours', 'Sunset cruises'],
    estimatedCost: '₹15,000'
  },
  {
    id: '2',
    title: '5 Days Himalayan Trek',
    destination: 'Himachal Pradesh, India',
    duration: '5 days',
    budget: 'budget',
    image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400',
    highlights: ['Mountain trekking', 'Local villages', 'Sunrise views'],
    estimatedCost: '₹8,000'
  }
];