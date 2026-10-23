/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface HazardItem {
  id: string;
  name: string;
  category: 'falling' | 'blocking' | 'fire' | 'sharp';
  room: 'living' | 'bedroom' | 'kitchen';
  whyDangerous: string;
  howToFix: string;
  fixedTitle: string;
}

export interface BagItem {
  id: string;
  name: string;
  isEssential: boolean;
  category: 'survival' | 'communication' | 'firstaid' | 'documents' | 'food' | 'unsuitable';
  reason: string;
  weightLabel: string;
}

export interface PlanEvaluation {
  safeZoneCorrect: boolean;
  meetingPointCorrect: boolean;
  commPlanCorrect: boolean;
  score: number;
  feedback: string[];
}

export const HAZARDS_DATA: HazardItem[] = [
  {
    id: 'bookshelf',
    name: 'Sabitlenmemiş Yüksek Kitaplık',
    category: 'falling',
    room: 'living',
    whyDangerous: 'Deprem sarsıntısında devrilerek kaçış yolunu kapatabilir ya da altında bulunan kişilerin üzerine düşerek ağır yaralanmalara sebep olabilir.',
    howToFix: 'Duvara L-demir braketler ve çelik dübellerle en az iki üst noktadan sağlamca vidalanmalıdır.',
    fixedTitle: 'L-Demir ile Duvara Sabitlendi',
  },
  {
    id: 'exit-boxes',
    name: 'Kapı Önünü Kapatan Koliler ve Eşyalar',
    category: 'blocking',
    room: 'living',
    whyDangerous: 'Sarsıntı anında veya sonrasında binayı hızla tahliye ederken kapının açılmasını engeller, karanlıkta takılıp düşmelere yol açar.',
    howToFix: 'Tahliye yolu ve çıkış kapılarının önü daima tamamen boş ve açık tutulmalıdır.',
    fixedTitle: 'Çıkış Koridoru Boşaltıldı ve Temizlendi',
  },
  {
    id: 'bed-frame',
    name: 'Yatak Başındaki Ağır Tablo ve Ayna',
    category: 'falling',
    room: 'bedroom',
    whyDangerous: 'Gece uyku halindeyken deprem anında yatağın üzerine düşerek kafa travması ve cam kesiklerine sebep olur.',
    howToFix: 'Yatak başlarında ağır tablo, ayna veya raf bulunmamalı; dekorasyon amaçlı hafif bez/kanvas veya duvara gömülü tasarımlar tercih edilmelidir.',
    fixedTitle: 'Yatak Başucu Güvenli Hale Getirildi',
  },
  {
    id: 'window-pots',
    name: 'Pencere Kenarındaki Ağır Saksılar',
    category: 'sharp',
    room: 'living',
    whyDangerous: 'Sarsıntıda devrilip kırılarak odaya ve pencerelere cam/toprak saçılmasına ve derin kesiklere neden olur.',
    howToFix: 'Ağır saksı ve vazolar pencere önlerinden alınmalı, zemine yakın ve kaymaz pedler üzerine konmalıdır.',
    fixedTitle: 'Saksılar Güvenli Alçak Zemine Alındı',
  },
  {
    id: 'power-strip',
    name: 'Aşırı Yüklenmiş Çoklu Priz ve Kablolar',
    category: 'fire',
    room: 'living',
    whyDangerous: 'Deprem anında eşyaların devrilmesiyle kablolar ezilip kıvılcım çıkarabilir, yangın ve elektrik çarpması riski doğurur.',
    howToFix: 'Aşırı yükleme yapılmamalı, akım korumalı prizler tercih edilmeli ve kablolar süpürgelik içine gizlenmelidir.',
    fixedTitle: 'Priz Düzenlendi ve Akım Korumaya Alındı',
  },
  {
    id: 'kitchen-kettle',
    name: 'Tezgah Kenarındaki Sabitlenmemiş Su Isıtıcısı',
    category: 'sharp',
    room: 'kitchen',
    whyDangerous: 'Sarsıntıda yere veya üzerinize dökülerek sıcak su yanıklarına ve elektrik kısa devresine neden olur.',
    howToFix: 'Sıcak su cihazları tezgah kenarlarından uzak tutulmalı, kullanım dışıyken fişten çekilmeli ve altlarına kaymaz taban yerleştirilmelidir.',
    fixedTitle: 'Tezgah İçi Güvenli Konuma Alındı',
  },
];

