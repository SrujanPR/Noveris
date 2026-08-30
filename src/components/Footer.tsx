import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { scrollToContact } from '../utils/scrollToContact';

export const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToContact(navigate);
  };

  return (
    <footer className="w-full bg-[#F2EFE7] text-[#1B2A4D] py-16 px-6 sm:px-12 border-t border-[#1B2A4D]/20 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[260px]">
        {/* Top Content Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Column 1: Logo 3 & Description */}
          <div className="md:col-span-5 flex flex-col items-start space-y-4">
            <Link to="/" className="inline-block">
              <img
                src="/Logo 3.png"
                alt="Noveris Bio Logo"
                className="h-28 sm:h-36 lg:h-40 w-auto object-contain block"
              />
            </Link>
            <p className="text-[#7C8AA0] font-medium text-xs sm:text-sm max-w-sm leading-relaxed">
              Pioneering advanced biologicals, recombinant proteins, and biopharmaceuticals in Bangalore, India.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 flex flex-col items-start justify-start">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#C9973F] mb-4">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3 font-mono text-sm text-[#1B2A4D]">
              <li>
                <Link to="/" className="hover:text-[#C9973F] transition-colors font-semibold">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#C9973F] transition-colors font-semibold">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#C9973F] transition-colors font-semibold">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-[#C9973F] transition-colors font-semibold">
                  Team
                </Link>
              </li>
              <li>
                <Link to="/certifications" className="hover:text-[#C9973F] transition-colors font-semibold">
                  Certifications
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C9973F] transition-colors font-semibold">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Us Details */}
          <div className="md:col-span-4 flex flex-col items-start justify-start">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#C9973F] mb-4">
              Contact Us
            </h4>
            <div className="flex flex-col gap-3 font-mono text-sm text-[#1B2A4D]">
              <a
                href="mailto:info@noverisbio.com"
                className="hover:text-[#C9973F] transition-colors font-semibold"
              >
                info@noverisbio.com
              </a>
              <a
                href="tel:9980253044"
                className="hover:text-[#C9973F] transition-colors font-semibold"
              >
                +91 9980253044
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line & Copyright */}
        <div className="border-t border-[#1B2A4D]/20 pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs sm:text-sm font-semibold text-[#1B2A4D] tracking-wider">
            &copy; {new Date().getFullYear()} NOVERIS BIO, All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
