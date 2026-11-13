import React from 'react';
import { Award, CheckCircle2, Home, RotateCcw, Star, XCircle } from 'lucide-react';
import { computeSummary, GAME_LABELS } from '../data/learningData';
import { GameId, MainView, StudentProgress } from '../types';
import { playClickSound } from '../utils/sound';
import { KikoMascot } from './KikoMascot';

interface ResultsPageProps {
  progress: StudentProgress;
  onUpdateName: (name: string) => void;
  onResetAll: () => void;
  onNavigate: (view: MainView) => void;
  onOpenGame: (gameId: GameId) => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({
  progress,
  onUpdateName,
  onResetAll,
  onNavigate,
  onOpenGame,
}) => {
  const summary = computeSummary(progress);
  const gameIds: GameId[] = ['tebak-berat', 'pasangkan', 'pasar-ceria', 'timbangan-ajaib', 'kuis'];

  return (
    <div className="space-y-8">
      {/* Main Certificate Card */}
      <section className="bg-white border-2 border-amber-300 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <p className="text-sm font-bold text-amber-700">
              Sertifikat & Hasil Petualangan Satuan Berat
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
              {summary.title}
            </h2>
            <p className="text-base sm:text-lg text-slate-700 mt-2 max-w-2xl leading-relaxed">
              {summary.motivation}
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex flex-col items-center shrink-0 min-w-[220px]">
            <Award className="w-12 h-12 text-amber-600 mb-2" />
            <div className="flex items-center gap-1" aria-label={`${summary.stars} dari 5 bintang`}>
              {[1, 2, 3, 4, 5].map((starNum) => (
                <Star
                  key={starNum}
                  className={`w-7 h-7 ${
                    starNum <= summary.stars
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm font-bold text-slate-800 mt-2">
              {summary.stars} / 5 Bintang Diperoleh
            </p>
          </div>
        </div>

        {/* Name & Score Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4">
            <label
              htmlFor="result-student-name"
              className="block text-xs font-bold text-sky-800 mb-1"
            >
              Nama Siswa (Bisa Diubah)
            </label>
            <input
              id="result-student-name"
              type="text"
              value={progress.studentName}
              onChange={(e) => onUpdateName(e.target.value)}
              maxLength={30}
              className="w-full text-lg font-extrabold text-slate-900 bg-white border border-sky-300 rounded-xl px-3 py-1.5 focus:outline-none focus:border-sky-600"
            />
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
            <p className="text-xs font-bold text-orange-800">Total Skor</p>
            <p className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums mt-1">
              {summary.totalScore} Poin
            </p>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
            <p className="text-xs font-bold text-emerald-800 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Jawaban Benar
            </p>
            <p className="text-3xl font-extrabold text-emerald-700 font-mono tabular-nums mt-1">
              {summary.totalCorrect}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <p className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <XCircle className="w-4 h-4 text-red-500" /> Jawaban Salah
            </p>
            <p className="text-3xl font-extrabold text-slate-800 font-mono tabular-nums mt-1">
              {summary.totalWrong}
            </p>
          </div>
        </div>

        {/* Title Ladder Info */}
        <div className="mt-6 bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 text-sm text-slate-700">
          <span>
            <strong>Tingkat Gelar:</strong> 0–79 Poin = Bintang Pemula · 80–179 Poin = Ahli
            Timbangan · 180+ Poin = Juara Satuan Berat
          </span>
        </div>
      </section>

      <KikoMascot
        message={`Selamat berpetualang, ${progress.studentName || 'Sahabat Cilik'}! Kamu sudah menyelesaikan ${summary.completedCount} dari 5 tantangan. Ayo tingkatkan skor terbaikmu di setiap permainan!`}
        mood={summary.totalScore >= 80 ? 'celebrate' : 'happy'}
      />

      {/* Per-Game Breakdown */}
      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-slate-900">
          Rincian Nilai Setiap Permainan & Kuis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gameIds.map((id) => {
            const info = GAME_LABELS[id];
            const rec = progress.activities[id];
            return (
              <div
                key={id}
                className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between gap-4"
              >
                <div>
                  <p className="text-xs font-bold text-slate-500">
                    {rec.completed ? 'Sudah Selesai' : 'Belum Selesai'} · Skor Maks{' '}
                    {info.maxScore}
                  </p>
                  <h4 className="text-lg font-extrabold text-slate-900 mt-1">{info.title}</h4>
                  <p className="text-2xl font-extrabold text-sky-700 font-mono tabular-nums mt-2">
                    {rec.bestScore} Poin
                  </p>
                  <p className="text-sm text-slate-600 mt-1">
                    Benar: {rec.correct} · Salah: {rec.wrong}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    playClickSound(progress.soundEnabled);
                    onOpenGame(id);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-sm bg-sky-100 text-sky-900 hover:bg-sky-200 transition-colors cursor-pointer"
                >
                  {rec.completed ? 'Mainkan Ulang' : 'Mulai Sekarang'}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <button
          type="button"
          onClick={() => {
            playClickSound(progress.soundEnabled);
            onNavigate('home');
          }}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-base bg-sky-600 text-white hover:bg-sky-700 transition-colors cursor-pointer"
        >
          <Home className="w-5 h-5" />
          Kembali ke Menu Utama
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound(progress.soundEnabled);
            onResetAll();
          }}
          className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-base bg-white border border-slate-300 text-slate-700 hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-5 h-5" />
          Ulangi Semua Skor
        </button>
      </div>
    </div>
  );
};
