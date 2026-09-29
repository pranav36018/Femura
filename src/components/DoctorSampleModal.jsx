import React, { useState } from 'react';
import { X, Stethoscope, CheckCircle2, Sparkles, Building2, MapPin, Phone, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { inquiryService } from '../services/inquiryService';
import { useToast } from '../context/ToastContext';

export function DoctorSampleModal({ isOpen, onClose }) {
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [refId, setRefId] = useState('');
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    doctorName: '',
    specialty: 'Orthopaedics',
    regNumber: '',
    hospitalName: '',
    city: 'Bangalore',
    phone: '',
    email: '',
    requestedMolecules: ['Calmagic HD', 'Osteopep XT']
  });

  if (!isOpen) return null;

  const sampleOptions = [
    'Calmagic HD (High Density CCM)',
    'Osteopep XT (Bioactive Collagen Peptides)',
    'Livmax Syrup (Silymarin + LOLA)',
    'D-Serve 60K Nanoshots (Vitamin D3)',
    'Hemoferol XT (Ferrous Ascorbate)',
    'Aldofem Inj IV (Lyophilized Glutathione)',
    'Femgesic SP (Aceclofenac + Serratiopeptidase)',
    'Mtrace-IV (Multi-Trace Minerals)'
  ];

  const handleToggleMolecule = (mol) => {
    setFormData(prev => {
      const exists = prev.requestedMolecules.includes(mol);
      if (exists) {
        return { ...prev, requestedMolecules: prev.requestedMolecules.filter(m => m !== mol) };
      }
      return { ...prev, requestedMolecules: [...prev.requestedMolecules, mol] };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.doctorName || !formData.phone) {
      addToast('Please provide your name and contact phone number', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await inquiryService.submitSampleRequest(formData);
      setRefId(res.referenceId);
      setIsSuccess(true);
      try {
        confetti({ particleCount: 100, spread: 60 });
      } catch (e) {}
      addToast('Sample kit dispatch request initiated!', 'success');
    } catch (err) {
      addToast('Error submitting request.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[92dvh] flex flex-col rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-medical-600/30 border border-medical-500/40 flex items-center justify-center shrink-0">
              <Stethoscope className="w-5 h-5 text-medical-300" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black">Doctor Sample Evaluation Kit</h3>
              <p className="text-[11px] sm:text-xs text-slate-300">For Registered Medical Practitioners & Hospital Formularies</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-1">
          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">Sample Kit Requested!</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Thank you, Dr. {formData.doctorName}. Our clinical relations manager will coordinate dispatch of your evaluation kit.
              </p>
              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-mono text-xs text-medical-600 dark:text-medical-400 font-bold inline-block">
                Reference: {refId}
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
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Doctor Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Ramesh Kumar"
                    value={formData.doctorName}
                    onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Specialty</label>
                  <select
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none"
                  >
                    <option value="Orthopaedics">Orthopaedics & Joint Surgery</option>
                    <option value="Gynecology">Obstetrics & Gynecology</option>
                    <option value="Gastroenterology">Gastroenterology & Hepatology</option>
                    <option value="Critical Care">Critical Care & Anesthesia</option>
                    <option value="Endocrinology">Endocrinology & Diabetology</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Medical Registration No.</label>
                  <input
                    type="text"
                    placeholder="e.g. KMC-10942"
                    value={formData.regNumber}
                    onChange={(e) => setFormData({ ...formData, regNumber: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Hospital / Clinic Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Manipal Hospital / Private Clinic"
                    value={formData.hospitalName}
                    onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">City / Region</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none"
                  />
                </div>
              </div>

              {/* Formulations Checklist */}
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-2">
                  Select Formulations to Include in Sample Kit:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {sampleOptions.map((opt) => {
                    const isSelected = formData.requestedMolecules.includes(opt);
                    return (
                      <div
                        key={opt}
                        onClick={() => handleToggleMolecule(opt)}
                        className={`p-2.5 rounded-xl border cursor-pointer flex items-center gap-2 transition-all ${
                          isSelected 
                            ? 'bg-medical-50 dark:bg-slate-800 border-medical-500 text-medical-900 dark:text-medical-200' 
                            : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                          isSelected ? 'bg-medical-600 border-medical-600 text-white' : 'border-slate-400'
                        }`}>
                          {isSelected && <CheckCircle2 className="w-3 h-3" />}
                        </div>
                        <span className="text-[11px] font-semibold">{opt}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-medical-600 hover:bg-medical-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  {submitting ? 'Registering Dispatch...' : 'Dispatch Complimentary Evaluation Kit'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
