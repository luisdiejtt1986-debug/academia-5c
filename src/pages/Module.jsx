import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import Cody from "../assets/CodeBank.png";
import { courseData } from "../data/courseData";

import IntroScreen from "../components/module/IntroScreen";
import VideoScreen from "../components/module/VideoScreen";
import ExplanationScreen from "../components/module/ExplanationScreen";
import QuizScreen from "../components/module/QuizScreen";
import SimulatorScreen from "../components/module/SimulatorScreen";
import StorytellingScreen from "../components/module/StorytellingScreen";
import SummaryScreen from "../components/module/SummaryScreen";
import CompletionScreen from "../components/module/CompletionScreen";
import CapitalSimulator from "../components/module/CapitalSimulator";
import CollateralSimulator from "../components/module/CollateralSimulator";
import CondicionesSimulator from "../components/module/CondicionesSimulator";
import CreditConditionsSimulator from "../components/module/CreditConditionsSimulator";

const moduleAccents = ["#1a6bff","#ff9f43","#00c896","#a55eea","#ff4757"];

function Module() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const moduleId = Number(searchParams.get("id"));
  const moduleData = courseData.find((m) => m.id === moduleId);
  const accent = moduleAccents[(moduleId - 1) % moduleAccents.length];

  if (!moduleData) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center"
        style={{ background: "#04152d" }}>
        <div className="text-center p-6">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-black mb-4">Módulo no encontrado</h1>
          <button onClick={() => navigate("/home")}
            className="px-8 py-3 rounded-2xl font-bold text-white"
            style={{ background: "linear-gradient(135deg, #1a6bff, #0a3d99)" }}>
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const [currentScreen, setCurrentScreen] = useState(0);
  const [quizStats, setQuizStats] = useState({ totalQuestions: 0, correctAnswers: 0 });
  const screens = moduleData.screens;
  const current = screens[currentScreen];
  const progress = ((currentScreen + 1) / screens.length) * 100;

  useEffect(() => { setQuizStats({ totalQuestions: 0, correctAnswers: 0 }); }, [moduleId]);

  useEffect(() => {
    const isLastScreen = currentScreen === screens.length - 1;
    const isCompletionScreen = current?.type === "completion";
    if (isLastScreen && isCompletionScreen) {
      const saved = JSON.parse(localStorage.getItem("academia5c_progress") || "{}");
      const accuracy = quizStats.totalQuestions > 0
        ? Math.round((quizStats.correctAnswers / quizStats.totalQuestions) * 100) : 100;
      if (accuracy >= 50) { saved[moduleId] = 100; }
      else { saved[moduleId] = accuracy; }
      localStorage.setItem("academia5c_progress", JSON.stringify(saved));
    }
  }, [currentScreen, current?.type, moduleId, screens.length, quizStats]);

  const handleQuizResult = (totalQ, correctQ) => {
    setQuizStats(prev => ({ totalQuestions: prev.totalQuestions + totalQ, correctAnswers: prev.correctAnswers + correctQ }));
  };

  const handleNext = () => {
    if (currentScreen < screens.length - 1) setCurrentScreen((c) => c + 1);
    else navigate("/home");
  };

  const handlePrevious = () => {
    if (currentScreen > 0) setCurrentScreen((c) => c - 1);
    else navigate("/home");
  };

  const renderScreen = () => {
    switch (current?.type) {
      case "intro": return <IntroScreen data={current} onNext={handleNext} accent={accent} />;
      case "video": return <VideoScreen data={current} onNext={handleNext} accent={accent} />;
      case "explanation": return <ExplanationScreen data={current} onNext={handleNext} accent={accent} />;
      case "quiz": return <QuizScreen data={current} onNext={handleNext} onResult={handleQuizResult} accent={accent} />;
      case "simulator": return <SimulatorScreen data={current} onNext={handleNext} accent={accent} />;
      case "capitalSimulator": return <CapitalSimulator data={current} onNext={handleNext} accent={accent} />;
      case "collateralSimulator": return <CollateralSimulator data={current} onNext={handleNext} accent={accent} />;
      case "conditionsSimulator": return <CondicionesSimulator data={current} onNext={handleNext} accent={accent} />;
	  case "creditConditions": return <CreditConditionsSimulator data={current} onNext={handleNext} accent={accent} />;
      case "storytelling": return <StorytellingScreen data={current} onNext={handleNext} accent={accent} />;
      case "summary": return <SummaryScreen data={current} onNext={handleNext} accent={accent} />;
      case "completion":
        const accuracy = quizStats.totalQuestions > 0
          ? Math.round((quizStats.correctAnswers / quizStats.totalQuestions) * 100) : 100;
        return <CompletionScreen data={current} onContinue={handleNext} accent={accent}
          stats={{ lessons: screens.length, totalQuestions: quizStats.totalQuestions, correctAnswers: quizStats.correctAnswers, accuracy, badge: current.badge }} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen text-white" style={{ background: "linear-gradient(170deg, #04152d 0%, #0a2240 100%)" }}>
      {/* HEADER */}
      <div className="sticky top-0 z-50 border-b border-white/5"
        style={{ background: "rgba(4,21,45,0.95)", backdropFilter: "blur(12px)" }}>
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={handlePrevious}
            className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-lg transition border border-white/10"
            style={{ background: "rgba(255,255,255,0.07)" }}>←</button>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>Módulo {moduleId}</p>
            <h1 className="text-sm font-black truncate" style={{ fontFamily: 'Poppins' }}>{moduleData.title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-blue-300 font-bold">{currentScreen + 1}/{screens.length}</span>
            <img src={Cody} alt="Cody" className="w-50 h-9 object-contain" />
          </div>
        </div>
        {/* PROGRESS BAR */}
        <div className="h-1.5 bg-white/5">
          <motion.div className="h-full rounded-r-full" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}aa)` }}
            initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
        </div>
      </div>

      {/* CONTENT */}
      <AnimatePresence mode="wait">
        <motion.div key={currentScreen}
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Module;
