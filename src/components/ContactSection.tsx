import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, CheckCircle2, Users, ShieldCheck, ArrowRight, ChevronRight } from 'lucide-react';

interface InquiryRouting {
  [key: string]: string;
}

interface ContactSectionProps {
  isStandalonePage?: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ isStandalonePage = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Business',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Silent backend email routing mapping (Invisible to the end user)
  const emailRoutingMap: InquiryRouting = {
    'Business': 'business@noverisbio.com',
    'Medical Information': 'medical@noverisbio.com',
    'Careers': 'careers@noverisbio.com',
  };

  const silentTargetEmail = emailRoutingMap[formData.inquiryType] || 'business@noverisbio.com';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Silent background dispatch payload for backend mailing API
    console.log('Dispatching inquiry to backend target:', {
      ...formData,
      silentTargetEmail,
    });

    setIsSubmitted(true);
  };

  return (
    <section className="w-full py-16 sm:py-24 px-6 sm:px-12 lg:px-20 xl:px-28 font-sans text-[#1B2A4D] flex flex-col justify-center">
      {/* 1. Navigation Shortcuts — 2 Column Layout (Shown on Homepage) */}
      {!isStandalonePage && (
        <div className="w-full max-w-[1800px] mx-auto mb-16 sm:mb-24">
          <div className="mb-10">
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1B2A4D] tracking-tight">
              The Team Behind the Standard.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-16 border-t border-[#1B2A4D]/15 pt-4">
            <div>
              <Link to="/team" className="group flex items-center justify-between py-6 border-b border-[#1B2A4D]/15">
                <div className="flex items-center gap-5">
                  <Users className="w-7 h-7 text-[#C9973F] shrink-0" />
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1B2A4D] group-hover:text-[#C9973F] transition-colors">
                      Leadership Team
                    </h3>
                    <p className="font-mono text-xs sm:text-sm text-[#1B2A4D]/60 mt-1">Executive Leadership &amp; Medical Operations</p>
                  </div>
                </div>
                <ChevronRight className="w-7 h-7 text-[#C9973F] group-hover:translate-x-1.5 transition-transform shrink-0" />
              </Link>
            </div>

            <div>
              <Link to="/certifications" className="group flex items-center justify-between py-6 border-b border-[#1B2A4D]/15">
                <div className="flex items-center gap-5">
                  <ShieldCheck className="w-7 h-7 text-[#C9973F] shrink-0" />
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1B2A4D] group-hover:text-[#C9973F] transition-colors">
                      Company Certifications
                    </h3>
                    <p className="font-mono text-xs sm:text-sm text-[#1B2A4D]/60 mt-1">WHO-GMP, ISO, FSSAI &amp; Regulatory Seals</p>
                  </div>
                </div>
                <ChevronRight className="w-7 h-7 text-[#C9973F] group-hover:translate-x-1.5 transition-transform shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      )}      {/* 2. Main Contact Section (Shown on /contact page) */}
      {isStandalonePage && (
        <div id="contact" className="w-full max-w-[1800px] mx-auto min-h-[70vh] flex flex-col justify-center">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1B2A4D] tracking-tight">
              Contact the team.
            </h2>
          </div>

          {/* Contact Form */}
          <div className="w-full max-w-4xl mx-auto">
            {isSubmitted ? (
              <div className="py-8 text-center animate-in fade-in duration-300">
                <CheckCircle2 className="w-12 h-12 text-[#3E7A56] mx-auto mb-4" />
                <h4 className="font-display text-2xl sm:text-3xl font-bold text-[#1B2A4D] mb-2.5">
                  Thank You for Reaching Out!
                </h4>
                <p className="text-[#7C8AA0] text-base max-w-md mx-auto mb-6 leading-relaxed">
                  Your inquiry has been received by Noveris Bio's Bangalore team. Our representative will review your message shortly.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', inquiryType: 'Business', message: '' });
                  }}
                  className="px-8 py-3 rounded-full bg-[#1B2A4D] text-[#F2EFE7] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#C9973F] hover:text-[#08090D] transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
                  <div className="border-b border-[#1B2A4D]/20 pb-3 focus-within:border-[#C9973F] transition-colors">
                    <label className="block font-mono text-[10.5px] font-bold text-[#C9973F] uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dr. Rajesh Sharma"
                      className="w-full bg-transparent border-none text-[#1B2A4D] placeholder-[#7C8AA0]/50 font-sans text-base sm:text-lg focus:outline-none"
                    />
                  </div>

                  <div className="border-b border-[#1B2A4D]/20 pb-3 focus-within:border-[#C9973F] transition-colors">
                    <label className="block font-mono text-[10.5px] font-bold text-[#C9973F] uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. rajesh@clinic.com"
                      className="w-full bg-transparent border-none text-[#1B2A4D] placeholder-[#7C8AA0]/50 font-sans text-base sm:text-lg focus:outline-none"
                    />
                  </div>
                </div>

                {/* Phone & Inquiry Type Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
                  <div className="border-b border-[#1B2A4D]/20 pb-3 focus-within:border-[#C9973F] transition-colors">
                    <label className="block font-mono text-[10.5px] font-bold text-[#C9973F] uppercase tracking-wider mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 9980253044"
                      className="w-full bg-transparent border-none text-[#1B2A4D] placeholder-[#7C8AA0]/50 font-sans text-base sm:text-lg focus:outline-none"
                    />
                  </div>

                  <div className="border-b border-[#1B2A4D]/20 pb-3 focus-within:border-[#C9973F] transition-colors">
                    <label className="block font-mono text-[10.5px] font-bold text-[#C9973F] uppercase tracking-wider mb-2">
                      Inquiry Type *
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full bg-transparent border-none text-[#1B2A4D] font-sans text-base sm:text-lg focus:outline-none cursor-pointer"
                    >
                      <option value="Business">Business</option>
                      <option value="Medical Information">Medical Information</option>
                      <option value="Careers">Careers</option>
                    </select>
                  </div>
                </div>

                {/* Message Field */}
                <div className="border-b border-[#1B2A4D]/20 pb-3 focus-within:border-[#C9973F] transition-colors">
                  <label className="block font-mono text-[10.5px] font-bold text-[#C9973F] uppercase tracking-wider mb-2">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please detail your inquiry or request here..."
                    className="w-full bg-transparent border-none text-[#1B2A4D] placeholder-[#7C8AA0]/50 font-sans text-base sm:text-lg focus:outline-none resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2 text-center">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-12 py-4 rounded-full bg-[#1B2A4D] hover:bg-[#C9973F] text-[#F2EFE7] hover:text-[#08090D] font-mono text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-md group"
                  >
                    <span>Submit</span>
                    <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* 3-Column Info Footer Grid (Below Submit Button) — Matching Image 2 */}
          <div className="border-t border-[#1B2A4D]/15 pt-12 sm:pt-16 mt-16 sm:mt-20 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x divide-[#1B2A4D]/15">
              {/* Column 1: Global HQ */}
              <div className="md:pr-10 lg:pr-12 space-y-2">
                <span className="font-mono text-xs font-bold text-[#7C8AA0] uppercase tracking-widest flex items-center gap-2 block">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C9973F] inline-block animate-pulse" />
                  GLOBAL HQ
                </span>
                <p className="text-[#1B2A4D] font-bold text-lg sm:text-xl">
                  Bangalore, Karnataka, India
                </p>
                <p className="text-[#7C8AA0] font-light text-sm">
                  Biopharmaceutical Operations
                </p>
              </div>

              {/* Column 2: Phone / WhatsApp */}
              <div className="md:px-10 lg:px-12 space-y-2">
                <span className="font-mono text-xs font-bold text-[#7C8AA0] uppercase tracking-widest block">
                  PHONE &amp; WHATSAPP
                </span>
                <a
                  href="tel:9980253044"
                  className="text-[#1B2A4D] font-bold text-lg sm:text-xl hover:text-[#C9973F] transition-colors block"
                >
                  +91 9980253044
                </a>
                <p className="text-[#7C8AA0] font-light text-sm">
                  Direct Clinical &amp; Business Desk
                </p>
              </div>

              {/* Column 3: Official Email */}
              <div className="md:pl-10 lg:pl-12 space-y-2">
                <span className="font-mono text-xs font-bold text-[#7C8AA0] uppercase tracking-widest block">
                  OFFICIAL EMAIL
                </span>
                <a
                  href="mailto:info@noverisbio.com"
                  className="text-[#1B2A4D] font-bold text-lg sm:text-xl hover:text-[#C9973F] transition-colors block"
                >
                  info@noverisbio.com
                </a>
                <p className="text-[#7C8AA0] font-light text-sm">
                  Evidence-Based Biopharma Inquiry
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
