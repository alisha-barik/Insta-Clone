import React, { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { categoryConfigs } from '../../types/bucketList';

export const AddItemModal = ({
  isOpen,
  onClose,
  onSave,
  editingItem
}) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'places',
    description: '',
    priority: 'medium'
  });

  useEffect(() => {
    if (editingItem) {
      setFormData({
        title: editingItem.title,
        category: editingItem.category,
        description: editingItem.description || '',
        priority: editingItem.priority
      });
    } else {
      setFormData({
        title: '',
        category: 'places',
        description: '',
        priority: 'medium'
      });
    }
  }, [editingItem, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onSave(formData);
    onClose();
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-bold text-gray-800">
            {editingItem ? 'Edit Bucket List Item' : 'Add New Item'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              placeholder="e.g., See the Northern Lights in Norway"
              required
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categoryConfigs.filter(cat => cat.id !== 'completed').map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleChange('category', category.id)}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    formData.category === category.id
                      ? `${category.bgColor} border-purple-500`
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{category.icon}</span>
                    <span className="font-medium text-sm">{category.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              placeholder="Add more details about this goal..."
              rows={3}
            />
          </div>

          {/* Priority */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <div className="flex space-x-2">
              {['low', 'medium', 'high'].map((priority) => (
                <button
                  key={priority}
                  type="button"
                  onClick={() => handleChange('priority', priority)}
                  className={`flex-1 py-2 px-3 rounded-lg border-2 text-sm font-medium transition-all ${
                    formData.priority === priority
                      ? priority === 'high' ? 'bg-red-50 border-red-500 text-red-700' :
                        priority === 'medium' ? 'bg-yellow-50 border-yellow-500 text-yellow-700' :
                        'bg-green-50 border-green-500 text-green-700'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {priority.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>{editingItem ? 'Update' : 'Add Item'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};