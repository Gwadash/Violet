import React, { useState } from 'react';
import { X, Heart, Check } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) return;
    setIsAdded(true);
    setTimeout(() => {
        setIsAdded(false);
        onClose();
    }, 1500);
  };

  // Prevent click on backdrop from closing if clicking content
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto md:overflow-hidden rounded-lg shadow-2xl flex flex-col md:flex-row relative animate-in fade-in zoom-in-95 duration-200"
        onClick={handleContentClick}
      >
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-gray-100 transition-colors"
        >
            <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-gray-100 relative">
             <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-[300px] md:h-full object-cover"
             />
             {product.isSale && (
                <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 uppercase tracking-wide">
                    Sale
                </span>
             )}
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col">
            <div className="mb-1">
                <span className="text-gray-500 text-sm font-medium tracking-widest uppercase">{product.brand}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-4">{product.name}</h2>
            
            <div className="flex items-center gap-3 mb-6">
                <span className={`text-xl font-bold ${product.isSale ? 'text-red-600' : 'text-gray-900'}`}>
                    R {product.price}
                </span>
                {product.originalPrice && (
                    <span className="text-gray-400 line-through text-base">R {product.originalPrice}</span>
                )}
            </div>

            <div className="h-px bg-gray-100 w-full mb-6"></div>

            <div className="mb-6">
                <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Select Size</h4>
                <div className="flex flex-wrap gap-3">
                    {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`w-12 h-12 flex items-center justify-center text-sm border transition-all duration-200 ${
                                selectedSize === size 
                                    ? 'border-violet-600 bg-violet-600 text-white' 
                                    : 'border-gray-200 text-gray-600 hover:border-gray-900'
                            }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
                {!selectedSize && isAdded === false && (
                    <p className="text-red-500 text-xs mt-2 hidden">Please select a size</p>
                )}
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-1">
                Elevate your style with this {product.name.toLowerCase()}. 
                Crafted from premium materials for lasting comfort and durability. 
                Perfect for {product.category.toLowerCase()} lovers who appreciate attention to detail.
            </p>

            <div className="mt-auto space-y-3">
                <button 
                    onClick={handleAddToCart}
                    disabled={!selectedSize}
                    className={`w-full py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${
                        isAdded 
                            ? 'bg-green-600 text-white' 
                            : !selectedSize
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-900 text-white hover:bg-violet-600'
                    }`}
                >
                    {isAdded ? (
                        <>
                            <Check className="w-5 h-5" />
                            Added to Bag
                        </>
                    ) : (
                        "Add to Cart"
                    )}
                </button>
                
                <button className="w-full py-4 border border-gray-200 text-gray-600 text-sm font-bold uppercase tracking-widest hover:border-gray-900 hover:text-gray-900 transition-colors flex items-center justify-center gap-2 group">
                    <Heart className="w-4 h-4 group-hover:fill-current" />
                    Add to Wishlist
                </button>
            </div>
            
            <div className="mt-6 text-xs text-gray-400 flex gap-4 justify-center">
                <span>Free shipping over R650</span>
                <span>•</span>
                <span>30-day returns</span>
            </div>
        </div>
      </div>
    </div>
  );
};