import { useState } from "react";
import { motion } from "framer-motion";

function Slider({ label, value, min, max, step, onChange, color = "#1a6bff", format = (v) => `$${v.toLocaleString()}` }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold text-blue-300">{label}</span>
        <span className="text-sm font-black" style={{ color }}>{format(value)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full cursor-pointer appearance-none"
        style={{ background: `linear-gradient(to right, ${color} 0%, ${color} ${((value-min)/(max-min))*100}%, rgba(255,255,255,0.15) ${((value-min)/(max-min))*100}%, rgba(255,255,255,0.15) 100%)` }} />
    </div>
  );
}

function GaugeMeter({ value, label, color }) {
  const angle = -135 + (value / 100) * 270;
  return (
    <div className="flex flex-col items-center py-4">
      <svg viewBox="0 0 120 80" className="w-32 mb-2">
        <path d="M10 75 A55 55 0 0 1 110 75" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" strokeLinecap="round"/>
        <path d="M10 75 A55 55 0 0 1 110 75" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={`${(value/100)*172} 172`}/>
        <line x1="60" y1="75" x2={60 + 30 * Math.cos((angle - 90) * Math.PI/180)} y2={75 + 30 * Math.sin((angle - 90) * Math.PI/180)}
          stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="60" cy="75" r="5" fill="white"/>
      </svg>
      <p className="text-2xl font-black" style={{ color }}>{label}</p>
    </div>
  );
}

function SimulatorScreen({ data, onNext, accent = "#1a6bff" }) {
  const [income, setIncome] = useState(data.initialData?.income || 2500);
  const [expenses, setExpenses] = useState(data.initialData?.expenses || 1200);
  const [debts, setDebts] = useState(data.initialData?.debts || 400);

  const flow = income - expenses - debts;
  const isRisk = flow < 300;
  const flowColor = flow < 0 ? "#ff4757" : flow < 300 ? "#ff9f43" : "#00c896";
  const riskLabel = flow < 0 ? "Riesgo Alto" : flow < 300 ? "Riesgo Moderado" : "Capacidad OK";
  const riskPct = Math.min(100, Math.max(0, (flow / income) * 100));

  return (
    <div className="p-5 pb-32">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
        <h2 className="text-2xl font-black" style={{ fontFamily: 'Poppins' }}>{data.title}</h2>
        <p className="text-blue-300 text-sm font-medium mt-1">Ajusta los valores para analizar la capacidad</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="rounded-2xl p-5 mb-4 border border-white/5"
        style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(8px)" }}>
        <p className="text-xs font-black uppercase tracking-wider text-green-400 mb-3">📈 Ingresos</p>
        <Slider label="Ingresos Mensuales" value={income} min={500} max={10000} step={100} onChange={setIncome} color="#00c896" />
        
        <div className="border-t border-white/10 my-3 pt-3">
          <p className="text-xs font-black uppercase tracking-wider text-red-400 mb-3">📉 Gastos y Deudas</p>
          <Slider label="Gastos del negocio" value={expenses} min={0} max={5000} step={50} onChange={setExpenses} color="#ff9f43" />
          <Slider label="Deudas actuales" value={debts} min={0} max={5000} step={50} onChange={setDebts} color="#ff4757" />
        </div>
      </motion.div>

      {/* Result */}
      <motion.div key={flow} initial={{ scale: 0.97 }} animate={{ scale: 1 }}
        className="rounded-2xl p-5 mb-5 border-2 text-center"
        style={{ background: `${flowColor}12`, borderColor: `${flowColor}50` }}>
        <GaugeMeter value={riskPct} label={riskLabel} color={flowColor} />
        <div className="border-t border-white/10 pt-4">
          <p className="text-xs text-blue-300 font-bold uppercase tracking-wider mb-1">Flujo Disponible</p>
          <p className="text-4xl font-black" style={{ color: flowColor }}>
            {flow >= 0 ? `$${flow.toLocaleString()}` : `-$${Math.abs(flow).toLocaleString()}`}
          </p>
          <p className="text-xs text-blue-300 mt-2 font-medium">
            {isRisk ? "Poco margen para nueva cuota" : "Tiene capacidad para nueva deuda"}
          </p>
        </div>
      </motion.div>

      <motion.button whileTap={{ scale: 0.97 }} onClick={onNext}
        className="w-full py-4 rounded-2xl font-black text-lg text-white"
        style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)` }}>
        Continuar →
      </motion.button>
    </div>
  );
}

export default SimulatorScreen;
