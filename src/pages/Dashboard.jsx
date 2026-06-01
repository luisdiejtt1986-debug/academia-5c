import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Cody from "../assets/cody.png";
import { useApp } from "../context/AppContext";

const modules = [
  { id: 1, title: "Introducción 5C", desc: "Fundamentos del análisis crediticio", icon: "📘" },
  { id: 2, title: "Planificación", desc: "Estructura y preparación del crédito", icon: "📅" },
  { id: 3, title: "Promoción", desc: "Presentación del caso al comité", icon: "📢" },
  { id: 4, title: "Carácter", desc: "La voluntad de pago", icon: "👤" },
  { id: 5, title: "Capacidad", desc: "Flujo de caja y ratios", icon: "📊" },
  { id: 6, title: "Capital", desc: "Patrimonio y garantías propias", icon: "" },
  { id: 7, title: "Condiciones", desc: "Entorno económico y tasas", icon: "⚙️" },
  { id: 8, title: "Colateral", desc: "Garantías reales y ejecutables", icon: "🛡️" }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { progress, isLocked } = useApp();

  const completedCount = Object.values(progress).filter((v) => v === 100).length;
  const overallProgress = Math.round((completedCount / modules.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#04152d] to-[#0b2a52] text-white p-5 pb-24">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Academia 5C</h1>
          <p className="text-blue-200 text-sm">Bienvenido, Diego</p>
        </div>
        <img src={Cody} alt="Cody" className="w-16" />
      </div>

      {/* PROGRESO GENERAL */}
      <div className="bg-white/10 rounded-2xl p-4 mb-6 backdrop-blur-md">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-blue-100">Progreso General</span>
          <span className="font-bold">{overallProgress}%</span>
        </div>
        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
          <div className="bg-green-400 h-full rounded-full transition-all duration-500" style={{ width: `${overallProgress}%` }} />
        </div>
      </div>

      {/* LISTA DE MÓDULOS */}
      <div className="space-y-3">
        {modules.map((mod) => {
          const locked = isLocked(mod.id);
          const prog = progress[mod.id] || 0;
          return (
            <motion.div
              key={mod.id}
              whileHover={!locked ? { scale: 1.02 } : {}}
              whileTap={!locked ? { scale: 0.98 } : {}}
              onClick={() => !locked && navigate(`/lesson?id=${mod.id}`)}
              className={`relative bg-white/10 rounded-2xl p-4 backdrop-blur-md border border-white/5 ${
                locked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">{mod.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{mod.title}</h3>
                  <p className="text-blue-200 text-sm">{mod.desc}</p>
                  <div className="mt-2 w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-400 rounded-full transition-all" style={{ width: `${prog}%` }} />
                  </div>
                </div>
                <div className="text-2xl">
                  {locked ? "🔒" : prog === 100 ? "✅" : "▶️"}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}