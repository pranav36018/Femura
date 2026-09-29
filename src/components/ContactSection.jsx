import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  PhoneCall
} from 'lucide-react';
import { companyInfo } from '../data/company';
import { inquiryService } from '../services/inquiryService';
import { useToast } from '../context/ToastContext';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Physician Sample Kit Request',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast('Please complete all required fields.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await inquiryService.submitGeneralContact(formData);
      setSubmitted(true);
      addToast('Thank you! Your message has been routed to our medical desk.', 'success');
    } catch (err) {
      addToast('Could not submit inquiry. Please try calling directly.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact-section" className="py-20 bg-slate-50 dark:bg-slate-900/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-medical-50 dark:bg-slate-800 text-medical-700 dark:text-medical-300 text-xs font-bold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5 text-medical-600" />
            <span>Direct Communications</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Connect With Our Medical & Institutional Team
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Whether you are a consulting specialist requesting formulary kits, a hospital procurement director, or a prospective PCD franchise partner, our Bangalore headquarters is ready to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Info & Bangalore Office */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-card">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Registered Corporate Office
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                  <MapPin className="w-5 h-5 text-medical-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block font-semibold">
                      Femura Pharmaceuticals Pvt. Ltd.
                    </strong>
                    <span>{companyInfo.headquarters.addressLine1}</span><br />
                    <span>{companyInfo.headquarters.city}, {companyInfo.headquarters.state} – {companyInfo.headquarters.postalCode}, {companyInfo.headquarters.country}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <PhoneCall className="w-5 h-5 text-medical-600 shrink-0" />
                  <div>
                    <span className="text-slate-400 text-[11px] block">Toll-Free Helpline</span>
                    <a href="tel:18004253368" className="font-bold text-slate-900 dark:text-white hover:text-medical-600">
                      {companyInfo.headquarters.tollFree}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="text-slate-400 text-[11px] block">Doctor & Hospital Desk</span>
                    <a href="tel:+919845012890" className="font-bold text-slate-900 dark:text-white hover:text-medical-600">
                      {companyInfo.headquarters.doctorHelpline}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <Mail className="w-5 h-5 text-medical-600 shrink-0" />
                  <div>
                    <span className="text-slate-400 text-[11px] block">Official Email</span>
                    <a href={`mailto:${companyInfo.headquarters.email}`} className="font-bold text-slate-900 dark:text-white hover:text-medical-600">
                      {companyInfo.headquarters.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <Clock className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <span className="text-slate-400 text-[11px] block">Operating Hours</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {companyInfo.headquarters.hours}
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Quick Chat */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <a
                  href="https://wa.me/919845012890?text=Hello%20Femura%20Pharma,%20I%20would%20like%20to%20inquire%20about%20your%20pharmaceutical%20formulations."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp with Medical Desk</span>
                </a>
              </div>

            </div>

          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-card">
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                Send an Official Clinical Enquiry
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Our regulatory and clinical team typically replies within 2 to 4 business hours.
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">Message Logged!</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Thank you, {formData.name}. Your inquiry has been routed to our Bangalore head office.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 px-5 py-2 rounded-xl bg-medical-600 text-white font-bold text-xs"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        name="name"
                        placeholder="e.g. Dr. Rajesh or Anand Kumar"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-medical-500"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        name="email"
                        placeholder="you@domain.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-medical-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Contact Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="10-digit number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-medical-500"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Enquiry Purpose</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-medical-500"
                      >
                        <option value="Physician Sample Kit Request">Physician Sample Kit Request</option>
                        <option value="Hospital Formulary Quotation">Hospital Formulary Bulk Quotation</option>
                        <option value="PCD Franchise Rights">PCD Franchise / Distribution Enquiry</option>
                        <option value="Pharmacovigilance">Pharmacovigilance & Adverse Event</option>
                        <option value="General Query">General Corporate Query</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Message / Clinical Requirements *</label>
                    <textarea
                      rows={4}
                      required
                      name="message"
                      placeholder="Please specify specific formulations, dosage strengths, or territory requirements..."
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-medical-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl bg-medical-600 hover:bg-medical-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'Transmitting Message...' : 'Submit Official Enquiry'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
