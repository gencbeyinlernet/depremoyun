/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { sound } from '../utils/audio';
import {
  MessageSquare,
  Sparkles,
  X,
  Send,
  Bot,
  User,
  PenTool,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  FileText,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';

interface AiAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: 'assistant' | 'user';
  text: string;
}

export const AiAssistantDrawer: React.FC<AiAssistantDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'creative'>('chat');

  // Chat State
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: 'Merhaba! Ben Kurtaran Asistan. Deprem ve afet öncesi hazırlık, evdeki tehlikeleri sabitleme, 72 saatlik çanta ve aile buluşma planı hakkında merak ettiğiniz her şeyi sorabilirsiniz. Size nasıl yardımcı olabilirim?',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Creative Studio State
  const [creativeType, setCreativeType] = useState<'poem' | 'card' | 'scenario' | 'slogan'>('poem');
  const [creativePrompt, setCreativePrompt] = useState('');
  const [creativeResult, setCreativeResult] = useState('');
  const [isCreativeLoading, setIsCreativeLoading] = useState(false);
  const [creativeCopied, setCreativeCopied] = useState(false);

  // Quick Chat Suggestion Chips
  const quickQuestions = [
    'Sarsıntı anında ne yapmalıyım?',
    'Afet çantasında mutlaka neler olmalı?',
    'Eşyaları duvara sabitlemek neden kritik?',
    'Evcil hayvanlar için afet çantası?',
    'Toplanma alanımı nasıl sorgularım?',
  ];

  // Intelligent fallbacks for static hosting environments (e.g., GitHub Pages)
  const getStaticFallbackReply = (userMsg: string): string => {
    const lower = userMsg.toLowerCase();
    if (lower.includes('toplanma') || lower.includes('nerede') || lower.includes('öğrenirim') || lower.includes('buluşma')) {
      return 'Afet toplanma alanınızı e-Devlet kapısı üzerinden AFAD "Acil Toplanma Alanı Sorgulama" hizmetiyle kolayca öğrenebilirsiniz. İkametgahınıza en yakın geniş park ve okul bahçeleri belirlenmiştir.';
    }
    if (lower.includes('çanta') || lower.includes('canta')) {
      return 'Afet çantanızda ilk 72 saat için kişi başı günlük en az 1.5 litre su, düdük, pilli fener ve yedek piller, ilk yardım seti, dayanıklı konserve, önemli evrak fotokopileri ve reçeteli ilaçlar mutlaka bulunmalıdır. Mum ve çakmak gibi açık alevli eşyalardan gaz kaçağı riski nedeniyle kaçınılmalıdır.';
    }
    if (lower.includes('sabitle') || lower.includes('tehlike') || lower.includes('dolap')) {
      return 'Depremlerde yaralanmaların %50\'den fazlası devrilen eşyalardan kaynaklanır. Kitaplıkları, gardıropları ve televizyonları L-braket ve dübellerle duvara sabitlemeli; yatak başlarındaki ağır tabloları kaldırmalı ve çıkış kapısının önünü daima açık tutmalıyız.';
    }
    if (lower.includes('anında') || lower.includes('sırasında') || lower.includes('deprem anı')) {
      return 'Deprem sarsıntısı anında panikle koşulmaz, merdivenlere ve asansörlere gidilmez! Sağlam bir masa veya koltuk yanında ÇÖK-KAPAN-TUTUN pozisyonu alınır. Sarsıntı tamamen durduktan sonra gaz/elektrik vanaları kapatılıp güvenle bina terk edilir.';
    }
    if (lower.includes('hayvan') || lower.includes('kedi') || lower.includes('köpek')) {
      return 'Evcil hayvanlarınız için afet çantasına en az 3-5 günlük kuru mama, taşınabilir su kabı, aşı kartı, tasma ve güvenli bir taşıma çantası/kutusu koymayı unutmayınız.';
    }
    return 'Deprem öncesinde evinizdeki dolapları L-demir ile sabitlemek, 72 saatlik afet çantası hazırlamak ve ailenizle açık bir toplanma alanı belirlemek hayat kurtarır!';
  };

  const getStaticFallbackCreative = (type: string): string => {
    if (type === 'poem') {
      return `Deprem gelmeden önce,\nTedbirini al evde.\nDolapları duvara,\nSağlamca sabitle.\n\nÇantada su ve fener,\nDüdük sesini iletir.\nHazırlıklı bir yürek,\nKorkuyu bilgiyle yener!`;
    }
    if (type === 'card') {
      return `📋 AİLE ACİL DURUM VE AFET PLANI\n--------------------------------\n• Ev İçi Güvenli Alan: Yatak odası ve salondaki sağlam baza/koltuk yanı (Çök-Kapan-Tutun)\n• Çıkış Güzergahı: Koridor ve kapı önü daima engelsiz\n• Afet Çantası Yeri: Giriş kapısına yakın, kolay erişilebilir dolap\n• Mahalle Buluşma Noktası: Barış Parkı Açık Alanı (Binalardan ve elektrik tellerinden uzak)\n• Şehir Dışı İletişim Kişisi: Ankara'daki Teyze (Yalnızca acil SMS ile)`;
    }
    if (type === 'scenario') {
      return `🚨 SENARYO: Akşam evde otururken deprem sarsıntısı başladı!\n1. Adım: Panikle kapıya koşmayın, asansöre yönelmeyin.\n2. Adım: Sağlam bir masa veya koltuk yanında başınızı koruyarak ÇÖK-KAPAN-TUTUN yapın.\n3. Adım: Sarsıntı bittiğinde gaz vanasını ve şalteri kapatın, afet çantanızı alarak açık alana çıkın.`;
    }
    return `1. "Afet gelmeden 60 saniye, hayat boyu emniyet!"\n2. "Dolabı sabitle duvara, güvenle bak yarına!"\n3. "Çantan hazır olsun, aklın huzurla dolsun!"\n4. "Sarsıntıda Çök-Kapan-Tutun, panikten değil bilgiden güç bul!"\n5. "Önce tedbir, sonra huzur: Afet bilinci gelecektir!"`;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage.trim();
    if (!text || isChatLoading) return;

    sound.playClick();
    const newMessages: Message[] = [...messages, { role: 'user', text }];
    setMessages(newMessages);
    if (!textToSend) setInputMessage('');
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      if (!res.ok) throw new Error('API_UNAVAILABLE');
      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', text: data.reply || getStaticFallbackReply(text) }]);
      sound.playSuccess();
    } catch (err) {
      // Fallback for static hosts (GitHub Pages) or offline network
      setMessages([...newMessages, { role: 'assistant', text: getStaticFallbackReply(text) }]);
      sound.playSuccess();
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleGenerateCreative = async () => {
    if (isCreativeLoading) return;
    sound.playClick();
    setIsCreativeLoading(true);
    setCreativeResult('');

    try {
      const res = await fetch('/api/creative', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: creativeType,
          prompt: creativePrompt || undefined,
        }),
      });
      if (!res.ok) throw new Error('API_UNAVAILABLE');
      const data = await res.json();
      setCreativeResult(data.result || getStaticFallbackCreative(creativeType));
      sound.playSuccess();
    } catch (err) {
      // Fallback for static hosts (GitHub Pages) or offline network
      setCreativeResult(getStaticFallbackCreative(creativeType));
      sound.playSuccess();
    } finally {
      setIsCreativeLoading(false);
    }
  };

  const handleCopyCreative = () => {
    if (!creativeResult) return;
    sound.playClick();
    navigator.clipboard.writeText(creativeResult).then(() => {
      setCreativeCopied(true);
      setTimeout(() => setCreativeCopied(false), 2000);
    });
  };

  if (!isOpen) return null;

  return (
    <aside
      aria-label="Kurtaran Asistan ve Yaratıcı Atölye"
      className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-250 select-text"
    >
      {/* Drawer Header */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-slate-950 shadow-md shadow-rose-950/40">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-white leading-tight">
              Kurtaran Asistan & Atölye
            </h3>
            <span className="text-xs text-amber-400 font-medium">
              Yapay Zeka Destekli Afet Danışmanı
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="p-2 bg-slate-950/60 border-b border-slate-800 flex gap-2">
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setActiveTab('chat');
          }}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'chat'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Sohbet & Sorular</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setActiveTab('creative');
          }}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'creative'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Yapay Zeka Atölyesi</span>
        </button>
      </div>

      {/* TAB 1: Chat Content */}
      {activeTab === 'chat' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Quick chips */}
          <div className="p-3 bg-slate-900 border-b border-slate-800/80 overflow-x-auto whitespace-nowrap flex gap-1.5 pb-2">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(q)}
                className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-[11px] font-medium text-slate-300 border border-slate-700/60 transition shrink-0 cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Messages stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[85%] text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                    m.role === 'user'
                      ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none'
                      : 'bg-slate-800 border border-slate-700/80 text-slate-200 rounded-tl-none'
                  }`}
                >
                  {m.text}
                </div>
                {m.role === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-700 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isChatLoading && (
              <div className="flex gap-2.5 items-center text-xs text-slate-400">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700 text-slate-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce delay-100" />
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce delay-200" />
                  <span className="ml-1 text-[11px]">Kurtaran Asistan yanıtlıyor...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input field */}
          <div className="p-3 bg-slate-950 border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Afet hazırlığı hakkında bir soru yazın..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isChatLoading}
                aria-label="Gönder"
                className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 text-slate-950 disabled:text-slate-600 transition cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 2: Creative Studio Content */}
      {activeTab === 'creative' && (
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-400 block mb-1">
              Yapay Zeka ile Dijital İçerik Üretimi
            </span>
            <p className="text-xs text-slate-300">
              Okulunuz, aileniz veya sınıfınız için afet bilinci şiirleri, acil durum kartları ve sloganlar oluşturun.
            </p>
          </div>

          {/* Type Selector */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setCreativeType('poem')}
              className={`p-2.5 rounded-xl border text-left text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                creativeType === 'poem'
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                  : 'bg-slate-800/60 border-slate-800 text-slate-400'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Afet Şiiri & Manisi</span>
            </button>

            <button
              type="button"
              onClick={() => setCreativeType('card')}
              className={`p-2.5 rounded-xl border text-left text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                creativeType === 'card'
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                  : 'bg-slate-800/60 border-slate-800 text-slate-400'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Aile Plan Kartı</span>
            </button>

            <button
              type="button"
              onClick={() => setCreativeType('scenario')}
              className={`p-2.5 rounded-xl border text-left text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                creativeType === 'scenario'
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                  : 'bg-slate-800/60 border-slate-800 text-slate-400'
              }`}
            >
              <Lightbulb className="w-4 h-4" />
              <span>Tatbikat Senaryosu</span>
            </button>

            <button
              type="button"
              onClick={() => setCreativeType('slogan')}
              className={`p-2.5 rounded-xl border text-left text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                creativeType === 'slogan'
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                  : 'bg-slate-800/60 border-slate-800 text-slate-400'
              }`}
            >
              <PenTool className="w-4 h-4" />
              <span>5 Vurucu Slogan</span>
            </button>
          </div>

          {/* Custom prompt detail */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">
              Özel Detay veya İsim (İsteğe Bağlı)
            </label>
            <input
              type="text"
              value={creativePrompt}
              onChange={(e) => setCreativePrompt(e.target.value)}
              placeholder="Ör: '4. sınıf öğrencileri için' veya 'Yılmaz Ailesi için'..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Generate Button */}
          <button
            type="button"
            onClick={handleGenerateCreative}
            disabled={isCreativeLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-rose-950/40 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            {isCreativeLoading ? (
              <span>Yapay Zeka Hazırlıyor...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>İçeriği Üret</span>
              </>
            )}
          </button>

          {/* Generated Result Box */}
          {creativeResult && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <span className="text-xs font-bold text-amber-400">Üretilen İçerik</span>
                <button
                  type="button"
                  onClick={handleCopyCreative}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1 transition"
                >
                  {creativeCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{creativeCopied ? 'Kopyalandı!' : 'Kopyala'}</span>
                </button>
              </div>

              <div className="text-xs leading-relaxed text-slate-200 whitespace-pre-line font-mono bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                {creativeResult}
              </div>
            </div>
          )}
        </div>
      )}
    </aside>
  );
};
