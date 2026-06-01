import { motion } from "framer-motion";

function SummaryScreen({ data, onNext, accent = "#1a6bff" }) {
  return (
    <div className="p-5 pb-32">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2"
          style={{ background: `${accent}20`, color: accent }}>
          📋 Resumen del módulo
        </div>
        <h2 className="text-2xl font-black" style={{ fontFamily: 'Poppins' }}>{data.title}</h2>
      </motion.div>

      <div className="space-y-3 mb-6">
        {data.points?.map((point, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.12 }}
            className="rounded-2xl p-4 flex items-start gap-4 border border-white/5"
            style={{ background: "rgba(255,255,255,0.05)" }}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: `${accent}15` }}>
              {point.icon}
            </div>
            <p className="text-sm text-blue-100 font-medium leading-relaxed pt-1">{point.text}</p>
          </motion.div>
        ))}
      </div>

      <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
        whileTap={{ scale: 0.97 }} onClick={onNext}
        className="w-full py-4 rounded-2xl font-black text-lg text-white"
        style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)` }}>
        Siguiente →
      </motion.button>
    </div>
  );
}

export default SummaryScreen;
