import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export const FloatingContactButtons: React.FC = () => {
  const phoneNumber = '9980253044';
  const whatsappUrl = `https://wa.me/91${phoneNumber}`;
  const phoneUrl = `tel:${phoneNumber}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* WhatsApp Button (Top) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#1B2A4D] text-[#C9973F] border border-[#C9973F]/40 shadow-xl hover:scale-110 hover:bg-[#C9973F] hover:text-[#08090D] transition-all duration-300"
        title="Chat on WhatsApp (+91 9980253044)"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="absolute right-14 bg-[#1B2A4D] text-[#F2EFE7] font-mono text-xs px-3 py-1.5 rounded-md shadow-lg border border-[#C9973F]/30 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          WhatsApp: 9980253044
        </span>
      </a>

      {/* Phone Call Button (Bottom) */}
      <a
        href={phoneUrl}
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#1B2A4D] text-[#C9973F] border border-[#C9973F]/40 shadow-xl hover:scale-110 hover:bg-[#C9973F] hover:text-[#08090D] transition-all duration-300"
        title="Call Us (+91 9980253044)"
      >
        <Phone className="w-5 h-5" />
        <span className="absolute right-14 bg-[#1B2A4D] text-[#F2EFE7] font-mono text-xs px-3 py-1.5 rounded-md shadow-lg border border-[#C9973F]/30 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Call: 9980253044
        </span>
      </a>
    </div>
  );
};
