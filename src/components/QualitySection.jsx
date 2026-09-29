import React from 'react';
import { 
  ShieldCheck, 
  ThermometerSnowflake, 
  CheckCircle2
} from 'lucide-react';

export function QualitySection() {
  const pipelineSteps = [
    {
      step: "01",
      title: "Raw Material HPLC Assay",
      desc: "Every API and excipient undergoes High Performance Liquid Chromatography (HPLC) to verify 99.8%+ purity before entering formulation lines.",
      badge: "Zero Contamination"
    },
    {
      step: "02",
      title: "Nano-Emulsion & Micro-Granulation",
      desc: "Water-soluble particle reduction (sub-100nm) and micro-encapsulation ensuring stomach pH-neutral delivery and accelerated absorption.",
      badge: "Bioavailability First"
    },
    {
      step: "03",
      title: "Automated Sterile Filling",
      desc: "Class 100 laminar airflow and automated blister-packaging prevents human touch, securing hermetic barrier integrity against tropical humidity.",
      badge: "Class 100 Aseptic"
    },
    {
      step: "04",
      title: "Dissolution & Accelerated Stability",
      desc: "Batches are subjected to 40°C / 75% RH stability chambers and USP dissolution apparatus to guarantee 100% active release in vitro.",
      badge: "USP / IP Tested"
    }
  ];

  return (
    <section id="quality-section" className="py-20 bg-white dark:bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>WHO-GMP Validated Standards</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Uncompromising Pharmaceutical Quality <br className="hidden sm:inline" />
            <span className="text-medical-600 dark:text-sky-400">
              From Raw Molecule to Clinic Shelf
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Every blister, sachet, and ampoule from Femura Pharma is produced under strict current Good Manufacturing Practices (cGMP) with multi-point chemical and microbiological clearance.
          </p>
        </div>

        {/* Pipeline Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pipelineSteps.map((step, idx) => (
            <div 
              key={idx}
              className="rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 relative group shadow-card"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-slate-300 dark:text-slate-700 group-hover:text-medical-600 transition-colors">
                    {step.step}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    {step.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-medical-600 dark:group-hover:text-medical-400 transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/70 dark:border-slate-800 flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Quality Gate</span>
              </div>
            </div>
          ))}
        </div>

        {/* Cold-Chain and R&D Banner */}
        <div className="mt-12 rounded-3xl bg-slate-900 p-8 sm:p-10 text-white relative overflow-hidden shadow-xl border border-slate-800">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold">
                <ThermometerSnowflake className="w-4 h-4 text-cyan-400" />
                <span>2°C – 8°C Cold Chain Protocol</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                Temperature-Monitored Parenteral Logistics
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Critical parenteral injectables like <strong>Aldofem Inj IV</strong> (Lyophilized Glutathione) and <strong>Livmax Infusion</strong> require unyielding thermal stability. Real-time data loggers verify zero thermal excursion from our Bangalore central repository to your operating theater.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-xs">
                <span className="text-slate-400 block font-medium">Testing Standards</span>
                <strong className="text-white font-bold text-sm">IP, BP, USP & WHO TRS 986</strong>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-xs">
                <span className="text-slate-400 block font-medium">Batch Release Rejection Rate</span>
                <strong className="text-emerald-400 font-bold text-sm">&lt; 0.02% (Six Sigma)</strong>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
