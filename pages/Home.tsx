
import React, { useState, useEffect } from 'react';
import { Bell, MapPin, Calendar, Star, Quote, ShoppingBag, ArrowRight, Award } from 'lucide-react';
import { getDailyParentingTip } from '../services/geminiService';

interface HomeProps {
  onShopNow?: () => void;
}

const Home: React.FC<HomeProps> = ({ onShopNow }) => {
  const [tip, setTip] = useState("Purring for tips...");
  const [location, setLocation] = useState("Mesa, AZ");

  useEffect(() => {
    const fetchTip = async () => {
      const dailyTip = await getDailyParentingTip("a parent of a 2-year old girl");
      setTip(dailyTip);
    };
    fetchTip();
  }, []);

  return (
    <div className="pb-40 animate-in fade-in duration-500">
      {/* Header */}
      <header className="p-6 bg-white rounded-b-[2rem] shadow-sm border-b border-pink-50">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🐱</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Hi, Mama Sarah!</h1>
              <div className="flex items-center gap-1 text-gray-500 text-xs">
                <MapPin size={12} />
                <select 
                  className="bg-transparent border-none focus:ring-0 cursor-pointer font-medium"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option>Mesa, AZ</option>
                  <option>Phoenix, AZ</option>
                  <option>Scottsdale, AZ</option>
                  <option>Mall Expansion - Coming Soon</option>
                </select>
              </div>
            </div>
          </div>
          <button className="relative p-2 text-gray-400 bg-gray-50 rounded-full">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full border-2 border-white"></span>
          </button>
        </div>

        {/* Daily Tip Card */}
        <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-110 transition-transform">
            <Star size={64} fill="currentColor" className="text-orange-300" />
          </div>
          <h2 className="text-orange-700 font-bold text-sm mb-1 uppercase tracking-tight">Kittie's Daily Tip</h2>
          <p className="text-orange-800 text-sm italic font-medium leading-snug pr-8">"{tip}"</p>
        </div>
      </header>

      {/* Shop Now Banner */}
      <section className="px-6 mt-6">
        <button 
          onClick={onShopNow}
          className="w-full bg-gray-800 rounded-3xl p-5 text-left text-white shadow-xl flex items-center justify-between relative overflow-hidden group active:scale-[0.98] transition-all"
        >
          <div className="relative z-10">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <ShoppingBag size={20} className="text-pink-500" /> Shop Now
            </h3>
            <p className="text-xs text-gray-400 mt-1 max-w-[180px]">Books, toys, and clothes for your little kittens!</p>
            <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-pink-500 uppercase tracking-widest">
              Explore Collection <ArrowRight size={10} />
            </div>
          </div>
          <div className="bg-white/10 p-4 rounded-2xl relative z-10 group-hover:rotate-12 transition-transform">
            <ShoppingBag size={32} />
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl"></div>
        </button>
      </section>

      {/* Featured Feature: Adopt a Kitten */}
      <section className="px-6 mt-6">
        <div className="bg-white border border-yellow-100 p-4 rounded-3xl shadow-sm flex items-center gap-4 relative overflow-hidden">
          <div className="w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-600 shadow-inner">
            <Award size={32} />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-gray-800">Adopt a Kitten Program</h3>
            <p className="text-[10px] text-gray-500">Official certificates with every toy kitten!</p>
            <button 
              onClick={onShopNow}
              className="mt-2 text-[10px] font-bold text-yellow-600 uppercase flex items-center gap-1 hover:underline"
            >
              See Adoption Center <ArrowRight size={8} />
            </button>
          </div>
          <div className="absolute -right-4 top-0 p-2 opacity-5">
             <span className="text-7xl">🐾</span>
          </div>
        </div>
      </section>

      {/* Main Bio/Quote Section */}
      <section className="px-6 py-8">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-pink-50 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-pink-500 text-white rounded-2xl flex items-center justify-center shadow-lg">
              <Quote size={24} />
            </div>
            <h3 className="font-bold text-gray-800">Our Focus is YOU</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            "At KKPP our focus is about YOU, the parent. We take a parent-centered approach to raising a family and believe that happy and healthy parents have happier and healthier children and homes."
          </p>
          <div className="border-t border-gray-100 pt-4 mt-4">
            <p className="text-gray-400 text-xs italic">
              "Children do not just learn, they are taught. They are born as blank slates and everything they know they learn from you and their environment. Choose wisely what they’re exposed to."
            </p>
          </div>
        </div>

        {/* Quick Links / Grid */}
        <h3 className="text-lg font-bold text-gray-800 mb-4 px-2">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <QuickActionCard 
            title="Book Play" 
            desc="Open sessions" 
            icon="🎡" 
            bgColor="bg-blue-50" 
            textColor="text-blue-600" 
          />
          <QuickActionCard 
            title="Classes" 
            desc="Parent & Me" 
            icon="🎨" 
            bgColor="bg-purple-50" 
            textColor="text-purple-600" 
          />
          <QuickActionCard 
            title="Support" 
            desc="Parent Lounge" 
            icon="🧘" 
            bgColor="bg-green-50" 
            textColor="text-green-600" 
          />
          <QuickActionCard 
            title="Adoption Center" 
            desc="Adopt a Kitten" 
            icon="📜" 
            bgColor="bg-yellow-50" 
            textColor="text-yellow-700" 
            onClick={onShopNow}
          />
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="px-6 pb-12">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Happening Soon</h3>
          <button className="text-pink-500 text-sm font-bold">View All</button>
        </div>
        <div className="space-y-4">
          <EventCard 
            title="Messy Storytime" 
            time="Tomorrow, 10:00 AM" 
            location="Soft Play Area" 
            tag="Class" 
          />
          <EventCard 
            title="Mommy Mingle" 
            time="Wed, 2:00 PM" 
            location="Zen Den" 
            tag="Meetup" 
          />
        </div>
      </section>
    </div>
  );
};

const QuickActionCard: React.FC<{ title: string; desc: string; icon: string; bgColor: string; textColor: string; onClick?: () => void }> = ({ title, desc, icon, bgColor, textColor, onClick }) => (
  <button 
    onClick={onClick}
    className={`${bgColor} p-4 rounded-3xl text-left border border-white/50 shadow-sm transition-transform active:scale-95`}
  >
    <span className="text-2xl mb-2 block">{icon}</span>
    <h4 className={`font-bold text-sm ${textColor}`}>{title}</h4>
    <p className="text-[10px] text-gray-500 font-medium">{desc}</p>
  </button>
);

const EventCard: React.FC<{ title: string; time: string; location: string; tag: string }> = ({ title, time, location, tag }) => (
  <div className="bg-white p-4 rounded-2xl border border-pink-50 flex items-center gap-4 shadow-sm">
    <div className="w-12 h-12 bg-pink-50 rounded-xl flex flex-col items-center justify-center text-pink-500 font-bold">
      <Calendar size={20} />
    </div>
    <div className="flex-1">
      <span className="text-[10px] uppercase font-bold text-pink-500 mb-1 block tracking-wider">{tag}</span>
      <h4 className="text-sm font-bold text-gray-800">{title}</h4>
      <p className="text-xs text-gray-400">{time} • {location}</p>
    </div>
    <button className="bg-pink-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-tighter">Book</button>
  </div>
);

export default Home;
