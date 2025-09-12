// Experience types and data structures

export const experienceCategories = [
  { id: 'mountain', name: 'Mountains', icon: '⛰️', color: 'text-green-600' },
  { id: 'beach', name: 'Beaches', icon: '🏖️', color: 'text-blue-600' },
  { id: 'city', name: 'Cities', icon: '🏙️', color: 'text-purple-600' },
  { id: 'nature', name: 'Nature', icon: '🌲', color: 'text-emerald-600' },
  { id: 'cultural', name: 'Cultural', icon: '🏛️', color: 'text-orange-600' }
];

export const badges = [
  {
    id: 'mountain_explorer',
    name: 'Mountain Explorer',
    icon: '⛰️',
    description: 'Visited 5+ mountain destinations',
    requirement: 5,
    category: 'mountain',
    color: 'bg-green-100 text-green-800'
  },
  {
    id: 'beach_lover',
    name: 'Beach Lover',
    icon: '🏖️',
    description: 'Explored 3+ beautiful beaches',
    requirement: 3,
    category: 'beach',
    color: 'bg-blue-100 text-blue-800'
  },
  {
    id: 'world_traveler',
    name: 'World Traveler',
    icon: '🌍',
    description: 'Visited 10+ different countries',
    requirement: 10,
    category: 'all',
    color: 'bg-purple-100 text-purple-800'
  },
  {
    id: 'city_explorer',
    name: 'City Explorer',
    icon: '🏙️',
    description: 'Discovered 7+ amazing cities',
    requirement: 7,
    category: 'city',
    color: 'bg-indigo-100 text-indigo-800'
  },
  {
    id: 'nature_enthusiast',
    name: 'Nature Enthusiast',
    icon: '🌲',
    description: 'Connected with nature in 4+ locations',
    requirement: 4,
    category: 'nature',
    color: 'bg-emerald-100 text-emerald-800'
  },
  {
    id: 'culture_seeker',
    name: 'Culture Seeker',
    icon: '🏛️',
    description: 'Immersed in 6+ cultural experiences',
    requirement: 6,
    category: 'cultural',
    color: 'bg-orange-100 text-orange-800'
  }
];