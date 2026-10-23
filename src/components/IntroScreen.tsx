/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldAlert, Briefcase, MapPin, Zap, BookOpen, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface IntroScreenProps {
  mode: 'challenge' | 'free';
  setMode: (mode: 'challenge' | 'free') => void;
  onStart: () => void;
  onOpenAssistant: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({
  mode,
  setMode,
  onStart,
  onOpenAssistant,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      {/* Hero Header */}
      <div className="text-center space-y-4 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-bold tracking-wide uppercase">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Etkileşimli Kaçış & Hazırlık Simülasyonu</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
          Afet Öncesi{' '}
          <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-orange-500 bg-clip-text text-transparent">
            60 Saniye
          </span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto font-medium">
          Klasik çoktan seçmeli testleri unutun! Nesnelere tıklayarak tehlikeleri sabitleyin, afet çantasını sürükleyip doldurun ve güvenli aile toplanma planınızı kurun.
        </p>
      </div>

      {/* Mode Selection */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-sm mb-8 shadow-2xl">
        <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-4 text-center sm:text-left">
          Oyun Modunu Seçin
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Challenge Mode */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setMode('challenge');
            }}
            className={`p-5 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
              mode === 'challenge'
                ? 'bg-amber-950/40 border-amber-500/80 shadow-lg shadow-amber-500/10 ring-2 ring-amber-500/40'
                : 'bg-slate-800/40 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <Zap className="w-6 h-6" />
              </div>
              {mode === 'challenge' && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-xs font-black">
                  Seçildi
                </span>
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">⚡ 60 Saniyelik Meydan Okuma</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Zamana karşı yarışın! Süre dolsa bile oyun kesilmez, eksiklerinizi tamamlayarak öğrenmeye devam edebilirsiniz.
              </p>
            </div>
          </button>

          {/* Free Learning Mode */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setMode('free');
            }}
            className={`p-5 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
              mode === 'free'
                ? 'bg-blue-950/40 border-blue-500/80 shadow-lg shadow-blue-500/10 ring-2 ring-blue-500/40'
                : 'bg-slate-800/40 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <BookOpen className="w-6 h-6" />
              </div>
              {mode === 'free' && (
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500 text-slate-950 text-xs font-black">
                  Seçildi
                </span>
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">🎓 Süresiz Öğrenme Modu</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Zaman baskısı olmadan, akıllı tahta ve sınıf etkinlikleri için adım adım açıklamaları inceleyin ve tartışın.
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* 3 Stages Preview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-amber-500/40 transition">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-3">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">1. Bölüm</span>
          <h3 className="text-base font-bold text-white mt-1 mb-2">Tehlikeyi Bul & Sabitle</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Odadaki sabitlenmemiş kitaplık, kapı önünü tıkayan kutular ve başucu tehlikelerine tıklayarak güvene alın.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-amber-500/40 transition">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
            <Briefcase className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">2. Bölüm</span>
          <h3 className="text-base font-bold text-white mt-1 mb-2">Afet Çantası Hazırla</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            12 eşya arasından su, düdük, pilli fener gibi 72 saatlik hayati eşyaları seçin; gereksiz yükleri eleyin.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-amber-500/40 transition">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
            <MapPin className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">3. Bölüm</span>
          <h3 className="text-base font-bold text-white mt-1 mb-2">Buluşma Planı Kur</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Ev krokisinde Çök-Kapan-Tutun noktasını ve mahalle krokisinde güvenli açık aile toplanma alanını belirleyin.
          </p>
        </div>
      </div>

      {/* Crucial Pedagogical Golden Rule Alert */}
      <div className="bg-gradient-to-r from-amber-950/40 to-slate-900 border border-amber-500/30 rounded-2xl p-4 sm:p-5 mb-8 flex items-start gap-3">
        <CheckCircle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          <strong className="text-amber-300 font-bold block mb-1">ÖNEMLİ EĞİTSEL HATIRLATMA:</strong>
          Bu oyun <strong>afet öncesi hazırlık</strong> üzerine odaklanır. Sarsıntı anında kesinlikle merdivenlere veya kapıya koşulmaz, asansöre binilmez! Sarsıntı anında sağlam bir nesnenin yanında <strong>ÇÖK-KAPAN-TUTUN</strong> yapılır; sarsıntı durduktan sonra güvenle tahliye olunur.
        </div>
      </div>

      {/* Start Button & AI Assistant Quick Link */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => {
            sound.playSuccess();
            onStart();
          }}
          className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-orange-500 text-slate-950 font-black text-lg sm:text-xl shadow-xl shadow-rose-900/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
        >
          <span>GÖREVE BAŞLA</span>
          <ArrowRight className="w-6 h-6 text-slate-950" />
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onOpenAssistant();
          }}
          className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-white font-bold text-sm sm:text-base border border-slate-700 transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>🤖 Kurtaran Asistan'a Soru Sor</span>
        </button>
      </div>
    </div>
  );
};
