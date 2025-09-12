import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { categoryConfigs } from '../../types/bucketList';
import { mockBucketListItems } from '../../data/mockData';
import { ProgressTracker } from './ProgressTracker';
import { BucketListItem } from './BucketListItem';
import { AddItemModal } from './AddItemModal';

export const BucketList = () => {
  const [items, setItems] = useState(mockBucketListItems);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('dateAdded');

  // Filter and sort items
  const filteredItems = items
    .filter(item => {
      const matchesCategory = activeCategory === 'all' || 
        (activeCategory === 'completed' ? item.isCompleted : 
         item.category === activeCategory && !item.isCompleted);
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'dateAdded':
        default:
          return b.dateAdded.getTime() - a.dateAdded.getTime();
      }
    });

  const handleSaveItem = (itemData) => {
    if (editingItem) {
      setItems(prev => prev.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...itemData }
          : item
      ));
    } else {
      const newItem = {
        ...itemData,
        id: Date.now().toString(),
        dateAdded: new Date(),
        isCompleted: false
      };
      setItems(prev => [newItem, ...prev]);
    }
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleToggleComplete = (id) => {
    setItems(prev => prev.map(item => 
      item.id === id 
        ? { 
            ...item, 
            isCompleted: !item.isCompleted,
            dateCompleted: !item.isCompleted ? new Date() : undefined
          }
        : item
    ));
  };

  const getCategoryCount = (categoryId) => {
    if (categoryId === 'all') return items.length;
    if (categoryId === 'completed') return items.filter(item => item.isCompleted).length;
    return items.filter(item => item.category === categoryId && !item.isCompleted).length;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Tracker */}
      <ProgressTracker items={items} />

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-bold text-gray-800">My Bucket List</h2>
        
        <div className="flex items-center space-x-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 w-48"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="dateAdded">Date Added</option>
            <option value="priority">Priority</option>
            <option value="alphabetical">Alphabetical</option>
          </select>

          {/* Add Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all flex items-center space-x-2 font-medium"
          >
            <Plus className="w-4 h-4" />
            <span>Add Item</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
            activeCategory === 'all'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <span>All Items</span>
          <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
            {getCategoryCount('all')}
          </span>
        </button>
        
        {categoryConfigs.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
              activeCategory === category.id
                ? 'bg-purple-600 text-white'
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

      {/* Items Grid */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <span className="text-6xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No items found</h3>
            <p className="text-gray-500">
              {searchTerm ? 'Try adjusting your search terms' : 'Add your first bucket list item to get started!'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                Add Your First Item
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredItems.map((item) => (
              <BucketListItem
                key={item.id}
                item={item}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AddItemModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveItem}
        editingItem={editingItem}
      />
    </div>
  );
};