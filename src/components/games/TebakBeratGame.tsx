import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, RotateCcw, Sparkles, XCircle } from 'lucide-react';
import { TEBAK_BERAT_QUESTIONS } from '../../data/learningData';
import { playClickSound, playCorrectSound, playVictorySound, playWrongSound } from '../../utils/sound';
import { ItemIllustration } from '../ItemIllustration';
import { KikoMascot } from '../KikoMascot';

interface TebakBeratGameProps {
  soundEnabled: boolean;
  onComplete: (score: number, correct: number, wrong: number) => void;
  onBack: () => void;
}

export const TebakBeratGame: React.FC<TebakBeratGameProps> = ({
  soundEnabled,
  onComplete,
  onBack,
}) => {
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [hadWrongThisRound, setHadWrongThisRound] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = TEBAK_BERAT_QUESTIONS[index];
  const optionLetters = ['A', 'B', 'C'];

  const handleChoose = (opt: { label: string; isCorrect: boolean }) => {
    if (status === 'correct') return;
    setSelectedLabel(opt.label);

    if (opt.isCorrect) {
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
    if (index + 1 < TEBAK_BERAT_QUESTIONS.length) {
      setIndex((i) => i + 1);
      setStatus('idle');
      setHadWrongThisRound(false);
      setSelectedLabel(null);
    } else {
      playVictorySound(soundEnabled);
      setFinished(true);
      onComplete(score, correctCount, wrongCount);
    }
  };

  const handleRestart = () => {
    playClickSound(soundEnabled);
    setIndex(0);
    setStatus('idle');
    setHadWrongThisRound(false);
    setSelectedLabel(null);
    setScore(0);
    setCorrectCount(0);
    setWrongCount(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 text-center space-y-6 animate-pop-celebrate">
        <Sparkles className="w-14 h-14 text-amber-500 mx-auto" />
        <div>
          <p className="text-sm font-bold text-emerald-700">Permainan Selesai</p>
          <h3 className="text-3xl font-extrabold text-slate-900 mt-1">
            Hebat! Kamu Menyelesaikan Tebak Berat Benda
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
            Soal {index + 1} / {TEBAK_BERAT_QUESTIONS.length}
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

      {/* Petunjuk */}
      <KikoMascot
        message={
          status === 'correct'
            ? 'Hore! Jawaban kamu benar! Ayo lanjut ke benda berikutnya.'
            : status === 'wrong'
              ? 'Belum tepat, ayo coba lagi! Perhatikan apakah benda ini ringan atau berat.'
              : 'Petunjuk: Lihat gambar benda, lalu pilih perkiraan berat yang paling tepat!'
        }
        mood={status === 'correct' ? 'celebrate' : status === 'wrong' ? 'encourage' : 'happy'}
      />

      {/* Question Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 flex flex-col items-center justify-center bg-sky-50 border border-sky-200 rounded-2xl p-6">
            <div className={status === 'correct' ? 'animate-pop-celebrate' : ''}>
              <ItemIllustration item={current.item} className="w-36 h-36" />
            </div>
            <h3 className="mt-3 text-xl font-extrabold text-slate-900 text-center">
              {current.itemName}
            </h3>
            <p className="mt-1 text-sm text-slate-600 text-center">{current.clue}</p>
          </div>

          <div className="md:col-span-7 space-y-4">
            <h4 className="text-2xl font-extrabold text-slate-900">
              Berapakah perkiraan berat benda ini?
            </h4>

            <div className="space-y-3">
              {current.options.map((opt, idx) => {
                const isSelected = selectedLabel === opt.label;
                let btnStyle =
                  'bg-slate-50 border-slate-200 text-slate-900 hover:border-sky-400 hover:bg-sky-50';

                if (isSelected && status === 'correct') {
                  btnStyle =
                    'bg-emerald-50 border-emerald-500 text-emerald-950 animate-pop-celebrate';
                } else if (isSelected && status === 'wrong') {
                  btnStyle = 'bg-red-50 border-red-400 text-red-900 animate-soft-shake';
                }

                return (
                  <button
                    key={opt.label}
                    type="button"
                    disabled={status === 'correct'}
                    onClick={() => handleChoose(opt)}
                    className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl border-2 text-left text-lg font-bold transition-all cursor-pointer ${btnStyle}`}
                  >
                    <span>
                      <span className="inline-block w-8 font-mono text-sky-700">
                        {optionLetters[idx]}.
                      </span>
                      {opt.label}
                    </span>
                    {isSelected && status === 'correct' && (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                    )}
                    {isSelected && status === 'wrong' && (
                      <XCircle className="w-6 h-6 text-red-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {status === 'wrong' && (
              <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 text-amber-950 font-bold flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                <span>Belum tepat, ayo coba lagi!</span>
              </div>
            )}

            {status === 'correct' && (
              <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 space-y-3 animate-pop-celebrate">
                <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-lg">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <span>Hore! Jawaban kamu benar!</span>
                </div>
                <p className="text-base text-slate-800">{current.explanation}</p>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 rounded-xl font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  {index + 1 < TEBAK_BERAT_QUESTIONS.length
                    ? 'Soal Berikutnya →'
                    : 'Lihat Hasil Permainan'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
