import React from 'react';
import { Link } from 'react-router-dom';

interface ProductItem {
  num: string;
  id: string;
  name: string;
  description: string;
}

const PEDIATRIC_PRODUCTS: ProductItem[] = [
  {
    num: '01',
    id: 'tetsu-kidz',
    name: 'TETSU-KIDZ',
    description: 'Specialized pediatric bio-nutritional formulation.',
  },
  {
    num: '02',
    id: 'calmezy',
    name: 'CALMEZY',
    description: 'Precision pediatric therapeutic care.',
  },
];

const GYN_PRODUCTS: ProductItem[] = [
  {
    num: '01',
    id: 'maternova',
    name: 'MATERNOVA',
    description: 'Comprehensive maternal wellness & prenatal formulation.',
  },
  {
    num: '02',
    id: 'konceev-f',
    name: 'KONCEEV-F',
    description: 'Advanced female reproductive science & fertility support.',
  },
  {
    num: '03',
    id: 'konceev-m',
    name: 'KONCEEV-M',
    description: 'Targeted male fertility & cellular vitality formulation.',
  },
  {
    num: '04',
    id: 'novolact-on',
    name: 'NOVOLACT-ON',
    description: 'Bio-active lactation & maternal wellness solution.',
  },
  {
    num: '05',
    id: 'klin-ova',
    name: 'KLIN-OVA',
    description: 'Ovarian health & follicular rejuvenation technology.',
  },
  {
    num: '06',
    id: 'tetsu-mom',
    name: 'TETSU-MOM',
    description: 'Maternal micronutrient & hemoglobin support.',
  },
];

export const ProductPortfolio: React.FC = () => {
  return (
    <section id="products" className="bg-[#F2EFE7] text-[#1B2A4D] py-20 sm:py-28 px-6 sm:px-12 lg:px-20 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Top Header Row */}
        <div className="pb-12">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1B2A4D] tracking-tight">
            Every product, on the record.
          </h2>
        </div>

        {/* 2-Column Product List Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mt-8">
          {/* Left Column: Pediatrics */}
          <div>
            <span className="font-mono text-[11px] font-bold tracking-[.16em] uppercase text-[#C9973F] border-b border-[#1B2A4D]/15 pb-3 mb-2 block">
              PEDIATRICS | 2 FORMULATIONS
            </span>

            <div>
              {PEDIATRIC_PRODUCTS.map((p) => (
                <Link
                  key={p.id}
                  to={`/products/${p.id}`}
                  className="border-b border-[#1B2A4D]/10 py-5 flex items-start gap-4 hover:pl-2 transition-[padding] duration-300 group"
                >
                  <span className="font-mono text-xs font-bold text-[#7C8AA0]/70 pt-1 w-6 shrink-0">
                    {p.num}
                  </span>
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wider text-[#1B2A4D] group-hover:text-[#C9973F] transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-sm text-[#7C8AA0] font-light mt-1">
                      {p.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column: Gynecology & Infertility */}
          <div>
            <span className="font-mono text-[11px] font-bold tracking-[.16em] uppercase text-[#C9973F] border-b border-[#1B2A4D]/15 pb-3 mb-2 block">
              GYNECOLOGY &amp; INFERTILITY | 6 FORMULATIONS
            </span>

            <div>
              {GYN_PRODUCTS.map((p) => (
                <Link
                  key={p.id}
                  to={`/products/${p.id}`}
                  className="border-b border-[#1B2A4D]/10 py-5 flex items-start gap-4 hover:pl-2 transition-[padding] duration-300 group"
                >
                  <span className="font-mono text-xs font-bold text-[#7C8AA0]/70 pt-1 w-6 shrink-0">
                    {p.num}
                  </span>
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wider text-[#1B2A4D] group-hover:text-[#C9973F] transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-sm text-[#7C8AA0] font-light mt-1">
                      {p.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
