export const mockBucketListItems = [
  {
    id: '1',
    title: 'See the Northern Lights in Norway',
    category: 'places',
    description: 'Witness the aurora borealis in the Arctic Circle',
    isCompleted: false,
    dateAdded: new Date('2024-01-15'),
    priority: 'high'
  },
  {
    id: '2',
    title: 'Backpack through Himachal Pradesh',
    category: 'places',
    description: 'Explore the mountains and valleys of Northern India',
    isCompleted: false,
    dateAdded: new Date('2024-01-20'),
    priority: 'medium'
  },
  {
    id: '3',
    title: 'Skydive from 15,000 feet',
    category: 'adventures',
    description: 'Experience the ultimate adrenaline rush',
    isCompleted: true,
    dateAdded: new Date('2023-12-10'),
    dateCompleted: new Date('2024-02-14'),
    priority: 'high'
  },
  {
    id: '4',
    title: 'Trek Kedarkantha in snow',
    category: 'adventures',
    description: 'Winter trek in Uttarakhand with snow-capped peaks',
    isCompleted: false,
    dateAdded: new Date('2024-01-25'),
    priority: 'high'
  },
  {
    id: '5',
    title: 'Learn boxing',
    category: 'personal',
    description: 'Master the sweet science and get in shape',
    isCompleted: false,
    dateAdded: new Date('2024-01-30'),
    priority: 'medium'
  },
  {
    id: '6',
    title: 'Run a marathon',
    category: 'personal',
    description: 'Complete a full 42.2km marathon race',
    isCompleted: true,
    dateAdded: new Date('2023-11-15'),
    dateCompleted: new Date('2024-01-28'),
    priority: 'high'
  },
  {
    id: '7',
    title: 'Attend Rio Carnival',
    category: 'cultural',
    description: 'Experience the world\'s biggest carnival in Brazil',
    isCompleted: false,
    dateAdded: new Date('2024-02-01'),
    priority: 'high'
  },
  {
    id: '8',
    title: 'Watch a Broadway show in NYC',
    category: 'cultural',
    description: 'See a live performance in the theater district',
    isCompleted: true,
    dateAdded: new Date('2023-10-20'),
    dateCompleted: new Date('2023-12-22'),
    priority: 'medium'
  },
  {
    id: '9',
    title: 'Go to Japan during Cherry Blossom season',
    category: 'places',
    description: 'Experience Sakura season in Tokyo and Kyoto',
    isCompleted: false,
    dateAdded: new Date('2024-02-05'),
    priority: 'high'
  },
  {
    id: '10',
    title: 'Scuba dive in Andaman Islands',
    category: 'adventures',
    description: 'Explore the underwater world in crystal clear waters',
    isCompleted: false,
    dateAdded: new Date('2024-02-08'),
    priority: 'medium'
  }
];

export const mockExperiences = [
  {
    id: '1',
    title: 'Amazing Goa Beach Vacation',
    location: 'Goa, India',
    coordinates: [15.2993, 74.1240],
    category: 'beach',
    dateVisited: new Date('2024-01-15'),
    rating: 5,
    description: 'Incredible beach vacation with perfect weather and amazing seafood. The sunsets were absolutely breathtaking!',
    photos: [
      'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    recommendations: {
      food: 'Fresh seafood at Fisherman\'s Wharf - the prawns were incredible! 🍤',
      stay: 'Taj Exotica Resort - luxury beachfront with amazing service 🏨',
      activity: 'Sunset dolphin cruise - magical experience watching dolphins play 🐬'
    }
  },
  {
    id: '2',
    title: 'Himalayan Adventure in Manali',
    location: 'Manali, Himachal Pradesh',
    coordinates: [32.2396, 77.1887],
    category: 'mountain',
    dateVisited: new Date('2023-12-20'),
    rating: 5,
    description: 'Epic mountain adventure with snow-capped peaks and thrilling activities. The crisp mountain air was so refreshing!',
    photos: [
      'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    recommendations: {
      food: 'Local Himachali thali at Johnson\'s Cafe - authentic mountain flavors 🍛',
      stay: 'The Himalayan Village Resort - cozy wooden cottages with mountain views 🏔️',
      activity: 'Paragliding in Solang Valley - soaring above the mountains was incredible! 🪂'
    }
  },
  {
    id: '3',
    title: 'Cultural Immersion in Rajasthan',
    location: 'Jaipur, Rajasthan',
    coordinates: [26.9124, 75.7873],
    category: 'cultural',
    dateVisited: new Date('2024-02-10'),
    rating: 4,
    description: 'Rich cultural experience exploring palaces, markets, and traditional crafts. The Pink City lived up to its reputation!',
    photos: [
      'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2413613/pexels-photo-2413613.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    recommendations: {
      food: 'Dal Baati Churma at Chokhi Dhani - traditional Rajasthani feast 🍽️',
      stay: 'Rambagh Palace - felt like royalty in this heritage hotel 👑',
      activity: 'Hot air balloon ride over Amber Fort - magical sunrise views 🎈'
    }
  },
  {
    id: '4',
    title: 'Urban Exploration in Mumbai',
    location: 'Mumbai, Maharashtra',
    coordinates: [19.0760, 72.8777],
    category: 'city',
    dateVisited: new Date('2023-11-25'),
    rating: 4,
    description: 'Fast-paced city life with incredible street food and Bollywood culture. The energy of this city is unmatched!',
    photos: [
      'https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    recommendations: {
      food: 'Vada Pav at Mohammed Ali Road - best street food experience! 🌮',
      stay: 'The Taj Mahal Palace - iconic luxury with harbor views 🏨',
      activity: 'Bollywood studio tour - behind the scenes of Indian cinema 🎬'
    }
  }
];

export const mockVisitedPlaces = [
  { id: '1', name: 'Goa', coordinates: [15.2993, 74.1240], category: 'beach' },
  { id: '2', name: 'Manali', coordinates: [32.2396, 77.1887], category: 'mountain' },
  { id: '3', name: 'Jaipur', coordinates: [26.9124, 75.7873], category: 'cultural' },
  { id: '4', name: 'Mumbai', coordinates: [19.0760, 72.8777], category: 'city' },
  { id: '5', name: 'Kerala Backwaters', coordinates: [9.4981, 76.3388], category: 'nature' },
  { id: '6', name: 'Rishikesh', coordinates: [30.0869, 78.2676], category: 'nature' },
  { id: '7', name: 'Udaipur', coordinates: [24.5854, 73.7125], category: 'cultural' }
];