import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import CheckIcon from "../assets/check.png";

function Quiz() {
  const [searchParams] = useSearchParams();
  const moduleId = searchParams.get("id") || 4;
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selected) return;
    setSubmitted(true);
    setTimeout(() => {
      navigate("/completion");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#04152d] to-[#0b2a52] text-white p-5 pb-24">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate("/home")} className="text-blue-200 text-sm">← Salir</button>
        <span className="text-blue-200 text-sm">Caso Práctico</span>
      </div>

      {/* CLIENTE */}
      <div className="bg-white/10 rounded-2xl p-4 mb-5 flex items-center gap-3 backdrop-blur-md">
        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-2xl">👤</div>
        <div>
          <p className="font-semibold">Cliente</p>
          <p className="text-blue-200 text-xs">20 años • Restaurante pequeño • Sin historial • $5,000</p>
        </div>
      </div>

      {/* PREGUNTA */}
      <h2 className="text-lg font-semibold mb-4">¿Qué debería validar primero el asesor?</h2>

      {/* OPCIONES */}
      <div className="space-y-3 mb-6">
        {[
          { id: "A", text: "EVA SMART", sub: "Conocer sus valores y comportamiento" },
          { id: "B", text: "Referencias", sub: "Consultar a terceros" },
          { id: "C", text: "Garantías", sub: "Revisar bienes o colateral" },
          { id: "D", text: "Buró de crédito", sub: "Revisar historial crediticio" }
        ].map((opt) => (
          <button
            key={opt.id}
            onClick={() => !submitted && setSelected(opt.id)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
              submitted && opt.id === "A" ? "border-green-500 bg-green-500/10" :
              submitted && opt.id === selected ? "border-red-500 bg-red-500/10" :
              selected === opt.id ? "border-blue-400 bg-blue-400/10" : "border-white/10 bg-white/5"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm">
                {opt.id}
              </span>
              <div>
                <p className="font-semibold">{opt.text}</p>
                <p className="text-blue-200 text-xs">{opt.sub}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* FEEDBACK */}
      {submitted && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6 flex items-start gap-3"
        >
          <img src={CheckIcon} alt="Correcto" className="w-6 h-6" />
          <div>
            <p className="font-bold text-green-400 mb-1">¡Correcto!</p>
            <p className="text-blue-100 text-sm">
              EVA SMART es lo primero que debe validar el asesor para conocer la voluntad de pago.
            </p>
          </div>
        </motion.div>
      )}

      <button
        onClick={handleSubmit}
        className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
          submitted ? "bg-blue-600 hover:bg-blue-700" : 
          selected ? "bg-green-500 hover:bg-green-600" : 
          "bg-gray-700 cursor-not-allowed"
        }`}
      >
        {submitted ? "Continuar →" : "Enviar respuesta"}
      </button>
    </div>
  );
}

export default Quiz;