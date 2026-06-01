import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Cody from "./assets/cody.png";
import Home from "./pages/Home";
import Module from "./pages/Module";

function Splash() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-white relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #04152d 0%, #0a2240 50%, #041030 100%)" }}>
      
      {/* Círculos decorativos de fondo */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #1a6bff, transparent)", transform: "translate(30%, -30%)" }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #00c896, transparent)", transform: "translate(-30%, 30%)" }} />
      
      {/* Título y Badge */}
      <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        className="text-center mb-4 relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm border border-white/10">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs font-bold text-blue-200 tracking-widest uppercase">Capacitación Crediticia</span>
        </div>
        <h1 className="text-5xl font-black mb-2" style={{ fontFamily: 'Poppins, sans-serif', lineHeight: 1.1 }}>
          Academia<br /><span className="shine-text">5C</span>
        </h1>
        <p className="text-blue-300 text-base mt-2 font-semibold">Metodología Integral de Crédito</p>
      </motion.div>

      {/* ️ CONTENEDOR DE IMAGEN CON ÓRBITA DE ESTRELLAS */}
      <motion.div 
        className="relative float" 
        initial={{ opacity: 0, scale: 0.7 }} 
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Glow de fondo */}
        <div className="absolute inset-0 rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(circle, #00c896 0%, transparent 70%)" }} />

        {/* ✨ Anillo giratorio de brillos/estrellas */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          {/* Estrella 1 (Arriba) */}
          <motion.div 
            className="absolute top-[-18px] left-1/2 -translate-x-1/2 text-amber-300 drop-shadow-[0_0_10px_rgba(253,224,71,0.9)]"
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >✨</motion.div>

          {/* Estrella 2 (Derecha) */}
          <motion.div 
            className="absolute right-[-18px] top-1/2 -translate-y-1/2 text-yellow-200 drop-shadow-[0_0_10px_rgba(254,243,199,0.9)]"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          >⭐</motion.div>

          {/* Estrella 3 (Abajo) */}
          <motion.div 
            className="absolute bottom-[-18px] left-1/2 -translate-x-1/2 text-green-300 drop-shadow-[0_0_10px_rgba(134,239,172,0.9)]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
          >✦</motion.div>

          {/* Estrella 4 (Izquierda) */}
          <motion.div 
            className="absolute left-[-18px] top-1/2 -translate-y-1/2 text-blue-300 drop-shadow-[0_0_10px_rgba(147,197,253,0.9)]"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: 0.7 }}
          >✨</motion.div>
        </motion.div>

        {/* Imagen principal */}
        <img src={Cody} alt="Cody" className="w-96 relative z-10 drop-shadow-2xl" />
      </motion.div>

      {/* Botón de acción */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="mt-8 w-full max-w-xs relative z-10">
        <motion.button whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.02 }}
          onClick={() => navigate("/home")}
          className="w-full py-4 rounded-2xl text-lg font-black shadow-2xl text-white relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #00c896, #00a87d)" }}>
          <span className="relative z-10">🚀 Comenzar Capacitación</span>
        </motion.button>
        <p className="text-center text-blue-400 text-xs mt-3 font-medium">5 módulos • Análisis profesional de crédito</p>
        <p className="text-center text-blue-400 text-xs mt-0 font-medium">Ing. Diego Jiménez Terrazas</p>
      </motion.div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/module" element={<Module />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;