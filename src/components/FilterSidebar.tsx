import React from 'react';
import { Filter, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FilterOptions } from '../types';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useApp();
  const { filters } = state;

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: { ...filters, ...newFilters },
    });
  };

  const propertyTypes = [
    { id: 'hotel', label: 'Hotels' },
    { id: 'apartment', label: 'Apartments' },
    { id: 'resort', label: 'Resorts' },
    { id: 'villa', label: 'Villas' },
    { id: 'hostel', label: 'Hostels' },
  ];

  const amenities = [
    'WiFi',
    'Pool',
    'Spa',
    'Restaurant',
    'Bar',
    'Gym',
    'Parking',
    'Beach Access',
    'Pet Friendly',
    'Business Center',
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
      
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-80 bg-white shadow-xl z-50 overflow-y-auto lg:static lg:w-64 lg:shadow-none">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Price per night</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={filters.priceRange[0]}
                  onChange={(e) => updateFilters({
                    priceRange: [parseInt(e.target.value), filters.priceRange[1]]
                  })}
                  className="flex-1"
                />
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={filters.priceRange[1]}
                  onChange={(e) => updateFilters({
                    priceRange: [filters.priceRange[0], parseInt(e.target.value)]
                  })}
                  className="flex-1"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Property Types */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Property type</h3>
            <div className="space-y-2">
              {propertyTypes.map((type) => (
                <label key={type.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.propertyTypes.includes(type.id)}
                    onChange={(e) => {
                      const newTypes = e.target.checked
                        ? [...filters.propertyTypes, type.id]
                        : filters.propertyTypes.filter(t => t !== type.id);
                      updateFilters({ propertyTypes: newTypes });
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Rating</h3>
            <div className="space-y-2">
              {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                <label key={rating} className="flex items-center">
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.rating === rating}
                    onChange={() => updateFilters({ rating })}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {rating}+ stars
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Amenities</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {amenities.map((amenity) => (
                <label key={amenity} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.amenities.includes(amenity)}
                    onChange={(e) => {
                      const newAmenities = e.target.checked
                        ? [...filters.amenities, amenity]
                        : filters.amenities.filter(a => a !== amenity);
                      updateFilters({ amenities: newAmenities });
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => updateFilters({
              priceRange: [0, 1000],
              propertyTypes: [],
              amenities: [],
              rating: 0,
            })}
            className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;