import React from 'react';
import { Trophy, Target, Star } from 'lucide-react';

export const ProgressTracker = ({ items }) => {
  const totalItems = items.length;
  const completedItems = items.filter(item => item.isCompleted).length;
  const progressPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const getMilestoneMessage = () => {
    if (progressPercentage >= 100) return "🎉 Incredible! You've completed everything!";
    if (progressPercentage >= 75) return "🌟 Amazing progress! You're almost there!";
    if (progressPercentage >= 50) return "🚀 Halfway there! Keep going!";
    if (progressPercentage >= 25) return "💪 Great start! Keep pushing forward!";
    return "🎯 Your journey begins here!";
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-8 border border-purple-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Trophy className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Your Progress</h3>
            <p className="text-gray-600">{getMilestoneMessage()}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-purple-600">{progressPercentage}%</div>
          <div className="text-sm text-gray-500">{completedItems} of {totalItems} completed</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercentage}%` }}
          >
            {progressPercentage > 10 && (
              <div className="absolute inset-0 bg-white bg-opacity-20 rounded-full animate-pulse"></div>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Target className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{totalItems - completedItems}</div>
          <div className="text-sm text-gray-600">Remaining</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Star className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{completedItems}</div>
          <div className="text-sm text-gray-600">Achieved</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Trophy className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{Math.ceil(progressPercentage / 25)}</div>
          <div className="text-sm text-gray-600">Milestones</div>
        </div>
      </div>
    </div>
  );
};