import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, X, ArrowRight } from 'lucide-react';
import { Footer } from '../components/Footer';

interface TeamMember {
  id: string;
  name: string;
  roleCategory: string;
  companyRole: string;
  location: string;
  image?: string;
  bio: string;
}

// Per-person avatar gradient, used until a real photo is supplied via
// `image`. Swap a member's `image` field to a real import and the row
// switches to the photo automatically — no other change needed.
const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #E7BE72, #1B2A4D)',
  'linear-gradient(135deg, #8C9AB2, #08090D)',
  'linear-gradient(135deg, #C9973F, #25396A)',
  'linear-gradient(135deg, #F2EFE7, #3B4B61)',
];

function getInitials(name: string): string {
  const cleaned = name.replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.)\s*/i, '').trim();
  const parts = cleaned.split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

// Lightweight scroll-reveal wrapper — fades a block up into place the
// first time it enters the viewport, then stops observing.
const Reveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity .7s ease ${delay}ms, transform .7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const Avatar: React.FC<{ member: TeamMember; index: number; size?: string }> = ({ member, index, size = 'w-20 h-20 sm:w-24 sm:h-24' }) => (
  <div
    className={`${size} shrink-0 rounded-full overflow-hidden flex items-center justify-center font-display font-bold text-[#08090D]`}
    style={{ background: AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length] }}
  >
    {member.image ? (
      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
    ) : (
      <span className="text-xl sm:text-2xl">{getInitials(member.name)}</span>
    )}
  </div>
);

export const TeamPage: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedMember(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const leadershipTeam: TeamMember[] = [
    {
      id: 'vishwanath-shetty',
      name: 'Mr. Vishwanath Shetty',
      roleCategory: 'Leadership',
      companyRole: 'Head of India Operations',
      location: 'Bangalore, India',
      bio: "Bringing extensive experience in strategic leadership and operational excellence to steer Noveris Bio's journey in India.",
    },
    {
      id: 'vikram-reddy',
      name: 'Dr. Vikram Reddy K',
      roleCategory: 'Leadership: Medical & Scientific Affairs',
      companyRole: 'Head of Medical Affairs & Scientific Operations',
      location: 'India',
      bio: 'Guiding our research and clinical practices with a commitment to scientific integrity and patient well-being.',
    },
    {
      id: 'raghavendra-ps',
      name: 'Mr. Raghavendra PS',
      roleCategory: 'Leadership: Sales, Marketing & P&L',
      companyRole: 'Head of Sales, Marketing, & P&L',
      location: 'India',
      bio: 'Pioneering market strategies and ensuring financial growth through robust sales and marketing initiatives.',
    },
    {
      id: 'yogishkumar',
      name: 'Mr. JM Yogishkumar',
      roleCategory: 'Leadership: Karnataka Sales',
      companyRole: 'Head of Sales, Karnataka',
      location: 'Karnataka, India',
      bio: 'Leading our initial market penetration efforts and building strong relationships within the Karnataka region.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F2EFE7] text-[#1B2A4D] font-sans selection:bg-[#C9973F] selection:text-[#F2EFE7] pt-12 sm:pt-16">
      {/* Hero band */}
      <div className="relative z-[2] pt-24 sm:pt-32 pb-16 sm:pb-20 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="hp-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#1B2A4D] leading-[1.05] tracking-tight">
                The people running <span className="text-[#C9973F]">Noveris Bio.</span>
              </h1>
              <p className="text-[#1B2A4D]/70 text-base sm:text-lg mt-6 max-w-2xl mx-auto font-light leading-relaxed">
                Strategic leaders, medical scientists, and operational experts driving biopharmaceutical
                innovation across India.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Roster */}
      <div className="relative z-[2] pb-24 sm:pb-32 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="border-t border-[#1B2A4D]/15">
            {leadershipTeam.map((member, i) => (
              <Reveal key={member.id} delay={i * 80}>
                <button
                  onClick={() => setSelectedMember(member)}
                  className="group w-full text-left border-b border-[#1B2A4D]/15 py-10 sm:py-12 transition-[padding] duration-300 hover:pl-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
                    <Avatar member={member} index={i} />

                    <div className="flex-1 min-w-0">
                      <span className="font-mono text-[10.5px] font-bold tracking-[.14em] uppercase text-[#C9973F]">
                        {member.roleCategory}
                      </span>
                      <h3 className="hp-display text-2xl sm:text-4xl font-bold text-[#1B2A4D] group-hover:text-[#C9973F] transition-colors mt-2">
                        {member.name}
                      </h3>
                      <p className="font-mono text-xs font-semibold text-[#C9973F] mt-2">{member.companyRole}</p>
                      <p className="text-[#1B2A4D]/70 text-sm sm:text-base mt-3 max-w-xl font-light leading-relaxed">
                        {member.bio}
                      </p>
                      <p className="font-mono text-[10.5px] text-[#1B2A4D]/60 mt-3 flex items-center gap-1.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#C9973F]" />
                        {member.location}
                      </p>
                    </div>

                    <div className="hidden sm:flex items-center gap-2 font-mono text-[10.5px] uppercase font-bold tracking-wider text-[#1B2A4D] group-hover:text-[#C9973F] shrink-0 self-start sm:self-center transition-colors">
                      Read Profile
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Detail Modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 bg-[#1B2A4D]/50 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-[#F2EFE7] border border-[#1B2A4D]/20 rounded-[28px] max-w-xl w-full p-8 sm:p-10 relative shadow-2xl text-[#1B2A4D]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#1B2A4D]/10 hover:bg-[#1B2A4D] text-[#1B2A4D] hover:text-[#F2EFE7] flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <Avatar member={selectedMember} index={leadershipTeam.findIndex((m) => m.id === selectedMember.id)} size="w-20 h-20" />

            <span className="font-mono text-[10.5px] font-bold tracking-[.14em] uppercase text-[#C9973F] block mt-6">
              {selectedMember.roleCategory}
            </span>
            <h3 className="hp-display text-2xl sm:text-3xl font-bold text-[#1B2A4D] mt-3">
              {selectedMember.name}
            </h3>
            <p className="font-mono text-xs font-semibold text-[#C9973F] mt-2">{selectedMember.companyRole}</p>
            <p className="font-mono text-[11px] text-[#1B2A4D]/60 flex items-center gap-1.5 mt-2 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#C9973F]" />
              {selectedMember.location}
            </p>

            <div className="h-px bg-[#1B2A4D]/15 my-7" />

            <h4 className="font-mono text-[10.5px] font-bold tracking-[.14em] uppercase text-[#C9973F] mb-3">
              Leadership &amp; Executive Summary
            </h4>
            <p className="text-[#1B2A4D]/75 text-sm sm:text-base leading-relaxed font-light">
              {selectedMember.bio}
            </p>


          </div>
        </div>
      )}

      {/* Footer */}
      <div className="relative z-[2]">
        <Footer />
      </div>
    </div>
  );
};