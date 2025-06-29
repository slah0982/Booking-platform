import { Hotel } from '../types';

export const mockHotels: Hotel[] = [
  {
    id: '1',
    name: 'Grand Palais Hotel',
    location: 'Champs-Élysées, Paris',
    city: 'Paris',
    country: 'France',
    images: [
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    rating: 4.8,
    reviewCount: 1245,
    price: 280,
    originalPrice: 350,
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Gym', 'Concierge'],
    description: 'Luxury hotel in the heart of Paris with stunning views of the Champs-Élysées.',
    propertyType: 'hotel',
    coordinates: { lat: 48.8566, lng: 2.3522 },
    rooms: [
      {
        id: 'r1',
        type: 'Deluxe Room',
        description: 'Elegant room with city views',
        amenities: ['WiFi', 'Minibar', 'Safe'],
        price: 280,
        maxGuests: 2,
        images: ['https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800'],
        available: true,
      },
      {
        id: 'r2',
        type: 'Executive Suite',
        description: 'Spacious suite with premium amenities',
        amenities: ['WiFi', 'Minibar', 'Safe', 'Balcony'],
        price: 450,
        maxGuests: 4,
        images: ['https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=800'],
        available: true,
      },
    ],
    policies: {
      checkIn: '3:00 PM',
      checkOut: '11:00 AM',
      cancellation: 'Free cancellation up to 24 hours before check-in',
    },
  },
  {
    id: '2',
    name: 'Seaside Resort & Spa',
    location: 'Santorini, Greece',
    city: 'Santorini',
    country: 'Greece',
    images: [
      'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/261156/pexels-photo-261156.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    rating: 4.9,
    reviewCount: 892,
    price: 420,
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Beach Access', 'Gym'],
    description: 'Breathtaking resort overlooking the Aegean Sea with world-class amenities.',
    propertyType: 'resort',
    coordinates: { lat: 36.3932, lng: 25.4615 },
    rooms: [
      {
        id: 'r3',
        type: 'Ocean View Room',
        description: 'Room with panoramic ocean views',
        amenities: ['WiFi', 'Minibar', 'Balcony'],
        price: 420,
        maxGuests: 2,
        images: ['https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800'],
        available: true,
      },
    ],
    policies: {
      checkIn: '2:00 PM',
      checkOut: '12:00 PM',
      cancellation: 'Free cancellation up to 48 hours before check-in',
    },
  },
  {
    id: '3',
    name: 'Urban Boutique Hotel',
    location: 'Manhattan, New York',
    city: 'New York',
    country: 'USA',
    images: [
      'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    rating: 4.6,
    reviewCount: 756,
    price: 195,
    originalPrice: 240,
    amenities: ['WiFi', 'Restaurant', 'Bar', 'Gym', 'Business Center'],
    description: 'Modern boutique hotel in the heart of Manhattan with contemporary design.',
    propertyType: 'hotel',
    coordinates: { lat: 40.7829, lng: -73.9654 },
    rooms: [
      {
        id: 'r4',
        type: 'Standard Room',
        description: 'Comfortable room with modern amenities',
        amenities: ['WiFi', 'Desk', 'Safe'],
        price: 195,
        maxGuests: 2,
        images: ['https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800'],
        available: true,
      },
    ],
    policies: {
      checkIn: '3:00 PM',
      checkOut: '11:00 AM',
      cancellation: 'Free cancellation up to 24 hours before check-in',
    },
  },
  {
    id: '4',
    name: 'Alpine Mountain Lodge',
    location: 'Swiss Alps, Switzerland',
    city: 'Interlaken',
    country: 'Switzerland',
    images: [
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181273/pexels-photo-1181273.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    rating: 4.7,
    reviewCount: 543,
    price: 320,
    amenities: ['WiFi', 'Restaurant', 'Spa', 'Ski Storage', 'Mountain Views'],
    description: 'Cozy mountain lodge with spectacular Alpine views and world-class skiing.',
    propertyType: 'hotel',
    coordinates: { lat: 46.6863, lng: 7.8632 },
    rooms: [
      {
        id: 'r5',
        type: 'Alpine Room',
        description: 'Rustic room with mountain views',
        amenities: ['WiFi', 'Fireplace', 'Balcony'],
        price: 320,
        maxGuests: 3,
        images: ['https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800'],
        available: true,
      },
    ],
    policies: {
      checkIn: '4:00 PM',
      checkOut: '10:00 AM',
      cancellation: 'Free cancellation up to 72 hours before check-in',
    },
  },
  {
    id: '5',
    name: 'Tropical Paradise Villa',
    location: 'Bali, Indonesia',
    city: 'Ubud',
    country: 'Indonesia',
    images: [
      'https://images.pexels.com/photos/1488327/pexels-photo-1488327.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    rating: 4.9,
    reviewCount: 387,
    price: 150,
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Yoga Studio', 'Garden'],
    description: 'Serene villa surrounded by lush tropical gardens and rice paddies.',
    propertyType: 'villa',
    coordinates: { lat: -8.3405, lng: 115.0920 },
    rooms: [
      {
        id: 'r6',
        type: 'Garden Villa',
        description: 'Private villa with garden views',
        amenities: ['WiFi', 'Private Pool', 'Kitchen'],
        price: 150,
        maxGuests: 4,
        images: ['https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg?auto=compress&cs=tinysrgb&w=800'],
        available: true,
      },
    ],
    policies: {
      checkIn: '2:00 PM',
      checkOut: '12:00 PM',
      cancellation: 'Free cancellation up to 48 hours before check-in',
    },
  },
  {
    id: '6',
    name: 'Historic Castle Hotel',
    location: 'Edinburgh, Scotland',
    city: 'Edinburgh',
    country: 'Scotland',
    images: [
      'https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/276671/pexels-photo-276671.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    rating: 4.5,
    reviewCount: 672,
    price: 225,
    amenities: ['WiFi', 'Restaurant', 'Bar', 'Historic Tours', 'Library'],
    description: 'Historic castle converted into a luxury hotel with medieval charm.',
    propertyType: 'hotel',
    coordinates: { lat: 55.9533, lng: -3.1883 },
    rooms: [
      {
        id: 'r7',
        type: 'Castle Room',
        description: 'Historic room with period furnishings',
        amenities: ['WiFi', 'Fireplace', 'Antique Furniture'],
        price: 225,
        maxGuests: 2,
        images: ['https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=800'],
        available: true,
      },
    ],
    policies: {
      checkIn: '3:00 PM',
      checkOut: '11:00 AM',
      cancellation: 'Free cancellation up to 24 hours before check-in',
    },
  },
];