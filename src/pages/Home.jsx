import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Cody from "../assets/cody.png";
import { courseData } from "../data/courseData";

const moduleColors = [
  { from: "#1a6bff", to: "#0a3d99", accent: "#4d8fff", light: "rgba(26,107,255,0.15)" },
  { from: "#ff9f43", to: "#e0781e", accent: "#ffb76b", light: "rgba(255,159,67,0.15)" },
  { from: "#00c896", to: "#00896a", accent: "#33deb0", light: "rgba(0,200,150,0.15)" },
  { from: "#a55eea", to: "#7c3abf", accent: "#c27ef0", light: "rgba(165,94,234,0.15)" },
  { from: "#ff4757", to: "#c0392b", accent: "#ff7086", light: "rgba(255,71,87,0.15)" },
];

function Home() {
  const navigate = useNavigate();
  const savedProgress = JSON.parse(localStorage.getItem("academia5c_progress") || "{}");
  const completedIds = Object.keys(savedProgress).filter((id) => savedProgress[id] === 100).map(Number);
  const maxCompletedId = completedIds.length > 0 ? Math.max(...completedIds) : 0;
  const overallProgress = Math.round((completedIds.length / courseData.length) * 100);
  const allModulesCompleted = completedIds.length === courseData.length;
  const sortedModules = [...courseData].sort((a, b) => a.id - b.id);

  const handleReset = () => {
    if (window.confirm("¿Reiniciar todo el curso? Se perderá tu progreso.")) {
      localStorage.removeItem("academia5c_progress");
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen text-white pb-24 relative overflow-hidden"
      style={{ background: "linear-gradient(170deg, #04152d 0%, #0a2240 60%, #04152d 100%)" }}>
      {/* BG decoration */}
      <div className="fixed top-0 right-0 w-72 h-72 rounded-full pointer-events-none opacity-5"
        style={{ background: "radial-gradient(circle, #1a6bff, transparent)", transform: "translate(40%,-40%)" }} />
      <div className="fixed bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none opacity-5"
        style={{ background: "radial-gradient(circle, #00c896, transparent)", transform: "translate(-40%,40%)" }} />

      <div className="relative z-10 p-5">
        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6 pt-2">
          <div>
            <p className="text-xs text-blue-400 font-bold uppercase tracking-widest mb-1">Academia 5C</p>
            <h1 className="text-2xl font-black" style={{ fontFamily: 'Poppins' }}>¡Hola, Analista! 👋</h1>
            <p className="text-blue-300 text-sm font-medium">Metodología Integral de Crédito</p>
          </div>
          <div className="relative">
            <img src={Cody} alt="Cody" className="w-20 drop-shadow-lg" />
          </div>
        </motion.div>

        {/* PROGRESO GENERAL */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-3xl p-5 mb-6 relative overflow-hidden border border-white/10"
          style={{ background: "linear-gradient(135deg, rgba(26,107,255,0.25) 0%, rgba(0,200,150,0.15) 100%)", backdropFilter: "blur(10px)" }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-blue-300 font-bold uppercase tracking-wider">Progreso General</p>
              <p className="text-3xl font-black mt-0.5" style={{ fontFamily: 'Poppins' }}>
                {overallProgress}<span className="text-lg text-blue-300">%</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-blue-300">Completados</p>
              <p className="text-2xl font-black">{completedIds.length}<span className="text-sm text-blue-300">/{courseData.length}</span></p>
            </div>
          </div>
          <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
            <motion.div className="h-3 rounded-full relative overflow-hidden"
              style={{ background: "linear-gradient(90deg, #00c896, #1a6bff)" }}
              initial={{ width: 0 }} animate={{ width: `${overallProgress}%` }} transition={{ duration: 0.8, delay: 0.3 }}>
              <div className="absolute inset-0 opacity-50"
                style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)", backgroundSize: "200% 100%", animation: "shine 2s linear infinite" }} />
            </motion.div>
          </div>
          {allModulesCompleted && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center text-green-400 text-sm mt-3 font-bold">
              🏆 ¡Felicidades! Has dominado las 5C
            </motion.p>
          )}
        </motion.div>

        {/* RESET BUTTON */}
        {allModulesCompleted && (
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            onClick={handleReset}
            className="w-full mb-4 py-3 rounded-2xl text-sm font-bold border border-red-500/30 text-red-400"
            style={{ background: "rgba(255,71,87,0.1)" }}>
            🔄 Reiniciar curso completo
          </motion.button>
        )}

        {/* SECCIÓN MÓDULOS */}
        <div className="mb-4">
          <p className="text-xs text-blue-400 font-bold uppercase tracking-widest mb-3">Módulos del curso</p>
        </div>
        <div className="space-y-3">
          {sortedModules.map((mod, idx) => {
            const isLocked = mod.id > maxCompletedId + 1;
            const isCompleted = savedProgress[mod.id] === 100;
            const colors = moduleColors[idx % moduleColors.length];
            return (
              <motion.div key={mod.id}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + idx * 0.08 }}
                whileHover={!isLocked ? { x: 4 } : {}}
                whileTap={!isLocked ? { scale: 0.98 } : {}}
                onClick={() => !isLocked && navigate(`/module?id=${mod.id}`)}
                className={`rounded-2xl p-4 border transition-all relative overflow-hidden ${
                  isLocked ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                }`}
                style={{
                  background: isCompleted
                    ? `linear-gradient(135deg, ${colors.light}, rgba(0,200,150,0.1))`
                    : isLocked ? "rgba(255,255,255,0.04)" : colors.light,
                  borderColor: isCompleted ? "rgba(0,200,150,0.4)" : isLocked ? "rgba(255,255,255,0.05)" : `${colors.from}40`,
                }}>
                {/* Module number pill */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 relative overflow-hidden"
                    style={{ background: isLocked ? "rgba(255,255,255,0.05)" : `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}>
                    {isLocked ? "🔒" : isCompleted ? "✅" : mod.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold opacity-60 uppercase tracking-wider">Módulo {mod.id}</span>
                      {isCompleted && <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-bold border border-green-500/20">✓ Completado</span>}
                    </div>
                    <h3 className="font-black text-base leading-tight" style={{ fontFamily: 'Poppins' }}>{mod.title}</h3>
                    <p className="text-xs text-blue-300 font-medium mt-0.5 truncate">{mod.subtitle}</p>
                    {!isLocked && (
                      <div className="mt-2 w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <motion.div className="h-full rounded-full"
                          style={{ background: isCompleted ? "linear-gradient(90deg, #00c896, #1a6bff)" : `linear-gradient(90deg, ${colors.from}, ${colors.accent})` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${isCompleted ? 100 : 0}%` }}
                          transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }} />
                      </div>
                    )}
                  </div>
                  {!isLocked && (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: `${colors.from}20`, color: colors.accent }}>
                      <span className="text-sm font-bold">→</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="mt-8 text-center text-xs text-blue-500 font-medium">
          <p>Metodología 5C • Análisis Integral de Crédito</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
