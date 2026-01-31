
export enum AppTab {
  HOME = 'home',
  PLAY = 'play',
  COMMUNITY = 'community',
  GAMES = 'games',
  MEDIA = 'media',
  SHOP = 'shop',
  ADMIN = 'admin',
  PROFILE = 'profile'
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'parent' | 'caregiver' | 'teacher' | 'admin';
  children: ChildProfile[];
  avatar: string;
  favorites: string[]; // Unified IDs
  musicFavorites: string[]; // Explicit music IDs
  videoFavorites: string[]; // Explicit video IDs
}

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  interests: string[];
  avatar: string;
  favorites: string[];
}

export interface Event {
  id: string;
  title: string;
  type: 'class' | 'party' | 'playdate' | 'meetup';
  date: string;
  time: string;
  location: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  category: 'energy' | 'sleep' | 'educational';
  duration: string;
  thumbnail: string;
}

export interface Game {
  id: string;
  title: string;
  category: 'kids' | 'parents';
  description: string;
  image: string;
  players: 'single' | 'dual' | 'team';
}

export interface Suggestion {
  id: string;
  user: string;
  category: 'game' | 'music' | 'video' | 'product' | 'other';
  text: string;
  timestamp: string;
}
