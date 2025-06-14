export interface Hotel {
  id: string;
  name: string;
  location: string;
  city: string;
  country: string;
  images: string[];
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  amenities: string[];
  description: string;
  propertyType: 'hotel' | 'apartment' | 'resort' | 'villa' | 'hostel';
  coordinates: {
    lat: number;
    lng: number;
  };
  rooms: Room[];
  policies: {
    checkIn: string;
    checkOut: string;
    cancellation: string;
  };
}

export interface Room {
  id: string;
  type: string;
  description: string;
  amenities: string[];
  price: number;
  maxGuests: number;
  images: string[];
  available: boolean;
}

export interface SearchParams {
  destination: string;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: {
    adults: number;
    children: number;
    rooms: number;
  };
}

export interface BookingData {
  hotel: Hotel;
  room: Room;
  checkIn: Date;
  checkOut: Date;
  guests: {
    adults: number;
    children: number;
    rooms: number;
  };
  guestInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  totalPrice: number;
  nights: number;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bookings: BookingData[];
}

export interface FilterOptions {
  priceRange: [number, number];
  propertyTypes: string[];
  amenities: string[];
  rating: number;
}