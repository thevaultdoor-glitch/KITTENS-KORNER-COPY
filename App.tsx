
import React, { useState } from 'react';
import { AppTab } from './types';
import Navigation from './components/Navigation';
import MusicPlayer from './components/MusicPlayer';
import AIChaperone from './components/AIChaperone';
import Home from './pages/Home';
import Play from './pages/Play';
import Community from './pages/Community';
import ZenDen from './pages/ZenDen';
import Games from './pages/Games';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import Shop from './pages/Shop';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.HOME);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.HOME:
        return <Home onShopNow={() => setActiveTab(AppTab.SHOP)} />;
      case AppTab.PLAY:
        return <Play />;
      case AppTab.GAMES:
        return <Games />;
      case AppTab.COMMUNITY:
        return <Community />;
      case AppTab.MEDIA:
        return <ZenDen />;
      case AppTab.ADMIN:
        return <Admin />;
      case AppTab.PROFILE:
        return <Profile />;
      case AppTab.SHOP:
        return <Shop />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-[#FFF9F5] min-h-screen shadow-2xl relative overflow-hidden flex flex-col">
      {/* Background Decorative Kittens */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] flex flex-wrap gap-20 p-10 select-none">
         {Array.from({length: 20}).map((_, i) => <span key={i} className="text-6xl rotate-12">🐱</span>)}
      </div>

      <AIChaperone />

      {/* Main Content Area - ensures independent scrolling from Nav/Music */}
      <main className="relative z-10 flex-1 overflow-y-auto no-scrollbar">
        {renderContent()}
      </main>

      {/* Global Persistent Elements */}
      <div className="relative z-50">
        {activeTab !== AppTab.ADMIN && (
          <MusicPlayer />
        )}
        <Navigation activeTab={activeTab} onTabChange={setTabWithScroll} />
      </div>
    </div>
  );

  function setTabWithScroll(tab: AppTab) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveTab(tab);
  }
};

export default App;
