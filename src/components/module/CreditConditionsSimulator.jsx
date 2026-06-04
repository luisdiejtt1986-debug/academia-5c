import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function CreditConditionsSimulator({ data, onNext, accent = "#1a6bff" }) {
  // Perfil del cliente (datos fijos para el ejercicio)
  const clientIncome = 1200;
  const clientExpenses = 500;
  const availableCapacity = clientIncome - clientExpenses; // $700

  const [amount, setAmount] = useState(15000);
  const [rate, setRate] = useState(16);
  const [term, setTerm] = useState(60);
  const [installment, setInstallment] = useState(0);

  // 🧮 Fórmula de cuota francesa (PMT) en tiempo real
  useEffect(() => {
    if (rate === 0) {
      setInstallment(amount / term);
    } else {
      const r = rate / 100 / 12;
      const pmt = (amount * r) / (1 - Math.pow(1 + r, -term));
      setInstallment(pmt);
    }
  }, [amount, rate, term]);

  // 📊 Lógica de semáforo (Cuota vs Disponible)
  const ratio = installment / availableCapacity;
  let statusColor = "#00c896";
  let statusText = "✅ CONDICIONES ADECUADAS";
  let statusIcon = "";

  if (ratio > 0.7) {
    statusColor = "#ff4757";
    statusText = " CONDICIONES RIESGOSAS";
    statusIcon = "🚫";
  } else if (ratio > 0.4) {
    statusColor = "#ffd93d";
    statusText = "🟡 CONDICIONES JUSTAS";
    statusIcon = "⚖️";
  }

  return (
    <div className="p-5 pb-32">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 text-center">
        <h2 className="text-2xl font-black mb-1" style={{ fontFamily: 'Poppins' }}>{data.title}</h2>
        <p className="text-blue-300 text-sm">Ajusta las condiciones para que el cliente pueda pagar.</p>
      </motion.div>

      {/* Tarjeta del Cliente (Estática) */}
      <div className="bg-white/5 rounded-2xl p-4 mb-6 border border-white/10 grid grid-cols-3 gap-2 text-center">
        <div><p className="text-xs text-blue-300">Ingreso</p><p className="text-lg font-black">${clientIncome}</p></div>
        <div><p className="text-xs text-blue-300">Disponible</p><p className="text-lg font-black text-green-400">${availableCapacity}</p></div>
        <div><p className="text-xs text-blue-300">Monto Crédito</p><p className="text-lg font-black">${amount}</p></div>
      </div>

      {/*  SLIDERS INTERACTIVOS */}
      <div className="space-y-6 mb-8">
        {/* Tasa */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-bold text-blue-200">📈 Tasa de Interés</span>
            <span className="text-sm font-black text-yellow-400">{rate}%</span>
          </div>
          <input type="range" min="5" max="40" step="1" value={rate} 
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: "#ffd93d" }} />
        </div>

        {/* Plazo */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-bold text-blue-200">📅 Plazo (Meses)</span>
            <span className="text-sm font-black text-yellow-400">{term} meses</span>
          </div>
          <input type="range" min="12" max="120" step="6" value={term} 
            onChange={(e) => setTerm(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: "#1a6bff" }} />
        </div>

        {/* Monto */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-bold text-blue-200">💰 Monto Solicitado</span>
            <span className="text-sm font-black text-yellow-400">${amount}</span>
          </div>
          <input type="range" min="1000" max="50000" step="500" value={amount} 
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: "#a55eea" }} />
        </div>
      </div>

      {/* ️ BALANZA VISUAL (Resultado) */}
      <motion.div 
        key={installment.toFixed(0)}
        className="bg-white/10 rounded-2xl p-6 border-2 mb-8 relative overflow-hidden"
        style={{ borderColor: statusColor, background: `${statusColor}10` }}
      >
        <div className="text-center mb-4">
          <p className="text-xs text-blue-300 uppercase tracking-widest font-bold">Cuota Mensual Estimada</p>
          <p className="text-5xl font-black my-2" style={{ color: statusColor }}>${installment.toFixed(0)}</p>
          <p className="text-sm font-bold flex items-center justify-center gap-2" style={{ color: statusColor }}>
            {statusIcon} {statusText}
          </p>
        </div>

        {/* Barra comparativa (La Balanza) */}
        <div className="relative h-6 bg-black/40 rounded-full overflow-hidden mb-2">
          {/* Fondo: Capacidad máxima del cliente */}
          <div className="absolute inset-y-0 left-0 bg-green-500/30 w-full rounded-full" />
          {/* Barra: La cuota resultante */}
          <motion.div 
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ width: `${Math.min((installment / availableCapacity) * 100, 100)}%`, background: statusColor }}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((installment / availableCapacity) * 100, 100)}%` }}
            transition={{ type: "spring", stiffness: 60 }}
          />
        </div>
        <p className="text-xs text-center text-blue-200">
          Si la barra supera el límite verde, el cliente no podrá sostener el crédito.
        </p>
      </motion.div>

      <motion.button whileTap={{ scale: 0.97 }} onClick={onNext}
        className="w-full py-4 rounded-2xl font-black text-lg text-white shadow-lg"
        style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)` }}>
        Continuar →
      </motion.button>
    </div>
  );
}

export default CreditConditionsSimulator;