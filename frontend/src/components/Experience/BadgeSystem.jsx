import React from 'react';
import { Award, Trophy } from 'lucide-react';
import { badges } from '../../types/experience';
import { mockExperiences, mockVisitedPlaces } from '../../data/mockData';

export const BadgeSystem = () => {
  const calculateEarnedBadges = () => {
    const earnedBadges = [];
    
    badges.forEach(badge => {
      let count = 0;
      
      if (badge.category === 'all') {
        // For world traveler, count unique countries/regions
        const uniqueLocations = new Set(mockExperiences.map(exp => exp.location.split(',')[1]?.trim()));
        count = uniqueLocations.size;
      } else {
        // Count experiences by category
        count = mockExperiences.filter(exp => exp.category === badge.category).length;
      }
      
      if (count >= badge.requirement) {
        earnedBadges.push({ ...badge, earned: true, count });
      } else {
        earnedBadges.push({ ...badge, earned: false, count, progress: (count / badge.requirement) * 100 });
      }
    });
    
    return earnedBadges;
  };

  const badgeData = calculateEarnedBadges();
  const earnedBadges = badgeData.filter(badge => badge.earned);
  const inProgressBadges = badgeData.filter(badge => !badge.earned);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-yellow-100 rounded-lg">
          <Trophy className="w-6 h-6 text-yellow-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Travel Achievements</h3>
          <p className="text-gray-600">Unlock badges by exploring the world</p>
        </div>
      </div>

      {/* Earned Badges */}
      {earnedBadges.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
            <Award className="w-4 h-4 text-yellow-500" />
            <span>Earned Badges ({earnedBadges.length})</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {earnedBadges.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 rounded-lg border-2 border-yellow-200 ${badge.color} relative overflow-hidden`}
              >
                <div className="absolute top-2 right-2">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Trophy className="w-3 h-3 text-yellow-800" />
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{badge.icon}</span>
                  <div>
                    <div className="font-bold text-sm">{badge.name}</div>
                    <div className="text-xs opacity-80">{badge.description}</div>
                    <div className="text-xs font-medium mt-1">
                      Completed: {badge.count}/{badge.requirement}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* In Progress Badges */}
      {inProgressBadges.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">In Progress</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {inProgressBadges.map((badge) => (
              <div
                key={badge.id}
                className="p-4 rounded-lg border border-gray-200 bg-gray-50 relative"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl grayscale">{badge.icon}</span>
                  <div>
                    <div className="font-bold text-sm text-gray-700">{badge.name}</div>
                    <div className="text-xs text-gray-500">{badge.description}</div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>{badge.count}/{badge.requirement}</span>
                    <span>{Math.round(badge.progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${badge.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {earnedBadges.length === 0 && inProgressBadges.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-4">
            <Trophy className="w-12 h-12 mx-auto" />
          </div>
          <h4 className="text-lg font-semibold text-gray-600 mb-2">Start Your Journey</h4>
          <p className="text-gray-500">Add travel experiences to unlock achievement badges!</p>
        </div>
      )}
    </div>
  );
};