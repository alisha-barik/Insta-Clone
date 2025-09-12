import React, { useState } from 'react';
import { Plus, Filter, MapPin } from 'lucide-react';
import { mockExperiences } from '../../data/mockData';
import { experienceCategories } from '../../types/experience';
import { ExperienceCard } from './ExperienceCard';
import { BadgeSystem } from './BadgeSystem';

export const ExperienceTab = () => {
  const [experiences, setExperiences] = useState(mockExperiences);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dateVisited');

  const filteredExperiences = experiences
    .filter(exp => activeFilter === 'all' || exp.category === activeFilter)
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'dateVisited':
        default:
          return b.dateVisited.getTime() - a.dateVisited.getTime();
      }
    });

  const getCategoryCount = (categoryId) => {
    if (categoryId === 'all') return experiences.length;
    return experiences.filter(exp => exp.category === categoryId).length;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Badge System */}
      <BadgeSystem />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
            <MapPin className="w-6 h-6 text-blue-600" />
            <span>Travel Experiences</span>
          </h2>
          <p className="text-gray-600 mt-1">Share your adventures and memories</p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="dateVisited">Latest First</option>
            <option value="rating">Highest Rated</option>
            <option value="alphabetical">Alphabetical</option>
          </select>

          {/* Add Experience Button */}
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center space-x-2 font-medium">
            <Plus className="w-4 h-4" />
            <span>Add Experience</span>
          </button>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
            activeFilter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <span>All Experiences</span>
          <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
            {getCategoryCount('all')}
          </span>
        </button>
        
        {experienceCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveFilter(category.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
              activeFilter === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
            <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
              {getCategoryCount(category.id)}
            </span>
          </button>
        ))}
      </div>

      {/* Experiences Grid */}
      <div className="space-y-6">
        {filteredExperiences.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MapPin className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No experiences yet</h3>
            <p className="text-gray-500 mb-4">
              Start documenting your travel adventures and create lasting memories!
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
              Add Your First Experience
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredExperiences.map((experience) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};