import { useState } from "react";
import { motion } from "framer-motion";

function SliderRow({ label, value, min, max, step, onChange, color, format }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="text-xs text-blue-300 font-medium">{label}</span>
        <span className="text-xs font-black" style={{ color }}>{format ? format(value) : `$${value.toLocaleString()}`}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full cursor-pointer appearance-none"
        style={{ background: `linear-gradient(to right, ${color} 0%, ${color} ${pct}%, rgba(255,255,255,0.15) ${pct}%, rgba(255,255,255,0.15) 100%)` }} />
    </div>
  );
}

function CollateralSimulator({ data, onNext, accent = "#a55eea" }) {
  const [value, setValue] = useState(data.initialData?.value || 25000);
  const [loan, setLoan] = useState(data.initialData?.loan || 18000);
  const [depreciation, setDepreciation] = useState(data.initialData?.depreciation || 15);

  const realValue = value * (1 - depreciation / 100);
  const coverage = loan > 0 ? (realValue / loan) * 100 : 0;
  const isStrong = coverage >= 120;
  const isMid = coverage >= 100 && coverage < 120;
  const statusColor = isStrong ? "#00c896" : isMid ? "#ffd93d" : "#ff4757";
  const statusLabel = isStrong ? "Cobertura Fuerte" : isMid ? "Cobertura Media" : "Cobertura Débil";

  return (
    <div className="p-5 pb-32">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
        <h2 className="text-2xl font-black" style={{ fontFamily: 'Poppins' }}>{data.title}</h2>
        <p className="text-blue-300 text-sm mt-1 font-medium">Simulador de Cobertura de Garantía</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="rounded-2xl p-5 mb-4 border border-white/5"
        style={{ background: "rgba(255,255,255,0.05)" }}>
        <p className="text-xs font-black uppercase tracking-wider text-blue-400 mb-3">🏠 Valor de la Garantía</p>
        <SliderRow label="Avalúo comercial" value={value} min={5000} max={100000} step={500} onChange={setValue} color="#a55eea" />
        
        <div className="border-t border-white/10 my-3 pt-3">
          <p className="text-xs font-black uppercase tracking-wider text-red-400 mb-3">💳 Monto del Crédito</p>
          <SliderRow label="Crédito solicitado" value={loan} min={1000} max={100000} step={500} onChange={setLoan} color="#ff4757" />
        </div>
        
        <div className="border-t border-white/10 my-3 pt-3">
          <p className="text-xs font-black uppercase tracking-wider text-yellow-400 mb-3">📉 Factor de Riesgo</p>
          <SliderRow label="Depreciación estimada" value={depreciation} min={0} max={50} step={1} onChange={setDepreciation}
            color="#ffd93d" format={v => `${v}%`} />
        </div>
      </motion.div>

      {/* Result */}
      <motion.div key={coverage.toFixed(0)} initial={{ scale: 0.97 }} animate={{ scale: 1 }}
        className="rounded-2xl p-5 mb-5 border-2"
        style={{ background: `${statusColor}10`, borderColor: `${statusColor}40` }}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-blue-300 font-bold uppercase tracking-wider">Cobertura</p>
            <p className="text-5xl font-black mt-0.5" style={{ color: statusColor }}>{coverage.toFixed(0)}%</p>
          </div>
          <span className="text-sm px-3 py-1.5 rounded-full font-black"
            style={{ background: `${statusColor}20`, color: statusColor }}>{statusLabel}</span>
        </div>
        <div className="bg-white/10 h-2.5 rounded-full overflow-hidden">
          <motion.div className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, #ff4757, #ffd93d, #00c896)` }}
            initial={{ width: 0 }} animate={{ width: `${Math.min(100, coverage)}%` }} transition={{ duration: 0.6 }} />
        </div>
        <p className="text-xs text-blue-300 mt-2 font-medium text-center">
          Valor real: ${realValue.toLocaleString()} | Préstamo: ${loan.toLocaleString()}
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

export default CollateralSimulator;
