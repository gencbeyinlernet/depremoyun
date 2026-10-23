/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { evaluatePlan, PlanEvaluation } from '../game/rules';
import { sound } from '../utils/audio';
import {
  MapPin,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Building,
  TreePine,
  Zap,
  PhoneCall,
  MessageSquare,
  AlertCircle,
  Home,
  Compass,
} from 'lucide-react';

interface Stage3PlanProps {
  safeZoneId: string | null;
  setSafeZoneId: (id: string) => void;
  meetingPointId: string | null;
  setMeetingPointId: (id: string) => void;
  commPlanId: string | null;
  setCommPlanId: (id: string) => void;
  onFinishGame: () => void;
}

export const Stage3Plan: React.FC<Stage3PlanProps> = ({
  safeZoneId,
  setSafeZoneId,
  meetingPointId,
  setMeetingPointId,
  commPlanId,
  setCommPlanId,
  onFinishGame,
}) => {
  const [tab, setTab] = useState<'home' | 'neighborhood' | 'comm'>('home');

  const evaluation: PlanEvaluation = evaluatePlan(safeZoneId, meetingPointId, commPlanId);

  const handleSelectSafeZone = (id: string) => {
    sound.playClick();
    setSafeZoneId(id);
    if (id === 'table_crouch') {
      sound.playSuccess();
    } else {
      sound.playWarning();
    }
  };

  const handleSelectMeetingPoint = (id: string) => {
    sound.playClick();
    setMeetingPointId(id);
    if (id === 'park_open') {
      sound.playSuccess();
    } else {
      sound.playWarning();
    }
  };

  const handleSelectCommPlan = (id: string) => {
    sound.playClick();
    setCommPlanId(id);
    if (id === 'out_of_city_contact') {
      sound.playSuccess();
    } else {
      sound.playWarning();
    }
  };

  const isAllChosen = safeZoneId !== null && meetingPointId !== null && commPlanId !== null;

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      {/* Header & Mission Brief */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-5 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs uppercase tracking-wider border border-emerald-500/30">
                3. Bölüm
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Tahliye & Aile Buluşma Planı
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Ev planında sarsıntı anı güvenli noktanızı, mahalle krokisinde ise sarsıntı sonrası toplanma alanınızı belirleyin.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-bold">Planlama Puanı:</span>
            <span className="text-base font-extrabold text-emerald-400">
              {evaluation.score} / 30
            </span>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setTab('home');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition shrink-0 cursor-pointer ${
              tab === 'home'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>1. Ev İçi Krokisi (Çök-Kapan-Tutun)</span>
            {safeZoneId && <span className="text-[10px]">✓</span>}
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setTab('neighborhood');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition shrink-0 cursor-pointer ${
              tab === 'neighborhood'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>2. Mahalle Krokisi (Toplanma Alanı)</span>
            {meetingPointId && <span className="text-[10px]">✓</span>}
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setTab('comm');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition shrink-0 cursor-pointer ${
              tab === 'comm'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>3. İletişim Protokolü</span>
            {commPlanId && <span className="text-[10px]">✓</span>}
          </button>
        </div>
      </div>

      {/* TAB 1: Ev İçi Krokisi */}
      {tab === 'home' && (
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-6 mb-6 shadow-2xl">
          <div className="max-w-2xl mx-auto mb-4 text-center">
            <span className="text-xs font-black uppercase tracking-wider text-amber-400 block mb-1">
              Ev Planı & Sarsıntı Anı Davranışı
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Sarsıntı başladığında ev içinde nereye sığınmalısınız?
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Deprem anında panikle merdivenlere ve kapıya koşulmaz! Sarsıntı anında sağlam bir cismin yanında pozisyon alınmalıdır.
            </p>
          </div>

          {/* Interactive House Blueprint SVG */}
          <div className="relative max-w-3xl mx-auto aspect-[16/10] bg-slate-900 border-2 border-slate-700 rounded-2xl overflow-hidden mb-6 p-4">
            <svg className="w-full h-full" viewBox="0 0 800 500">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.5" />
                </pattern>
              </defs>

              {/* Grid Background */}
              <rect width="800" height="500" fill="#0f172a" />
              <rect width="800" height="500" fill="url(#grid)" />

              {/* Outer Walls */}
              <rect x="50" y="40" width="700" height="420" fill="none" stroke="#64748b" strokeWidth="6" rx="4" />

              {/* Rooms Partitions */}
              {/* Bedroom 1 (Top Left) */}
              <rect x="50" y="40" width="300" height="200" fill="#1e293b" fillOpacity="0.4" stroke="#475569" strokeWidth="3" />
              <text x="70" y="70" fill="#94a3b8" fontSize="12" fontWeight="bold">Yatak Odası</text>

              {/* Living Room (Bottom Left & Middle) */}
              <rect x="50" y="240" width="460" height="220" fill="#1e293b" fillOpacity="0.3" stroke="#475569" strokeWidth="3" />
              <text x="70" y="270" fill="#94a3b8" fontSize="12" fontWeight="bold">Salon & Oturma Odası</text>

              {/* Kitchen (Top Right) */}
              <rect x="350" y="40" width="230" height="200" fill="#1e293b" fillOpacity="0.4" stroke="#475569" strokeWidth="3" />
              <text x="370" y="70" fill="#94a3b8" fontSize="12" fontWeight="bold">Mutfak</text>

              {/* Corridor & Entrance Hallway (Right) */}
              <rect x="580" y="40" width="170" height="420" fill="#0f172a" stroke="#475569" strokeWidth="3" />
              <text x="600" y="70" fill="#94a3b8" fontSize="12" fontWeight="bold">Antre / Giriş</text>

              {/* Main Exit Door */}
              <rect x="735" y="220" width="15" height="70" fill="#10b981" />
              <text x="720" y="260" fill="#10b981" fontSize="11" fontWeight="black" textAnchor="end">
                ANA ÇIKIŞ KAPISI →
              </text>

              {/* Elevator representation (in building core near entrance) */}
              <rect x="610" y="310" width="110" height="90" rx="4" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
              <text x="665" y="340" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">
                ASANSÖR KABİNİ
              </text>
              <text x="665" y="360" fill="#ef4444" fontSize="18" textAnchor="middle">🛗</text>

              {/* Balcony (Far Left Top) */}
              <rect x="20" y="80" width="30" height="100" fill="#3b0764" stroke="#c084fc" strokeWidth="2" />
              <text x="35" y="135" fill="#e9d5ff" fontSize="9" fontWeight="bold" textAnchor="middle" transform="rotate(-90 35 135)">
                BALKON
              </text>

              {/* Heavy sturdy dining table in Living room */}
              <rect x="180" y="310" width="160" height="80" rx="6" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" />
              <text x="260" y="345" fill="#93c5fd" fontSize="11" fontWeight="bold" textAnchor="middle">
                Sağlam Masa & Koltuk Yanı
              </text>
              <text x="260" y="365" fill="#60a5fa" fontSize="10" textAnchor="middle">
                (İç Duvar Yanı)
              </text>

              {/* Windows */}
              <rect x="120" y="36" width="100" height="6" fill="#38bdf8" />
              <rect x="420" y="36" width="80" height="6" fill="#38bdf8" />
              <rect x="140" y="458" width="120" height="6" fill="#38bdf8" />
            </svg>

            {/* Interactive Decision Badges over the Blueprint */}
            <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
              {/* Option A: Table / Sturdy couch (Correct) */}
              <div className="absolute left-[26%] top-[64%] pointer-events-auto">
                <button
                  type="button"
                  onClick={() => handleSelectSafeZone('table_crouch')}
                  className={`px-3 py-1.5 rounded-xl font-extrabold text-xs shadow-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                    safeZoneId === 'table_crouch'
                      ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-400/40 scale-105'
                      : 'bg-slate-900/90 text-white border-2 border-emerald-400 hover:scale-105'
                  }`}
                >
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Burayı Seç: Masa Yanı (Çök-Kapan-Tutun)</span>
                </button>
              </div>

              {/* Option B: Elevator (Dangerous) */}
              <div className="absolute right-[12%] bottom-[20%] pointer-events-auto">
                <button
                  type="button"
                  onClick={() => handleSelectSafeZone('elevator')}
                  className={`px-3 py-1.5 rounded-xl font-extrabold text-xs shadow-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                    safeZoneId === 'elevator'
                      ? 'bg-rose-600 text-white ring-4 ring-rose-500/40 scale-105'
                      : 'bg-slate-900/90 text-rose-300 border-2 border-rose-500 hover:scale-105'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Asansöre Koş</span>
                </button>
              </div>

              {/* Option C: Balcony (Dangerous) */}
              <div className="absolute left-[6%] top-[24%] pointer-events-auto">
                <button
                  type="button"
                  onClick={() => handleSelectSafeZone('balcony')}
                  className={`px-3 py-1.5 rounded-xl font-extrabold text-xs shadow-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                    safeZoneId === 'balcony'
                      ? 'bg-rose-600 text-white ring-4 ring-rose-500/40 scale-105'
                      : 'bg-slate-900/90 text-rose-300 border-2 border-rose-500 hover:scale-105'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Balkona Çık</span>
                </button>
              </div>
            </div>
          </div>

          {/* Feedback on safe zone selection */}
          {safeZoneId && (
            <div
              className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed mb-4 ${
                safeZoneId === 'table_crouch'
                  ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-200'
                  : 'bg-rose-950/40 border-rose-700/60 text-rose-200'
              }`}
            >
              <strong className="block font-black mb-1">
                {safeZoneId === 'table_crouch'
                  ? '✓ DOĞRU KARAR: ÇÖK-KAPAN-TUTUN'
                  : '⚠️ TEHLİKELİ DAVRANIŞ!'}
              </strong>
              {safeZoneId === 'table_crouch' &&
                'Sarsıntı anında pencerelerden ve devrilebilecek dolaplardan uzak durarak sağlam masa/koltuk yanında ÇÖK-KAPAN-TUTUN pozisyonu almalısınız. Sarsıntı tamamen durduktan sonra güvenle kapıya yönelinmelidir.'}
              {safeZoneId === 'elevator' &&
                'ASANSÖRE ASLA BİNİLMEZ! Deprem anında elektrik kesintisi yaşanır, kabinler raydan çıkabilir ve saatlerce asansör boşluğunda mahsur kalabilirsiniz.'}
              {safeZoneId === 'balcony' &&
                'BALKONA ASLA ÇIKILMAZ! Balkonlar binanın taşıyıcı sistemi dışında kalan en zayıf çıkıntılarıdır; ilk yıkılan bölümler genellikle balkonlardır.'}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setTab('neighborhood');
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>2. Adıma Geç (Mahalle Krokisi)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: Mahalle Krokisi */}
      {tab === 'neighborhood' && (
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-6 mb-6 shadow-2xl">
          <div className="max-w-2xl mx-auto mb-4 text-center">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400 block mb-1">
              Mahalle Krokisi & Aile Buluşma Noktası
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Sarsıntı bittikten ve bina boşaltıldıktan sonra nerede toplanmalısınız?
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Ailenizle önceden kararlaştıracağınız toplanma alanı güvenli ve açık olmalıdır.
            </p>
          </div>

          {/* Interactive Neighborhood Map SVG */}
          <div className="relative max-w-3xl mx-auto aspect-[16/10] bg-slate-900 border-2 border-slate-700 rounded-2xl overflow-hidden mb-6 p-4">
            <svg className="w-full h-full" viewBox="0 0 800 500">
              {/* Roads / Asphalt */}
              <rect width="800" height="500" fill="#1e293b" />
              {/* Main Road Cross */}
              <rect x="0" y="210" width="800" height="70" fill="#334155" />
              <line x1="0" y1="245" x2="800" y2="245" stroke="#f1f5f9" strokeWidth="2" strokeDasharray="16 16" />
              <rect x="360" y="0" width="70" height="500" fill="#334155" />
              <line x1="395" y1="0" x2="395" y2="500" stroke="#f1f5f9" strokeWidth="2" strokeDasharray="16 16" />

              {/* Block 1 (Top Left): Eviniz & Yüksek Apartmanlar */}
              <rect x="40" y="30" width="280" height="150" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
              <text x="180" y="70" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">
                🏢 Evinizin Bulunduğu Apartman
              </text>
              <text x="180" y="95" fill="#94a3b8" fontSize="11" textAnchor="middle">
                Dar Sokak & Yüksek Cam Cepheler
              </text>

              {/* Block 2 (Top Right): Yüksek Gerilim Hatları & Trafo */}
              <rect x="470" y="30" width="290" height="150" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
              <text x="615" y="70" fill="#fecaca" fontSize="13" fontWeight="bold" textAnchor="middle">
                ⚡ Yüksek Gerilim Hattı & Trafo
              </text>
              <text x="615" y="95" fill="#f87171" fontSize="11" textAnchor="middle">
                Kopma ve Elektrik Çarpma Riski
              </text>

              {/* Block 3 (Bottom Left): Dar Çıkmaz Sokak ve Dükkanlar */}
              <rect x="40" y="310" width="280" height="160" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
              <text x="180" y="360" fill="#cbd5e1" fontSize="12" fontWeight="bold" textAnchor="middle">
                🏪 Dar Sokak & Eski Binalar
              </text>

              {/* Block 4 (Bottom Right): Barış Parkı & Açık Alan (CORRECT) */}
              <rect x="470" y="310" width="290" height="160" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="3" />
              <text x="615" y="350" fill="#a7f3d0" fontSize="14" fontWeight="black" textAnchor="middle">
                🌳 Barış Parkı (Geniş Açık Alan)
              </text>
              <text x="615" y="375" fill="#6ee7b7" fontSize="11" textAnchor="middle">
                Binalardan ve Tellerden Uzak Güvenli Alan
              </text>
            </svg>

            {/* Interactive Decision Badges */}
            <div className="absolute inset-0 pointer-events-none p-4">
              {/* Target 1: Park (Correct) */}
              <div className="absolute right-[10%] bottom-[14%] pointer-events-auto">
                <button
                  type="button"
                  onClick={() => handleSelectMeetingPoint('park_open')}
                  className={`px-4 py-2 rounded-xl font-extrabold text-xs sm:text-sm shadow-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                    meetingPointId === 'park_open'
                      ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-400/40 scale-105'
                      : 'bg-slate-900/90 text-emerald-300 border-2 border-emerald-400 hover:scale-105'
                  }`}
                >
                  <TreePine className="w-4 h-4 text-emerald-400" />
                  <span>Burayı Seç: Barış Parkı (Açık Alan)</span>
                </button>
              </div>

              {/* Target 2: Street under high buildings (Wrong) */}
              <div className="absolute left-[8%] top-[16%] pointer-events-auto">
                <button
                  type="button"
                  onClick={() => handleSelectMeetingPoint('narrow_street')}
                  className={`px-3 py-1.5 rounded-xl font-extrabold text-xs shadow-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                    meetingPointId === 'narrow_street'
                      ? 'bg-rose-600 text-white ring-4 ring-rose-500/40 scale-105'
                      : 'bg-slate-900/90 text-rose-300 border-2 border-rose-500 hover:scale-105'
                  }`}
                >
                  <Building className="w-4 h-4 text-rose-400" />
                  <span>Bina Altı ve Dar Sokak</span>
                </button>
              </div>

              {/* Target 3: Power Lines (Wrong) */}
              <div className="absolute right-[8%] top-[16%] pointer-events-auto">
                <button
                  type="button"
                  onClick={() => handleSelectMeetingPoint('power_lines')}
                  className={`px-3 py-1.5 rounded-xl font-extrabold text-xs shadow-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                    meetingPointId === 'power_lines'
                      ? 'bg-rose-600 text-white ring-4 ring-rose-500/40 scale-105'
                      : 'bg-slate-900/90 text-rose-300 border-2 border-rose-500 hover:scale-105'
                  }`}
                >
                  <Zap className="w-4 h-4 text-rose-400" />
                  <span>Trafo ve Teller Altı</span>
                </button>
              </div>
            </div>
          </div>

          {/* Feedback on meeting point selection */}
          {meetingPointId && (
            <div
              className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed mb-4 ${
                meetingPointId === 'park_open'
                  ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-200'
                  : 'bg-rose-950/40 border-rose-700/60 text-rose-200'
              }`}
            >
              <strong className="block font-black mb-1">
                {meetingPointId === 'park_open'
                  ? '✓ MÜKEMMEL TOPLANMA ALANI SEÇİMİ'
                  : '⚠️ YANLIŞ VE TEHLİKELİ ALAN!'}
              </strong>
              {meetingPointId === 'park_open' &&
                'Geniş parklar ve okul bahçeleri; devrilebilecek binalardan, cam kırıklarından ve elektrik tellerinden uzak olduğu için afet sonrası toplanma alanıdır.'}
              {meetingPointId === 'narrow_street' &&
                'Dar sokaklar ve bina dipleri artçı depremlerde yıkıntı, sıva, klima motoru ve cam düşmesi nedeniyle en ölümcül alanlardır.'}
              {meetingPointId === 'power_lines' &&
                'Yüksek gerilim telleri sarsıntıda koparak yere düşebilir veya yangın çıkarabilir. Kesinlikle uzak durulmalıdır.'}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setTab('comm');
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>3. Adıma Geç (İletişim Protokolü)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: İletişim Protokolü */}
      {tab === 'comm' && (
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-6 mb-6 shadow-2xl">
          <div className="max-w-2xl mx-auto mb-4 text-center">
            <span className="text-xs font-black uppercase tracking-wider text-blue-400 block mb-1">
              Acil Durum İletişim Protokolü
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Afet sonrasında ailenizle nasıl iletişim kuracaksınız?
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Afet bölgesindeki cep telefonu şebekeleri dakikalar içinde aşırı yükten kilitlenebilir.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-6">
            {/* Option 1: Out of city SMS contact (CORRECT) */}
            <button
              type="button"
              onClick={() => handleSelectCommPlan('out_of_city_contact')}
              className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                commPlanId === 'out_of_city_contact'
                  ? 'bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/40 shadow-lg'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold mb-3">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">
                  Şehir Dışı Ortak Akrabaya Kısa SMS Göndermek
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Tüm aile üyelerinin şehir dışındaki tek bir kişiye "Ben iyiyim, parktayım" şeklinde kısa mesaj göndermesi.
                </p>
              </div>
              <div className="mt-3 text-xs font-black text-emerald-400">
                {commPlanId === 'out_of_city_contact' ? '✓ Seçildi' : 'Seç'}
              </div>
            </button>

            {/* Option 2: Continuous voice calls to everyone (WRONG) */}
            <button
              type="button"
              onClick={() => handleSelectCommPlan('call_everyone')}
              className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                commPlanId === 'call_everyone'
                  ? 'bg-rose-950/40 border-rose-500 ring-2 ring-rose-500/40 shadow-lg'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold mb-3">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">
                  Sürekli Telefonla Sesli Aramalar Yapmak
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Şehir içindeki herkesi tek tek arayarak saatlerce telefonda konuşmaya çalışmak.
                </p>
              </div>
              <div className="mt-3 text-xs font-black text-rose-400">
                {commPlanId === 'call_everyone' ? '⚠️ Seçildi (Hatalı)' : 'Seç'}
              </div>
            </button>
          </div>

          {/* Feedback */}
          {commPlanId && (
            <div
              className={`max-w-3xl mx-auto p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed mb-4 ${
                commPlanId === 'out_of_city_contact'
                  ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-200'
                  : 'bg-rose-950/40 border-rose-700/60 text-rose-200'
              }`}
            >
              <strong className="block font-black mb-1">
                {commPlanId === 'out_of_city_contact'
                  ? '✓ DOĞRU AFET İLETİŞİM PROTOKOLÜ'
                  : '⚠️ ŞEBEKEYİ KİLİTLEYEN DAVRANIŞ!'}
              </strong>
              {commPlanId === 'out_of_city_contact' &&
                'Deprem sonrasında yerel şebekeler çökerken şehirlerarası SMS kanalları çalışmaya devam eder. Şehir dışındaki ortak irtibat kişisi tüm ailenin durumunu tek merkezden koordine eder.'}
              {commPlanId === 'call_everyone' &&
                'Sesli aramalar şebekelerin tamamen kilitlenmesine neden olur; ambulans, itfaiye ve AFAD kurtarma ekiplerinin iletişimini engeller.'}
            </div>
          )}
        </div>
      )}

      {/* Mandatory Official Educational Disclaimer */}
      <div className="bg-amber-950/30 border border-amber-500/40 rounded-2xl p-4 mb-6 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 leading-relaxed">
          <strong className="text-amber-300 font-bold block mb-0.5">
            ÖNEMLİ YASAL VE EĞİTSEL UYARI:
          </strong>
          Bu simülasyondaki mahalle ve ev krokisi pedagojik bir eğitim senaryosudur; gerçek bir adres veya resmi tahliye yönlendirmesi değildir. Gerçek afet toplanma alanınızı e-Devlet üzerinden <strong>AFAD "Acil Toplanma Alanı Sorgulama"</strong> hizmetini kullanarak öğreniniz.
        </div>
      </div>

      {/* Action Footer: Complete Simulation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
        <div className="text-xs sm:text-sm text-slate-300 text-center sm:text-left">
          {isAllChosen ? (
            <span className="text-emerald-400 font-bold flex items-center gap-1.5 justify-center sm:justify-start">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Tüm planlama seçimleriniz tamamlandı. Sonuçları görüntüleyebilirsiniz!
            </span>
          ) : (
            <span>Lütfen 3 planlama adımını (Ev, Mahalle, İletişim) tamamlayınız.</span>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            sound.playSuccess();
            onFinishGame();
          }}
          disabled={!isAllChosen}
          className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition cursor-pointer ${
            isAllChosen
              ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-emerald-400 text-slate-950 shadow-lg shadow-emerald-950/40 hover:scale-105 active:scale-95'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <span>GÖREVİ BİTİR VE PUANI GÖR</span>
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </button>
      </div>
    </div>
  );
};
