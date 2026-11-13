/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Home, Menu, Star, Volume2, VolumeX, X } from 'lucide-react';
import { GamesHubPage } from './components/GamesHubPage';
import { HomePage } from './components/HomePage';
import { MateriPage } from './components/MateriPage';
import { QuizPage } from './components/QuizPage';
import { ResultsPage } from './components/ResultsPage';
import { PasangkanGame } from './components/games/PasangkanGame';
import { PasarCeriaGame } from './components/games/PasarCeriaGame';
import { TebakBeratGame } from './components/games/TebakBeratGame';
import { TimbanganAjaibGame } from './components/games/TimbanganAjaibGame';
import { computeSummary, INITIAL_PROGRESS } from './data/learningData';
import { GameId, MainView, StudentProgress } from './types';
import { playClickSound } from './utils/sound';

const STORAGE_KEY = 'petualangan-satuan-berat-v1';

function loadProgress(): StudentProgress {
  if (typeof window === 'undefined') return INITIAL_PROGRESS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<StudentProgress>;
    return {
      ...INITIAL_PROGRESS,
      ...parsed,
      activities: {
        ...INITIAL_PROGRESS.activities,
        ...(parsed.activities || {}),
      },
    };
  } catch {
    return INITIAL_PROGRESS;
  }
}

