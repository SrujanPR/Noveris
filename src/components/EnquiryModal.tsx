import React, { useState } from 'react';
import { X, Shield, CheckCircle, ArrowRight, Building, Mail, Phone, User, FileText } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    designation: '',
    organization: '',
    drugLicense: '',
    email: '',
    phone: '',
    requestType: 'Institutional Supply Enquiry',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#050B14]/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0A192F] border border-white/20 rounded-2xl shadow-2xl overflow-hidden text-white my-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#050B14]/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#00509D] flex items-center justify-center text-[#D4AF37]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white">
                Noveris Bio • Institutional Request
              </h3>
              <p className="font-mono text-xs text-slate-400">
                Medical Affairs &amp; Institutional Supply Desk (Bangalore HQ)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {submitted ? (
            <div className="py-12 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#10B981]/20 border border-[#10B981] flex items-center justify-center text-[#10B981] mb-6 animate-bounce">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-display text-2xl font-bold text-white mb-2">
                Institutional Request Transmitted
              </h4>
              <p className="text-slate-300 font-light text-sm max-w-md mb-6 leading-relaxed">
                Thank you, <strong className="text-white">{formData.fullName}</strong>. Your inquiry has been routed directly to the Noveris Bio Medical Affairs Secretariat in Bangalore. Reference ID: <code className="text-[#D4AF37]">NOV-REQ-2026-8841</code>.
              </p>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-lg bg-[#00509D] text-white font-mono text-xs font-bold uppercase"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] text-slate-300 uppercase mb-1">
                    Full Name &amp; Title *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      required
                      type="text"
                      placeholder="Dr. Rajesh Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#050B14] border border-white/15 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-slate-300 uppercase mb-1">
                    Designation / Role *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Chief Medical Officer / Stockist Head"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full bg-[#050B14] border border-white/15 rounded-lg px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] text-slate-300 uppercase mb-1">
                    Institution / Stockist Name *
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      required
                      type="text"
                      placeholder="Manipal Hospital / Apex Bio Stockists"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full bg-[#050B14] border border-white/15 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-slate-300 uppercase mb-1">
                    Drug License (DL) No. / Reg ID
                  </label>
                  <input
                    type="text"
                    placeholder="KA-BLR-2026-DL-8890"
                    value={formData.drugLicense}
                    onChange={(e) => setFormData({ ...formData, drugLicense: e.target.value })}
                    className="w-full bg-[#050B14] border border-white/15 rounded-lg px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] text-slate-300 uppercase mb-1">
                    Institutional Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      required
                      type="email"
                      placeholder="r.sharma@institution.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#050B14] border border-white/15 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-slate-300 uppercase mb-1">
                    Contact Hotline Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#050B14] border border-white/15 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] text-slate-300 uppercase mb-1">
                  Nature of Request *
                </label>
                <select
                  value={formData.requestType}
                  onChange={(e) => setFormData({ ...formData, requestType: e.target.value })}
                  className="w-full bg-[#050B14] border border-white/15 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="Institutional Supply Enquiry">Institutional Bulk Supply Framework</option>
                  <option value="Stockist Credential Verification">Stockist Credential Verification</option>
                  <option value="Certificate of Analysis (CoA) Request">Certificate of Analysis (CoA) Request</option>
                  <option value="Bangalore Facility Audit Request">Bangalore cGMP Facility Audit Request</option>
                  <option value="Clinical Trial Partnership">Clinical Trial Partnership &amp; Research</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[11px] text-slate-300 uppercase mb-1">
                  Technical Requirements / Specification Details
                </label>
                <textarea
                  rows={3}
                  placeholder="Detail your compound specifications, expected volumes, or regulatory audit dates..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#050B14] border border-white/15 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[#00509D] via-[#002B49] to-[#050B14] border border-[#D4AF37] text-white font-mono text-xs font-bold uppercase tracking-widest shadow-xl hover:shadow-[#D4AF37]/30 transition-all flex items-center justify-center gap-2"
                >
                  Transmit Request to Medical Affairs
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
