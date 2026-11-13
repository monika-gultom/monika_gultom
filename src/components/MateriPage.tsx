import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Gamepad2,
  Scale,
  XCircle,
} from 'lucide-react';
import {
  EVERYDAY_ITEMS,
  IMAGE_ASSETS,
  KG_TO_GRAM_EXAMPLES,
  SCALE_TOOLS,
} from '../data/learningData';
import { ItemKey, MainView } from '../types';
import { playClickSound, playCorrectSound, playWrongSound } from '../utils/sound';
import { BalanceScaleVisual, InteractiveSandboxScale } from './InteractiveScales';
import { ItemIllustration, SafeImage } from './ItemIllustration';
import { KikoMascot } from './KikoMascot';

interface MateriPageProps {
  activeStep: number;
  soundEnabled: boolean;
  onChangeStep: (step: number) => void;
  onNavigate: (view: MainView) => void;
}

const MATERI_TABS = [
  { id: 1, title: '1. Pengertian' },
  { id: 2, title: '2. Alat Ukur' },
  { id: 3, title: '3. kg dan g' },
  { id: 4, title: '4. Hubungan kg & g' },
  { id: 5, title: '5. Membandingkan' },
];

export const MateriPage: React.FC<MateriPageProps> = ({
  activeStep,
  soundEnabled,
  onChangeStep,
  onNavigate,
}) => {
  // Interactive states inside Materi
  const [selectedEveryday, setSelectedEveryday] = useState(EVERYDAY_ITEMS[0]);
  const [unitCheckAnswers, setUnitCheckAnswers] = useState<Record<string, 'kg' | 'g' | null>>({});
  const [kgCount, setKgCount] = useState(1);
  const [leftCompare, setLeftCompare] = useState<ItemKey>('apel');
  const [rightCompare, setRightCompare] = useState<ItemKey>('semangka');

  const leftObj = EVERYDAY_ITEMS.find((i) => i.id === leftCompare) || EVERYDAY_ITEMS[2];
  const rightObj = EVERYDAY_ITEMS.find((i) => i.id === rightCompare) || EVERYDAY_ITEMS[3];

  const comparisonResult =
    leftObj.weightInGrams > rightObj.weightInGrams
      ? `${leftObj.name} (${leftObj.sampleWeightLabel}) LEBIH BERAT daripada ${rightObj.name} (${rightObj.sampleWeightLabel}).`
      : leftObj.weightInGrams < rightObj.weightInGrams
        ? `${leftObj.name} (${leftObj.sampleWeightLabel}) LEBIH RINGAN daripada ${rightObj.name} (${rightObj.sampleWeightLabel}).`
        : `${leftObj.name} (${leftObj.sampleWeightLabel}) SAMA BERAT dengan ${rightObj.name} (${rightObj.sampleWeightLabel}).`;

  const unitPracticeItems: { id: string; item: ItemKey; label: string; correct: 'kg' | 'g' }[] = [
    { id: 'u1', item: 'beras', label: '1 Karung Beras (5 ...)', correct: 'kg' },
    { id: 'u2', item: 'cokelat', label: '1 Batang Cokelat (100 ...)', correct: 'g' },
    { id: 'u3', item: 'apel', label: '1 Buah Apel (150 ...)', correct: 'g' },
    { id: 'u4', item: 'gula', label: '1 Bungkus Gula (1 ...)', correct: 'kg' },
  ];

  return (
    <div className="space-y-6">
      {/* Chapter Selector Tabs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3">
        <div className="flex flex-wrap gap-2">
          {MATERI_TABS.map((tab) => {
            const active = activeStep === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  playClickSound(soundEnabled);
                  onChangeStep(tab.id);
                }}
                className={`px-4 py-2.5 text-sm sm:text-base font-bold rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-sky-50 hover:text-sky-800'
                }`}
              >
                {tab.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* BAGIAN 1: Apa Itu Satuan Berat? */}
      {activeStep === 1 && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              1. Apa Itu Satuan Berat?
            </h2>
            <p className="mt-3 text-lg text-slate-700 leading-relaxed max-w-3xl">
              <strong>Satuan berat</strong> digunakan untuk mengetahui seberapa berat atau
              ringan suatu benda. Dengan satuan berat baku, semua orang bisa mengukur berat
              benda dengan hasil yang sama dan tepat!
            </p>

            <div className="mt-6">
              <KikoMascot
                message="Klik gambar benda di bawah ini untuk mengetahui contoh beratnya dalam kehidupan sehari-hari!"
                mood="happy"
              />
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {EVERYDAY_ITEMS.map((item) => {
                const isSelected = selectedEveryday.id === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      playClickSound(soundEnabled);
                      setSelectedEveryday(item);
                    }}
                    className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50 shadow-sm'
                        : 'border-slate-200 bg-slate-50 hover:border-sky-300 hover:bg-white'
                    }`}
                  >
                    <ItemIllustration item={item.id} className="w-16 h-16" />
                    <span className="mt-2 text-base font-bold text-slate-900">
                      {item.name}
                    </span>
                    <span className="text-sm font-semibold text-sky-700 font-mono">
                      {item.sampleWeightLabel}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Item Detail */}
            <div className="mt-6 bg-sky-50 border border-sky-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-5">
              <div className="bg-white border border-sky-200 rounded-2xl p-3 shrink-0">
                <ItemIllustration item={selectedEveryday.id} className="w-24 h-24" />
              </div>
              <div>
                <p className="text-sm font-bold text-sky-800">
                  Contoh Benda · Perkiraan Berat: {selectedEveryday.sampleWeightLabel}
                </p>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-0.5">
                  {selectedEveryday.name}
                </h3>
                <p className="text-base sm:text-lg text-slate-700 mt-1 leading-relaxed">
                  {selectedEveryday.shortDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BAGIAN 2: Alat Ukur Berat */}
      {activeStep === 2 && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              2. Alat Ukur Berat (Timbangan)
            </h2>
            <p className="mt-2 text-lg text-slate-700 leading-relaxed max-w-3xl">
              Untuk mengukur berat benda secara tepat, kita menggunakan alat ukur yang disebut{' '}
              <strong>timbangan</strong>. Ayo kenali 3 jenis timbangan yang sering kita lihat!
            </p>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-200 bg-white">
                <SafeImage
                  src={IMAGE_ASSETS.scales}
                  alt="Ilustrasi timbangan digital, timbangan jarum, dan timbangan duduk"
                  className="w-full h-auto object-cover"
                  fallbackLabel="Alat Ukur Timbangan"
                />
              </div>

              <div className="lg:col-span-7 space-y-4">
                {SCALE_TOOLS.map((tool) => {
                  const boxStyle =
                    tool.accentColor === 'sky'
                      ? 'bg-sky-50 border-sky-200'
                      : tool.accentColor === 'amber'
                        ? 'bg-amber-50 border-amber-200'
                        : 'bg-emerald-50 border-emerald-200';
                  return (
                    <div key={tool.id} className={`rounded-2xl border p-4 ${boxStyle}`}>
                      <h3 className="text-lg font-extrabold text-slate-900">{tool.name}</h3>
                      <p className="text-base text-slate-700 mt-1">{tool.shortFunction}</p>
                      <p className="text-sm font-semibold text-slate-600 mt-1">
                        Contoh penggunaan: {tool.whereUsed}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <InteractiveSandboxScale soundEnabled={soundEnabled} />
        </div>
      )}

      {/* BAGIAN 3: Mengenal Satuan Berat (kg & g) */}
      {activeStep === 3 && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              3. Mengenal Satuan Berat: Kilogram (kg) dan Gram (g)
            </h2>
            <p className="mt-2 text-lg text-slate-700 leading-relaxed">
              Ada dua satuan berat baku yang paling sering digunakan sehari-hari:
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Kilogram */}
              <div className="bg-sky-50 border border-sky-200 rounded-2xl p-6">
                <h3 className="text-2xl font-extrabold text-sky-900">
                  Kilogram (kg)
                </h3>
                <p className="mt-2 text-base sm:text-lg text-slate-700">
                  Digunakan untuk mengukur benda yang <strong>lebih berat</strong>.
                </p>
                <div className="mt-4 space-y-3">
                  <div className="bg-white border border-sky-200 rounded-xl p-3.5 flex items-center gap-4">
                    <ItemIllustration item="beras" className="w-16 h-16 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900 text-lg">Karung Beras</p>
                      <p className="text-sky-700 font-bold font-mono">Berat: 5 kg</p>
                    </div>
                  </div>
                  <div className="bg-white border border-sky-200 rounded-xl p-3.5 flex items-center gap-4">
                    <ItemIllustration item="gula" className="w-16 h-16 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900 text-lg">Sebungkus Gula</p>
                      <p className="text-sky-700 font-bold font-mono">Berat: 1 kg</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gram */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                <h3 className="text-2xl font-extrabold text-amber-900">
                  Gram (g)
                </h3>
                <p className="mt-2 text-base sm:text-lg text-slate-700">
                  Digunakan untuk mengukur benda yang <strong>lebih ringan</strong>.
                </p>
                <div className="mt-4 space-y-3">
                  <div className="bg-white border border-amber-200 rounded-xl p-3.5 flex items-center gap-4">
                    <ItemIllustration item="apel" className="w-16 h-16 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900 text-lg">Sebuah Apel</p>
                      <p className="text-amber-700 font-bold font-mono">Berat: sekitar 150 g</p>
                    </div>
                  </div>
                  <div className="bg-white border border-amber-200 rounded-xl p-3.5 flex items-center gap-4">
                    <ItemIllustration item="cokelat" className="w-16 h-16 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900 text-lg">Sebatang Cokelat</p>
                      <p className="text-amber-700 font-bold font-mono">Berat: sekitar 100 g</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Latihan Mini Pilih Satuan */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Latihan Cepat: Pilih Satuan yang Cocok!
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {unitPracticeItems.map((u) => {
                  const chosen = unitCheckAnswers[u.id];
                  const isRight = chosen === u.correct;
                  return (
                    <div
                      key={u.id}
                      className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <ItemIllustration item={u.item} className="w-12 h-12 shrink-0" />
                        <div>
                          <p className="font-bold text-slate-900 text-base">{u.label}</p>
                          {chosen && (
                            <p
                              className={`text-sm font-bold flex items-center gap-1 mt-0.5 ${
                                isRight ? 'text-emerald-700' : 'text-red-600'
                              }`}
                            >
                              {isRight ? (
                                <>
                                  <CheckCircle2 className="w-4 h-4" /> Benar! ({u.correct})
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-4 h-4" /> Coba lagi!
                                </>
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {(['kg', 'g'] as const).map((unit) => (
                          <button
                            key={unit}
                            type="button"
                            onClick={() => {
                              if (unit === u.correct) {
                                playCorrectSound(soundEnabled);
                              } else {
                                playWrongSound(soundEnabled);
                              }
                              setUnitCheckAnswers((prev) => ({ ...prev, [u.id]: unit }));
                            }}
                            className={`px-3.5 py-2 rounded-xl font-bold text-sm border transition-colors cursor-pointer ${
                              chosen === unit
                                ? unit === u.correct
                                  ? 'bg-emerald-600 text-white border-emerald-700'
                                  : 'bg-red-500 text-white border-red-600'
                                : 'bg-white text-slate-800 border-slate-300 hover:bg-sky-50'
                            }`}
                          >
                            {unit}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BAGIAN 4: Hubungan Kilogram dan Gram */}
      {activeStep === 4 && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              4. Hubungan Kilogram dan Gram
            </h2>
            <p className="mt-2 text-lg text-slate-700 leading-relaxed">
              Tahukah kamu? Berat <strong>1 kilogram</strong> sama persis dengan{' '}
              <strong>1.000 gram</strong>!
            </p>

            {/* Interactive Visual Converter */}
            <div className="mt-6 bg-sky-50 border border-sky-200 rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                <div>
                  <p className="text-sm font-bold text-sky-800">
                    Eksplorasi Visual: Klik angka kilogram di bawah!
                  </p>
                  <p className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums mt-1">
                    {kgCount} kg = {(kgCount * 1000).toLocaleString('id-ID')} gram
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => {
                        playClickSound(soundEnabled);
                        setKgCount(num);
                      }}
                      className={`w-12 h-12 rounded-xl font-extrabold text-lg font-mono transition-all cursor-pointer ${
                        kgCount === num
                          ? 'bg-orange-500 text-white shadow-sm scale-105'
                          : 'bg-white text-slate-800 border border-sky-300 hover:bg-sky-100'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Visual Blocks */}
              <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center bg-white border border-sky-200 rounded-2xl p-5">
                <div className="md:col-span-4 flex flex-wrap items-center justify-center gap-2">
                  {Array.from({ length: kgCount }).map((_, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center bg-sky-100 border-2 border-sky-500 rounded-xl px-3 py-2"
                    >
                      <ItemIllustration item="gula" className="w-12 h-12" />
                      <span className="text-sm font-extrabold text-sky-900 font-mono">
                        1 kg
                      </span>
                    </div>
                  ))}
                </div>

                <div className="md:col-span-1 text-center text-3xl font-extrabold text-orange-600">
                  =
                </div>

                <div className="md:col-span-6">
                  <p className="text-sm font-bold text-slate-700 mb-2 text-center md:text-left">
                    Setiap 1 kg terdiri dari 10 pemberat 100 gram:
                  </p>
                  <div className="space-y-1.5">
                    {Array.from({ length: kgCount }).map((_, rowIdx) => (
                      <div key={rowIdx} className="flex flex-wrap gap-1">
                        {Array.from({ length: 10 }).map((__, blockIdx) => (
                          <span
                            key={blockIdx}
                            className="px-1.5 py-1 text-xs font-bold font-mono bg-amber-100 border border-amber-400 text-amber-950 rounded-md"
                          >
                            100g
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Table */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3">
              {KG_TO_GRAM_EXAMPLES.map((ex) => (
                <div
                  key={ex.kg}
                  className={`rounded-2xl border p-4 text-center transition-colors ${
                    kgCount === ex.kg
                      ? 'bg-emerald-50 border-emerald-400'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <p className="text-xl font-extrabold text-slate-900 font-mono">
                    {ex.kg} kg
                  </p>
                  <p className="text-sm font-semibold text-slate-500 my-0.5">sama dengan</p>
                  <p className="text-lg font-extrabold text-emerald-700 font-mono tabular-nums">
                    {ex.gram.toLocaleString('id-ID')} g
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* BAGIAN 5: Membandingkan Berat Benda */}
      {activeStep === 5 && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-2">
              <Scale className="w-7 h-7 text-sky-600" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                5. Membandingkan Berat Benda
              </h2>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed max-w-3xl">
              Saat membandingkan dua benda, perhatikan satuannya! Jika satuannya berbeda
              (misalnya gram dan kilogram), ubah dulu ke <strong>gram</strong> agar mudah
              dibandingkan. Kita akan menemukan benda yang{' '}
              <strong>lebih berat</strong>, <strong>lebih ringan</strong>, atau{' '}
              <strong>sama berat</strong>.
            </p>

            {/* Interactive Balance Sandbox */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4">
                  <label
                    htmlFor="left-compare"
                    className="block text-sm font-bold text-slate-800 mb-1.5"
                  >
                    Pilih Benda di Sisi Kiri:
                  </label>
                  <select
                    id="left-compare"
                    value={leftCompare}
                    onChange={(e) => {
                      playClickSound(soundEnabled);
                      setLeftCompare(e.target.value as ItemKey);
                    }}
                    className="w-full px-3 py-2.5 text-base font-bold bg-white border border-sky-300 rounded-xl"
                  >
                    {EVERYDAY_ITEMS.map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.name} ({i.sampleWeightLabel})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                  <label
                    htmlFor="right-compare"
                    className="block text-sm font-bold text-slate-800 mb-1.5"
                  >
                    Pilih Benda di Sisi Kanan:
                  </label>
                  <select
                    id="right-compare"
                    value={rightCompare}
                    onChange={(e) => {
                      playClickSound(soundEnabled);
                      setRightCompare(e.target.value as ItemKey);
                    }}
                    className="w-full px-3 py-2.5 text-base font-bold bg-white border border-amber-300 rounded-xl"
                  >
                    {EVERYDAY_ITEMS.map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.name} ({i.sampleWeightLabel})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                  <p className="text-xs font-bold text-emerald-800 mb-1">
                    Penjelasan Sederhana:
                  </p>
                  <p className="text-base font-bold text-slate-900">{comparisonResult}</p>
                  <p className="text-sm text-slate-700 mt-1 font-mono">
                    {leftObj.weightInGrams.toLocaleString('id-ID')} g{' '}
                    {leftObj.weightInGrams > rightObj.weightInGrams
                      ? '>'
                      : leftObj.weightInGrams < rightObj.weightInGrams
                        ? '<'
                        : '='}{' '}
                    {rightObj.weightInGrams.toLocaleString('id-ID')} g
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7">
                <BalanceScaleVisual
                  leftItem={leftObj.id}
                  leftLabel={`${leftObj.name} (${leftObj.sampleWeightLabel})`}
                  leftGrams={leftObj.weightInGrams}
                  rightItem={rightObj.id}
                  rightLabel={`${rightObj.name} (${rightObj.sampleWeightLabel})`}
                  rightGrams={rightObj.weightInGrams}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Step Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <button
          type="button"
          disabled={activeStep <= 1}
          onClick={() => {
            playClickSound(soundEnabled);
            onChangeStep(Math.max(1, activeStep - 1));
          }}
          className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-base transition-colors whitespace-nowrap shrink-0 ${
            activeStep <= 1
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 cursor-pointer'
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
          Materi Sebelumnya
        </button>

        {activeStep < 5 ? (
          <button
            type="button"
            onClick={() => {
              playClickSound(soundEnabled);
              onChangeStep(activeStep + 1);
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-base bg-sky-600 text-white hover:bg-sky-700 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Materi Berikutnya
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              playClickSound(soundEnabled);
              onNavigate('games');
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-base bg-orange-500 text-white hover:bg-orange-600 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <Gamepad2 className="w-5 h-5" />
            Lanjut ke Permainan!
          </button>
        )}
      </div>
    </div>
  );
};
