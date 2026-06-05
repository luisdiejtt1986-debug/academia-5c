import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

function FinalReflectionModal({ isOpen, onClose, accent = "#1a6bff" }) {
  const [shouldRender, setShouldRender] = useState(false);

  // Sincroniza animación de entrada/salida
  useEffect(() => {
    if (isOpen) setShouldRender(true);
    else {
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.85, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
            className="relative max-w-md w-full rounded-3xl p-8 border border-yellow-400/30 shadow-2xl"
            style={{ background: "rgba(10, 17, 40, 0.96)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icono superior */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#0a1128] px-4 py-1.5 rounded-full border border-yellow-400/40 shadow-lg">
              <span className="text-3xl"></span>
            </div>

            <h3 className="text-center text-2xl font-black text-yellow-300 mb-5 mt-2 tracking-wide" style={{ fontFamily: 'Poppins' }}>
              Reflexión Final
            </h3>

            <p className="text-center text-base text-blue-100 leading-relaxed font-serif italic px-2 mb-6">
              "Cada crédito aprobado representa una oportunidad para una familia, un negocio o un proyecto de vida. Por eso, analizar correctamente no es solo una responsabilidad financiera, sino también una responsabilidad humana."
            </p>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={onClose}
              className="w-full py-3.5 rounded-2xl font-black text-lg text-white transition-all shadow-lg"
              style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)` }}
            >
              Entendido
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default FinalReflectionModal;