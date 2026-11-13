import React from 'react';
import {
  CheckCircle2,
  Gamepad2,
  Play,
  Puzzle,
  Scale,
  ShoppingBasket,
  Trophy,
} from 'lucide-react';
import { GAME_LABELS } from '../data/learningData';
import { GameId, StudentProgress } from '../types';
import { playClickSound } from '../utils/sound';
import { KikoMascot } from './KikoMascot';

interface GamesHubPageProps {
  progress: StudentProgress;
  onSelectGame: (gameId: GameId) => void;
}

const GAME_CARDS: {
  id: GameId;
  icon: React.ReactNode;
  accentBg: string;
  instructions: string;
}[] = [
  {
    id: 'tebak-berat',
    icon: <Gamepad2 className="w-7 h-7 text-sky-700" />,
    accentBg: 'bg-sky-50 border-sky-200',
    instructions: 'Lihat gambar benda dan pilih perkiraan berat yang paling tepat.',
  },
  {
    id: 'pasangkan',
    icon: <Puzzle className="w-7 h-7 text-amber-700" />,
    accentBg: 'bg-amber-50 border-amber-200',
    instructions: 'Seret atau klik dua kartu untuk memasangkan kg dan gram yang sama berat.',
  },
  {
    id: 'pasar-ceria',
    icon: <ShoppingBasket className="w-7 h-7 text-orange-700" />,
    accentBg: 'bg-orange-50 border-orange-200',
    instructions: 'Belanja buah dan sayuran di pasar sesuai misi berat yang diberikan.',
  },
  {
    id: 'timbangan-ajaib',
    icon: <Scale className="w-7 h-7 text-emerald-700" />,
    accentBg: 'bg-emerald-50 border-emerald-200',
    instructions: 'Amati dua sisi timbangan dan tentukan mana yang lebih berat atau ringan.',
  },
  {
    id: 'kuis',
    icon: <Trophy className="w-7 h-7 text-sky-800" />,
    accentBg: 'bg-sky-50 border-sky-200',
    instructions: 'Jawab 10 soal pilihan ganda bertahap untuk menguji kepintaranmu!',
  },
];

export const GamesHubPage: React.FC<GamesHubPageProps> = ({ progress, onSelectGame }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Menu Permainan Edukasi Satuan Berat
        </h2>
        <p className="mt-2 text-base sm:text-lg text-slate-700">
          Pilih salah satu dari 5 permainan seru di bawah ini. Setiap jawaban benar langsung
          mendapatkan <strong>+10 poin</strong>!
        </p>

        <div className="mt-5">
          <KikoMascot
            message="Ayo mainkan semua permainan untuk mengumpulkan poin dan meraih gelar Juara Satuan Berat!"
            mood="happy"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {GAME_CARDS.map((card) => {
          const info = GAME_LABELS[card.id];
          const record = progress.activities[card.id];

          return (
            <div
              key={card.id}
              className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between gap-5 shadow-sm hover:border-sky-400 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className={`p-3 rounded-2xl border ${card.accentBg}`}>{card.icon}</div>
                  {record.completed && (
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700">
                      <CheckCircle2 className="w-4 h-4" />
                      Selesai
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-extrabold text-slate-900">{info.title}</h3>
                <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                  <strong>Cara main:</strong> {card.instructions}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="text-sm font-bold text-slate-700 font-mono tabular-nums">
                  Skor terbaik: {record.bestScore} / {info.maxScore}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound(progress.soundEnabled);
                    onSelectGame(card.id);
                  }}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-extrabold text-white bg-orange-500 hover:bg-orange-600 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Mainkan
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
