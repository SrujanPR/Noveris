import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** stagger delay in ms, useful when mapping over a list of cards */
  delay?: number;
}

/**
 * Fades content up into place the first time it enters the viewport.
 * Mirrors the .reveal / .reveal-stagger behavior from the homepage concept
 * prototype (IntersectionObserver, one-shot, translateY(28px) -> 0).
 */
export const Reveal: React.FC<RevealProps> = ({ children, className = '', delay = 0 }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity .8s cubic-bezier(.22,.8,.32,1) ${delay}ms, transform .8s cubic-bezier(.22,.8,.32,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};