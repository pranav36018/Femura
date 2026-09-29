import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Activity, 
  Pill, 
  FlaskConical, 
  ChevronRight, 
  CheckCircle2, 
  TrendingUp, 
  Stethoscope, 
  Award, 
  Search,
  Building2,
  CreditCard,
  Headphones,
  Truck,
  Percent
} from 'lucide-react';
import { companyInfo } from '../data/company';

export function Hero({ onOpenDoctorModal, onSearchSubmit }) {
  const [activeShowcase, setActiveShowcase] = useState('calmagic'); // 'calmagic' | 'osteopep' | 'livmax' | 'dserve'
  const [heroSearchInput, setHeroSearchInput] = useState('');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroSearchInput.trim()) {
      onSearchSubmit(heroSearchInput.trim());
      const catalogEl = document.getElementById('catalog-section');
      if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewMonograph = (e, productName) => {
    e.preventDefault();
    onSearchSubmit(productName);
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
  };

  const showcaseProducts = {
    calmagic: {
      name: "Calmagic HD",
      title: "Calcium Citrate Malate, Calcitriol, K2-7, Zinc & Magnesium",
      tagline: "High-Density Bone Remineralizer for Women & Fracture Healing",
      image: "/images/calmagic_hd.jpg",
      category: "Women's Health (Fem)",
      metric: "+42% Higher Intestinal Uptake",
      badge: "Flagship Calcium",
      benefit: "Non-constipating bio-chelate that directs ionic calcium strictly into bone hydroxyapatite, eliminating kidney stone risks."
    },
    osteopep: {
      name: "Osteopep XT",
      title: "Bioactive Collagen Peptides 10g, Glucosamine & Rosehip",
      tagline: "Cartilage Remodeling Matrix & Fracture Callus Accelerator",
      image: "/images/osteopep_xt.jpg",
      category: "Orthopaedics (Femur)",
      metric: "14.2 Days Faster Union",
      badge: "Bioactive Peptides",
      benefit: "FORTIGEL® grade peptides stimulate type-II collagen synthesis and reduce WOMAC arthritic joint pain by 68% in 8 weeks."
    },
    livmax: {
      name: "Livmax Syrup",
      title: "Standardized Silymarin, LOLA & B-Complex Liquid",
      tagline: "Complete Hepatic Rejuvenation & Detoxification Elixir",
      image: "/images/livmax_syrup.jpg",
      category: "Gastroenterology",
      metric: "-78% Transaminitis (ALT/AST)",
      badge: "Hepatoprotective",
      benefit: "Stabilizes hepatocyte cell membranes while clearing neurotoxic free ammonia into safe urea."
    },
    dserve: {
      name: "D-Serve 60K Nanoshots",
      title: "Cholecalciferol 60,000 IU Sugar-Free Ready-to-Drink Nano Emulsion",
      tagline: "Sub-100nm Vitamin D3 with 5X Faster Absorption",
      image: "/images/d_serve_60k_nanoshots.jpg",
      category: "Endocrinology",
      metric: "5X Bioavailability",
      badge: "Nanotechnology",
      benefit: "Aqueous nano-droplets bypass biliary digestion, restoring optimal 25(OH)D levels in 92% of patients within 6 weeks."
    }
  };

  const activeData = showcaseProducts[activeShowcase];

  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800">
      
      {/* Real Banner Image with Premium Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/slider2.jpg" 
          alt="Femura Pharma Medical Research Banner" 
          className="w-full h-full object-cover object-center filter opacity-15 dark:opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/95 to-slate-50/80 dark:from-slate-950 dark:via-slate-950/95 dark:to-slate-950/85"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-medical-50 dark:bg-slate-900 border border-medical-200 dark:border-medical-800 text-medical-700 dark:text-medical-300 text-[11px] sm:text-xs font-semibold shadow-sm max-w-full">
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-medical-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-medical-600"></span>
              </span>
              <span className="truncate">Advanced Specialty Pharmaceutical Formulations</span>
              <Sparkles className="w-3.5 h-3.5 text-medical-500 shrink-0" />
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Specialty Formulations in <br className="hidden sm:inline" />
              <span className="text-medical-600 dark:text-sky-400">
                Women’s Health & Orthopaedics
              </span>
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Born from the clinical synergy of <strong className="text-slate-900 dark:text-white font-semibold">"Fem"</strong> (Maternal & Gynaecological Health) and <strong className="text-slate-900 dark:text-white font-semibold">"Femur"</strong> (Orthopaedic Durability). Supplying WHO-GMP certified pharmaceuticals trusted across 1,850+ hospitals nationwide.
            </p>

            {/* Quick Hero Search Input */}
            <form 
              onSubmit={handleHeroSearch}
              className="max-w-xl mx-auto lg:mx-0 relative flex items-center shadow-card rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1.5 focus-within:border-medical-500 transition-all"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 ml-2.5 sm:ml-3 shrink-0" />
              <input
                type="text"
                placeholder="Search Calmagic, Osteopep, Livmax..."
                value={heroSearchInput}
                onChange={(e) => setHeroSearchInput(e.target.value)}
                className="w-full px-2.5 sm:px-3 py-2 bg-transparent text-base sm:text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none min-w-0"
              />
              <button
                type="submit"
                className="px-3.5 sm:px-5 py-2.5 rounded-xl bg-medical-600 hover:bg-medical-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shrink-0 shadow-sm"
              >
                Search
              </button>
            </form>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-1">
              <a
                href="#catalog-section"
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold text-white bg-medical-600 hover:bg-medical-700 shadow-sm hover:shadow-card-hover transform hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Browse Full Formulary</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenDoctorModal}
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Stethoscope className="w-4 h-4 text-medical-600 dark:text-medical-400" />
                <span>Doctor Evaluation Samples</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-semibold">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">WHO-GMP Compliant</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-medical-600 shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">1,850+ Partner Hospitals</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">12M+ Patients Treated</span>
              </div>
            </div>

          </div>

          {/* Right Column: Real Packaging Product Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl bg-white dark:bg-slate-900 shadow-float border border-slate-200/90 dark:border-slate-800 p-4 sm:p-7">
              
              {/* Product Tabs */}
              <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-4 sm:mb-5">
                {[
                  { id: 'calmagic', label: 'Calmagic' },
                  { id: 'osteopep', label: 'Osteopep' },
                  { id: 'livmax', label: 'Livmax' },
                  { id: 'dserve', label: 'D-Serve' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveShowcase(item.id)}
                    className={`py-2 px-1 sm:px-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all truncate ${
                      activeShowcase === item.id
                        ? 'bg-white dark:bg-slate-900 text-medical-600 dark:text-medical-400 shadow-sm'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Active Product Showcase */}
              <div className="space-y-3.5 sm:space-y-4">
                
                {/* Real Product Image Container */}
                <div className="relative h-48 sm:h-64 rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-800/40 dark:to-slate-800/80 p-3 sm:p-4 flex items-center justify-center border border-slate-200/60 dark:border-slate-700/60 overflow-hidden group">
                  <img
                    src={activeData.image}
                    alt={activeData.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://i0.wp.com/femurapharma.com/wp-content/uploads/2024/11/calmagic_hd_tablets.jpg";
                    }}
                  />
                  <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3">
                    <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider bg-medical-600 text-white shadow-sm">
                      {activeData.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3">
                    <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-white/95 dark:bg-slate-900/95 text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-slate-700 shadow-sm">
                      {activeData.metric}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-medical-600 dark:text-medical-400">
                      {activeData.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white">
                    {activeData.name}
                  </h3>
                  
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-1 mt-0.5">
                    {activeData.title}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                    {activeData.benefit}
                  </p>
                </div>

                {/* Bottom Card Action */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  <button
                    onClick={(e) => handleViewMonograph(e, activeData.name)}
                    className="text-xs font-bold text-medical-600 dark:text-medical-400 hover:text-medical-700 flex items-center gap-1 group focus:outline-none"
                  >
                    <span>View Prescribing Monograph</span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>

                  <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                    <FlaskConical className="w-3.5 h-3.5 text-medical-500" />
                    <span>HPLC Assayed</span>
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Authentic 4 Value Pillars directly from femurapharma.com */}
        <div className="mt-8 sm:mt-10 pt-6 sm:pt-7 border-t border-slate-200/80 dark:border-slate-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {companyInfo.valuePillars.map((pillar, idx) => {
              const IconComponent = pillar.icon === 'CreditCard' ? CreditCard 
                : pillar.icon === 'Headphones' ? Headphones 
                : pillar.icon === 'Truck' ? Truck 
                : Percent;
              return (
                <div 
                  key={idx} 
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-medical-400 dark:hover:border-medical-600 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-medical-50 dark:bg-slate-800 group-hover:bg-medical-600 group-hover:text-white text-medical-600 dark:text-sky-400 flex items-center justify-center shrink-0 transition-colors">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-medical-600 dark:group-hover:text-sky-400 transition-colors">
                      {pillar.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {pillar.subtext}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
