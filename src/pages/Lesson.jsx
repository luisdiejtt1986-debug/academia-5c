import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import Cody from "../assets/cody.png";
import PlayIcon from "../assets/play.png";

function Lesson() {
  const [searchParams] = useSearchParams();
  const moduleId = searchParams.get("id") || 1;
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const moduleData = {
    1: { title: "Introducción", desc: "Fundamentos del análisis crediticio" },
    2: { title: "Planificación", desc: "Estructura y preparación" },
    3: { title: "Promoción", desc: "Presentación al comité" },
    4: { title: "Carácter", desc: "La voluntad de pago" }
  };

  const current = moduleData[moduleId] || moduleData[1];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#04152d] to-[#0b2a52] text-white p-5 pb-24">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate("/home")} className="text-blue-200 text-sm">← Volver</button>
        <h1 className="font-semibold">Módulo {moduleId}</h1>
        <img src={Cody} alt="Cody" className="w-10" />
      </div>

      {/* VIDEO PLAYER */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="bg-white/10 rounded-2xl overflow-hidden backdrop-blur-md mb-6"
      >
        <div className="relative aspect-video bg-black/50 flex items-center justify-center">
          <video
            ref={videoRef}
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            className="w-full h-full"
            onClick={() => {
              if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
              } else {
                videoRef.current.pause();
                setIsPlaying(false);
              }
            }}
          />
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <img src={PlayIcon} alt="Play" className="w-20 h-20 cursor-pointer" />
            </div>
          )}
        </div>
        <div className="p-4 flex items-center justify-between">
          <span className="text-blue-200 text-sm">⏱️ Duración: 2:18</span>
          <button 
            onClick={() => navigate(`/quiz?id=${moduleId}`)} 
            className="bg-blue-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition"
          >
            Ir al Caso Práctico →
          </button>
        </div>
      </motion.div>

      {/* CODY EXPLICACIÓN */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.2 }} 
        className="bg-white/10 rounded-2xl p-5 backdrop-blur-md mb-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <img src={Cody} alt="Cody" className="w-12" />
          <h2 className="text-lg font-semibold">{current.title}</h2>
        </div>
        <p className="text-blue-100 text-sm leading-relaxed">
          {current.desc}. En este módulo aprenderás los conceptos fundamentales 
          y las mejores prácticas para aplicar correctamente esta metodología.
        </p>
      </motion.div>

      {/* PUNTO CLAVE */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.3 }} 
        className="bg-white/10 rounded-2xl p-5 backdrop-blur-md"
      >
        <h3 className="font-semibold mb-2">💡 Punto Clave</h3>
        <p className="text-blue-100 text-sm">
          El carácter representa la voluntad del cliente para cumplir con sus obligaciones financieras.
        </p>
      </motion.div>
    </div>
  );
}

export default Lesson;