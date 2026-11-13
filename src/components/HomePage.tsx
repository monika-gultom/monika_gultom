import React from 'react';
import { BookOpen, CheckCircle2, Gamepad2, Play, Trophy } from 'lucide-react';
import { IMAGE_ASSETS } from '../data/learningData';
import { MainView, StudentProgress } from '../types';
import { playClickSound } from '../utils/sound';
import { SafeImage } from './ItemIllustration';

interface HomePageProps {
  progress: StudentProgress;
  onUpdateName: (name: string) => void;
  onNavigate: (view: MainView, materiStep?: number) => void;
}

const ADVENTURE_STEPS = [
  {
    num: '01',
    title: 'Mengenal Materi',
    desc: 'Pahami arti satuan berat & alat timbangan.',
    view: 'materi' as MainView,
    step: 1,
  },
  {
    num: '02',
    title: 'Memahami Contoh',
    desc: 'Lihat contoh benda sehari-hari (kg & g).',
    view: 'materi' as MainView,
    step: 3,
  },
  {
    num: '03',
    title: 'Berlatih Timbang',
    desc: 'Coba timbangan digital, jarum, & perbandingan.',
    view: 'materi' as MainView,
    step: 5,
  },
  {
    num: '04',
    title: 'Bermain Game',
    desc: 'Mainkan 4 game seru tebak & timbang benda.',
    view: 'games' as MainView,
  },
  {
    num: '05',
    title: 'Mengerjakan Kuis',
    desc: 'Jawab 10 soal tantangan satuan berat.',
    view: 'quiz' as MainView,
  },
  {
    num: '06',
    title: 'Penghargaan',
    desc: 'Kumpulkan poin, bintang, & gelar juara!',
    view: 'hasil' as MainView,
  },
];

export const HomePage: React.FC<HomePageProps> = ({
  progress,
  onUpdateName,
  onNavigate,
}) => {
  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-sm font-bold text-sky-700 mb-2">
              Matematika Kelas 3 SD · Pengukuran Baku
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight text-balance">
              Petualangan Satuan Berat
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl">
              Ayo belajar mengenal <strong>kilogram (kg)</strong>, <strong>gram (g)</strong>,
              cara membaca timbangan, dan membandingkan berat benda lewat gambar seru dan
              permainan interaktif!
            </p>

            {/* Student Name Input */}
            <div className="mt-6 max-w-md">
              <label
                htmlFor="student-name-input"
                className="block text-sm font-bold text-slate-800 mb-1.5"
              >
                Tulis Nama Kamu Sebelum Mulai:
              </label>
              <input
                id="student-name-input"
                type="text"
                value={progress.studentName}
                onChange={(e) => onUpdateName(e.target.value)}
                placeholder="Contoh: Budi atau Siti"
                maxLength={30}
                className="w-full px-4 py-3 text-base font-semibold text-slate-900 bg-sky-50/70 border-2 border-sky-200 rounded-xl focus:outline-none focus:border-sky-600 focus:bg-white transition-colors"
              />
            </div>

            {/* Primary CTA */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  playClickSound(progress.soundEnabled);
                  onNavigate('materi', 1);
                }}
                className="inline-flex items-center gap-2.5 px-7 py-4 text-lg font-extrabold text-white bg-orange-500 hover:bg-orange-600 active:scale-[0.98] rounded-2xl shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <Play className="w-6 h-6 fill-current" />
                MULAI BELAJAR
              </button>

              <button
                type="button"
                onClick={() => {
                  playClickSound(progress.soundEnabled);
                  onNavigate('games');
                }}
                className="inline-flex items-center gap-2 px-5 py-4 text-base font-bold text-sky-800 bg-sky-100 hover:bg-sky-200 rounded-2xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Gamepad2 className="w-5 h-5" />
                Main Game
              </button>

              <button
                type="button"
                onClick={() => {
                  playClickSound(progress.soundEnabled);
                  onNavigate('quiz');
                }}
                className="inline-flex items-center gap-2 px-5 py-4 text-base font-bold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 rounded-2xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Trophy className="w-5 h-5" />
                Ikuti Kuis
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="lg:col-span-5 flex">
            <div className="w-full rounded-2xl overflow-hidden border border-sky-200 bg-sky-50 min-h-[260px]">
              <SafeImage
                src={IMAGE_ASSETS.hero}
                alt="Anak-anak SD menimbang semangka, apel, dan beras"
                className="w-full h-full object-cover"
                fallbackLabel="Petualangan Satuan Berat"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Peta Petualangan 6 Langkah */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-2xl font-bold text-slate-900">
            Alur Petualangan Belajarmu
          </h2>
          <p className="text-sm text-slate-600">
            Klik langkah mana saja untuk langsung belajar atau bermain
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ADVENTURE_STEPS.map((item) => (
            <button
              key={item.num}
              type="button"
              onClick={() => {
                playClickSound(progress.soundEnabled);
                onNavigate(item.view, item.step);
              }}
              className="text-left bg-white border border-slate-200 hover:border-sky-400 rounded-2xl p-5 transition-all hover:shadow-sm cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-extrabold font-mono text-sky-700">
                  Langkah {item.num}
                </span>
                <span className="text-xs font-bold text-orange-600 group-hover:translate-x-0.5 transition-transform">
                  Buka →
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-600 leading-relaxed">{item.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Tujuan Pembelajaran */}
      <section className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-6 h-6 text-amber-700 shrink-0" />
          <h2 className="text-2xl font-bold text-slate-900">
            Apa yang Akan Kamu Pelajari?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-base text-slate-800">
          {[
            'Mengenal pengertian satuan berat dalam kehidupan sehari-hari.',
            'Mengenal alat ukur berat: timbangan digital, jarum, dan duduk.',
            'Mengenal satuan berat baku: kilogram (kg) dan gram (g).',
            'Memahami hubungan bahwa 1 kg sama dengan 1.000 gram.',
            'Membandingkan benda yang lebih berat, lebih ringan, dan sama berat.',
            'Menyelesaikan soal sederhana lewat 5 game edukasi dan kuis seru.',
          ].map((goal) => (
            <div key={goal} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{goal}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
