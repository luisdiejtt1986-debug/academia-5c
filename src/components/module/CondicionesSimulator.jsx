import { useState } from "react";
import { motion } from "framer-motion";

const factors = [
  { key: "inflation", label: "Inflación / Costos", color: "#ff9f43", icon: "📊" },
  { key: "salesDrop", label: "Caída de Ventas", color: "#ff4757", icon: "📉" },
  { key: "climate", label: "Riesgo Climático", color: "#1a6bff", icon: "🌧️" },
  { key: "logistics", label: "Problemas Logísticos", color: "#a55eea", icon: "🚚" },
];

function CondicionesSimulator({ data, onNext, accent = "#ff4757" }) {
  const [vals, setVals] = useState({
    inflation: data.initialData?.inflation || 70,
    salesDrop: data.initialData?.salesDrop || 60,
    climate: data.initialData?.climate || 30,
    logistics: data.initialData?.logistics || 50,
  });

  const avgRisk = Object.values(vals).reduce((a, b) => a + b, 0) / 4;
  const isLow = avgRisk < 30;
  const isMid = avgRisk >= 30 && avgRisk < 65;
  const statusColor = isLow ? "#00c896" : isMid ? "#ffd93d" : "#ff4757";
  const statusLabel = isLow ? "Riesgo Bajo" : isMid ? "Riesgo Moderado" : "Riesgo Alto";
  const statusEmoji = isLow ? "🟢" : isMid ? "🟡" : "🔴";

  return (
    <div className="p-5 pb-32">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
        <h2 className="text-2xl font-black" style={{ fontFamily: 'Poppins' }}>{data.title}</h2>
        <p className="text-blue-300 text-sm mt-1 font-medium">Simulador de riesgo externo</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="rounded-2xl p-5 mb-4 border border-white/5"
        style={{ background: "rgba(255,255,255,0.05)" }}>
        <p className="text-xs text-blue-300 font-medium mb-4">Ajusta los factores externos para ver cómo cambia el riesgo del entorno:</p>
        
        {factors.map(f => {
          const v = vals[f.key];
          const pct = (v / 100) * 100;
          return (
            <div key={f.key} className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-base">{f.icon}</span>
                  <span className="text-xs text-blue-200 font-medium">{f.label}</span>
                </div>
                <span className="text-sm font-black" style={{ color: f.color }}>{v}%</span>
              </div>
              <input type="range" min={0} max={100} step={1} value={v}
                onChange={e => setVals(prev => ({ ...prev, [f.key]: Number(e.target.value) }))}
                className="w-full h-2 rounded-full cursor-pointer appearance-none"
                style={{ background: `linear-gradient(to right, ${f.color} 0%, ${f.color} ${pct}%, rgba(255,255,255,0.15) ${pct}%, rgba(255,255,255,0.15) 100%)` }} />
            </div>
          );
        })}
      </motion.div>

      {/* Gauge result */}
      <motion.div key={avgRisk.toFixed(0)} initial={{ scale: 0.97 }} animate={{ scale: 1 }}
        className="rounded-2xl p-5 mb-5 border-2"
        style={{ background: `${statusColor}10`, borderColor: `${statusColor}40` }}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-blue-300 font-bold uppercase tracking-wider">Nivel de Riesgo</p>
            <p className="text-2xl font-black mt-1">{statusEmoji} {statusLabel}</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-black" style={{ color: statusColor }}>{avgRisk.toFixed(0)}</p>
            <p className="text-xs text-blue-300 font-medium">promedio</p>
          </div>
        </div>
        <div className="bg-white/10 h-3 rounded-full overflow-hidden">
          <motion.div className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, #00c896, #ffd93d, #ff4757)` }}
            initial={{ width: 0 }} animate={{ width: `${avgRisk}%` }} transition={{ duration: 0.5 }} />
        </div>
        <p className="text-xs text-blue-300 text-center mt-2 font-medium">
          {avgRisk > 65 ? "Entorno hostil – el cliente podría fallar aunque quiera pagar." : "Entorno estable para operar."}
        </p>
      </motion.div>

      <motion.button whileTap={{ scale: 0.97 }} onClick={onNext}
        className="w-full py-4 rounded-2xl font-black text-lg text-white"
        style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)` }}>
        Continuar →
      </motion.button>
    </div>
  );
}

export default CondicionesSimulator;
