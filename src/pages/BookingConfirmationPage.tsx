import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Calendar, MapPin, Users, Mail, Phone, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';

const BookingConfirmationPage: React.FC = () => {
  const { state } = useApp();

  if (!state.currentBooking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No booking found</h1>
          <Link to="/hotels" className="text-blue-600 hover:text-blue-700">
            Browse hotels
          </Link>
        </div>
      </div>
    );
  }

  const { hotel, room, checkIn, checkOut, guests, totalPrice, nights } = state.currentBooking;
  const bookingId = `BKG${Date.now().toString().slice(-6)}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-lg text-gray-600">
            Your reservation has been confirmed. You'll receive a confirmation email shortly.
          </p>
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-green-50 px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Booking Confirmation</h2>
                <p className="text-sm text-gray-600">Confirmation Number: {bookingId}</p>
              </div>
              <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Hotel Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Hotel Details</h3>
                <div className="space-y-4">
                  <img
                    src={hotel!.images[0]}
                    alt={hotel!.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{hotel!.name}</h4>
                    <div className="flex items-center space-x-1 text-gray-600 mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>{hotel!.location}</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-2">Room Details</h5>
                    <p className="text-gray-700">{room!.type}</p>
                    <p className="text-sm text-gray-600">{room!.description}</p>
                  </div>
                </div>
              </div>

              {/* Booking Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Booking Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Calendar className="w-4 h-4 text-gray-600" />
                        <span className="font-medium">Check-in</span>
                      </div>
                      <p className="text-gray-900">{checkIn!.toLocaleDateString()}</p>
                      <p className="text-sm text-gray-600">From 3:00 PM</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Calendar className="w-4 h-4 text-gray-600" />
                        <span className="font-medium">Check-out</span>
                      </div>
                      <p className="text-gray-900">{checkOut!.toLocaleDateString()}</p>
                      <p className="text-sm text-gray-600">Until 11:00 AM</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="w-4 h-4 text-gray-600" />
                      <span className="font-medium">Guests</span>
                    </div>
                    <p className="text-gray-900">
                      {guests!.adults} adult{guests!.adults !== 1 ? 's' : ''}
                      {guests!.children > 0 && `, ${guests!.children} child${guests!.children !== 1 ? 'ren' : ''}`}
                    </p>
                    <p className="text-sm text-gray-600">{guests!.rooms} room{guests!.rooms !== 1 ? 's' : ''}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-3">Price Breakdown</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Room rate ({nights} nights):</span>
                        <span>${room!.price * nights!}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxes & fees:</span>
                        <span>${Math.round(totalPrice! * 0.15)}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                        <span>Total Paid:</span>
                        <span>${totalPrice! + Math.round(totalPrice! * 0.15)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Important Information</h3>
          <div className="space-y-3 text-sm text-blue-800">
            <div className="flex items-start space-x-2">
              <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>A confirmation email has been sent to your email address with all the booking details.</p>
            </div>
            <div className="flex items-start space-x-2">
              <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>For any changes or cancellations, please contact the hotel directly or call our customer service.</p>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>Please bring a valid ID and the credit card used for booking during check-in.</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/profile"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-center transition-colors"
          >
            View My Bookings
          </Link>
          <Link
            to="/hotels"
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-8 py-3 rounded-lg font-semibold text-center transition-colors"
          >
            Book Another Hotel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;