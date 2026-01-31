
import React, { useState } from 'react';
import { Upload, Plus, Music, Film, ShoppingBag, Gamepad2, Save, Trash2, Lightbulb, MessageSquare } from 'lucide-react';

const Admin: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'music' | 'video' | 'product' | 'game' | 'suggestions'>('music');
  const [status, setStatus] = useState<string | null>(null);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Uploading item...');
    setTimeout(() => {
      setStatus('Success! Item added to Kittens Korner database. 🐾');
      setTimeout(() => setStatus(null), 3000);
    }, 1500);
  };

  const menuItems = [
    { id: 'music', icon: Music, label: 'Playlists' },
    { id: 'video', icon: Film, label: 'Videos' },
    { id: 'product', icon: ShoppingBag, label: 'Products' },
    { id: 'game', icon: Gamepad2, label: 'Games' },
    { id: 'suggestions', icon: Lightbulb, label: 'User Ideas' },
  ];

  const sampleSuggestions = [
    { id: '1', user: 'Mama Sarah', category: 'game', text: 'More educational puzzles for toddlers.', time: '2h ago' },
    { id: '2', user: 'Papa John', category: 'music', text: 'Some classical music for nap time.', time: '5h ago' },
    { id: '3', user: 'Young Kittie (User)', category: 'product', text: 'Stuffed kittens that look like the app mascot!', time: '1d ago' },
  ];

  return (
    <div className="pb-40 animate-in fade-in duration-500 bg-gray-50 min-h-screen">
      <header className="p-6 bg-gray-800 text-white rounded-b-[2rem] shadow-xl">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <div className="bg-pink-500 p-2 rounded-xl"><Plus size={24} /></div>
          KKPP Admin Center
        </h1>
        <p className="text-gray-400 text-xs mt-2 uppercase tracking-widest font-bold">Content Management System</p>
      </header>

      <div className="p-6">
        {status && (
          <div className="mb-6 bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 animate-bounce">
            <Save size={18} /> {status}
          </div>
        )}

        <div className="grid grid-cols-5 gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveCategory(item.id as any)}
              className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all min-w-[70px] ${
                activeCategory === item.id ? 'bg-pink-500 text-white shadow-lg' : 'bg-white text-gray-500'
              }`}
            >
              <item.icon size={20} />
              <span className="text-[8px] font-bold uppercase whitespace-nowrap">{item.label}</span>
            </button>
          ))}
        </div>

        {activeCategory === 'suggestions' ? (
          <div className="space-y-4 animate-in slide-in-from-left duration-300">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-tighter mb-4 flex items-center gap-2 px-2">
              <Lightbulb size={18} className="text-orange-500" /> Community Wishlist
            </h3>
            {sampleSuggestions.map(s => (
              <div key={s.id} className="bg-white p-5 rounded-[2rem] border border-orange-100 shadow-sm relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                  <MessageSquare size={48} />
                </div>
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase">{s.category}</span>
                  <span className="text-[9px] text-gray-400 font-bold">{s.time}</span>
                </div>
                <p className="text-sm font-medium text-gray-700 leading-snug mb-3">"{s.text}"</p>
                <div className="flex items-center gap-2 text-[10px] text-gray-400">
                  <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 font-bold">
                    {s.user.charAt(0)}
                  </div>
                  <span className="font-bold">{s.user}</span>
                  <button className="ml-auto text-pink-500 font-bold hover:underline">Mark for Review</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <form onSubmit={handleUpload} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 space-y-4 animate-in slide-in-from-right duration-300">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-tighter mb-4">Upload New {activeCategory}</h3>
            
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 ml-2">TITLE</label>
              <input type="text" placeholder="Enter name..." className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-pink-200" required />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 ml-2">DESCRIPTION</label>
              <textarea placeholder="Tell the parents about it..." className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-pink-200 h-24" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 ml-2">CATEGORY TAG</label>
                <select className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-pink-200">
                  <option>Active Play</option>
                  <option>Rest/Sleep</option>
                  <option>Educational</option>
                  <option>Parent Wellness</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 ml-2">PRICE/FEE</label>
                <input type="number" placeholder="$0.00" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-pink-200" />
              </div>
            </div>

            <div className="border-2 border-dashed border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center gap-2 text-gray-400">
              <Upload size={32} strokeWidth={1.5} />
              <p className="text-[10px] font-bold uppercase">Drag & Drop Media Assets</p>
              <button type="button" className="text-[10px] text-pink-500 font-bold underline">Browse Files</button>
            </div>

            <button type="submit" className="w-full bg-gray-800 text-white py-4 rounded-2xl font-bold shadow-xl flex items-center justify-center gap-2 hover:bg-pink-600 transition-colors">
              <Save size={18} /> Push to App Store
            </button>
          </form>
        )}

        {activeCategory !== 'suggestions' && (
          <div className="mt-8">
            <h3 className="text-sm font-bold text-gray-800 mb-4 px-2">Live Content</h3>
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white p-3 rounded-xl flex items-center justify-between border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-pink-100 rounded-lg" />
                    <div>
                      <p className="text-xs font-bold text-gray-800">Sample {activeCategory} {i}</p>
                      <p className="text-[8px] text-gray-400">Added yesterday</p>
                    </div>
                  </div>
                  <button className="text-red-400 hover:bg-red-50 p-2 rounded-lg"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
