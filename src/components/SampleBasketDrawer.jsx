import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  CheckCircle2, 
  Truck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { inquiryService } from '../services/inquiryService';
import { useToast } from '../context/ToastContext';

export function SampleBasketDrawer({ 
  isOpen, 
  onClose, 
  basket, 
  onUpdateQuantity, 
  onRemoveItem, 
  onClearBasket 
}) {
  const [step, setStep] = useState('review');
  const [submitting, setSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    doctorName: '',
    regNumber: '',
    specialty: 'Orthopaedics',
    clinicName: '',
    address: '',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '',
    phone: '',
    email: '',
    notes: ''
  });

  const [formErrors, setFormErrors] = useState({});

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.doctorName.trim()) errors.doctorName = "Doctor name is required";
    if (!formData.clinicName.trim()) errors.clinicName = "Clinic or Hospital name is required";
    if (!formData.address.trim()) errors.address = "Delivery address is required";
    if (!formData.phone.trim() || formData.phone.length < 10) errors.phone = "Valid 10-digit mobile number is required";
    if (!formData.pincode.trim()) errors.pincode = "PIN Code is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const response = await inquiryService.submitSampleRequest({
        ...formData,
        items: basket
      });

      setSuccessData(response);
      setStep('success');
      onClearBasket();
      
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      addToast("Clinical Evaluation Kit Request logged successfully!", "success");
    } catch (err) {
      addToast("Failed to submit request. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const totalUnits = basket.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col justify-between border-l border-slate-200 dark:border-slate-800">
          
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-medical-50 dark:bg-slate-800 text-medical-600 dark:text-medical-400 flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Sample & RFQ Basket
                </h3>
                <span className="text-xs text-slate-500">
                  {basket.length} {basket.length === 1 ? 'formulation' : 'formulations'} ({totalUnits} sample units)
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close basket"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            
            {step === 'review' && (
              <>
                {basket.length === 0 ? (
                  <div className="py-16 text-center space-y-3">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
                      <ShoppingBag className="w-8 h-8 text-medical-600" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      Your Sample Basket is Empty
                    </h4>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto">
                      Explore our formulary and click "Sample Kit" on any formulation to request clinic evaluation packs.
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-3 px-5 py-2 rounded-xl bg-medical-600 text-white text-xs font-bold shadow-sm"
                    >
                      Browse Formulations
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Selected Formulations</span>
                      <button
                        onClick={onClearBasket}
                        className="text-rose-600 hover:underline font-semibold"
                      >
                        Clear All
                      </button>
                    </div>

                    <div className="divide-y divide-slate-100 dark:divide-slate-800 space-y-3">
                      {basket.map((item) => (
                        <div key={item.product.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                          
                          {/* Real Thumbnail */}
                          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 p-1 shrink-0 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="max-h-full max-w-full object-contain"
                              onError={(e) => {
                                if (item.product.fallbackImage) e.target.src = item.product.fallbackImage;
                              }}
                            />
                          </div>

                          <div className="flex-1">
                            <span className="text-xs font-extrabold text-slate-900 dark:text-white block">
                              {item.product.name}
                            </span>
                            <span className="text-[11px] text-slate-500 block">
                              {item.product.strength}
                            </span>
                            <span className="text-[10px] text-medical-600 dark:text-medical-400 font-semibold block mt-0.5">
                              {item.product.packaging}
                            </span>
                          </div>

                          {/* Quantity Selector */}
                          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold px-1.5">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="p-3.5 rounded-2xl bg-medical-50 dark:bg-slate-800/60 border border-medical-200/60 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2.5">
                      <Truck className="w-5 h-5 text-medical-600 shrink-0" />
                      <span>Complimentary clinic dispatch via temperature-controlled courier within 48-72 hours.</span>
                    </div>
                  </div>
                )}
              </>
            )}

            {step === 'details' && (
              <form id="sample-request-form" onSubmit={handleSubmitRequest} className="space-y-4 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">
                    Clinician Dispatch Coordinates
                  </span>
                  <button
                    type="button"
                    onClick={() => setStep('review')}
                    className="text-medical-600 hover:underline font-semibold"
                  >
                    Back to Items
                  </button>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Doctor / Practitioner Name *
                  </label>
                  <input
                    type="text"
                    name="doctorName"
                    placeholder="e.g. Dr. Ramesh Kumar, MS (Ortho)"
                    value={formData.doctorName}
                    onChange={handleInputChange}
                    className={`w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border ${
                      formErrors.doctorName ? 'border-rose-500' : 'border-transparent focus:border-medical-500'
                    } text-slate-900 dark:text-white font-medium focus:outline-none`}
                  />
                  {formErrors.doctorName && <span className="text-[10px] text-rose-500 mt-0.5 block">{formErrors.doctorName}</span>}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Clinical Specialty
                    </label>
                    <select
                      name="specialty"
                      value={formData.specialty}
                      onChange={handleInputChange}
                      className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none"
                    >
                      <option value="Orthopaedics">Orthopaedics</option>
                      <option value="Gynecology">Obstetrics & Gynecology</option>
                      <option value="Gastroenterology">Gastroenterology</option>
                      <option value="Critical Care">Critical Care / ICU</option>
                      <option value="Endocrinology">Endocrinology</option>
                      <option value="General Medicine">General Medicine</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Reg. Number (MCI/KMC)
                    </label>
                    <input
                      type="text"
                      name="regNumber"
                      placeholder="e.g. KMC-74921"
                      value={formData.regNumber}
                      onChange={handleInputChange}
                      className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Clinic / Hospital Name *
                  </label>
                  <input
                    type="text"
                    name="clinicName"
                    placeholder="e.g. Manipal Hospital / Ortho Clinic"
                    value={formData.clinicName}
                    onChange={handleInputChange}
                    className={`w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border ${
                      formErrors.clinicName ? 'border-rose-500' : 'border-transparent focus:border-medical-500'
                    } text-slate-900 dark:text-white font-medium focus:outline-none`}
                  />
                  {formErrors.clinicName && <span className="text-[10px] text-rose-500 mt-0.5 block">{formErrors.clinicName}</span>}
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Clinic Shipping Address *
                  </label>
                  <textarea
                    rows={2}
                    name="address"
                    placeholder="Street, locality, landmark"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border ${
                      formErrors.address ? 'border-rose-500' : 'border-transparent focus:border-medical-500'
                    } text-slate-900 dark:text-white font-medium focus:outline-none`}
                  />
                  {formErrors.address && <span className="text-[10px] text-rose-500 mt-0.5 block">{formErrors.address}</span>}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">PIN Code *</label>
                    <input
                      type="text"
                      name="pincode"
                      placeholder="e.g. 560004"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className={`w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border ${
                        formErrors.pincode ? 'border-rose-500' : 'border-transparent focus:border-medical-500'
                      } text-slate-900 dark:text-white font-medium focus:outline-none`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Mobile No *</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="10-digit number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border ${
                        formErrors.phone ? 'border-rose-500' : 'border-transparent focus:border-medical-500'
                      } text-slate-900 dark:text-white font-medium focus:outline-none`}
                    />
                    {formErrors.phone && <span className="text-[10px] text-rose-500 mt-0.5 block">{formErrors.phone}</span>}
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="doctor@hospital.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none"
                    />
                  </div>
                </div>
              </form>
            )}

            {step === 'success' && successData && (
              <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-xl font-black text-slate-900 dark:text-white">
                    Sample Dispatch Initiated!
                  </h4>
                  <p className="text-xs text-slate-500">
                    Your request ticket has been logged into our Bangalore central repository.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Reference ID:</span>
                    <strong className="font-mono text-medical-600 dark:text-medical-400 font-bold">{successData.referenceId}</strong>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Status:</span>
                    <span className="text-emerald-600 font-bold">Packaging for Dispatch</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Estimated Delivery:</span>
                    <span className="text-slate-900 dark:text-white font-semibold">48 Hours</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setStep('review');
                    onClose();
                  }}
                  className="w-full py-3 rounded-xl bg-medical-600 text-white font-bold text-xs shadow-md"
                >
                  Done
                </button>
              </div>
            )}

          </div>

          {/* Footer Bar */}
          {step !== 'success' && basket.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-3">
              {step === 'review' ? (
                <button
                  onClick={() => setStep('details')}
                  className="w-full py-3.5 rounded-xl bg-medical-600 hover:bg-medical-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <span>Proceed to Clinic Address</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  form="sample-request-form"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-medical-600 hover:bg-medical-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Registering with Dispatch...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Submit Clinical Sample Request</span>
                    </>
                  )}
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
