import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import TrophyIcon from "../../assets/trophy.png";
import ConfettiIcon from "../../assets/confetti.png";
import Cody from "../../assets/cody.png";

function CompletionScreen({ data, onContinue, stats, accent = "#1a6bff" }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const moduleId = searchParams.get("id");

  const isExcellent = stats.accuracy >= 80;
  const isLow = stats.accuracy < 50;

  const handleRepeat = () => {
    navigate(`/module?id=${moduleId}`, { replace: true });
    setTimeout(() => window.location.reload(), 100);
  };

  const statusColor = isExcellent ? "#00c896" : isLow ? "#ff4757" : "#ffd93d";
  const statusBg = isExcellent ? "rgba(0,200,150,0.15)" : isLow ? "rgba(255,71,87,0.15)" : "rgba(255,217,61,0.15)";

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center p-5 pb-10 relative overflow-hidden">
      {/* Confetti rain */}
      {isExcellent && [...Array(16)].map((_, i) => (
        <motion.img key={i} src={ConfettiIcon} alt="" className="absolute w-6 h-6 pointer-events-none"
          initial={{ x: Math.random() * 400 - 50, y: -40, rotate: 0, scale: 0.5 }}
          animate={{ y: 900, rotate: 720, scale: 1 }}
          transition={{ duration: 3 + Math.random() * 2, delay: Math.random() * 2, repeat: Infinity, ease: "linear" }} />
      ))}

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${statusColor}, transparent)` }} />

      {/* Header */}
      <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, delay: 0.1 }}
        className="text-center mt-4 mb-6 relative z-10">
        <div className="text-5xl mb-3">
          {isExcellent ? "🌟" : isLow ? "💪" : "✅"}
        </div>
        <h1 className="text-3xl font-black" style={{ fontFamily: 'Poppins' }}>
          {isExcellent ? "¡Excelente!" : isLow ? "¡Necesitas repasar!" : "¡Módulo Completado!"}
        </h1>
        <p className="text-sm text-blue-300 mt-1 font-medium">
          {isExcellent ? "Dominaste este módulo" : isLow ? "Debes repetir para avanzar" : "¡Buen trabajo!"}
        </p>
      </motion.div>

      {/* Trophy + Badge */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="w-full max-w-sm rounded-3xl p-5 mb-5 text-center relative z-10 border"
        style={{ background: statusBg, borderColor: `${statusColor}40` }}>
        <motion.img src={TrophyIcon} alt="Trophy" className="w-24 mx-auto mb-3"
          animate={isExcellent ? { y: [0, -8, 0], rotate: [0, 5, -5, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
        <p className="text-xl font-black mb-0.5" style={{ color: statusColor }}>{stats.badge}</p>
        <p className="text-xs text-blue-300 font-medium">Has desbloqueado una nueva insignia</p>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="grid grid-cols-3 gap-3 w-full max-w-sm mb-5 relative z-10">
        {[
          { emoji: "📚", value: `${stats.lessons}/${stats.lessons}`, label: "Lecciones" },
          { emoji: "❓", value: `${stats.correctAnswers}/${stats.totalQuestions}`, label: "Respuestas" },
          { emoji: "⭐", value: `${stats.accuracy}%`, label: "Precisión", highlight: true },
        ].map((stat, i) => (
          <motion.div key={i}
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
            className="rounded-2xl p-3 text-center border"
            style={{
              background: stat.highlight ? statusBg : "rgba(255,255,255,0.05)",
              borderColor: stat.highlight ? `${statusColor}50` : "rgba(255,255,255,0.08)"
            }}>
            <div className="text-xl mb-1">{stat.emoji}</div>
            <div className="font-black text-base" style={{ color: stat.highlight ? statusColor : "white" }}>{stat.value}</div>
            <div className="text-blue-400 text-xs font-medium">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Cody motivational */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
        className="flex items-center gap-3 w-full max-w-sm rounded-2xl p-3 mb-6 relative z-10 border border-white/5"
        style={{ background: "rgba(255,255,255,0.05)" }}>
        <img src={Cody} alt="Cody" className="w-12 flex-shrink-0" />
        <p className="text-xs text-blue-200 leading-relaxed font-medium italic">
          {isExcellent ? '"¡Increíble análisis! Eres un verdadero profesional del crédito."'
            : isLow ? '"¡No te rindas! Repasa el módulo y lo lograrás."'
            : '"¡Bien hecho! Sigue aprendiendo para dominar el análisis crediticio."'}
        </p>
      </motion.div>

      {/* Buttons */}
      <div className="w-full max-w-sm space-y-3 relative z-10">
        {isLow ? (
          <>
            <motion.button initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
              whileTap={{ scale: 0.97 }} onClick={handleRepeat}
              className="w-full py-4 rounded-2xl font-black text-lg text-white"
              style={{ background: "linear-gradient(135deg, #ff4757, #c0392b)" }}>
              🔄 Repetir módulo
            </motion.button>
            <motion.button initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
              whileTap={{ scale: 0.97 }} onClick={onContinue}
              className="w-full py-3 rounded-2xl font-bold text-sm border border-white/10"
              style={{ background: "rgba(255,255,255,0.05)" }}>
              Volver al inicio (sin guardar)
            </motion.button>
          </>
        ) : (
          <motion.button initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            whileTap={{ scale: 0.97 }} onClick={onContinue}
            className="w-full py-4 rounded-2xl font-black text-lg text-white"
            style={{ background: `linear-gradient(135deg, ${statusColor}, ${statusColor}aa)` }}>
            {isExcellent ? "🎉 ¡Continuar!" : "✅ Volver al inicio"}
          </motion.button>
        )}
      </div>
    </div>
  );
}

export default CompletionScreen;
