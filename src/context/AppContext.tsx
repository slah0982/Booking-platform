import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Hotel, SearchParams, BookingData, User, FilterOptions } from '../types';

interface AppState {
  searchParams: SearchParams;
  hotels: Hotel[];
  filteredHotels: Hotel[];
  selectedHotel: Hotel | null;
  currentBooking: Partial<BookingData> | null;
  user: User | null;
  filters: FilterOptions;
  loading: boolean;
  error: string | null;
}

type AppAction =
  | { type: 'SET_SEARCH_PARAMS'; payload: SearchParams }
  | { type: 'SET_HOTELS'; payload: Hotel[] }
  | { type: 'SET_FILTERED_HOTELS'; payload: Hotel[] }
  | { type: 'SET_SELECTED_HOTEL'; payload: Hotel | null }
  | { type: 'SET_CURRENT_BOOKING'; payload: Partial<BookingData> | null }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_FILTERS'; payload: FilterOptions }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: AppState = {
  searchParams: {
    destination: '',
    checkIn: null,
    checkOut: null,
    guests: {
      adults: 2,
      children: 0,
      rooms: 1,
    },
  },
  hotels: [],
  filteredHotels: [],
  selectedHotel: null,
  currentBooking: null,
  user: null,
  filters: {
    priceRange: [0, 1000],
    propertyTypes: [],
    amenities: [],
    rating: 0,
  },
  loading: false,
  error: null,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_SEARCH_PARAMS':
      return { ...state, searchParams: action.payload };
    case 'SET_HOTELS':
      return { ...state, hotels: action.payload };
    case 'SET_FILTERED_HOTELS':
      return { ...state, filteredHotels: action.payload };
    case 'SET_SELECTED_HOTEL':
      return { ...state, selectedHotel: action.payload };
    case 'SET_CURRENT_BOOKING':
      return { ...state, currentBooking: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}