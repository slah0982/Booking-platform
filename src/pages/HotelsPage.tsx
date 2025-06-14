import React, { useEffect, useState } from 'react';
import { Filter, SlidersHorizontal, Grid, List } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockHotels } from '../data/mockData';
import HotelCard from '../components/HotelCard';
import FilterSidebar from '../components/FilterSidebar';

const HotelsPage: React.FC = () => {
  const { state, dispatch } = useApp();
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('recommended');

  useEffect(() => {
    dispatch({ type: 'SET_HOTELS', payload: mockHotels });
    dispatch({ type: 'SET_FILTERED_HOTELS', payload: mockHotels });
  }, [dispatch]);

  useEffect(() => {
    let filtered = [...state.hotels];

    // Apply filters
    if (state.filters.priceRange[0] > 0 || state.filters.priceRange[1] < 1000) {
      filtered = filtered.filter(hotel => 
        hotel.price >= state.filters.priceRange[0] && 
        hotel.price <= state.filters.priceRange[1]
      );
    }

    if (state.filters.propertyTypes.length > 0) {
      filtered = filtered.filter(hotel => 
        state.filters.propertyTypes.includes(hotel.propertyType)
      );
    }

    if (state.filters.rating > 0) {
      filtered = filtered.filter(hotel => hotel.rating >= state.filters.rating);
    }

    if (state.filters.amenities.length > 0) {
      filtered = filtered.filter(hotel =>
        state.filters.amenities.every(amenity =>
          hotel.amenities.includes(amenity)
        )
      );
    }

    // Apply search destination filter
    if (state.searchParams.destination) {
      filtered = filtered.filter(hotel =>
        hotel.location.toLowerCase().includes(state.searchParams.destination.toLowerCase()) ||
        hotel.city.toLowerCase().includes(state.searchParams.destination.toLowerCase()) ||
        hotel.country.toLowerCase().includes(state.searchParams.destination.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // Keep original order for recommended
        break;
    }

    dispatch({ type: 'SET_FILTERED_HOTELS', payload: filtered });
  }, [state.hotels, state.filters, state.searchParams.destination, sortBy, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {state.searchParams.destination || 'All Hotels'}
              </h1>
              <p className="text-gray-600">
                {state.filteredHotels.length} properties found
                {state.searchParams.checkIn && state.searchParams.checkOut && (
                  <span className="ml-2">
                    • {state.searchParams.checkIn.toLocaleDateString()} - {state.searchParams.checkOut.toLocaleDateString()}
                  </span>
                )}
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="reviews">Most Reviewed</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(true)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 lg:hidden"
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block">
            <FilterSidebar isOpen={true} onClose={() => {}} />
          </div>

          {/* Mobile Filter Sidebar */}
          <FilterSidebar isOpen={showFilters} onClose={() => setShowFilters(false)} />

          {/* Main Content */}
          <div className="flex-1">
            {state.filteredHotels.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <SlidersHorizontal className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hotels found</h3>
                <p className="text-gray-600">
                  Try adjusting your filters or search criteria to find more results.
                </p>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {state.filteredHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelsPage;