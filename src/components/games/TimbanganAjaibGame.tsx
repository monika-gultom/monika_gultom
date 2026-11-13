import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, RotateCcw, Sparkles, XCircle } from 'lucide-react';
import { TIMBANGAN_ROUNDS } from '../../data/learningData';
import { playClickSound, playCorrectSound, playVictorySound, playWrongSound } from '../../utils/sound';
import { BalanceScaleVisual } from '../InteractiveScales';
import { KikoMascot } from '../KikoMascot';

interface TimbanganAjaibGameProps {
  soundEnabled: boolean;
  onComplete: (score: number, correct: number, wrong: number) => void;
  onBack: () => void;
}

export const TimbanganAjaibGame: React.FC<TimbanganAjaibGameProps> = ({
  soundEnabled,
  onComplete,
  onBack,
}) => {
  const [roundIdx, setRoundIdx] = useState(0);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [hadWrongThisRound, setHadWrongThisRound] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const round = TIMBANGAN_ROUNDS[roundIdx];

  const handleAnswer = (optId: 'kiri' | 'kanan' | 'sama') => {
    if (status === 'correct') return;
    setSelectedOpt(optId);

    if (optId === round.correctOption) {
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
    if (roundIdx + 1 < TIMBANGAN_ROUNDS.length) {
      setRoundIdx((i) => i + 1);
      setStatus('idle');
      setHadWrongThisRound(false);
      setSelectedOpt(null);
    } else {
      playVictorySound(soundEnabled);
      setFinished(true);
      onComplete(score, correctCount, wrongCount);
    }
  };

  const handleRestart = () => {
    playClickSound(soundEnabled);
    setRoundIdx(0);
    setStatus('idle');
    setHadWrongThisRound(false);
    setSelectedOpt(null);
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
          <p className="text-sm font-bold text-emerald-700">Timbangan Ajaib Selesai</p>
          <h3 className="text-3xl font-extrabold text-slate-900 mt-1">
            Keren! Kamu Jago Membandingkan Berat Benda
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
            Ronde {roundIdx + 1} / {TIMBANGAN_ROUNDS.length}
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
        message={
          status === 'correct'
            ? 'Tepat sekali! Lihat timbangan ajaibnya bergerak menunjukkan benda yang lebih berat.'
            : status === 'wrong'
              ? 'Belum tepat, ayo coba lagi! Ingat, ubah dulu kilogram menjadi gram (1 kg = 1.000 gram).'
              : 'Petunjuk: Bandingkan berat benda di sisi kiri dan sisi kanan, lalu pilih jawaban yang benar!'
        }
        mood={
          status === 'correct'
            ? 'celebrate'
            : status === 'wrong'
              ? 'encourage'
              : 'happy'
        }
      />

      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
        {/* Balance Scale reveals true tilt once answered correctly */}
        <BalanceScaleVisual
          leftItem={round.leftItem}
          leftLabel={round.leftLabel}
          leftGrams={status === 'correct' ? round.leftGrams : 1000}
          rightItem={round.rightItem}
          rightLabel={round.rightLabel}
          rightGrams={status === 'correct' ? round.rightGrams : 1000}
          celebrating={status === 'correct'}
        />

        <div className="max-w-2xl mx-auto space-y-4 text-center">
          <h3 className="text-2xl font-extrabold text-slate-900">{round.question}</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {round.options.map((opt) => {
              const isChosen = selectedOpt === opt.id;
              let btnStyle =
                'bg-sky-50 border-sky-200 text-slate-900 hover:bg-sky-100 hover:border-sky-400';

              if (isChosen && status === 'correct') {
                btnStyle = 'bg-emerald-600 border-emerald-700 text-white';
              } else if (isChosen && status === 'wrong') {
                btnStyle = 'bg-red-500 border-red-600 text-white animate-soft-shake';
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={status === 'correct'}
                  onClick={() => handleAnswer(opt.id)}
                  className={`py-4 px-4 rounded-2xl border-2 font-bold text-base transition-all cursor-pointer ${btnStyle}`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          {status === 'wrong' && (
            <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 text-amber-950 font-bold inline-flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-500 shrink-0" />
              <span>Belum tepat, ayo coba lagi!</span>
            </div>
          )}

          {status === 'correct' && (
            <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-5 space-y-3 text-left animate-pop-celebrate">
              <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-lg">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <span>Hore! Jawaban kamu benar!</span>
              </div>
              <p className="text-base text-slate-800">{round.explanation}</p>
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 rounded-xl font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors cursor-pointer"
              >
                {roundIdx + 1 < TIMBANGAN_ROUNDS.length
                  ? 'Ronde Berikutnya →'
                  : 'Selesai Bermain'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
