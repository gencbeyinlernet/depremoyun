/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Volume2, VolumeX, RotateCcw, Clock, ShieldCheck, HelpCircle } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  currentStage: number; // 0: intro, 1: hazard, 2: bag, 3: plan, 4: result
  mode: 'challenge' | 'free';
  timeLeft: number;
  onReset: () => void;
  onToggleSound: () => void;
  soundEnabled: boolean;
  onOpenHelp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStage,
  mode,
  timeLeft,
  onReset,
  onToggleSound,
  soundEnabled,
  onOpenHelp,
}) => {
  const stageLabels = [
    { num: 1, label: 'Tehlikeyi Bul' },
    { num: 2, label: 'Afet Çantası' },
    { num: 3, label: 'Buluşma Planı' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand */}
        <button
          onClick={onReset}
          className="flex items-center gap-2.5 text-left group hover:opacity-90 transition"
          aria-label="Ana Menüye Dön"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center shadow-md shadow-rose-900/30 font-black text-white text-lg">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-amber-400 via-rose-300 to-white bg-clip-text text-transparent">
                Afet Öncesi 60 Saniye
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Etkileşimli Deprem Hazırlık Simülasyonu</p>
          </div>
        </button>

        {/* Stages indicator (visible when playing) */}
        {currentStage >= 1 && currentStage <= 3 && (
          <nav aria-label="Bölüm İlerlemesi" className="hidden md:flex items-center gap-2">
            {stageLabels.map((st) => {
              const isActive = currentStage === st.num;
              const isPast = currentStage > st.num;
              return (
                <div
                  key={st.num}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                      : isPast
                      ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/40'
                      : 'bg-slate-800/40 text-slate-400 border border-slate-800'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isActive
                        ? 'bg-amber-500 text-slate-950'
                        : isPast
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {isPast ? '✓' : st.num}
                  </span>
                  <span>{st.label}</span>
                </div>
              );
            })}
          </nav>
        )}

        {/* Right tools: Timer + Audio + Help + Restart */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mode & Timer Badge */}
          {currentStage >= 1 && currentStage <= 3 && (
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-bold shadow-inner ${
                mode === 'challenge'
                  ? timeLeft <= 15
                    ? 'bg-rose-950/80 text-rose-300 border-rose-500/60 animate-pulse'
                    : 'bg-amber-950/50 text-amber-300 border-amber-600/40'
                  : 'bg-blue-950/50 text-blue-300 border-blue-600/40'
              }`}
            >
              <Clock className="w-4 h-4" />
              {mode === 'challenge' ? (
                <span>
                  {timeLeft > 0 ? `${timeLeft} sn` : 'Süre Bitti! (Devam et)'}
                </span>
              ) : (
                <span>Öğrenme Modu</span>
              )}
            </div>
          )}

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              sound.playClick();
            }}
            aria-label={soundEnabled ? 'Sesi Kapat' : 'Sesi Aç'}
            title={soundEnabled ? 'Sesi Kapat' : 'Sesi Aç'}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700/60"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-rose-400" />}
          </button>

          {/* Help button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenHelp();
            }}
            aria-label="Nasıl Oynanır ve Bilgi"
            title="Nasıl Oynanır?"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-400 transition border border-slate-700/60"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Reset / New Game button */}
          {currentStage > 0 && (
            <button
              onClick={() => {
                sound.playClick();
                onReset();
              }}
              aria-label="Başa Dön"
              title="Ana Menüye Dön"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950/60 hover:text-rose-300 text-slate-300 transition border border-slate-700/60 text-xs font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Menü</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
