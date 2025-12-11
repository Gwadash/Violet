import React from 'react';
import { Search, Heart, ShoppingBag, User, Menu, PlusCircle } from 'lucide-react';

interface HeaderProps {
    onSellClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSellClick }) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white text-xs text-center py-2 font-medium tracking-wide">
        FREE DELIVERY ON ORDERS OVER R650 | FREE RETURNS
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Mobile Menu & Logo */}
        <div className="flex items-center gap-4">
          <button className="md:hidden">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-tighter text-gray-900 leading-none">
              VIOLET<span className="text-violet-600">.</span>
            </h1>
            <span className="text-[10px] tracking-[0.3em] uppercase text-gray-500">Essentials</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-gray-700">
          <a href="#" className="hover:text-violet-600 transition-colors">WOMEN</a>
          <a href="#" className="hover:text-violet-600 transition-colors">MEN</a>
          <a href="#" className="hover:text-violet-600 transition-colors">KIDS</a>
          <a href="#" className="hover:text-violet-600 transition-colors">HOME</a>
          <a href="#" className="text-red-600 hover:text-red-700 transition-colors">SALE</a>
          {onSellClick && (
             <button onClick={onSellClick} className="flex items-center gap-1 text-violet-600 hover:text-violet-800 transition-colors">
                <PlusCircle className="w-4 h-4" />
                SELL
             </button>
          )}
        </nav>

        {/* Search & Icons */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2 w-64 focus-within:ring-1 focus-within:ring-violet-400">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Search for item, brand..." 
              className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-500"
            />
          </div>
          
          <div className="flex items-center gap-4 md:gap-6 text-gray-700">
            <button className="hover:text-violet-600 transition-colors relative group">
              <Heart className="w-5 h-5" />
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Wishlist</span>
            </button>
            <button className="hover:text-violet-600 transition-colors relative group">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-violet-600 text-white text-[9px] w-3.5 h-3.5 flex items-center justify-center rounded-full">2</span>
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Cart</span>
            </button>
            <button className="hidden md:block hover:text-violet-600 transition-colors relative group">
              <User className="w-5 h-5" />
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};