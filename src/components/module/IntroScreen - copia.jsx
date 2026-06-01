import { motion } from "framer-motion";
import Cody from "../../assets/cody.png";

function IntroScreen({ data, onNext, accent = "#1a6bff" }) {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-between p-6 pb-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accent}, transparent)` }} />

      {/* Top badge */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="w-full flex justify-center pt-2">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 border border-white/10"
          style={{ background: `${accent}20` }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: accent }} />
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>
            Módulo de aprendizaje
          </span>
        </div>
      </motion.div>

      {/* CENTER: title + image */}
      <div className="flex flex-col items-center text-center w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="mb-4">
          <h1 className="text-4xl font-black leading-none mb-1" style={{ fontFamily: 'Poppins' }}>{data.title}</h1>
          <p className="text-xl font-bold mt-2" style={{ color: accent }}>{data.subtitle}</p>
          <p className="text-blue-300 text-sm mt-3 max-w-xs mx-auto font-medium leading-relaxed">{data.text}</p>
        </motion.div>

        <motion.div className="relative" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 120 }}>
          <div className="absolute inset-0 rounded-full blur-2xl opacity-30"
            style={{ background: `radial-gradient(circle, ${accent}, transparent)` }} />
          <img src={data.image || Cody} alt="Personaje"
            className="w-52 relative z-10 float drop-shadow-2xl" />
        </motion.div>

        {/* Animated bullets */}
        <div className="w-full max-w-sm mt-4 space-y-2">
          {data.animated?.map((text, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.25 }}
              className="flex items-center gap-3 rounded-xl px-4 py-2.5 border border-white/5"
              style={{ background: "rgba(255,255,255,0.05)" }}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accent }} />
              <p className="text-sm text-blue-100 font-medium">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
        whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.02 }}
        onClick={onNext}
        className="w-full max-w-sm py-4 rounded-2xl text-lg font-black text-white shadow-xl"
        style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)` }}>
        ✅ {data.button}
      </motion.button>
    </div>
  );
}

export default IntroScreen;
