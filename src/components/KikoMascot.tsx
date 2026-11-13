import React from 'react';
import { IMAGE_ASSETS } from '../data/learningData';
import { SafeImage } from './ItemIllustration';

interface KikoMascotProps {
  message: string;
  mood?: 'happy' | 'encourage' | 'celebrate';
}

export const KikoMascot: React.FC<KikoMascotProps> = ({ message, mood = 'happy' }) => {
  const bubbleStyle =
    mood === 'celebrate'
      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
      : mood === 'encourage'
        ? 'bg-amber-50 border-amber-300 text-amber-950'
        : 'bg-sky-50 border-sky-200 text-slate-800';

  return (
    <div className="flex items-center gap-4">
      <div
        className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-amber-400 bg-amber-50 shadow-sm ${
          mood === 'celebrate' ? 'animate-gentle-bounce' : ''
        }`}
      >
        <SafeImage
          src={IMAGE_ASSETS.mascot}
          alt="Kiko Pemandu Belajar"
          className="w-full h-full object-cover"
          fallbackLabel="Kiko"
        />
      </div>
      <div className={`flex-1 rounded-2xl border px-4 py-3 ${bubbleStyle}`}>
        <p className="text-xs font-bold text-slate-600 mb-0.5">Kiko Pemandu</p>
        <p className="text-base font-medium leading-snug">{message}</p>
      </div>
    </div>
  );
};
