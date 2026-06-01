import { useState } from "react";
import { motion } from "framer-motion";

function SliderRow({ label, value, min, max, step, onChange, color }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="text-xs text-blue-300 font-medium">{label}</span>
        <span className="text-xs font-black" style={{ color }}>${value.toLocaleString()}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full cursor-pointer appearance-none"
        style={{ background: `linear-gradient(to right, ${color} 0%, ${color} ${pct}%, rgba(255,255,255,0.15) ${pct}%, rgba(255,255,255,0.15) 100%)` }} />
    </div>
  );
}

function CapitalSimulator({ data, onNext, accent = "#00c896" }) {
  const [assets, setAssets] = useState(data.initialData?.assets || 70000);
  const [liabilities, setLiabilities] = useState(data.initialData?.liabilities || 22000);
  const [savings, setSavings] = useState(data.initialData?.savings || 8000);

  const netWorth = (assets + savings) - liabilities;
  const isStrong = netWorth >= 50000;
  const isMid = netWorth >= 10000 && netWorth < 50000;
  const isWeak = netWorth < 10000;
  const statusColor = isStrong ? "#00c896" : isMid ? "#ffd93d" : "#ff4757";
  const statusLabel = isStrong ? "Capital Sólido 💪" : isMid ? "Capital Moderado" : "Capital Débil ⚠️";
  const barPct = Math.min(100, Math.max(0, (netWorth / 100000) * 100));

  return (
    <div className="p-5 pb-32">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
        <h2 className="text-2xl font-black" style={{ fontFamily: 'Poppins' }}>{data.title}</h2>
        <p className="text-blue-300 text-sm mt-1 font-medium">Simulador de Patrimonio Neto</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="rounded-2xl p-5 mb-4 border border-white/5"
        style={{ background: "rgba(255,255,255,0.05)" }}>
        <p className="text-xs font-black uppercase tracking-wider text-green-400 mb-3">💰 Activos (+)</p>
        <SliderRow label="Bienes (Casa, Vehículo, Negocio)" value={assets} min={0} max={200000} step={1000} onChange={setAssets} color="#00c896" />
        <SliderRow label="Ahorros disponibles" value={savings} min={0} max={50000} step={500} onChange={setSavings} color="#00a87d" />

        <div className="border-t border-white/10 my-3 pt-3">
          <p className="text-xs font-black uppercase tracking-wider text-red-400 mb-3">💸 Pasivos (-)</p>
          <SliderRow label="Deudas totales" value={liabilities} min={0} max={100000} step={1000} onChange={setLiabilities} color="#ff4757" />
        </div>
      </motion.div>

      {/* Result */}
      <motion.div key={netWorth} initial={{ scale: 0.97 }} animate={{ scale: 1 }}
        className="rounded-2xl p-5 mb-5 border-2"
        style={{ background: `${statusColor}10`, borderColor: `${statusColor}40` }}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-blue-300 font-bold uppercase tracking-wider">Patrimonio Neto</p>
            <p className="text-4xl font-black mt-0.5" style={{ color: statusColor }}>
              {netWorth >= 0 ? `$${netWorth.toLocaleString()}` : `-$${Math.abs(netWorth).toLocaleString()}`}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs px-3 py-1.5 rounded-full font-black"
              style={{ background: `${statusColor}20`, color: statusColor }}>
              {statusLabel}
            </span>
          </div>
        </div>
        {/* Bar showing weak/moderate/strong */}
        <div className="flex items-center gap-1.5 mt-3">
          <span className="text-xs text-red-400 font-bold">Débil</span>
          <div className="flex-1 bg-white/10 h-2.5 rounded-full overflow-hidden mx-1">
            <motion.div className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, #ff4757, #ffd93d, #00c896)` }}
              initial={{ width: 0 }} animate={{ width: `${barPct}%` }} transition={{ duration: 0.6 }} />
          </div>
          <span className="text-xs text-green-400 font-bold">Fuerte</span>
        </div>
        <p className="text-xs text-blue-300 text-center mt-2 font-medium">
          Activos: ${(assets + savings).toLocaleString()} - Pasivos: ${liabilities.toLocaleString()}
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

export default CapitalSimulator;
