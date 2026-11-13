import React, { useState } from 'react';
import { Award, CheckCircle2, RotateCcw, Sparkles, XCircle } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/learningData';
import { MainView } from '../types';
import { playClickSound, playCorrectSound, playVictorySound, playWrongSound } from '../utils/sound';
import { ItemIllustration } from './ItemIllustration';
import { KikoMascot } from './KikoMascot';

interface QuizPageProps {
  soundEnabled: boolean;
  onComplete: (score: number, correct: number, wrong: number) => void;
  onNavigate: (view: MainView) => void;
}

export const QuizPage: React.FC<QuizPageProps> = ({
  soundEnabled,
  onComplete,
  onNavigate,
}) => {
  const [idx, setIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [answeredStates, setAnsweredStates] = useState<('correct' | 'wrong' | null)[]>(
    Array(QUIZ_QUESTIONS.length).fill(null)
  );
  const [finished, setFinished] = useState(false);

  const current = QUIZ_QUESTIONS[idx];
  const letters = ['A', 'B', 'C'];
  const isAnswered = selectedIdx !== null;
  const isCorrect = selectedIdx === current.correctIndex;

  const handleSelectOption = (optIndex: number) => {
    if (isAnswered) return;
    setSelectedIdx(optIndex);

    const right = optIndex === current.correctIndex;
    const nextStates = [...answeredStates];
    nextStates[idx] = right ? 'correct' : 'wrong';
    setAnsweredStates(nextStates);

    if (right) {
      playCorrectSound(soundEnabled);
      setScore((s) => s + 10);
      setCorrectCount((c) => c + 1);
    } else {
      playWrongSound(soundEnabled);
      setWrongCount((w) => w + 1);
    }
  };

  const handleNext = () => {
    playClickSound(soundEnabled);
    if (idx + 1 < QUIZ_QUESTIONS.length) {
      setIdx((i) => i + 1);
      setSelectedIdx(null);
    } else {
      playVictorySound(soundEnabled);
      setFinished(true);
      onComplete(score, correctCount, wrongCount);
    }
  };

  const handleRestart = () => {
    playClickSound(soundEnabled);
    setIdx(0);
    setSelectedIdx(null);
    setScore(0);
    setCorrectCount(0);
    setWrongCount(0);
    setAnsweredStates(Array(QUIZ_QUESTIONS.length).fill(null));
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 text-center space-y-6 animate-pop-celebrate">
        <Sparkles className="w-14 h-14 text-amber-500 mx-auto" />
        <div>
          <p className="text-sm font-bold text-emerald-700">Kuis Selesai</p>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-1">
            Kamu Sudah Menyelesaikan 10 Soal Kuis!
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4">
            <p className="text-xs font-bold text-sky-800">Skor Kuis</p>
            <p className="text-3xl font-extrabold font-mono text-slate-900">{score}</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
            <p className="text-xs font-bold text-emerald-800">Benar</p>
            <p className="text-3xl font-extrabold font-mono text-emerald-700">{correctCount}</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <p className="text-xs font-bold text-slate-700">Salah</p>
            <p className="text-3xl font-extrabold font-mono text-slate-800">{wrongCount}</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              playClickSound(soundEnabled);
              onNavigate('hasil');
            }}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-extrabold text-white bg-orange-500 hover:bg-orange-600 cursor-pointer"
          >
            <Award className="w-5 h-5" />
            Lihat Hasil & Penghargaan
          </button>
          <button
            type="button"
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-sky-100 text-sky-900 hover:bg-sky-200 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            Ulangi Kuis
          </button>
        </div>
      </div>
    );
  }

  const answeredCount = answeredStates.filter((s) => s !== null).length;

  return (
    <div className="space-y-6">
      {/* Quiz Progress Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-sky-700">
              Game 5 · {current.topic} · Tingkat: {current.difficulty}
            </p>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Kuis Petualangan Satuan Berat
            </h2>
          </div>

          <div className="flex items-center gap-4 font-mono font-bold text-sm tabular-nums">
            <span className="text-slate-700">
              Dijawab: {answeredCount} / {QUIZ_QUESTIONS.length}
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-orange-600 text-base">Skor: {score}</span>
          </div>
        </div>

        {/* Question Step Numbers */}
        <div className="flex flex-wrap items-center gap-2">
          {QUIZ_QUESTIONS.map((q, qIndex) => {
            const st = answeredStates[qIndex];
            const isCurrent = qIndex === idx;
            return (
              <div
                key={q.id}
                className={`w-9 h-9 rounded-xl font-mono font-bold text-sm flex items-center justify-center border transition-colors ${
                  st === 'correct'
                    ? 'bg-emerald-600 border-emerald-700 text-white'
                    : st === 'wrong'
                      ? 'bg-red-500 border-red-600 text-white'
                      : isCurrent
                        ? 'bg-sky-600 border-sky-800 text-white'
                        : 'bg-slate-100 border-slate-200 text-slate-600'
                }`}
              >
                {q.id}
              </div>
            );
          })}
        </div>
      </div>

      <KikoMascot
        message={
          !isAnswered
            ? 'Baca soal pelan-pelan dan pilih satu jawaban yang paling tepat!'
            : isCorrect
              ? 'Hore! Jawaban kamu benar (+10 poin)!'
              : 'Belum tepat! Tidak apa-apa, baca penjelasan di bawah agar makin paham ya.'
        }
        mood={!isAnswered ? 'happy' : isCorrect ? 'celebrate' : 'encourage'}
      />

      {/* Question Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {current.itemVisual && (
            <div className="bg-sky-50 border border-sky-200 rounded-2xl p-3 shrink-0">
              <ItemIllustration item={current.itemVisual} className="w-20 h-20" />
            </div>
          )}
          <div>
            <p className="text-sm font-bold text-slate-500 mb-1">
              Soal {idx + 1} dari {QUIZ_QUESTIONS.length}
            </p>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
              {current.question}
            </h3>
          </div>
        </div>

        {/* 3 Choices */}
        <div className="space-y-3">
          {current.options.map((opt, optIdx) => {
            const isChosen = selectedIdx === optIdx;
            const isRightOption = optIdx === current.correctIndex;

            let style =
              'bg-slate-50 border-slate-200 text-slate-900 hover:border-sky-400 hover:bg-sky-50';
            if (isAnswered) {
              if (isRightOption) {
                style = 'bg-emerald-50 border-emerald-500 text-emerald-950';
              } else if (isChosen) {
                style = 'bg-red-50 border-red-400 text-red-900';
              } else {
                style = 'bg-slate-50 border-slate-200 text-slate-500 opacity-75';
              }
            }

            return (
              <button
                key={opt}
                type="button"
                disabled={isAnswered}
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl border-2 text-left text-lg font-bold transition-all ${
                  !isAnswered ? 'cursor-pointer' : 'cursor-default'
                } ${style}`}
              >
                <span>
                  <span className="inline-block w-8 font-mono text-sky-700">
                    {letters[optIdx]}.
                  </span>
                  {opt}
                </span>
                {isAnswered && isRightOption && (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                )}
                {isAnswered && isChosen && !isRightOption && (
                  <XCircle className="w-6 h-6 text-red-500 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation & Next */}
        {isAnswered && (
          <div
            className={`rounded-2xl border p-5 space-y-3 animate-pop-celebrate ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-300'
                : 'bg-amber-50 border-amber-300'
            }`}
          >
            <div className="flex items-center gap-2 font-extrabold text-lg">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  <span className="text-emerald-900">Benar! (+10 Poin)</span>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 text-red-500" />
                  <span className="text-red-900">Salah (0 Poin)</span>
                </>
              )}
            </div>
            <p className="text-base text-slate-800">{current.explanation}</p>
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-3 rounded-xl font-extrabold text-white bg-sky-600 hover:bg-sky-700 transition-colors cursor-pointer"
            >
              {idx + 1 < QUIZ_QUESTIONS.length ? 'Soal Selanjutnya →' : 'Selesai & Lihat Skor'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
