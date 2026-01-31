
import React from 'react';
import { Home, Play, Users, Music, Gamepad2, ShieldCheck, UserCircle } from 'lucide-react';
import { AppTab } from '../types';

interface NavigationProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: AppTab.HOME, icon: Home, label: 'Home' },
    { id: AppTab.PLAY, icon: Play, label: 'Play' },
    { id: AppTab.GAMES, icon: Gamepad2, label: 'Games' },
    { id: AppTab.COMMUNITY, icon: Users, label: 'Social' },
    { id: AppTab.MEDIA, icon: Music, label: 'Media' },
    { id: AppTab.PROFILE, icon: UserCircle, label: 'Profile' },
    { id: AppTab.ADMIN, icon: ShieldCheck, label: 'Admin' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-pink-100 px-1 py-3 flex justify-around items-center z-50 rounded-t-2xl shadow-lg">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${
              isActive ? 'text-pink-500 scale-110' : 'text-gray-400'
            }`}
          >
            <div className={`p-1.5 rounded-xl ${isActive ? 'bg-pink-50' : ''}`}>
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className="text-[8px] font-bold uppercase tracking-wider">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default Navigation;
