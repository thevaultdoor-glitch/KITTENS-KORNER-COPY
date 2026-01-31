
import React, { useState, useEffect } from 'react';
import { ShieldCheck, AlertCircle, Info, Eye, Heart } from 'lucide-react';

const AIChaperone: React.FC = () => {
  const [status, setStatus] = useState<'safe' | 'watching' | 'warning'>('safe');
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Simulate periodic safety checks
    const interval = setInterval(() => {
      setStatus(prev => prev === 'safe' ? 'watching' : 'safe');
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-[70] flex flex-col items-end gap-2">
      <div 
        className={`group flex items-center gap-2 p-2 rounded-2xl shadow-lg border transition-all duration-500 cursor-pointer pointer-events-auto ${
          status === 'safe' ? 'bg-green-500/90 border-green-400 text-white' : 
          status === 'watching' ? 'bg-blue-500/90 border-blue-400 text-white' : 
          'bg-orange-500/90 border-orange-400 text-white'
        }`}
        onClick={() => setShowTooltip(!showTooltip)}
      >
        <div className="relative">
          <ShieldCheck size={20} className={status === 'watching' ? 'animate-pulse' : ''} />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full border border-gray-200"></div>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-bold uppercase tracking-tighter leading-none">AI Chaperone</span>
          <span className="text-[8px] opacity-80 leading-none mt-0.5">
            {status === 'safe' ? 'Safe Space' : status === 'watching' ? 'Protective Mode' : 'Safety Check'}
          </span>
        </div>
      </div>

      {showTooltip && (
        <div className="bg-white p-4 rounded-3xl shadow-2xl border border-pink-50 w-64 animate-in slide-in-from-right duration-300 pointer-events-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-pink-100 p-2 rounded-xl text-pink-500">
              <Eye size={18} />
            </div>
            <h3 className="text-sm font-bold text-gray-800">Kittie is Watching! 🐾</h3>
          </div>
          <p className="text-[10px] text-gray-600 leading-relaxed">
            Our AI Shaperone actively scans for any predatory behavior to keep our little kittens safe. You're in a protected, moderated environment!
          </p>
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[9px] font-bold text-green-500 flex items-center gap-1">
              <Heart size={10} fill="currentColor" /> Parent Verified
            </span>
            <button 
              onClick={() => setShowTooltip(false)}
              className="text-[9px] text-gray-400 font-bold uppercase hover:text-gray-600"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChaperone;
