import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { divisionsData } from '../data/divisions';

export function DivisionShowcase({ onSelectCategory }) {
  const handleDivisionClick = (catSlug) => {
    onSelectCategory(catSlug);
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="divisions-section" className="py-20 bg-slate-50 dark:bg-slate-900/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-medical-50 dark:bg-slate-800 text-medical-700 dark:text-medical-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-medical-600" />
            <span>Therapeutic Divisions</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Comprehensive Medical Specialties
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Formulations engineered to meet international clinical guidelines across women's maternal care, orthopaedic repair, and critical intensive care.
          </p>
        </div>

        {/* Division Cards Grid with Real Photography */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {divisionsData.map((division) => (
            <div
              key={division.id}
              onClick={() => handleDivisionClick(division.id)}
              className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Category Image Header */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={division.image}
                  alt={division.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://i0.wp.com/femurapharma.com/wp-content/uploads/2024/11/category_gynec.jpg?resize=1200%2C1200&ssl=1";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                
                {/* Top Badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-white shadow-sm">
                    {division.badge}
                  </span>
                </div>

                {/* Bottom title over image */}
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[10px] text-medical-300 font-bold uppercase tracking-wider block">
                    {division.etymology}
                  </span>
                  <h3 className="text-lg font-black text-white leading-tight">
                    {division.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {division.description}
                </p>

                {/* Key Molecules */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Lead Molecules:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {division.keyMolecules.map((mol, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        {mol}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer action */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300 text-[11px]">
                    {division.stats}
                  </span>
                  
                  <span className="inline-flex items-center gap-1 font-bold text-medical-600 dark:text-medical-400 group-hover:translate-x-1 transition-transform">
                    <span>View Formulations</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
