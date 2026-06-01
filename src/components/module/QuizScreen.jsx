import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

function QuizScreen({ data, onNext, onResult, accent = "#1a6bff" }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const correctCountRef = useRef(0);

  const question = data.questions[currentQuestion];
  const isLastQuestion = currentQuestion === data.questions.length - 1;
  const isCorrect = selectedAnswer === question.correct;

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    if (selectedAnswer === question.correct) correctCountRef.current += 1;
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      if (onResult) onResult(data.questions.length, correctCountRef.current);
      onNext();
    } else {
      setCurrentQuestion(p => p + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div className="p-5 pb-32">
      {/* Progress pills */}
      <div className="flex items-center gap-1.5 mb-5">
        {data.questions.map((_, i) => (
          <div key={i} className="flex-1 h-2 rounded-full transition-all"
            style={{
              background: i < currentQuestion ? "#00c896"
                : i === currentQuestion ? accent
                : "rgba(255,255,255,0.1)"
            }} />
        ))}
      </div>

      <motion.div key={`q-${currentQuestion}`}
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider"
            style={{ color: accent }}>Pregunta {currentQuestion + 1}</span>
          <span className="text-xs text-blue-500">de {data.questions.length}</span>
        </div>
        <h2 className="text-xl font-black mb-5 leading-snug" style={{ fontFamily: 'Poppins' }}>
          {question.q}
        </h2>
      </motion.div>

      <div className="space-y-3 mb-5">
        {question.options.map((opt, i) => {
          const isSelected = selectedAnswer === i;
          const isCorrectOpt = i === question.correct;
          let bg = "rgba(255,255,255,0.05)";
          let border = "rgba(255,255,255,0.08)";
          let textColor = "white";
          if (showFeedback) {
            if (isCorrectOpt) { bg = "rgba(0,200,150,0.15)"; border = "#00c896"; textColor = "#00c896"; }
            else if (isSelected && !isCorrectOpt) { bg = "rgba(255,71,87,0.15)"; border = "#ff4757"; textColor = "#ff7086"; }
          } else if (isSelected) {
            bg = `${accent}20`; border = accent;
          }
          return (
            <motion.button key={i}
              whileTap={!showFeedback ? { scale: 0.98 } : {}}
              onClick={() => !showFeedback && setSelectedAnswer(i)}
              className="w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-3"
              style={{ background: bg, borderColor: border, color: textColor }}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0"
                style={{ background: isSelected || (showFeedback && isCorrectOpt) ? border : "rgba(255,255,255,0.1)", color: isSelected || (showFeedback && isCorrectOpt) ? "white" : "rgba(255,255,255,0.6)" }}>
                {showFeedback && isCorrectOpt ? "✓" : showFeedback && isSelected && !isCorrectOpt ? "✗" : optionLabels[i]}
              </div>
              <span className="font-bold text-sm leading-snug">{opt}</span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {showFeedback && (
          <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl p-4 mb-5 border flex items-start gap-3"
            style={{
              background: isCorrect ? "rgba(0,200,150,0.1)" : "rgba(255,71,87,0.1)",
              borderColor: isCorrect ? "rgba(0,200,150,0.4)" : "rgba(255,71,87,0.4)"
            }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: isCorrect ? "rgba(0,200,150,0.2)" : "rgba(255,71,87,0.2)" }}>
              {isCorrect ? "🎉" : "💡"}
            </div>
            <div>
              <p className="font-black mb-1" style={{ color: isCorrect ? "#00c896" : "#ff7086" }}>
                {isCorrect ? "¡Correcto!" : "Incorrecto"}
              </p>
              <p className="text-xs text-blue-200 leading-relaxed">{question.feedback}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        whileTap={{ scale: 0.97 }}
        onClick={showFeedback ? handleNext : handleSubmit}
        disabled={selectedAnswer === null && !showFeedback}
        className="w-full py-4 rounded-2xl font-black text-lg text-white transition-all"
        style={{
          background: selectedAnswer !== null || showFeedback
            ? `linear-gradient(135deg, ${accent}, ${accent}cc)`
            : "rgba(255,255,255,0.1)",
          opacity: selectedAnswer === null && !showFeedback ? 0.5 : 1
        }}>
        {showFeedback ? (isLastQuestion ? "📊 Ver resultados" : "Siguiente pregunta →") : "Enviar respuesta"}
      </motion.button>
    </div>
  );
}

export default QuizScreen;
