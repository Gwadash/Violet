import React from 'react';
import { CATEGORIES } from '../constants';
import { FilterState } from '../types';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters }) => {
  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({
    category: true,
    price: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCategoryChange = (category: string) => {
    setFilters(prev => {
      const newCategories = prev.category.includes(category)
        ? prev.category.filter(c => c !== category)
        : [...prev.category, category];
      return { ...prev, category: newCategories };
    });
  };

  return (
    <div className="w-64 flex-shrink-0 hidden lg:block pr-8 border-r border-gray-100 h-fit sticky top-24">
      <h3 className="text-lg font-bold mb-6 tracking-wide">REFINE</h3>

      {/* Category Filter */}
      <div className="border-t border-gray-200 py-4">
        <button 
          className="flex items-center justify-between w-full text-sm font-bold uppercase tracking-wider mb-2"
          onClick={() => toggleSection('category')}
        >
          <span>Category</span>
          {openSections['category'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        
        {openSections['category'] && (
          <div className="mt-2 space-y-2">
            {CATEGORIES.map(cat => (
              <label key={cat} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-black">
                <input 
                  type="checkbox" 
                  checked={filters.category.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                  className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                />
                {cat}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="border-t border-gray-200 py-4">
        <button 
          className="flex items-center justify-between w-full text-sm font-bold uppercase tracking-wider mb-2"
          onClick={() => toggleSection('price')}
        >
          <span>Price</span>
          {openSections['price'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        
        {openSections['price'] && (
            <div className="mt-4 px-2">
                 <input 
                    type="range" 
                    min="0" 
                    max="5000" 
                    step="100"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
                 />
                 <div className="flex justify-between text-xs text-gray-500 mt-2">
                     <span>R0</span>
                     <span>R{filters.maxPrice}+</span>
                 </div>
            </div>
        )}
      </div>

       {/* Mock Color Filter (Visual Only) */}
       <div className="border-t border-gray-200 py-4">
        <button className="flex items-center justify-between w-full text-sm font-bold uppercase tracking-wider mb-2">
          <span>Colour</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

       {/* Mock Size Filter (Visual Only) */}
       <div className="border-t border-gray-200 py-4">
        <button className="flex items-center justify-between w-full text-sm font-bold uppercase tracking-wider mb-2">
          <span>Size</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};