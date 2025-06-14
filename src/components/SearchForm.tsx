import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, Plus, Minus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SearchParams } from '../types';

interface SearchFormProps {
  onSearch?: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState<SearchParams>(state.searchParams);
  const [showGuestSelector, setShowGuestSelector] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'SET_SEARCH_PARAMS', payload: searchParams });
    navigate('/hotels');
    onSearch?.();
  };

  const updateGuests = (type: 'adults' | 'children' | 'rooms', increment: boolean) => {
    setSearchParams(prev => ({
      ...prev,
      guests: {
        ...prev.guests,
        [type]: Math.max(type === 'rooms' ? 1 : 0, prev.guests[type] + (increment ? 1 : -1)),
      },
    }));
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const destinations = [
    'Paris, France',
    'New York, USA',
    'Tokyo, Japan',
    'London, UK',
    'Rome, Italy',
    'Barcelona, Spain',
    'Amsterdam, Netherlands',
    'Santorini, Greece',
  ];

  return (
    <form onSubmit={handleSearch} className="space-y-6">
      {/* Destination */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <MapPin className="w-4 h-4 inline mr-1" />
          Where are you going?
        </label>
        <div className="relative">
          <input
            type="text"
            value={searchParams.destination}
            onChange={(e) => setSearchParams(prev => ({ ...prev, destination: e.target.value }))}
            placeholder="Enter destination"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            list="destinations"
          />
          <datalist id="destinations">
            {destinations.map(dest => (
              <option key={dest} value={dest} />
            ))}
          </datalist>
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Check-in
          </label>
          <input
            type="date"
            value={formatDate(searchParams.checkIn)}
            onChange={(e) => setSearchParams(prev => ({ ...prev, checkIn: e.target.value ? new Date(e.target.value) : null }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Check-out
          </label>
          <input
            type="date"
            value={formatDate(searchParams.checkOut)}
            onChange={(e) => setSearchParams(prev => ({ ...prev, checkOut: e.target.value ? new Date(e.target.value) : null }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Guests */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Users className="w-4 h-4 inline mr-1" />
          Guests & Rooms
        </label>
        <button
          type="button"
          onClick={() => setShowGuestSelector(!showGuestSelector)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {searchParams.guests.adults} adult{searchParams.guests.adults !== 1 ? 's' : ''}
          {searchParams.guests.children > 0 && `, ${searchParams.guests.children} child${searchParams.guests.children !== 1 ? 'ren' : ''}`}
          {searchParams.guests.rooms > 1 && `, ${searchParams.guests.rooms} rooms`}
        </button>

        {showGuestSelector && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Adults</span>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => updateGuests('adults', false)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{searchParams.guests.adults}</span>
                  <button
                    type="button"
                    onClick={() => updateGuests('adults', true)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Children</span>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => updateGuests('children', false)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{searchParams.guests.children}</span>
                  <button
                    type="button"
                    onClick={() => updateGuests('children', true)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Rooms</span>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => updateGuests('rooms', false)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{searchParams.guests.rooms}</span>
                  <button
                    type="button"
                    onClick={() => updateGuests('rooms', true)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
      >
        <Search className="w-5 h-5" />
        <span>Search Hotels</span>
      </button>
    </form>
  );
};

export default SearchForm;