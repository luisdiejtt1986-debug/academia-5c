import { motion } from "framer-motion";

function ExplanationScreen({ data, onNext, accent = "#1a6bff" }) {
  return (
    <div className="p-5 pb-32">
      <motion.h2 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-black mb-4" style={{ fontFamily: 'Poppins' }}>{data.title}</motion.h2>

      {/* Definition card */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="rounded-2xl p-5 mb-5 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${accent}20, ${accent}08)`, border: `1.5px solid ${accent}40` }}>
        <div className="absolute top-3 right-3 text-3xl opacity-20">💡</div>
        <p className="text-base font-bold leading-relaxed" style={{ color: accent }}>{data.definition}</p>
      </motion.div>

      {/* Tools */}
      <p className="text-xs font-black uppercase tracking-widest text-blue-400 mb-3">Herramientas de análisis</p>
      <div className="space-y-3 mb-6">
        {data.tools?.map((tool, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="rounded-2xl p-4 flex items-center gap-4 border border-white/5"
            style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(8px)" }}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: `${accent}15` }}>
              {tool.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-black text-sm mb-0.5" style={{ color: accent }}>{tool.name}</h4>
              <p className="text-xs text-blue-200 leading-relaxed">{tool.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
        whileTap={{ scale: 0.97 }} onClick={onNext}
        className="w-full py-4 rounded-2xl font-black text-lg text-white"
        style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)` }}>
        Continuar →
      </motion.button>
    </div>
  );
}

export default ExplanationScreen;
