import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductCard } from './components/ProductCard';
import { AIStylist } from './components/AIStylist';
import { QuickViewModal } from './components/QuickViewModal';
import { AddProductModal } from './components/AddProductModal';
import { PRODUCTS } from './constants';
import { FilterState, Product } from './types';
import { ChevronDown, PlusCircle } from 'lucide-react';

const App: React.FC = () => {
  // Use state for products to allow adding new ones
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    minPrice: 0,
    maxPrice: 5000,
    sort: 'newest'
  });

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by Category
    if (filters.category.length > 0) {
      result = result.filter(p => filters.category.includes(p.category));
    }

    // Filter by Price
    result = result.filter(p => p.price <= filters.maxPrice);

    // Sorting
    if (filters.sort === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else {
      // Default newest - putting products with isNew first
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [filters, products]); // Dependency on 'products' added

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header onSellClick={() => setIsAddModalOpen(true)} />
      
      <main className="flex-1">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
            <div className="text-xs text-gray-500 py-4 flex gap-2">
                <span>Home</span> / <span className="text-gray-900 font-medium">Brands</span> / <span className="text-violet-600 font-medium">Violet Essentials</span>
            </div>
            
            <Hero />

            <div className="flex gap-8 mb-12">
                <FilterSidebar filters={filters} setFilters={setFilters} />
                
                <div className="flex-1">
                    {/* Toolbar */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-4 border-b border-gray-100">
                        <div className="text-sm text-gray-500 mb-4 md:mb-0">
                            Showing <span className="font-bold text-gray-900">{filteredProducts.length}</span> items
                        </div>
                        
                        <div className="flex items-center gap-4">
                            {/* Mobile Add Button (visible on all screens here for easy access) */}
                            <button 
                                onClick={() => setIsAddModalOpen(true)}
                                className="flex items-center gap-2 text-sm font-bold text-violet-600 hover:text-violet-800 transition-colors mr-4"
                            >
                                <PlusCircle className="w-4 h-4" />
                                List Item
                            </button>

                            <span className="text-sm text-gray-500 border-l border-gray-200 pl-4">Sort by:</span>
                            <div className="relative group">
                                <button className="flex items-center gap-2 text-sm font-bold text-gray-900">
                                    {filters.sort === 'newest' ? 'Newest' : filters.sort === 'price-asc' ? 'Price: Low - High' : 'Price: High - Low'}
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-xl rounded-lg py-2 z-10 hidden group-hover:block border border-gray-100">
                                    <button 
                                        onClick={() => setFilters(prev => ({...prev, sort: 'newest'}))}
                                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 hover:text-violet-600"
                                    >
                                        Newest
                                    </button>
                                    <button 
                                        onClick={() => setFilters(prev => ({...prev, sort: 'price-asc'}))}
                                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 hover:text-violet-600"
                                    >
                                        Price: Low - High
                                    </button>
                                    <button 
                                        onClick={() => setFilters(prev => ({...prev, sort: 'price-desc'}))}
                                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 hover:text-violet-600"
                                    >
                                        Price: High - Low
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
                            {filteredProducts.map(product => (
                                <ProductCard 
                                    key={product.id} 
                                    product={product} 
                                    onQuickView={setQuickViewProduct}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No items found</h3>
                            <p className="text-gray-500">Try adjusting your filters to see more results.</p>
                            <button 
                                onClick={() => setFilters({ category: [], minPrice: 0, maxPrice: 5000, sort: 'newest' })}
                                className="mt-6 text-violet-600 font-bold hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </main>

      <Footer />
      <AIStylist products={filteredProducts} />
      
      {quickViewProduct && (
        <QuickViewModal 
            product={quickViewProduct} 
            onClose={() => setQuickViewProduct(null)} 
        />
      )}

      {isAddModalOpen && (
        <AddProductModal 
            onClose={() => setIsAddModalOpen(false)}
            onAdd={handleAddProduct}
        />
      )}
    </div>
  );
};

export default App;