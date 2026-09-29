import React from 'react';
import { X, Scale, Trash2, ShoppingBag } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export function ProductComparisonModal({ comparisonList, onClose, onRemoveFromCompare, onAddToBasket }) {
  const { addToast } = useToast();

  if (!comparisonList || comparisonList.length === 0) return null;

  const handleAddSample = (product) => {
    onAddToBasket(product, 1);
    addToast(`Added ${product.name} to Doctor Sample Kit`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl max-h-[92dvh] flex flex-col rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-medical-600/30 border border-medical-500/40 flex items-center justify-center shrink-0">
              <Scale className="w-5 h-5 text-medical-300" />
            </div>
            <div>
              <h3 className="text-base sm:text-xl font-black">Formulation Comparative Matrix</h3>
              <p className="text-[11px] sm:text-xs text-slate-300">Evaluating clinical profile, strength, and molecular bioavailability</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="sm:hidden px-4 py-1.5 bg-medical-50 dark:bg-slate-800 text-[11px] font-semibold text-medical-700 dark:text-medical-300 text-center border-b border-slate-200 dark:border-slate-700 shrink-0">
          ← Swipe table horizontally to compare formulations →
        </div>

        {/* Matrix Table */}
        <div className="p-3 sm:p-6 overflow-x-auto overflow-y-auto flex-1">
          <table className="w-full min-w-[540px] text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="p-3 font-bold text-slate-400 uppercase w-1/4">Specification</th>
                {comparisonList.map((product) => (
                  <th key={product.id} className="p-3 font-black text-slate-900 dark:text-white text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5 shrink-0 flex items-center justify-center">
                          <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
                        </div>
                        <span>{product.name}</span>
                      </div>
                      <button
                        onClick={() => onRemoveFromCompare(product)}
                        className="text-slate-400 hover:text-rose-500 p-1"
                        title="Remove from comparison"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="p-3 font-bold text-slate-500">Therapeutic Specialty</td>
                {comparisonList.map((p) => (
                  <td key={p.id} className="p-3 font-semibold text-medical-600 dark:text-medical-400">
                    {p.division || p.category}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-500">Dosage Form & Packaging</td>
                {comparisonList.map((p) => (
                  <td key={p.id} className="p-3 text-slate-800 dark:text-slate-200">
                    {p.dosageForm} ({p.packaging})
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-500">Strength & Core Salt</td>
                {comparisonList.map((p) => (
                  <td key={p.id} className="p-3 font-bold text-slate-900 dark:text-white">
                    {p.strength}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-500">Full Generic Salt Spec</td>
                {comparisonList.map((p) => (
                  <td key={p.id} className="p-3 text-slate-600 dark:text-slate-400 leading-relaxed">
                    {p.genericName}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-500">Clinical Mechanism Advantage</td>
                {comparisonList.map((p) => (
                  <td key={p.id} className="p-3 text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                    {p.mechanismOfAction}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-500">Maximum Retail Price (MRP)</td>
                {comparisonList.map((p) => (
                  <td key={p.id} className="p-3 font-black text-slate-900 dark:text-white">
                    ₹{p.mrp.toFixed(2)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-500">Institutional B2B Price</td>
                {comparisonList.map((p) => (
                  <td key={p.id} className="p-3 font-bold text-emerald-600 dark:text-emerald-400">
                    ₹{p.b2bPrice.toFixed(2)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-500">Prescription Status</td>
                {comparisonList.map((p) => (
                  <td key={p.id} className="p-3">
                    {p.prescriptionRequired ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                        Rx Only
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                        Nutraceutical
                      </span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-500">Doctor Evaluation Sample</td>
                {comparisonList.map((p) => (
                  <td key={p.id} className="p-3">
                    <button
                      onClick={() => handleAddSample(p)}
                      className="px-3 py-1.5 rounded-xl bg-medical-600 hover:bg-medical-700 text-white font-bold text-[11px] shadow-sm transition-colors flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Kit</span>
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs"
          >
            Close Comparison
          </button>
        </div>

      </div>
    </div>
  );
}