export const BAG_ITEMS_DATA: BagItem[] = [
  // 6 Hayati / Uygun Eşya
  {
    id: 'water',
    name: 'İçme Suyu (Kişi başı günlük 1.5L)',
    isEssential: true,
    category: 'survival',
    reason: 'Deprem sonrası su şebekeleri zarar görebilir. Dehidrasyonu önlemek ve hayatta kalmak için en temel vazgeçilmez maddedir.',
    weightLabel: 'Hafif / Orta',
  },
  {
    id: 'whistle',
    name: 'Afet Düdüğü',
    isEssential: true,
    category: 'communication',
    reason: 'Enkaz altında veya yardım çağırırken bağırmak enerjinizi ve sesinizi tüketir. Düdük sesi çok daha uzak mesafelere ulaşır.',
    weightLabel: 'Çok Hafif',
  },
  {
    id: 'flashlight',
    name: 'El Feneri ve Yedek Piller',
    isEssential: true,
    category: 'survival',
    reason: 'Elektrikler kesildiğinde güvenli ilerlemeyi sağlar. Çakmak ve kibrit gibi yangın riski taşıyan alevli araçlar yerine pilli fener zorunludur.',
    weightLabel: 'Hafif',
  },
  {
    id: 'firstaid',
    name: 'İlk Yardım Çantası',
    isEssential: true,
    category: 'firstaid',
    reason: 'Yaralanmalarda, kanamalarda ve burkulmalarda profesyonel yardım gelene kadar ilk müdahaleyi yapmak için hayat kurtarır.',
    weightLabel: 'Hafif',
  },
  {
    id: 'documents',
    name: 'Su Geçirmez Evrak Dosyası',
    isEssential: true,
    category: 'documents',
    reason: 'Kimlik, tapu, sigorta poliçesi ve acil iletişim listesi fotokopileri afet sonrasındaki resmi işlemler ve aile takibi için şarttır.',
    weightLabel: 'Çok Hafif',
  },
  {
    id: 'food',
    name: 'Konserve ve Dayanıklı Enerji Barı',
    isEssential: true,
    category: 'food',
    reason: 'Pişirme gerektirmeyen, bozulmayan ve yüksek kalori sağlayan gıdalar ilk 72 saatte direncinizi korur.',
    weightLabel: 'Orta',
  },

  // 6 Yanlış / Gereksiz Eşya
  {
    id: 'iron',
    name: 'Ağır Ev Tipi Ütü',
    isEssential: false,
    category: 'unsuitable',
    reason: 'Afet koşullarında elektrik ve ütü ihtiyacı yoktur. Sadece boş ağırlık yaparak tahliyenizi ve çanta taşınabilirliğini engeller.',
    weightLabel: 'Ağır (Gereksiz)',
  },
  {
    id: 'porcelain',
    name: 'Porselen Tabak ve Fincan Takımı',
    isEssential: false,
    category: 'unsuitable',
    reason: 'Kırılabilir, çanta içinde keskin cam parçalarına dönüşerek yaralanmaya yol açar ve aşırı ağırlık yapar.',
    weightLabel: 'Kırılgan / Ağır',
  },
  {
    id: 'encyclopedia',
    name: 'Kalın Ansiklopedi Ciltleri',
    isEssential: false,
    category: 'unsuitable',
    reason: 'Aşırı ağırlık yapar ve çantanın kapasitesini tüketir. Afet çantasında sadece hayati acil durum rehberi gibi küçük broşürler olmalıdır.',
    weightLabel: 'Çok Ağır',
  },
  {
    id: 'freshmilk',
    name: 'Açık Çiğ Süt ve Taze Et',
    isEssential: false,
    category: 'unsuitable',
    reason: 'Buzdolabı çalışmayacağı için birkaç saatte bakteri üretir, bozulur ve zehirlenmeye sebep olur. Konserve ve kurutulmuş gıda seçilmelidir.',
    weightLabel: 'Bozulabilir',
  },
  {
    id: 'candle',
    name: 'Mum ve Kibrit / Açık Çakmak',
    isEssential: false,
    category: 'unsuitable',
    reason: 'DİKKAT! Deprem sonrası gaz ve tüp sızıntısı ihtimali çok yüksektir. Açık alev KESİNLİKLE kullanılmamalıdır; patlamaya ve yangına yol açar!',
    weightLabel: 'Yangın Tehlikesi',
  },
  {
    id: 'gameconsole',
    name: 'Masaüstü Oyun Konsolu',
    isEssential: false,
    category: 'unsuitable',
    reason: 'Elektrik ve ekran olmayan afet toplanma şartlarında hiçbir işe yaramaz; ağır ve yer kaplayan bir yüktür.',
    weightLabel: 'Hantal Eşya',
  },
];

