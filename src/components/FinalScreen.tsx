/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { calculateFinalSummary } from '../game/rules';
import { sound } from '../utils/audio';
import {
  Trophy,
  CheckCircle,
  Award,
  Sparkles,
  RotateCcw,
  Printer,
  Copy,
  Share2,
  ShieldCheck,
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  BookOpen,
  MessageSquare,
} from 'lucide-react';

interface FinalScreenProps {
  hazardScore: number;
  bagScore: number;
  planScore: number;
  timeLeft: number;
  mode: 'challenge' | 'free';
  onRestart: () => void;
  onOpenAssistant: () => void;
}

export const FinalScreen: React.FC<FinalScreenProps> = ({
  hazardScore,
  bagScore,
  planScore,
  timeLeft,
  mode,
  onRestart,
  onOpenAssistant,
}) => {
  const [copied, setCopied] = useState(false);
  const summary = calculateFinalSummary(hazardScore, bagScore, planScore, timeLeft, mode);

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const handleCopySummary = () => {
    sound.playClick();
    const text = `🏆 AFET ÖNCESİ 60 SANİYE - BAŞARI KARNESİ
------------------------------------------------
Toplam Puan: ${summary.totalScore} / 100
Seviye: ${summary.grade}
• 1. Bölüm (Tehlike Avı): ${hazardScore} / 35 Puan
• 2. Bölüm (Afet Çantası): ${bagScore} / 35 Puan
• 3. Bölüm (Buluşma Planı): ${planScore} / 30 Puan

ÖĞRENİLEN 3 TEMEL İLKE:
1. Sabitle & Güvene Al (Eşyaları L-Demir ile Sabitle & Çıkış Koridorunu Açık Tut)
2. İlk 72 Saat Hayatidir (Afet Çantanda Su, Düdük ve Fener Bulundur, Mum/Ateş Kullanma)
3. Sarsıntıda Çök-Kapan-Tutun, Sonrasında Açık Toplanma Noktasına Git (Asansöre Binme)`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Header Badge */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>Simülasyon Başarıyla Tamamlandı!</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Afet Hazırlık Karneniz
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
          Tebrikler! Afet öncesinde can ve mal kaybını önleyecek en kritik 3 aşamayı tamamladınız.
        </p>
      </div>

      {/* Main Score & Grade Hero Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-2 border-slate-700/80 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl mb-8 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Circular Score Badge (5 Cols) */}
          <div className="md:col-span-5 flex flex-col items-center justify-center text-center p-4 bg-slate-950/70 rounded-2xl border border-slate-800">
            <div className="relative w-36 h-36 flex items-center justify-center">
              {/* Outer ring */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="#1e293b"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="url(#scoreGrad)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="264"
                  strokeDashoffset={264 - (264 * summary.totalScore) / 100}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-white">{summary.totalScore}</span>
                <span className="text-[11px] font-bold uppercase text-slate-400">/ 100 Puan</span>
              </div>
            </div>

            <div className="mt-3">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-extrabold text-xs uppercase tracking-wide border border-amber-500/30">
                {summary.grade}
              </span>
            </div>

            {mode === 'challenge' && (
              <span className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Kalan Süre: {timeLeft > 0 ? `${timeLeft} saniye` : 'Süre doldu (öğrenerek bitirildi)'}
              </span>
            )}
          </div>

          {/* Breakdown & Tasks List (7 Cols) */}
          <div className="md:col-span-7 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
              Görev Tamamlanma Raporu
            </h3>

            {/* Task 1 */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">1. Ev İçi Tehlike Avı</span>
                  <span className="text-[11px] text-slate-400">Eşyaları L-Demir ile Sabitleme</span>
                </div>
              </div>
              <span className="text-xs font-black text-emerald-400">{hazardScore} / 35 Puan</span>
            </div>

            {/* Task 2 */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">2. Afet Çantası Hazırlığı</span>
                  <span className="text-[11px] text-slate-400">72 Saatlik Hayati İhtiyaçlar</span>
                </div>
              </div>
              <span className="text-xs font-black text-emerald-400">{bagScore} / 35 Puan</span>
            </div>

            {/* Task 3 */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">3. Tahliye & Buluşma Planı</span>
                  <span className="text-[11px] text-slate-400">Çök-Kapan-Tutun & Açık Alan</span>
                </div>
              </div>
              <span className="text-xs font-black text-emerald-400">{planScore} / 30 Puan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Earned Badges */}
      {summary.badges.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Kazanılan Başarı Rozetleri</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {summary.badges.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-2xl bg-gradient-to-b from-amber-950/20 to-slate-900 border border-amber-500/30 text-left flex items-start gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-amber-300">{b.title}</h4>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* The Crucial 3 Golden Rules (Öğrenilen 3 Temel Bilgi) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-8 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="text-base sm:text-lg font-black text-white">
            Bu Simülasyonda Öğrenilen 3 Temel Hayat Kurtaran Bilgi
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Rule 1 */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs font-black mb-2">
              1
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              Önceden Sabitle & Çıkışı Açık Tut
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Deprem yaralanmalarının %50'den fazlası devrilen eşyalardandır. Dolapları L-demirle duvara sabitleyin, yatak başındaki ağır tabloları kaldırın ve çıkış kapısını daima açık tutun.
            </p>
          </div>

          {/* Rule 2 */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-black mb-2">
              2
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              İlk 72 Saat Hayatidir (Afet Çantası)
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Çantanızda su, düdük, pilli fener, ilk yardım seti ve dayanıklı gıda bulundurun. Gaz sızıntısı ve yangın riskine karşı mum ve kibrit gibi açık alevlerden kesinlikle uzak durun!
            </p>
          </div>

          {/* Rule 3 */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-black mb-2">
              3
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              Çök-Kapan-Tutun & Açık Alanda Buluş
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Sarsıntı anında kapıya veya asansöre KOŞULMAZ! Sağlam bir masa/koltuk yanında ÇÖK-KAPAN-TUTUN yapılır. Sarsıntı durduktan sonra belirlenen açık toplanma alanına gidilir.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons: Play Again, Print, Copy, Ask AI Assistant */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => {
            sound.playSuccess();
            onRestart();
          }}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-black text-sm shadow-xl shadow-rose-950/40 hover:scale-105 active:scale-95 transition flex items-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-slate-950" />
          <span>Yeniden Oyna</span>
        </button>

        <button
          type="button"
          onClick={handlePrint}
          className="px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition flex items-center gap-2 cursor-pointer"
        >
          <Printer className="w-4 h-4 text-slate-300" />
          <span>Karnemi Yazdır</span>
        </button>

        <button
          type="button"
          onClick={handleCopySummary}
          className="px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition flex items-center gap-2 cursor-pointer"
        >
          <Copy className="w-4 h-4 text-slate-300" />
          <span>{copied ? 'Kopyalandı!' : 'Özeti Kopyala'}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onOpenAssistant();
          }}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-black text-sm shadow-xl shadow-blue-950/40 hover:scale-105 active:scale-95 transition flex items-center gap-2 cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Kurtaran Asistan & Yaratıcı Atölye</span>
        </button>
      </div>
    </div>
  );
};
