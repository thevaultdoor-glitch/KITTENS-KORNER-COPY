
import React, { useState } from 'react';
import { Search, Info, Map as MapIcon, ChevronRight } from 'lucide-react';

const Play: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sessions' | 'classes' | 'tours'>('sessions');

  return (
    <div className="pb-40 animate-in slide-in-from-right duration-300">
      <header className="p-6 bg-white border-b border-pink-50 sticky top-0 z-20">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Play & Explore</h1>
        <div className="flex bg-gray-100 p-1 rounded-xl">
          {(['sessions', 'classes', 'tours'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === tab ? 'bg-white text-pink-500 shadow-sm' : 'text-gray-500'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </header>

      <div className="p-6">
        {activeTab === 'sessions' && (
          <div className="space-y-6">
            <div className="bg-pink-500 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl shadow-pink-100">
              <div className="relative z-10">
                <h2 className="text-xl font-bold mb-2">Book Open Play</h2>
                <p className="text-sm opacity-90 mb-4">Unlimited access to our safe, padded indoor play area for kids 0-6.</p>
                <button className="bg-white text-pink-500 px-6 py-2 rounded-full text-sm font-bold shadow-lg">Reserve a Spot</button>
              </div>
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <MapIcon size={120} />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-pink-50 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3 text-orange-500">
                <Info size={16} />
                <h3 className="text-xs font-bold uppercase">Safety & Policy</h3>
              </div>
              <ul className="text-xs text-gray-600 space-y-2 font-medium">
                <li className="flex gap-2"><span>🐾</span> 12 months & under: Grip socks or barefoot</li>
                <li className="flex gap-2"><span>🐾</span> Toddlers (1-6): Grip socks required</li>
                <li className="flex gap-2"><span>🐾</span> Adults: Socks required at all times</li>
                <li className="flex gap-2"><span>🐾</span> Age limit: Strictly 0-6 years old</li>
              </ul>
            </div>
            
            <h3 className="text-lg font-bold text-gray-800">Play Areas</h3>
            <div className="grid grid-cols-1 gap-4">
              {['Soft Play Meadow', 'Pretend Play Village', 'Sensory Rotation', 'Activity Wall'].map((area) => (
                <div key={area} className="group flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-50 shadow-sm active:bg-pink-50">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-12 bg-pink-100 rounded-lg overflow-hidden">
                      <img src={`https://picsum.photos/seed/${area}/100/100`} alt={area} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-800">{area}</h4>
                      <p className="text-[10px] text-gray-400">View highlights & safety tips</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-300" />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'classes' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Parent & Me Classes</h3>
            {[
              { title: "Music & Movement", instructor: "Miss Jojo", price: "$15", time: "Mon 11:00 AM" },
              { title: "Messy Art Express", instructor: "Mr. Dave", price: "$20", time: "Tue 2:00 PM" },
              { title: "Toddler Yoga", instructor: "Yoga Cat", price: "$12", time: "Wed 9:00 AM" },
            ].map((cls) => (
              <div key={cls.title} className="bg-white p-4 rounded-2xl border border-pink-50 flex justify-between items-center shadow-sm">
                <div>
                  <h4 className="font-bold text-gray-800">{cls.title}</h4>
                  <p className="text-xs text-gray-500">{cls.instructor} • {cls.time}</p>
                  <p className="text-pink-500 font-bold text-xs mt-1">{cls.price}</p>
                </div>
                <button className="bg-gray-800 text-white px-4 py-2 rounded-full text-xs font-bold">Sign Up</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tours' && (
          <div className="grid grid-cols-2 gap-4">
            {['soft play', 'pretend play', 'climb & crash', 'sensory'].map((tour) => (
              <div key={tour} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-pink-50">
                <div className="h-28 bg-gray-200">
                   <img src={`https://picsum.photos/seed/${tour}/300/200`} alt={tour} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                   <h4 className="text-xs font-bold text-gray-800 capitalize">{tour} Tour</h4>
                   <button className="text-[10px] text-pink-500 font-bold mt-1">Watch 360°</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Play;
