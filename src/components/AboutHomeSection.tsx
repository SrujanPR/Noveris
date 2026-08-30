import React from 'react';
import { MissionSection } from './MissionSection';
import { TherapeuticPillars } from './TherapeuticPillars';
import { Pipeline } from './Pipeline';
import { ProductPortfolio } from './ProductPortfolio';

// Kept as AboutHomeSection so WhiteContentSection.tsx needs no changes —
// this now composes the redesigned content stack instead of holding it
// directly. See MissionSection / TherapeuticPillars / Pipeline /
// ProductPortfolio for the actual sections.
export const AboutHomeSection: React.FC = () => {
  return (
    <>
      <MissionSection />
      <TherapeuticPillars />
      <Pipeline />
      <ProductPortfolio />
    </>
  );
};
