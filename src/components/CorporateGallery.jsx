import React, { useState } from 'react';
import { 
  Award, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  X, 
  ChevronLeft, 
  Maximize2, 
  Sparkles,
  Users,
  Building2,
  Stethoscope
} from 'lucide-react';
import { galleryImages } from '../data/gallery';

export function CorporateGallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  const filters = [
    { id: 'all', label: 'All Conclaves (8)' },
    { id: 'orthopaedics', label: 'Orthopaedic Meets' },
    { id: 'gynaecology', label: 'Gynecology Symposia' },
    { id: 'symposium', label: 'Scientific CME & Trials' },
    { id: 'corporate', label: 'Milestones & Launches' }
  ];

  const filteredImages = activeFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(item => item.category === activeFilter);

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev > 0 ? prev - 1 : filteredImages.length - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev < filteredImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="gallery-section" className="py-16 sm:py-20 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-medical-50 dark:bg-slate-800 border border-medical-200 dark:border-medical-800 text-medical-700 dark:text-medical-300 text-xs font-bold uppercase tracking-wider shadow-sm">
              <Users className="w-3.5 h-3.5 text-medical-600 dark:text-medical-400" />
              <span>Medical Fraternity Presence</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Medical Conferences & <span className="text-medical-600 dark:text-sky-400">Scientific Symposia</span>
            </h2>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Femura has actively participated in over <strong className="text-slate-900 dark:text-white font-semibold">200 National, State, and District level Gynecology, Orthopaedic & Neurology conferences</strong> across India over the past 10 years.
            </p>
          </div>

          {/* Quick Counter Card */}
          <div className="shrink-0 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-medical-600 text-white flex items-center justify-center font-black text-lg">
              200+
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">
                CME Conclaves
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                10 Years of Active Medical Engagement
              </span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filters.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeFilter === tab.id
                  ? 'bg-medical-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredImages.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhotoIndex(idx)}
              className="group relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-card-hover transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Photo Frame */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/slider1.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                
                {/* Badge Tag */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 dark:bg-slate-900/95 text-medical-700 dark:text-medical-300 shadow-sm">
                    {photo.categoryLabel}
                  </span>
                </div>

                {/* View Icon Overlay */}
                <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-slate-900/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Photo Caption */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white dark:bg-slate-900">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 dark:text-slate-500 font-medium mb-1.5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-medical-500" />
                      <span>{photo.location}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{photo.year}</span>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-medical-600 dark:group-hover:text-sky-400 transition-colors">
                    {photo.title}
                  </h3>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {photo.highlight}
                  </span>
                  <span className="text-medical-600 dark:text-medical-400 font-bold flex items-center gap-0.5">
                    View
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal / Lightbox for Full View */}
        {selectedPhotoIndex !== null && filteredImages[selectedPhotoIndex] && (
          <div 
            className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            <div 
              className="relative max-w-4xl w-full rounded-3xl bg-white dark:bg-slate-900 overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next Navigation */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Modal Image */}
              <div className="h-72 sm:h-96 md:h-[450px] w-full bg-slate-950 flex items-center justify-center overflow-hidden">
                <img
                  src={filteredImages[selectedPhotoIndex].image}
                  alt={filteredImages[selectedPhotoIndex].title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Modal Details */}
              <div className="p-6 sm:p-7 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-medical-50 dark:bg-slate-800 text-medical-700 dark:text-medical-300">
                      {filteredImages[selectedPhotoIndex].categoryLabel}
                    </span>
                    <span className="text-xs text-slate-400">
                      {filteredImages[selectedPhotoIndex].location} • {filteredImages[selectedPhotoIndex].year}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {filteredImages[selectedPhotoIndex].highlight}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {filteredImages[selectedPhotoIndex].title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {filteredImages[selectedPhotoIndex].description}
                </p>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Photo {selectedPhotoIndex + 1} of {filteredImages.length}</span>
                  <span>Authentic Medical Conference Documentation</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
