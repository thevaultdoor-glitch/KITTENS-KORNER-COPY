
import React, { useState } from 'react';
import { Wind, Moon, Heart, Sparkles, Play, Library, Search, Film, Music, Clock, PlayCircle } from 'lucide-react';

interface MediaItem {
  id: string;
  title: string;
  type: 'Audio' | 'Video' | 'Podcast' | 'Guide';
  category: 'Music' | 'Relaxation' | 'Kids' | 'Parenting';
  duration: string;
  icon: React.ReactNode;
  color: string;
}

const ZenDen: React.FC = () => {
  const [view, setView] = useState<'discover' | 'library'>('discover');
  const [favorites, setFavorites] = useState<string[]>(['1', '3']); // Mock initial favorites

  const discoverItems: MediaItem[] = [
    { id: '1', title: "Kittie's House Mix #04", type: 'Audio', category: 'Music', duration: '45:00', icon: <Music size={20} />, color: "bg-pink-50 text-pink-600" },
    { id: '2', title: "5 Min Reset", type: 'Audio', category: 'Relaxation', duration: '05:00', icon: <Wind size={20} />, color: "bg-blue-50 text-blue-600" },
    { id: '3', title: "Bedtime Story: The Brave Kitten", type: 'Video', category: 'Kids', duration: '12:30', icon: <Film size={20} />, color: "bg-indigo-50 text-indigo-600" },
    { id: '4', title: "Mom Burnout Support", type: 'Podcast', category: 'Parenting', duration: '28:15', icon: <Heart size={20} />, color: "bg-orange-50 text-orange-600" },
    { id: '5', title: "Yah Tones for Sleep", type: 'Audio', category: 'Relaxation', duration: '60:00', icon: <Moon size={20} />, color: "bg-purple-50 text-purple-600" },
    { id: '6', title: "Emotions Affecting Baby", type: 'Video', category: 'Parenting', duration: '15:45', icon: <Sparkles size={20} />, color: "bg-yellow-50 text-yellow-600" },
  ];

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const favoriteItems = discoverItems.filter(item => favorites.includes(item.id));

  return (
    <div className="pb-40 animate-in fade-in duration-500">
      {/* Header with Navigation Toggle */}
      <div className="bg-blue-900 text-white p-8 pt-12 rounded-b-[3rem] relative overflow-hidden transition-all duration-700">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Moon size={160} />
        </div>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300 mb-2 block">Media Hub</span>
              <h1 className="text-3xl font-bold">The Zen Den</h1>
            </div>
            <div className="bg-white/10 p-1 rounded-2xl backdrop-blur-md flex">
              <button 
                onClick={() => setView('discover')}
                className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${view === 'discover' ? 'bg-white text-blue-900 shadow-lg' : 'text-blue-200'}`}
              >
                Discover
              </button>
              <button 
                onClick={() => setView('library')}
                className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${view === 'library' ? 'bg-white text-blue-900 shadow-lg' : 'text-blue-200'}`}
              >
                My Library
              </button>
            </div>
          </div>
          
          {view === 'discover' ? (
            <p className="text-blue-200 text-sm leading-relaxed mb-6 max-w-[80%]">
              Take 5 minutes for yourself, or find the perfect soundtrack for your little ones to play to.
            </p>
          ) : (
            <p className="text-blue-200 text-sm leading-relaxed mb-6 max-w-[80%]">
              Your curated favorites for work, relaxation, or keeping the kittens entertained.
            </p>
          )}

          <div className="flex gap-4">
            <button className="bg-white text-blue-900 px-6 py-2 rounded-full font-bold text-sm shadow-xl flex items-center gap-2 active:scale-95 transition-transform">
              <PlayCircle size={16} fill="currentColor" /> Play Daily Focus
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {view === 'discover' ? (
          <div className="space-y-8">
            <section>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Sparkles className="text-blue-500" size={20} /> New & Noteworthy
                </h3>
                <button className="text-xs text-blue-500 font-bold">See All</button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {discoverItems.map(item => (
                  <ZenCard 
                    key={item.id}
                    item={item} 
                    isFavorite={favorites.includes(item.id)}
                    onToggleFavorite={() => toggleFavorite(item.id)}
                  />
                ))}
              </div>
            </section>

            <section className="bg-white p-6 rounded-3xl border border-blue-50 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Continual Play Mixes</h3>
              <p className="text-xs text-gray-400 mb-4">High-energy house mixes with positive affirmations.</p>
              <div className="space-y-4">
                <PlaylistItem title="Workout & Play Mix" duration="1h 20m" type="Music" />
                <PlaylistItem title="Focus & Flow" duration="45m" type="Binaural" />
                <PlaylistItem title="Kids Dance Party" duration="30m" type="Fun" />
              </div>
            </section>
          </div>
        ) : (
          <div className="space-y-8 animate-in slide-in-from-right duration-300">
            {favoriteItems.length > 0 ? (
              <>
                <section>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Music className="text-pink-500" size={20} /> Saved Music & Audio
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {favoriteItems.filter(i => i.type === 'Audio' || i.type === 'Podcast').map(item => (
                      <LibraryListItem 
                        key={item.id} 
                        item={item} 
                        onRemove={() => toggleFavorite(item.id)} 
                      />
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Film className="text-indigo-500" size={20} /> Saved Videos
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {favoriteItems.filter(i => i.type === 'Video').map(item => (
                      <LibraryListItem 
                        key={item.id} 
                        item={item} 
                        onRemove={() => toggleFavorite(item.id)} 
                      />
                    ))}
                  </div>
                </section>
                
                <div className="bg-pink-500 p-6 rounded-[2rem] text-white flex items-center justify-between shadow-lg shadow-pink-100">
                  <div>
                    <h4 className="font-bold">Play My Library Mix</h4>
                    <p className="text-[10px] text-pink-100">Shuffles all your favorites for continual play</p>
                  </div>
                  <button className="bg-white text-pink-500 p-3 rounded-full shadow-lg">
                    <Play size={24} fill="currentColor" className="ml-0.5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
                <Library size={64} className="mb-4 text-blue-900" />
                <h3 className="text-xl font-bold text-blue-900">Your Library is Empty</h3>
                <p className="text-sm text-blue-800 max-w-[200px] mt-2">Favorite media items to see them here for easy playback.</p>
                <button 
                  onClick={() => setView('discover')}
                  className="mt-6 bg-blue-900 text-white px-8 py-3 rounded-full font-bold text-xs"
                >
                  Go Discover
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ZenCard: React.FC<{ item: MediaItem; isFavorite: boolean; onToggleFavorite: () => void }> = ({ item, isFavorite, onToggleFavorite }) => (
  <div className={`${item.color} p-4 rounded-3xl text-left border border-white shadow-sm flex flex-col justify-between h-40 transition-all hover:shadow-md relative group`}>
    <button 
      onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
      className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-sm transition-all ${isFavorite ? 'bg-pink-500 text-white shadow-lg' : 'bg-white/50 text-gray-400'}`}
    >
      <Heart size={14} fill={isFavorite ? "currentColor" : "none"} />
    </button>
    <div className="bg-white/50 w-10 h-10 rounded-xl flex items-center justify-center">
      {item.icon}
    </div>
    <div>
      <p className="text-[10px] font-bold uppercase opacity-60 mb-0.5">{item.type} • {item.duration}</p>
      <h4 className="font-bold text-xs leading-tight mb-2">{item.title}</h4>
      <button className="bg-white/60 hover:bg-white text-[9px] font-bold uppercase py-1 px-3 rounded-lg flex items-center gap-1">
        <Play size={8} fill="currentColor" /> Play
      </button>
    </div>
  </div>
);

const PlaylistItem: React.FC<{ title: string; duration: string; type: string }> = ({ title, duration, type }) => (
  <div className="flex items-center justify-between group cursor-pointer active:bg-blue-50 p-2 rounded-xl transition-colors">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-blue-500">
        <PlayCircle size={20} />
      </div>
      <div>
        <h4 className="text-sm font-bold text-gray-800">{title}</h4>
        <p className="text-[10px] text-gray-400">{type} • {duration}</p>
      </div>
    </div>
    <button className="text-blue-500 text-xs font-bold uppercase tracking-wider">Play</button>
  </div>
);

const LibraryListItem: React.FC<{ item: MediaItem; onRemove: () => void }> = ({ item, onRemove }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-sm group hover:border-pink-200 transition-colors">
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color.split(' ')[0]} ${item.color.split(' ')[1]}`}>
        {item.icon}
      </div>
      <div>
        <h4 className="text-sm font-bold text-gray-800">{item.title}</h4>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter flex items-center gap-1">
            <Clock size={8} /> {item.duration}
          </span>
          <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
          <span className="text-[9px] font-bold text-pink-500 uppercase tracking-tighter">{item.category}</span>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <button className="p-2 text-gray-400 hover:text-pink-500 transition-colors" onClick={onRemove}>
        <Heart size={18} fill="currentColor" className="text-pink-500" />
      </button>
      <button className="p-2 bg-gray-50 text-gray-800 rounded-full hover:bg-gray-800 hover:text-white transition-all">
        <Play size={16} fill="currentColor" />
      </button>
    </div>
  </div>
);

export default ZenDen;
