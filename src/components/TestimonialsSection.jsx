import React from 'react';
import { Star, CheckCircle2, Quote, Building2, Stethoscope } from 'lucide-react';
import { testimonialsData, partnerHospitals } from '../data/testimonials';

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-medical-50 dark:bg-slate-800 text-medical-700 dark:text-medical-300 text-xs font-bold uppercase tracking-wider">
            <Stethoscope className="w-3.5 h-3.5 text-medical-600" />
            <span>KOL Physician Feedback</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Trusted by 4,200+ Specialists Across India
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Clinical feedback from senior Orthopaedic Surgeons, Gynaecologists, and Intensivists who prescribe Femura formulations daily.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {testimonialsData.map((t) => (
            <div
              key={t.id}
              className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 flex flex-col justify-between shadow-card hover:shadow-card-hover transition-all duration-300 relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-medical-50 dark:bg-slate-800 text-medical-700 dark:text-medical-300 border border-medical-200/60 dark:border-slate-700">
                    Prescribes: {t.highlightProduct}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal mb-6 italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Doctor Details */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-black text-slate-900 dark:text-white">
                      {t.doctorName}
                    </h4>
                    {t.verifiedPrescriber && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" title="Verified Prescribing Specialist" />
                    )}
                  </div>
                  <span className="text-xs text-medical-600 dark:text-medical-400 font-semibold block">
                    {t.specialty}
                  </span>
                  <span className="text-[11px] text-slate-400 block">
                    {t.hospital}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                  <Quote className="w-5 h-5 text-medical-400" />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Partner Hospitals */}
        <div className="mt-16 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-6">
            Institutional Hospital Formulary Partners
          </span>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {partnerHospitals.map((h, idx) => (
              <div key={idx} className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <Building2 className="w-4 h-4 text-medical-600" />
                <div className="text-left">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">{h.name}</span>
                  <span className="text-[10px] text-slate-400">{h.location} • {h.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
