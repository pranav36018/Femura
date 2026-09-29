import React, { useState } from 'react';
import { 
  FileText, 
  Clock, 
  ArrowRight, 
  BookOpen, 
  X, 
  Download 
} from 'lucide-react';
import { researchArticles } from '../data/research';
import { useToast } from '../context/ToastContext';

export function ClinicalInsights() {
  const [activeArticle, setActiveArticle] = useState(null);
  const { addToast } = useToast();

  const handleDownloadStudy = (title) => {
    addToast(`Clinical Whitepaper "${title}" downloaded (PDF)`, 'success');
  };

  return (
    <section id="insights-section" className="py-20 bg-slate-50 dark:bg-slate-900/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-medical-50 dark:bg-slate-800 text-medical-700 dark:text-medical-300 text-xs font-bold uppercase tracking-wider mb-3">
              <BookOpen className="w-3.5 h-3.5 text-medical-600" />
              <span>Evidence-Based Therapeutics</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Clinical Research & Monographs
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              Peer-reviewed clinical evidence, pharmacokinetic trials, and molecular monographs validating Femura formulations.
            </p>
          </div>

          <div className="text-xs font-semibold text-slate-500">
            Published in coordination with medical advisory boards
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {researchArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group shadow-card hover:shadow-card-hover"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4 text-[11px]">
                  <span className="px-2.5 py-0.5 rounded-full font-bold bg-medical-50 dark:bg-slate-800 text-medical-700 dark:text-medical-300 border border-medical-200/60 dark:border-slate-700">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-medical-600 dark:group-hover:text-medical-400 transition-colors leading-snug mb-3">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 mb-4 font-normal">
                  {article.summary}
                </p>

                {/* Key finding pill */}
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 text-[11px] text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-0.5">Primary Finding:</span>
                  <p className="line-clamp-2">{article.keyFinding}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-400 font-medium">
                  {article.publishDate}
                </span>

                <span className="inline-flex items-center gap-1 font-bold text-medical-600 dark:text-medical-400 group-hover:translate-x-1 transition-transform">
                  <span>Read Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Article Reader Modal */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
            <div 
              className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 sm:p-8 bg-slate-900 text-white relative">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="absolute top-6 right-6 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2 text-xs mb-3 text-medical-300">
                  <span>{activeArticle.category}</span>
                  <span>•</span>
                  <span>{activeArticle.readTime}</span>
                  <span>•</span>
                  <span>{activeArticle.publishDate}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black leading-snug">
                  {activeArticle.title}
                </h3>
                <span className="text-xs text-slate-400 block mt-2">
                  Conducted by: {activeArticle.author}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs">
                  <strong className="text-emerald-900 dark:text-emerald-200 block mb-1">Key Trial Finding:</strong>
                  <span>{activeArticle.keyFinding}</span>
                </div>

                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-line">
                  {activeArticle.content}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-200 dark:border-slate-800">
                  {activeArticle.tags.map((tag, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-5 sm:p-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => handleDownloadStudy(activeArticle.title)}
                  className="px-4 py-2.5 rounded-xl bg-medical-600 hover:bg-medical-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Whitepaper (PDF)</span>
                </button>

                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
