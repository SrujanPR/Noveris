import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '../components/Footer';
import { TetsuKidzDetailPage } from './TetsuKidzDetailPage';
import { CalmEzyDetailPage } from './CalmEzyDetailPage';
import { KonceevFDetailPage } from './KonceevFDetailPage';
import { KonceevMDetailPage } from './KonceevMDetailPage';
import { MaternovaDetailPage } from './MaternovaDetailPage';
import { NovolactOnDetailPage } from './NovolactOnDetailPage';
import { KlinOvaDetailPage } from './KlinOvaDetailPage';
import { TetsuMomDetailPage } from './TetsuMomDetailPage';

export const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  // If user selected TETSU-KIDZ, render the complete, high-fidelity tetsu.html page
  if (productId?.toLowerCase() === 'tetsu-kidz') {
    return <TetsuKidzDetailPage />;
  }

  // If user selected CALMEZY, render the complete, high-fidelity calmezy.html page
  if (productId?.toLowerCase() === 'calmezy' || productId?.toLowerCase() === 'calm-ezy') {
    return <CalmEzyDetailPage />;
  }

  // If user selected KONCEEV-F, render the Konceev-F detail page
  if (productId?.toLowerCase() === 'konceev-f' || productId?.toLowerCase() === 'konceevf' || productId?.toLowerCase() === 'konceev-female') {
    return <KonceevFDetailPage />;
  }

  // If user selected KONCEEV-M, render the Konceev-M detail page
  if (productId?.toLowerCase() === 'konceev-m' || productId?.toLowerCase() === 'konceevm' || productId?.toLowerCase() === 'konceev-male') {
    return <KonceevMDetailPage />;
  }

  // If user selected MATERNOVA, render the Maternova detail page
  // If user selected NOVOLACT-ON, render the Novolact-ON detail page
  // If user selected KLIN-OVA, render the Klin-Ova detail page
  if (productId?.toLowerCase() === 'klin-ova' || productId?.toLowerCase() === 'klinova') {
    return <KlinOvaDetailPage />;
  }

  if (productId?.toLowerCase() === 'novolact-on' || productId?.toLowerCase() === 'novolacton') {
    return <NovolactOnDetailPage />;
  }

  if (productId?.toLowerCase() === 'tetsu-mom' || productId?.toLowerCase() === 'tetsumom') {
    return <TetsuMomDetailPage />;
  }

  if (productId?.toLowerCase() === 'maternova') {
    return <MaternovaDetailPage />;
  }

  // Format productId for other product detail placeholders
  const productTitle = productId ? productId.toUpperCase() : 'PRODUCT DETAIL';

  return (
    <div className="min-h-screen bg-[#F2EFE7] text-[#1B2A4D] font-sans selection:bg-[#C9973F] selection:text-[#F2EFE7]">
      {/* Top Banner Header */}
      <div className="bg-[#1B2A4D] text-[#F2EFE7] pt-32 sm:pt-36 pb-16 px-6 sm:px-12 border-b border-[#C9973F]/30 w-full relative">
        <div className="max-w-7xl mx-auto space-y-4">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#C9973F] hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>

          <div className="text-center flex flex-col items-center justify-center space-y-3 pt-2">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#C9973F] block">
              SPECIALTY BIOPHARMACEUTICAL FORMULATION
            </span>
            <h1 className="font-sans text-4xl sm:text-6xl font-extrabold tracking-tight text-[#F2EFE7]">
              {productTitle}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content Area: Blank Placeholder Container */}
      <div className="max-w-7xl mx-auto py-20 px-6 sm:px-12 min-h-[400px]">
        <div className="p-12 rounded-3xl bg-[#1B2A4D] text-[#F2EFE7] border border-[#C9973F]/30 shadow-xl space-y-8 min-h-[350px] flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full bg-[#08090D] border-2 border-dashed border-[#C9973F]/40 flex items-center justify-center text-[#C9973F] font-mono text-xs">
            R&amp;D
          </div>
          <div className="space-y-2 max-w-lg">
            <h2 className="font-sans text-2xl font-bold text-[#F2EFE7]">
              {productTitle} Formulations &amp; Data
            </h2>
            <p className="text-[#7C8AA0] font-mono text-xs">
              Detailed clinical information, dosage parameters, and scientific documentation will be published here soon.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
