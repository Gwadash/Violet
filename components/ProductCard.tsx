import React from 'react';
import { Product } from '../types';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden bg-gray-100 aspect-[4/5] mb-3">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-white text-[10px] font-bold px-2 py-1 uppercase tracking-wide">New</span>
          )}
          {product.isSale && (
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wide">Sale</span>
          )}
        </div>

        {/* Hover Actions */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="bg-white p-2 rounded-full shadow-sm hover:text-violet-600">
                <Heart className="w-4 h-4" />
            </button>
        </div>

        {/* Quick View Button (appears on hover at bottom) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
             <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickView(product);
                }}
                className="w-full bg-white/90 backdrop-blur-sm text-gray-900 py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors shadow-lg"
             >
                Quick View
             </button>
        </div>
      </div>

      <div className="space-y-1">
        <h4 className="text-gray-500 text-xs uppercase tracking-wide font-medium">{product.brand}</h4>
        <h3 className="text-sm text-gray-900 font-normal truncate group-hover:text-violet-600 transition-colors">{product.name}</h3>
        <div className="flex items-center gap-2 text-sm">
          <span className={`font-bold ${product.isSale ? 'text-red-600' : 'text-gray-900'}`}>
            R {product.price}
          </span>
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-xs">R {product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};