import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Wifi, 
  Car, 
  Coffee, 
  Waves, 
  Heart, 
  Share2, 
  ChevronLeft, 
  ChevronRight,
  Users,
  Calendar,
  Check,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockHotels } from '../data/mockData';
import { Room } from '../types';

const HotelDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  const hotel = mockHotels.find(h => h.id === id);

  useEffect(() => {
    if (!hotel) {
      navigate('/hotels');
      return;
    }
    dispatch({ type: 'SET_SELECTED_HOTEL', payload: hotel });
  }, [hotel, dispatch, navigate]);

  if (!hotel) {
    return <div>Loading...</div>;
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % hotel.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + hotel.images.length) % hotel.images.length);
  };

  const handleBookRoom = (room: Room) => {
    if (!state.searchParams.checkIn || !state.searchParams.checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }

    const nights = Math.ceil(
      (state.searchParams.checkOut.getTime() - state.searchParams.checkIn.getTime()) / (1000 * 60 * 60 * 24)
    );

    dispatch({
      type: 'SET_CURRENT_BOOKING',
      payload: {
        hotel,
        room,
        checkIn: state.searchParams.checkIn,
        checkOut: state.searchParams.checkOut,
        guests: state.searchParams.guests,
        totalPrice: room.price * nights,
        nights,
      },
    });

    navigate('/booking');
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="w-5 h-5" />;
      case 'pool':
        return <Waves className="w-5 h-5" />;
      case 'restaurant':
        return <Coffee className="w-5 h-5" />;
      case 'parking':
        return <Car className="w-5 h-5" />;
      default:
        return <Check className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back to results</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600">
                <Heart className="w-5 h-5" />
                <span>Save</span>
              </button>
            </div>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-medium">{hotel.rating}</span>
                  <span className="text-gray-600">({hotel.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{hotel.location}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">${hotel.price}</div>
              <div className="text-sm text-gray-600">per night</div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative h-96 rounded-xl overflow-hidden">
            <img
              src={hotel.images[currentImageIndex]}
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
            
            {hotel.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {hotel.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">About this property</h2>
              <p className="text-gray-700 leading-relaxed">{hotel.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {(showAllAmenities ? hotel.amenities : hotel.amenities.slice(0, 6)).map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    {getAmenityIcon(amenity)}
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
              {hotel.amenities.length > 6 && (
                <button
                  onClick={() => setShowAllAmenities(!showAllAmenities)}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  {showAllAmenities ? 'Show less' : `Show all ${hotel.amenities.length} amenities`}
                </button>
              )}
            </div>

            {/* Rooms */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Available Rooms</h2>
              <div className="space-y-4">
                {hotel.rooms.map((room) => (
                  <div key={room.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{room.type}</h3>
                        <p className="text-gray-600 text-sm">{room.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-1 text-sm text-gray-600">
                            <Users className="w-4 h-4" />
                            <span>Max {room.maxGuests} guests</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">${room.price}</div>
                        <div className="text-sm text-gray-600">per night</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-3">
                      {room.amenities.slice(0, 3).map((amenity, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {amenity}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        {room.available ? (
                          <div className="flex items-center space-x-1 text-green-600">
                            <Check className="w-4 h-4" />
                            <span className="text-sm">Available</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1 text-red-600">
                            <X className="w-4 h-4" />
                            <span className="text-sm">Not available</span>
                          </div>
                        )}
                      </div>
                      
                      <button
                        onClick={() => handleBookRoom(room)}
                        disabled={!room.available}
                        className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                          room.available
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {room.available ? 'Book Now' : 'Unavailable'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-8">
              <h3 className="text-lg font-semibold mb-4">Your stay</h3>
              
              {state.searchParams.checkIn && state.searchParams.checkOut ? (
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium">
                        {state.searchParams.checkIn.toLocaleDateString()} - {state.searchParams.checkOut.toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-600">
                        {Math.ceil((state.searchParams.checkOut.getTime() - state.searchParams.checkIn.getTime()) / (1000 * 60 * 60 * 24))} nights
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium">
                        {state.searchParams.guests.adults + state.searchParams.guests.children} guests
                      </div>
                      <div className="text-sm text-gray-600">
                        {state.searchParams.guests.rooms} room{state.searchParams.guests.rooms !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select dates to see pricing and availability</p>
                </div>
              )}

              {/* Policies */}
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Policies</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>Check-in: {hotel.policies.checkIn}</div>
                  <div>Check-out: {hotel.policies.checkOut}</div>
                  <div>{hotel.policies.cancellation}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailPage;