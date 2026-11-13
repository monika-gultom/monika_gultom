import {
  AwardTitle,
  EverydayItem,
  GameId,
  MarketItem,
  PasarMission,
  QuizQuestion,
  ScaleToolInfo,
  StudentProgress,
  TebakBeratQuestion,
  TimbanganRound,
} from '../types';

export const IMAGE_ASSETS = {
  hero: '/src/assets/images/hero_petualangan_berat_1794554402169.jpg',
  mascot: '/src/assets/images/mascot_kiko_pembimbing_1794554401793.jpg',
  scales: '/src/assets/images/alat_timbangan_ilustrasi_1794554402141.jpg',
  market: '/src/assets/images/pasar_ceria_banner_1794554402350.jpg',
};

export const INITIAL_PROGRESS: StudentProgress = {
  studentName: 'Sahabat Cilik',
  soundEnabled: true,
  materiVisited: [1],
  activities: {
    'tebak-berat': { played: false, completed: false, bestScore: 0, correct: 0, wrong: 0 },
    pasangkan: { played: false, completed: false, bestScore: 0, correct: 0, wrong: 0 },
    'pasar-ceria': { played: false, completed: false, bestScore: 0, correct: 0, wrong: 0 },
    'timbangan-ajaib': { played: false, completed: false, bestScore: 0, correct: 0, wrong: 0 },
    kuis: { played: false, completed: false, bestScore: 0, correct: 0, wrong: 0 },
  },
};

export const EVERYDAY_ITEMS: EverydayItem[] = [
  {
    id: 'beras',
    name: 'Beras',
    sampleWeightLabel: '5 kg',
    weightInGrams: 5000,
    shortDesc: 'Satu karung beras untuk dimasak keluarga biasanya cukup berat, sekitar 5 kilogram.',
  },
  {
    id: 'gula',
    name: 'Gula Pasir',
    sampleWeightLabel: '1 kg',
    weightInGrams: 1000,
    shortDesc: 'Sebungkus gula pasir yang dijual di warung umumnya memiliki berat 1 kilogram.',
  },
  {
    id: 'apel',
    name: 'Buah Apel',
    sampleWeightLabel: '150 g',
    weightInGrams: 150,
    shortDesc: 'Satu buah apel segar terasa ringan di tangan, beratnya sekitar 150 gram.',
  },
  {
    id: 'semangka',
    name: 'Semangka',
    sampleWeightLabel: '2 kg',
    weightInGrams: 2000,
    shortDesc: 'Buah semangka berukuran besar dan penuh air, beratnya bisa mencapai 2 kilogram.',
  },
  {
    id: 'tepung',
    name: 'Tepung Terigu',
    sampleWeightLabel: '1 kg',
    weightInGrams: 1000,
    shortDesc: 'Satu kemasan tepung terigu untuk membuat kue biasanya beratnya 1 kilogram.',
  },
  {
    id: 'buku',
    name: 'Buku Pelajaran',
    sampleWeightLabel: '300 g',
    weightInGrams: 300,
    shortDesc: 'Sebuah buku tulis atau buku paket siswa beratnya sekitar 300 gram.',
  },
];

export const SCALE_TOOLS: ScaleToolInfo[] = [
  {
    id: 'digital',
    name: 'Timbangan Digital',
    shortFunction:
      'Menunjukkan angka berat benda secara langsung di layar kecil. Sangat teliti untuk mengukur gram dan kilogram.',
    whereUsed: 'Sering dipakai di dapur untuk menimbang tepung, gula, dan buah.',
    accentColor: 'sky',
  },
  {
    id: 'jarum',
    name: 'Timbangan Jarum (Analog)',
    shortFunction:
      'Menggunakan jarum yang berputar menunjuk angka pada lingkaran skala saat benda diletakkan di wadahnya.',
    whereUsed: 'Banyak ditemukan di toko kue, rumah, dan kios buah.',
    accentColor: 'amber',
  },
  {
    id: 'duduk',
    name: 'Timbangan Duduk',
    shortFunction:
      'Timbangan berukuran kuat dan besar untuk menimbang benda berat hingga puluhan kilogram.',
    whereUsed: 'Sering dipakai di pasar tradisional untuk menimbang karung beras, kentang, dan semangka.',
    accentColor: 'emerald',
  },
];

export const KG_TO_GRAM_EXAMPLES = [
  { kg: 1, gram: 1000 },
  { kg: 2, gram: 2000 },
  { kg: 3, gram: 3000 },
  { kg: 4, gram: 4000 },
  { kg: 5, gram: 5000 },
];

export const TEBAK_BERAT_QUESTIONS: TebakBeratQuestion[] = [
  {
    id: 'tb-1',
    item: 'semangka',
    itemName: 'Satu Buah Semangka Utuh',
    clue: 'Semangka ukurannya besar dan terasa berat saat diangkat.',
    options: [
      { label: '10 gram', isCorrect: false },
      { label: '2 kilogram', isCorrect: true },
      { label: '5 gram', isCorrect: false },
    ],
    explanation: 'Semangka yang besar dan berair beratnya sekitar 2 kilogram (2 kg).',
  },
  {
    id: 'tb-2',
    item: 'apel',
    itemName: 'Satu Buah Apel Merah',
    clue: 'Satu buah apel muat di genggaman tangan dan cukup ringan.',
    options: [
      { label: '150 gram', isCorrect: true },
      { label: '15 kilogram', isCorrect: false },
      { label: '5 kilogram', isCorrect: false },
    ],
    explanation: 'Satu buah apel ringan, jadi diukur dengan gram yaitu sekitar 150 gram.',
  },
  {
    id: 'tb-3',
    item: 'beras',
    itemName: 'Satu Karung Beras',
    clue: 'Karung beras di dapur cukup berat dan diangkat dengan dua tangan.',
    options: [
      { label: '50 gram', isCorrect: false },
      { label: '500 gram', isCorrect: false },
      { label: '5 kilogram', isCorrect: true },
    ],
    explanation: 'Benda berat seperti karung beras diukur dengan kilogram, yaitu 5 kg.',
  },
  {
    id: 'tb-4',
    item: 'cokelat',
    itemName: 'Sebatang Cokelat Manis',
    clue: 'Cokelat batangan ukurannya kecil dan sangat ringan.',
    options: [
      { label: '100 gram', isCorrect: true },
      { label: '10 kilogram', isCorrect: false },
      { label: '3 kilogram', isCorrect: false },
    ],
    explanation: 'Sebatang cokelat termasuk benda ringan dengan berat sekitar 100 gram.',
  },
  {
    id: 'tb-5',
    item: 'gula',
    itemName: 'Sebungkus Gula Pasir',
    clue: 'Kemasan standar gula pasir di warung sama dengan 1.000 gram.',
    options: [
      { label: '10 gram', isCorrect: false },
      { label: '1 kilogram', isCorrect: true },
      { label: '20 kilogram', isCorrect: false },
    ],
    explanation: 'Sebungkus gula pasir umumnya memiliki berat 1 kilogram (1.000 gram).',
  },
  {
    id: 'tb-6',
    item: 'buku',
    itemName: 'Sebuah Buku Pelajaran',
    clue: 'Buku paket kelas 3 mudah dibawa di dalam tas sekolah.',
    options: [
      { label: '300 gram', isCorrect: true },
      { label: '30 kilogram', isCorrect: false },
      { label: '8 kilogram', isCorrect: false },
    ],
    explanation: 'Sebuah buku pelajaran beratnya kurang dari 1 kg, yaitu sekitar 300 gram.',
  },
];

export const PASAR_ITEMS: MarketItem[] = [
  { id: 'apel', name: 'Apel', unitLabel: '150 gram', gramsPerUnit: 150, priceLabel: '1 buah' },
  { id: 'jeruk', name: 'Jeruk', unitLabel: '1 kg', gramsPerUnit: 1000, priceLabel: '1 kantong' },
  { id: 'mangga', name: 'Mangga', unitLabel: '500 gram', gramsPerUnit: 500, priceLabel: '1 buah besar' },
  { id: 'semangka', name: 'Semangka', unitLabel: '3 kg', gramsPerUnit: 3000, priceLabel: '1 buah utuh' },
  { id: 'wortel', name: 'Wortel', unitLabel: '250 gram', gramsPerUnit: 250, priceLabel: '1 ikat' },
  { id: 'kentang', name: 'Kentang', unitLabel: '2 kg', gramsPerUnit: 2000, priceLabel: '1 keranjang' },
];

export const PASAR_MISSIONS: PasarMission[] = [
  {
    id: 'pm-1',
    instruction: 'Pilih buah yang beratnya tepat 1 kg!',
    type: 'single-item',
    validItemIds: ['jeruk'],
    explanation: 'Benar! Satu kantong jeruk memiliki berat tepat 1 kg (1.000 gram).',
  },
  {
    id: 'pm-2',
    instruction: 'Pilih benda yang lebih berat dari 500 gram!',
    type: 'single-item',
    validItemIds: ['jeruk', 'semangka', 'kentang'],
    explanation: 'Hebat! Jeruk (1 kg), Kentang (2 kg), dan Semangka (3 kg) semuanya lebih berat dari 500 gram.',
  },
  {
    id: 'pm-3',
    instruction: 'Belilah tepat 2 kg jeruk! Klik tombol tambah pada Jeruk lalu cek belanjamu.',
    type: 'multi-unit',
    validItemIds: ['jeruk'],
    targetItemId: 'jeruk',
    targetQuantity: 2,
    explanation: 'Pintar! 1 kantong jeruk = 1 kg, jadi 2 kantong jeruk = 2 kg.',
  },
  {
    id: 'pm-4',
    instruction: 'Pilih benda yang paling ringan di toko pasar ini!',
    type: 'single-item',
    validItemIds: ['apel'],
    explanation: 'Tepat sekali! Apel (150 gram) adalah benda yang paling ringan di toko ini.',
  },
  {
    id: 'pm-5',
    instruction: 'Pilih sayur atau buah dengan berat 2 kg!',
    type: 'single-item',
    validItemIds: ['kentang'],
    explanation: 'Hebat! Satu keranjang kentang memiliki berat tepat 2 kg (2.000 gram).',
  },
];

export const TIMBANGAN_ROUNDS: TimbanganRound[] = [
  {
    id: 'tr-1',
    leftItem: 'beras',
    leftLabel: '1 kg Beras',
    leftGrams: 1000,
    rightItem: 'gula',
    rightLabel: '500 gram Gula',
    rightGrams: 500,
    question: 'Benda manakah yang lebih berat?',
    options: [
      { id: 'kiri', label: '1 kg Beras (Kiri)' },
      { id: 'kanan', label: '500 gram Gula (Kanan)' },
      { id: 'sama', label: 'Keduanya Sama Berat' },
    ],
    correctOption: 'kiri',
    explanation: '1 kg beras sama dengan 1.000 gram. Karena 1.000 g > 500 g, maka 1 kg beras lebih berat!',
  },
  {
    id: 'tr-2',
    leftItem: 'apel',
    leftLabel: '150 gram Apel',
    leftGrams: 150,
    rightItem: 'semangka',
    rightLabel: '2 kg Semangka',
    rightGrams: 2000,
    question: 'Benda manakah yang lebih berat?',
    options: [
      { id: 'kiri', label: '150 gram Apel (Kiri)' },
      { id: 'kanan', label: '2 kg Semangka (Kanan)' },
      { id: 'sama', label: 'Keduanya Sama Berat' },
    ],
    correctOption: 'kanan',
    explanation: '2 kg semangka sama dengan 2.000 gram, jauh lebih berat daripada apel yang hanya 150 gram.',
  },
  {
    id: 'tr-3',
    leftItem: 'gula',
    leftLabel: '1 kg Gula',
    leftGrams: 1000,
    rightItem: 'tepung',
    rightLabel: '1.000 gram Tepung',
    rightGrams: 1000,
    question: 'Bagaimanakah perbandingan berat kedua benda ini?',
    options: [
      { id: 'kiri', label: '1 kg Gula Lebih Berat' },
      { id: 'kanan', label: '1.000 g Tepung Lebih Berat' },
      { id: 'sama', label: 'Keduanya Sama Berat' },
    ],
    correctOption: 'sama',
    explanation: 'Ingat, 1 kg = 1.000 gram! Jadi 1 kg gula dan 1.000 gram tepung beratnya sama.',
  },
  {
    id: 'tr-4',
    leftItem: 'cokelat',
    leftLabel: '100 gram Cokelat',
    leftGrams: 100,
    rightItem: 'buku',
    rightLabel: '300 gram Buku',
    rightGrams: 300,
    question: 'Benda manakah yang lebih ringan?',
    options: [
      { id: 'kiri', label: '100 gram Cokelat (Kiri)' },
      { id: 'kanan', label: '300 gram Buku (Kanan)' },
      { id: 'sama', label: 'Keduanya Sama Berat' },
    ],
    correctOption: 'kiri',
    explanation: '100 gram lebih kecil angkanya daripada 300 gram, jadi cokelat lebih ringan!',
  },
  {
    id: 'tr-5',
    leftItem: 'beras',
    leftLabel: '3 kg Beras',
    leftGrams: 3000,
    rightItem: 'semangka',
    rightLabel: '2.500 gram Semangka',
    rightGrams: 2500,
    question: 'Benda manakah yang lebih berat?',
    options: [
      { id: 'kiri', label: '3 kg Beras (Kiri)' },
      { id: 'kanan', label: '2.500 g Semangka (Kanan)' },
      { id: 'sama', label: 'Keduanya Sama Berat' },
    ],
    correctOption: 'kiri',
    explanation: '3 kg = 3.000 gram. Karena 3.000 g lebih besar dari 2.500 g, maka 3 kg beras lebih berat.',
  },
  {
    id: 'tr-6',
    leftItem: 'wortel',
    leftLabel: '250 gram Wortel',
    leftGrams: 250,
    rightItem: 'mangga',
    rightLabel: '500 gram Mangga',
    rightGrams: 500,
    question: 'Benda manakah yang lebih ringan?',
    options: [
      { id: 'kiri', label: '250 gram Wortel (Kiri)' },
      { id: 'kanan', label: '500 gram Mangga (Kanan)' },
      { id: 'sama', label: 'Keduanya Sama Berat' },
    ],
    correctOption: 'kiri',
    explanation: '250 gram lebih sedikit dari 500 gram, sehingga wortel lebih ringan daripada mangga.',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    difficulty: 'Mudah',
    topic: 'Mengenal Satuan Berat',
    question: 'Satuan berat baku yang sering digunakan untuk benda yang berat seperti karung beras adalah ...',
    itemVisual: 'beras',
    options: ['Gram (g)', 'Kilogram (kg)', 'Sentimeter (cm)'],
    correctIndex: 1,
    explanation: 'Kilogram (kg) adalah satuan berat baku untuk benda yang cukup berat seperti beras dan semangka.',
  },
  {
    id: 2,
    difficulty: 'Mudah',
    topic: 'Mengenal Satuan Berat',
    question: 'Sebatang cokelat memiliki berat sekitar 100 ...',
    itemVisual: 'cokelat',
    options: ['gram (g)', 'kilogram (kg)', 'liter (L)'],
    correctIndex: 0,
    explanation: 'Benda ringan seperti sebatang cokelat diukur menggunakan satuan gram (g).',
  },
  {
    id: 3,
    difficulty: 'Mudah',
    topic: 'Alat Ukur Berat',
    question: 'Alat ukur berat yang menampilkan angka hasil timbangan secara langsung pada layar kecil disebut ...',
    options: ['Timbangan jarum', 'Timbangan digital', 'Penggaris'],
    correctIndex: 1,
    explanation: 'Timbangan digital menampilkan berat benda berupa angka langsung di layar elektronik.',
  },
  {
    id: 4,
    difficulty: 'Mudah',
    topic: 'Alat Ukur Berat',
    question: 'Pedagang di pasar tradisional sering menimbang karung beras atau kentang yang berat menggunakan ...',
    options: ['Timbangan duduk', 'Jangka sorong', 'Meteran'],
    correctIndex: 0,
    explanation: 'Timbangan duduk sangat kokoh dan sering digunakan di pasar untuk menimbang benda berat.',
  },
  {
    id: 5,
    difficulty: 'Sedang',
    topic: 'Hubungan Kilogram dan Gram',
    question: 'Berat 1 kilogram (kg) sama dengan berapa gram?',
    itemVisual: 'gula',
    options: ['100 gram', '500 gram', '1.000 gram'],
    correctIndex: 2,
    explanation: 'Setiap 1 kilogram selalu sama dengan 1.000 gram (1 kg = 1.000 g).',
  },
  {
    id: 6,
    difficulty: 'Sedang',
    topic: 'Hubungan Kilogram dan Gram',
    question: 'Ibu membeli 3 kg tepung terigu. Berat tepung terigu tersebut sama dengan ...',
    itemVisual: 'tepung',
    options: ['300 gram', '3.000 gram', '30.000 gram'],
    correctIndex: 1,
    explanation: 'Karena 1 kg = 1.000 gram, maka 3 kg = 3 × 1.000 = 3.000 gram.',
  },
  {
    id: 7,
    difficulty: 'Sedang',
    topic: 'Hubungan Kilogram dan Gram',
    question: 'Sebuah karung beras memiliki berat 5.000 gram. Berapa kilogram berat beras tersebut?',
    itemVisual: 'beras',
    options: ['5 kg', '50 kg', '500 kg'],
    correctIndex: 0,
    explanation: '5.000 gram dibagi 1.000 sama dengan 5 kilogram (5 kg).',
  },
  {
    id: 8,
    difficulty: 'Sedang',
    topic: 'Membandingkan Berat Benda',
    question: 'Sebuah apel beratnya 150 gram dan sebuah semangka beratnya 2 kilogram. Manakah yang lebih berat?',
    itemVisual: 'semangka',
    options: ['Apel lebih berat', 'Semangka lebih berat', 'Sama berat'],
    correctIndex: 1,
    explanation: '2 kg = 2.000 gram. Karena 2.000 gram jauh lebih besar dari 150 gram, semangka lebih berat.',
  },
  {
    id: 9,
    difficulty: 'Tantangan',
    topic: 'Membandingkan Berat Benda',
    question: 'Di meja ada 2 kg gula dan 2.000 gram tepung. Pernyataan manakah yang benar?',
    itemVisual: 'gula',
    options: ['Gula lebih berat', 'Tepung lebih ringan', 'Gula dan tepung sama berat'],
    correctIndex: 2,
    explanation: '2 kg gula = 2.000 gram. Jadi berat gula dan tepung adalah sama berat!',
  },
  {
    id: 10,
    difficulty: 'Tantangan',
    topic: 'Pengukuran Sehari-hari',
    question: 'Rani membawa 1 kg jeruk dan 500 gram mangga di keranjangnya. Berapa gram total berat buah yang dibawa Rani?',
    itemVisual: 'jeruk',
    options: ['1.500 gram', '600 gram', '501 gram'],
    correctIndex: 0,
    explanation: '1 kg = 1.000 gram. Ditambah 500 gram mangga menjadi 1.000 + 500 = 1.500 gram.',
  },
];

export function computeSummary(progress: StudentProgress): {
  totalScore: number;
  totalCorrect: number;
  totalWrong: number;
  stars: number;
  title: AwardTitle;
  motivation: string;
  completedCount: number;
} {
  const entries = Object.values(progress.activities);
  const totalScore = entries.reduce((acc, item) => acc + item.bestScore, 0);
  const totalCorrect = entries.reduce((acc, item) => acc + item.correct, 0);
  const totalWrong = entries.reduce((acc, item) => acc + item.wrong, 0);
  const completedCount = entries.filter((item) => item.completed).length;

  let stars = 1;
  if (totalScore >= 240) stars = 5;
  else if (totalScore >= 180) stars = 4;
  else if (totalScore >= 120) stars = 3;
  else if (totalScore >= 60) stars = 2;

  let title: AwardTitle = 'Bintang Pemula';
  let motivation =
    'Langkah awal yang bagus! Ayo baca lagi materi dan coba semua permainan agar poinmu makin tinggi!';

  if (totalScore >= 180) {
    title = 'Juara Satuan Berat';
    motivation =
      'Luar biasa! Kamu sudah sangat mahir mengenal timbangan, mengubah kilogram ke gram, dan membandingkan berat benda!';
  } else if (totalScore >= 80) {
    title = 'Ahli Timbangan';
    motivation =
      'Hebat sekali! Pemahamanmu tentang kilogram dan gram sudah kuat. Sedikit lagi kamu jadi Juara Satuan Berat!';
  }

  return {
    totalScore,
    totalCorrect,
    totalWrong,
    stars,
    title,
    motivation,
    completedCount,
  };
}

export const GAME_LABELS: Record<GameId, { title: string; subtitle: string; maxScore: number }> = {
  'tebak-berat': {
    title: 'Game 1: Tebak Berat Benda',
    subtitle: 'Pilih perkiraan berat yang paling tepat untuk setiap benda.',
    maxScore: 60,
  },
  pasangkan: {
    title: 'Game 2: Pasangkan Satuan Berat',
    subtitle: 'Cocokkan pasangan kilogram (kg) dengan gram (g) yang setara.',
    maxScore: 50,
  },
  'pasar-ceria': {
    title: 'Game 3: Petualangan Pasar Ceria',
    subtitle: 'Jadilah pembeli pintar dan selesaikan 5 misi belanja di pasar!',
    maxScore: 50,
  },
  'timbangan-ajaib': {
    title: 'Game 4: Timbangan Ajaib',
    subtitle: 'Amati dua sisi timbangan dan tentukan mana yang lebih berat atau ringan.',
    maxScore: 60,
  },
  kuis: {
    title: 'Game 5: Kuis Petualangan Satuan Berat',
    subtitle: '10 soal pilihan ganda bertahap untuk menguji pemahamanmu.',
    maxScore: 100,
  },
};