export default function App() {
  const [progress, setProgress] = useState<StudentProgress>(loadProgress);
  const [view, setView] = useState<MainView>('home');
  const [materiStep, setMateriStep] = useState<number>(1);
  const [activeGame, setActiveGame] = useState<GameId | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage quota errors
    }
  }, [progress]);

  const summary = computeSummary(progress);

  const handleNavigate = (nextView: MainView, step?: number) => {
    setView(nextView);
    setActiveGame(null);
    setMobileMenuOpen(false);
    if (nextView === 'materi' && step) {
      setMateriStep(step);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenGame = (gameId: GameId) => {
    if (gameId === 'kuis') {
      setView('quiz');
      setActiveGame(null);
    } else {
      setView('games');
      setActiveGame(gameId);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteActivity = (
    gameId: GameId,
    score: number,
    correct: number,
    wrong: number
  ) => {
    setProgress((prev) => {
      const existing = prev.activities[gameId];
      const keepNew = !existing.completed || score >= existing.bestScore;
      return {
        ...prev,
        activities: {
          ...prev.activities,
          [gameId]: {
            played: true,
            completed: true,
            bestScore: keepNew ? score : existing.bestScore,
            correct: keepNew ? correct : existing.correct,
            wrong: keepNew ? wrong : existing.wrong,
          },
        },
      };
    });
  };

  const handleResetAll = () => {
    setProgress((prev) => ({
      ...INITIAL_PROGRESS,
      studentName: prev.studentName,
      soundEnabled: prev.soundEnabled,
    }));
  };

  const toggleSound = () => {
    setProgress((prev) => {
      const next = !prev.soundEnabled;
      if (next) playClickSound(true);
      return { ...prev, soundEnabled: next };
    });
  };

  const navItems: { id: MainView; label: string }[] = [
    { id: 'home', label: 'Beranda' },
    { id: 'materi', label: 'Materi' },
    { id: 'games', label: 'Permainan' },
    { id: 'quiz', label: 'Kuis' },
    { id: 'hasil', label: 'Hasil Belajar' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFC] text-slate-900">
      {/* Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (5 Nav Links) - Zone 3 (1 Primary Action) */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          <button
            type="button"
            onClick={() => {
              playClickSound(progress.soundEnabled);
              handleNavigate('home');
            }}
            className="text-lg sm:text-xl font-extrabold tracking-tight text-sky-700 hover:text-sky-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Petualangan Satuan Berat
          </button>

          <nav
            aria-label="Navigasi Utama"
            className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-600"
          >
            {navItems.map((item) => {
              const isActive = view === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    playClickSound(progress.soundEnabled);
                    handleNavigate(item.id);
                  }}
                  className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'border-orange-500 text-slate-900'
                      : 'border-transparent hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={toggleSound}
              aria-label={progress.soundEnabled ? 'Matikan suara' : 'Aktifkan suara'}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                progress.soundEnabled
                  ? 'bg-sky-600 text-white hover:bg-sky-700'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              {progress.soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>Suara Aktif</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>Suara Mati</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label="Buka menu navigasi"
              className="md:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <nav
            aria-label="Navigasi Mobile"
            className="md:hidden border-t border-slate-200 bg-white px-4 py-3 flex flex-col gap-1"
          >
            {navItems.map((item) => {
              const isActive = view === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    playClickSound(progress.soundEnabled);
                    handleNavigate(item.id);
                  }}
                  className={`text-left px-3 py-2.5 rounded-xl font-bold text-base cursor-pointer ${
                    isActive
                      ? 'bg-sky-50 text-sky-800'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Clean Unboxed Student Progress Bar (Zero-Pill Metadata) */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3 text-sm text-slate-700">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-semibold">
            <span>
              Siswa:{' '}
              <strong className="text-slate-900">
                {progress.studentName.trim() || 'Sahabat Cilik'}
              </strong>
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">
              Total Poin: <strong className="text-orange-600">{summary.totalScore}</strong>
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1 font-mono tabular-nums">
              Bintang:{' '}
              <strong className="text-amber-600 inline-flex items-center gap-0.5">
                {summary.stars}/5
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              </strong>
            </span>
            <span aria-hidden="true">·</span>
            <span>
              Gelar: <strong className="text-sky-700">{summary.title}</strong>
            </span>
          </div>

          {view !== 'home' && (
            <button
              type="button"
              onClick={() => {
                playClickSound(progress.soundEnabled);
                handleNavigate('home');
              }}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-sky-700 hover:text-sky-900 cursor-pointer whitespace-nowrap shrink-0"
            >
              <Home className="w-4 h-4" />
              Menu Utama
            </button>
          )}
        </div>

        {/* Active View */}
        {view === 'home' && (
          <HomePage
            progress={progress}
            onUpdateName={(name) =>
              setProgress((prev) => ({ ...prev, studentName: name }))
            }
            onNavigate={handleNavigate}
          />
        )}

        {view === 'materi' && (
          <MateriPage
            activeStep={materiStep}
            soundEnabled={progress.soundEnabled}
            onChangeStep={(step) => {
              setMateriStep(step);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigate={handleNavigate}
          />
        )}

        {view === 'games' && !activeGame && (
          <GamesHubPage progress={progress} onSelectGame={handleOpenGame} />
        )}

        {view === 'games' && activeGame === 'tebak-berat' && (
          <TebakBeratGame
            soundEnabled={progress.soundEnabled}
            onComplete={(score, correct, wrong) =>
              handleCompleteActivity('tebak-berat', score, correct, wrong)
            }
            onBack={() => setActiveGame(null)}
          />
        )}

        {view === 'games' && activeGame === 'pasangkan' && (
          <PasangkanGame
            soundEnabled={progress.soundEnabled}
            onComplete={(score, correct, wrong) =>
              handleCompleteActivity('pasangkan', score, correct, wrong)
            }
            onBack={() => setActiveGame(null)}
          />
        )}

        {view === 'games' && activeGame === 'pasar-ceria' && (
          <PasarCeriaGame
            soundEnabled={progress.soundEnabled}
            onComplete={(score, correct, wrong) =>
              handleCompleteActivity('pasar-ceria', score, correct, wrong)
            }
            onBack={() => setActiveGame(null)}
          />
        )}

        {view === 'games' && activeGame === 'timbangan-ajaib' && (
          <TimbanganAjaibGame
            soundEnabled={progress.soundEnabled}
            onComplete={(score, correct, wrong) =>
              handleCompleteActivity('timbangan-ajaib', score, correct, wrong)
            }
            onBack={() => setActiveGame(null)}
          />
        )}

        {view === 'quiz' && (
          <QuizPage
            soundEnabled={progress.soundEnabled}
            onComplete={(score, correct, wrong) =>
              handleCompleteActivity('kuis', score, correct, wrong)
            }
            onNavigate={handleNavigate}
          />
        )}

        {view === 'hasil' && (
          <ResultsPage
            progress={progress}
            onUpdateName={(name) =>
              setProgress((prev) => ({ ...prev, studentName: name }))
            }
            onResetAll={handleResetAll}
            onNavigate={handleNavigate}
            onOpenGame={handleOpenGame}
          />
        )}
      </main>

      {/* Clean Quiet Footer */}
      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
          <span>Petualangan Satuan Berat · Media Pembelajaran Matematika Kelas 3 SD</span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => handleNavigate('materi', 1)}
              className="hover:text-slate-900 cursor-pointer"
            >
              Materi
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('games')}
              className="hover:text-slate-900 cursor-pointer"
            >
              Permainan
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('hasil')}
              className="hover:text-slate-900 cursor-pointer"
            >
              Hasil Belajar
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
