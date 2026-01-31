
import React, { useState } from 'react';
import { UserCircle, Plus, Heart, Settings, ShieldCheck, ChevronRight, Save, Camera, Mail, Lock, UserPlus, Music, Film, Library, Play } from 'lucide-react';
import { UserProfile, ChildProfile } from '../types';

const X = ({size}: {size: number}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

const Profile: React.FC = () => {
  const [parent, setParent] = useState<UserProfile>({
    id: 'p1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'parent',
    children: [
      { id: 'c1', name: 'Luna', age: 3, interests: ['Art', 'Music'], avatar: '🐱', favorites: ['Kittie House Mix #04'] }
    ],
    avatar: '👩‍🦰',
    favorites: ['1', '3'],
    musicFavorites: ['m1', 'm2'],
    videoFavorites: ['v1']
  });

  const [setupMode, setSetupMode] = useState<'view' | 'parent-setup' | 'child-setup'>('view');
  const [tempParent, setTempParent] = useState({...parent});
  const [newChild, setNewChild] = useState<Partial<ChildProfile>>({ name: '', age: 0, avatar: '🐈' });

  const handleSaveParent = () => {
    setParent(tempParent);
    setSetupMode('view');
  };

  const handleSaveChild = () => {
    if (newChild.name) {
      const child: ChildProfile = {
        id: Date.now().toString(),
        name: newChild.name,
        age: newChild.age || 0,
        interests: [],
        avatar: newChild.avatar || '🐈',
        favorites: []
      };
      setParent({ ...parent, children: [...parent.children, child] });
      setNewChild({ name: '', age: 0, avatar: '🐈' });
      setSetupMode('view');
    }
  };

  if (setupMode === 'parent-setup') {
    return (
      <div className="p-8 pb-40 animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Parent Setup</h1>
          <button onClick={() => setSetupMode('view')} className="text-gray-400">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col items-center gap-3">
             <div className="w-24 h-24 bg-pink-100 rounded-[2.5rem] flex items-center justify-center text-4xl shadow-inner relative">
               {tempParent.avatar}
               <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md border border-pink-50 text-pink-500">
                 <Camera size={16} />
               </button>
             </div>
             <p className="text-[10px] font-bold text-pink-500 uppercase">Change Avatar</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 ml-2 uppercase">Full Name</label>
              <div className="flex items-center bg-white border border-pink-50 rounded-2xl px-4 py-3 gap-3 shadow-sm">
                <UserCircle size={18} className="text-pink-300" />
                <input 
                  type="text" 
                  value={tempParent.name}
                  onChange={e => setTempParent({...tempParent, name: e.target.value})}
                  className="bg-transparent border-none focus:ring-0 text-sm font-medium w-full"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 ml-2 uppercase">Email Address</label>
              <div className="flex items-center bg-white border border-pink-50 rounded-2xl px-4 py-3 gap-3 shadow-sm">
                <Mail size={18} className="text-pink-300" />
                <input 
                  type="email" 
                  value={tempParent.email}
                  onChange={e => setTempParent({...tempParent, email: e.target.value})}
                  className="bg-transparent border-none focus:ring-0 text-sm font-medium w-full"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 ml-2 uppercase">Parent Verification</label>
              <div className="flex items-center bg-white border border-pink-50 rounded-2xl px-4 py-3 gap-3 shadow-sm">
                <Lock size={18} className="text-pink-300" />
                <span className="text-sm font-medium text-green-500">Identity Verified</span>
              </div>
            </div>
          </div>

          <button 
            onClick={handleSaveParent}
            className="w-full bg-pink-500 text-white py-4 rounded-[2rem] font-bold shadow-lg shadow-pink-100 mt-6 flex items-center justify-center gap-2"
          >
            <Save size={18} /> Update Profile
          </button>
        </div>
      </div>
    );
  }

  if (setupMode === 'child-setup') {
    return (
      <div className="p-8 pb-40 animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">New Kitten Setup</h1>
          <button onClick={() => setSetupMode('view')} className="text-gray-400">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
            {['🐈', '🐱', '🦁', '🐯', '🐾'].map(avatar => (
              <button 
                key={avatar}
                onClick={() => setNewChild({...newChild, avatar})}
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all ${newChild.avatar === avatar ? 'bg-pink-500 text-white shadow-lg scale-110' : 'bg-gray-100 text-gray-400'}`}
              >
                {avatar}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 ml-2 uppercase">Kitten's Name</label>
              <input 
                type="text" 
                placeholder="Name"
                value={newChild.name}
                onChange={e => setNewChild({...newChild, name: e.target.value})}
                className="w-full bg-white border border-pink-50 rounded-2xl px-4 py-3 text-sm font-medium shadow-sm focus:ring-2 focus:ring-pink-200"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 ml-2 uppercase">Age (0-6)</label>
              <input 
                type="number" 
                max="6" 
                min="0"
                value={newChild.age}
                onChange={e => setNewChild({...newChild, age: parseInt(e.target.value)})}
                className="w-full bg-white border border-pink-50 rounded-2xl px-4 py-3 text-sm font-medium shadow-sm focus:ring-2 focus:ring-pink-200"
              />
            </div>
          </div>

          <button 
            onClick={handleSaveChild}
            className="w-full bg-pink-500 text-white py-4 rounded-[2rem] font-bold shadow-lg shadow-pink-100 mt-6"
          >
            Create Child Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-40 animate-in fade-in duration-500">
      <header className="p-8 bg-white border-b border-pink-50 rounded-b-[3rem] shadow-sm flex flex-col items-center">
        <div className="relative mb-4">
          <div className="w-24 h-24 bg-pink-100 rounded-[2rem] flex items-center justify-center text-5xl shadow-inner overflow-hidden">
            {parent.avatar}
          </div>
          <button 
            onClick={() => setSetupMode('parent-setup')}
            className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg border border-pink-50 text-pink-500"
          >
            <Settings size={18} />
          </button>
        </div>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">{parent.name}</h1>
          <p className="text-xs text-gray-400 font-medium">{parent.email}</p>
          <div className="flex gap-2 justify-center mt-2">
            <span className="bg-pink-100 text-pink-600 px-3 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">Premium Member</span>
            <span className="bg-green-100 text-green-600 px-3 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">Verified Parent</span>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-8">
        {/* Children Section */}
        <section>
          <div className="flex justify-between items-center mb-4 px-2">
            <h2 className="text-lg font-bold text-gray-800">My Little Kittens</h2>
            <button 
              onClick={() => setSetupMode('child-setup')}
              className="bg-pink-100 text-pink-600 p-1 rounded-lg hover:bg-pink-200 transition-colors"
            >
              <UserPlus size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {parent.children.map(child => (
              <div key={child.id} className="bg-white p-4 rounded-3xl border border-pink-50 shadow-sm flex flex-col items-center text-center group active:scale-95 transition-transform">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-3xl mb-3 shadow-inner group-hover:bg-orange-100 transition-colors">
                  {child.avatar}
                </div>
                <h3 className="font-bold text-gray-800 text-sm">{child.name}</h3>
                <p className="text-[10px] text-gray-400 font-bold mb-3">{child.age} Years Old</p>
                <div className="flex gap-1 flex-wrap justify-center">
                  {child.interests.map(i => (
                    <span key={i} className="text-[8px] bg-gray-50 px-2 py-0.5 rounded-full text-gray-500 font-bold">{i}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Updated: My Library Section */}
        <section>
          <div className="flex justify-between items-center mb-4 px-2">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Library size={20} className="text-blue-900" /> Personal Library
            </h2>
            <button className="text-[10px] font-bold text-blue-500 uppercase flex items-center gap-1">
              Go to Library <ChevronRight size={12} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-start group active:scale-95 transition-all">
              <div className="bg-pink-50 p-2 rounded-xl text-pink-500 mb-2">
                <Music size={18} />
              </div>
              <h4 className="text-xs font-bold text-gray-800">Music & Audio</h4>
              <p className="text-[10px] text-gray-400 mt-1">{parent.musicFavorites.length} Saved Items</p>
            </div>
            <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-start group active:scale-95 transition-all">
              <div className="bg-indigo-50 p-2 rounded-xl text-indigo-500 mb-2">
                <Film size={18} />
              </div>
              <h4 className="text-xs font-bold text-gray-800">Saved Videos</h4>
              <p className="text-[10px] text-gray-400 mt-1">{parent.videoFavorites.length} Saved Items</p>
            </div>
          </div>
          
          <div className="mt-4 bg-gray-800 p-4 rounded-3xl flex items-center justify-between text-white shadow-xl">
             <div className="flex items-center gap-3">
               <div className="bg-pink-500 p-2 rounded-xl">
                 <Play size={16} fill="currentColor" />
               </div>
               <div>
                 <h4 className="text-[10px] font-bold uppercase tracking-widest text-pink-300">Quick Play</h4>
                 <p className="text-xs font-bold">Kittie's House Mix #04</p>
               </div>
             </div>
             <ChevronRight size={16} className="text-gray-500" />
          </div>
        </section>

        {/* Safety Settings */}
        <section className="bg-green-50/50 p-6 rounded-[2.5rem] border border-green-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <ShieldCheck size={80} />
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-500 text-white p-2 rounded-xl shadow-lg">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-bold text-gray-800">AI Shaperone: ON</h3>
          </div>
          <p className="text-[11px] text-gray-600 leading-relaxed mb-4">
            Safety first! Kittie Assistant is continuously monitoring for predatory activity and inappropriate content to ensure your children play safely.
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between bg-white p-3 rounded-2xl shadow-sm border border-green-100">
              <span className="text-xs font-bold text-gray-700">Predator Protection</span>
              <div className="w-10 h-5 bg-green-500 rounded-full relative">
                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between bg-white p-3 rounded-2xl shadow-sm border border-green-100">
              <span className="text-xs font-bold text-gray-700">Child-Safe Social</span>
              <div className="w-10 h-5 bg-green-500 rounded-full relative">
                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
