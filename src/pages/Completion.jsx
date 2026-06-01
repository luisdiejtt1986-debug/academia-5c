import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import TrophyIcon from "../assets/trophy.png";
import StarIcon from "../assets/icon-star.png";
import TargetIcon from "../assets/icon-target.png";
import ClockIcon from "../assets/icon-clock.png";
import ConfettiIcon from "../assets/confetti.png";

function Completion() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#04152d] to-[#0b2a52] text-white p-6 flex flex-col items-center justify-center">
      {/* CONFETTI */}
      <motion.img
        src={ConfettiIcon}
        alt="Celebración"
        className="w-32 mb-4"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
      />

      <motion.div 
        initial={{ scale: 0 }} 
        animate={{ scale: 1 }} 
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className="text-center mb-8"
      >
        <img src={TrophyIcon} alt="Trofeo" className="w-24 mx-auto mb-4" />
        <h1 className="text-3xl font-bold">¡Felicidades!</h1>
        <p className="text-blue-200 mt-2">Has completado el Módulo 4: CARÁCTER</p>
      </motion.div>

      {/* RING DE PUNTAJE */}
      <div className="relative w-48 h-48 mb-8">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="96" cy="96" r="88" stroke="#ffffff20" strokeWidth="12" fill="none" />
          <circle 
            cx="96" cy="96" r="88" 
            stroke="#22c55e" 
            strokeWidth="12" 
            fill="none" 
            strokeDasharray="553" 
            strokeDashoffset="44" 
            strokeLinecap="round" 
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold">92%</span>
          <span className="text-blue-200 text-sm">Puntaje obtenido</span>
        </div>
      </div>

      {/* ESTADÍSTICAS */}
      <div className="grid grid-cols-3 gap-4 w-full max-w-sm mb-8">
        <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-md">
          <img src={TargetIcon} alt="Correctas" className="w-8 h-8 mx-auto mb-1" />
          <div className="font-bold">18/20</div>
          <div className="text-blue-200 text-xs">Respuestas</div>
        </div>
        <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-md">
          <img src={ClockIcon} alt="Tiempo" className="w-8 h-8 mx-auto mb-1" />
          <div className="font-bold">08:24</div>
          <div className="text-blue-200 text-xs">Tiempo</div>
        </div>
        <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-md">
          <img src={StarIcon} alt="Racha" className="w-8 h-8 mx-auto mb-1" />
          <div className="font-bold">3</div>
          <div className="text-blue-200 text-xs">Racha</div>
        </div>
      </div>

      <button 
        onClick={() => navigate("/home")} 
        className="w-full max-w-sm bg-blue-600 py-4 rounded-xl font-bold mb-3 hover:bg-blue-700 transition"
      >
        Continuar al siguiente módulo
      </button>
      <button 
        onClick={() => navigate("/home")} 
        className="w-full max-w-sm border border-white/20 py-4 rounded-xl font-bold hover:bg-white/5 transition"
      >
        Repetir módulo
      </button>
    </div>
  );
}

export default Completion;