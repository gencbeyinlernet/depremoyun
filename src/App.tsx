/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { IntroScreen } from './components/IntroScreen';
import { Stage1HazardHunt } from './components/Stage1HazardHunt';
import { Stage2BagPrep } from './components/Stage2BagPrep';
import { Stage3Plan } from './components/Stage3Plan';
import { FinalScreen } from './components/FinalScreen';
import { AiAssistantDrawer } from './components/AiAssistantDrawer';
import { HelpModal } from './components/HelpModal';
import { PenguinGuide } from './components/PenguinGuide';
import {
  calculateHazardScore,
  evaluateBagSelection,
  evaluatePlan,
} from './game/rules';
import { sound } from './utils/audio';
import { Bot, Sparkles, AlertCircle } from 'lucide-react';

export default function App() {
  const [currentStage, setCurrentStage] = useState<number>(0);
  const [mode, setMode] = useState<'challenge' | 'free'>('challenge');
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [timeExpiredAlert, setTimeExpiredAlert] = useState<boolean>(false);

  // Gameplay state
  const [fixedHazards, setFixedHazards] = useState<string[]>([]);
  const [selectedBagItems, setSelectedBagItems] = useState<string[]>([]);
  const [safeZoneId, setSafeZoneId] = useState<string | null>(null);
  const [meetingPointId, setMeetingPointId] = useState<string | null>(null);
  const [commPlanId, setCommPlanId] = useState<string | null>(null);

  // Modals / Drawers
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);

  // Check URL query params for ?autostart=1
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') {
        startGame();
      }
    }
  }, []);

  // Timer countdown effect for challenge mode
  useEffect(() => {
    let interval: any = null;
    if (timerActive && mode === 'challenge') {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setTimeExpiredAlert(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, mode]);

  const startGame = () => {
    setCurrentStage(1);
    setTimeLeft(60);
    setTimeExpiredAlert(false);
    setFixedHazards([]);
    setSelectedBagItems([]);
    setSafeZoneId(null);
    setMeetingPointId(null);
    setCommPlanId(null);
    setTimerActive(mode === 'challenge');
  };

  const handleReset = () => {
    setCurrentStage(0);
    setTimerActive(false);
    setTimeLeft(60);
    setTimeExpiredAlert(false);
  };

  const handleToggleSound = () => {
    setSoundEnabled(!soundEnabled);
    sound.enabled = !soundEnabled;
  };

  // Stage 1: Hazard Hunt
  const handleFixHazard = (id: string) => {
    if (!fixedHazards.includes(id)) {
      setFixedHazards([...fixedHazards, id]);
    }
  };

  // Stage 2: Bag item toggle
  const handleToggleBagItem = (id: string) => {
    if (selectedBagItems.includes(id)) {
      setSelectedBagItems(selectedBagItems.filter((i) => i !== id));
    } else {
      setSelectedBagItems([...selectedBagItems, id]);
    }
  };

  // Stage 3 to Final Screen
  const handleFinishGame = () => {
    setTimerActive(false);
    setCurrentStage(4);
  };

  // Dynamic scores
  const hazardScore = calculateHazardScore(fixedHazards.length, 6);
  const bagEvaluation = evaluateBagSelection(selectedBagItems);
  const bagScore = bagEvaluation.score;
  const planScore = evaluatePlan(safeZoneId, meetingPointId, commPlanId).score;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950 pb-20 sm:pb-12">
      {/* Top Navigation */}
      <Navbar
        currentStage={currentStage}
        mode={mode}
        timeLeft={timeLeft}
        onReset={handleReset}
        onToggleSound={handleToggleSound}
        soundEnabled={soundEnabled}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      {/* Time expired soft notification banner (keeps user playing and learning) */}
      {timeExpiredAlert && mode === 'challenge' && currentStage >= 1 && currentStage <= 3 && (
        <div className="bg-amber-500/20 border-b border-amber-500/40 text-amber-200 px-4 py-2 text-center text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            60 saniyelik süre doldu! Ancak oyundan çıkmanıza gerek yok; görevleri tamamlayarak öğrenmeye devam edebilirsiniz.
          </span>
        </div>
      )}

      {/* Main View Router */}
      <main className="flex-1 flex flex-col justify-start">
        {currentStage === 0 && (
          <IntroScreen
            mode={mode}
            setMode={setMode}
            onStart={startGame}
            onOpenAssistant={() => setIsAssistantOpen(true)}
          />
        )}

        {currentStage === 1 && (
          <Stage1HazardHunt
            fixedHazards={fixedHazards}
            onFixHazard={handleFixHazard}
            onNextStage={() => setCurrentStage(2)}
          />
        )}

        {currentStage === 2 && (
          <Stage2BagPrep
            selectedItems={selectedBagItems}
            onToggleItem={handleToggleBagItem}
            onNextStage={() => setCurrentStage(3)}
          />
        )}

        {currentStage === 3 && (
          <Stage3Plan
            safeZoneId={safeZoneId}
            setSafeZoneId={setSafeZoneId}
            meetingPointId={meetingPointId}
            setMeetingPointId={setMeetingPointId}
            commPlanId={commPlanId}
            setCommPlanId={setCommPlanId}
            onFinishGame={handleFinishGame}
          />
        )}

        {currentStage === 4 && (
          <FinalScreen
            hazardScore={hazardScore}
            bagScore={bagScore}
            planScore={planScore}
            timeLeft={timeLeft}
            mode={mode}
            onRestart={handleReset}
            onOpenAssistant={() => setIsAssistantOpen(true)}
          />
        )}
      </main>

      {/* Cheerful Penguin Guide on the Left Side ("Paytak") */}
      <PenguinGuide
        currentStage={currentStage}
        mode={mode}
        fixedHazardsCount={fixedHazards.length}
        bagEssentialsCount={bagEvaluation.essentialCount}
        bagWrongCount={bagEvaluation.wrongCount}
        safeZoneId={safeZoneId}
        meetingPointId={meetingPointId}
        commPlanId={commPlanId}
      />

      {/* Floating AI Assistant Trigger Button (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setIsAssistantOpen(true);
          }}
          aria-label="Kurtaran Asistan'ı Aç"
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-orange-500 text-slate-950 font-black text-xs sm:text-sm shadow-2xl shadow-rose-950/60 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/20"
        >
          <div className="w-6 h-6 rounded-lg bg-slate-950 text-amber-400 flex items-center justify-center font-bold">
            <Bot className="w-4 h-4" />
          </div>
          <span className="hidden sm:inline">Kurtaran Asistan & Atölye</span>
          <span className="sm:hidden">Asistan</span>
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-slate-950" />
          </span>
        </button>
      </div>

      {/* AI Assistant & Creative Studio Drawer */}
      <AiAssistantDrawer
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
      />

      {/* Help Modal */}
      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      {/* Educational Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto space-y-2">
          <p className="font-medium text-slate-400">
            Afet Öncesi 60 Saniye — Etkileşimli Deprem Hazırlık ve Afet Bilinci Web Simülasyonu
          </p>
          <p className="text-[11px] text-slate-600">
            Bu uygulama eğitim ve bilinçlendirme amaçlıdır. Sarsıntı anında ÇÖK-KAPAN-TUTUN pozisyonu alınız. Gerçek toplanma alanınızı e-Devlet AFAD sisteminden sorgulayınız.
          </p>
        </div>
      </footer>
    </div>
  );
}
