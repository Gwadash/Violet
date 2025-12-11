import React, { useState, useRef } from 'react';
import { X, Upload, Plus } from 'lucide-react';
import { Product } from '../types';
import { CATEGORIES } from '../constants';

interface AddProductModalProps {
  onClose: () => void;
  onAdd: (product: Product) => void;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({ onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !brand || !price || !image) return;

    const newProduct: Product = {
      id: Date.now(), // Simple unique ID
      name,
      brand,
      price: Number(price),
      category,
      image,
      isNew: true, // Tag user uploaded items as new
    };

    onAdd(newProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">List Your Item</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Product Image</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`relative aspect-[3/2] rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group overflow-hidden ${
                image ? 'border-violet-600 bg-gray-50' : 'border-gray-300 hover:border-violet-400 hover:bg-gray-50'
              }`}
            >
              {image ? (
                <>
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-medium flex items-center gap-2">
                        <Upload className="w-4 h-4" /> Change Image
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-gray-400 text-center group-hover:text-violet-600 transition-colors">
                  <Upload className="w-10 h-10 mx-auto mb-2" />
                  <span className="text-sm font-medium">Click to upload image</span>
                </div>
              )}
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageUpload}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Brand</label>
              <input 
                type="text" 
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Zara"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-1 focus:ring-violet-600 focus:border-violet-600 outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Price (R)</label>
              <input 
                type="number" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-1 focus:ring-violet-600 focus:border-violet-600 outline-none transition-all"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Product Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Vintage Denim Jacket"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-1 focus:ring-violet-600 focus:border-violet-600 outline-none transition-all"
              required
            />
          </div>

          <div className="mb-8">
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Category</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-1 focus:ring-violet-600 focus:border-violet-600 outline-none transition-all appearance-none cursor-pointer"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <button 
            type="submit"
            disabled={!name || !brand || !price || !image}
            className="w-full bg-gray-900 text-white font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-violet-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            List Item
          </button>
        </form>
      </div>
    </div>
  );
};