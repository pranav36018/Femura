import React from 'react';
import { 
  Compass, 
  Target, 
  Layers, 
  HeartHandshake, 
  Quote, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Shield,
  Stethoscope,
  Activity
} from 'lucide-react';
import { companyInfo } from '../data/company';

export function PhilosophySection({ onOpenDoctorModal }) {
  const tenetIcons = [Target, Compass, Layers, HeartHandshake];

  return (
    <section id="philosophy-section" className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-medical-50 dark:bg-slate-800 border border-medical-200 dark:border-medical-800 text-medical-700 dark:text-medical-300 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-medical-600 dark:text-medical-400" />
            <span>Guiding Principles & Scientific Discipline</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            The Four Tenets of <span className="text-medical-600 dark:text-sky-400">Femura Innovation</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Every formulation we engineer is governed by four unwavering strategic tenets designed to advance patient outcomes where conventional formulations fall short.
          </p>
        </div>

        {/* 4 Tenets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {companyInfo.fourTenets.map((tenet, idx) => {
            const Icon = tenetIcons[idx] || Sparkles;
            return (
              <div 
                key={tenet.number}
                className="group relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 shadow-card hover:shadow-card-hover hover:border-medical-400 dark:hover:border-medical-600 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Number & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl font-black text-slate-200 dark:text-slate-800 group-hover:text-medical-100 dark:group-hover:text-medical-950/80 transition-colors font-mono">
                      {tenet.number}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-medical-50 dark:bg-slate-800 group-hover:bg-medical-600 group-hover:text-white text-medical-600 dark:text-medical-400 flex items-center justify-center transition-colors shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2.5 leading-snug group-hover:text-medical-600 dark:group-hover:text-sky-400 transition-colors">
                    {tenet.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {tenet.desc}
                  </p>
                </div>

                {/* Bottom Tenet Tag */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Femura Core Discipline</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quality Motto Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-medical-950 to-slate-900 text-white p-8 sm:p-10 lg:p-12 relative overflow-hidden shadow-card border border-medical-800/40">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 rounded-full bg-medical-500/10 blur-3xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
                <Quote className="w-4 h-4" />
                <span>Our Uncompromising Commitment</span>
              </div>

              <blockquote className="text-lg sm:text-xl lg:text-2xl font-bold text-white leading-relaxed tracking-tight">
                "{companyInfo.motto}"
              </blockquote>

              <p className="text-sm text-sky-200/90 font-medium">
                {companyInfo.searchMotto}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center lg:items-end">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-left w-full sm:w-auto lg:w-full">
                <div className="text-2xl font-black text-white">200+</div>
                <div className="text-xs text-slate-300 font-medium mt-0.5">
                  National & State Medical Conferences
                </div>
              </div>

              {onOpenDoctorModal && (
                <button
                  onClick={onOpenDoctorModal}
                  className="px-5 py-3 rounded-xl bg-medical-600 hover:bg-medical-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 group w-full sm:w-auto lg:w-full"
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>Request Clinical Samples</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Strategic Teams: Team ICON & Team AEON */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Specialized Strategic Operating Divisions
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Two focused scientific divisions delivering precision therapies tailored to clinical practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Team ICON */}
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50">
                    {companyInfo.strategicTeams[0].badge}
                  </span>
                  <span className="text-xs font-bold text-slate-400">Division 01</span>
                </div>
                <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2">
                  {companyInfo.strategicTeams[0].name}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  Dedicated focus on <strong className="text-slate-800 dark:text-slate-200">Women’s Healthcare, Obstetrics & Gynaecology, Infertility, Endocrinology, and Family Physicians</strong>. Formulations engineered for gentle gastrointestinal tolerance, fetal safety, and complete bio-absorption.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400">
                <Activity className="w-4 h-4" />
                <span>Calmagic HD • Livmax • D-Serve • Aldofem</span>
              </div>
            </div>

            {/* Team AEON */}
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-medical-50 text-medical-700 dark:bg-medical-950/60 dark:text-medical-300 border border-medical-200 dark:border-medical-900/50">
                    {companyInfo.strategicTeams[1].badge}
                  </span>
                  <span className="text-xs font-bold text-slate-400">Division 02</span>
                </div>
                <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2">
                  {companyInfo.strategicTeams[1].name}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  Advanced therapeutics for <strong className="text-slate-800 dark:text-slate-200">Orthopaedics, Joint Regeneration, Rheumatology, Urology, Oncology Support, Critical Care, and Neurology</strong>. Backed by bioactive peptides, cartilage re-matrixing agents, and micro-granulated matrices.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-bold text-medical-600 dark:text-medical-400">
                <Shield className="w-4 h-4" />
                <span>Osteopep XT • Bioactive Peptides • Nanoshots</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
