import React, { useState } from 'react';
import { X, Building2, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { inquiryService } from '../services/inquiryService';
import { useToast } from '../context/ToastContext';

export function B2BFranchiseModal({ isOpen, onClose }) {
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [refId, setRefId] = useState('');
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    partnerName: '',
    firmName: '',
    state: 'Karnataka',
    district: '',
    phone: '',
    email: '',
    experience: '5+ Years in Pharma Distribution',
    hasDrugLicense: 'Yes, Active 20B/21B License',
    investmentTier: '₹5 Lakhs - ₹15 Lakhs'
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.partnerName || !formData.phone || !formData.district) {
      addToast('Please enter your name, district, and mobile phone', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await inquiryService.submitFranchiseInquiry(formData);
      setRefId(res.referenceId);
      setIsSuccess(true);
      try {
        confetti({ particleCount: 90, spread: 60 });
      } catch (e) {}
      addToast('Franchise territory enquiry registered!', 'success');
    } catch (err) {
      addToast('Failed to log franchise inquiry', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl max-h-[92dvh] flex flex-col rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-medical-600/30 border border-medical-500/40 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-medical-300" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black">PCD Franchise & Institutional Dealership</h3>
              <p className="text-[11px] sm:text-xs text-slate-300">Monopoly Marketing Rights Across Vacant Districts</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-8 overflow-y-auto flex-1">
          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">Territory Inquiry Registered!</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Thank you for your interest in partnering with Femura Pharma. Our Regional Business Manager will evaluate district availability for {formData.district}, {formData.state} and contact you within 24 hours.
              </p>
              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-mono text-xs text-medical-600 dark:text-medical-400 font-bold inline-block">
                Reference ID: {refId}
              </div>
              <div>
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-medical-600 text-white font-bold text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Partner Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.partnerName}
                    onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Firm / Agency Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Sri Balaji Pharma Distributors"
                    value={formData.firmName}
                    onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Target State *</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none"
                  >
                    <option value="Karnataka">Karnataka</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Preferred District / City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mysore, Pune, Coimbatore..."
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Contact Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="distributor@pharma.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Drug License (DL) Status</label>
                  <select
                    value={formData.hasDrugLicense}
                    onChange={(e) => setFormData({ ...formData, hasDrugLicense: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none"
                  >
                    <option value="Yes, Active 20B/21B License">Yes, Active 20B/21B License</option>
                    <option value="Applied / In Process">Applied / In Process</option>
                    <option value="Planning to Apply">Planning to Apply</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Investment Capacity</label>
                  <select
                    value={formData.investmentTier}
                    onChange={(e) => setFormData({ ...formData, investmentTier: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none"
                  >
                    <option value="₹2 Lakhs - ₹5 Lakhs">₹2 Lakhs - ₹5 Lakhs</option>
                    <option value="₹5 Lakhs - ₹15 Lakhs">₹5 Lakhs - ₹15 Lakhs</option>
                    <option value="₹15 Lakhs - ₹50 Lakhs">₹15 Lakhs - ₹50 Lakhs</option>
                    <option value="₹50 Lakhs+ (C&F / State)">₹50 Lakhs+ (C&F / Super Stockist)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-medical-600 hover:bg-medical-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  {submitting ? 'Checking Territory Availability...' : 'Verify Monopoly Territory & Submit'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
