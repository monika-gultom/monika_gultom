import React, { useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { KG_TO_GRAM_EXAMPLES } from '../../data/learningData';
import { playClickSound, playCorrectSound, playVictorySound, playWrongSound } from '../../utils/sound';
import { KikoMascot } from '../KikoMascot';

interface PasangkanGameProps {
  soundEnabled: boolean;
  onComplete: (score: number, correct: number, wrong: number) => void;
  onBack: () => void;
}

const GRAM_ORDER = [3000, 1000, 5000, 2000, 4000];

export const PasangkanGame: React.FC<PasangkanGameProps> = ({
  soundEnabled,
  onComplete,
  onBack,
}) => {
  const [selectedKg, setSelectedKg] = useState<number | null>(null);
  const [matchedKgs, setMatchedKgs] = useState<number[]>([]);
  const [failedKgs, setFailedKgs] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<{ type: 'idle' | 'ok' | 'err'; text: string }>({
    type: 'idle',
    text: 'Seret kartu Kilogram (kiri) ke kartu Gram (kanan) yang sama beratnya, atau klik dua kartu yang cocok!',
  });
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [dragOverGram, setDragOverGram] = useState<number | null>(null);

  const rightCards = useMemo(
    () =>
      GRAM_ORDER.map((g) => ({
        gram: g,
        kgMatch: g / 1000,
        label: `${g.toLocaleString('id-ID')} gram`,
      })),
    []
  );

  const tryMatch = (kgValue: number, gramValue: number) => {
    if (matchedKgs.includes(kgValue) || matchedKgs.includes(gramValue / 1000)) return;

    if (kgValue * 1000 === gramValue) {
      playCorrectSound(soundEnabled);
      const nextMatched = [...matchedKgs, kgValue];
      setMatchedKgs(nextMatched);
      setSelectedKg(null);

      const firstTry = !failedKgs.includes(kgValue);
      const nextScore = firstTry ? score + 10 : score;
      const nextCorrect = firstTry ? correctCount + 1 : correctCount;

      if (firstTry) {
        setScore(nextScore);
        setCorrectCount(nextCorrect);
      }

      setFeedback({
        type: 'ok',
        text: `Hore! ${kgValue} kg memang sama dengan ${gramValue.toLocaleString('id-ID')} gram!`,
      });

      if (nextMatched.length === KG_TO_GRAM_EXAMPLES.length) {
        playVictorySound(soundEnabled);
        onComplete(nextScore, nextCorrect, wrongCount);
      }
    } else {
      playWrongSound(soundEnabled);
      if (!failedKgs.includes(kgValue)) {
        setFailedKgs((prev) => [...prev, kgValue]);
        setWrongCount((w) => w + 1);
      }
      setSelectedKg(null);
      setFeedback({
        type: 'err',
        text: `Belum cocok! Ingat bahwa 1 kg = 1.000 gram. Ayo coba pasangkan lagi!`,
      });
    }
  };

  const handleRestart = () => {
    playClickSound(soundEnabled);
    setSelectedKg(null);
    setMatchedKgs([]);
    setFailedKgs([]);
    setScore(0);
    setCorrectCount(0);
    setWrongCount(0);
    setDragOverGram(null);
    setFeedback({
      type: 'idle',
      text: 'Seret kartu Kilogram (kiri) ke kartu Gram (kanan) yang sama beratnya, atau klik dua kartu yang cocok!',
    });
  };

  const allDone = matchedKgs.length === KG_TO_GRAM_EXAMPLES.length;

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
            Cocok: {matchedKgs.length} / {KG_TO_GRAM_EXAMPLES.length}
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

      <KikoMascot
        message={feedback.text}
        mood={
          feedback.type === 'ok'
            ? 'celebrate'
            : feedback.type === 'err'
              ? 'encourage'
              : 'happy'
        }
      />

      {allDone ? (
        <div className="bg-white border border-emerald-300 rounded-3xl p-8 text-center space-y-5 animate-pop-celebrate">
          <Sparkles className="w-14 h-14 text-amber-500 mx-auto" />
          <h3 className="text-3xl font-extrabold text-slate-900">
            Semua Pasangan Berhasil Dicocokkan!
          </h3>
          <p className="text-lg text-slate-700">
            Skor kamu: <strong className="font-mono text-sky-700">{score} Poin</strong> (Benar
            langsung: {correctCount} · Salah: {wrongCount})
          </p>
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
      ) : (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Kilogram */}
            <div className="space-y-3">
              <h3 className="text-lg font-extrabold text-sky-900">
                Satuan Kilogram (kg) — Seret atau Klik
              </h3>
              {KG_TO_GRAM_EXAMPLES.map((item) => {
                const isMatched = matchedKgs.includes(item.kg);
                const isSelected = selectedKg === item.kg;
                return (
                  <button
                    key={item.kg}
                    type="button"
                    disabled={isMatched}
                    draggable={!isMatched}
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', String(item.kg));
                      setSelectedKg(item.kg);
                    }}
                    onClick={() => {
                      playClickSound(soundEnabled);
                      setSelectedKg(isSelected ? null : item.kg);
                    }}
                    className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl border-2 font-extrabold text-xl font-mono transition-all ${
                      isMatched
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-800 opacity-80 cursor-default'
                        : isSelected
                          ? 'bg-sky-600 border-sky-800 text-white shadow-md scale-[1.02] cursor-pointer'
                          : 'bg-sky-50 border-sky-200 text-slate-900 hover:border-sky-500 cursor-grab active:cursor-grabbing'
                    }`}
                  >
                    <span>{item.kg} kg</span>
                    {isMatched ? (
                      <span className="inline-flex items-center gap-1 text-sm font-sans font-bold text-emerald-700">
                        <CheckCircle2 className="w-5 h-5" /> Cocok
                      </span>
                    ) : (
                      <span className="text-xs font-sans font-bold opacity-75">
                        {isSelected ? 'Dipilih' : 'Seret / Klik'}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Column: Gram */}
            <div className="space-y-3">
              <h3 className="text-lg font-extrabold text-amber-900">
                Satuan Gram (g) — Lepas atau Klik Tujuan
              </h3>
              {rightCards.map((card) => {
                const isMatched = matchedKgs.includes(card.kgMatch);
                const isDragOver = dragOverGram === card.gram;
                return (
                  <button
                    key={card.gram}
                    type="button"
                    disabled={isMatched}
                    onDragOver={(e) => {
                      if (!isMatched) {
                        e.preventDefault();
                        setDragOverGram(card.gram);
                      }
                    }}
                    onDragLeave={() => setDragOverGram(null)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOverGram(null);
                      const draggedKg = Number(e.dataTransfer.getData('text/plain'));
                      if (draggedKg) {
                        tryMatch(draggedKg, card.gram);
                      }
                    }}
                    onClick={() => {
                      if (selectedKg !== null) {
                        tryMatch(selectedKg, card.gram);
                      } else {
                        playClickSound(soundEnabled);
                        setFeedback({
                          type: 'idle',
                          text: 'Pilih dulu satu kartu Kilogram di sebelah kiri, lalu klik pasangan Gram di sini!',
                        });
                      }
                    }}
                    className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl border-2 font-extrabold text-xl font-mono transition-all ${
                      isMatched
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-800 cursor-default'
                        : isDragOver
                          ? 'bg-amber-200 border-orange-500 text-slate-900 scale-[1.02]'
                          : selectedKg !== null
                            ? 'bg-amber-50 border-amber-400 text-slate-900 hover:bg-amber-100 cursor-pointer'
                            : 'bg-slate-50 border-slate-200 text-slate-900 hover:border-amber-300 cursor-pointer'
                    }`}
                  >
                    <span>{card.label}</span>
                    {isMatched ? (
                      <span className="inline-flex items-center gap-1 text-sm font-sans font-bold text-emerald-700">
                        <CheckCircle2 className="w-5 h-5" /> = {card.kgMatch} kg
                      </span>
                    ) : (
                      <span className="text-xs font-sans font-bold text-slate-500">
                        {isDragOver ? 'Lepas di sini' : 'Pasangkan ke sini'}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
