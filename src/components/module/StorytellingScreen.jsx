import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function StorytellingScreen({ data, onNext, accent = "#1a6bff" }) {
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (!selected) return;
    const correct = selected === data.correct;
    setIsCorrect(correct);
    setShowFeedback(true);
    setTimeout(() => onNext(), 2500);
  };

  return (
    <div className="p-5 pb-32">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
        <h2 className="text-2xl font-black" style={{ fontFamily: 'Poppins' }}>{data.title}</h2>
        <p className="text-blue-300 text-sm font-medium mt-1">{data.subtitle}</p>
      </motion.div>

      {/* Cases */}
      <div className="space-y-3 mb-5">
        {data.cases?.map((client, i) => {
          const isSuccess = client.tagType === "success";
          return (
            <motion.div key={i}
              initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="rounded-2xl p-4 border border-white/5"
              style={{ background: isSuccess ? "rgba(0,200,150,0.07)" : "rgba(255,71,87,0.07)" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: isSuccess ? "rgba(0,200,150,0.15)" : "rgba(255,71,87,0.15)" }}>
                  {client.avatar}
                </div>
                <div>
                  <h3 className="font-black text-base">{client.name}</h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold"
                    style={{
                      background: isSuccess ? "rgba(0,200,150,0.15)" : "rgba(255,71,87,0.15)",
                      color: isSuccess ? "#00c896" : "#ff4757"
                    }}>
                    {client.tag}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {client.points?.map((point, j) => (
                  <div key={j} className="flex items-center gap-1.5 text-xs">
                    <span>{point.type === "positive" ? "✅" : "⚠️"}</span>
                    <span style={{ color: point.type === "positive" ? "#86efac" : "#fca5a5" }}>{point.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Question */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        className="rounded-2xl p-4 mb-4 border border-white/10"
        style={{ background: `${accent}12` }}>
        <p className="font-black text-base" style={{ fontFamily: 'Poppins' }}>{data.question}</p>
      </motion.div>

      <div className="space-y-2 mb-4">
        {data.options?.map((opt) => {
          const isSel = selected === opt.id;
          const isCorrectOpt = opt.id === data.correct;
          let border = "rgba(255,255,255,0.08)";
          let bg = "rgba(255,255,255,0.05)";
          if (showFeedback) {
            if (isCorrectOpt) { border = "#00c896"; bg = "rgba(0,200,150,0.12)"; }
            else if (isSel) { border = "#ff4757"; bg = "rgba(255,71,87,0.12)"; }
          } else if (isSel) { border = accent; bg = `${accent}15`; }
          return (
            <button key={opt.id}
              onClick={() => !showFeedback && setSelected(opt.id)}
              className="w-full text-left p-4 rounded-2xl border-2 flex items-center gap-3 transition-all"
              style={{ background: bg, borderColor: border }}>
              <span className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm"
                style={{ background: isSel || (showFeedback && isCorrectOpt) ? border : "rgba(255,255,255,0.1)" }}>
                {opt.id}
              </span>
              <span className="font-bold text-sm">{opt.text}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {showFeedback && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-4 mb-4 border flex items-start gap-3"
            style={{
              background: isCorrect ? "rgba(0,200,150,0.1)" : "rgba(255,71,87,0.1)",
              borderColor: isCorrect ? "#00c896" : "#ff4757"
            }}>
            <span className="text-2xl">{isCorrect ? "🎉" : "⚠️"}</span>
            <div>
              <p className="font-black" style={{ color: isCorrect ? "#00c896" : "#ff4757" }}>
                {isCorrect ? "¡Correcto!" : "Incorrecto"}
              </p>
              <p className="text-xs text-blue-200 mt-0.5 leading-relaxed">{data.feedback}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={handleSubmit} disabled={!selected || showFeedback}
        className="w-full py-4 rounded-2xl font-black text-lg text-white transition-all"
        style={{
          background: selected && !showFeedback ? `linear-gradient(135deg, ${accent}, ${accent}cc)` : "rgba(255,255,255,0.1)",
          opacity: !selected ? 0.5 : 1
        }}>
        {showFeedback ? "Continuando..." : "Entendido"}
      </button>
    </div>
  );
}

export default StorytellingScreen;
