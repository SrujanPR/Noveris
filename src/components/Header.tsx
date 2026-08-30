import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { scrollToContact } from '../utils/scrollToContact';

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToContact(navigate);
  };

  return (
    <header className="fixed inset-x-0 z-50 flex items-center justify-center px-4 sm:px-6 transition-all top-4">
      <nav className="border border-[#1B2A4D]/20 bg-[#F2EFE7]/95 backdrop-blur-2xl rounded-full shadow-2xl flex items-center justify-between transition-all w-full max-w-5xl px-6 sm:px-8 py-2 gap-6">
        {/* Left Side: Logo 1 */}
        <Link to="/" className="flex items-center group py-0.5">
          <img
            src="/Logo 1.png"
            alt="Noveris Bio Logo"
            className="w-auto object-contain transition-transform group-hover:scale-105 h-10 sm:h-12"
          />
        </Link>

        {/* Right Side: Options */}
        <div className="flex items-center font-mono uppercase font-semibold tracking-wider text-[#1B2A4D] gap-5 sm:gap-8 text-xs">
          <Link
            to="/about"
            className="hover:text-[#C9973F] transition-colors py-1 px-1"
          >
            About Us
          </Link>
          <Link
            to="/products"
            className="hover:text-[#C9973F] transition-colors py-1 px-1"
          >
            Products
          </Link>
          <Link
            to="/contact"
            className="hover:bg-[#1B2A4D] hover:text-[#F2EFE7] transition-colors font-bold text-[#08090D] bg-[#C9973F] rounded-full border border-[#C9973F] shadow-sm cursor-pointer whitespace-nowrap px-4 py-1.5"
          >
            Contact Us
          </Link>
        </div>
      </nav>
    </header>
  );
};
