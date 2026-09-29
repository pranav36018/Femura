import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2,
  X,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { companyInfo } from '../data/company';
import { useToast } from '../context/ToastContext';

export function Footer({ onOpenDoctorModal, onOpenFranchiseModal, onSelectCategory }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [legalModal, setLegalModal] = useState(null); // 'privacy' | 'terms' | null
  const { addToast } = useToast();

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      addToast('Thank you for subscribing to Femura Clinical Updates!', 'success');
      setNewsletterEmail('');
    }
  };

  const handleCategoryClick = (categorySlug) => {
    if (onSelectCategory) {
      onSelectCategory(categorySlug);
    }
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollTo = (elementId) => {
    const el = document.getElementById(elementId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-12 sm:pt-16 pb-24 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Column 1: Brand & Logo */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white px-4 py-2.5 rounded-2xl shadow-sm inline-flex items-center">
                <img 
                  src="/images/logo.png" 
                  alt="Femura Pharma" 
                  className="h-12 sm:h-14 lg:h-16 w-auto object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://femurapharma.com/wp-content/uploads/2024/04/logo.png";
                  }}
                />
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Specialty pharmaceutical vanguard combining <strong>'Fem'</strong> (Women's Obstetrics & Gynaecology) and <strong>'Femur'</strong> (Orthopaedic Durability). Delivering bioavailable formulations across India under strict WHO-GMP compliance.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-medical-400" />
                <span>{companyInfo.headquarters.addressLine1}, {companyInfo.headquarters.city} – {companyInfo.headquarters.postalCode}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-medical-400" />
                <span>Toll Free: 1800-425-3368</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-medical-400" />
                <span>{companyInfo.headquarters.email}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Therapeutic Specialties */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Specialty Formularies
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button 
                  onClick={() => handleCategoryClick('gynecology')} 
                  className="hover:text-medical-400 transition-colors text-left"
                >
                  Gynecology & Maternal Care (Fem)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleCategoryClick('orthopaedics')} 
                  className="hover:text-medical-400 transition-colors text-left"
                >
                  Orthopaedics & Bio-Peptides (Femur)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleCategoryClick('gastroenterology')} 
                  className="hover:text-medical-400 transition-colors text-left"
                >
                  Gastroenterology & Hepatoprotectives
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleCategoryClick('critical-care')} 
                  className="hover:text-medical-400 transition-colors text-left"
                >
                  Critical Care Parenterals & TPN
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleCategoryClick('endocrinology')} 
                  className="hover:text-medical-400 transition-colors text-left"
                >
                  Endocrinology & D3 Nanoshots
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleCategoryClick('neurology')} 
                  className="hover:text-medical-400 transition-colors text-left"
                >
                  Neurology & Nerve Repair
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Physician & B2B Portals */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Clinician Services
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={onOpenDoctorModal} className="hover:text-medical-400 transition-colors text-left">
                  Request Sample Kits
                </button>
              </li>
              <li>
                <button onClick={onOpenFranchiseModal} className="hover:text-medical-400 transition-colors text-left">
                  PCD Franchise Inquiry
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScrollTo('philosophy-section')} 
                  className="hover:text-medical-400 transition-colors text-left"
                >
                  The Four Tenets & Team ICON/AEON
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScrollTo('gallery-section')} 
                  className="hover:text-medical-400 transition-colors text-left"
                >
                  Medical Conferences & Symposia
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScrollTo('insights-section')} 
                  className="hover:text-medical-400 transition-colors text-left"
                >
                  Clinical Monograph Library
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScrollTo('quality-section')} 
                  className="hover:text-medical-400 transition-colors text-left"
                >
                  WHO-GMP Certification
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScrollTo('contact-section')} 
                  className="hover:text-medical-400 transition-colors text-left"
                >
                  Institutional RFQ Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Clinical Updates
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe for quarterly clinical trial bulletins, drug delivery breakthroughs, and CME invitations.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Subscription confirmed!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex items-center gap-1.5">
                <input
                  type="email"
                  required
                  placeholder="doctor@hospital.org"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-medical-500"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-medical-600 hover:bg-medical-700 text-white shrink-0 transition-colors"
                  title="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}

            <div className="pt-2 text-[10px] text-slate-500">
              Verified healthcare communication only.
            </div>
          </div>

        </div>

        {/* Regulatory Schedule H Legal Disclaimer */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
          <strong className="text-slate-300 block mb-1">
            STATUTORY MEDICAL DISCLAIMER & PHARMACOVIGILANCE
          </strong>
          Information presented on femurapharma.com is intended exclusively for Registered Medical Practitioners (RMPs), hospital procurement committees, and pharmaceutical professionals. Products marked <em>Schedule H Prescription Drug</em> must be dispensed only against a valid medical prescription from a registered clinician. Self-medication is hazardous. Report any suspected adverse events to <a href="mailto:care@femurapharma.com" className="text-medical-400 underline">care@femurapharma.com</a>.
        </div>

        {/* Bottom Bar: Copyright & Rights */}
        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Femura Pharmaceuticals Private Limited. All Rights Reserved.
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setLegalModal('privacy')} 
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => setLegalModal('terms')} 
              className="hover:text-slate-300 transition-colors"
            >
              Terms of Supply
            </button>
            <button 
              onClick={() => handleScrollTo('quality-section')} 
              className="hover:text-slate-300 transition-colors"
            >
              WHO-GMP Certification
            </button>
          </div>
        </div>

      </div>

      {/* Statutory / Legal Compliance Modal */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-800 text-slate-200 shadow-2xl overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 bg-slate-950 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-medical-400" />
                <h3 className="text-base font-bold text-white">
                  {legalModal === 'privacy' ? 'Statutory Privacy & Data Protection Policy' : 'Pharmaceutical Terms of Supply & Distribution'}
                </h3>
              </div>
              <button 
                onClick={() => setLegalModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto text-xs space-y-4 text-slate-300 leading-relaxed">
              {legalModal === 'privacy' ? (
                <>
                  <p>
                    <strong>1. Compliance Framework:</strong> Femura Pharmaceuticals Private Limited adheres to the Digital Personal Data Protection (DPDP) Act 2023, Information Technology (Reasonable Security Practices) Rules, and Central Drugs Standard Control Organization (CDSCO) regulatory directives.
                  </p>
                  <p>
                    <strong>2. Clinician & Doctor Data Confidentiality:</strong> Medical council registration numbers (MCI/State Medical Councils), hospital affiliations, and clinic delivery addresses gathered during sample evaluation kit requests are utilized strictly for verifying professional practitioner credentials and temperature-controlled sample dispatch. We never sell, lease, or monetize clinician registries.
                  </p>
                  <p>
                    <strong>3. Pharmacovigilance & Adverse Drug Reaction (ADR) Reporting:</strong> Any clinical event reported through our medical desk or adverse event channels (<a href="mailto:care@femurapharma.com" className="text-medical-400 underline">care@femurapharma.com</a>) is handled under strict statutory confidentiality and forwarded to the Pharmacovigilance Programme of India (PvPI) in compliance with CDSCO safety monitoring guidelines.
                  </p>
                  <p>
                    <strong>4. Data Security:</strong> All sample requests, franchise applications, and correspondence undergo end-to-end transport-layer encryption (TLS 1.3) and are hosted within secure, audited Indian data repository facilities.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>1. Regulatory Licensing:</strong> All institutional purchases, hospital tenders, and PCD franchise distribution agreements require valid Drug Licenses (Form 20B and Form 21B) issued by the relevant State Licensing Authority under the Drugs and Cosmetics Act 1940 and Rules 1945.
                  </p>
                  <p>
                    <strong>2. Schedule H Prescription Drug Restriction:</strong> Formulations classified as Schedule H must be dispensed exclusively under the supervision of a Registered Pharmacist against an authentic prescription issued by a Registered Medical Practitioner (RMP). Over-the-counter dispensing of Schedule H items is strictly prohibited.
                  </p>
                  <p>
                    <strong>3. Cold-Chain Logistical Warranty:</strong> Biologicals and temperature-sensitive injectables (such as Aldofem Inj IV and Livmax IV) are dispatched under validated 2°C to 8°C cold-chain insulation with irreversible temperature threshold data loggers. Hospital receipt must confirm thermal compliance upon delivery.
                  </p>
                  <p>
                    <strong>4. Quality Assurance & Recalls:</strong> Every commercial batch is supplied with an official Manufacturer Certificate of Analysis (COA). Any quality grievances or batch inquiries must be formally lodged with our Quality Assurance Directorate in Bangalore within 7 working days of receipt.
                  </p>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 text-right">
              <button
                onClick={() => setLegalModal(null)}
                className="px-5 py-2 rounded-xl bg-medical-600 hover:bg-medical-700 text-white font-bold text-xs transition-colors"
              >
                Acknowledge & Close
              </button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
}
