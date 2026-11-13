import React, { useState } from 'react';
import { ItemKey } from '../types';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fallbackLabel,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 via-amber-50 to-emerald-100 text-slate-700 p-4 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <svg className="w-12 h-12 text-sky-600 mb-2" viewBox="0 0 64 64" fill="none">
          <rect x="12" y="34" width="40" height="20" rx="6" fill="#0284C7" />
          <rect x="22" y="40" width="20" height="8" rx="2" fill="#E0F2FE" />
          <path d="M22 34V24H42V34" stroke="#0369A1" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="32" cy="20" rx="22" ry="6" fill="#FACC15" stroke="#CA8A04" strokeWidth="2.5" />
        </svg>
        <span className="text-sm font-semibold text-slate-700">{fallbackLabel || alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};

interface ItemIllustrationProps {
  item: ItemKey;
  className?: string;
}

export const ItemIllustration: React.FC<ItemIllustrationProps> = ({
  item,
  className = 'w-20 h-20',
}) => {
  switch (item) {
    case 'beras':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-label="Karung Beras">
          <path
            d="M28 24 C32 16, 40 16, 44 22 C48 16, 56 16, 60 24 L68 34 C74 44, 76 66, 70 78 C66 84, 30 84, 26 78 C20 66, 22 44, 28 34 Z"
            fill="#F3E5AB"
            stroke="#926239"
            strokeWidth="3"
          />
          <path d="M32 30 Q48 36 64 30" fill="none" stroke="#B45309" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="48" cy="54" r="14" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
          <ellipse cx="44" cy="52" rx="3" ry="5" fill="#FFFFFF" stroke="#B45309" strokeWidth="1.2" transform="rotate(-15 44 52)" />
          <ellipse cx="52" cy="54" rx="3" ry="5" fill="#FFFFFF" stroke="#B45309" strokeWidth="1.2" transform="rotate(20 52 54)" />
          <ellipse cx="48" cy="59" rx="3" ry="5" fill="#FFFFFF" stroke="#B45309" strokeWidth="1.2" transform="rotate(55 48 59)" />
          <text x="48" y="75" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#78350F">BERAS</text>
        </svg>
      );
    case 'gula':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-label="Bungkus Gula">
          <rect x="24" y="20" width="48" height="62" rx="10" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3" />
          <rect x="24" y="20" width="48" height="14" rx="5" fill="#38BDF8" stroke="#0284C7" strokeWidth="3" />
          <circle cx="48" cy="54" r="13" fill="#FFFFFF" stroke="#0369A1" strokeWidth="2" />
          <text x="48" y="58" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369A1">GULA</text>
          <rect x="35" y="71" width="26" height="4" rx="2" fill="#7DD3FC" />
        </svg>
      );
    case 'apel':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-label="Buah Apel">
          <path d="M48 26 Q50 14 58 12" fill="none" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
          <path d="M49 22 Q64 10 68 24 Q58 30 49 22 Z" fill="#22C55E" stroke="#15803D" strokeWidth="2.5" />
          <path
            d="M48 30 C32 24, 18 36, 20 54 C22 72, 36 82, 46 79 C48 78, 48 78, 50 79 C60 82, 74 72, 76 54 C78 36, 64 24, 48 30 Z"
            fill="#EF4444"
            stroke="#B91C1C"
            strokeWidth="3"
          />
          <ellipse cx="34" cy="44" rx="5" ry="9" fill="#FCA5A5" opacity="0.65" transform="rotate(-20 34 44)" />
        </svg>
      );
    case 'semangka':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-label="Buah Semangka">
          <path d="M48 18 Q48 10 56 10" fill="none" stroke="#15803D" strokeWidth="4" strokeLinecap="round" />
          <circle cx="48" cy="52" r="32" fill="#22C55E" stroke="#14532D" strokeWidth="3" />
          <path d="M35 23 Q26 52 35 81" fill="none" stroke="#14532D" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M48 20 Q44 52 48 84" fill="none" stroke="#14532D" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M61 23 Q70 52 61 81" fill="none" stroke="#14532D" strokeWidth="4.5" strokeLinecap="round" />
          <ellipse cx="38" cy="36" rx="6" ry="4" fill="#86EFAC" opacity="0.5" transform="rotate(-25 38 36)" />
        </svg>
      );
    case 'tepung':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-label="Kemasan Tepung">
          <path d="M26 22 L70 22 L74 80 L22 80 Z" fill="#FFFBEB" stroke="#D97706" strokeWidth="3" strokeLinejoin="round" />
          <rect x="26" y="22" width="44" height="10" fill="#FDE68A" stroke="#D97706" strokeWidth="2.5" />
          <circle cx="48" cy="54" r="14" fill="#FEF3C7" stroke="#B45309" strokeWidth="2" />
          <text x="48" y="57" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#92400E">TEPUNG</text>
        </svg>
      );
    case 'buku':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-label="Buku Pelajaran">
          <rect x="22" y="18" width="52" height="62" rx="6" fill="#0284C7" stroke="#075985" strokeWidth="3" />
          <rect x="22" y="18" width="11" height="62" rx="3" fill="#0369A1" stroke="#075985" strokeWidth="3" />
          <rect x="40" y="30" width="26" height="16" rx="3" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
          <line x1="42" y1="56" x2="64" y2="56" stroke="#BAE6FD" strokeWidth="3" strokeLinecap="round" />
          <line x1="42" y1="64" x2="58" y2="64" stroke="#BAE6FD" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'cokelat':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-label="Batang Cokelat">
          <rect x="24" y="16" width="48" height="64" rx="6" fill="#78350F" stroke="#451A03" strokeWidth="3" />
          <rect x="30" y="22" width="16" height="12" rx="2" fill="#92400E" />
          <rect x="50" y="22" width="16" height="12" rx="2" fill="#92400E" />
          <rect x="30" y="38" width="16" height="12" rx="2" fill="#92400E" />
          <rect x="50" y="38" width="16" height="12" rx="2" fill="#92400E" />
          <path d="M22 48 L74 44 L74 80 Q74 82 70 82 L26 82 Q22 82 22 78 Z" fill="#F97316" stroke="#C2410C" strokeWidth="3" />
          <text x="48" y="69" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#FFFFFF">COKELAT</text>
        </svg>
      );
    case 'jeruk':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-label="Buah Jeruk">
          <path d="M48 24 Q50 14 55 12" fill="none" stroke="#15803D" strokeWidth="4" strokeLinecap="round" />
          <path d="M50 21 Q64 13 65 25 Q56 29 50 21 Z" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
          <circle cx="48" cy="53" r="27" fill="#FB923C" stroke="#C2410C" strokeWidth="3" />
          <circle cx="38" cy="43" r="2" fill="#FDBA74" />
          <circle cx="33" cy="50" r="2" fill="#FDBA74" />
          <circle cx="42" cy="49" r="1.8" fill="#FDBA74" />
        </svg>
      );
    case 'mangga':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-label="Buah Mangga">
          <path d="M50 20 Q52 12 58 12" fill="none" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M51 19 Q66 13 66 25 Q58 28 51 19 Z" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
          <path
            d="M48 22 C68 22, 74 42, 68 62 C62 78, 42 84, 30 76 C20 68, 22 46, 32 32 C38 24, 42 22, 48 22 Z"
            fill="#FACC15"
            stroke="#CA8A04"
            strokeWidth="3"
          />
          <ellipse cx="40" cy="40" rx="5" ry="9" fill="#FEF08A" opacity="0.7" transform="rotate(15 40 40)" />
        </svg>
      );
    case 'wortel':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-label="Wortel">
          <path d="M48 26 Q38 10 32 16 Q42 24 48 26 Z" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
          <path d="M48 26 Q48 8 54 12 Q52 22 48 26 Z" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
          <path d="M48 26 Q60 12 64 20 Q56 26 48 26 Z" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
          <path
            d="M34 32 C34 25, 62 25, 62 32 L51 80 C50 84, 46 84, 45 80 Z"
            fill="#F97316"
            stroke="#C2410C"
            strokeWidth="3"
          />
          <line x1="40" y1="42" x2="49" y2="42" stroke="#C2410C" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="46" y1="56" x2="54" y2="56" stroke="#C2410C" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'kentang':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-label="Kentang">
          <path
            d="M24 52 C20 34, 38 24, 56 28 C72 32, 78 48, 72 64 C66 78, 42 80, 30 72 C24 68, 25 60, 24 52 Z"
            fill="#D6A86E"
            stroke="#854D0E"
            strokeWidth="3"
          />
          <circle cx="40" cy="44" r="2.2" fill="#854D0E" />
          <circle cx="58" cy="58" r="2.2" fill="#854D0E" />
          <circle cx="48" cy="64" r="1.8" fill="#854D0E" />
        </svg>
      );
  }
};
