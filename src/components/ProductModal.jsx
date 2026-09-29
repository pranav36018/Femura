import React, { useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  ShoppingBag, 
  ShieldCheck, 
  CheckCircle2, 
  Star, 
  Sparkles,
  FlaskConical
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export function ProductModal({ product, onClose, onAddToBasket }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isDownloading, setIsDownloading] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const handleDownloadMonograph = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      addToast(`Clinical Monograph for ${product.name} downloaded successfully (PDF)`, 'success');
    }, 1000);
  };

  const handleAddSample = () => {
    onAddToBasket(product, 1);
    addToast(`Added ${product.name} to Sample Request Basket`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[92dvh] flex flex-col rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar with Real Product Packshot */}
        <div className="p-4 sm:p-8 bg-slate-900 text-white relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close Monograph"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pr-8 sm:pr-0">
            
            {/* Real Product Image Thumbnail */}
            <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-2xl bg-white p-2 shrink-0 flex items-center justify-center shadow-md">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  if (product.fallbackImage) e.target.src = product.fallbackImage;
                }}
              />
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white">
                  {product.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-medical-500 text-white">
                  {product.dosageForm}
                </span>
                {product.prescriptionRequired && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/90 text-white">
                    Schedule H Prescription Drug
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {product.name}
              </h2>
              
              <p className="text-sm text-slate-300 font-medium max-w-xl">
                {product.genericName}
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-1 text-xs text-slate-300">
                <div>
                  <span className="text-slate-400 block text-[10px]">Packaging</span>
                  <strong className="text-white">{product.packaging}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">MRP</span>
                  <strong className="text-white">₹{product.mrp.toFixed(2)}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Institutional Rate</span>
                  <strong className="text-emerald-400 font-bold">₹{product.b2bPrice.toFixed(2)}</strong>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 px-4 sm:px-8 flex gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar shrink-0">
          {[
            { id: 'overview', label: 'Clinical Overview' },
            { id: 'composition', label: 'Composition & Assay' },
            { id: 'moa', label: 'Pharmacokinetics & MOA' },
            { id: 'dosage', label: 'Dosage & Administration' },
            { id: 'regulatory', label: 'Quality & Regulatory' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 sm:py-3.5 px-2.5 sm:px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors shrink-0 ${
                activeTab === tab.id
                  ? 'border-medical-600 text-medical-600 dark:text-medical-400 dark:border-medical-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Tab Content */}
        <div className="p-4 sm:p-8 flex-1 overflow-y-auto space-y-5 sm:space-y-6">
          
          {/* TAB 1: Clinical Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                  Approved Clinical Indications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.indications.map((ind, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{ind}</span>
                    </div>
                  ))}
                </div>
              </div>

              {product.clinicalHighlights && (
                <div className="p-4 rounded-2xl bg-medical-50 dark:bg-slate-800 border border-medical-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200">
                  <div className="flex items-center gap-2 font-bold mb-1 text-medical-700 dark:text-medical-300">
                    <Sparkles className="w-4 h-4 text-medical-600" />
                    <span>Clinical Research Highlight</span>
                  </div>
                  <p>{product.clinicalHighlights}</p>
                </div>
              )}

              <div>
                <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                  Therapeutic Tagline
                </h4>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300 italic">
                  "{product.tagline}"
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: Composition */}
          {activeTab === 'composition' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                Active Formulation Breakdown (Per Unit Dose)
              </h4>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                {product.composition.map((comp, idx) => (
                  <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white dark:bg-slate-900">
                    <div>
                      <span className="font-bold text-sm text-slate-900 dark:text-white block">
                        {comp.name}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {comp.note}
                      </span>
                    </div>
                    <span className="text-xs font-black text-medical-700 dark:text-medical-400 px-3 py-1 rounded-xl bg-medical-50 dark:bg-slate-800 border border-medical-100 dark:border-slate-700 shrink-0 self-start sm:self-auto">
                      {comp.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Mechanism of Action */}
          {activeTab === 'moa' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                  Pharmacological Mechanism
                </h4>
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  {product.mechanismOfAction}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Dosage & Storage */}
          {activeTab === 'dosage' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                  Prescription Dosage Guidelines
                </h4>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300">
                  {product.dosageGuide}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                  Storage Conditions
                </h4>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300">
                  {product.storage}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Regulatory */}
          {activeTab === 'regulatory' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                Manufacturing & Compliance Credentials
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {product.certifications.map((cert, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 flex items-center gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-medical-600 shrink-0" />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{cert}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-400">
                <strong>CDSCO Schedule Drug Notice:</strong> To be sold by retail on the prescription of a Registered Medical Practitioner only. Manufactured under WHO-GMP conditions by Femura Pharmaceuticals Private Limited.
              </div>
            </div>
          )}

        </div>

        {/* Modal Action Buttons */}
        <div className="p-6 sm:p-8 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={handleDownloadMonograph}
            disabled={isDownloading}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4 text-medical-600" />
            <span>{isDownloading ? 'Generating PDF...' : 'Download Monograph (PDF)'}</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 text-xs font-bold transition-colors"
            >
              Close
            </button>

            <button
              onClick={handleAddSample}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-medical-600 hover:bg-medical-700 text-white text-xs font-bold shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Sample Request Kit</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