/**
 * Calculates score for Stage 1: Hazard Hunt
 */
export function calculateHazardScore(fixedCount: number, totalHazards: number = 6): number {
  if (totalHazards <= 0) return 0;
  const ratio = Math.min(1, Math.max(0, fixedCount / totalHazards));
  return Math.round(ratio * 35); // 35 puan
}

/**
 * Checks if hazard hunt is complete
 */
export function checkHazardHuntComplete(fixedIds: string[], requiredCount: number = 6): boolean {
  return fixedIds.length >= requiredCount;
}

/**
 * Evaluates the bag selection
 */
export function evaluateBagSelection(selectedIds: string[]): {
  score: number;
  essentialCount: number;
  wrongCount: number;
  isPassing: boolean;
  missingEssentials: string[];
} {
  const essentials = BAG_ITEMS_DATA.filter((i) => i.isEssential);
  const selectedSet = new Set(selectedIds);

  let essentialCount = 0;
  let wrongCount = 0;
  const missingEssentials: string[] = [];

  for (const item of BAG_ITEMS_DATA) {
    if (item.isEssential) {
      if (selectedSet.has(item.id)) {
        essentialCount++;
      } else {
        missingEssentials.push(item.name);
      }
    } else {
      if (selectedSet.has(item.id)) {
        wrongCount++;
      }
    }
  }

  // 35 puan üzerinden: 6 doğru eşya = ~6 x 6 - (yanlış * 6)
  const baseScore = Math.max(0, essentialCount * 6 - wrongCount * 5);
  const score = Math.min(35, Math.max(0, baseScore));
  const isPassing = essentialCount >= 5 && wrongCount <= 1;

  return {
    score,
    essentialCount,
    wrongCount,
    isPassing,
    missingEssentials,
  };
}

/**
 * Evaluates evacuation and meeting plan choices
 */
