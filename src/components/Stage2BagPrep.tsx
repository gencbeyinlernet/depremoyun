/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BAG_ITEMS_DATA, BagItem, evaluateBagSelection } from '../game/rules';
import { sound } from '../utils/audio';
import {
  Briefcase,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Plus,
  Trash2,
  HelpCircle,
  Droplets,
  Volume2,
  Flashlight,
  Cross,
  FileText,
  UtensilsCrossed,
  Flame,
  Gamepad2,
  Book,
  Coffee,
  Info,
} from 'lucide-react';

interface Stage2BagPrepProps {
  selectedItems: string[];
  onToggleItem: (id: string) => void;
  onNextStage: () => void;
}

export const Stage2BagPrep: React.FC<Stage2BagPrepProps> = ({
  selectedItems,
  onToggleItem,
  onNextStage,
}) => {
  const [activeFeedback, setActiveFeedback] = useState<{
    item: BagItem;
    isAdding: boolean;
  } | null>(null);

  const selectedSet = new Set(selectedItems);
  const evaluation = evaluateBagSelection(selectedItems);

  const getItemIcon = (id: string) => {
    switch (id) {
      case 'water':
        return <Droplets className="w-5 h-5 text-sky-400" />;
      case 'whistle':
        return <Volume2 className="w-5 h-5 text-amber-400" />;
      case 'flashlight':
        return <Flashlight className="w-5 h-5 text-yellow-400" />;
      case 'firstaid':
        return <Cross className="w-5 h-5 text-rose-400" />;
      case 'documents':
        return <FileText className="w-5 h-5 text-blue-400" />;
      case 'food':
        return <UtensilsCrossed className="w-5 h-5 text-emerald-400" />;
      case 'candle':
        return <Flame className="w-5 h-5 text-orange-400" />;
      case 'gameconsole':
        return <Gamepad2 className="w-5 h-5 text-purple-400" />;
      case 'encyclopedia':
        return <Book className="w-5 h-5 text-indigo-400" />;
      case 'porcelain':
        return <Coffee className="w-5 h-5 text-pink-400" />;
      default:
        return <Briefcase className="w-5 h-5 text-slate-400" />;
    }
  };

  const handleItemClick = (item: BagItem) => {
    const isAdding = !selectedSet.has(item.id);
    if (isAdding) {
      if (item.isEssential) {
        sound.playBagDrop();
      } else {
        sound.playWarning();
      }
    } else {
      sound.playClick();
    }
    setActiveFeedback({ item, isAdding });
    onToggleItem(item.id);
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropOnBag = (e: React.DragEvent) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain');
    if (itemId && !selectedSet.has(itemId)) {
      const item = BAG_ITEMS_DATA.find((i) => i.id === itemId);
      if (item) {
        handleItemClick(item);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-5 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs uppercase tracking-wider border border-amber-500/30">
                2. Bölüm
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                72 Saatlik Afet Çantası Hazırlığı
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Verilen 12 eşya arasından ilk 72 saatte hayatınızı kurtaracak 6 temel eşyayı çantaya ekleyin; gereksiz yükleri eleyin.
            </p>
          </div>

          {/* Touchscreen hint */}
          <div className="text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 shrink-0">
            💡 Kartlara dokunarak veya çantaya sürükleyerek ekleyin.
          </div>
        </div>

        {/* Live Status Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3 pt-3 border-t border-slate-800/80">
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Hayati Eşyalar</span>
            <span className="text-base font-extrabold text-emerald-400">
              {evaluation.essentialCount} / 6
            </span>
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Hatalı / Gereksiz</span>
            <span className={`text-base font-extrabold ${evaluation.wrongCount > 0 ? 'text-rose-400' : 'text-slate-400'}`}>
              {evaluation.wrongCount} adet
            </span>
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Çanta Uygunluğu</span>
            <span className="text-base font-extrabold text-amber-400">
              {evaluation.score} / 35 Puan
            </span>
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Durum</span>
            <span className={`text-xs font-black ${evaluation.isPassing ? 'text-emerald-400' : 'text-amber-400'}`}>
              {evaluation.isPassing ? '✓ Hazır ve Dengeli' : 'Eksikler Var'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Layout: 12 Item Cards Grid + Bag Drop Zone */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* Left: 12 Item Cards (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
              Mevcut Eşya Kartları (12 Adet)
            </h3>
            <span className="text-xs text-slate-400 font-medium">Dokunarak veya sürükleyerek ekle</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {BAG_ITEMS_DATA.map((item) => {
              const inBag = selectedSet.has(item.id);
              return (
                <div
                  key={item.id}
                  draggable={!inBag}
                  onDragStart={(e) => handleDragStart(e, item.id)}
                  onClick={() => handleItemClick(item)}
                  className={`p-3.5 rounded-2xl border text-left transition-all select-none cursor-pointer flex flex-col justify-between ${
                    inBag
                      ? 'bg-slate-900/40 border-slate-800 opacity-60'
                      : 'bg-slate-900 border-slate-800 hover:border-amber-500/60 hover:bg-slate-850 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-slate-800 border border-slate-700/60 shrink-0">
                        {getItemIcon(item.id)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white leading-tight">{item.name}</h4>
                        <span className="text-[11px] text-slate-400 block mt-0.5">{item.weightLabel}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      {inBag ? 'Çantada bulunuyor' : 'Çantaya ekle'}
                    </span>
                    <button
                      type="button"
                      aria-label={`${item.name} eşyasını ${inBag ? 'çıkar' : 'ekle'}`}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                        inBag
                          ? 'bg-rose-950/60 text-rose-300 border border-rose-800/40 hover:bg-rose-900/60'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500 hover:text-slate-950'
                      }`}
                    >
                      {inBag ? (
                        <>
                          <Trash2 className="w-3 h-3" />
                          <span>Çıkar</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3" />
                          <span>Ekle</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: The Bag Area (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div
            onDragOver={handleDragOver}
            onDrop={handleDropOnBag}
            className={`bg-gradient-to-b from-slate-900 to-slate-950 border-2 rounded-3xl p-5 flex flex-col flex-1 shadow-2xl transition-all ${
              selectedItems.length > 0 ? 'border-amber-500/50' : 'border-dashed border-slate-700'
            }`}
          >
            {/* Bag Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  🎒
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">Afet & Acil Durum Çantam</h3>
                  <span className="text-xs text-slate-400">İlk 72 Saatlik Hayatta Kalma</span>
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-800 text-amber-400">
                {selectedItems.length} Eşya
              </span>
            </div>

            {/* Bag Contents List */}
            <div className="flex-1 min-h-[220px] py-4 space-y-2 overflow-y-auto max-h-[360px]">
              {selectedItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                  <Briefcase className="w-12 h-12 mb-3 stroke-[1.5] text-slate-600" />
                  <p className="text-sm font-semibold text-slate-400">Çanta henüz boş</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Soldaki eşyalardan su, düdük, fener gibi hayati olanları tıklayarak ekleyin.
                  </p>
                </div>
              ) : (
                selectedItems.map((id) => {
                  const item = BAG_ITEMS_DATA.find((i) => i.id === id);
                  if (!item) return null;
                  return (
                    <div
                      key={id}
                      className={`p-2.5 rounded-xl border flex items-center justify-between transition ${
                        item.isEssential
                          ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-100'
                          : 'bg-rose-950/30 border-rose-800/40 text-rose-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {getItemIcon(item.id)}
                        <div>
                          <span className="text-xs font-bold block">{item.name}</span>
                          <span className="text-[10px] text-slate-400">
                            {item.isEssential ? '✓ Hayati İhtiyaç' : '⚠️ Gereksiz / Ağır'}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleItemClick(item)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
                        title="Çantadan Çıkar"
                        aria-label={`${item.name} eşyasını çantadan çıkar`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bag bottom tips */}
            <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Tavsiye:</strong> Çantanızı çıkış kapısına yakın, herkesin bildiği ve kolay erişilebilir bir yerde saklayınız.
              </span>
            </div>
          </div>

          {/* Educational Real-time Feedback Card */}
          {activeFeedback && (
            <div
              className={`p-4 rounded-2xl border transition-all animate-in fade-in duration-200 ${
                activeFeedback.item.isEssential
                  ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-200'
                  : 'bg-rose-950/50 border-rose-700/60 text-rose-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {activeFeedback.item.isEssential ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <h4 className="text-xs font-black uppercase tracking-wider">
                  {activeFeedback.item.isEssential ? 'Doğru Seçim (Hayati)' : 'Gereksiz / Riskli Seçim'}
                </h4>
              </div>
              <p className="text-xs leading-relaxed text-slate-200">
                {activeFeedback.item.reason}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer: Proceed to Stage 3 */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
        <div className="text-xs sm:text-sm text-slate-300 text-center sm:text-left">
          {evaluation.isPassing ? (
            <span className="text-emerald-400 font-bold flex items-center gap-1.5 justify-center sm:justify-start">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              Harika! Çantanız 72 saatlik hayati ihtiyaçlar için hazır.
            </span>
          ) : (
            <span>
              Çantanıza en az 5 hayati eşya ekleyip gereksiz yükleri çıkararak devam edebilirsiniz.
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            sound.playSuccess();
            onNextStage();
          }}
          disabled={evaluation.essentialCount < 4}
          className={`w-full sm:w-auto px-6 py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition cursor-pointer ${
            evaluation.essentialCount >= 4
              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <span>3. Bölüme Geç (Buluşma Planı)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
