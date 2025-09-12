import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Search, Plus, X, MapPin } from 'lucide-react';
import { mockVisitedPlaces, mockExperiences } from '../../data/mockData';
import { experienceCategories } from '../../types/experience';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng);
    },
  });
  return null;
};

export const TravelMap = ({ onPlaceSelect }) => {
  const [visitedPlaces, setVisitedPlaces] = useState(mockVisitedPlaces);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingPlace, setIsAddingPlace] = useState(false);
  const [newPlaceName, setNewPlaceName] = useState('');
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);

  const handleMapClick = (latlng) => {
    setSelectedCoordinates([latlng.lat, latlng.lng]);
    setIsAddingPlace(true);
  };

  const handleAddPlace = () => {
    if (!newPlaceName.trim() || !selectedCoordinates) return;

    const newPlace = {
      id: Date.now().toString(),
      name: newPlaceName,
      coordinates: selectedCoordinates,
      category: 'city' // Default category
    };

    setVisitedPlaces(prev => [...prev, newPlace]);
    setNewPlaceName('');
    setIsAddingPlace(false);
    setSelectedCoordinates(null);
  };

  const handleRemovePlace = (placeId) => {
    setVisitedPlaces(prev => prev.filter(place => place.id !== placeId));
  };

  const getCategoryIcon = (category) => {
    const categoryConfig = experienceCategories.find(cat => cat.id === category);
    return categoryConfig?.icon || '📍';
  };

  const getRelatedExperiences = (placeName) => {
    return mockExperiences.filter(exp => 
      exp.location.toLowerCase().includes(placeName.toLowerCase())
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Map Header */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-800 flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span>Travel Map</span>
          </h3>
          <div className="text-sm text-gray-600">
            {visitedPlaces.length} places visited
          </div>
        </div>

        {/* Search Places */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search or add a place..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-80">
        <MapContainer
          center={[20.5937, 78.9629]} // Center of India
          zoom={5}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          <MapClickHandler onMapClick={handleMapClick} />
          
          {visitedPlaces.map((place) => (
            <Marker key={place.id} position={place.coordinates}>
              <Popup>
                <div className="p-2">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800 flex items-center space-x-1">
                      <span>{getCategoryIcon(place.category)}</span>
                      <span>{place.name}</span>
                    </h4>
                    <button
                      onClick={() => handleRemovePlace(place.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Remove place"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  
                  {getRelatedExperiences(place.name).length > 0 && (
                    <div className="text-xs text-blue-600 mb-2">
                      {getRelatedExperiences(place.name).length} experience(s) here
                    </div>
                  )}
                  
                  <button
                    onClick={() => onPlaceSelect && onPlaceSelect(place)}
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Add Place Modal */}
        {isAddingPlace && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 m-4 w-full max-w-sm">
              <h4 className="text-lg font-semibold mb-4">Add New Place</h4>
              <input
                type="text"
                placeholder="Enter place name..."
                value={newPlaceName}
                onChange={(e) => setNewPlaceName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
                autoFocus
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setIsAddingPlace(false);
                    setNewPlaceName('');
                    setSelectedCoordinates(null);
                  }}
                  className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPlace}
                  className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Places List */}
      <div className="p-4 max-h-40 overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {visitedPlaces
            .filter(place => 
              place.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((place) => (
              <div
                key={place.id}
                className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => onPlaceSelect && onPlaceSelect(place)}
              >
                <span className="text-sm">{getCategoryIcon(place.category)}</span>
                <span className="text-sm font-medium text-gray-700 truncate">
                  {place.name}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};