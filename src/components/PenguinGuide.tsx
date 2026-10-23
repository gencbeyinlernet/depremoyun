/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { sound } from '../utils/audio';
import { Sparkles, MessageCircle, Volume2, ChevronDown, ChevronUp } from 'lucide-react';

interface PenguinGuideProps {
  currentStage: number; // 0: intro, 1: hazard, 2: bag, 3: plan, 4: final
  mode: 'challenge' | 'free';
  fixedHazardsCount: number;
  bagEssentialsCount: number;
  bagWrongCount: number;
  safeZoneId: string | null;
  meetingPointId: string | null;
  commPlanId: string | null;
}

export const PenguinGuide: React.FC<PenguinGuideProps> = ({
  currentStage,
  mode,
  fixedHazardsCount,
  bagEssentialsCount,
  bagWrongCount,
  safeZoneId,
  meetingPointId,
  commPlanId,
}) => {
  const [isWaddling, setIsWaddling] = useState(false);
  const [customTipIndex, setCustomTipIndex] = useState<number | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);

  const funPenguinQuotes = [
    'Biliyor musun? Deprem anında penguenler gibi sağlam ve yere yakın durmak (Çök-Kapan-Tutun) en güvenlisidir! 🐧',
    'Dolapları L-demirle duvara sabitlemek, dev kayaları sabitlemek gibidir! Çok akıllıca!',
    'Afet çantasında en kıymetli hazine SU ve DÜDÜKTÜR! Enerjini korur, sesini duyurur.',
    'Açık alevli mumlar depremden sonra gaz sızıntısı olursa fena patlar! Pilli fener her zaman en iyisi!',
    'Şehir dışı irtibat kişisine kısa SMS atmak acil hatların kilitlenmesini önler.',
  ];

  // Derive dynamic speech message based on current stage and player actions
  const getGuideMessage = (): string => {
    if (customTipIndex !== null) {
      return funPenguinQuotes[customTipIndex % funPenguinQuotes.length];
    }

    if (currentStage === 0) {
      return 'Vak vak! Merhaba ben Paytak! 🐧 Afet öncesi 60 saniyelik hazırlık simülasyonuna hoş geldin. Oyun modunu seç ve göreve başla!';
    }

    if (currentStage === 1) {
      if (fixedHazardsCount === 0) {
        return 'Odadaki tehlikeleri avlayalım! Sallanan kitaplığa, kapı önünü tıkayan kutulara ve yatak başındaki tabloya tıkla!';
      }
      if (fixedHazardsCount < 6) {
        return `Harika gidiyorsun! ${fixedHazardsCount}/6 tehlikeyi sabitledin. Kalan riskli eşyaları da bulup odamızı sımsıkı yapalım!`;
      }
      return 'Yuppi! Odadaki bütün tehlikeler L-demirle sabitlendi ve çıkış açıldı! Şimdi 2. Bölüm (Afet Çantası) butonuna tıkla!';
    }

    if (currentStage === 2) {
      if (bagWrongCount > 0) {
        return 'Ayy dikkat! Çantaya gereksiz veya tehlikeli bir eşya (ütü, mum vb.) koydun. Açık alev yangın çıkarır, ütü de sırtımızı kırar, çıkar onu!';
      }
      if (bagEssentialsCount === 0) {
        return 'Afet çantamıza sadece ilk 72 saat hayatta tutacak eşyaları seç! Su, düdük ve pilli feneri ilk sıraya koy!';
      }
      if (bagEssentialsCount < 6) {
        return `Çok iyi! Hayati eşyalardan ${bagEssentialsCount}/6 tanesini çantaya ekledin. Kalan gerekli eşyaları da tamamla!`;
      }
      return 'Nefis oldu! Çantamız 72 saatlik hayati eşyalarla dopdolu ve sırtımıza hafif! Şimdi 3. Bölüme (Buluşma Planı) geçebiliriz!';
    }

    if (currentStage === 3) {
      if (!safeZoneId) {
        return 'Ev içi krokide sarsıntı anı güvenli yerini seç! Asansöre ve balkona asla koşma, sağlam masa yanına Çök-Kapan-Tutun!';
      }
      if (!meetingPointId) {
        return 'Şimdi sarsıntı bittikten sonra nerede toplanacağımızı seçelim. Binalardan ve elektrik tellerinden uzak geniş açık parkı bul!';
      }
      if (!commPlanId) {
        return 'Son olarak iletişim kuralı: Şebekeyi kilitlemeden şehir dışındaki tek bir akrabaya kısa SMS atmalıyız!';
      }
      return 'Vak vak! Bütün planımız kusursuz oldu! Alttaki "Görevi Bitir" butonuna bas ve başarı karneni gör!';
    }

    if (currentStage === 4) {
      return 'Tebrikler şampiyon! 🏆 Karneni aldın, artık gerçek bir Afet Hazırlık Liderisin! İstersen karneni yazdır veya sağ alttaki asistanımla şiir yaz!';
    }

    return 'Hazırlıklı olmak hayat kurtarır! 🐧';
  };

  const handlePenguinClick = () => {
    sound.playPenguinChirp();
    setIsWaddling(true);
    setTimeout(() => setIsWaddling(false), 800);

    // Toggle next fun tip
    setCustomTipIndex((prev) => (prev === null ? 0 : (prev + 1) % funPenguinQuotes.length));
  };

  return (
    <div className="fixed bottom-3 left-3 z-30 max-w-[270px] sm:max-w-[300px] select-none pointer-events-none">
      {/* Speech Balloon */}
      {!isMinimized && (
        <div className="pointer-events-auto bg-slate-900/95 border-2 border-amber-400/80 rounded-2xl p-2.5 sm:p-3 shadow-2xl mb-1.5 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200 relative text-left">
          {/* Header of speech bubble */}
          <div className="flex items-center justify-between gap-2 pb-1 mb-1 border-b border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="text-sm">🐧</span>
              <span className="text-[11px] font-black text-amber-300">
                Paytak (Afet Rehberin)
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsMinimized(true)}
              className="p-0.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition"
              aria-label="Rehberi Küçült"
              title="Baloncuğu Gizle"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Speech Message Body */}
          <p className="text-[11px] sm:text-xs leading-relaxed text-slate-100 font-medium">
            {getGuideMessage()}
          </p>

          {/* Mini Interactive Tip Prompt */}
          <div className="mt-1.5 pt-1 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1 text-[9px]">
              <Sparkles className="w-2.5 h-2.5 text-amber-400" />
              Bana tıkla!
            </span>
            <button
              type="button"
              onClick={handlePenguinClick}
              className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 font-bold text-amber-300 text-[10px] transition"
            >
              Yeni İpucu
            </button>
          </div>

          {/* Balloon tail */}
          <div className="absolute -bottom-1.5 left-7 w-2.5 h-2.5 bg-slate-900 border-r-2 border-b-2 border-amber-400/80 transform rotate-45" />
        </div>
      )}

      {/* Penguin Avatar Mascot */}
      <div className="pointer-events-auto flex items-end gap-1.5">
        <button
          type="button"
          onClick={handlePenguinClick}
          aria-label="Paytak Penguen ile Konuş"
          className={`group relative flex items-center justify-center transition-all cursor-pointer ${
            isWaddling ? 'animate-bounce' : 'hover:scale-105 active:scale-95'
          }`}
        >
          {/* Animated Penguin Vector SVG */}
          <svg
            className="w-16 h-20 sm:w-20 sm:h-24 drop-shadow-xl"
            viewBox="0 0 120 140"
            fill="none"
          >
            {/* Feet / Orange Flippers */}
            <ellipse cx="44" cy="132" rx="14" ry="7" fill="#f97316" />
            <ellipse cx="76" cy="132" rx="14" ry="7" fill="#f97316" />

            {/* Penguin Main Body (Black Outer) */}
            <ellipse cx="60" cy="80" rx="36" ry="46" fill="#0f172a" stroke="#334155" strokeWidth="2" />

            {/* Left Wing / Flipper */}
            <path
              d={isWaddling ? 'M 24 65 Q 6 45 16 35 Q 26 55 30 75 Z' : 'M 26 65 Q 12 85 18 100 Q 28 95 32 80 Z'}
              fill="#0f172a"
              stroke="#334155"
              strokeWidth="2"
              className="transition-all duration-300"
            />

            {/* Right Wing / Flipper (Waving!) */}
            <path
              d={isWaddling ? 'M 96 65 Q 114 45 104 35 Q 94 55 90 75 Z' : 'M 94 65 Q 112 55 108 45 Q 94 60 90 78 Z'}
              fill="#0f172a"
              stroke="#334155"
              strokeWidth="2"
              className="transition-all duration-300"
            />

            {/* White Belly */}
            <ellipse cx="60" cy="88" rx="24" ry="34" fill="#ffffff" />

            {/* Yellow Safety Helmet (Baret - Afet Hazırlık Teması!) */}
            <path d="M 36 44 C 36 22, 84 22, 84 44 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
            <rect x="30" y="42" width="60" height="6" rx="3" fill="#facc15" />
            {/* Safety Helmet Light / Badge */}
            <circle cx="60" cy="34" r="5" fill="#f8fafc" stroke="#eab308" strokeWidth="1.5" />
            <circle cx="60" cy="34" r="3" fill="#38bdf8" />

            {/* Red / Amber Emergency Scarf */}
            <rect x="42" y="52" width="36" height="8" rx="4" fill="#ef4444" />
            <path d="M 68 56 L 74 76 L 64 76 Z" fill="#dc2626" />

            {/* Big Expressive Eyes */}
            <circle cx="48" cy="46" r="6" fill="#ffffff" />
            <circle cx="49" cy="46" r="3.5" fill="#0f172a" />
            <circle cx="51" cy="44.5" r="1.5" fill="#ffffff" />

            <circle cx="72" cy="46" r="6" fill="#ffffff" />
            <circle cx="71" cy="46" r="3.5" fill="#0f172a" />
            <circle cx="73" cy="44.5" r="1.5" fill="#ffffff" />

            {/* Cute Orange Beak */}
            <polygon points="54,50 66,50 60,58" fill="#f97316" stroke="#ea580c" strokeWidth="1" />

            {/* Rosy Cheeks */}
            <circle cx="42" cy="51" r="3" fill="#f43f5e" opacity="0.6" />
            <circle cx="78" cy="51" r="3" fill="#f43f5e" opacity="0.6" />
          </svg>

          {/* Interactive Tap Ping */}
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 text-[9px] font-black text-slate-950 items-center justify-center">
              💬
            </span>
          </span>
        </button>

        {/* If minimized, small expand pill */}
        {isMinimized && (
          <button
            type="button"
            onClick={() => setIsMinimized(false)}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-amber-400 text-amber-300 font-bold text-xs flex items-center gap-1 shadow-lg hover:bg-slate-800 transition"
          >
            <span>Konuş</span>
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
