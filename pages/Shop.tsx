
import React, { useState } from 'react';
import { ShoppingBag, Star, Filter, ChevronRight, ShoppingCart, Heart, Plus, Award } from 'lucide-react';
import { Product } from '../types';

const Shop: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const products: Product[] = [
    { id: '7', name: 'Adopt a Kitten (Toy + Certificate)', price: 39.99, category: 'Toys', image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&q=80&w=400&h=400' },
    { id: '1', name: 'Kittie Plushie', price: 24.99, category: 'Toys', image: 'https://picsum.photos/seed/plush/400/400' },
    { id: '2', name: 'Kittie Adventures Vol 1', price: 14.99, category: 'Books', image: 'https://picsum.photos/seed/book1/400/400' },
    { id: '3', name: 'KKPP Toddler Hoodie', price: 34.99, category: 'Clothing', image: 'https://picsum.photos/seed/hoodie/400/400' },
    { id: '4', name: 'Kittie Water Bottle', price: 18.99, category: 'Accessories', image: 'https://picsum.photos/seed/bottle/400/400' },
    { id: '5', name: 'Sensory Play Kit', price: 45.00, category: 'Toys', image: 'https://picsum.photos/seed/toy2/400/400' },
    { id: '6', name: 'Mama Cat Tee', price: 28.00, category: 'Clothing', image: 'https://picsum.photos/seed/tee/400/400' },
  ];

  const categories = ['All', 'Toys', 'Books', 'Clothing', 'Accessories'];
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="pb-40 animate-in fade-in duration-500">
      <header className="p-6 bg-white border-b border-pink-50 sticky top-0 z-20 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Kittie Shop</h1>
          <button className="relative p-2 bg-pink-50 text-pink-500 rounded-full">
            <ShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 bg-gray-800 text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">0</span>
          </button>
        </div>
        
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeCategory === cat 
                  ? 'bg-pink-500 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="p-6">
        {/* Featured Promo: Adopt a Kitten */}
        <div className="bg-gradient-to-r from-pink-500 to-orange-400 rounded-3xl p-6 text-white mb-8 relative overflow-hidden shadow-xl">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Award size={16} className="text-yellow-200" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Kittie Adoption Center</span>
            </div>
            <h2 className="text-2xl font-bold mb-1">Adopt Your Own Kitten!</h2>
            <p className="text-xs text-pink-100 mb-4 max-w-[200px]">Each toy kitten comes with an official Certificate of Ownership and a promise of forever snuggles.</p>
            <button className="bg-white text-pink-500 px-6 py-2 rounded-full text-xs font-bold shadow-lg hover:bg-pink-50 transition-colors">Start Adoption</button>
          </div>
          <div className="absolute -top-4 -right-8 p-4 opacity-20 rotate-12">
            <Award size={180} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-pink-50 shadow-sm flex flex-col group">
              <div className="h-40 relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <button className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-pink-500 transition-colors shadow-sm">
                  <Heart size={14} />
                </button>
                {product.id === '7' && (
                  <div className="absolute top-2 left-2 bg-yellow-400 text-gray-900 px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                    <Award size={10} />
                    <span className="text-[8px] font-bold">CERTIFICATE INCLUDED</span>
                  </div>
                )}
                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md">
                   <p className="text-[10px] font-bold text-gray-800">${product.price}</p>
                </div>
              </div>
              <div className="p-3 flex-1 flex flex-col">
                <p className="text-[9px] font-bold text-pink-500 uppercase tracking-tighter mb-0.5">{product.category}</p>
                <h3 className="text-xs font-bold text-gray-800 mb-3 line-clamp-2">{product.name}</h3>
                <button className="mt-auto w-full bg-gray-50 text-gray-800 py-2 rounded-xl text-[10px] font-bold uppercase hover:bg-pink-500 hover:text-white transition-all flex items-center justify-center gap-1">
                  <Plus size={12} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
