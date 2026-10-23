/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HAZARDS_DATA, HazardItem } from '../game/rules';
import { sound } from '../utils/audio';
import { ShieldCheck, AlertTriangle, CheckCircle, ArrowRight, Wrench, X, Info } from 'lucide-react';

interface Stage1HazardHuntProps {
  fixedHazards: string[];
  onFixHazard: (id: string) => void;
  onNextStage: () => void;
}

export const Stage1HazardHunt: React.FC<Stage1HazardHuntProps> = ({
  fixedHazards,
  onFixHazard,
  onNextStage,
}) => {
  const [selectedHazard, setSelectedHazard] = useState<HazardItem | null>(null);

  const fixedSet = new Set(fixedHazards);
  const totalCount = HAZARDS_DATA.length;
  const fixedCount = fixedHazards.length;
  const isAllFixed = fixedCount >= totalCount;

  const handleSelect = (hazard: HazardItem) => {
    sound.playClick();
    setSelectedHazard(hazard);
  };

  const handleFixCurrent = () => {
    if (selectedHazard) {
      sound.playFix();
      onFixHazard(selectedHazard.id);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      {/* Header & Mission Brief */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-5 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold text-xs uppercase tracking-wider border border-rose-500/30">
                1. Bölüm
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Ev İçi Tehlike Avı (Sabitle & Güvene Al)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Odadaki riskli nesnelere tıklayın, neden tehlikeli olduklarını öğrenin ve güvenli hale getirin.
            </p>
          </div>

          {/* Progress Tracker */}
          <div className="flex items-center gap-3 w-full sm:w-auto bg-slate-950/60 px-4 py-2 rounded-xl border border-slate-800">
            <div className="text-right">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-bold">
                Giderilen Tehlikeler
              </span>
              <span className="text-lg font-black text-amber-400">
                {fixedCount} / {totalCount}
              </span>
            </div>
            <div className="w-16 h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${(fixedCount / totalCount) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quick hint badge */}
        <div className="flex items-center gap-2 text-xs text-amber-300/90 bg-amber-500/10 px-3 py-2 rounded-lg border border-amber-500/20">
          <Info className="w-4 h-4 shrink-0 text-amber-400" />
          <span>
            Depremlerde yaralanmaların yarısından fazlası yıkılmayan binalarda <strong>devrilen eşyalar</strong> ve <strong>tıkalı çıkış yolları</strong> nedeniyle olur.
          </span>
        </div>
      </div>

      {/* Main Interactive Room View */}
      <div className="relative bg-slate-950 border-2 border-slate-800 rounded-3xl overflow-hidden shadow-2xl mb-6">
        {/* Visual Room SVG Canvas */}
        <div className="relative w-full aspect-[16/9] bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 select-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 1000 560"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Patterns & Gradients */}
              <linearGradient id="wallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <linearGradient id="floorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
              <linearGradient id="carpetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0369a1" />
                <stop offset="100%" stopColor="#0c4a6e" />
              </linearGradient>
              <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.4" />
              </filter>
            </defs>

            {/* Room Geometry: Back wall & Floor */}
            <polygon points="0,0 1000,0 1000,380 0,380" fill="url(#wallGrad)" />
            <polygon points="0,380 1000,380 1000,560 0,560" fill="url(#floorGrad)" />
            <line x1="0" y1="380" x2="1000" y2="380" stroke="#475569" strokeWidth="4" />

            {/* Window with outside view */}
            <rect x="740" y="80" width="200" height="180" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="6" />
            <rect x="750" y="90" width="85" height="160" fill="#38bdf8" fillOpacity="0.15" />
            <rect x="845" y="90" width="85" height="160" fill="#38bdf8" fillOpacity="0.15" />
            <line x1="840" y1="80" x2="840" y2="260" stroke="#475569" strokeWidth="4" />
            <line x1="740" y1="170" x2="940" y2="170" stroke="#475569" strokeWidth="4" />

            {/* Carpet on floor */}
            <polygon points="260,400 740,400 820,530 180,530" fill="url(#carpetGrad)" opacity="0.8" />

            {/* Doorway / Exit Path at Right */}
            <g id="doorway-area">
              <rect x="580" y="140" width="120" height="240" fill="#1e293b" stroke="#64748b" strokeWidth="6" rx="4" />
              <rect x="590" y="150" width="100" height="230" fill="#0f172a" />
              {/* Exit Sign */}
              <rect x="610" y="115" width="60" height="20" rx="3" fill="#15803d" />
              <text x="640" y="129" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                ÇIKIŞ (EXIT)
              </text>
            </g>

            {/* Bed on the Left-Middle */}
            <g id="bed-area" filter="url(#shadow)">
              {/* Headboard */}
              <rect x="250" y="240" width="190" height="140" rx="8" fill="#475569" stroke="#334155" strokeWidth="3" />
              {/* Mattress & Blanket */}
              <rect x="230" y="320" width="230" height="130" rx="12" fill="#e2e8f0" />
              <rect x="230" y="360" width="230" height="90" rx="10" fill="#3b82f6" />
              {/* Pillows */}
              <rect x="260" y="300" width="70" height="40" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
              <rect x="350" y="300" width="70" height="40" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
            </g>

            {/* Small nightstand table */}
            <rect x="170" y="340" width="60" height="70" rx="4" fill="#64748b" />
            <circle cx="200" cy="360" r="4" fill="#cbd5e1" />
            {/* Lamp on nightstand */}
            <polygon points="190,320 210,320 215,340 185,340" fill="#fbbf24" opacity="0.8" />
            <line x1="200" y1="320" x2="200" y2="340" stroke="#94a3b8" strokeWidth="3" />

            {/* Kitchenette / Counter on far right */}
            <rect x="910" y="320" width="90" height="140" fill="#334155" stroke="#475569" strokeWidth="2" />
            <rect x="900" y="315" width="100" height="12" rx="2" fill="#cbd5e1" />

            {/* --- INTERACTIVE HAZARD 1: Bookshelf (Far Left Wall) --- */}
            <g id="hazard-bookshelf" className="cursor-pointer" onClick={() => handleSelect(HAZARDS_DATA[0])}>
              {/* Bookshelf body */}
              <rect
                x="40"
                y="110"
                width="110"
                height="270"
                rx="4"
                fill="#78350f"
                stroke={fixedSet.has('bookshelf') ? '#10b981' : '#b45309'}
                strokeWidth={fixedSet.has('bookshelf') ? 4 : 2}
                transform={fixedSet.has('bookshelf') ? '' : 'rotate(-1.5 95 380)'}
              />
              {/* Shelves */}
              <line x1="45" y1="170" x2="145" y2="170" stroke="#92400e" strokeWidth="4" />
              <line x1="45" y1="230" x2="145" y2="230" stroke="#92400e" strokeWidth="4" />
              <line x1="45" y1="290" x2="145" y2="290" stroke="#92400e" strokeWidth="4" />
              <line x1="45" y1="350" x2="145" y2="350" stroke="#92400e" strokeWidth="4" />
              {/* Books */}
              <rect x="50" y="130" width="14" height="38" fill="#ef4444" rx="1" />
              <rect x="66" y="125" width="18" height="43" fill="#3b82f6" rx="1" />
              <rect x="86" y="135" width="16" height="33" fill="#10b981" rx="1" />
              <rect x="104" y="120" width="20" height="48" fill="#f59e0b" rx="1" />
              <rect x="52" y="190" width="22" height="38" fill="#8b5cf6" rx="1" />
              <rect x="76" y="195" width="16" height="33" fill="#ec4899" rx="1" />

              {/* Fixed indicator: Visible Golden/Green L-Brackets at top */}
              {fixedSet.has('bookshelf') ? (
                <g>
                  {/* Left L-bracket */}
                  <path d="M 32 105 L 45 105 L 45 120" fill="none" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round" />
                  <circle cx="34" cy="105" r="2.5" fill="#1e293b" />
                  <circle cx="45" cy="116" r="2.5" fill="#1e293b" />
                  {/* Right L-bracket */}
                  <path d="M 158 105 L 145 105 L 145 120" fill="none" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round" />
                  <circle cx="156" cy="105" r="2.5" fill="#1e293b" />
                  <circle cx="145" cy="116" r="2.5" fill="#1e293b" />
                  {/* Anchored badge */}
                  <rect x="40" y="80" width="110" height="22" rx="4" fill="#065f46" stroke="#34d399" strokeWidth="1.5" />
                  <text x="95" y="95" fill="#ecfdf5" fontSize="10" fontWeight="bold" textAnchor="middle">
                    ✓ L-Demirle Sabit
                  </text>
                </g>
              ) : null}
            </g>

            {/* --- INTERACTIVE HAZARD 2: Doorway Exit Boxes --- */}
            <g id="hazard-exit-boxes" className="cursor-pointer" onClick={() => handleSelect(HAZARDS_DATA[1])}>
              {!fixedSet.has('exit-boxes') ? (
                <g filter="url(#shadow)">
                  {/* Box 1 */}
                  <rect x="590" y="340" width="65" height="50" rx="3" fill="#d97706" stroke="#92400e" strokeWidth="2" />
                  <line x1="590" y1="365" x2="655" y2="365" stroke="#b45309" strokeWidth="3" />
                  {/* Box 2 stacked */}
                  <rect x="620" y="300" width="55" height="42" rx="3" fill="#b45309" stroke="#78350f" strokeWidth="2" />
                  {/* Box 3 fallen near door */}
                  <rect x="660" y="350" width="50" height="40" rx="3" fill="#d97706" stroke="#92400e" strokeWidth="2" transform="rotate(12 685 370)" />
                  {/* Blocking mark */}
                  <circle cx="645" cy="335" r="14" fill="#dc2626" opacity="0.9" />
                  <text x="645" y="340" fill="#ffffff" fontSize="12" fontWeight="black" textAnchor="middle">✕</text>
                </g>
              ) : (
                <g>
                  {/* Clean exit path with luminous floor green markings */}
                  <polygon points="610,380 670,380 690,440 590,440" fill="#10b981" fillOpacity="0.25" />
                  <rect x="605" y="375" width="70" height="18" rx="4" fill="#047857" stroke="#34d399" strokeWidth="1" />
                  <text x="640" y="388" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                    ✓ Çıkış Yolu Açık
                  </text>
                </g>
              )}
            </g>

            {/* --- INTERACTIVE HAZARD 3: Bed Headboard Frame / Mirror --- */}
            <g id="hazard-bed-frame" className="cursor-pointer" onClick={() => handleSelect(HAZARDS_DATA[2])}>
              {!fixedSet.has('bed-frame') ? (
                <g filter="url(#shadow)">
                  {/* Heavy gold framed mirror/art right above sleeping pillows */}
                  <rect x="290" y="140" width="110" height="85" rx="4" fill="#1e1b4b" stroke="#eab308" strokeWidth="8" />
                  <ellipse cx="345" cy="182" rx="40" ry="28" fill="#38bdf8" fillOpacity="0.5" />
                  {/* Danger sign */}
                  <circle cx="345" cy="182" r="13" fill="#ef4444" />
                  <text x="345" y="187" fill="#ffffff" fontSize="13" fontWeight="black" textAnchor="middle">!</text>
                </g>
              ) : (
                <g>
                  {/* Replaced with soft, safe fabric banner / wall decal */}
                  <rect x="295" y="170" width="100" height="40" rx="4" fill="#065f46" fillOpacity="0.4" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 2" />
                  <text x="345" y="195" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">
                    ✓ Güvenli Başucu (Hafif)
                  </text>
                </g>
              )}
            </g>

            {/* --- INTERACTIVE HAZARD 4: Window Ledge Pots --- */}
            <g id="hazard-window-pots" className="cursor-pointer" onClick={() => handleSelect(HAZARDS_DATA[3])}>
              {!fixedSet.has('window-pots') ? (
                <g filter="url(#shadow)">
                  {/* Heavy clay pot balanced on narrow window sill */}
                  <rect x="760" y="240" width="40" height="30" rx="3" fill="#b45309" stroke="#78350f" strokeWidth="2" />
                  {/* Spiky cactus/plant */}
                  <circle cx="780" cy="225" r="16" fill="#16a34a" />
                  {/* Glass vase right next to it */}
                  <polygon points="825,235 845,235 840,265 830,265" fill="#38bdf8" fillOpacity="0.7" stroke="#0284c7" strokeWidth="2" />
                </g>
              ) : (
                <g>
                  {/* Moved down onto low floor stand with non-slip mat */}
                  <rect x="760" y="420" width="60" height="8" rx="2" fill="#334155" />
                  <rect x="770" y="395" width="40" height="25" rx="3" fill="#b45309" />
                  <circle cx="790" cy="385" r="12" fill="#16a34a" />
                  <rect x="755" y="365" width="70" height="16" rx="3" fill="#065f46" stroke="#34d399" strokeWidth="1" />
                  <text x="790" y="377" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
                    ✓ Alçak ve Kaymaz
                  </text>
                </g>
              )}
            </g>

            {/* --- INTERACTIVE HAZARD 5: Power Strip (Floor Middle) --- */}
            <g id="hazard-power-strip" className="cursor-pointer" onClick={() => handleSelect(HAZARDS_DATA[4])}>
              {!fixedSet.has('power-strip') ? (
                <g filter="url(#shadow)">
                  {/* Overcrowded multi-plug on carpet */}
                  <rect x="470" y="440" width="65" height="26" rx="4" fill="#f8fafc" stroke="#dc2626" strokeWidth="3" />
                  <circle cx="485" cy="453" r="4" fill="#0f172a" />
                  <circle cx="502" cy="453" r="4" fill="#0f172a" />
                  <circle cx="520" cy="453" r="4" fill="#0f172a" />
                  {/* Tangled cords */}
                  <path d="M 470 453 Q 440 470 420 450" fill="none" stroke="#ef4444" strokeWidth="3" />
                  <path d="M 535 453 Q 560 480 580 460" fill="none" stroke="#f59e0b" strokeWidth="3" />
                  {/* Sparks effect */}
                  <polygon points="495,430 500,436 496,437 502,444 496,438 500,437" fill="#facc15" />
                </g>
              ) : (
                <g>
                  {/* Neat surge protector secured against wall */}
                  <rect x="470" y="385" width="65" height="20" rx="3" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                  <text x="502" y="398" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle">
                    ✓ Akım Korumalı
                  </text>
                </g>
              )}
            </g>

            {/* --- INTERACTIVE HAZARD 6: Kitchenette Kettle (Edge of Counter) --- */}
            <g id="hazard-kitchen-kettle" className="cursor-pointer" onClick={() => handleSelect(HAZARDS_DATA[5])}>
              {!fixedSet.has('kitchen-kettle') ? (
                <g filter="url(#shadow)">
                  {/* Teetering boiling kettle on far right counter edge */}
                  <rect x="905" y="275" width="30" height="38" rx="6" fill="#e2e8f0" stroke="#ef4444" strokeWidth="2.5" />
                  <path d="M 935 285 Q 945 295 935 305" fill="none" stroke="#64748b" strokeWidth="3" />
                  {/* Steam */}
                  <path d="M 915 265 Q 918 255 915 248" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 2" />
                  <path d="M 923 268 Q 926 258 923 250" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 2" />
                </g>
              ) : (
                <g>
                  {/* Moved deep into counter on locked safety tray */}
                  <rect x="940" y="275" width="30" height="38" rx="6" fill="#cbd5e1" stroke="#10b981" strokeWidth="2" />
                  <rect x="925" y="255" width="60" height="16" rx="3" fill="#065f46" stroke="#34d399" strokeWidth="1" />
                  <text x="955" y="266" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
                    ✓ Güvenli Köşe
                  </text>
                </g>
              )}
            </g>
          </svg>

          {/* Interactive clickable pulse tags over the room */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Tag 1: Bookshelf */}
            <div className="absolute left-[7%] top-[30%] pointer-events-auto">
              <button
                type="button"
                onClick={() => handleSelect(HAZARDS_DATA[0])}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold shadow-lg transition-all transform hover:scale-110 cursor-pointer ${
                  fixedSet.has('bookshelf')
                    ? 'bg-emerald-600/90 text-white border border-emerald-400'
                    : 'bg-rose-600 text-white border-2 border-white animate-soft-pulse'
                }`}
              >
                {fixedSet.has('bookshelf') ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                <span>{fixedSet.has('bookshelf') ? 'Sabitlendi' : '1. Dolap'}</span>
              </button>
            </div>

            {/* Tag 2: Exit Boxes */}
            <div className="absolute left-[62%] top-[60%] pointer-events-auto">
              <button
                type="button"
                onClick={() => handleSelect(HAZARDS_DATA[1])}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold shadow-lg transition-all transform hover:scale-110 cursor-pointer ${
                  fixedSet.has('exit-boxes')
                    ? 'bg-emerald-600/90 text-white border border-emerald-400'
                    : 'bg-rose-600 text-white border-2 border-white animate-soft-pulse'
                }`}
              >
                {fixedSet.has('exit-boxes') ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                <span>{fixedSet.has('exit-boxes') ? 'Yol Açık' : '2. Kapı Önü'}</span>
              </button>
            </div>

            {/* Tag 3: Bed Frame */}
            <div className="absolute left-[33%] top-[26%] pointer-events-auto">
              <button
                type="button"
                onClick={() => handleSelect(HAZARDS_DATA[2])}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold shadow-lg transition-all transform hover:scale-110 cursor-pointer ${
                  fixedSet.has('bed-frame')
                    ? 'bg-emerald-600/90 text-white border border-emerald-400'
                    : 'bg-rose-600 text-white border-2 border-white animate-soft-pulse'
                }`}
              >
                {fixedSet.has('bed-frame') ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                <span>{fixedSet.has('bed-frame') ? 'Başucu Güvenli' : '3. Ağır Tablo'}</span>
              </button>
            </div>

            {/* Tag 4: Window Pots */}
            <div className="absolute right-[19%] top-[42%] pointer-events-auto">
              <button
                type="button"
                onClick={() => handleSelect(HAZARDS_DATA[3])}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold shadow-lg transition-all transform hover:scale-110 cursor-pointer ${
                  fixedSet.has('window-pots')
                    ? 'bg-emerald-600/90 text-white border border-emerald-400'
                    : 'bg-rose-600 text-white border-2 border-white animate-soft-pulse'
                }`}
              >
                {fixedSet.has('window-pots') ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                <span>{fixedSet.has('window-pots') ? 'Güvende' : '4. Saksı'}</span>
              </button>
            </div>

            {/* Tag 5: Power Strip */}
            <div className="absolute left-[48%] bottom-[16%] pointer-events-auto">
              <button
                type="button"
                onClick={() => handleSelect(HAZARDS_DATA[4])}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold shadow-lg transition-all transform hover:scale-110 cursor-pointer ${
                  fixedSet.has('power-strip')
                    ? 'bg-emerald-600/90 text-white border border-emerald-400'
                    : 'bg-rose-600 text-white border-2 border-white animate-soft-pulse'
                }`}
              >
                {fixedSet.has('power-strip') ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                <span>{fixedSet.has('power-strip') ? 'Düzenli' : '5. Çoklu Priz'}</span>
              </button>
            </div>

            {/* Tag 6: Kettle */}
            <div className="absolute right-[4%] top-[50%] pointer-events-auto">
              <button
                type="button"
                onClick={() => handleSelect(HAZARDS_DATA[5])}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold shadow-lg transition-all transform hover:scale-110 cursor-pointer ${
                  fixedSet.has('kitchen-kettle')
                    ? 'bg-emerald-600/90 text-white border border-emerald-400'
                    : 'bg-rose-600 text-white border-2 border-white animate-soft-pulse'
                }`}
              >
                {fixedSet.has('kitchen-kettle') ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                <span>{fixedSet.has('kitchen-kettle') ? 'Sabit' : '6. Kettle'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Hazard Cards (Touch and Smartboard Friendly Alternative) */}
      <div className="mb-6">
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-3">
          Oda Nesneleri Listesi (Doğrudan Dokunarak da İnceleyebilirsiniz)
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {HAZARDS_DATA.map((h, i) => {
            const isFixed = fixedSet.has(h.id);
            return (
              <button
                key={h.id}
                type="button"
                onClick={() => handleSelect(h)}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between cursor-pointer ${
                  isFixed
                    ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-200'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-amber-500/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                    #{i + 1}
                  </span>
                  {isFixed ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                  )}
                </div>
                <div className="text-xs font-bold line-clamp-2 leading-snug">
                  {isFixed ? h.fixedTitle : h.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Footer: Proceed to Stage 2 */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
        <div className="text-xs sm:text-sm text-slate-300 text-center sm:text-left">
          {isAllFixed ? (
            <span className="text-emerald-400 font-bold flex items-center gap-1.5 justify-center sm:justify-start">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Tebrikler! Odadaki 6 kritik tehlikenin tamamını sabitleyip güvene aldınız.
            </span>
          ) : (
            <span>
              Tüm tehlikeleri ({fixedCount}/{totalCount}) sabitleyerek maksimum afet puanı kazanın.
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            sound.playSuccess();
            onNextStage();
          }}
          disabled={fixedCount < 3}
          className={`w-full sm:w-auto px-6 py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition cursor-pointer ${
            fixedCount >= 3
              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <span>2. Bölüme Geç (Afet Çantası)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Detail / Fix Modal */}
      {selectedHazard && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 max-w-lg w-full rounded-3xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            {/* Close button */}
            <button
              onClick={() => setSelectedHazard(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  fixedSet.has(selectedHazard.id)
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-rose-500/20 text-rose-400'
                }`}
              >
                {fixedSet.has(selectedHazard.id) ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <AlertTriangle className="w-6 h-6" />
                )}
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  {fixedSet.has(selectedHazard.id) ? 'Güvenli Hale Getirildi' : 'Tehlike Tespit Edildi'}
                </span>
                <h3 className="text-lg font-black text-white leading-tight">
                  {selectedHazard.name}
                </h3>
              </div>
            </div>

            {/* Why is it dangerous? */}
            <div className="bg-rose-950/30 border border-rose-900/40 rounded-2xl p-4 mb-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-rose-400 mb-1 flex items-center gap-1.5">
                <span>⚠️ Neden Riskli & Tehlikeli?</span>
              </h4>
              <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed">
                {selectedHazard.whyDangerous}
              </p>
            </div>

            {/* How to fix it? */}
            <div className="bg-emerald-950/30 border border-emerald-900/40 rounded-2xl p-4 mb-5">
              <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1.5">
                <span>🛡️ Nasıl Güvenli Hale Getirilir?</span>
              </h4>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                {selectedHazard.howToFix}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedHazard(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
              >
                Kapat
              </button>

              {!fixedSet.has(selectedHazard.id) ? (
                <button
                  type="button"
                  onClick={() => {
                    handleFixCurrent();
                    setSelectedHazard(null);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-900/40 hover:scale-105 active:scale-95 transition flex items-center gap-2 cursor-pointer"
                >
                  <Wrench className="w-4 h-4 text-slate-950" />
                  <span>Tehlikeyi Gider & Sabitle</span>
                </button>
              ) : (
                <div className="px-4 py-2.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  <span>Bu Tehlike Giderildi</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
