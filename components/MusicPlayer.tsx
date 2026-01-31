
import React, { useState } from 'react';
import { Play, Pause, SkipForward, Music, Heart, Library } from 'lucide-react';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorited, setIsFavorited] = useState(true); // Default to favorited for library feel

  return (
    <div className="fixed bottom-24 left-4 right-4 bg-white/90 backdrop-blur-md border border-pink-100 rounded-2xl p-3 shadow-xl flex items-center justify-between z-40 animate-in slide-in-from-bottom duration-500">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 kitten-gradient rounded-lg flex items-center justify-center text-white shadow-inner relative">
          <Music size={20} />
          {isFavorited && (
            <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full p-0.5 border border-white">
              <Library size={8} />
            </div>
          )}
        </div>
        <div>
          <p className="text-xs font-bold text-gray-800 line-clamp-1">Kittie's House Mix #04</p>
          <div className="flex items-center gap-1">
            <p className="text-[10px] text-pink-500 font-medium">Active Playtime</p>
            {isFavorited && <span className="text-[8px] bg-blue-100 text-blue-600 px-1 rounded-sm font-bold uppercase tracking-tighter">In Library</span>}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setIsFavorited(!isFavorited)}
          className={`p-1.5 transition-colors ${isFavorited ? 'text-pink-500' : 'text-gray-300'}`}
        >
          <Heart size={18} fill={isFavorited ? "currentColor" : "none"} />
        </button>
        <button onClick={() => setIsPlaying(!isPlaying)} className="bg-pink-500 text-white p-2 rounded-full shadow-lg shadow-pink-200 active:scale-90 transition-transform">
          {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
        </button>
        <button className="text-gray-400">
          <SkipForward size={18} />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