export function evaluatePlan(
  safeZoneId: string | null,
  meetingPointId: string | null,
  commPlanId: string | null
): PlanEvaluation {
  const feedback: string[] = [];
  let score = 0;

  // 1. Ev içi sarsıntı anı güvenli bölge
  // Doğru: 'table_crouch' (Sağlam masa/koltuk yanı Çök-Kapan-Tutun)
  // Yanlış: 'elevator' (Asansör) veya 'balcony' (Balkon)
  const safeZoneCorrect = safeZoneId === 'table_crouch';
  if (safeZoneCorrect) {
    score += 10;
    feedback.push('Tebrikler! Sarsıntı anında devrilebilecek eşyalardan uzak, sağlam masa/koltuk yanında ÇÖK-KAPAN-TUTUN pozisyonunu seçtiniz.');
  } else if (safeZoneId === 'elevator') {
    feedback.push('UYARI: Sarsıntı anında asla asansör kullanılmaz! Elektrik kesintisinde asansör boşluğunda mahsur kalabilirsiniz.');
  } else if (safeZoneId === 'balcony') {
    feedback.push('UYARI: Depremde balkonlar binanın en zayıf çıkıntılarıdır; balkona çıkmak veya atlamak ölümcül tehlike taşır.');
  } else {
    feedback.push('Ev içi sarsıntı anı için sağlam bir nesne yanında Çök-Kapan-Tutun noktası belirlemelisiniz.');
  }

  // 2. Mahalle toplanma alanı
  // Doğru: 'park_open' (Geniş Açık Park Alanı)
  // Yanlış: 'narrow_street' (Yüksek binalar altı) veya 'power_lines' (Yüksek gerilim hattı altı)
  const meetingPointCorrect = meetingPointId === 'park_open';
  if (meetingPointCorrect) {
    score += 10;
    feedback.push('Harika seçim! Binalardan, yüksek duvarlardan ve elektrik tellerinden uzak geniş açık park alanını toplanma alanı olarak seçtiniz.');
  } else if (meetingPointId === 'narrow_street') {
    feedback.push('RİSK: Dar sokaklar ve yüksek bina dipleri artçı sarsıntılarda cam, sıva ve duvar yıkıntıları nedeniyle çok tehlikelidir.');
  } else if (meetingPointId === 'power_lines') {
    feedback.push('RİSK: Yüksek gerilim hatlarının ve trafoların altı kopma ve elektrik çarpması riski nedeniyle toplanma alanı olamaz.');
  } else {
    feedback.push('Lütfen binalardan uzak resmi bir açık toplanma alanı seçiniz.');
  }

  // 3. İletişim planı
  // Doğru: 'out_of_city_contact' (Şehir dışı irtibat kişisine kısa SMS)
  // Yanlış: 'call_everyone' (Sürekli sesli arama yapmak şebekeleri çökertir)
  const commPlanCorrect = commPlanId === 'out_of_city_contact';
  if (commPlanCorrect) {
    score += 10;
    feedback.push('Doğru strateji: Yerel hatlar kilitlendiğinde şehir dışındaki ortak bir akrabaya tek bir kısa SMS atmak acil hatları açık tutar.');
  } else if (commPlanId === 'call_everyone') {
    feedback.push('ÖNEMLİ: Sesli aramalar şebekeleri kilitler ve ambulans/itfaiye iletişimini engeller. Sadece SMS ve internet mesajı kullanılmalıdır.');
  } else {
    feedback.push('Acil durum iletişim protokolünü belirleyiniz.');
  }

  return {
    safeZoneCorrect,
    meetingPointCorrect,
    commPlanCorrect,
    score, // 30 puan maks
    feedback,
  };
}

/**
 * Calculates final total score and badges
 */
export function calculateFinalSummary(
  hazardScore: number,
  bagScore: number,
  planScore: number,
  timeLeft: number,
  mode: 'challenge' | 'free'
): {
  totalScore: number;
  grade: 'Uzman Hazırlık Lideri' | 'Bilinçli Afet Gönüllüsü' | 'Geliştirilmeli';
  badges: Array<{ id: string; title: string; desc: string; icon: string }>;
} {
  let bonus = 0;
  if (mode === 'challenge' && timeLeft > 0) {
    bonus = Math.min(10, Math.floor(timeLeft / 6)); // Süre bonusu
  }

  const rawTotal = hazardScore + bagScore + planScore + bonus;
  const totalScore = Math.min(100, Math.max(0, rawTotal));

  let grade: 'Uzman Hazırlık Lideri' | 'Bilinçli Afet Gönüllüsü' | 'Geliştirilmeli' = 'Geliştirilmeli';
  if (totalScore >= 85) {
    grade = 'Uzman Hazırlık Lideri';
  } else if (totalScore >= 60) {
    grade = 'Bilinçli Afet Gönüllüsü';
  }

  const badges = [];
  if (hazardScore >= 30) {
    badges.push({
      id: 'hazard_hunter',
      title: 'Tehlike Avcısı',
      desc: 'Evdeki tüm devrilebilir ve kaçışı kapatan riskleri güvenle sabitledi.',
      icon: 'ShieldAlert',
    });
  }
  if (bagScore >= 30) {
    badges.push({
      id: 'bag_master',
      title: 'Çanta Uzmanı',
      desc: 'İlk 72 saat için hayati ihtiyaçları doğru seçti, gereksiz ağırlıklardan kaçındı.',
      icon: 'Briefcase',
    });
  }
  if (planScore >= 25) {
    badges.push({
      id: 'plan_leader',
      title: 'Stratejik Planlama Lideri',
      desc: 'Çök-Kapan-Tutun noktasını ve güvenli açık toplanma alanını kusursuz belirledi.',
      icon: 'MapPin',
    });
  }

  return {
    totalScore,
    grade,
    badges,
  };
}
