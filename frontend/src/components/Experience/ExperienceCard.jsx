import React, { useState } from 'react';
import { Calendar, Star, MapPin, Camera, Utensils, Hotel, Activity } from 'lucide-react';
import { experienceCategories } from '../../types/experience';

export const ExperienceCard = ({ experience, onEdit, onDelete }) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  
  const categoryConfig = experienceCategories.find(cat => cat.id === experience.category);
  
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const displayPhotos = showAllPhotos ? experience.photos : experience.photos.slice(0, 3);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg ${categoryConfig?.color === 'text-green-600' ? 'bg-green-50' : 
              categoryConfig?.color === 'text-blue-600' ? 'bg-blue-50' :
              categoryConfig?.color === 'text-purple-600' ? 'bg-purple-50' :
              categoryConfig?.color === 'text-emerald-600' ? 'bg-emerald-50' :
              'bg-orange-50'}`}>
              <span className="text-xl">{categoryConfig?.icon}</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{experience.title}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">{experience.location}</span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center space-x-1 mb-1">
              {renderStars(experience.rating)}
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(experience.dateVisited)}</span>
            </div>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">{experience.description}</p>
      </div>

      {/* Photo Gallery */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-gray-800 flex items-center space-x-2">
            <Camera className="w-4 h-4" />
            <span>Photos</span>
          </h4>
          {experience.photos.length > 3 && (
            <button
              onClick={() => setShowAllPhotos(!showAllPhotos)}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              {showAllPhotos ? 'Show Less' : `+${experience.photos.length - 3} more`}
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          {displayPhotos.map((photo, index) => (
            <div
              key={index}
              className="aspect-square rounded-lg overflow-hidden bg-gray-100 hover:opacity-90 transition-opacity cursor-pointer"
            >
              <img
                src={photo}
                alt={`${experience.title} - Photo ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="px-6 pb-6">
        <h4 className="font-semibold text-gray-800 mb-3">Recommendations</h4>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
            <Utensils className="w-5 h-5 text-orange-600 mt-0.5" />
            <div>
              <div className="font-medium text-gray-800 text-sm">Best Food</div>
              <div className="text-gray-700 text-sm">{experience.recommendations.food}</div>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
            <Hotel className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <div className="font-medium text-gray-800 text-sm">Best Stay</div>
              <div className="text-gray-700 text-sm">{experience.recommendations.stay}</div>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
            <Activity className="w-5 h-5 text-purple-600 mt-0.5" />
            <div>
              <div className="font-medium text-gray-800 text-sm">Must-Do Activity</div>
              <div className="text-gray-700 text-sm">{experience.recommendations.activity}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};