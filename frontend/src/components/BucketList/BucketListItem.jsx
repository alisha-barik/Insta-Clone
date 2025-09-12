import React from 'react';
import { Calendar, Edit, Trash2, CheckCircle, Circle, Camera } from 'lucide-react';
import { categoryConfigs } from '../../types/bucketList';

export const BucketListItem = ({
  item,
  onEdit,
  onDelete,
  onToggleComplete
}) => {
  const categoryConfig = categoryConfigs.find(config => config.id === item.category);
  
  const priorityColors = {
    high: 'border-l-red-500 bg-red-50',
    medium: 'border-l-yellow-500 bg-yellow-50',
    low: 'border-l-green-500 bg-green-50'
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className={`group relative bg-white rounded-xl border-l-4 ${priorityColors[item.priority]} shadow-sm hover:shadow-lg transition-all duration-300 p-5 ${item.isCompleted ? 'opacity-80' : ''}`}>
      {/* Completed Badge */}
      {item.isCompleted && (
        <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
          <CheckCircle className="w-4 h-4" />
        </div>
      )}

      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3 flex-1">
          {/* Category Icon */}
          <div className={`p-2 rounded-lg ${categoryConfig?.bgColor}`}>
            <span className="text-lg">{categoryConfig?.icon}</span>
          </div>
          
          <div className="flex-1">
            <h4 className={`font-semibold text-lg ${item.isCompleted ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {item.title}
            </h4>
            {item.description && (
              <p className="text-gray-600 text-sm mt-1">{item.description}</p>
            )}
            
            {/* Date Info */}
            <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>Added {formatDate(item.dateAdded)}</span>
              </div>
              {item.dateCompleted && (
                <div className="flex items-center space-x-1 text-green-600">
                  <CheckCircle className="w-3 h-3" />
                  <span>Completed {formatDate(item.dateCompleted)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onToggleComplete(item.id)}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              item.isCompleted
                ? 'text-green-600 hover:bg-green-50'
                : 'text-gray-400 hover:bg-gray-50 hover:text-green-600'
            }`}
            title={item.isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {item.isCompleted ? <CheckCircle className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
          </button>
          
          <button
            onClick={() => onEdit(item)}
            className="p-2 rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
            title="Edit item"
          >
            <Edit className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onDelete(item.id)}
            className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
            title="Delete item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          
          {item.isCompleted && (
            <button
              className="p-2 rounded-lg text-gray-400 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
              title="Add memory photo"
            >
              <Camera className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Priority Indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium text-gray-500">Priority:</span>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
            item.priority === 'high' ? 'bg-red-100 text-red-700' :
            item.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
            'bg-green-100 text-green-700'
          }`}>
            {item.priority.toUpperCase()}
          </span>
        </div>
        
        <span className={`text-xs font-medium ${categoryConfig?.color}`}>
          {categoryConfig?.name}
        </span>
      </div>
    </div>
  );
};