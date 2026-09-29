import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  ChevronDown, 
  HelpCircle,
  Award,
  Sparkles,
  Users,
  Music,
  Globe2,
  Calendar,
  CheckCircle2,
  Quote
} from 'lucide-react';
import { companyInfo } from '../data/company';
import { faqsData } from '../data/faq';

export function AboutSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="about-section" className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        
        {/* Brand Origin & Narrative with Real Corporate Team Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-medical-50 dark:bg-slate-800 text-medical-700 dark:text-medical-300 text-xs font-bold uppercase tracking-wider border border-medical-200 dark:border-medical-800">
              <Sparkles className="w-3.5 h-3.5 text-medical-600 dark:text-medical-400" />
              <span>Foundational Heritage Since 2014</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              The Meaning of Femura: <br />
              <span className="text-medical-600 dark:text-sky-400">
                "Fem" Meets "Femur"
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {companyInfo.name} was established in <strong className="text-slate-900 dark:text-white font-semibold">2014 in Bangalore, Karnataka</strong>. The rationale behind our name embodies our twin clinical commitments:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* Fem */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center font-black text-xs">
                    Fem
                  </div>
                  <div>
                    <strong className="text-sm font-bold text-slate-900 dark:text-white block">Women's Health</strong>
                    <span className="text-[10px] text-rose-500 font-semibold uppercase">Maternal Care</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {companyInfo.etymology.fem}
                </p>
              </div>

              {/* Femur */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-medical-600 text-white flex items-center justify-center font-black text-xs">
                    Femur
                  </div>
                  <div>
                    <strong className="text-sm font-bold text-slate-900 dark:text-white block">Orthopaedic Strength</strong>
                    <span className="text-[10px] text-medical-500 font-semibold uppercase">Joint Remodeling</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {companyInfo.etymology.femur}
                </p>
              </div>
            </div>

            {/* Geographic Footprint */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                <Globe2 className="w-4 h-4 text-medical-600 dark:text-medical-400" />
                <span>Pan-India Presence & Expansion</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                <strong className="text-slate-800 dark:text-slate-200 font-semibold">Active Distribution:</strong> {companyInfo.expansion.southernStates}.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                <strong className="text-slate-800 dark:text-slate-200 font-semibold">Expansion Markets:</strong> {companyInfo.expansion.growthMarkets}.
              </p>
            </div>

            {/* CSR & Arts Sponsorship */}
            <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/40 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-800 dark:text-rose-300">
                <Music className="w-4 h-4 text-rose-600" />
                <span>Societal Commitment: Arts & Cultural Support</span>
              </div>
              <p className="text-xs text-rose-900/80 dark:text-rose-200/80 leading-relaxed font-normal">
                {companyInfo.expansion.csr}
              </p>
            </div>

          </div>

          {/* Right Column: Real Team Photo & Bangalore Headquarters */}
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 overflow-hidden shadow-card">
              
              {/* Real Team Photo from femurapharma.com */}
              <div className="relative h-60 sm:h-64 w-full rounded-2xl overflow-hidden mb-5">
                <img
                  src="/images/team.jpg"
                  alt="Femura Pharma Leadership & Scientific Advisory Team"
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://femurapharma.com/wp-content/uploads/2024/10/team-1024x682.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-medical-300 block">
                    Scientific Advisory & Field Force
                  </span>
                  <span className="text-sm font-bold">
                    Femura Pharma Leadership & Clinical Advisory Panel
                  </span>
                </div>
              </div>

              {/* Core Pillars */}
              <div className="space-y-2.5">
                {companyInfo.corePillars.map((pillar, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700/60">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-0.5">
                      {pillar.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Basavanagudi Bangalore Address Badge */}
              <div className="mt-4 p-3.5 rounded-xl bg-medical-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 flex items-center justify-between text-xs border border-medical-100 dark:border-slate-700">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Registered Corporate Office</span>
                  <strong className="font-semibold text-slate-900 dark:text-white">Basavanagudi, Bangalore – 560004</strong>
                </div>
                <MapPin className="w-5 h-5 text-medical-600 shrink-0" />
              </div>

            </div>
          </div>

        </div>

        {/* Doctor & Distributor Interactive FAQ */}
        <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-medical-600 dark:text-medical-400">
              <HelpCircle className="w-4 h-4" />
              <span>Questions & Clinical Answers</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqsData.flatMap((cat, cIdx) => 
              cat.questions.map((q, qIdx) => {
                const uniqueKey = `${cIdx}-${qIdx}`;
                const isOpen = openFaqIndex === uniqueKey;
                return (
                  <div
                    key={uniqueKey}
                    className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-200 shadow-sm"
                  >
                    <button
                      onClick={() => toggleFaq(uniqueKey)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                    >
                      <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                        {q.q}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-200">
                        {q.a}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
