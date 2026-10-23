/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, HelpCircle, ShieldAlert, Briefcase, MapPin, Touchpad, CheckCircle } from 'lucide-react';
import { sound } from '../utils/audio';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 max-w-xl w-full rounded-3xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">Nasıl Oynanır? (Oyun Kılavuzu)</h3>
            <span className="text-xs text-slate-400">Akıllı Tahta, Tablet ve Bilgisayar Uyumlu</span>
          </div>
        </div>

        <div className="space-y-3.5 text-xs sm:text-sm text-slate-300 max-h-[70vh] overflow-y-auto pr-1">
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5 font-bold">1. Bölüm: Tehlikeyi Bul</strong>
              Odadaki sabitlenmemiş kitaplık, kapı önünü tıkayan kutular, başucundaki ağır tablo gibi risklere tıklayın. Neden tehlikeli olduğunu okuyup "Tehlikeyi Gider / Sabitle" butonuna basarak güvenli hale getirin.
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <Briefcase className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5 font-bold">2. Bölüm: Afet Çantası Hazırla</strong>
              12 eşya arasından su, düdük, pilli fener, evraklar, ilk yardım gibi 72 saatlik hayati eşyaları seçin. Dokunmatik ekranlar için karttaki "Ekle" butonuna basabilir veya doğrudan çantaya sürükleyebilirsiniz.
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5 font-bold">3. Bölüm: Buluşma Planı Kur</strong>
              Ev krokisinde sarsıntı anı için Çök-Kapan-Tutun noktasını seçin (asansör ve balkondan kaçının!). Mahalle krokisinde açık park alanını toplanma yeri olarak belirleyin.
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200">
            <strong className="text-amber-400 block mb-1 font-bold">Önemli Hatırlatma:</strong>
            Deprem sarsıntısı sırasında kesinlikle merdivenlere ve kapılara koşulmaz! Sarsıntı anında sağlam bir mobilya yanında ÇÖK-KAPAN-TUTUN pozisyonu alınmalıdır.
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs cursor-pointer"
          >
            Anladım, Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
