import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden bg-gray-100 mb-8">
      <img 
        src="https://picsum.photos/seed/violethero/1920/600" 
        alt="Violet Essentials Campaign" 
        className="w-full h-full object-cover object-center brightness-90"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 drop-shadow-md">VIOLET ESSENTIALS</h2>
        <p className="text-lg md:text-xl font-light tracking-wide max-w-2xl drop-shadow-sm">
          Timeless pieces for the modern wardrobe.
        </p>
        <div className="mt-8 flex gap-4">
            <button className="px-8 py-3 bg-white text-gray-900 text-sm font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors">
                Shop Women
            </button>
            <button className="px-8 py-3 border border-white text-white text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
                Shop Men
            </button>
        </div>
      </div>
    </div>
  );
};