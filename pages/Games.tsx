
import React, { useState } from 'react';
import { Gamepad2, Users, User, Trophy, Play, Heart } from 'lucide-react';
import { Game } from '../types';

const Games: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'kids' | 'parents'>('kids');
  const [favorites, setFavorites] = useState<string[]>([]);

  const games: Game[] = [
    { id: '1', title: 'Kittie Adventure', category: 'kids', description: 'Help Kittie find the golden yarn!', image: 'https://picsum.photos/seed/kgame1/400/300', players: 'single' },
    { id: '2', title: 'Empathy Journey', category: 'kids', description: 'A social learning game for kids.', image: 'https://picsum.photos/seed/kgame2/400/300', players: 'dual' },
    { id: '3', title: 'Parenting Tycoon', category: 'parents', description: 'Manage a virtual nursery!', image: 'https://picsum.photos/seed/pgame1/400/300', players: 'single' },
    { id: '4', title: 'Trivia Night: 90s Edition', category: 'parents', description: 'Compete with other parents.', image: 'https://picsum.photos/seed/pgame2/400/300', players: 'team' },
    { id: '5', title: 'Zen Puzzles', category: 'parents', description: 'Relaxing puzzles for busy moms.', image: 'https://picsum.photos/seed/pgame3/400/300', players: 'single' },
    { id: '6', title: 'Team Kitten Dodgeball', category: 'kids', description: 'Fast-paced fun for the whole squad.', image: 'https://picsum.photos/seed/kgame3/400/300', players: 'team' },
  ];

  const filteredGames = games.filter(g => g.category === activeFilter);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="pb-40 animate-in fade-in duration-500">
      <header className="p-6 bg-white border-b border-pink-50 sticky top-0 z-20">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Kittie Arcade</h1>
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveFilter('kids')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeFilter === 'kids' ? 'bg-white text-pink-500 shadow-sm' : 'text-gray-500'
            }`}
          >
            Kids Corner
          </button>
          <button
            onClick={() => setActiveFilter('parents')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeFilter === 'parents' ? 'bg-white text-pink-500 shadow-sm' : 'text-gray-500'
            }`}
          >
            Parents Lounge
          </button>
        </div>
      </header>

      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">
            {activeFilter === 'kids' ? 'Featured Kid Games' : 'Parent Pick-me-ups'}
          </h2>
          <div className="flex gap-2">
            <span className="bg-pink-100 text-pink-600 p-1.5 rounded-lg"><Trophy size={16} /></span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {filteredGames.map(game => (
            <div key={game.id} className="bg-white rounded-3xl overflow-hidden border border-pink-50 shadow-sm group">
              <div className="h-48 relative">
                <img src={game.image} alt={game.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5">
                  {game.players === 'single' && <User size={12} className="text-blue-500" />}
                  {game.players === 'dual' && <Users size={12} className="text-pink-500" />}
                  {game.players === 'team' && <Gamepad2 size={12} className="text-orange-500" />}
                  <span className="text-[10px] font-bold text-gray-700 capitalize">{game.players} Play</span>
                </div>
                {/* Playlist Toggle */}
                <button 
                  onClick={() => toggleFavorite(game.id)}
                  className={`absolute bottom-4 right-4 p-2 rounded-full shadow-lg transition-all ${
                    favorites.includes(game.id) ? 'bg-pink-500 text-white' : 'bg-white/90 text-gray-400'
                  }`}
                >
                  <Heart size={18} fill={favorites.includes(game.id) ? "currentColor" : "none"} />
                </button>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-1">{game.title}</h3>
                <p className="text-xs text-gray-500 mb-4">{game.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-pink-100 text-[8px] flex items-center justify-center font-bold">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                    <span className="text-[8px] text-gray-400 ml-4 self-center">+1.2k playing</span>
                  </div>
                  <button className="bg-pink-500 text-white px-6 py-2 rounded-full text-xs font-bold shadow-lg shadow-pink-100 flex items-center gap-2">
                    <Play size={14} fill="currentColor" /> Play Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Games;
