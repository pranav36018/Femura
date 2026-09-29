import React from 'react';
import { 
  Eye, 
  Plus, 
  Star, 
  CheckSquare, 
  Square,
  ShieldCheck
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export function ProductCard({ 
  product, 
  onViewDetails, 
  onAddToBasket, 
  isCompared, 
  onToggleCompare 
}) {
  const { addToast } = useToast();

  const handleAddSample = (e) => {
    e.stopPropagation();
    onAddToBasket(product, 1);
    addToast(`Added ${product.name} to Doctor Sample Kit`, 'success');
  };

  const handleCompareClick = (e) => {
    e.stopPropagation();
    onToggleCompare(product);
  };

  return (
    <div 
      onClick={() => onViewDetails(product)}
      className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-5 flex flex-col justify-between cursor-pointer shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300"
    >
      <div>
        {/* Top Badges & Compare */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700">
              {product.dosageForm}
            </span>

            {product.prescriptionRequired ? (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-50 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-200/60 dark:border-rose-900">
                Rx Only
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-900">
                Nutraceutical
              </span>
            )}

            {product.badge && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-medical-50 text-medical-700 dark:bg-slate-800 dark:text-medical-300 border border-medical-200 dark:border-slate-700">
                {product.badge}
              </span>
            )}
          </div>

          {/* Compare toggle */}
          <button
            onClick={handleCompareClick}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
              isCompared 
                ? 'bg-medical-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="Compare formulation"
          >
            {isCompared ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
            <span className="text-[10px] hidden sm:inline">Compare</span>
          </button>
        </div>

        {/* Real Product Image Container */}
        <div className="relative h-48 w-full rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/70 dark:from-slate-800/40 dark:to-slate-800/80 p-3 mb-4 flex items-center justify-center border border-slate-100 dark:border-slate-800 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain filter drop-shadow group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              if (product.fallbackImage && e.target.src !== product.fallbackImage) {
                e.target.src = product.fallbackImage;
              }
            }}
          />
        </div>

        {/* Product Brand & Generic Name */}
        <div className="space-y-1">
          <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-medical-600 dark:group-hover:text-medical-400 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs font-semibold text-medical-600 dark:text-medical-400 line-clamp-1">
            {product.strength}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {product.genericName}
          </p>
        </div>

        {/* Indications Tags */}
        <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap gap-1">
            {product.indications.slice(0, 2).map((ind, i) => (
              <span 
                key={i}
                className="px-2 py-0.5 rounded-md text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              >
                {ind}
              </span>
            ))}
            {product.indications.length > 2 && (
              <span className="px-1.5 py-0.5 text-[10px] text-slate-400">
                +{product.indications.length - 2} more
              </span>
            )}
          </div>
        </div>

      </div>

      {/* Pricing & Quick Buttons */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-3 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">MRP / Packaging</span>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-black text-slate-900 dark:text-white">
                ₹{product.mrp.toFixed(2)}
              </span>
              <span className="text-[10px] text-slate-400">({product.packaging})</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-2 py-1 rounded-lg border border-amber-200/40 dark:border-amber-900/40">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="font-bold text-xs text-amber-700 dark:text-amber-300">{product.rating}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="w-full py-2 px-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>Monograph</span>
          </button>

          <button
            type="button"
            onClick={handleAddSample}
            className="w-full py-2 px-2.5 rounded-xl text-xs font-bold text-white bg-medical-600 hover:bg-medical-700 shadow-sm transition-all flex items-center justify-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Sample Kit</span>
          </button>
        </div>
      </div>

    </div>
  );
}
