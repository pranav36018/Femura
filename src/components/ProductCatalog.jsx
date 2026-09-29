import React, { useState } from 'react';
import { 
  Filter, 
  Search, 
  X, 
  ArrowUpDown, 
  Layers, 
  RefreshCw,
  Scale
} from 'lucide-react';
import { ProductCard } from './ProductCard';

export function ProductCatalog({ 
  products, 
  categories, 
  dosageForms, 
  loading, 
  error,
  selectedCategory, 
  setSelectedCategory, 
  selectedDosageForm, 
  setSelectedDosageForm, 
  searchQuery, 
  setSearchQuery, 
  sortBy, 
  setSortBy, 
  onViewProduct, 
  onAddToBasket, 
  comparisonList, 
  toggleComparison, 
  onOpenComparisonModal,
  clearFilters,
  onRefresh
}) {
  const [simulateLoading, setSimulateLoading] = useState(false);

  const handleSimulateSkeleton = () => {
    setSimulateLoading(true);
    setTimeout(() => setSimulateLoading(false), 700);
  };

  const isActuallyLoading = loading || simulateLoading;

  return (
    <section id="catalog-section" className="py-12 sm:py-20 bg-white dark:bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-medical-50 dark:bg-slate-800 text-medical-700 dark:text-medical-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5 text-medical-600" />
              <span>Pharmaceutical Formulary</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Evidence-Based Formulations
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              Real pharmaceutical formulations with verified composition assays, bioavailable delivery systems, and complete prescribing monographs.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <button
              onClick={handleSimulateSkeleton}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
              title="Test Skeleton Loader State"
            >
              <RefreshCw className="w-3.5 h-3.5 text-medical-600" />
              <span>Test Loader</span>
            </button>

            {comparisonList.length > 0 && (
              <button
                onClick={onOpenComparisonModal}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-medical-600 hover:bg-medical-700 shadow-md flex items-center gap-2 animate-bounce"
              >
                <Scale className="w-4 h-4" />
                <span>Compare ({comparisonList.length}/3)</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-3.5 sm:p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3.5 sm:space-y-4 mb-8">
          
          {/* Search + Sort */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 sm:gap-3">
            <div className="sm:col-span-8 relative">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by brand name, active molecule, or indication..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-medical-500 text-base sm:text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="sm:col-span-4 relative">
              <div className="relative">
                <ArrowUpDown className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-medical-500 text-sm font-semibold text-slate-700 dark:text-slate-200 focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="featured">Sort by: Clinical Priority</option>
                  <option value="rating">Sort by: Doctor Rating</option>
                  <option value="name-asc">Sort by: Name (A to Z)</option>
                  <option value="price-low">Sort by: Price (Low to High)</option>
                  <option value="price-high">Sort by: Price (High to Low)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Division Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            <span className="text-xs font-bold text-slate-400 shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Specialty:</span>
            </span>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-medical-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Dosage Form & Results Count */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-200/80 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
              <span className="font-semibold text-slate-500 shrink-0">Dosage Form:</span>
              <div className="flex items-center gap-1.5 shrink-0">
                {dosageForms.map((form) => (
                  <button
                    key={form}
                    onClick={() => setSelectedDosageForm(form)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      selectedDosageForm === form
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 border border-slate-200/60 dark:border-slate-700'
                    }`}
                  >
                    {form}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3">
              <span className="font-bold text-slate-500 dark:text-slate-400">
                Showing <strong className="text-slate-900 dark:text-white">{products.length}</strong> formulations
              </span>
              
              {(selectedCategory !== 'all' || selectedDosageForm !== 'All Forms' || searchQuery !== '') && (
                <button
                  onClick={clearFilters}
                  className="text-xs font-bold text-medical-600 hover:underline"
                >
                  Reset filters
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Product Grid / Skeletons / Empty State */}
        {isActuallyLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 animate-pulse">
                <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-full w-24"></div>
                <div className="h-44 bg-slate-100 dark:bg-slate-800 rounded-2xl w-full"></div>
                <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-lg w-3/4"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
                <div className="h-9 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="p-12 text-center rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-xl mx-auto space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Unable to Load Formulations</h3>
            <p className="text-sm text-slate-500">{error}</p>
            <button
              onClick={onRefresh}
              className="px-6 py-2.5 rounded-xl bg-medical-600 text-white text-xs font-bold shadow-md hover:bg-medical-700 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="p-16 text-center rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
              <Search className="w-8 h-8 text-medical-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Formulations Found</h3>
            <p className="text-sm text-slate-500">
              Try adjusting your search keywords or switching dosage form filters.
            </p>
            <div>
              <button
                onClick={clearFilters}
                className="px-6 py-2.5 rounded-xl bg-medical-600 text-white text-xs font-bold shadow-md hover:bg-medical-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={onViewProduct}
                onAddToBasket={onAddToBasket}
                isCompared={comparisonList.some(p => p.id === product.id)}
                onToggleCompare={toggleComparison}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
