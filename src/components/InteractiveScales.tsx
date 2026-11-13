import React, { useState } from 'react';
import { EVERYDAY_ITEMS } from '../data/learningData';
import { ItemKey } from '../types';
import { playClickSound } from '../utils/sound';
import { ItemIllustration } from './ItemIllustration';

interface BalanceScaleProps {
  leftItem: ItemKey;
  leftLabel: string;
  leftGrams: number;
  rightItem: ItemKey;
  rightLabel: string;
  rightGrams: number;
  celebrating?: boolean;
}

export const BalanceScaleVisual: React.FC<BalanceScaleProps> = ({
  leftItem,
  leftLabel,
  leftGrams,
  rightItem,
  rightLabel,
  rightGrams,
  celebrating = false,
}) => {
  // Positive angle tilts right pan down (right heavier), negative tilts left pan down (left heavier)
  let angle = 0;
  if (leftGrams > rightGrams) angle = -11;
  else if (rightGrams > leftGrams) angle = 11;

  // Vertical displacement in px for pans
  const leftOffset = angle < 0 ? 22 : angle > 0 ? -22 : 0;
  const rightOffset = -leftOffset;

  return (
    <div
      className={`relative w-full max-w-xl mx-auto select-none ${
        celebrating ? 'animate-pop-celebrate' : ''
      }`}
    >
      <div className="relative bg-gradient-to-b from-sky-50 to-white border border-sky-200 rounded-2xl p-6 overflow-hidden">
        <div className="grid grid-cols-2 gap-4 items-end mb-2 min-h-[160px]">
          {/* Left Pan */}
          <div
            className="flex flex-col items-center transition-transform duration-500 ease-out"
            style={{ transform: `translateY(${leftOffset}px)` }}
          >
            <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm flex flex-col items-center">
              <ItemIllustration item={leftItem} className="w-20 h-20" />
              <span className="mt-1 text-base font-bold text-slate-900">{leftLabel}</span>
            </div>
            <div className="w-28 h-3 bg-amber-400 border-2 border-amber-600 rounded-b-full mt-1" />
          </div>

          {/* Right Pan */}
          <div
            className="flex flex-col items-center transition-transform duration-500 ease-out"
            style={{ transform: `translateY(${rightOffset}px)` }}
          >
            <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm flex flex-col items-center">
              <ItemIllustration item={rightItem} className="w-20 h-20" />
              <span className="mt-1 text-base font-bold text-slate-900">{rightLabel}</span>
            </div>
            <div className="w-28 h-3 bg-amber-400 border-2 border-amber-600 rounded-b-full mt-1" />
          </div>
        </div>

        {/* Balance Beam & Stand */}
        <div className="relative flex flex-col items-center mt-2">
          <div
            className="w-4/5 h-3.5 bg-sky-600 rounded-full border-2 border-sky-800 transition-transform duration-500 ease-out origin-center"
            style={{ transform: `rotate(${angle}deg)` }}
          />
          <div className="w-5 h-5 -mt-4 rounded-full bg-amber-400 border-2 border-amber-700 z-10" />
          <div className="w-4 h-12 bg-sky-700" />
          <div className="w-36 h-4 bg-sky-800 rounded-t-lg" />
        </div>
      </div>
    </div>
  );
};

interface SandboxScaleProps {
  soundEnabled: boolean;
}

export const InteractiveSandboxScale: React.FC<SandboxScaleProps> = ({ soundEnabled }) => {
  const [selectedItem, setSelectedItem] = useState(EVERYDAY_ITEMS[0]);
  const [mode, setMode] = useState<'digital' | 'analog'>('digital');

  // Analog needle angle: 0g -> -120deg, 5000g -> +120deg
  const needleAngle = -120 + Math.min(selectedItem.weightInGrams / 5000, 1) * 240;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            Coba Timbangan Sendiri!
          </h3>
          <p className="text-sm text-slate-600">
            Pilih salah satu benda di bawah untuk melihat beratnya pada timbangan digital atau jarum.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => {
              playClickSound(soundEnabled);
              setMode('digital');
            }}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              mode === 'digital'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            Timbangan Digital
          </button>
          <button
            type="button"
            onClick={() => {
              playClickSound(soundEnabled);
              setMode('analog');
            }}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              mode === 'analog'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            Timbangan Jarum
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Item Picker */}
        <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {EVERYDAY_ITEMS.map((item) => {
            const active = selectedItem.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  playClickSound(soundEnabled);
                  setSelectedItem(item);
                }}
                className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all cursor-pointer ${
                  active
                    ? 'border-sky-600 bg-sky-50 shadow-sm scale-[1.02]'
                    : 'border-slate-200 bg-slate-50 hover:border-sky-300 hover:bg-white'
                }`}
              >
                <ItemIllustration item={item.id} className="w-14 h-14" />
                <span className="mt-1 text-sm font-bold text-slate-900">{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Scale Display */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center bg-sky-50/70 border border-sky-200 rounded-2xl p-6">
          <div className="flex flex-col items-center mb-2">
            <ItemIllustration item={selectedItem.id} className="w-24 h-24 animate-gentle-bounce" />
            <div className="w-40 h-3 bg-slate-300 rounded-t-lg border border-slate-400" />
          </div>

          {mode === 'digital' ? (
            <div className="w-full max-w-xs bg-sky-600 rounded-2xl p-4 border-2 border-sky-800 shadow-sm text-center">
              <div className="bg-emerald-950 text-emerald-300 rounded-xl px-4 py-3 font-mono tabular-nums border-2 border-sky-900">
                <div className="text-3xl font-bold tracking-tight">
                  {selectedItem.weightInGrams.toLocaleString('id-ID')} g
                </div>
                <div className="text-sm text-emerald-400 mt-0.5">
                  atau {(selectedItem.weightInGrams / 1000).toLocaleString('id-ID')} kg
                </div>
              </div>
              <p className="text-xs font-semibold text-sky-100 mt-2">
                Layar Timbangan Digital
              </p>
            </div>
          ) : (
            <div className="w-full max-w-xs bg-amber-400 rounded-2xl p-4 border-2 border-amber-600 shadow-sm flex flex-col items-center">
              <div className="relative w-40 h-40 rounded-full bg-white border-4 border-slate-700 flex items-center justify-center">
                <span className="absolute top-2 text-xs font-bold text-slate-700">2,5 kg</span>
                <span className="absolute bottom-3 left-4 text-xs font-bold text-slate-700">0 kg</span>
                <span className="absolute bottom-3 right-4 text-xs font-bold text-slate-700">5 kg</span>
                {/* Needle */}
                <div
                  className="w-1.5 h-16 bg-red-600 rounded-full origin-bottom transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateY(-28px) rotate(${needleAngle}deg)`,
                  }}
                />
                <div className="absolute w-4 h-4 rounded-full bg-slate-800" />
              </div>
              <p className="text-sm font-bold text-slate-900 mt-2 font-mono tabular-nums">
                Jarum menunjuk: {selectedItem.sampleWeightLabel}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
