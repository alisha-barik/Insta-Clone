// Post types and data structures

export const postCategories = [
  { id: 'adventure', name: 'Adventure', icon: '🏔️', color: 'text-orange-600' },
  { id: 'food', name: 'Food', icon: '🍛', color: 'text-red-600' },
  { id: 'culture', name: 'Culture', icon: '🎭', color: 'text-purple-600' },
  { id: 'nature', name: 'Nature', icon: '🌲', color: 'text-green-600' },
  { id: 'relaxation', name: 'Relaxation', icon: '🏖️', color: 'text-blue-600' },
  { id: 'nightlife', name: 'Nightlife', icon: '🌃', color: 'text-pink-600' }
];

export const tripTypes = [
  { id: 'solo', name: 'Solo Travel', icon: '🎒' },
  { id: 'family', name: 'Family Trip', icon: '👨‍👩‍👧‍👦' },
  { id: 'friends', name: 'With Friends', icon: '👥' },
  { id: 'couple', name: 'Couple Trip', icon: '💑' },
  { id: 'business', name: 'Business', icon: '💼' }
];

export const budgetRanges = [
  { id: 'budget', name: 'Budget (₹0-₹10k)', min: 0, max: 10000 },
  { id: 'mid', name: 'Mid-range (₹10k-₹50k)', min: 10000, max: 50000 },
  { id: 'luxury', name: 'Luxury (₹50k+)', min: 50000, max: Infinity }
];