import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Minus,
  Plus,
  RotateCcw,
  ShoppingBasket,
  Sparkles,
  XCircle,
} from 'lucide-react';
import { IMAGE_ASSETS, PASAR_ITEMS, PASAR_MISSIONS } from '../../data/learningData';
import { ItemKey } from '../../types';
import { playClickSound, playCorrectSound, playVictorySound, playWrongSound } from '../../utils/sound';
import { ItemIllustration, SafeImage } from '../ItemIllustration';
import { KikoMascot } from '../KikoMascot';

interface PasarCeriaGameProps {
  soundEnabled: boolean;
  onComplete: (score: number, correct: number, wrong: number) => void;
  onBack: () => void;
}

export const PasarCeriaGame: React.FC<PasarCeriaGameProps> = ({
  soundEnabled,
  onComplete,
  onBack,
}) => {
  const [missionIdx, setMissionIdx] = useState(0);
  const [basketCounts, setBasketCounts] = useState<Partial<Record<ItemKey, number>>>({});
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [hadWrongThisRound, setHadWrongThisRound] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const mission = PASAR_MISSIONS[missionIdx];

  const handleSinglePick = (itemId: ItemKey) => {
    if (status === 'correct' || mission.type !== 'single-item') return;

    if (mission.validItemIds.includes(itemId)) {
      playCorrectSound(soundEnabled);
      setStatus('correct');
      if (!hadWrongThisRound) {
        setScore((s) => s + 10);
        setCorrectCount((c) => c + 1);
      }
    } else {
      playWrongSound(soundEnabled);
      setStatus('wrong');
      if (!hadWrongThisRound) {
        setHadWrongThisRound(true);
        setWrongCount((w) => w + 1);
      }
    }
  };

  const updateBasket = (itemId: ItemKey, delta: number) => {
    if (status === 'correct') return;
    playClickSound(soundEnabled);
    setBasketCounts((prev) => {
      const nextVal = Math.max(0, (prev[itemId] || 0) + delta);
      return { ...prev, [itemId]: nextVal };
    });
  };

  const checkMultiBasket = () => {
    if (status === 'correct' || mission.type !== 'multi-unit') return;
    const targetId = mission.targetItemId!;
    const targetQty = mission.targetQuantity!;
    const otherTotal = Object.entries(basketCounts).reduce(
      (sum, [k, v]) => (k === targetId ? sum : sum + (v || 0)),
      0
    );

    if ((basketCounts[targetId] || 0) === targetQty && otherTotal === 0) {
      playCorrectSound(soundEnabled);
      setStatus('correct');
      if (!hadWrongThisRound) {
        setScore((s) => s + 10);
        setCorrectCount((c) => c + 1);
      }
    } else {
      playWrongSound(soundEnabled);
      setStatus('wrong');
      if (!hadWrongThisRound) {
        setHadWrongThisRound(true);
        setWrongCount((w) => w + 1);
      }
    }
  };

  const handleNext = () => {
    playClickSound(soundEnabled);
    if (missionIdx + 1 < PASAR_MISSIONS.length) {
      setMissionIdx((i) => i + 1);
      setBasketCounts({});
      setStatus('idle');
      setHadWrongThisRound(false);
    } else {
      playVictorySound(soundEnabled);
      setFinished(true);
      onComplete(score, correctCount, wrongCount);
    }
  };

  const handleRestart = () => {
    playClickSound(soundEnabled);
    setMissionIdx(0);
    setBasketCounts({});
    setStatus('idle');
    setHadWrongThisRound(false);
    setScore(0);
    setCorrectCount(0);
    setWrongCount(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-6 animate-pop-celebrate">
        <Sparkles className="w-14 h-14 text-amber-500 mx-auto" />
        <div>
          <p className="text-sm font-bold text-emerald-700">Belanja Selesai</p>
          <h3 className="text-3xl font-extrabold text-slate-900 mt-1">
            Wah, Kamu Pembeli yang Pintar di Pasar Ceria!
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4">
            <p className="text-xs font-bold text-sky-800">Skor</p>
            <p className="text-2xl font-extrabold font-mono text-slate-900">{score}</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
            <p className="text-xs font-bold text-emerald-800">Benar</p>
            <p className="text-2xl font-extrabold font-mono text-emerald-700">{correctCount}</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <p className="text-xs font-bold text-slate-700">Salah</p>
            <p className="text-2xl font-extrabold font-mono text-slate-800">{wrongCount}</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-orange-500 text-white hover:bg-orange-600 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            Ulangi Permainan
          </button>
          <button
            type="button"
            onClick={() => {
              playClickSound(soundEnabled);
              onBack();
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-slate-100 text-slate-800 hover:bg-slate-200 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            Menu Permainan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl px-5 py-4">
        <button
          type="button"
          onClick={() => {
            playClickSound(soundEnabled);
            onBack();
          }}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-700 hover:text-sky-700 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Permainan
        </button>

        <div className="flex items-center gap-4 text-sm font-bold text-slate-700 font-mono tabular-nums">
          <span>
            Misi {missionIdx + 1} / {PASAR_MISSIONS.length}
          </span>
          <span aria-hidden="true">·</span>
          <span className="text-orange-600">Skor: {score}</span>
        </div>

        <button
          type="button"
          onClick={handleRestart}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-sky-700 hover:text-sky-900 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Ulangi
        </button>
      </div>

      {/* Market Banner & Mission Card */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden">
        <div className="relative h-44 sm:h-52 w-full">
          <SafeImage
            src={IMAGE_ASSETS.market}
            alt="Toko Buah dan Sayuran Pasar Ceria"
            className="w-full h-full object-cover"
            fallbackLabel="Pasar Ceria"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/35 to-transparent flex items-end p-5 sm:p-6">
            <div>
              <p className="text-xs sm:text-sm font-bold text-amber-300">
                Misi Belanja {missionIdx + 1} dari {PASAR_MISSIONS.length}
              </p>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
                {mission.instruction}
              </h3>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <KikoMascot
            message={
              status === 'correct'
                ? mission.explanation
                : status === 'wrong'
                  ? 'Hmm, belum sesuai misi nih! Coba perhatikan lagi berat tiap buah dan sayur di rak toko.'
                  : mission.type === 'multi-unit'
                    ? 'Tambahkan jumlah barang yang diminta ke keranjang belanjamu, lalu tekan tombol Cek Belanja!'
                    : 'Klik salah satu buah atau sayur di toko yang sesuai dengan misi belanjamu!'
            }
            mood={
              status === 'correct'
                ? 'celebrate'
                : status === 'wrong'
                  ? 'encourage'
                  : 'happy'
            }
          />

          {/* Store Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {PASAR_ITEMS.map((item) => {
              const qty = basketCounts[item.id] || 0;
              const isValidWinner = status === 'correct' && mission.validItemIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border-2 p-4 flex flex-col items-center justify-between text-center transition-all ${
                    isValidWinner
                      ? 'bg-emerald-50 border-emerald-500 animate-pop-celebrate'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <ItemIllustration item={item.id} className="w-20 h-20" />
                  <div className="mt-2">
                    <h4 className="text-lg font-extrabold text-slate-900">{item.name}</h4>
                    <p className="text-base font-bold text-sky-700 font-mono">{item.unitLabel}</p>
                    <p className="text-xs text-slate-500">per {item.priceLabel}</p>
                  </div>

                  {mission.type === 'single-item' ? (
                    <button
                      type="button"
                      disabled={status === 'correct'}
                      onClick={() => handleSinglePick(item.id)}
                      className="mt-3 w-full py-2 px-3 rounded-xl font-bold text-sm bg-orange-500 hover:bg-orange-600 text-white transition-colors cursor-pointer disabled:opacity-50"
                    >
                      Pilih Ini
                    </button>
                  ) : (
                    <div className="mt-3 flex items-center justify-center gap-2">
                      <button
                        type="button"
                        aria-label={`Kurangi ${item.name}`}
                        disabled={status === 'correct' || qty === 0}
                        onClick={() => updateBasket(item.id, -1)}
                        className="w-9 h-9 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-slate-800 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-7 text-center font-extrabold font-mono text-lg text-slate-900">
                        {qty}
                      </span>
                      <button
                        type="button"
                        aria-label={`Tambah ${item.name}`}
                        disabled={status === 'correct'}
                        onClick={() => updateBasket(item.id, 1)}
                        className="w-9 h-9 rounded-lg bg-sky-600 text-white flex items-center justify-center hover:bg-sky-700 disabled:opacity-40 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Multi-unit Basket Check */}
          {mission.type === 'multi-unit' && status !== 'correct' && (
            <div className="flex flex-wrap items-center justify-between gap-4 bg-sky-50 border border-sky-200 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <ShoppingBasket className="w-6 h-6 text-sky-700 shrink-0" />
                <span className="text-base font-bold text-slate-800">
                  Isi Keranjang:{' '}
                  {Object.entries(basketCounts).some(([, v]) => (v || 0) > 0)
                    ? Object.entries(basketCounts)
                        .filter(([, v]) => (v || 0) > 0)
                        .map(([k, v]) => `${v} ${k}`)
                        .join(', ')
                    : 'Masih kosong'}
                </span>
              </div>

              <button
                type="button"
                onClick={checkMultiBasket}
                className="px-6 py-3 rounded-xl font-extrabold text-white bg-orange-500 hover:bg-orange-600 transition-colors cursor-pointer"
              >
                Bayar & Cek Belanja
              </button>
            </div>
          )}

          {status === 'wrong' && (
            <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 font-bold text-amber-950 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-500 shrink-0" />
              <span>Belum tepat, ayo periksa lagi berat barang yang diminta!</span>
            </div>
          )}

          {status === 'correct' && (
            <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 animate-pop-celebrate">
              <div className="flex items-center gap-2.5 text-emerald-950 font-bold text-base">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <span>{mission.explanation}</span>
              </div>
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 rounded-xl font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors cursor-pointer shrink-0"
              >
                {missionIdx + 1 < PASAR_MISSIONS.length
                  ? 'Misi Berikutnya →'
                  : 'Selesai Belanja'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
