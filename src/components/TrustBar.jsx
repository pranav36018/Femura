import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Microscope, 
  FileCheck, 
  ThermometerSnowflake
} from 'lucide-react';
import { companyInfo } from '../data/company';

export function TrustBar() {
  return (
    <section className="border-y border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-6 text-center">
          {companyInfo.stats.map((stat, idx) => (
            <div key={idx} className="p-3 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 hover:border-medical-400 transition-colors">
              <span className="text-xl sm:text-3xl font-black text-medical-600 dark:text-medical-400 block">
                {stat.value}
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-slate-800 dark:text-slate-200 block mt-1">
                {stat.label}
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 block leading-tight mt-0.5">
                {stat.subtext}
              </span>
            </div>
          ))}
        </div>

        {/* Certifications Row */}
        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:flex sm:flex-wrap items-center justify-center sm:justify-around gap-3 sm:gap-6 text-slate-600 dark:text-slate-400 text-xs font-semibold">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
            <span>WHO-GMP Certified Facilities</span>
          </div>
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-medical-600 shrink-0" />
            <span>ISO 9001:2015 QMS Accredited</span>
          </div>
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <Microscope className="w-4 h-4 sm:w-5 sm:h-5 text-bio-teal shrink-0" />
            <span>GLP Analytical Laboratories</span>
          </div>
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <FileCheck className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 shrink-0" />
            <span>CDSCO Drug Formulations</span>
          </div>
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <ThermometerSnowflake className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600 shrink-0" />
            <span>Cold-Chain Logistical Protocol</span>
          </div>
        </div>

      </div>
    </section>
  );
}
